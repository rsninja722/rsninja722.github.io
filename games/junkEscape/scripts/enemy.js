enemyDraw = {
    clapper:function(x,y,ang,s,e) {
        let z=0;
        if(s>98) {s=2;} else if(s>96) {z=3;} else {z=Math.round((96-s)/3+4);z=z>10?10:z;}
        if(s<25){z=1;} else if(s<75) {z=0;}
        
        img(sprites[`Hm-${z}`],x,y,ang);
        if(s>40) {img(sprites[`m-off`],x,y,ang);} else {img(sprites[`m-on`],x,y,ang);}
        if(s==95) {
            for(let i=0;i<20;i++) {
                let r = rand(0,1);
                part(x,y,e.dir,degToRad(rand(0,359)),3,0,0,20);
            }
        }
    },
    saw:function(x,y,ang,s,e) {
        let z=Math.round(count/3)%3;
        z=z==2?11:z;
        if(s>40) {z=(s%8) + 3;}
        img(sprites[`Sw-${z}`],x,y,ang);
        if(s>25&&s<40) {img(sprites[`m-on`],x,y,ang);} else {img(sprites[`m-off`],x,y,ang);}
    },
    turret:function(x,y,ang,s,e) {
        img(sprites.Turret_Base,x,y);
        img(sprites[`Tr_${(this.shootTime>87?Math.round((100-this.shootTime)/5+1)%4:0)}`],x,y,ang);
        img(sprites.Turret_Spotlight,x,y,count/100);
        img(sprites.Tri_Turret_Head,x,y);
        img(sprites[`b-${((Math.round(count/40)%2)?"on":"off")}`],x,y);
    },
    quad:function(x,y,ang,s,e) {
        img(sprites.quadBase,x,y);
        img(sprites[`Qu_${(this.shootTime>17?Math.round((100-this.shootTime)/5+1)%4:0)}`],x,y,ang);
        img(sprites.quadLight,x,y,count/130);
        img(sprites.quadHead,x,y);
        img(sprites[`t-${((Math.round(count/40)%2)?"on":"off")}`],x,y);
    },
    tank:function(x,y,ang,s) {
        let z=0;
        if(s>102){z=Math.round((125-s)/5);}
        img(sprites[`tank${z}`],x,y,ang);
        if(s<35) {img(sprites[`m-on`],x,y,ang);} else {img(sprites[`m-off`],x,y,ang);}
    },
    gunner:function(x,y,ang,s) {
        let z=0;
        if(s>95){z=Math.round((125-s)/5);}
        img(sprites[`GNR_000${z}`],x,y,ang);
        if(s<35) {img(sprites[`m-on`],x,y,ang);} else {img(sprites[`m-off`],x,y,ang);}
    },
    throw:function(x,y,ang,s) {
        let z=0;
        if(s<21&&s>0) {z=Math.round((20-s)/5)+1}else if(s>42){z=Math.round((125-s)/10+5);} else {z=0;}
        img(sprites[`TRW_${z}`],x,y,ang);
        if(s<60) {img(sprites[`m-on`],x,y,ang);} else {img(sprites[`m-off`],x,y,ang);}
    },
    plasma:function(x,y,ang,s) {
        img(sprites[`BOSS_HOVER_000${Math.round(count/3)%3}`],x,y);
        img(sprites[`BOSS_TRIPOD`],x,y);
        let z=0;
        if(s>130){z=Math.round((150-s)/5);z=z>4?4:z;}
        img(sprites[`TRIPLASMA_000${z}`],x,y,ang);
        img(sprites[`BOSS_HEAD`],x,y,ang);
    }
}

var enemies = [];

class enemy {
    constructor(x,y,r,costume,health,ai,speed,weapon,item) {
        this.x=x;
        this.y=y;
        this.r=r;
        this.costume=costume;
        this.health=health;
        this.maxHealth=health;
        this.ai=ai;
        this.speed=speed;
        this.weapon=weapon;
        this.item=item;
        this.dir=0;
        this.target={x:x,y:y};
        this.v={x:0,y:0};
        this.vel=0;
        this.shootTime=rand(0,100);
        this.see=false;
        this.seeDist=1000;
        if(weapon==0||weapon==1) {
            this.seeDist=250;
        }
        if(weapon==3||weapon==6) {
            this.seeDist=400;
        }
    }
}

enemy.prototype.draw = function() {
    this.costume(this.x,this.y,this.dir,this.shootTime,this);
    let hw = this.health/this.maxHealth;
    img(sprites.healthBar,this.x,this.y+this.r+10);
    img(sprites.hp,this.x-((1-hw)*15),this.y+this.r+10,0,hw);
}

