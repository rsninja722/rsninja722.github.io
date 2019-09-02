var player = {
    x:0,
    y:0,
    v:{x:0,y:0},
    r:20,
    speed:3,
    angle:0,
    dir:{head:0,arms:0,legs:0},
    attackCount:0,
    attackSpeed:30,
    modules:[modules.heads.stock,modules.bodies.stock,modules.arms.stock,modules.legs.stock],
    health:15,
    maxHealth:15,
    damaged:[0,0,0,0]
};

var cutOffs = [0,0,0,0,0];
function drawPlayer() {
    if(level==6) {
        img(sprites.Base_Skeleton,player.x,player.y+cutOffs[4]);
        img(sprites.Body_Skeleton,player.x,player.y+cutOffs[4]);
        img(sprites.Arms_Skeleton,player.x,player.y+cutOffs[4],player.dir.arms);
        img(sprites.Eyes_Skeleton,player.x,player.y+cutOffs[4],player.dir.head);
    }
    var m = player.modules;
    m[3][3](player.x-cutOffs[3],player.y-cutOffs[3]/2,player.dir.legs);
    m[2][3](player.x-cutOffs[2]/2,player.y-cutOffs[2],player.dir.arms);
    m[1][3](player.x+cutOffs[1]/2,player.y-cutOffs[1]);
    if(cutOffs[0]==0){img(sprites.Head,player.x,player.y,player.dir.head);}
    m[0][3](player.x+cutOffs[0],player.y-cutOffs[0]/2,player.dir.head); 
    let hw = player.health/player.maxHealth;
    if(level!==6) {
        img(sprites.healthBar,player.x,player.y+player.r+10);
        img(sprites.hp,player.x-((1-hw)*15),player.y+player.r+10,0,hw);
    }
}

var spidTime=0;
var hovTime=0;
var stopSound=0;
var moveSpeeds = [1.5,0.08,2,0.1,3.5,0.05];
var cutCount=0;
function playerMovement() {
    if(level==6) {
        if(cutCount>75&&cutCount<195) {
            player.v.x=1.7;
        } else {
            player.v.x=0;
        }
    }
    
    spidTime++;
    hovTime++;
    if(level!==6) {
    switch(player.modules[3][0]) {
        case 0: // roller
            var xmove=false;
            var ymove=false;
            if(level!==6) {
            if(keyDown[k.w]) {player.v.y-=moveSpeeds[1];ymove=true;}
            if(keyDown[k.s]) {player.v.y+=moveSpeeds[1];ymove=true;}
            if(keyDown[k.a]) {player.v.x-=moveSpeeds[1];xmove=true;}
            if(keyDown[k.d]) {player.v.x+=moveSpeeds[1];xmove=true;}
            }
            if(!ymove){frictiony(0.1);}
            if(!xmove){frictionx(0.1);}
            limitVel(moveSpeeds[0]);
            if(count%60==0 && (xmove||ymove)) {
                play(sounds[`roll`]);
                stopSound=0;
            }
            if(xmove == false && ymove == false && stopSound==0) {
                stop(sounds.roll);
                stopSound=1;
            }
            break;
        case 1: //splider
            var xmove=false;
            var ymove=false;
            if(level!==6) {
            if(keyDown[k.w]) {player.v.y-=moveSpeeds[3];ymove=true;}
            if(keyDown[k.s]) {player.v.y+=moveSpeeds[3];ymove=true;}
            if(keyDown[k.a]) {player.v.x-=moveSpeeds[3];xmove=true;}
            if(keyDown[k.d]) {player.v.x+=moveSpeeds[3];xmove=true;}
            }
            if(xmove||ymove) {
                if(spidTime>115) {
                    play(sounds.spid);
                    spidTime=0;
                }
            } else {
                stop(sounds.spid);
            }
            if(!ymove){frictiony(0.2);}
            if(!xmove){frictionx(0.2);}
            limitVel(moveSpeeds[2]);
            break;
        case 2: // hover
            var xmove=false;
            var ymove=false;
            if(level!==6) {
            if(keyDown[k.w]) {player.v.y-=moveSpeeds[5];ymove=true;}
            if(keyDown[k.s]) {player.v.y+=moveSpeeds[5];ymove=true;}
            if(keyDown[k.a]) {player.v.x-=moveSpeeds[5];xmove=true;}
            if(keyDown[k.d]) {player.v.x+=moveSpeeds[5];xmove=true;}
            }
            if(player.v.x!=0&&player.v.y!=0) {
                if(hovTime>115) {
                    play(sounds.hov);console.log(true)
                    hovTime=0;
                }
            } else {
                hovTime=115;
                stop(sounds.hov);
            }
            if(!ymove){frictiony(0.025);}
            if(!xmove){frictionx(0.025);}
            limitVel(moveSpeeds[4]);
            break;
    }
    }

    player.x += player.v.x;
    if(colliding(player)||hittingEnemies()) {player.x -= player.v.x;player.v.x=0;}

    player.y += player.v.y;
    if(colliding(player)||hittingEnemies()) {player.y -= player.v.y;player.v.y=0;}

    if(player.x-player.r<0) {player.x=player.r;player.v.x=0;}
    if(player.x+player.r>curLvl.size.x) {player.x=curLvl.size.x-player.r;player.v.x=0;}
    if(player.y-player.r<0) {player.y=player.r;player.v.y=0;}
    if(player.y+player.r>curLvl.size.y) {player.y=curLvl.size.y-player.r;player.v.y=0;}

    
    var targetAngle=0;
    if(level!==6) {
        targetAngle = pointTo(player,mousePosition());
    }

    player.dir.legs = turn(player.dir.legs,pointTo({x:0,y:0},{x:player.v.x,y:player.v.y}),0.06);
    player.dir.head = turn(player.dir.head,targetAngle,0.06);
    player.dir.arms = turn(player.dir.arms,targetAngle,0.08);

    if(circlerect(player,curLvl.exit)) {
        transitionTime=200;
    }
    if(closeToModule()) {
        let any=false;
        for(let i=0;i<items.length;i++) {
            if(dist(player,items[i])<75) {
                if(zoomTime==0) {play(sounds.open);}
                mi=i;
                if(zoomTime<51) {
                    zoomTime++;
                }
                any=true;
            }
        }
    } else {
        zoomTime=zoomTime>50?50:zoomTime;
        if(zoomTime>0) {
            if(zoomTime==50) {
                play(sounds.close);
            }
            zoomTime--;
        }
        mi=undefined;
    }
}

