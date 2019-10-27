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
    }
    draw() {
        let originX = this.x - this.width / 2,
            originY = this.y - this.height / 2;
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