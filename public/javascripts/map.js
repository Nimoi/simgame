import Calc from './calc.js';

// Generate landscape
class Map {
    constructor(props) {
        this.canvas = props.canvas;
        this.cols = props.cols;
        this.rows = props.rows;
        this.tileSize = props.tileSize;
        this.tileAtlas = new Image();
        this.tileAtlas.src = '/images/tiles.png';
        this.layers = [];
        this.tileData = {};
        this.generate();
    }
    generate() {
        this.layers = [];
        let layer = [];
        for (let r = 0; r < this.rows*2; r++) {
            for (let c = 0; c < this.cols*2; c++) {
                layer.push(Calc.randomInt(1,2));
            }
        }
        this.layers.push(layer);
    }
    select(tileIndex) {
        if (! (tileIndex in this.tileData)) {
            this.tileData[tileIndex] = {};
        }
        this.tileData[tileIndex].selected = true;
    }
    getTile(layer, col, row) {
        return this.layers[layer][row * this.cols + col];
    }
    getTileIndex(col, row) {
        return row * this.cols + col;
    }
    getTileFromPosition(pos) {
        let cols = Math.floor(pos.x / this.tileSize),
            rows = Math.floor(pos.y / this.tileSize);
        return this.getTileIndex(cols, rows);
    }
    drawLayer(layer, camera) {
        let startCol = Math.floor(camera.x / this.tileSize),
            endCol = startCol + (camera.width / this.tileSize) + 1,
            startRow = Math.floor(camera.y / this.tileSize),
            endRow = startRow + (camera.height / this.tileSize) + 1,
            offsetX = -camera.x + startCol * this.tileSize,
            offsetY = -camera.y + startRow * this.tileSize;

        for (let c = startCol; c <= endCol; c++) {
            for (let r = startRow; r <= endRow; r++) {
                let tile = this.getTile(layer, c, r),
                    x = (c - startCol) * this.tileSize + offsetX,
                    y = (r - startRow) * this.tileSize + offsetY;
                this.canvas.ctx.drawImage(
                    this.tileAtlas, // image
                    (tile - 1) * this.tileSize, // source x
                    0, // source y
                    this.tileSize, // source width
                    this.tileSize, // source height
                    Math.round(x),  // target x
                    Math.round(y), // target y
                    this.tileSize, // target width
                    this.tileSize // target height
                );
                let tileIndex = this.getTileIndex(c,r),
                    tileData = this.tileData[tileIndex],
                    newOffset = Math.round(y + 25);
                if (tileData && tileData.selected) {
                    this.canvas.ctx.font = "12px Arial";
                    this.canvas.ctx.fillText(this.constructor.name, Math.round(x), newOffset);
                    this.canvas.ctx.strokeStyle = '#0084ff';
                    this.canvas.ctx.strokeRect(x+2, y+2, this.tileSize-4, this.tileSize-4);
                }
            }
        }
    }
    update(camera) {
        this.drawLayer(0, camera);
    }
}

export default Map;
