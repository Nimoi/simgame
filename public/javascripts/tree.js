import Resource from "./resource.js";

class Tree extends Resource {
    constructor(props) {
        super(props);
        var treeSprite = new Image();
        treeSprite.src = '/images/tree.png';
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
            y: this.y + this.height - 2
        }
    }
    collect() {
        return this.loot;
    }
}

export default Tree;