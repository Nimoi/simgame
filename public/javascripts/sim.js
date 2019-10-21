import Keyboard from './input.js';
import Unit from './unit.js';
import Map from './map.js';
import Camera from './camera.js';
import Tree from './tree.js';
import Calc from "./calc.js";

var canvas = {
    width: 800,
    height: 600,
    ctx: document.getElementById('simulation').getContext('2d'),
    clearCanvas: function () {
        this.ctx.clearRect(0, 0, this.width, this.height); // clear canvas
    }
};

var map = new Map({
    cols: 16,
    rows: 16,
    tileSize: 64,
    canvas: canvas,
});

var camera = new Camera({
    width: canvas.width,
    height: canvas.height,
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
    resources: [],
    map: map,
    camera: camera,
    delta: 0,
    previousElapsed: 0,
    init: function () {
        Keyboard.listenForEvents([Keyboard.LEFT, Keyboard.RIGHT, Keyboard.UP, Keyboard.DOWN]);
        window.requestAnimationFrame((elapsed) => {this.draw(elapsed)});
        this.addResources();
    },
    addResources: function () {
        for (let i = 0; i < 50; i++) {
            var tree = new Tree({
                size: 10,
                canvas: canvas,
                map: map,
                camera: camera,
            });
            this.resources.push(tree);
        }
    },
    draw: function (elapsed) {
        canvas.clearCanvas();
        Keyboard.handleKeys(camera, this.delta);
        this.map.update(camera);
        for (let i=0; i<this.resources.length; i++) {
            this.resources[i].update(elapsed);
        }
        for (let i=0; i<this.units.length; i++) {
            let unit = this.units[i];
            unit.update(elapsed);
            this.collectResources(unit);
        }
        // compute delta time in seconds -- also cap it
        this.delta = (elapsed - this.previousElapsed) / 1000.0;
        this.delta = Math.min(this.delta, 0.25); // maximum delta of 250 ms
        this.previousElapsed = elapsed;
        window.requestAnimationFrame((elapsed) => {this.draw(elapsed)});
    },
    collectResources: function (unit) {
        let distances = [];
        for (let i = 0; i < this.resources.length; i++) {
            let resource = this.resources[i];
            distances.push({
                distance: Calc.distanceBetween(unit, resource),
                width: resource.width,
                height: resource.height,
                x: resource.x,
                y: resource.y,
                index: i
            });
        }
        let closest = distances.sort(Calc.sortDistance).shift();
        unit.target(closest);
        let collide = Calc.hitCheckRectangle(closest, unit);
        if (collide) {
            let loot = this.resources[closest.index].collect();
            // delete this.resources[closest.index];
            unit.collect(loot);
            unit.target(distances.shift());
        }
    }
};

Game.init();