enemy.prototype.update = function(index) {
    if(this.health<=0) {
        pauseTime=8;
        exps.push({x:this.x,y:this.y,time:14,type:`big${rand(1,3)}`});
        play(sounds[`bigBoom${rand(0,2)}`]);
        return true;
    }
    if(count%10==0) {
                if(this.canSeePlayer()) {
                    this.target = {x:player.x,y:player.y};
                    this.see = true;
                } else {
                    this.see = false;
                }
            }
    switch (this.ai) {
        case 0:
            if(dist(this,this.target)>this.r*2) {
                let t = pointTo(this,this.target);
                this.dir = turn(this.dir,t,0.06);
                this.v.x=Math.cos(this.dir)*this.vel;
                this.v.y=Math.sin(this.dir)*this.vel;
                if(this.vel<this.speed){this.vel+=0.01;}
            } else {
                this.frictionx(0.05);
                this.frictiony(0.05);
                if(this.vel>0) {this.vel-=0.01;}
            }
            break;
        case 1:
            if(dist(this,this.target)<150/this.speed&&this.see) {
                let t = pointTo(this,this.target);
                this.dir = turn(this.dir,t,0.06);
                this.v.x=Math.cos(this.dir)*this.vel*-1;
                this.v.y=Math.sin(this.dir)*this.vel*-1;
                if(this.vel<this.speed){this.vel+=0.01;}
            } else if(dist(this,this.target)>this.r*2) {
                let t = pointTo(this,this.target);
                this.dir = turn(this.dir,t,0.06);
                this.v.x=Math.cos(this.dir)*this.vel;
                this.v.y=Math.sin(this.dir)*this.vel;
                if(this.vel<this.speed){this.vel+=0.01;}
            } else {
                this.frictionx(0.05);
                this.frictiony(0.05);
                if(this.vel>0) {this.vel-=0.01;}
            }
            break;
        case 2:
            if(this.see) {
                let t = pointTo(this,this.target);
                this.dir = turn(this.dir,t,0.06);
            }
            break;
        case 3:
            this.dir+=0.01;
            break;
        case 4:
            if(dist(this,this.target)<150/this.speed&&this.see) {
                let t = pointTo(this,this.target);
                this.dir = turn(this.dir,t,0.02);
                this.v.x=Math.cos(this.dir)*this.vel*-1;
                this.v.y=Math.sin(this.dir)*this.vel*-1;
                if(this.vel<this.speed){this.vel+=0.00025;}
            } else if(dist(this,this.target)>this.r) {
                let t = pointTo(this,this.target);
                this.dir = turn(this.dir,t,0.02);
                this.v.x=Math.cos(this.dir)*this.vel;
                this.v.y=Math.sin(this.dir)*this.vel;
                if(this.vel<this.speed){this.vel+=0.00025;}
            } else {
                this.frictionx(0.05);
                this.frictiony(0.05);
                if(this.vel>0) {this.vel-=0.01;}
            }
            break;
    }

    switch(this.weapon) {
        case 1:
            if(Math.abs(this.shootTime%80)==5) {
                play(sounds.sawing);
            }
            break;
    }
    switch(this.weapon) {
        case 0:
            if(this.shootTime==25) {
                play(sounds.clapBack);
            }
            if(this.shootTime<1&&this.see) {
                shoot(this.x,this.y,this.dir,0,11,0,this.v,1,30);
                play(sounds[`clap${rand(0,1)}`]);
                this.shootTime=100;
            }
            break;
        case 1:
            if(this.shootTime<1&&this.see) {
                shoot(this.x,this.y,this.dir,0,12,0,this.v,1);
                play(sounds.saw);
                
                this.shootTime=80;
            }
            if(this.shootTime==50) {shoot(this.x,this.y,this.dir,0,12,0,this.v,1);}
            break;
        case 2:
            if(this.shootTime<1&&this.see) {
                shoot(this.x,this.y,this.dir,0,13,0,this.v,1,20);
                this.shootTime=150;
            }
            break;
        case 3:
            if(this.shootTime<1&&this.see) {
                shoot(this.x,this.y,this.dir,3,4,0,this.v,1,20,25);
                this.shootTime=100;
            }
            
            break;
        case 4:
            if(this.shootTime<1&&this.see) {
                shoot(this.x,this.y,this.dir,7,5,0,this.v,1,10);
                shoot(this.x,this.y,this.dir,7,5,0,this.v,1,10,-5);
                shoot(this.x,this.y,this.dir,7,5,0,this.v,1,10,5);
                this.shootTime=100;
            }
            break;
        case 5:
            if(this.shootTime<1) {
                shoot(this.x,this.y,this.dir+0.1,7,5,0,this.v,1,20);
                shoot(this.x,this.y,this.dir+0.1+Math.PI/2,7,5,0,this.v,1,20,0);
                shoot(this.x,this.y,this.dir+0.1+Math.PI,7,5,0,this.v,1,-20);
                shoot(this.x,this.y,this.dir+0.1-Math.PI/2,7,5,0,this.v,1,-20,0);
                this.shootTime=30;
            }
            break;
        case 6:
            if(this.shootTime<1&&this.see) {
                shoot(this.x,this.y,this.dir,4,0,0,this.v,1,10);
                this.shootTime=125;play(sounds[`gun${rand(0,1)}`]);
            }
            break;
        case 7:
            if(this.shootTime<1&&this.see) {
                shoot(this.x,this.y,this.dir,6,6,0,this.v,1,10,5);
                shoot(this.x,this.y,this.dir,6,6,0,this.v,1,10,-5);
                this.shootTime=125;
            }
            break;
        case 8:
            if(this.shootTime<1&&this.see) {
                shoot(this.x,this.y,this.dir,5,3,0,player.v,3,20,-10);
                shoot(this.x,this.y,this.dir,5,3,0,player.v,3,20);
                shoot(this.x,this.y,this.dir,5,3,0,player.v,3,20,10);
                this.shootTime=150;
                play(sounds.plasma);
            }
            break;
    }
    this.shootTime--;
    this.limitVel(this.speed);

    if(this.movex(index)) {
        var vcache = this.v.y;
        this.v.y=Math.sign(this.v.y)*0.25;
        this.movey(index)
        this.v.y=vcache;
    }

    if(this.movey(index)) {
        var vcache = this.v.x;
        this.v.x=Math.sign(this.v.x)*0.25;
        this.movex(index)
        this.v.x=vcache;
    }

    

    if(this.x-this.r<0) {this.x=this.r;this.v.x=0;}
    if(this.x+this.r>sx) {this.x=sx-this.r;this.v.x=0;}
    if(this.y-this.r<0) {this.y=this.r;this.v.y=0;}
    if(this.y+this.r>sy) {this.y=sy-this.r;this.v.y=0;}
}

