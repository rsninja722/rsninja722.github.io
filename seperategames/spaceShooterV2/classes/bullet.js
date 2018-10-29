function bullet(x,y,angle,pic,speed,w,h,damage,pen) {
    this.x = x;
    this.y = y;
    this.angle = angle
    this.pic = pic;
    this.speed = speed;
    this.w = w;
    this.h = h;
    this.damage = damage;
    this.pen = pen;
    this.list = [];
    this.vel = {
        y:Math.cos(angle)*this.speed,
        x:Math.sin(angle)*this.speed
    }
}
bullet.prototype.update = function() {
    this.y-=this.vel.y;
    this.x+=this.vel.x;
    for(let i=0;i<bads.length;i++) {
        if(collideRect(this,bads[i])&&!(this.list.includes(i))) {
            this.list.push(i);
            if(bads[i].takeDamage(this.damage)) {
                for(let j=0;j<4;j++) {
                    particles.push(new particle(bads[i].x,bads[i].y,1,rand(50,75),"img",p[`small${rand(1,4)}`]));
                }
                bads.splice(i,1);
                i--;
            }
            this.pen--;
            if(this.pen<0) {
                return 1;
            }
        }
    }
    if(this.x>cw) {
        this.x=0;
    } else if(this.x<0) {
        this.x=cw;
    }
    if(this.y>ch||this.y<0) {return 1;}
}

bullet.prototype.draw = function() {
    pic(this.x,this.y,this.w,this.h,this.pic);
}