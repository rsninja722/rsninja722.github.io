

function bad(x,y,pic,speed,movementType,w,h,fireType,health) {
    this.x = x;
    this.y = y;
    this.pic = pic;
    this.speed = speed;
    this.movementType = movementTypes[movementType];
    this.w = w;
    this.h = h;
    this.fireType = fireType;
    this.health = health;
    this.classType = "bad";
    this.moveCounter = -1;
    this.frameCounter = 0;
}
bad.prototype.move = function() {
    if(this.frameCounter==0) {
        this.moveCounter++;
        this.frameCounter = this.movementType[this.moveCounter%this.movementType.length].frames;
    }
    this.frameCounter--;
    var tempMove = this.movementType[this.moveCounter%this.movementType.length];
    var xvel=tempMove.x;
    var yvel=tempMove.y;
    var angle;
    switch (xvel+""+yvel) {
        case "10":angle = 90;break;
        case "-10":angle = 270;break;
        case "01":angle = 180;break;
        case "0-1":angle = 0;break;
        case "11":angle = 135;break;
        case "1-1":angle = 45;break;
        case "-11":angle = 225;break;
        case "-1-1":angle = 315;break;
        default:angle = "monkey";
    }
    if(true){
        angle = setAngle(angle);
        this.y+=yvel*this.speed*tempMove.s;
        this.x+=xvel*this.speed*tempMove.s;
    };
    if(this.x>cw) {
        this.x=0;
    } else if(this.x<0) {
        this.x=cw;
    }
    if(this.y>ch) {
        return 2;
    }
}

bad.prototype.draw = function() {
    pic(this.x,this.y,this.w,this.h,this.pic);
}
bad.prototype.takeDamage= function(dmg) {
    this.health-=dmg;
    if(this.health<=0) {
        return true;
    }
}


function spawnBads(amount = 1) {
    for(let i=0;i<amount;i++) {
        var egg = rand(-1,3);
        console.log(egg);
        bads.push(new bad(rand(0,200),0,p.bad1,0.5,egg,12,10,1,2));
    }
}
function spawnAstroids(amount = 1) {
    for(let i=0;i<amount;i++) {
        var which = rand(-1,3);
        var xpos= rand(0,200);
        for(let x=0;x<4;x++) {
            for(let y=0;y<4;y++) {
                if(astroids[which][y][x]) {
                    bads.push(new bad(xpos+x*6,y*6,p.block1,0.5,0,6,6,1,1));
                }
            }
        }
    }
}
