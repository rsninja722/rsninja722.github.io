function shoot(x,y,dir,speed,type,side,initialVel={x:0,y:0},pierce=1,xoff=0,yoff=0) {
    bullets.push(new bullet(x,y,dir,speed,type,side,initialVel,pierce,xoff,yoff));
}

var bullets = [];
class bullet {
    constructor(x,y,dir,speed,type,side,initialVel={x:0,y:0},pierce=1,xoff=0,yoff=0,) {
        this.x=x;
        this.y=y;
        this.dir=dir;
        this.speed=speed;
        this.type=type;
        this.side=side; // side  0=check for player, 1=check for enemy
        this.pierce=pierce;
        this.v={x:Math.cos(dir)*speed,y:Math.sin(dir)*speed};
        this.hitList=[];
        this.r;
        this.pic;
        this.dmg;
        this.time=250;
        switch(type) {
            case 0: // gun
                this.r=8;
                this.dmg=5;
                break;
            case 1: // shot
                this.r=3;
                this.dmg=1.5;
                this.pic = `shot${(rand(1,3))}`;
                break;
            case 2: // mini
                this.r=2;
                this.dmg=1;
                break;
            case 3: // plasma
                this.r=10;
                this.dmg=10;
                break;
            case 4: // gold
                this.r=3;
                this.dmg=1;
                break;
            case 5: // small
                this.r=3;
                this.dmg=1;
                break;
            case 6: // shell
                this.r=3;
                this.dmg=2;
                break;
            case 10: // melee
                this.r=7;
                this.dmg=1;
                this.time=5;
                break;
            case 11:
                this.r=7;
                this.dmg=2;
                this.time=5;
                break;
            case 12: // saw
                this.r=15;
                this.dmg=1.5;
                this.time=5;
                break;
            case 13: // smash
                this.r=15;
                this.dmg=7;
                this.time=10;
                break;
        }

        this.x -= yoff * Math.sin(dir);
        this.y += yoff * Math.cos(dir);

        this.x += xoff * Math.sin(dir + Math.PI/2);
        this.y -= xoff * Math.cos(dir + Math.PI/2);

        this.v.x += initialVel.x/2;
        this.v.y += initialVel.y/2;
        if(type==4) {
            this.dir-=0.05;
            this.v={x:Math.cos(this.dir)*speed,y:Math.sin(this.dir)*speed};
        }
    }
}

bullet.prototype.draw = function() {
    switch(this.type) {
        case 0:
            img(sprites.bullet0,this.x,this.y,this.dir);
            if(count%2) {
                part(this.x,this.y,this.dir+degToRad(rand(-10,10)),0,1,3,1);
            }
            break;
        case 1:
            img(sprites[this.pic],this.x,this.y,this.dir);
            if(rand(0,5)==0) {
                part(this.x,this.y,this.dir+degToRad(rand(-10,10)),0,1,4,1);
            }
            break;
        case 2:
            img(sprites.mini,this.x,this.y,this.dir);
            break;
        case 3:
            img(sprites[`plas${Math.round(this.time/5)%3}`],this.x,this.y,this.dir);
            part(this.x,this.y,degToRad(rand(0,359)),0,1,1,1);
            break;
        case 4:
            img(sprites.gold,this.x,this.y,this.dir);
            if(count%2) {
                part(this.x,this.y,this.dir+degToRad(rand(-10,10)),0,1,4,1);
            }
            break;
        case 5:
            img(sprites.shot3,this.x,this.y,this.dir);
            if(count%2) {
                part(this.x,this.y,this.dir+degToRad(rand(-10,10)),0,1,5,1);
            }
            break;
        case 6:
            img(sprites.shell,this.x,this.y,this.dir);
            if(count%2) {
                part(this.x,this.y,this.dir+degToRad(rand(-10,10)),0,1,5,1);
            }
            break;
        case 10:
        case 11:
        case 12:
        case 13:
            //circle(this.x,this.y,this.r,"#14faf6");
            break;
    }
}

bullet.prototype.update = function() {
    this.time--;
    if(this.time<1) {
        this.die();return true;
    }
    this.x += this.v.x;
    this.y += this.v.y;
    if(colliding(this)||this.offMap()) {
        this.die();return true;
    }
    if(this.side==0) {
        if(circlecircle(this,player)) {
            player.health-=this.dmg;
            let dm = Math.round(this.dmg)-1;
            dm = dm>3?3:dm;
            over = dm;
            play(sounds.oof);
            this.die();return true;
        }
    } else {
        for(let i=0,l=enemies.length;i<l;i++) {
            if(circlecircle(this,enemies[i])) {
                if(!this.hitList.includes(i)) {
                    enemies[i].health-=this.dmg;
                    if(this.type==10) {
                        part(this.x,this.y,0,degToRad(rand(0,359)),3,0);
                        part(this.x,this.y,0,degToRad(rand(0,359)),3,0);
                        part(this.x,this.y,0,degToRad(rand(0,359)),3,0);
                        part(this.x,this.y,0,degToRad(rand(0,359)),3,0);
                        part(this.x,this.y,0,degToRad(rand(0,359)),3,0);
                        part(this.x,this.y,0,degToRad(rand(0,359)),3,0);
                    }
                    if(this.type==10&&sawTime>20) {
                        play(sounds.buzzing);
                        sawTime=0;
                    }
                    this.pierce--;
                    if(this.pierce>0) {
                        if(this.type==3) {
                            play(sounds.plasHit);
                        }
                        this.hitList.push(i);
                    } else {

                        this.die();return true;
                    }
                }
            }
        }
    }
}
var sawTime = 0;

bullet.prototype.offMap = function() {
    if(this.x-this.r<0) {this.die();return true;}
    if(this.x+this.r>sx) {this.die();return true;}
    if(this.y-this.r<0) {this.die();return true;}
    if(this.y+this.r>sy) {this.die();return true;}
}

bullet.prototype.die = function() {
    if(this.type==1||this.type==2||this.type==5) {
        exps.push({x:this.x,y:this.y,time:4,type:`small`});
        play(sounds.hit);
    } else if (this.type==3) {
        exps.push({x:this.x,y:this.y,time:13,type:`plas`});
        play(sounds.plasboom);
    } else if (this.type<10) {
        exps.push({x:this.x,y:this.y,time:6,type:`med${rand(1,2)}`});
        play(sounds.hit);
    }
    return true;
}