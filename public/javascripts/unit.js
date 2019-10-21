import Calc from './calc.js';
import Point from './point.js';
import TimerManager from './timerManager.js';

var moon = new Image();
moon.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png';

class Unit extends Point {
    constructor(props) {
        super(props);
        this.speed = 1;
        this.map = props.map;
        this.stats = {
            hunger: 10,
            maxHunger: 10,
            thirst: 10,
            maxThirst: 10,
            energy: 10,
            maxEnergy: 10,
            health: 10,
            maxHealth: 10
        };
        this.timerManager = new TimerManager();
        this.inventory = {};
    }
    update(delta) {
        this.timerManager.delta = delta;
        this.act();
        this.draw();
    }
    act() {
        if (this.destination) {
            this.move();
        }
        if (! this.destination) {
            this.wander();
        }
    }
    wander() {
        if (! this.destination) {
            this.destination = this.getRandomPixel();
        }
        this.distance = Calc.distanceBetween(this, this.destination);
        if (this.distance <= 5) {
            // Reached destination
            this.timerManager.delay({
                name: 'wander',
                duration: 2000,
                callback: () => {
                    this.destination = this.getRandomPixel();
                    delete this.timerManager.timers.wander;
                }
            });
        }
    }
    target(target) {
        this.destination = {
            x: target.x,
            y: target.y
        }
    }
    collect(loot) {
        //todo: Add to this.inventory
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
        // this.rotation = Math.atan2(toDestY, toDestX);
    }
}

export default Unit;
