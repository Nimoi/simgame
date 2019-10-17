import Keyboard from './input.js';
import Unit from './unit.js';
import Map from './map.js';
import Camera from './camera.js';
import Resource from './resource.js';
import Calc from './calc.js';

var canvas = {
    width: 800,
    height: 600,
    ctx: document.getElementById('simulation').getContext('2d'),
    clearCanvas: function () {
        this.ctx.clearRect(0, 0, this.width, this.height); // clear canvas
    }
};

// Map scrolling / mouse corners
// Units have needs - Hunger, Thirst, Tired
// Units have skills - ???
// Unit skills have levels / require experience

var map = new Map({
    cols: 12,
    rows: 12,
    tileSize: 64,
    canvas: canvas,
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

var resource = new Resource({
    x: 100,
    y: 100,
    size: 10,
    canvas: canvas,
    map: map,
    camera: camera,
});

var Game = {
    units: [nimoi],
    resources: [resource],
    map: map,
    camera: camera,
    delta: 0,
    previousElapsed: 0,
    init: function () {
        Keyboard.listenForEvents([Keyboard.LEFT, Keyboard.RIGHT, Keyboard.UP, Keyboard.DOWN]);
        window.requestAnimationFrame((elapsed) => {this.draw(elapsed)});
    },
    draw: function (elapsed) {
        canvas.clearCanvas();
        Keyboard.handleKeys(camera, this.delta);
        this.map.update(camera);
        for (let i=0; i<this.resources.length; i++) {
            // let hitUnit = Calc.hitCheckRectangle(this.resources[i], this.units[0]);
            this.resources[i].update();
        }
        for (let i=0; i<this.units.length; i++) {
            this.units[i].update();
        }
        // compute delta time in seconds -- also cap it
        this.delta = (elapsed - this.previousElapsed) / 1000.0;
        this.delta = Math.min(this.delta, 0.25); // maximum delta of 250 ms
        this.previousElapsed = elapsed;
        window.requestAnimationFrame((elapsed) => {this.draw(elapsed)});
    },
};

Game.init();
