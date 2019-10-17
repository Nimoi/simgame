let Calc = {
    getRandomArbitrary(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    },
    distanceBetween(obj1, obj2) {
        var toDestX = obj2.x - obj1.x;
        var toDestY = obj2.y - obj1.y;
        return Math.sqrt(toDestX * toDestX + toDestY * toDestY);
    }
};

export default Calc;
