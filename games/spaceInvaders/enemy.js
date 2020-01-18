var enemyBlock = {
    w: 11,
    h: 5,
    enemySize: { w: 18, h: 10 },
    spacing: { x: 10, y: 22 }
};

var updateIndex = 1;
var updateIndexCache;

var moveDown = false;
var direction = 2;
var chance = 10;
var soundCycle = 0;
var soundsLimitCounter = 0;

var enemies = [];
class enemy {
    constructor(x, y, type, column) {
        this.x = x;
        this.y = y;
        this.w;
        this.h;
        this.type = type;
        switch(this.type) {
            case 1:
                this.w = 22;
                this.h = 16;
                break;
            case 2:
                this.w = 24;
                this.h = 16;
                break;
            case 3:
                this.w = 16;
                this.h = 16;
                break;
        }
        this.state = 0;
        this.die = -1;
        this.column = column;
    }
}

enemy.prototype.update = function () {
    if(this.die === -1) {
        this.state = this.state ? 0 : 1;
        this.x += direction;
        if (this.x > cw - wallWidth - 5 || this.x < wallWidth + 5) {
            moveDown = true;
        }
        if (rand(0, chance) === 0) {
            var IAmLowest = true;
            var MyColumn = this.column;
            for (var c = 0; c < enemies.length; c++) {
                if (enemies[c].column === MyColumn) {
                    if (enemies[c].y > this.y) {
                        IAmLowest = false;
                    }
                }
            }
            if (IAmLowest) {
                enemyLasers.push(new enemyLaser(this.x, this.y + 4));
            }
        }
    } else {
        this.die--;
        if(this.die===0) {
            switch(this.type) {
                case 1:
                    score += 20;
                    break;
                case 2:
                    score += 10;
                    break;
                case 3:
                    score += 30;
                    break;
            }
            pause = false;
            
            return true;
        }
        updateIndex++;
    }
}

enemy.prototype.draw = function () {
    if(this.die === -1) {
        img(sprites[`e${this.type}_${this.state}`], this.x, this.y, 0, 2, 2);
    } else {
        img(sprites.death, this.x, this.y, 0, 2, 2);
    }
    
}

function updateEnemies() {
    if (updateIndex > -1 && updateIndex < enemies.length) {
        if(pause) {
            if(enemies[updateIndex].die !== -1) {
                if(enemies[updateIndex].update()) {
                    enemies.splice(updateIndex,1);
                    if(enemies.length === 0) {
                        generateEnemies();
                        lives += lives < 3 ? 1 : 0;
                    }
                    updateIndex = updateIndexCache;
                }
            }
        } else {
            if(enemies[updateIndex].update()) {
                enemies.splice(updateIndex,1);
                if(enemies.length === 0) {
                    generateEnemies();
                    lives += live < 3 ? 1 : 0;
                }
            }
        }
    }
    updateIndex--;
    soundsLimitCounter++;
    if (enemies.length < 15) {
        if (soundsLimitCounter > 15) {
            if(!pause) {
                play(sounds[`move${soundCycle}`]);
            }
            soundsLimitCounter = 0;
        }
    }
    if (updateIndex === -1) {
        updateIndex = enemies.length-1;
        if (!enemies.length < 15 && !pause) {
            play(sounds[`move${soundCycle}`]);
        }

        soundCycle++;
        soundCycle = soundCycle > 3 ? 0 : soundCycle;
        if (moveDown) {
            for (var i = 0; i < enemies.length; i++) {
                enemies[i].y += 16;
            }
            direction *= -1;
            moveDown = false;
        }
    }
}

function drawEnemies() {
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].draw();
    }
}

function generateEnemies() {
    for (var y = 0; y < enemyBlock.h; y++) {
        for (var x = 0; x < enemyBlock.w; x++) {
            enemies.push(new enemy(100 + enemyBlock.enemySize.w * x + enemyBlock.spacing.x * x, 100 + enemyBlock.enemySize.h * y + enemyBlock.spacing.y * y, (y==0 ? 3 : (y<3 ? 1 : 2)), x));
        }
    }
}