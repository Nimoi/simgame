var moon = new Image();
moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png';

class Resource {
    constructor(props) {
        this.x = props.x;
        this.y = props.y;
        this.camera = props.camera;
        this.canvas = props.canvas;
    }
    draw() {
        let xOffset = this.x - this.camera.x,
            yOffset = this.y - this.camera.y;
        this.canvas.ctx.drawImage(moon, xOffset, yOffset, 10, 10);
    }
    update() {
        this.draw();
    }
}

export default Resource;