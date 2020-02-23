var gridW = 100;
var gridH = 80;
var gridScale = 30;

var blocks = [];
class block {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = gridScale;
        this.h = gridScale;
    }
}

function drawBlocks() {
    for (var j = 0, jl = blocks.length; j < jl; j++) {
        blocks[j].draw();
    }
}

function updateBlocks() {
    for (var j = 0, jl = blocks.length; j < jl; j++) {
        blocks[j].update();
    }
}

block.prototype.draw = function () {
    rect(this.x, this.y, this.w, this.h, "grey");
}

block.prototype.update = function () {

}