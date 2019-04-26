class bullet {
    constructor(angle) {
        this.x=300;
        this.y=225;
        this.angle=angle;
        this.v={x:Math.sin(this.angle),y:Math.cos(this.angle)};
        this.w=20;
        this.h=20;
        this.damage=upgrades.dmg.stat;
        this.dead=false;
        this.x+=this.v.x*50;
        this.y+=this.v.y*50;
    }

    draw() {
        rect(this.x-10,this.y-10,this.w,this.h,"#ff6655");
    }

    update() {
        if(this.dead) {return true;}
        this.x+=this.v.x*20;
        this.y+=this.v.y*20;
        if(this.x<0||this.y>ch||this.y<0) {
            return true;
        }
    }
}
var bullets=[];