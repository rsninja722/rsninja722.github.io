var canvas = document.getElementById("myIdLol");
var ctx = canvas.getContext("2d");

var scale = 40;
var ctxscale = scale/40;

var first = false;

function setScale(num) {
    scale = num;
    ctxscale = scale/40;
}
var game = levels[1];
var curLevel = 1;

var items = [];
var fazes = 0;

var rreset = 250;
var wasd = 0;

var win = false

var orbCounter = 1;
var boostCounter = 0;
var wCounter = 0;

var blocks = [];

var keysoff = false;

var title = true;

var snake = [];


var keyPress = [];
var mousePress = [];
var scroll = 0;
var mousePos = {
    x:0,
    y:0
}
window.addEventListener("keydown",kdown);
window.addEventListener("keyup",kup);
canvas.addEventListener("mousedown",mdown);
canvas.addEventListener("mouseup",mup);
canvas.addEventListener("mousemove",mmove);

ctx.scale(ctxscale,ctxscale);

requestAnimationFrame(update);
function update() {
    
    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.drawImage(images.test,0,0);

    if(snake.length!=0){if(((game[snake[0].y][snake[0].x].toString())[0])!=4) {
        keysoff = false;
    }}

    orbCounter+=0.04;
    boostCounter+=0.05;
    wCounter+=0.05;

    //--------------------------------------map--------------------------------------
    //if(keyPress[40]) {snake=[];switchLevel();}

//reset
if(keyPress[82]) { sounds.no.play();}
    if(keyPress[82]||first) {

        resetStuff();
        curLevel--;
        
        switchLevel();
        first = false;
    }

    var moveTest=false;


    if(keyPress[87]) {
        if(title) {
            sounds.win.play();
            keysoff = false;
            snake.push({x:5,y:3,dir:1,type:"head"});
            snake.push({x:5,y:4,dir:1,type:"tail"});
            wasd = 100;
            title = false;
        }
    }
    if(title) {
        keysoff = true;
    }
    //console.log(keysoff);
if(!keysoff) { 
//up
    
    if(keyPress[87]) { 
        if(snake[0].dir!=3) {
            moveTest=true;
            if(snake[0].y!=0) {
                if(move("up")) {
                    moveTest=false;
                }
            } else {
                moveTest=false;
            }
        }
    }
//down
    if(keyPress[83]) {
        if(snake[0].dir!=1) {
            moveTest=true;
            if(snake[0].y!=game.length-1) {
                if(move("down")) {
                    moveTest=false;
                }
            } else {
                moveTest = false;
            }
        }
    }
//right
    if(keyPress[65]) {
        if(snake[0].dir!=2) {
            moveTest=true;
            if(snake[0].x!=0) {
                if(move("right")) {
                    moveTest=false;
                }
            } else {
                moveTest = false;
            }
        }
    }
//left
    if(keyPress[68]) {
        if(snake[0].dir!=4) {
            moveTest=true;
            if(snake[0].x!=game[0].length-1) {
                if(move("left")) {
                    moveTest=false;
                }
            } else {
                moveTest = false;
            }
        }
    }
}
    if(moveTest) {
        sounds[`move${rand(1,4)}`].play();
        lolidk();
    }
    
    

    
    drawthestuff();

    
    
    resetInput();
    requestAnimationFrame(update);
}

