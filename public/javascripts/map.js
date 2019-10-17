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
        this.layers = [[
            3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
            3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
            3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
            3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
            3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
            3, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 3,
            3, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 3,
            3, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 3,
            3, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 3,
            3, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 3,
            3, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 3,
            3, 3, 3, 1, 1, 2, 3, 3, 3, 3, 3, 3
        ], [
            4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            4, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 4,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
            4, 4, 4, 0, 5, 4, 4, 4, 4, 4, 4, 4,
            4, 4, 4, 0, 0, 3, 3, 3, 3, 3, 3, 3
        ]];
        this.generate();
    }
    generate() {
        let layer = [];
        for (let r = 0; r < this.rows; r++) {
            let row = [];
            for (let c = 0; c < this.rows; c++) {
                row.push(Calc.getRandomArbitrary(0,2));
            }
            layer.push(row);
        }
        console.log(layer);
        // this.layers.push(layer);
    }
    getTile(layer, col, row) {
        return this.layers[layer][row * this.cols + col];
    }
    drawLayer(layer, camera) {
        let startCol = Math.floor(camera.x / this.tileSize),
            endCol = startCol + (camera.width / this.tileSize),
            startRow = Math.floor(camera.y / this.tileSize),
            endRow = startRow + (camera.height / this.tileSize),
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
            }
        }
    }
}

export default Map;
