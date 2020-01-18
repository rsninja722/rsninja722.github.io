var p1;
class player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 26;
        this.h = 16;
        this.laser = {x:0,y:0,w:2,h:8,exist:0,timer:0}
    }
}

player.prototype.update = function() {
    if(this.laser.exist === 1) {
        this.laser.y-=4;
        for(var i = enemies.length - 1; i > -1; i--) {
            if(rectrect(this.laser,enemies[i])) {
                if(enemies[i].die === -1) {
                    enemies[i].die = 25;
                    updateIndexCache = updateIndex;
                    updateIndex = i;
                    pause = true;
                    play(sounds.die);
                    var l = enemies.length;
                    if(l<5) {
                        chance = 40;
                    } else if(l<10) {
                        chance = 30;
                    } else if(l<20) {
                        chance = 20;
                    } else if(l<30) {
                        chance = 15;
                    } else if(l<40) {
                        chance = 12;
                    }
                    this.laser.exist = 0;
                }
            }
        }
        for(var p=0;p<blocks.length;p++) {
            if(blocks[p].isHitBy(this.laser)) {
                blocks[p].damage({x:this.laser.x,y:this.laser.y-5});
                this.laser.exist = 0;
            }
        }
        if(this.laser.y<50) {
            this.laser.exist = -1;
            this.laser.timer = 40;
            this.laser.y = 50;
        }
    }
    if(this.laser.exist === -1) {
        this.laser.timer--;
        if(this.laser.timer===0) {
            this.laser.exist = 0;
        }
    }
}

player.prototype.input = function() {
    if(keyDown[k.RIGHT] || keyDown[k.d]) {
        this.x+=0.5;
        if(this.x > cw-wallWidth) {
            this.x-=0.5;
        }
    }
    if(keyDown[k.LEFT] || keyDown[k.a]) {
        this.x-=0.5;
        if(this.x < wallWidth) {
            this.x+=0.5;
        }
    }
    if(keyPress[k.SPACE] && this.laser.exist===0) {
        this.laser.x = Math.round(this.x);
        this.laser.y = ch-20;
        this.laser.exist = 1;
        play(sounds.playerShoot);
    }
}

player.prototype.draw = function() {
    if(timer>80) {
        img(sprites.playerHit1,this.x,this.y,0,2,2);
    } else if(timer>40) {
        img(sprites.playerHit2,this.x,this.y,0,2,2);
    } else if(timer===0) {
        img(sprites.player,this.x,this.y,0,2,2);
    }
    if(this.laser.exist===1) {
        rect(this.laser.x,this.laser.y,this.laser.w,this.laser.h,"#38db18");
    }
    if(this.laser.exist===-1) {
        img(sprites.boomRed,this.laser.x,this.laser.y,0,2,2);
    }
}