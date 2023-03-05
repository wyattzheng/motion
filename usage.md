## 使用说明

点击 `+ New Motion File` 来创建一个动画文件

## 基础 API

## animation(option)

`animation()` 函数创建并返回一个动画对象 `anim`.

1. 使用 `anim.play()` 来开始播放。
2. 使用 `anim.pause()`、`anim.play()` 来暂停或恢复动画。
3. 使用 `anim.goto(timestamp)` 来快速跳转到动画的某一时刻。
4. 使用 `anim.stop()` 来停止动画。

### option 选项

选项是指`animation()`函数的第一个参数。

1. `option.loop` 是一个布尔值, `true` 代表动画自动循环播放, `false` 代表动画只会播放一次。

## anim.action(range, fn) 

`anim.action()` 创建一个动作, 一个动画是由多个动作而定义的。

### range 时间范围

`range` 是该动作的时间范围或时间点。

1. 例如 `[1000, 3000]` 代表当时间来到 `第1秒` 和 `第3秒` 之间时, 函数 `fn` 会不断地被执行。
2. 例如直接填写 `1500` 代表, 时间到达 `第 1.5 秒` 后立即执行, 只执行一次。
3. 若 `range` 不填写， 那么 `fn` 整个动画播放的期间都会被不断地执行。

### fn 回调函数

函数会在 `action` 定义的时间范围执行。

回调函数每次被调用的时候, 会携带一个参数 `percent`。

代表时间范围已经经过的百分比, 取值范围 `0 ~ 1`。

### 代码自动补全

输入 `anim.action` 会看到一个`自动补全项`, 选择后自动补全代码。

## Builder 函数

motion 提供了多个 Builder 函数，以快速创建 HTML 对象。

一般创建 HTML 对象最好在动画刚开始的时候，例如:

```javascript
anim.action(0, () => {
    document.body.innerHTML = div("human", {width: 50, height: 100} [
        div("head"),
        div("left-arm"),
        div("right-arm"),
        div("body"),
        div("left-leg"),
        div("right-leg"),
    ]);
});
```
### div(className, style, children)

1. className: HTML元素的类名
2. style: HTML元素的样式
3. children: 可用于继续嵌套多个 Builder 函数

`div` 函数的返回值是一段 HTML 字符串。

### canvas(className, style, children)

与 `div` 函数同理, 但创建的是 `canvas` 对象

## 帮助函数

motion 提供了多个帮助函数, 用于快速修改 HTML对象的 样式、属性。

### move(className, x, y)

该函数会查找类名为 `className` 的所有 `DOM` 对象, 并修改它们的 `style.left` 和 `style.top` 为 `x` 和 `y`。

### text(className, content)

该函数会查找类名为 `className` 的所有 `DOM` 对象, 并修改它们的 `innerText` 为 `content`。

### style(className, styleName, styleValue)

该函数会查找类名为 `className` 的所有 `DOM` 对象, 并修改它们的样式 `styleName` 为 `styleValue`。

