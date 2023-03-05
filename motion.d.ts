interface CreateOption {
    loop: boolean
}

type BuilderFunction = (name: string, style?: any, children?: string[]) => string;
type ActionCallback = (percent: number) => any;

interface MotionAnimation{
    constructor(option?: CreateOption);
    action(rangeOrFn: [number, number] | number | ActionCallback, fn?: ActionCallback): void;
    play(): void;
    goto(timestamp: number): void;
    pause(): void;
    stop(): void;
}

declare var animation: (option?: CreateOption) => MotionAnimation;
declare var div: BuilderFunction;
declare var move: (className: string, x: number, y: number) => void;
declare var text: (className: string, content: string) => void;
declare var style: (className: string, styleName: string, styleValue: string) => void;
