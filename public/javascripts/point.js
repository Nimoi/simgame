var moon = new Image();
moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png';

class Point {
    constructor(props) {
        this.x = props.x;
        this.y = props.y;
        this.camera = props.camera;
        this.canvas = props.canvas;
        // props.sprite ? moon
        this.sprite = moon;
        this.size = props.size;
    }
    draw() {
        let xOffset = this.x - this.camera.x,
            yOffset = this.y - this.camera.y;
        this.canvas.ctx.drawImage(this.sprite, xOffset, yOffset, this.size, this.size);
    }
    update() {
        this.draw();
    }
}

export default Point;