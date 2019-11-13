import Keyboard from './keyboard.js';
import Mouse from './mouse.js';
import Unit from './unit.js';
import Map from './map.js';
import Camera from './camera.js';
import Tree from './tree.js';
import Calc from "./calc.js";
import canvas from "./canvas.js";
import Camp from './camp.js';

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
    items: [nimoi],
    map: map,
    camera: camera,
    delta: 0,
    previousElapsed: 0,
    init: function () {
        Keyboard.listenForEvents([Keyboard.LEFT, Keyboard.RIGHT, Keyboard.UP, Keyboard.DOWN]);
        window.requestAnimationFrame((elapsed) => {this.draw(elapsed)});
        this.addResources();
        this.addBuildings();
    },
    addResources: function () {
        for (let i = 0; i < 999; i++) {
            this.addTree();
        }
    },
    addTree: function(props = {}) {
        let treeProps = Object.assign({
            size: 10,
            canvas: canvas,
            map: map,
            camera: camera,
        }, props);
        let tree = new Tree(treeProps);
        this.items.push(tree);
    },
    addBuildings: function () {
        let camp = new Camp({
            canvas: canvas,
            map: map,
            camera: camera,
        });
        this.items.push(camp);
    },
    draw: function (elapsed) {
        canvas.clearCanvas();
        this.sortY();
        Keyboard.handleKeys(camera, this.delta);
        this.map.update(camera);
        for (let i=0; i<this.items.length; i++) {
            let item = this.items[i];
            item.update(elapsed, this);
            if (item.constructor.name === 'Unit') {
                this.collectResources(item);
            }
        }
        // compute delta time in seconds -- also cap it
        this.delta = (elapsed - this.previousElapsed) / 1000.0;
        this.delta = Math.min(this.delta, 0.25); // maximum delta of 250 ms
        this.previousElapsed = elapsed;
        window.requestAnimationFrame((elapsed) => {this.draw(elapsed)});
    },
    sortY: function() {
        this.items = this.items.sort(function(a, b) {
            if (a.y < b.y) {
                return -1;
            }
            if (a.y > b.y){
                return 1;
            }
            return 0;
        });
    },
    getClosestResource: function (unit, resources) {
        let distances = [];
        for (let i = 0; i < resources.length; i++) {
            let resource = resources[i];
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
        let resources = this.items.filter(function (item) {
            return item.constructor.name === 'Tree';
        });
        let closest = this.getClosestResource(unit, resources);
        unit.target(closest);
        let collide = Calc.hitCheckRectangle(closest, unit);
        if (collide) {
            let hitResource = resources[closest.index];
            unit.harvest(hitResource, () => {
                this.deleteItem(hitResource);
            });
        }
    },
    deleteItem: function(item) {
        let index = this.items.indexOf(item);
        this.items.splice(index, 1);
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