function drawthestuff() {
    for(var y=0;y<game.length;y++) {
        for(var x=0;x<game[0].length;x++) {
            switch((game[y][x].toString())[0]) {
                case "1":
                    pic(Math.round(x*scale),Math.round(y*scale),images.one);
                    break;
                case "2":
                    var lit = false;
                    for(let i=0;i<snake.length;i++) {
                        if(snake[i].y==y&&snake[i].x==x) {
                            lit = true;
                        }
                    }
                    if(lit) {
                        pic(Math.round(x*scale),Math.round(y*scale),images.onelit);
                    } else {
                        pic(Math.round(x*scale),Math.round(y*scale),images.two);
                    }
                    break;
                case "3":
                    //rect(x*scale,y*scale,scale,scale,"#111111");
                    pic(Math.round(x*scale),Math.round(y*scale),images.three);
                    break;
                case "4":
                    picRotate(Math.round(x*scale),Math.round(y*scale),parseInt((game[y][x].toString())[1],10),images[`four${Math.round(boostCounter)%5}`],scale,scale);
                    pic(Math.round(x*scale),Math.round(y*scale),images.fourOut);
                    break;
            }
        }
    }   
    
    //--------------------------------------snake--------------------------------------
    for(var i=0;i<snake.length;i++) {
        switch(snake[i].type) {
            case "head":
                
                break;
            case "tail":
                let lolkek = true;
                for(let y=0;y<game.length;y++) {
                    for(let x=0;x<game[0].length;x++) {
                        if(game[y][x]==2) {
                            let ee = false;
                            for(let z=0;z<snake.length;z++) {
                                if(snake[z].x==x&&snake[z].y==y) {
                                    ee = true;
                                }
                            }
                            if(!ee) {lolkek = false;}
                        }   
                    }
                }
                if(lolkek) {
                    picRotate(snake[i].x*scale,snake[i].y*scale,snake[i].dir,images.testyes,scale,scale);
                } else {
                    picRotate(snake[i].x*scale,snake[i].y*scale,snake[i].dir,images.test,scale,scale);
                }
                break;
            case "body":
                if(snake[i].dir==snake[i-1].dir) {
                    if((i-snake.length)*-1<fazes) {
                        picRotate(snake[i].x*scale,snake[i].y*scale,snake[i].dir,images.snakeBodyTestDark,scale,scale);
                    } else {
                        picRotate(snake[i].x*scale,snake[i].y*scale,snake[i].dir,images.snakeBodyTest,scale,scale);
                    }
                } else {
                    switch(snake[i].dir+""+snake[i-1].dir) {
                        
                        case "23":
                        case "14":
                            if((i-snake.length)*-1<fazes) {
                                picRotate(snake[i].x*scale,snake[i].y*scale,1,images.snakeBodyRotateTestDark,scale,scale);
                            } else {
                            picRotate(snake[i].x*scale,snake[i].y*scale,1,images.snakeBodyRotateTest,scale,scale);
                            }
                            break;
                        case "34":
                        case "21":
                            if((i-snake.length)*-1<fazes) {
                                picRotate(snake[i].x*scale,snake[i].y*scale,2,images.snakeBodyRotateTestDark,scale,scale);
                            } else {
                            picRotate(snake[i].x*scale,snake[i].y*scale,2,images.snakeBodyRotateTest,scale,scale);
                            }
                            break;
                        case "41":
                        case "32":
                            if((i-snake.length)*-1<fazes) {
                                picRotate(snake[i].x*scale,snake[i].y*scale,3,images.snakeBodyRotateTestDark,scale,scale);
                            } else {
                            picRotate(snake[i].x*scale,snake[i].y*scale,3,images.snakeBodyRotateTest,scale,scale);
                            }
                            break;
                        case "12":
                        case "43":
                            if((i-snake.length)*-1<fazes) {
                                picRotate(snake[i].x*scale,snake[i].y*scale,4,images.snakeBodyRotateTestDark,scale,scale);
                            } else {
                            picRotate(snake[i].x*scale,snake[i].y*scale,4,images.snakeBodyRotateTest,scale,scale);
                            }
                            break;
                    }
                }
                break;
        }
    }
    if(snake.length>0) {
        if(fazes) {
            picRotate(snake[0].x*scale,snake[0].y*scale,snake[0].dir,images.snakeHeadDarkTest,scale,scale);
        } else {
            var h=false
            for(var i=1;i<snake.length;i++) {
                if(snake[0].x==snake[i].x&&snake[0].y==snake[i].y) {
                    h=false;
                }
            }
            if(h) {
                picRotate(snake[0].x*scale,snake[0].y*scale,snake[0].dir,images.snakeHeadDarkTest,scale,scale);
            } else {
                picRotate(snake[0].x*scale,snake[0].y*scale,snake[0].dir,images.snakeTest,scale,scale);
            }
        }
    }
    for(var i=0;i<items.length;i++) {
        switch(items[i].type) {
            case "faze":
                picRotate(items[i].x*scale,items[i].y*scale,1,images[`orb${Math.round(orbCounter)%5+1}`],scale,scale);
                break;
        }
    }

    for(var i=0;i<blocks.length;i++) {
        switch(blocks[i].type) {
            case "norm":
                if(blocks[i].moved!=0) {
                    var xchange = 0;
                    var ychange = 0;
                    //console.log(blocks[i].dir*blocks[i].vel);
                    switch(blocks[i].dir*blocks[i].vel) {
                        case 1:
                            ychange = scale/2*blocks[i].vel
                            break;
                        case 2:
                            xchange = scale/2//*blocks[i].vel
                            break;
                        case 3:
                            ychange = scale/-2*blocks[i].vel
                            break;
                        case 4:
                            xchange = scale/-2//*blocks[i].vel
                            break;
                        case -1:
                            ychange = scale/2*blocks[i].vel
                            break;
                        case -2:
                            xchange = scale/2*blocks[i].vel
                            break;
                        case -3:
                            ychange = scale/2//*blocks[i].vel
                            break;
                        case -4:
                            xchange = scale/2//*blocks[i].vel
                            break;
                    }
                    picRotate(xchange+(blocks[i].x*scale),ychange+(blocks[i].y*scale),blocks[i].dir,images.norm,scale,scale);
                    blocks[i].moved -= 1;
                } else {
                    rect(blocks[i].x*scale,blocks[i].y*scale,scale,scale,"red");
                    picRotate(blocks[i].x*scale,blocks[i].y*scale,blocks[i].dir,images.norm,scale,scale);
                }
                //picRotate(items[i].x*40,items[i].y*40,1,images.orbTest,40,40)
                break;
        }
    }
    if(curLevel==2&&rreset>0) {
        rreset--;
        pic(120,260,images.rreset);
    }
    if(curLevel==1&&wasd>0) {
        wasd--;
        pic(160,80,images.wasd);
    }
    

    
    if(title) {
        pic(0,0,images.titlee);
    }
    if(Math.round(wCounter)%2&&title) {
        pic(canvas.width/2-20,canvas.height/2,images.w);
    }
    if(win) {
        pic(0,0,images.win);
    }
}
function hitStuff() {
    /*for(var y=0;y<game.length;y++) {
        for(var x=0;x<game[0].length;x++) {
            if(game[y][x]==1) {
                return true;
            }
        }
    }*/
    for(var i=0;i<blocks.length;i++) {
        if(snake[0].y==blocks[i].y&&snake[0].x==blocks[i].x) {
            return true;
        }
    }
    if(game[snake[0].y][snake[0].x]==1) {return true;}
    for(var i=1;i<snake.length;i++) {
        if(snake[0].y==snake[i].y&&snake[0].x==snake[i].x) {
            if(fazes) {
                fazes--;
            } else {
                return true;
            }
        }
    }
    
    return false;
}

