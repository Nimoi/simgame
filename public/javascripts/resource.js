import Point from "./point.js";

var moon = new Image();
moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png';

class Resource extends Point {
    constructor(props) {
        super(props);
    }
}

export default Resource;