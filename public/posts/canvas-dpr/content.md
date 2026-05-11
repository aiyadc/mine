# Canvas 画布清晰度之谜

> 做图片编辑器时被 Canvas 图片模糊问题折腾过好多次，后面终于搞明白了。这里记录一下原因和解决方案，方便以后查阅。

## 遇到的问题

之前用 Canvas 做海报生成，明明图片很清晰，画上去就变糊了。尤其是在手机（Retina 屏）上，文字边缘发虚，看起来很难受。

查了一圈，发现很多人都会踩这个坑。

## 为什么模糊

核心一句话：**Canvas 的实际像素尺寸和 CSS 显示尺寸不一致，浏览器强行拉伸导致模糊**。

Canvas 有两个 `width`：

- `canvas.width`：画布真实的像素数量（位图尺寸）
- `canvas.style.width`：画布在页面上的显示大小

如果前者是 300，后者是 300px，在普通屏幕（DPR=1）上刚好一一对应。

但如果 DPR=2，屏幕需要用 2×2 个物理像素来显示 1 个 CSS 像素。此时 300px 的 CSS 尺寸对应 600 个物理像素，可画布只有 300 个真实像素，不够分，浏览器就强行拉伸放大了——结果就是模糊。

简单来说：

- `canvas.width` 决定细节数量
- `canvas.style.width` 决定呈现多大
- 两者不匹配 → 插值缩放 → 糊

## 我的解决方案

把 `canvas.width` 设为 `CSS宽度 × devicePixelRatio`。

```jsx
const dpr = window.devicePixelRatio || 1;
canvas.style.width = `${cssWidth}px`;
canvas.style.height = `${cssHeight}px`;
canvas.width = cssWidth * dpr;
canvas.height = cssHeight * dpr;
const ctx = canvas.getContext('2d');
ctx.scale(dpr, dpr);   // 后续继续用 CSS 像素坐标，省心
```

这样画布有足够多的像素去匹配物理屏幕，不再需要缩放，就清晰了。

## **几个容易踩的坑**

1. **多次调用 `ctx.scale`**
    
    如果不小心调了两次，坐标会乱。记得只初始化一次。
    
2. **导出图片变大了**
    
    `canvas.toDataURL()` 导出的是实际像素尺寸（比如 600×600），会比 CSS 尺寸大。
    
    如果非要导出和 CSS 尺寸一致，可以临时建个小画布 `drawImage` 缩放一下。
    
3. **文字还是有点虚？**
    
    配合 `ctx.scale` 时，字体大小直接写 CSS 像素就行，不用再乘 DPR。
    
    例如：`ctx.font = '16px Arial'`，`scale` 会自动放大。
    

## **效果对比**

| **配置** | **DPR=2 下显示** |
| --- | --- |
| `width=300, style=300px` | ❌ 模糊 |
| `width=600, style=300px`（未 scale） | ✅ 清晰，但坐标要手动乘 2 |
| `width=600, style=300px + scale(2)` | ✅ 清晰，坐标按习惯写，最舒服 |

## **总结**

Canvas 模糊就是实际像素和 CSS 尺寸不匹配导致的。解决办法固定三步：

1. 取 `devicePixelRatio`
2. `canvas.width/height` 乘上 DPR
3. `ctx.scale(dpr, dpr)` 保持坐标顺手

之后画图、写字、贴图片都正常写 CSS 像素值，在高清屏上也能保持锐利。

**参考资料**

- [MDN - devicePixelRatio](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio)
- [Konva - High-DPI](https://konvajs.org/docs/performance/High-DPI.html)