var Mouse = {};

Mouse.getPosition = function(e, container, camera) {
    let xBase = e.clientX - container.left,
        yBase = e.clientY - container.top,
        xOffset = xBase + camera.x,
        yOffset = yBase + camera.y;
    return {
        x: Math.round(xOffset),
        y: Math.round(yOffset)
    };
};

export default Mouse;
