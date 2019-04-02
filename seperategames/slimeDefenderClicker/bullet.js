class bullet {
    constructor(angle) {
        this.x=300;
        this.y=200;
        this.angle=angle;
        this.v={x:Math.sin(this.angle),y:Math.cos(this.angle)};
        this.w=20;
        this.h=20;
    }

    draw() {
        rect(this.x-10,this.y-10,this.w,this.h,"#ff6655");
    }

    update() {
        this.x+=this.v.x*10;
        this.y+=this.v.y*10;
        if(this.x<0||this.y>ch||this.y<0) {
            return true;
        }
    }
}
var bullets=[];