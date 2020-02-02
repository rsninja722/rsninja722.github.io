// player
// player movement

// object representing the player
var player = {
    x: 0,
    y: 0,
    w: 20,
    h: 30,
    v: { x: 0, y: 0 },
    maxV: 2,
    accel: 0.15,
    maxSlide: 1,
    jump: 4,
    holdingJump:false,
    holdTime:0,
    onGround: [0, 0, 0], // left right bottom
    leftArm: { x: 0, y: 0, w: 5, h: 15 },
    rightArm: { x: 0, y: 0, w: 5, h: 15 }
};

var gravity = 0.2;
var friction = 0.1;

var drawingInfo = {
    turn: 0,
    jump: 0,
    cores: [2, 0, 1, 1, 0, 2, 2],
    eyes: [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 2],
    wallJumpL: 0,
    wallJumpR: 0
};

function playerDraw() {
    var pos = { x: (player.x), y: (player.y) };
    var jumpOff = (drawingInfo.jump > 15 ? 3 : (drawingInfo.jump > 0 ? 2 : 0));
    var idle = (player.v.x === 0 && player.v.y === 0) ? Math.round(animationCount/30)%2 : 0;
    var tilt = (player.v.x>1 ? -1 : (player.v.x<-1 ? 1 : 0));

    var turnAmount = Math.abs(Math.round(drawingInfo.turn) % 2);
    img(sprites[`wheel${turnAmount}`], pos.x - 6 + tilt, pos.y + 12 + jumpOff);
    img(sprites[`wheel${turnAmount}`], pos.x + tilt, pos.y + 12 + jumpOff);
    img(sprites[`wheel${turnAmount}`], pos.x + 6 + tilt, pos.y + 12 + jumpOff);

    img(sprites[`spring${(drawingInfo.jump > 15 ? 2 : (drawingInfo.jump > 0 ? 1 : 0))}`], pos.x, pos.y);

    img(sprites.claw, pos.x - 6 - (player.onGround[0] ? 1 : 0) - (drawingInfo.wallJumpL ? 4 : 0) - idle, pos.y + 1 + idle);
    img(sprites.clawRight, pos.x + 6 + (player.onGround[0] ? 1 : 0) + (drawingInfo.wallJumpR ? 4 : 0) + idle, pos.y + 1 + idle);

    img(sprites.chassis, pos.x + tilt, pos.y + jumpOff);
    img(sprites.base0, pos.x, pos.y+idle);

    var coreCycle = Math.round(animationCount / 15) % 7;
    img(sprites[`core${drawingInfo.cores[coreCycle]}`], pos.x, pos.y+idle);


    var eyeCycle = Math.round(animationCount / 15) % 14;
    img(sprites[`eyes${drawingInfo.eyes[eyeCycle]}`], pos.x, pos.y+idle);

    // rect(player.x, player.y, player.w, player.h, "blue");
    // rect(player.leftArm.x, player.leftArm.y, player.leftArm.w, player.leftArm.h, "purple");
    // rect(player.rightArm.x, player.rightArm.y, player.rightArm.w, player.rightArm.h, "purple");
}

