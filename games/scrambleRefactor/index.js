images = [
    "assets/images/",
    [
        "keys/",
        "a.png","b.png","c.png","d.png","e.png","f.png","g.png","h.png","i.png","j.png","k.png","l.png","m.png","n.png","o.png","p.png","q.png","r.png","s.png","t.png","u.png","v.png","w.png","x.png","y.png","z.png","0.png","1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png"
    ],
    [
        "player/",
        "base0.png",
        "wheel0.png",
        "wheel1.png",
        "chassis.png",
        "spring0.png",
        "spring1.png",
        "spring2.png",
        "core0.png",
        "core1.png",
        "core2.png",
        "eyes0.png",
        "eyes1.png",
        "eyes2.png",
        "claw.png",
        "clawRight.png"
    ],
    "keyBack.png",
    "keyBackPress.png",
    "keyBackWarn.png",
    "keyBackPressWarn.png"
];

// base 0 1 2
// jump 0 1 2 
// wall slide l  flip for r
// wall jump 0 1 2  flip for r

audio = [
    "assets/audio/",
    "noKey.wav"
]

var viewMode = false; // used to see entire map
var buildMode = false; // used to place collision

var keys = ["a","d","w"]; // left right up
var animationKeys = ["a","d","w"]; // for slam animation
var pressed = [0,0,0]; // for pressing visualization
var keyList = "abcdefghijklmnopqrstuvwxyz1234567890";

// counters for key switching
var keyTimer = 1000;
var keyAnimation = 0;

// randomization of key switching
var bag = [0,1,2];
var currentKeySwitch;


var keyPositions = [[-23,0],[23,0],[0,-25]];

var gravity = 0.2;
var friction = 0.1;

var p = {
    x:0,
    y:0,
    w:20,
    h:30,
    v:{x:0,y:0},
    maxV:2,
    accel:0.15,
    maxSlide:1,
    jump:4.5,
    onGround:[0,0,0], // left right bottom
    leftLeg:{x:0,y:0,w:5,h:15},
    rightLeg:{x:0,y:0,w:5,h:15},
    b:{ // body drawing info
        turn:0,
        jump:0,
        cores:[2,0,1,1,0,2,2],
        eyes:[1,1,1,1,1,1,0,1,1,1,1,1,1,2],
        wallJumpL:0,
        wallJumpR:0
    }
};

var cam = {x:p.x,y:p.y};

var count = 0;

