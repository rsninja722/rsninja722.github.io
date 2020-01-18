var pause = false;
var enemyLasers = [];
class enemyLaser {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 10;
        this.h = 18;
        this.state = 0;
        this.die = -1;
    }
}

enemyLaser.prototype.update = function () {
    if(this.die === -1) {
        if (frameCount % 4 === 0 ) {
            this.state++;
        }
        if (this.state >= 4) {
            this.state = 0;
        }
        this.y+=1.5;
        if (this.y + this.h / 2 > ch) {
            return true;
        }
        for(var e=0;e<blocks.length;e++) {
            if(blocks[e].isHitBy(this)) {
                blocks[e].damage({x:this.x,y:this.y+10});
                this.die = 30;
                play(sounds.hitBlock);
            }
        }
        if(rectrect(this,p1)) {
            timer = 120;
            gameState = "playerHit";
            enemyLasers = [];
            play(sounds.death);
        }
    } else {
        this.die--;
        if(this.die === 0) {
            return true;
        }
    }
}

enemyLaser.prototype.draw = function () {
    if(this.die === -1) {
        img(sprites[`laser${this.state}`], this.x, this.y, 0, 2, 2);
    } else {
        img(sprites.boomGreen, this.x, this.y+10, 0, 2, 2);
    }
}

function updateEnemyLasers() {
    for(var i = enemyLasers.length -1; i > -1; i--) {
        if(enemyLasers[i].update()) {
            enemyLasers.splice(i,1);
        }
    }
}

function drawEnemyLasers() {
    for (var i = 0; i < enemyLasers.length; i++) {
        enemyLasers[i].draw();
    }
}