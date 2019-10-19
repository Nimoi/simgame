import Timer from './timer.js';

class TimerManager {
    constructor(props) {
        this.timers = {};
    }
    delay(options) {
        if (! (options.name in this.timers)) {
            this.timers[options.name] = new Timer({
                start: this.delta,
                duration: options.duration,
                callback: () => {
                    options.callback()
                }
            });
        }
        this.timers[options.name].tick(this.delta);
    }
}

export default TimerManager;