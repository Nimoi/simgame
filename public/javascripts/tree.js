import Resource from "./resource.js";
import Calc from "./calc.js";
import TimerManager from './timerManager.js';

class Tree extends Resource {
    constructor(props) {
        super(props);
        let sprites = [
            '/images/tree.png',
            '/images/tree2.png',
            '/images/tree3.png',
        ];
        let randomSprite = Calc.randomInt(0, sprites.length - 1);
        let sprite = sprites[randomSprite];
        var treeSprite = new Image();
        treeSprite.src = sprite;
        this.sprite = treeSprite;
        this.width = 16;
        this.height = 27;
        if (! ('x' in props) && ! ('y' in props)) {
            let loc = this.getRandomPixel();
            this.x = loc.x;
            this.y = loc.y;
        }
        this.loot = {
            wood: 10
        };
        this.anchor = {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2
        };
        this.seeds = Calc.randomInt(0, 3);
        this.timerManager = new TimerManager();
    }
    collect() {
        return this.loot;
    }
    update(delta, game) {
        this.draw();
        this.timerManager.delta = delta;
        if (this.scale < 1) {
            return this.grow();
        }
        this.disperse(game);
    }
    grow() {
        this.timerManager.delay({
            name: 'grow',
            duration: 500,
            callback: () => {
                this.scale += 0.01;
                delete this.timerManager.timers.grow;
            }
        });
    }
    disperse(game) {
        let delay = Calc.randomInt(5000, 60000);
        this.timerManager.delay({
            name: 'dropSeed',
            duration: delay,
            callback: () => {
                this.dropSeed(game);
                delete this.timerManager.timers.dropSeed;
            }
        });
    }
    dropSeed(game) {
        if (this.seeds === 0) {
            return;
        }
        this.seeds--;
        let treeX = Calc.randomInt(this.x-40, this.x+40),
            treeY = Calc.randomInt(this.y-40, this.y+40);
        game.addTree({
            x: treeX,
            y: treeY,
            scale: 0.01
        });
    }
}

export default Tree;