function didIwinthisLevel() {
    var lolkek=false;
    if(snake[0].y==snake[1].y&&snake[0].x==snake[1].x&&snake[0].dir==snake[1].dir) {
        lolkek = true;
        for(var y=0;y<game.length;y++) {
            for(var x=0;x<game[0].length;x++) {
                if(game[y][x]==2) {
                    var ee = false;
                    for(var z=0;z<snake.length;z++) {
                        if(snake[z].x==x&&snake[z].y==y) {
                            ee = true;
                        }
                    }
                    if(!ee) {lolkek = false;}
                }   
            }
        }
        if(!lolkek) {sounds.no.play();}
    }
    if(lolkek) {
        return true;
    }
    return false;
}
function resetStuff() {
    snake=[];
    fazes=0;
    items = [];
    blocks = [];
    keysoff = false;
}
function switchLevel() {
    resetStuff();
    switch(curLevel) {
        case 0:
            game = levels[1];
            curLevel++;
            snake.push({x:5,y:3,dir:1,type:"head"});
            snake.push({x:5,y:4,dir:1,type:"tail"});
            break;
        case 1:
            game = levels[2];
            curLevel++;
            snake.push({x:4,y:4,dir:4,type:"head"});
            snake.push({x:5,y:4,dir:4,type:"tail"});
            break;
        case 2:
            game = levels[3];
            curLevel++;
            snake.push({x:5,y:6,dir:1,type:"head"});
            snake.push({x:5,y:7,dir:1,type:"tail"});
            break;
        case 3:
            game = levels[4];
            curLevel++;
            snake.push({x:4,y:2,dir:2,type:"head"});
            snake.push({x:3,y:2,dir:2,type:"tail"});
            items.push({x:7,y:5,type:"faze"});
            break;
        case 4:
            game = levels[5];
            curLevel++;
            snake.push({x:5,y:5,dir:2,type:"head"});
            snake.push({x:4,y:5,dir:2,type:"tail"});
            blocks.push({x:4,y:3,dir:1,vel:-1,type:"norm",moved:0});
            break;
        case 5:
            game = levels[6];
            curLevel++;
            snake.push({x:4,y:1,dir:2,type:"head"});
            snake.push({x:3,y:1,dir:2,type:"tail"});
            items.push({x:7,y:2,type:"faze"});
            items.push({x:9,y:3,type:"faze"});
            items.push({x:5,y:4,type:"faze"});
            items.push({x:5,y:8,type:"faze"});
            break;
        case 7:
            game = levels[7];
            curLevel++;
            snake.push({x:5,y:4,dir:2,type:"head"});
            snake.push({x:4,y:4,dir:2,type:"tail"});
            break;
        case 6:
            game = levels[8];
            curLevel++;
            snake.push({x:6,y:1,dir:4,type:"head"});
            snake.push({x:7,y:1,dir:4,type:"tail"});
            items.push({x:2,y:2,type:"faze"});
            blocks.push({x:8,y:3,dir:4,vel:1,type:"norm",moved:0});
            blocks.push({x:9,y:5,dir:4,vel:1,type:"norm",moved:0});
            break;
        case 8: 
            setScale(20);
            game = levels[9];
            curLevel++;
            snake.push({x:4,y:1,dir:2,type:"head"});
            snake.push({x:3,y:1,dir:2,type:"tail"});
            blocks.push({x:8,y:1,dir:1,vel:1,type:"norm",moved:0});
            items.push({x:5,y:3,type:"faze"});
            items.push({x:13,y:7,type:"faze"});
            items.push({x:17,y:9,type:"faze"});
            items.push({x:6,y:8,type:"faze"});
            blocks.push({x:3,y:11,dir:2,vel:1,type:"norm",moved:0});
            blocks.push({x:7,y:14,dir:3,vel:1,type:"norm",moved:0});
            blocks.push({x:5,y:12,dir:4,vel:1,type:"norm",moved:0});
            blocks.push({x:4,y:16,dir:4,vel:1,type:"norm",moved:0});
            blocks.push({x:3,y:11,dir:2,vel:1,type:"norm",moved:0});
            blocks.push({x:4,y:14,dir:2,vel:1,type:"norm",moved:0});
            blocks.push({x:6,y:16,dir:3,vel:1,type:"norm",moved:0});
            blocks.push({x:5,y:18,dir:1,vel:1,type:"norm",moved:0});
            break;
        case 9:
            ctx.scale(1,1);
            win = true;
            break;
    }
    
}

