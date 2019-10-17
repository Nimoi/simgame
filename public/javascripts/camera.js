class Camera {
    constructor(props) {
        this.x = 0;
        this.y = 0;
        this.width = props.width;
        this.height = props.height;
        this.map = props.map;
        // this.maxX = this.map.cols * this.map.tileSize - this.width;
        this.maxX = this.map.cols * this.map.tileSize;
        // this.maxY = this.map.rows * this.map.tileSize - this.height;
        this.maxY = this.map.rows * this.map.tileSize;
        this.speed = 256;
    }
    move(delta, dirx, diry) {
        // move camera
        this.x += dirx * this.speed * delta;
        this.y += diry * this.speed * delta;
        // clamp values
        this.x = Math.max(0, Math.min(this.x, this.maxX));
        this.y = Math.max(0, Math.min(this.y, this.maxY));
    }
}

export default Camera;
