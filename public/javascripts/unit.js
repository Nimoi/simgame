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
        this.selected = false;
        console.log();
    }
    draw() {
        super.draw();
        if (this.selected) {
            this.canvas.ctx.font = "12px Arial";
            let newOffset = this.yOffset + 25;
            this.canvas.ctx.fillText(this.constructor.name, this.xOffset, newOffset);
            newOffset += 10;
            for (let item in this.inventory) {
                let str = `${item}: ${this.inventory[item]}`;
                this.canvas.ctx.fillText(str, this.xOffset, newOffset);
                newOffset += 10;
            }
        }
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
        for (let item in loot) {
            if (! (item in this.inventory)) {
                this.inventory[item] = loot[item];
                continue;
            }
            this.inventory[item] += loot[item];
        }
    }
    harvest(resource, callback) {
        let loot = resource.collect();
        this.timerManager.delay({
            name: 'harvest',
            duration: 2000,
            callback: () => {
                this.collect(loot);
                callback();
                delete this.timerManager.timers.harvest;
            }
        });
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
