var blocks = [];
class block {
    constructor(x, y, image) {
        this.x = x;
        this.y = y;
        this.w;
        this.h;
        this.blockList = [];
        var tempCanv = document.createElement("canvas");
        tempCanv.width = image.width;
        tempCanv.height = image.height;
        var tempCW = tempCanv.width;
        var tempCH = tempCanv.height;
        var tempCtx = tempCanv.getContext("2d");
        tempCtx.drawImage(image, 0, 0);
        var data = tempCtx.getImageData(0, 0, tempCW, tempCH);
        var i = 0;
        for (var y = 0; y < tempCH; y++) {
            for (var x = 0; x < tempCW; x++) {
                if (data.data[i] !== 0) {
                    this.blockList.push({x:x * 2 + this.x, y: y * 2 + this.y});
                }
                i += 4;
            }
        }
        this.w = tempCW*2;
        this.x += this.w/2 - 1;
        this.h = tempCH*2;
        this.y += this.h/2 - 1;
    }
}

block.prototype.draw = function() {
    for(var b=0; b<this.blockList.length; b++) {
        var coords = this.blockList[b];
        rect(coords.x, coords.y, 2, 2, "#38db18");
    }
}

block.prototype.isHitBy = function(rect) {
    if(rectrect(this,rect)) {
        for (var b = 0; b < this.blockList.length; b++) {
            if(rectpoint(rect,this.blockList[b])) {
                return true;
            }
        }
    }
    return false;
}

block.prototype.damage = function(point) {
    for(var d=this.blockList.length-1;d>-1;d--) {
        var distance = dist(point,this.blockList[d]);
        if(distance<5) {
            this.blockList.splice(d,1);
        } else if(distance<8) {
            if(rand(0,1)) {
                this.blockList.splice(d,1);
            }
        }
    }
}

function drawBlocks() {
    for (var i = 0; i < blocks.length; i++) {
        blocks[i].draw();
    }
}

function generateBlocks() {
    for (var i = 0; i < 4; i++) {
        blocks.push(new block(115 + (i * 80), ch - 60, sprites.block.spr));
    }
}