function updateParts() {
    for(var p=0;p<parts.length;p++) {
        parts[p].update();
    }
}

function drawParts() {
    for(var p=0;p<parts.length;p++) {
        parts[p].draw();
    }
}

function addPart(point) {
    parts.push(new part(point.x,point.y,sprites[`part${rand(0,5)}`]));
}

var parts = [];
class part {
    constructor(x,y,pic) {
        this.x=x;
        this.y=y;
        this.pic=pic;
        this.dir = degToRad(rand(0,360));
        this.v={x:Math.cos(this.dir),y:Math.sin(this.dir)};
        this.speed = rand(20,40)/10;
        this.halfSpeed = this.speed/2;
    }
}

part.prototype.draw = function() {
    var size = 1 + map_range((this.halfSpeed - Math.abs(this.speed - this.halfSpeed)),0,this.halfSpeed,0,1);
    img(this.pic,this.x,this.y,this.dir,size,size);
}

part.prototype.update = function() {
    if(this.speed !== 0 ) {
        this.friction(0.1);
        this.x += this.v.x * this.speed;
        this.y += this.v.y * this.speed;
        if(colliding(this)) {
            this.x -= this.v.x * this.speed;
            this.y -= this.v.y * this.speed;
        }
        if(this.speed === 0) {
            play(sounds.land);
        }
    }
}

part.prototype.friction = function(amount) {
    if(this.speed>0) {this.speed -= amount;}
    if(Math.abs(this.speed)<amount*2) {this.speed = 0;}
}

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}