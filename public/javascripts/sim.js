import Keyboard from './input.js';
import Unit from './unit.js';
import Map from './map.js';
import Camera from './camera.js';

var sun = new Image();
var moon = new Image();
var earth = new Image();

var canvas = {
    width: 800,
    height: 600,
    ctx: document.getElementById('simulation').getContext('2d'),
    clearCanvas: function () {
        this.ctx.clearRect(0, 0, this.width, this.height); // clear canvas
    }
};

    // Grid tiles
// Map scrolling / mouse corners
// Units have needs - Hunger, Thirst, Tired
// Units have skills - ???
// Unit skills have levels / require experience

var map = new Map({
    cols: 12,
    rows: 12,
    tileSize: 64,
});

var camera = new Camera({
    width: canvas.width * 2,
    height: canvas.height * 2,
    map: map
});

var nimoi = new Unit({
    x: 100,
    y: 100,
    size: 10,
    canvas: canvas,
    map: map,
    camera: camera
});

var Game = {
    units: [nimoi],
    map: map,
    camera: camera,
    delta: 0,
    previousElapsed: 0,
    images: {},
    init: function () {
        this.images.sun = (new Image()).src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png';
        this.images.moon = (new Image()).src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png';
        this.images.earth = (new Image()).src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png';
        // this.images.tileAtlas = (new Image()).src = '/images/tiles.png';
        this.images.tileAtlas = new Image();
        this.images.tileAtlas.src = '/images/tiles.png';
        Keyboard.listenForEvents([Keyboard.LEFT, Keyboard.RIGHT, Keyboard.UP, Keyboard.DOWN]);
        // window.requestAnimationFrame(this.draw);
        window.requestAnimationFrame((elapsed) => {this.draw(elapsed)});
    },
    draw: function (elapsed) {
        canvas.ctx.globalCompositeOperation = 'destination-over';
        canvas.clearCanvas();
        canvas.ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
        Keyboard.handleKeys(camera, this.delta);
        for (let i=0; i<this.units.length; i++) {
            this.units[i].update();
        }
        this.drawLayer(0, camera);
        // var time = new Date();
        // ctx.rotate(((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds());
        // compute delta time in seconds -- also cap it
        this.delta = (elapsed - this.previousElapsed) / 1000.0;
        this.delta = Math.min(this.delta, 0.25); // maximum delta of 250 ms
        this.previousElapsed = elapsed;
        window.requestAnimationFrame((elapsed) => {this.draw(elapsed)});
    },
    drawLayer: function (layer, camera) {
        var camera = this.camera,
            map = this.map;
        var startCol = Math.floor(camera.x / map.tileSize);
        var endCol = startCol + (camera.width / map.tileSize);
        var startRow = Math.floor(camera.y / map.tileSize);
        var endRow = startRow + (camera.height / map.tileSize);
        var offsetX = -camera.x + startCol * map.tileSize;
        var offsetY = -camera.y + startRow * map.tileSize;

        for (var c = startCol; c <= endCol; c++) {
            for (var r = startRow; r <= endRow; r++) {
                var tile = map.getTile(layer, c, r);
                var x = (c - startCol) * map.tileSize + offsetX;
                var y = (r - startRow) * map.tileSize + offsetY;
                // if (tile !== 0) { // 0 => empty tile
                //     var fills = [
                //         '#22ee99',
                //         '#22aa55',
                //         '#22ef89',
                //     ];
                //     ctx.rect(x,y,map.tileSize,map.tileSize);
                //     ctx.fillStyle = fills[tile];
                //     ctx.fill();
                canvas.ctx.drawImage(
                    this.images.tileAtlas, // image
                    (tile - 1) * map.tileSize, // source x
                    0, // source y
                    map.tileSize, // source width
                    map.tileSize, // source height
                    Math.round(x),  // target x
                    Math.round(y), // target y
                    map.tileSize, // target width
                    map.tileSize // target height
                );
                // }
            }
        }
    }
};

Game.init();