var miniSpeed=15;
function playerUpdate() {
    if(player.health<=0) {
        darkTime=200;
        return false;
    }
    if(level!==6) {
    if(keyPress[k.e]) {swapModule();}
    }
    player.attackCount++;
    switch(player.modules[2][0]) {
        case 2:
            if(player.attackCount==10) {
                play(sounds.gunr);
            }
            break;
        case 3:
            if(player.attackCount==20) {
                play(sounds.shotr);
            }
            break;
        case 1:
            if(count%90==0) {
                play(sounds.buzz);
            }
            break;
    }
    if(mouseDown[0]&&player.attackCount>=player.attackSpeed&&level!=6) {
        switch(player.modules[2][0]) {
            case 0:
                player.attackCount = 0;
                shoot(player.x,player.y,player.dir.arms,0,11,1,{x:0,y:0},10,30);
                shoot(player.x,player.y,player.dir.arms,0,11,1,{x:0,y:0},10,35,14);
                shoot(player.x,player.y,player.dir.arms,0,11,1,{x:0,y:0},10,40,28);
                play(sounds[`slice${rand(0,3)}`]);
                break;
            case 2:
                player.attackCount = 0;
                shoot(player.x,player.y,player.dir.arms,6,0,1,player.v,1,20);
                knockBack(5,3);
                if(player.v.y==0) { player.v.y=Math.sin(player.dir.arms) * -1; }
                if(player.v.x==0) { player.v.x=Math.cos(player.dir.arms) * -1; }
                screenShake=1;
                play(sounds[`gun${rand(0,1)}`]);
                break;
            case 3:
                player.attackCount = 0;
                for(let i=0;i<10;i++) {
                    shoot(player.x,player.y,player.dir.arms+(rand(-7,7)/100),10,1,1,player.v,1,20);
                }
                play(sounds[`shot`]);
                knockBack(5,4);
                if(player.v.y==0) { player.v.y=Math.sin(player.dir.arms) * -2; }
                if(player.v.x==0) { player.v.x=Math.cos(player.dir.arms) * -2; }
                screenShake=3;
                break;
            case 5:
                player.attackCount = 0;
                shoot(player.x,player.y,player.dir.arms,5,3,1,player.v,3,20);
                play(sounds.plasma);
                knockBack(5,4);
                if(player.v.y==0) { player.v.y=Math.sin(player.dir.arms) * -3; }
                if(player.v.x==0) { player.v.x=Math.cos(player.dir.arms) * -3; }
                screenShake=4;
                break;
        }
    }
    if(player.modules[2][0]==1) {
        if(count%4==0) {
            shoot(player.x,player.y,player.dir.arms,0,10,1,{x:0,y:0},10,23,25);
            shoot(player.x,player.y,player.dir.arms,0,10,1,{x:0,y:0},10,23,-25);
        }
    }
    if(player.modules[2][0]==4) {
        if(mouseDown[0]&&level!==6) {
            if(player.attackCount > miniSpeed) {
                shoot(player.x,player.y,player.dir.arms,15,2,1,player.v,1,20,10);
                shoot(player.x,player.y,player.dir.arms,15,2,1,player.v,1,20,-10);
                knockBack(3,2);
                part(player.x,player.y,player.dir.arms+Math.PI/2,rand(-5,5)/10,3,2,0,20,-20);
                part(player.x,player.y,player.dir.arms-Math.PI/2,rand(-5,5)/10,3,2,0,20,20);
                if(player.v.y==0) { player.v.y=Math.sin(player.dir.arms) * -1; }
                if(player.v.x==0) { player.v.x=Math.cos(player.dir.arms) * -1; }
                player.attackCount = 0;
                if(miniSpeed>maxMin) {
                    miniSpeed--;
                }
                screenShake=1;
                if(miniSpeed==3) {
                    if(miniTime>85) {
                        play(sounds.mini);
                        miniTime=0;
                    }
                    play(sounds.miniFast);
                } else {
                    play(sounds.miniOne);
                }
            } 
        } else {
            miniSpeed = 15;
            stop(sounds.mini);
        }
    }
    miniTime++;
}
var miniTime=0;
var maxMin=3;

