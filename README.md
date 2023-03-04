# motion

motion 是一个快速制作演示动画的工具, 面向 Web 开发者.

使用 motion 可以快速制作一段简短的动画来表达你的想法, 

只需使用`JavaScript`、`HTML` 来快速制作你的动画.

---

这是一段演示的例子: 

```javascript
const anim = animation({ loop: true });

anim.action(0, () => {
    document.body.innerHTML = div("label");
});

anim.action([0, 4000], (x) => {
    text("label", "hello, world!".slice(0, x * 20));
})

anim.play();
```

## playground

在练习操场中, 你可以在网页中快速制作动画, 并自动保存到浏览器中：
