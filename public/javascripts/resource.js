import Point from './point.js';

var moon = new Image();
moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png';

class Resource extends Point {
    constructor(props) {
        super(props);
        this.loot = {};
    }
    draw() {
        super.draw();
        if (this.selected) {
            this.canvas.ctx.font = "12px Arial";
            let newOffset = this.yOffset + 25;
            this.canvas.ctx.fillText(this.constructor.name, this.xOffset, newOffset);
            newOffset += 10;
            for (let item in this.loot) {
                let str = `${item}: ${this.loot[item]}`;
                this.canvas.ctx.fillText(str, this.xOffset, newOffset);
                newOffset += 10;
            }
        }
    }
    collect() { }
}

export default Resource;