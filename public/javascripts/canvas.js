var canvasElement = document.getElementById("simulation"),
    initialWidth = window.innerWidth,
    initialHeight = window.innerHeight,
    canvas = {
        width: initialWidth,
        height: initialHeight,
        body: canvasElement,
        ctx: canvasElement.getContext('2d'),
        clearCanvas: function () {
            this.ctx.clearRect(0, 0, this.width, this.height); // clear canvas
        },
        resize: function() {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.body.setAttribute('width', this.width);
            this.body.setAttribute('height', this.height);
        }
    };

canvas.resize();

window.addEventListener('resize', () => {
    canvas.resize();
});

export default canvas;
