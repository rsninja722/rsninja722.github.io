var paletteNodes = [];
class paletteNode {
    constructor(x,y,c={r:0,g:0,b:0,a:0}) {
        this.x = x;
        this.y = y;
        this.w = 20;
        this.h = 20;
        this.c = c;
    }
}

paletteNode.prototype.draw = function(x,y) {
    if(paletteSelection[0] === x && paletteSelection[1] === y) {
        rect2(this.x,this.y,this.w,this.h,"#555555");
    } else {
        rect2(this.x,this.y,this.w,this.h,"#101010");
        rect2(this.x+1,this.y+this.h-1,this.w-2,1,"#222222");
    }
    
    rect2(this.x+1,this.y+1,this.w-2,this.h-2,"#181818");
    
    baseCtx.globalAlpha = this.c.a/100;
    rect2(this.x+1,this.y+1,this.w-2,this.h-2,`rgb(${this.c.r}, ${this.c.g}, ${this.c.b})`);
    baseCtx.globalAlpha = 1;
}

paletteNode.prototype.update = function(x,y) {
    var hovering = rectpoint2(this,mousePos);
    if(hovering) {
        cursor = "cell";
    }
    if(mousePress[0] && hovering) {
        paletteSelection = [x,y];
    }
    if(mousePress[2] && hovering) {
        this.getColor();
    }
    if(paletteSelection[0] === x && paletteSelection[1] === y) {

    }
}

paletteNode.prototype.getColor = function() {
    setColor(this.c.r,this.c.g,this.c.b);
    colorInput.a.value = this.c.a;
}

paletteNode.prototype.setColor = function() {
    this.c = Object.assign({}, color.rgb);
    savePalette();
}

function drawPaletteNodes() {
    for(var y=0,yl=paletteNodes.length;y<yl;y++) {
        for(var x=0,xl=paletteNodes[y].length;x<xl;x++) {
            paletteNodes[y][x].draw(x,y);
        }
    }
}

function updatePaletteNodes() {
    for(var y=0,yl=paletteNodes.length;y<yl;y++) {
        for(var x=0,xl=paletteNodes[y].length;x<xl;x++) {
            paletteNodes[y][x].update(x,y);
        }
    }
}

function savePalette() {
    var saveArr = [];
    for(var y=0,yl=paletteNodes.length;y<yl;y++) {
        var a = [];
        for(var x=0,xl=paletteNodes[y].length;x<xl;x++) {
            var p = paletteNodes[y][x].c;
            a.push([p.r,p.g,p.b,p.a]);
        }
        saveArr.push(a);
    }
    localStorage.palette = JSON.stringify(saveArr);
}

function loadPalette() {
    if(localStorage.palette !== undefined) {
        var loadArr = JSON.parse(localStorage.palette);
        for(var y=0;y<11;y++) {
            var a = [];
            for(var x=0;x<5;x++) {
                var p = loadArr[y][x];
                a.push(new paletteNode(140+(x*20),340+(y*20),{r:p[0],g:p[1],b:p[2],a:p[3]}));
            }
            paletteNodes.push(a);
        }
    } else {
        for(var y=0;y<11;y++) {
            var a = [];
            for(var x=0;x<5;x++) {
                a.push(new paletteNode(140+(x*20),340+(y*20)));
            }
            paletteNodes.push(a);
        } 
    }
}

