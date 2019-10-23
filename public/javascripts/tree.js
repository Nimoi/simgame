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
    }
    collect() {
        return {wood:10};
    }
}

export default Tree;