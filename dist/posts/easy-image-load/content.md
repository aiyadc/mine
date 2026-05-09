# 图片加载优化

## 1. 懒加载

懒加载是一种延迟加载技术，只有当图片进入视口时才开始加载，有效减少页面初始加载时间。

### 1.1 img 原生自带的 lazy 属性

现代浏览器支持原生的 `loading="lazy"` 属性，可以实现视图出现才加载：

```html
<img src="image.jpg" loading="lazy" alt="图片">
```

### 1.2 使用 Intersection Observer API

自行控制图片加载的时机，使用 Intersection Observer API 观察元素，等元素出现再加载：

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('img[data-src]').forEach(img => {
  observer.observe(img);
});
```

## 2. 压缩

图片压缩可以显著减小文件大小，提升加载速度。

### 2.1 CDN 压缩服务

上传到 CDN，使用 CDN 自带的压缩和裁剪服务，如阿里 OSS、七牛云等。通过 URL 参数指定压缩质量、尺寸等。

### 2.2 主动压缩

在上传前手动压缩图片，可以使用在线工具如 [TinyPNG](https://tinypng.com/)、[Compressor.io](https://compressor.io/) 等。

## 3. 占位图

使用占位图可以提升用户体验，避免页面闪烁。

### 3.1 模糊占位图（LQIP）

使用图片的模糊版本（尺寸很小）做占位，等加载出来再显示高清版本：

```html
<img 
  src="low-quality-image.jpg" 
  data-src="high-quality-image.jpg" 
  class="blur-up" 
  alt="图片"
>
```

### 3.2 骨架屏

使用 CSS 绘制骨架屏作为占位，模拟图片的大致轮廓：

```css
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}
```

## 4. 图片合并（CSS Sprites）

针对小图标场景，将多张小图标合并成一张大图。

### 4.1 CSS Sprites（雪碧图）

把多张小图标合并成一张大图，然后通过 CSS `background-position` 来显示其中某一块：

```css
.icon {
  background-image: url('sprites.png');
  background-repeat: no-repeat;
}

.icon-home {
  background-position: 0 0;
  width: 32px;
  height: 32px;
}

.icon-user {
  background-position: -32px 0;
  width: 32px;
  height: 32px;
}
```

这种方式可以减少 HTTP 请求次数，但需要处理好合并和位移计算。