function setAngle(number) {
    return number * Math.PI / 180;
}

function kdown(e) {
    var h=e.keyCode;
    keyPress[h]=keyPress[h]==undefined?1:0;
}
function kup(e) {
    var h=e.keyCode;
    delete keyPress[h];
}
function mdown(e) {
    var h=e.button;
    mousePress[h]=mousePress[h]==undefined?1:0;
}
function mup(e) {
    var h=e.button;
    delete mousePress[h];
}
function mmove(e) {
    mousePos.x=e.offsetX;
    mousePos.y=e.offsetY;    
}

function lolidk() {
    for(var i=0;i<blocks.length;i++) { 
        switch(blocks[i].dir) {
            case 1:
                blocks[i].y += 1 * blocks[i].vel;
                blocks[i].vel *= -1;
                if(testBlocks(i)) {
                    blocks[i].y += 1 * blocks[i].vel;
                    blocks[i].vel *= -1;
                } else {
                    blocks[i].moved = 6;
                }
                break;
            case 2:
                blocks[i].x += 1 * blocks[i].vel;
                blocks[i].vel *= -1;
                if(testBlocks(i)) {
                    blocks[i].x += 1 * blocks[i].vel;
                    blocks[i].vel *= -1;
                } else {
                    blocks[i].moved = 6;
                }
                break;
            case 3:
                blocks[i].y -= 1 * blocks[i].vel;
                blocks[i].vel *= -1;
                if(testBlocks(i)) {
                    blocks[i].y -= 1 * blocks[i].vel;
                    blocks[i].vel *= -1;
                } else {
                    blocks[i].moved = 6;
                }
                break;
            case 4:
                blocks[i].x -= 1 * blocks[i].vel;
                blocks[i].vel *= -1;
                if(testBlocks(i)) {
                    blocks[i].x -= 1 * blocks[i].vel;
                    blocks[i].vel *= -1;
                } else {
                    blocks[i].moved = 6;
                }
                break;
        }
    }
}

function testBlocks(j) {
    for(var i=0;i<snake.length;i++) {
        if(snake[i].x==blocks[j].x&&snake[i].y==blocks[j].y) {
            return true;
        }
    }
}

function resetInput() {
    for(var i=0;i<keyPress.length;i++){if(keyPress[i]){keyPress[i]=0}}
    for(var i=0;i<mousePress.length;i++){if(mousePress[i]){mousePress[i]=0}}
}