enemy.prototype.movex = function(index) {
    this.x += this.v.x;
    if(colliding(this)||circlecircle(this,player)||this.hittingEnemy(index)) {this.x -= this.v.x;this.v.x=0;return true;}
}

enemy.prototype.movey = function(index) {
    this.y += this.v.y;
    if(colliding(this)||circlecircle(this,player)||this.hittingEnemy(index)) {this.y -= this.v.y;this.v.y=0;return true;}
}

enemy.prototype.canSeePlayer = function() {
    if(dist(this,player)<this.seeDist) {
    for(var ii=0,ll=col.length;ii<ll;ii++) {
        var colCache = col[ii];
        if(colCache.r !== undefined) {
            if(lineCircle(this.x,this.y,player.x,player.y,colCache.x,colCache.y,colCache.r)) {
                return false;
            }
        } else {
            if(lineRect(this.x,this.y,player.x,player.y,colCache.x,colCache.y,colCache.w,colCache.h)) {
                return false;
            }
        }
    }

    return true;
    }
}

enemy.prototype.limitVel = function(limit) {
    if(this.v.x>limit) {this.v.x=limit;}
    if(this.v.x<-limit) {this.v.x=-limit;}
    if(this.v.y>limit) {this.v.y=limit;}
    if(this.v.y<-limit) {this.v.y=-limit;}
}

enemy.prototype.frictionx = function(amount) {
    if(this.v.x>0) {this.v.x -= amount;}
    if(this.v.x<0) {this.v.x += amount;}
    if(Math.abs(this.v.x)<amount*2) {this.v.x = 0;}
}

enemy.prototype.frictiony = function(amount) {
    if(this.v.y>0) {this.v.y -= amount;}
    if(this.v.y<0) {this.v.y += amount;}
    if(Math.abs(this.v.y)<amount*2) {this.v.y = 0;}
}

enemy.prototype.hittingEnemy = function(index) {
    for(let i=0,l=enemies.length;i<l;i++) {
        if(i!==index) {
            if(circlecircle(this,enemies[i])) {
                return true;
            }
        }
    }
    return false;
}