function update() {
    count++;
    pressed = pressed.map(x => x-(x>0?1:0)); // decrease any number greater than 0 (wow cool syntax)

    if(p.b.jump>0) {p.b.jump--;}
    if(p.onGround[2]&&p.v.y>0) {p.b.jump=0;}
    if(p.b.wallJumpL>0) {p.b.wallJumpL--;}
    if(p.b.wallJumpR>0) {p.b.wallJumpR--;}

    // key switching
    keyTimer--;
    if(keyTimer==150) {
        var rng = rand(0,bag.length-1);
        currentKeySwitch = bag[rng];
        bag.splice(rng,1);
        if(bag.length==0) {
            bag = [0,1,2];
        }
    }

    // start switching animation
    if(keyTimer==20) {
        keyAnimation=30;
        animationKeys[currentKeySwitch] = keyList[rand(0,35)];
        // if left and right keys are the same, make them not the same
        if(currentKeySwitch==0) {
            while (animationKeys[0] == keys[1]) {
                animationKeys[0] = keyList[rand(0,35)];
            }
        }
        if(currentKeySwitch==1) {
            while (animationKeys[1] == keys[0]) {
                animationKeys[1] = keyList[rand(0,35)];
            }
        }
    }

    // reset time
    if(keyTimer<0) {
        keyTimer=750;
    }

    // step animation
    if(keyAnimation>0) {
        keyAnimation--;
        // if it is time to switch keys, switch keys
        if(keyAnimation==0) {
            keys[currentKeySwitch] = animationKeys[currentKeySwitch];
            for(var i=0;i<25;i++) {
                particles.push(new particle(keyPositions[currentKeySwitch][0]+p.x,keyPositions[currentKeySwitch][1]+p.y,"key"));
            }
        }
    }

    // set scale of canvas
    // if(screenSize == "1:1") {canvasScale = 2}

    // decrease grounded variables if above 0
    //p.onGround[2]-=p.onGround[2]>0?1:0;
    p.onGround = p.onGround.map(x => x-(x>0?1:0));

    // make canvas big if in view mode
    // if(viewMode) {
    //     canvasScale = 1;
    //     canvases.cvs.width = 1000;
    //     canvases.cvs.height = 800; 
    // } else {
    //     canvases.cvs.width = 400;
    //     canvases.cvs.height = 300; 
    // }
    
    // used by friction
    var leftRightInput = 0;

    // left
    if(keyDown[k[keys[0]]]) {
        if(p.v.x>-p.maxV) {
            p.v.x -= p.accel;
        }
        leftRightInput++;
        pressed[0] = 1;
    }
    // right
    if(keyDown[k[keys[1]]]) {
        if(p.v.x<p.maxV) {
            p.v.x += p.accel;
        }
        leftRightInput++;
        pressed[1] = 1;
    }

    // jump
    if(keyPress[k[keys[2]]]) {
        // up
        p.y+=1;
        var onFloor = colliding(p);
        if(onFloor!==false) {
            p.v.y = -p.jump - Math.abs(p.v.x)/3;
            p.b.jump=30;
        }
        p.y-=1;

        if(onFloor===false) {
            // left wall jump
            p.x-=1;
            if(colliding(p)!==false) {
                p.v.x = p.jump/1.75;
                p.v.y = -p.jump/1.25;
                p.b.wallJumpL=20;
            }
            p.x+=1;

            // right wall jump
            p.x+=1;
            if(colliding(p)!==false) {
                p.v.x = -p.jump/1.75;
                p.v.y = -p.jump/1.25;
                p.b.wallJumpR=20;
            }
            p.x-=1;
        }
        pressed[2] = 5;
    }

    // gravity
    p.v.y += gravity;

    if(p.onGround[0]||p.onGround[1]) {
        if(p.v.y > p.maxSlide) {
            p.v.y -=0.5//= p.maxSlide;
        }
    }

    // friction
    if(leftRightInput==0||leftRightInput==2) {
        var amount = friction / (p.onGround[2]?1:2);
        if(p.v.x>0) {p.v.x -= amount;}
        if(p.v.x<0) {p.v.x += amount;}
        if(Math.abs(p.v.x)<amount*2) {p.v.x = 0;}
    }

    // move x 
    p.x += p.v.x;  
    let c = colliding(p);
    if(c===false&&p.onGround[2]) {
        p.b.turn += p.v.x/2;
    }
    if(c!==false) {
        p.x -= p.v.x;
        if(p.v.x>0) {
            p.x = blocks[c].x - blocks[c].w/2 - p.w/2 - 0.1;
        } else {
            p.x = blocks[c].x + blocks[c].w/2 + p.w/2 + 0.1;
        }
        p.v.x = 0;
    }

// console.log(p.onGround);

    // walk particles
    if(p.v.x!=0 && count%5==0 && p.onGround[2]) {
        particles.push(new particle(p.x,p.y+(p.h/2)-2,"walk"));
    }

    // move y
    p.y += p.v.y;
    c = colliding(p);
    if(c!==false) {
        p.onGround[2]=3;
        p.y -= p.v.y;
        if(p.v.y>0) {
            p.y = blocks[c].y - blocks[c].h/2 - p.h/2 - 0.1;
        }
        p.v.y = 0;
    }

    // wall slide hit boxes
    p.leftLeg.x = p.x - 10;
    p.leftLeg.y = p.y + 3;

    p.rightLeg.x = p.x + 10;
    p.rightLeg.y = p.y + 3;

    // wall slide collision
    if(colliding(p.leftLeg)) {
        p.onGround[0] = 2;
    }
    if(colliding(p.rightLeg)) {
        p.onGround[1] = 2;
    }

    // build input
    if(buildMode) {
        if(keyDown[k.LEFT]) {moveCamera(-2,0);}
        if(keyDown[k.RIGHT]) {moveCamera(2,0);}
        if(keyDown[k.UP]) {moveCamera(0,-2);}
        if(keyDown[k.DOWN]) {moveCamera(0,2);}
        mapInput();
    }
    // move camera to player smoothly
    if(!buildMode) {
        var targetX = p.x;
        var targetY = p.y;
        var limits = map[level].limit;
        if(targetX<limits.left) {targetX=limits.left;}
        if(targetY<limits.top) {targetY=limits.top;}
        if(targetX>limits.right) {targetX=limits.right;}
        if(targetY>limits.bottom) {targetY=limits.bottom;}
        cam.x = lerp(cam.x,targetX,0.07);
        cam.y = lerp(cam.y,targetY,0.07);
        centerCameraOn(cam.x,cam.y);
    }

    // if at the exit, switch the level
    if(rectrect(p,map[level].exit)) {
        switchLevel(level+1);
    }

    // if player off map make them don't or die if on bottom
    if(p.x+p.w/2>map[level].limit.right + cw/2) {p.x = map[level].limit.right + cw/2 - p.w/2;} // right
    if(p.x-p.w/2<map[level].limit.left - cw/2) {p.x = map[level].limit.left - cw/2 + p.w/2;} // left
    if(p.y-p.h/2<map[level].limit.top - cw/2) {p.y = map[level].limit.top - ch/2 + p.h/2;} // top
    if(p.y+p.h/2>map[level].limit.bottom + ch/2) {die();}

    // particles
    for(var i=0;i<particles.length;i++) {
        if(particles[i].update()) {
            particles.splice(i,1);
            i--;
        }
    }

    // key doesn't work sound
    for(var i=0;i<keyList.length;i++) {
        var ki = keyList[i];
        if(!keys.includes(ki)) {
            if(keyPress[k[ki]]) {
                play(sounds.noKey);
            }
        }
    }
}

