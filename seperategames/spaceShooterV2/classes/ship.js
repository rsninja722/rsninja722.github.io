function ship(x,y,pic,speed,w,h,shotType,shotSpeed) {
    this.x = x;
    this.y = y;
    this.pic = pic;
    this.speed = speed;
    this.w = w;
    this.h = h;
    this.shotType = shotType;
    this.shotSpeed = shotSpeed;
    this.lol=0;
    this.classType = "ship";
}

ship.prototype.handleInput = function() {
    var xvel=0;
    var yvel=0;
    if(keyDown[87]||keyDown[38]) {
        yvel=-1;
    }
    if(keyDown[83]||keyDown[40]) {
        yvel=1;
    }
    if(keyDown[65]||keyDown[37]) {
        xvel=-1;
    }
    if(keyDown[68]||keyDown[39]) {
        xvel=1;
    }
    var angle;
    switch (xvel+""+yvel) {
        case "10":
            angle = 90;
            break;
        case "-10":
            angle = 270;
            break;
        case "01":
            angle = 180;
            break;
        case "0-1":
            angle = 0;
            break;
        case "11":
            angle = 135;
            break;
        case "1-1":
            angle = 45;
            break;
        case "-11":
            angle = 225;
            break;
        case "-1-1":
            angle = 315
            break;
        default:
            angle = "monkey";
    }
    if(angle!="monkey"){
        angle = setAngle(angle);
        this.y-=this.speed*Math.cos(angle);
        this.x+=this.speed*Math.sin(angle);
    };
    if(keyDown[32]) {
        if(this.lol>this.shotSpeed-1) {
            shoot(this,this.shotType);
            this.lol=0;
        } else {
            this.lol++;
        }
    } else {
        this.lol++;
    }
    if(this.x>cw) {
        this.x=0;
    } else if(this.x<0) {
        this.x=cw;
    }
}

ship.prototype.draw = function() {
    pic(this.x,this.y,this.w,this.h,this.pic);
}