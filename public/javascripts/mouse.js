var Mouse = {};

Mouse.getPosition = function(e, container, camera) {
    let xBase = e.clientX - container.left,
        yBase = e.clientY - container.top,
        xOffset = xBase + camera.x,
        yOffset = yBase + camera.y;
    return {
        x: xOffset | 0,
        y: yOffset | 0
    };
};

export default Mouse;
