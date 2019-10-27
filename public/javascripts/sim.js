import Keyboard from './keyboard.js';
import Mouse from './mouse.js';
import Unit from './unit.js';
import Map from './map.js';
import Camera from './camera.js';
import Tree from './tree.js';
import Calc from "./calc.js";
import canvas from "./canvas.js";

var map = new Map({
    cols: 20,
    rows: 20,
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
    width: 16,
    height: 20,
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
        for (let i = 0; i < 999; i++) {
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
    getClosestResource: function (unit) {
        let distances = [];
        for (let i = 0; i < this.resources.length; i++) {
            let resource = this.resources[i];
            distances.push({
                distance: Calc.distanceBetween(unit, resource),
                width: resource.width,
                height: resource.height,
                anchor: resource.anchor,
                x: resource.x,
                y: resource.y,
                index: i
            });
        }
        return distances.sort(Calc.sortDistance).shift();
    },
    collectResources: function (unit) {
        let closest = this.getClosestResource(unit);
        unit.target(closest);
        let collide = Calc.hitCheckRectangle(closest, unit);
        if (collide) {
            let hitResource = this.resources[closest.index];
            unit.harvest(hitResource, () => {
                this.resources.splice(closest.index, 1);
            });
        }
    }
};

// TODO: Need anchor points, so units harvest trees at the trunk

Game.init();

window.addEventListener('click', (e) => {
    deselectAll();
    let rect = canvas.body.getBoundingClientRect();
    let mousePos = Mouse.getPosition(e, rect, camera);
    let posWithSize = {
        x: mousePos.x,
        y: mousePos.y,
        width: 1,
        height: 1,
    };
    let unit = collidesWithAny(posWithSize, Game.units);
    if (unit) {
        return unit.selected = true;
    }
    let resource = collidesWithAny(posWithSize, Game.resources);
    if (resource) {
        return resource.selected = true;
    }
    let tileIndex = map.getTileFromPosition(mousePos);
    map.select(tileIndex);
    // map.layers[0].splice(tileIndex, 1, 5);
});

function collidesWithAny(pos, array) {
    for (let i = 0; i < array.length; i++) {
        let item = array[i];
        let collide = Calc.hitCheckRectangle(pos, item);
        if (collide) {
            return item;
        }
    }
}

function deselectAll() {
    for (let i = 0; i < Game.units.length; i++) {
        let unit = Game.units[i];
        unit.selected = false;
    }
    for (let i = 0; i < Game.resources.length; i++) {
        let resource = Game.resources[i];
        resource.selected = false;
    }
    for (let tile in map.tileData) {
        map.tileData[tile].selected = false;
    }
}

function debug() {
    (function() {
        var script = document.createElement('script');
        script.src='https://rawgit.com/paulirish/memory-stats.js/master/bookmarklet.js';
        document.head.appendChild(script);
    })();
    (function() {
        var script = document.createElement('script');
        script.onload = function() {
            var stats = new Stats();
            document.body.appendChild(stats.dom);
            requestAnimationFrame(function loop() {
                stats.update();
                requestAnimationFrame(loop)
            });
        };
        script.src = '//mrdoob.github.io/stats.js/build/stats.min.js';
        document.head.appendChild(script);
    })();
}

debug();
