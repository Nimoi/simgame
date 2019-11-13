import Calc from './calc.js';

var moon = new Image();
moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png';

class Point {
    constructor(props) {
        this.x = props.x;
        this.y = props.y;
        this.camera = props.camera;
        this.canvas = props.canvas;
        this.map = props.map;
        this.sprite = moon;
        this.width = props.width;
        this.height = props.height;
        this.scale = 'scale' in props ? props.scale : 1;
    }
    draw() {
        let scaledWidth = this.width * this.scale,
            scaledHeight = this.height * this.scale,
            originX = this.x - scaledWidth / 2,
            originY = this.y - scaledHeight / 2;
        this.xOffset = originX - this.camera.x;
        this.yOffset = originY - this.camera.y;
        this.canvas.ctx.drawImage(this.sprite, this.xOffset, this.yOffset, scaledWidth, scaledHeight);
    }
    update() {
        this.draw();
    }
    getRandomPixel() {
        return {
            x: Calc.randomInt(0, this.map.cols * this.map.tileSize),
            y: Calc.randomInt(0, this.map.rows * this.map.tileSize)
        };
    }
}

export default Point;