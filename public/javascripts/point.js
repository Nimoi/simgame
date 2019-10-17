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
        this.width = this.size;
        this.height = this.size;
    }
    draw() {
        let originX = this.x - this.size / 2,
            originY = this.y - this.size / 2,
            xOffset = originX - this.camera.x,
            yOffset = originY - this.camera.y;
        this.canvas.ctx.drawImage(this.sprite, xOffset, yOffset, this.size, this.size);
    }
    update() {
        this.draw();
    }
}

export default Point;