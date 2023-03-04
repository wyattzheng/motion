class Animation {
    state = "stopped";
    startTime = 0;
    context = {};
    actions = new Map();
    playedActions = new Set();
    rafId = 0;

    constructor(option = {}) {
        this.option = option;
    }

    action(rangeOrFn, fn, option) {
        let func, range;
        if (rangeOrFn instanceof Function) {
            func = rangeOrFn;
            option = fn;
            range = null; // 无限范围
        } else {
            range = rangeOrFn;
            func = fn;
        }
        this.actions.set(func, { option, range });
    };

    _getDuration() {
        let max = 0;
        this.actions.forEach((item, actionFn) => {
            if (Array.isArray(item.range)) {
                max = Math.max(max, item.range[1]);
            } else if (item.range !== null) {
                max = Math.max(max, item.range);
            }
        })
        return max;
    }

    _execute(timestamp) {
        const duration = this._getDuration();
        this.actions.forEach((item, actionFn) => {
            if (this.playedActions.has(actionFn)) {
                return;
            }
            if (Array.isArray(item.range)) {
                const [from, to] = item.range;
                const duration = to - from;
                let percent = (timestamp - from) / duration;

                if (timestamp < from) {
                    return;
                }
                if (timestamp > to) {
                    percent = 1;
                    this.playedActions.add(actionFn);
                }

                actionFn(percent, this.context);
            } else if (item.range === null) {
                actionFn(timestamp / duration, this.context);
            } else {
                if (timestamp > item.range) {
                    actionFn({ curr: item.range, percent: 1 }, this.context);
                    this.playedActions.add(actionFn);
                }
            }
        });
    }
    _handleFrame = () => {
        const duration = this._getDuration();
        const timestamp = performance.now() - this.startTime;
        this._execute(timestamp);
        if (timestamp > duration) {
            this.state = "stopped";
            if (this.option.loop) {
                this.play();
            }
            return;
        }
        if (this.state === "playing") {
            this.rafId = window.requestAnimationFrame(this._handleFrame);
        }
    };
    play() {
        if (this.state === "paused") {
            this.startTime = performance.now() - this.pausedAtTimestamp;
            this.state = "playing";
            this.rafId = window.requestAnimationFrame(this._handleFrame);
            return;
        }
        if (this.state !== "stopped") {
            return;
        }
        window.cancelAnimationFrame(this.rafId);
        this.playedActions.clear();
        this.context = {};
        this.startTime = performance.now();
        this.state = "playing";
        this.rafId = window.requestAnimationFrame(this._handleFrame);
    }
    goto(timestamp) {
        this.startTime = performance.now() - timestamp;
        this._execute(timestamp);
    }
    pause() {
        this.pausedAtTimestamp = performance.now() - this.startTime;
        window.cancelAnimationFrame(this.rafId);
        this.state = "paused";
    }
    stop() {
        window.cancelAnimationFrame(this.rafId);
        this.state = "stopped";
    }
}

function animation(option) {
    return new Animation(option);
}

// builder functions: 

function buildHTML(tag, name, style, children) {
    const elem = document.createElement(tag)
    const props = style.props;
    delete style.props;
    elem.className = name;
    if (!style.position) {
        style.position = "absolute";
    }
    if (!style.left) {
        style.left = 0;
    }
    if (!style.top) {
        style.top = 0;
    }
    for(const key in style) {
        if (typeof(style[key]) === "number") {
            elem.style[key] = style[key] + 'px';
        } else {
            elem.style[key] = style[key];
        }
    }
    for(const key in props) {
        tag[key] = props[key]
    }
    if (children) {
        elem.innerHTML = children.join("\n");
    }
    return elem.outerHTML;
}

const div = (name, style, children) => {
    if(name && style) {
        return buildHTML("div", name, style, children)
    } else if (name && !style) {
        return Array.isArray(name) ? buildHTML("div", "", {}, name) : buildHTML("div", name, {}, []);
    } else {
        return ""
    }
};
const canvas = (name, style, children) => buildHTML("canvas", name, style, children);

// helper functions:

const move = (name, x, y) => {
    document.querySelectorAll('.' + name).forEach((elem) => {
        elem.style.left = `${x}px`;
        elem.style.top = `${y}px`;
    })
}

const text = (name, text) => {
    document.querySelectorAll('.' + name).forEach((elem) => {
        elem.innerText = text;
    })
}

