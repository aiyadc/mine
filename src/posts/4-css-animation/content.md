## CSS 动画入门

CSS 动画可以让你的网页更加生动有趣，提升用户体验。

## CSS 动画基础

### transition

transition 可以实现简单的过渡效果。

```css
.element {
  transition: all 0.3s ease;
}
```

### animation

animation 可以实现更复杂的动画效果。

```css
@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
```

## 动画技巧

### 使用 transform

使用 transform 代替 position 可以获得更好的性能。

### 使用 will-change

提前告知浏览器哪些属性会变化，优化渲染性能。

## 高级技巧

### 动画时序函数

使用 cubic-bezier 自定义动画曲线。

### 动画组合

组合多个动画创造更复杂的效果。

## 总结

掌握 CSS 动画技巧可以让你的网页更加生动有趣。