// physics for player
function updatePlayer() {
    if(drawingInfo.jump>0) {drawingInfo.jump--;}
    if(player.onGround[2]&&player.v.y>0) {drawingInfo.jump=0;}
    if(drawingInfo.wallJumpL>0) {drawingInfo.wallJumpL--;}
    if(drawingInfo.wallJumpR>0) {drawingInfo.wallJumpR--;}

    // decrement 
    player.onGround = player.onGround.map(x => x - (x > 0 ? 1 : 0));
    pressed = pressed.map(x => x - (x > 0 ? 1 : 0));

    // used by friction
    var leftRightInput = 0;

    // left press
    if (keyDown[k[keys[0]]]) {
        if (player.v.x > -player.maxV) {
            player.v.x -= player.accel;
        }
        leftRightInput++;
        pressed[0] = 1;
    }

    // right press
    if (keyDown[k[keys[1]]]) {
        if (player.v.x < player.maxV) {
            player.v.x += player.accel;
        }
        leftRightInput++;
        pressed[1] = 1;
    }

    // jump press
    if (keyPress[k[keys[2]]]) {
        // up
        player.y += 1;
        var onFloor = colliding(player);
        if (onFloor !== false) {
            player.v.y = -player.jump - Math.abs(player.v.x) / 3;
            drawingInfo.jump = 30;
            player.holdingJump = true;
            player.holdTime = 30;
        }
        player.y -= 1;

        if (onFloor === false) {
            // left wall jump
            player.x -= 1;
            if (colliding(player) !== false) {
                player.v.x = player.jump / 1.75;
                player.v.y = -player.jump / 1.25;
                drawingInfo.wallJumpL = 20;
                player.holdingJump = true;
                player.holdTime = 30;
            }
            player.x += 1;

            // right wall jump
            player.x += 1;
            if (colliding(player) !== false) {
                player.v.x = -player.jump / 1.75;
                player.v.y = -player.jump / 1.25;
                drawingInfo.wallJumpR = 20;
                player.holdingJump = true;
                player.holdTime = 30;
            }
            player.x -= 1;
        }
    }

    // jump hold
    if(player.holdingJump === true) {
        if ( !keyDown[k[keys[2]]] || player.v.y > 0) {
            player.holdingJump = false;
        }
        player.holdTime--;
        pressed[2] = 1;
    }

    // gravity
    player.v.y += ( gravity * (player.holdingJump ? 0.8 : 1 + (player.holdTime/60)));

    if (player.onGround[0] || player.onGround[1]) {
        if (player.v.y > player.maxSlide) {
            player.v.y -= 0.5//= player.maxSlide;
        }
    }

    // friction
    if (leftRightInput == 0 || leftRightInput == 2) {
        var amount = friction / (player.onGround[2] ? 1 : 2);
        if (player.v.x > 0) { player.v.x -= amount; }
        if (player.v.x < 0) { player.v.x += amount; }
        if (Math.abs(player.v.x) < amount * 2) { player.v.x = 0; }
    }

    // move x 
    player.x += player.v.x;
    let c = colliding(player);
    if (c === false && player.onGround[2]) {
        drawingInfo.turn += player.v.x / 2;
    }
    if (c !== false) {
        player.x -= player.v.x;
        if (player.v.x > 0) {
            player.x = blocks[c].x - blocks[c].w / 2 - player.w / 2 - 0.1;
        } else {
            player.x = blocks[c].x + blocks[c].w / 2 + player.w / 2 + 0.1;
        }
        player.v.x = 0;
    }

    // walk particles
    if (player.v.x != 0 && updateCount % 5 == 0 && player.onGround[2]) {
        particles.push(new particle(player.x, player.y + (player.h / 2) - 2, "walk"));
    }

    // move y
    player.y += player.v.y;
    c = colliding(player);
    if (c !== false) {
        player.onGround[2] = 3;
        player.y -= player.v.y;
        if (player.v.y > 0) {
            player.y = blocks[c].y - blocks[c].h / 2 - player.h / 2 - 0.1;
        }
        player.v.y = 0;
    }

    // wall slide hit boxes
    player.leftArm.x = player.x - 10;
    player.leftArm.y = player.y + 3;

    player.rightArm.x = player.x + 10;
    player.rightArm.y = player.y + 3;

    // wall slide collision
    if (colliding(player.leftArm)) {
        player.onGround[0] = 2;
    }
    if (colliding(player.rightArm)) {
        player.onGround[1] = 2;
    }

    // if player off map make them don't or die if on bottom
    if (player.x + player.w / 2 > levels[level].limit.right + cw / 2) { player.x = levels[level].limit.right + cw / 2 - player.w / 2; } // right
    if (player.x - player.w / 2 < levels[level].limit.left - cw / 2) { player.x = levels[level].limit.left - cw / 2 + player.w / 2; } // left
    if (player.y - player.h / 2 < levels[level].limit.top - cw / 2) { player.y = levels[level].limit.top - ch / 2 + player.h / 2; } // top
    if (player.y + player.h / 2 > levels[level].limit.bottom + ch / 2) { die(); }

    updateCamera();
}


function updateCamera() {
    if(!buildMode) {
        var targetX = player.x;
        var targetY = player.y;

        var limits = levels[level].limit;
        if(targetX<limits.left) {targetX=limits.left;}
        if(targetY<limits.top) {targetY=limits.top;}
        if(targetX>limits.right) {targetX=limits.right;}
        if(targetY>limits.bottom) {targetY=limits.bottom;}
        cam.x = lerp(cam.x,targetX,0.07);
        cam.y = lerp(cam.y,targetY,0.07);
        centerCameraOn(cam.x,cam.y);
    }
}

function lerp (start, end, amt){return (1-amt)*start+amt*end;}

function die() {

}