import Calc from './calc.js';
import Point from "./point.js";

var moon = new Image();
moon.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png';

class Unit extends Point {
    constructor(props) {
        super(props);
        this.impulse = 'wander';
        this.speed = 0.5;
        this.path = [{x: this.x, y: this.y}];
        this.map = props.map;
    }
    update() {
        this.drawPath();
        this.act();
        this.draw();
    }
    act() {
        if (this.impulse === 'wander') {
            this.wander();
        }
    }
    wander() {
        if (!this.destination) {
            this.destination = this.getDestination();
        }
        this.distance = Calc.distanceBetween(this, this.destination);
        if (this.distance <= 5) {
            // Reached destination; pause?
            this.path.push(this.destination);
            this.destination = this.getDestination();
        }
        this.move();
    }
    getDestination() {
        // TODO: Use camera offset
        return {
            x: Calc.getRandomArbitrary(0, this.camera.width),
            y: Calc.getRandomArbitrary(0, this.camera.height)
        };
    }
    move() {
        // Calculate direction towards dest
        var toDestX = this.destination.x - this.x;
        var toDestY = this.destination.y - this.y;

        // Normalize
        var toDestDistance = Math.sqrt(toDestX * toDestX + toDestY * toDestY);
        toDestX = toDestX / toDestDistance;
        toDestY = toDestY / toDestDistance;

        // Move towards the dest
        this.x += toDestX * this.speed;
        this.y += toDestY * this.speed;

        // Rotate us to face the dest
        this.rotation = Math.atan2(toDestY, toDestX);
    }
    drawPath() {
        // TODO: Use camera offset
        this.canvas.ctx.beginPath();
        for (var i=0; i < this.path.length; i++) {
            var x = this.path[i].x - this.camera.x,
                y = this.path[i].y - this.camera.y;
            if (i === 0) {
                this.canvas.ctx.moveTo(x, y);
                continue;
            }
            this.canvas.ctx.lineTo(x, y);
        }
        this.canvas.ctx.lineTo(this.x - this.camera.x, this.y - this.camera.y);
        this.canvas.ctx.strokeStyle = '#eee';
        this.canvas.ctx.stroke();
    }
}

export default Unit;
