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
        // console.log('move camera');
        // move camera
        console.log(this.maxX, this.maxY, this.map.tileSize);
        this.x += dirx * this.speed * delta;
        this.y += diry * this.speed * delta;
        // console.log(dirx,diry);
        // clamp values
        this.x = Math.max(0, Math.min(this.x, this.maxX));
        this.y = Math.max(0, Math.min(this.y, this.maxY));
        // console.log(this.x,this.y);
        // console.log(Math.max(0, Math.min(this.x, this.maxX)));
        // console.log(Math.max(0, Math.min(this.y, this.maxY)));
    }
}

export default Camera;
