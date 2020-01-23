var blocks = [];
var blockImageData;
class block {
    constructor(x, y, image) {
        this.x = x;
        this.y = y;
        this.w;
        this.h;
        this.blockList = [];
        this.blockListRelative = [];
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
                    this.blockListRelative.push([x*2,y*2]);
                }
                i += 4;
            }
        }
        this.w = tempCW*2;
        this.x += this.w/2 - 1;
        this.h = tempCH*2;
        this.y += this.h/2 - 1;
        if(blockImageData === undefined) {
            blockImageData = tempCtx.getImageData(0,0,tempCW*2,tempCH*2);
        }
    }
}

block.prototype.draw = function() {
    for(var b=0,bl=blockImageData.data.length;b<bl;b+=4) {
        blockImageData.data[b] = 0;
        blockImageData.data[b+1] = 0;
        blockImageData.data[b+2] = 0;
        blockImageData.data[b+3] = 255;
    }
    var yMultiplier = blockImageData.width;
    for(var b=0; b<this.blockListRelative.length; b++) {
        var coords = this.blockListRelative[b];
        var index = coords[0]*4 + coords[1]*yMultiplier*4;
        blockImageData.data[index] = 56;
        blockImageData.data[index+1] = 219;
        blockImageData.data[index+2] = 24;
        blockImageData.data[index+4] = 56;
        blockImageData.data[index+5] = 219;
        blockImageData.data[index+6] = 24;
        index += yMultiplier*4;
        blockImageData.data[index] = 56;
        blockImageData.data[index+1] = 219;
        blockImageData.data[index+2] = 24;
        blockImageData.data[index+4] = 56;
        blockImageData.data[index+5] = 219;
        blockImageData.data[index+6] = 24;
        // rect(coords.x, coords.y, 2, 2, "#38db18");
    }
    curCtx.putImageData(blockImageData,this.x-this.w/2,this.y-this.h/2);
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
            this.blockListRelative.splice(d,1);
        } else if(distance<8) {
            if(rand(0,1)) {
                this.blockList.splice(d,1);
                this.blockListRelative.splice(d,1);
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