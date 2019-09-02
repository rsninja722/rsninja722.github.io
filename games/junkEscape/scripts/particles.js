function part(x,y,dir,random,vel,type,moveType=0,xoff=0,yoff=0) {
    particles.push(new particle(x,y,dir,random,vel,type,moveType,xoff,yoff));
}

var particles = [];
class particle {
    constructor(x,y,dir,random,vel,type,moveType,xoff,yoff) {
        this.x=x;
        this.y=y;
        this.dir=dir;
        this.vel=vel;
        this.type=type;
        this.moveType=moveType;
        this.v={x:Math.cos(dir),y:Math.sin(dir)};
        this.size;
        this.time;
        switch(type) {
            case 0:this.size=rand(3,15)/10; this.time=rand(15,25); break;
            case 1:this.size=rand(5,25)/10; this.time=rand(15,25); break;
            case 2:this.time=rand(40,60); break;
            case 3:this.size=rand(5,15)/10; this.time=rand(15,25); break;
            case 4:this.size=rand(5,15)/10; this.time=rand(10,20); break;
            case 5:this.size=rand(3,10)/10; this.time=rand(10,20); break;
        }
        this.x -= yoff * Math.sin(dir);
        this.y += yoff * Math.cos(dir);

        this.x += xoff * Math.sin(dir + Math.PI/2);
        this.y -= xoff * Math.cos(dir + Math.PI/2);

        this.dir+=random;
        this.v={x:Math.cos(this.dir),y:Math.sin(this.dir)};
    }
}

particle.prototype.draw = function() {
    switch(this.type) {
        case 0:
            img(sprites.spark,this.x,this.y,this.dir,this.size,this.size);
            break;
        case 1:
            img(sprites.plasma,this.x,this.y,this.dir,this.size,this.size);
            break;
        case 2:
            img(sprites.case,this.x,this.y,this.dir,this.size,this.size);
            break;
        case 3:
            img(sprites.smoke,this.x,this.y,this.dir,this.size,this.size);
            break;
        case 4:
            img(sprites.shotTrail,this.x,this.y,this.dir,this.size,this.size);
            break;
        case 5:
            img(sprites.smoke,this.x,this.y,this.dir,this.size,this.size);
            break;
    }
}

particle.prototype.update = function() {
    this.time--;
    if(this.time<1) {return true;}
    switch(this.moveType) {
        case 0:
            this.friction(0.2);
            break;
        case 1:
            this.size-=0.05;
            if(this.size<0.4) {return true;}
            break;
    }
    this.x += this.v.x * this.vel;
    this.y += this.v.y * this.vel;
}

particle.prototype.friction = function(amount) {
    if(this.vel>0) {this.vel -= amount;}
    if(this.vel<0) {this.vel += amount;}
    if(Math.abs(this.vel)<amount*2) {this.vel = 0;}
}