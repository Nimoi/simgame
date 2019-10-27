import Point from './point.js';

class Camp extends Point {
    constructor(props) {
        super(props);
        let sprite = new Image();
        sprite.src = '/images/camp.png';
        this.sprite = sprite;
        this.width = 32;
        this.height = 32;
        let loc = this.getRandomPixel();
        this.x = loc.x;
        this.y = loc.y;
    }
}

export default Camp;