function knockBack(move,div) {
    let vx = Math.cos(player.dir.arms) * -move;
    let vy = Math.sin(player.dir.arms) * -move;
    player.x += vx;
    if(colliding(player)||hittingEnemies()) {player.x -= vx;}
    player.y += vy;
    if(colliding(player)||hittingEnemies()) {player.y -= vy;}

    if(Math.sign(vx) !== Math.sign(player.v.x)) {
        player.v.x/=div;
    }
    if(Math.sign(vy) !== Math.sign(player.v.y)) {
        player.v.y/=div;
    }
}


var zoomTime = 0;
var mi = 0;
//utils
var c = {x:0,y:0}
function cameraMovement() {
    if(closeToModule()) {
        camera.zoom = lerp(camera.zoom,1.5,0.05);
    } else {
        camera.zoom = lerp(camera.zoom,1,0.1);
    }

    var m = mousePosition();
    var pos = {x:player.x + (m.x - player.x)/4,y:player.y + (m.y - player.y)/4};
    if(pos.x<cw/2/camera.zoom) {pos.x=cw/2/camera.zoom;}
    if(pos.y<ch/2/camera.zoom) {pos.y=ch/2/camera.zoom;}
    if(pos.x>curLvl.size.x-cw/2/camera.zoom) {pos.x=curLvl.size.x-cw/2/camera.zoom;}
    if(pos.y>curLvl.size.y-ch/2/camera.zoom) {pos.y=curLvl.size.y-ch/2/camera.zoom;}

    c.x = lerp(c.x,pos.x,0.1);
    c.y = lerp(c.y,pos.y,0.1);
    centerCameraOn(c.x,c.y);
}
function lerp (start, end, amt){return (1-amt)*start+amt*end;}

function frictionx(amount) {
    if(player.v.x>0) {player.v.x -= amount;}
    if(player.v.x<0) {player.v.x += amount;}
    if(Math.abs(player.v.x)<amount*2) {player.v.x = 0;}
}

function frictiony(amount) {
    if(player.v.y>0) {player.v.y -= amount;}
    if(player.v.y<0) {player.v.y += amount;}
    if(Math.abs(player.v.y)<amount*2) {player.v.y = 0;}
}

function limitVel(limit) {
    if(player.v.x>limit) {player.v.x=limit;}
    if(player.v.x<-limit) {player.v.x=-limit;}
    if(player.v.y>limit) {player.v.y=limit;}
    if(player.v.y<-limit) {player.v.y=-limit;}
}

function hittingEnemies() {
    for(let i=0;i<enemies.length;i++) {
        if(circlecircle(player,enemies[i])) {
            return true;
        }
    }
}

var pi2 = Math.PI*2;
var pi = Math.PI;
function turn(cur,target,speed) {
    
        if(target<0) {target = pi2 + target;}
        if((cur%pi2)>target) {
            if((cur%pi2)-target>pi) {
                cur += speed;
            } else {
                cur -= speed;
            }
        } else {
            if(target-(cur%pi2)>pi) {
                cur -= speed;
            } else {
                cur += speed;
            }
        }
        if(Math.abs(cur-target)<speed*1.1) {
            cur = target;
        }
        if(cur>pi2) {cur = cur - pi2;}
        if(cur<0) {cur = pi2 + cur;}
        return cur;
}