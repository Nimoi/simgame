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
        },
        effect: function(callback) {
            let imageData = this.ctx.getImageData(0, 0, canvas.width, canvas.height),
                data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
                callback(data, i);
            }
            this.ctx.putImageData(imageData, 0, 0);
        },
        invert: function() {
            this.effect((data, i) => {
                data[i]     = 255 - data[i];     // red
                data[i + 1] = 255 - data[i + 1]; // green
                data[i + 2] = 255 - data[i + 2]; // blue
            });
        },
        grayscale: function() {
            this.effect((data, i) => {
                let avg = (data[i]*0.5 + data[i + 1] + data[i + 2]*0.5) / 3;
                data[i]     = avg; // red
                data[i + 1] = avg; // green
                data[i + 2] = avg; // blue
            });
        },
        night: function() {
            this.effect((data, i) => {
                data[i]     *= 0.5; // red
                data[i + 1] *= 0.5; // green
                data[i + 2] *= 0.9; // blue
            });
        },
    };

canvas.resize();

window.addEventListener('resize', () => {
    canvas.resize();
});

export default canvas;
