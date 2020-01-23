images = [
    "assets/images/",
    "e1_0.png",
    "e1_1.png",
    "e2_0.png",
    "e2_1.png",
    "e3_0.png",
    "e3_1.png",
    "player.png",
    "playerHit1.png",
    "playerHit2.png",
    "laser0.png",
    "laser1.png",
    "laser2.png",
    "laser3.png",
    "block.png",
    "boomRed.png",
    "boomGreen.png",
    "death.png"   
];

audio = [
    "assets/audio/",
    "move0.wav",
    "move1.wav",
    "move2.wav",
    "move3.wav",
    "die.wav",
    "playerShoot.wav",
    "hitBlock.wav",
    "death.wav"
];

var wallWidth = 85;
var frameCount = 0;
var lives = 3;
var score = 0;
var gameState = "playing";
var timer = 0;
var now;

function update() {
    if(gameState === "playing") {
        updateEnemies();
        updateEnemyLasers();
        p1.update();
        frameCount++;
    }
    if(gameState === "playerHit") {
        timer--;
        if(timer === 0) {
            p1.x = cw/2;
            lives--;
            if(lives===-1) {
                gameState = "gameOver";
                frameCount = 0;
            } else {
                gameState = "playing";
            }
        }
    }
    if(gameState === "gameOver") {
        if(enemies.length > 0) {
            enemies.splice(0,1);
        }
        if(enemyLasers.length > 0) {
            enemyLasers.splice(0,1);
        }
        frameCount++;
        if(frameCount===50 || frameCount===125 || (frameCount>200 && frameCount%100 === 50)) {play(sounds.move0);}
    }
}

function input() {
    if(gameState === "playing") {
        p1.input();
    }
    if(gameState === "gameOver") {
        if(mousePress[0] || keyPress[k.SPACE]) {
            enemyLasers = [];
            enemies = [];
            blocks = [];
            generateEnemies();
            generateBlocks();
            frameCount = 0;
            lives = 3;
            score = 0;
            gameState = "playing";
            timer = 0;
            updateIndex = 1;
            direction = 2;
            chance = 10;
            soundCycle = 0;
            pause = false;
            p1 = new player(cw / 2, ch - 8);
        }
    }
}

function draw() {
    
}

function absoluteDraw() {
    rect(cw / 2, ch / 2, cw, ch, "black");
    drawBlocks();
    drawEnemyLasers();
    drawEnemies();
    if(gameState !== "gameOver") {p1.draw();}
    rect(37.5, 256, 75, 512, "#242424");
    rect(cw - 37.5, 256, 75, 512, "#242424");
    for (var i = 0; i < lives; i++) {
        img(sprites.player, 100 + i * 30, 20, 0, 2, 2);
    }
    text(`score: ${score}`, 200, 15, "white", 2, 300);
    if(gameState === "gameOver") {
        if(frameCount>50) {text(`GAME`, 225, 150, "white", 2);}
        if(frameCount>125) {text(`OVER`, 225, 175, "white", 2);}
        if(frameCount>200 && (Math.round(frameCount/50)%2)) {text(`Click to play again`, 175, 250, "white", 2);}
    }
}

function onAssetsLoaded() {
    generateEnemies();
    generateBlocks();
    setVolume(sounds.playerShoot,0.25);
    setVolume(sounds.die,0.25);
    p1 = new player(cw / 2, ch - 8);
    now = Date.now();
}

setup(120);