var anicount = 0;

function draw() {
    anicount++;
    // build preview
    if(buildMode) {
        rect(buildBlock.x,buildBlock.y,buildBlock.w,buildBlock.h,"green");
    }
    // map
    for(var i=0;i<blocks.length;i++) {
        blocks[i].draw();
    }
    // exit
    var b = map[level].exit;
    rect(b.x,b.y,b.w,b.h,"red");
    // player

    var pos = {x:Math.round(p.x),y:Math.round(p.y)};
    var jumpOff = (p.b.jump>15?3:(p.b.jump>0?2:0));

    var turnAmount = Math.abs(Math.round(p.b.turn)%2);
    img(sprites[`wheel${turnAmount}`],pos.x-6,pos.y+12+jumpOff);
    img(sprites[`wheel${turnAmount}`],pos.x,pos.y+12+jumpOff);
    img(sprites[`wheel${turnAmount}`],pos.x+6,pos.y+12+jumpOff);

    img(sprites[`spring${(p.b.jump>15?2:(p.b.jump>0?1:0))}`],pos.x,pos.y);

    img(sprites.claw,pos.x-6-(p.onGround[0]?1:0)-(p.b.wallJumpL?4:0),pos.y+1);
    img(sprites.clawRight,pos.x+6+(p.onGround[0]?1:0)+(p.b.wallJumpR?4:0),pos.y+1);

    img(sprites.chassis,pos.x,pos.y+jumpOff);
    img(sprites.base0,pos.x,pos.y);

    var coreCycle = Math.round(anicount/15)%7;
    img(sprites[`core${p.b.cores[coreCycle]}`],pos.x,pos.y);


    var eyeCycle = Math.round(anicount/15)%14;
    img(sprites[`eyes${p.b.eyes[eyeCycle]}`],pos.x,pos.y);
        
    //rect(p.x,p.y,p.w,p.h,"blue");
    //rect(p.leftLeg.x,p.leftLeg.y,p.leftLeg.w,p.leftLeg.h,"purple");
    //rect(p.rightLeg.x,p.rightLeg.y,p.rightLeg.w,p.rightLeg.h,"purple");

    // particles
    for(var i=0;i<particles.length;i++) {
        particles[i].draw();
    }

    // keys
    for(var i=0;i<3;i++) {
        if(currentKeySwitch==i && keyAnimation !=0) {
            var size = 1;
            if(keyAnimation>22) {
                size = (30-keyAnimation)/5;
            } else if(keyAnimation<23&&keyAnimation>15) {
                size = 1.4;
            } else {
                size = map_range(keyAnimation,0,14,1,1.4);
            }
            img(sprites.keyBack,keyPositions[i][0]+p.x,keyPositions[i][1]+p.y,0,size,size);
        } else if(currentKeySwitch==i && keyTimer<100){
            if(pressed[i]) {
                img(sprites[`keyBackPress${(Math.round(keyTimer/10)%2?"Warn":"")}`],keyPositions[i][0]+p.x,keyPositions[i][1]+p.y,0,0.9,0.9);
            } else {
                img(sprites[`keyBack${(Math.round(keyTimer/10)%2?"Warn":"")}`],keyPositions[i][0]+p.x,keyPositions[i][1]+p.y);
            }
        } else {
            if(pressed[i]) {
                img(sprites.keyBackPress,keyPositions[i][0]+p.x,keyPositions[i][1]+p.y,0,0.9,0.9);
            } else {
                img(sprites.keyBack,keyPositions[i][0]+p.x,keyPositions[i][1]+p.y);
            }
        }
    }
    for(var i=0;i<3;i++) {
        if(currentKeySwitch==i && keyAnimation !=0) {
            var size = 1;
            if(keyAnimation>22) {
                size = (30-keyAnimation)/5;
            } else if(keyAnimation<23&&keyAnimation>15) {
                size = 1.4;
            } else {
                size = map_range(keyAnimation,0,14,1,1.4);
            }
            img(sprites[animationKeys[i]],keyPositions[i][0]+p.x,keyPositions[i][1]+p.y,0,size,size);
        } else {
            img(sprites[keys[i]],keyPositions[i][0]+p.x,keyPositions[i][1]+p.y);
        }
    }
}

