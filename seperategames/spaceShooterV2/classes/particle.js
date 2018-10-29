function particle(x,y,speed,time,type,graphic) {
    this.x=x;
    this.y=y;
    this.speed=speed;
    this.type=type;
    this.graphic=graphic;
    this.angle=setAngle(rand(0,359));
    this.vel = {
        y:Math.cos(this.angle)*this.speed,
        x:Math.sin(this.angle)*this.speed
    }
    this.size=5;
    if(this.type=="color") {this.size=rand(1,4);}
    this.timer=time;
}

particle.prototype.move = function() {
    this.y-=this.vel.y-1;
    this.x+=this.vel.x;

    this.vel.y -= (this.vel.y>0) ? 0.06 : -0.06;
    this.vel.x -= (this.vel.x>0) ? 0.06 : -0.06;

    this.timer--;
    if(this.timer==5) { this.size--; }
    if(!this.timer) {return 1;}
}

particle.prototype.draw = function() {
    if(this.type=="color") {
        ctx.fillStyle = this.graphic;
        ctx.fillRect(Math.round(this.x+this.size/2),Math.round(this.y+this.size/2),this.size,this.size);
    } else {
        //pic(this.x,this.y,this.graphic.width,this.graphic.height,this.graphic);
        drawPicRotate(this.x,this.y,this.graphic.width,this.graphic.height,this.angle,this.graphic);
    }
}