let Calc = {
    randomInt(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    },
    distanceBetween(obj1, obj2) {
        // TODO: account for object dimensions
        let x1 = ('anchor' in obj1) ? obj1.anchor.x : obj1.x,
            y1 = ('anchor' in obj1) ? obj1.anchor.y : obj1.y,
            x2 = ('anchor' in obj2) ? obj2.anchor.x : obj2.x,
            y2 = ('anchor' in obj2) ? obj2.anchor.y : obj2.y,
            toDestX = x2 - x1,
            toDestY = y2 - y1;
        return Math.sqrt(toDestX * toDestX + toDestY * toDestY);
    },
    arrayMin(array) {
        return Math.min.apply( Math, array );
    },
    sortDistance(a,b) {
        if (a.distance < b.distance) {
            return -1;
        }
        if (a.distance > b.distance){
            return 1;
        }
        return 0;
    },
    hitCheckRectangle(r1, r2) {
        //Define the variables we'll need to calculate
        let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

        //hit will determine whether there's a collision
        hit = false;

        //Find the center points of each sprite
        r1.centerX = r1.x + r1.width / 2;
        r1.centerY = r1.y + r1.height / 2;
        r2.centerX = r2.x + r2.width / 2;
        r2.centerY = r2.y + r2.height / 2;

        //Find the half-widths and half-heights of each sprite
        r1.halfWidth = r1.width / 2;
        r1.halfHeight = r1.height / 2;
        r2.halfWidth = r2.width / 2;
        r2.halfHeight = r2.height / 2;

        //Calculate the distance vector between the sprites
        vx = r1.centerX - r2.centerX;
        vy = r1.centerY - r2.centerY;

        //Figure out the combined half-widths and half-heights
        combinedHalfWidths = r1.halfWidth + r2.halfWidth;
        combinedHalfHeights = r1.halfHeight + r2.halfHeight;

        //Check for a collision on the x axis
        if (Math.abs(vx) < combinedHalfWidths) {
            //A collision might be occurring. Check for a collision on the y axis
            if (Math.abs(vy) < combinedHalfHeights) {
                //There's definitely a collision happening
                hit = true;
            } else {
                //There's no collision on the y axis
                hit = false;
            }
        } else {
            //There's no collision on the x axis
            hit = false;
        }
        return hit;
    }
};

export default Calc;
