class Timer {
    constructor(props) {
        this.start = props.start;
        this.duration = props.duration;
        this.callback = props.callback;
    }
    tick(delta) {
        if (this.start + this.duration < delta) {
            this.callback();
        }
    }
}

export default Timer;