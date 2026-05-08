先明确一下概念：同一时间段内，两个或多个事件或活动看似同时发生，但实际上这些事件或活动是在不同的时刻依次进行的。

生活中并发的场景并不少见，多人行走的道路、抢票、网站访问等。

为什么需要控制并发？首先确定一个事实，肯定是有某条"通道"上的压力才需要控制流动的数量。当流动的数量足够多时，通道就会拥挤，甚至瘫痪。所以需要控制通道的流动数量，这是我对并发来由的简单理解。

如何控制并发？说到底就是要控制流动的数量。这几天我刚好遇到一个并发上传的问题，借此机会分享一下我解决问题的方法。

我遇到的场景是，使用分片上传的方式批量上传文件，这个时候会同时产生很多文件流上传到 OSS 的请求，导致中间其他请求延迟和网站崩溃。

同个域名的请求数量大概是 6 个左右（不同浏览器不同），超出的就要等待，造成延迟。请求数量太多也会导致浏览器卡顿和性能下降，响应速度变慢，造成其他请求延迟或者网站崩溃。在业务场景里边，一般上传完会做一些像后端同步上传文件地址还有其他信息的操作，这些请求延迟太久可能失败，其次对于用户体验也不友好如果想要在上传完成后做点什么的话。

一开始的做法是减少切片分片数量，但是批量上传的文件多了还会有问题，不仅慢，而且只要其中一个上传有问题，其他没上传完成的都会因为网站崩溃而需要重新上传。

后边又将允许批量上传的数量从 10 改到 5 个，没想到还是有问题，总不能让我减少到 2 个吧，2 个确实可以了，不过用户就得上传完 2 个再上传两个……，多麻烦，能用技术来解决的尽量用技术解决。

后来我思考了一下，如果能在批量上传多个文件的情况下，两个两个上传就好了。咦，网盘上传文件或者软件商店下载软件不都是这种限流的做法吗，OK，应该可行。

我封装了一个控制并发的服务，接下来讲讲我写的思路。

我画了张流程图如下：

![并发控制流程图](/posts/7-concurrent-control/images/image1.png)

用户推送任务到我们的消费队列的时候，会先进行格式化为一个带状态和有唯一标识的对象，然后再推送进入我们的任务队列。

任务队列并发进行肯定就会导致我们上面所说的并发问题，所以这里是搭建了一个执行队列进行"限流"，执行队列会按用户限定的最多执行数量去并发消费存储队列推送的任务。

消费队列会在消费完成之后更新任务状态并推送到完成队列，完成队列中可以查看已完成任务的状态。

结果队列会将结果依次推送给用户。

大致的 demo 如下：

```jsx
class ConsumeQueue {
  queue: IQueueItem[] = [] // 任务存储队列
  consumingQueue: IConsumeItem[] = [] // 执行队列
  perConsumeCount: number // 执行队列单次并发执行的任务数量
  consume: (item: any, onSUccess, onError) => void // 消费函数，需要用户传的
  finishedQueue: IConsumeItem[] = [] // 完成队列
  isAutoStart: boolean // 是否自动开始，如果有控制开始时机可以使用
  private status: 'idle' | 'working' | 'error' // 类的状态，构思的时候写的，这里没用到

  constructor(options: ConsumeQueueOptions) {
    const { perConsumeCount = 2,consume, isAutoStart = true } = options
    if (!consume) {
      console.error('请初始化消费函数')
      return
    }
    this.perConsumeCount = perConsumeCount
    this.consume = consume
    this.isAutoStart = isAutoStart
  }

  pushTasks(items: IQueueItem[]) {
    // 用户推送数据项时，将每个数据项任务格式化
    const formattedItems = items.map(item => this.formatTask(item))
    this.queue = [...formattedItems, ...this.queue]
    if (this.isAutoStart) {
      this.fillConsumeQueue()
    }
  }

  private fillConsumeQueue() {
    // 将执行队列填满
    if (this.consumingQueue.length < this.perConsumeCount) {
      for (let i = this.consumingQueue.length; i < this.perConsumeCount; i++) {
        if (this.queue.length) {
          const task = this.queue.shift()
          this.consumingQueue.push(task)
        } else break
      }
    }
    this.consumeTasks()
  }

  private consumeTasks() {
    this.consumingQueue.forEach((item, index) => {
      if (item.status === 'wait') {
        item.status = 'loading'
        this.consume(
          item.data,
          () => this.onSuccess(item.key),
          () => this.onError(item.key)
        )
      }
    })
  }

  // 暂停或取消
  cancel() {
    // 本次暂时没用到
  }
  
  private formatTask(item: IQueueItem): IConsumeItem {
    // 格式化用户推送的任务
    return {
      data: item,
      status: 'wait', // wait failed success
      key: String(Date.now()),
    }
  }
  
  private onSuccess(key: string) {
    const item = this.consumingQueue.find((item) => item.key === key)!
    item.status = 'success'
    this.finishedQueue.push(item)
    this.consumingQueue = this.consumingQueue.filter((item) => item.key !== key)
    console.log('任务执行成功', key)
    console.log(`库存剩余${this.queue.length}个`)
    console.log(`有${this.consumingQueue.length}个任务正在执行中`)
    if (this.queue.length) {
      this.fillConsumeQueue()
    } else if (!this.consumingQueue.length) {
      console.log('所有任务均已处理完毕，处理结果：', this.finishedQueue)
    }
  }

  private onError(key: string) {
    console.log('任务执行失败', key)
    const item = this.consumingQueue.find((item) => item.key === key)!
    this.finishedQueue.push(item)
    this.consumingQueue = this.consumingQueue.filter((item) => item.key !== key)
    this.fillConsumeQueue()
  }
  
}

export default ConsumeQueue
```

记录一下解决问题的过程，如果有哪里写的有问题或者说有优化的地方，大家可以指点一下。