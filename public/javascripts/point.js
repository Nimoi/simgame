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
        // props.sprite ? moon
        this.sprite = moon;
        this.size = props.size;
        this.width = this.size;
        this.height = this.size;
        this.anchor = {
            x: this.x,
            y: this.y
        };
    }
    draw() {
        let originX = this.x - this.size / 2,
            originY = this.y - this.size / 2;
        this.xOffset = originX - this.camera.x;
        this.yOffset = originY - this.camera.y;
        this.canvas.ctx.drawImage(this.sprite, this.xOffset, this.yOffset, this.width, this.height);
    }
    update() {
        this.draw();
    }
    getRandomPixel() {
        return {
            x: Calc.getRandomArbitrary(0, this.map.cols * this.map.tileSize),
            y: Calc.getRandomArbitrary(0, this.map.rows * this.map.tileSize)
        };
    }
}

export default Point;