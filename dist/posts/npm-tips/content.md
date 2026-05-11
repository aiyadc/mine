# npm 不完全指南：两个让我效率翻倍的小技巧

用 npm 好几年了，除了 `install` 和 `publish`，其实还有很多好用的功能。这篇文章不讲基础命令，只分享两个我在工程化中经常用到的技巧：自定义 `npm init` 和 `npm link`。

## 一、自定义 npm init：告别手写 package.json

每次新建项目都要手写 `package.json`，或者从别的项目复制过来再改，很烦。其实 npm 允许我们定制 `npm init` 的行为。

### 原理很简单

`npm init` 本质上就是执行一个 shell 脚本，输出一份默认的 `package.json`。我们可以通过一个自定义的 `.npm-init.js` 文件来完全控制生成的内容。

### 我的实践

在用户根目录（`~`）下创建 `.npm-init.js`，`module.exports` 返回一个对象，就是最终的 `package.json` 内容。

为了更灵活，可以用 `prompt()` 方法跟用户交互：

```jsx
const desc = prompt('请输入项目描述', '项目描述...');

module.exports = {
  name: prompt('name?', process.cwd().split('/').pop()),
  version: prompt('version?', '0.0.1'),
  description: desc,
  main: 'index.js',
  repository: prompt('github repository url', '', function (url) {
    if (url) {
      // 自动初始化 git 并推送
      run('touch README.md');
      run('git init');
      run('git add README.md');
      run('git commit -m "first commit"');
      run(`git remote add origin ${url}`);
      run('git push -u origin master');
    }
    return url;
  })
};
```

然后执行：

```bash
npm config set init-module ~/.npm-init.js
```

之后在任何目录下敲 `npm init`，都会用我的自定义脚本生成 `package.json`，还能顺带初始化 git 仓库。

### **偷懒小技巧**

如果不想写脚本，也可以直接配置常用字段的默认值：

```bash
npm config set init.author.name "你的名字"
npm config set init.author.email "你的邮箱"
npm config set init.author.url "你的网站"
npm config set init.license "MIT"
```

这样 `npm init` 生成的 `package.json` 就会自动带上这些信息。

## **二、npm link：本地调试 npm 包的利器**

开发公共库或组件时，最头疼的就是**验证**。你不能每次都发布一个 beta 版到 registry，然后再在业务项目里安装。手动复制粘贴产物到 `node_modules` 又太原始。

`npm link` 完美解决了这个问题。它可以在本地把正在开发的包“链接”到任何一个项目中，就像已经发布了一样。

### **场景演示**

假设你正在开发一个 npm 包叫 `my-common-lib`，现在想在项目 `my-project` 中测试它的最新代码。

**步骤 1：在包目录中创建全局链接**

```bash
cd ~/my-common-lib
npm link
```

这会在全局 `node_modules` 中创建一个指向 `my-common-lib` 当前目录的软链接。

**步骤 2：在业务项目中链接该包**

```bash
cd ~/my-project
npm link my-common-lib
```

此时 `my-project/node_modules` 下会出现一个 `my-common-lib` 的软链接，指向你本地的开发目录。你在 `my-common-lib` 中修改的任何代码，都会立即在 `my-project` 中生效（可能需要重启构建工具）。

**步骤 3：调试完成，解除链接**

```bash
cd ~/my-project
npm unlink my-common-lib   # 移除项目中的链接
cd ~/my-common-lib
npm unlink                 # 移除全局链接（可选）
```

### **原理简析**

`npm link` 本质就是**软链接**（symlink）：

- 在全局目录 `/usr/local/lib/node_modules/` 下创建指向目标包的链接
- 如果包有可执行文件（bin），还会在 `/usr/local/bin/` 下创建链接

这样就实现了本地代码的“全局安装”，然后在其他项目里通过链接引用。

> ⚠️ 注意：如果你的包有 peer dependencies，`npm link` 可能导致依赖解析问题。这时候可以用 `npm link <pkg> --only=production` 或考虑使用 `yarn link`。

## **总结**

| **技巧** | **一句话作用** | **常用场景** |
| --- | --- | --- |
| 自定义 `npm init` | 自动化生成 `package.json` | 新项目初始化、团队规范 |
| `npm link` | 本地调试未发布的 npm 包 | 组件库开发、公共工具验证 |

这两个小技巧极大提升了我的日常开发效率。如果你也有类似的痛点，不妨试试看。

**参考资料**

- [npm init](https://docs.npmjs.com/cli/v8/commands/npm-init)
- [npm config](https://docs.npmjs.com/cli/v8/commands/npm-config)
- [npm link](https://docs.npmjs.com/cli/v8/commands/npm-link)