
Draw = {
    drawPath() {
        this.canvas.ctx.beginPath();
        for (var i=0; i < this.path.length; i++) {
            var x = this.path[i].x - this.camera.x,
                y = this.path[i].y - this.camera.y;
            if (i === 0) {
                this.canvas.ctx.moveTo(x, y);
                continue;
            }
            this.canvas.ctx.lineTo(x, y);
        }
        this.canvas.ctx.lineTo(this.x - this.camera.x, this.y - this.camera.y);
        this.canvas.ctx.strokeStyle = '#eee';
        this.canvas.ctx.stroke();
    }
};