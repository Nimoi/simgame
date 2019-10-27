import Resource from "./resource.js";
import Calc from "./calc.js";

class Tree extends Resource {
    constructor(props) {
        super(props);
        let sprites = [
            '/images/tree.png',
            '/images/tree2.png',
            '/images/tree3.png',
        ];
        let randomSprite = Calc.getRandomArbitrary(0, sprites.length - 1);
        let sprite = sprites[randomSprite];
        var treeSprite = new Image();
        treeSprite.src = sprite;
        this.sprite = treeSprite;
        this.width = 16;
        this.height = 27;
        let loc = this.getRandomPixel();
        this.x = loc.x;
        this.y = loc.y;
        this.loot = {
            wood: 10
        };
        this.anchor = {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2
        }
    }
    collect() {
        return this.loot;
    }
}

export default Tree;