function absoluteDraw() {

}

function onAssetsLoaded() {
    switchLevel(0);
}

var blocks = [];
class block {
    constructor(x,y,w,h) {
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
    }
    draw() {
        rect(this.x,this.y,this.w,this.h,"green");
    }
}

var particles = [];
class particle {
    constructor(x,y,type) {
        this.x=x;
        this.y=y;
        this.v={x:0,y:0};
        this.type=type;
        this.angle=0;
        this.speed=0;
        switch(type) {
            case "key":
                this.speed = rand(10,15)/10;
                this.angle = degToRad(rand(0,359));
                this.x += Math.cos(this.angle) * 8;
                this.y += Math.sin(this.angle) * 8;
                break;
            case "walk":
                    this.speed = rand(15,30)/10;
                    if(p.v.x>0) {
                        this.angle = degToRad(rand(180,270));
                        this.x-=p.w/2;
                    } else {
                        this.angle = degToRad(rand(270,360));
                        this.x+=p.w/2;
                    }
                    this.v.x = Math.cos(this.angle);
                    this.v.y = Math.sin(this.angle);
                    this.w=2;
                    this.h=2;
                    break;
        }
    }
    draw() {
        switch(this.type) {
            case "key":
                rect(Math.round(this.x),Math.round(this.y),2,2,"#ffffff");
                break;
            case "walk":
                let col;
                switch(level) {
                    case 0: col = "green"; break;
                }
                rect(Math.round(this.x),Math.round(this.y),2,2,col);
                break;
        }
    }
    update() {
        switch(this.type) {
            case "key":
                this.speed-=0.1;
                if(this.speed<=0) {
                    return true;
                }
                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed;
                break;
            case "walk":
                this.v.x = fric(this.v.x,0.1);
                this.v.y += 0.05;
                this.x += this.v.x;
                this.y += this.v.y;
                for(let i=0,l=blocks.length;i<l;i++) {
                    if(rectrect(this,blocks[i])) {
                        return true;
                    }
                }
                break;
        }
    }
}

var level = 0;
var map = [
    {
        start:{x:-155,y:85},
        exit:{x:496,y:-290,w:10,h:129},
        limit:{bottom:0,top:-200,left:0,right:300},
        collision:[-42,128,685,50,160,78,35,53,-26,85,35,44,200,129,200,49,449,126,122,49,478,92,83,35,487,60,38,35,413,4,47,16,353,-13,75,19,343,-28,20,24,277,-58,22,21,225,-62,100,29,151,-52,82,9,88,-80,52,66,278,-64,25,33,241,-69,55,33,88,-119,70,13,-53,-51,260,8,4,-82,15,68,-50,-82,15,68,-118,-83,15,68,-198,-82,50,70,-215,26,45,170,-192,-36,45,30,-203,17,45,30,-208,72,45,30,-38,-63,280,20,-200,-133,32,32,-199,-162,13,31,-143,-197,33,21,-70,-210,38,37,37,-227,58,17,116,-232,47,33,30,-284,37,13,128,-308,37,13,163,-273,37,38,268,-208,67,23,440,-229,140,18]
    },
    {
        start:{x:0,y:0},
        exit:{x:100,y:-345,w:50,h:50},
        collision:[-12,72,130,79]
    }
];

function fric(num,amount) {
    if(num>0) {num -= amount;}
    if(num<0) {num += amount;}
    if(Math.abs(num)<amount*2) {num = 0;}
    return num;
}

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function lerp (start, end, amt){return (1-amt)*start+amt*end;}

setup(60);