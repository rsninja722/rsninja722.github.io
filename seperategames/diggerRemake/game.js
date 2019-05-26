
//Thank you to Javidx9 for affine transformation code (originally written in c++)
//globals
var canvas,
ctx,
screenGrid=[],
screenData,
clearScreenCache,
cw,
ch,
drawingMode="pixelated",
updateSpeed,
camera={x:0,y:0},
gameScale=1,

images=[],
imagePaths=[],
sounds=[],
soundPaths=[],
a = {},
abuffer = [],
s={},
sc=[[256,256,256]],
scLengthCache,
sloaded=0,
ssources=[],
lastColor="filler",
backgroundColor="#ffffff",

keyPress = [],
keyDown = [],
mousePress = [],
mouseDown = [],
taps = [],
touches = [],
touchlist = [],
scroll = 0,
effects=[],
mousePos = {
    x:0,
    y:0
},
tx=0,
ty=0,
preventedEvents = [false,false,false];
const k={a:65,b:66,c:67,d:68,e:69,f:70,g:71,h:72,i:73,j:74,k:75,l:76,m:77,n:78,o:79,p:80,q:81,r:82,s:83,t:84,u:85,v:86,w:87,x:88,y:89,z:90,0:48,1:49,2:50,3:51,4:52,5:53,6:54,7:55,8:56,9:57,BACKTICK:192,MINUS:189,EQUALS:187,OPENSQUARE:219,ENDSQUARE:221,SEMICOLON:186,SINGLEQUOTE:222,BACKSLASH:220,COMMA:188,PERIOD:190,SLASH:191,ENTER:13,BACKSPACE:8,TAB:9,CAPSLOCK:20,SHIFT:16,CONTROL:17,ALT:18,META:91,LEFTBACKSLASH:226,ESCAPE:27,HOME:36,END:35,PAGEUP:33,PAGEDOWN:34,DELETE:46,INSERT:45,PAUSE:19,UP:38,DOWN:40,LEFT:37,RIGHT:39,CONTEXT:93,SPACE:32,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123};
const acceptableChars="qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890_-. ";//for image names

const AudioContext = window.AudioContext||window.webkitAudioContext;
const context = new AudioContext();
//---IO
function addListenersTo(elementToListenTo) {window.addEventListener("keydown",kdown);window.addEventListener("keyup",kup);elementToListenTo.addEventListener("mousedown",mdown);elementToListenTo.addEventListener("mouseup",mup);elementToListenTo.addEventListener("mousemove",mmove);elementToListenTo.addEventListener("contextmenu",cmenu);elementToListenTo.addEventListener("wheel",scrl);elementToListenTo.addEventListener("touchstart",tpress);elementToListenTo.addEventListener("touchmove",tdown);}
function removeListenersFrom(elementToListenTo) {window.removeEventListener("keydown",kdown);window.removeEventListener("keyup",kup);elementToListenTo.removeEventListener("mousedown",mdown);elementToListenTo.removeEventListener("mouseup",mup);elementToListenTo.removeEventListener("mousemove",mmove);elementToListenTo.removeEventListener("contextmenu",cmenu);elementToListenTo.removeEventListener("wheel",scrl);elementToListenTo.removeEventListener("touchstart",tpress);elementToListenTo.removeEventListener("touchmove",tdown);}
function resetInput() {for(var i=0;i<keyPress.length;i++){if(keyPress[i]){keyPress[i]=0;}}for(var i=0;i<mousePress.length;i++){if(mousePress[i]){mousePress[i]=0;}}scroll=0;
    while(taps.length>=1) {
        taps.splice(0,1);
    }
    while(touches.length>=1) {
        touches.splice(0,1);
    }
}
function kdown(e) {var h=e.keyCode;keyPress[h]=keyPress[h]==[][[]]?1:0;keyDown[h]=1;if(preventedEvents[0]) {e.preventDefault();}}
function kup(e) {var h=e.keyCode;delete keyPress[h];delete keyDown[h];}
function mdown(e) {var h=e.button;mousePress[h]=mousePress[h]==[][[]]?1:0;mouseDown[h]=1;if(preventedEvents[1]) {e.preventDefault();}}
function mup(e) {var h=e.button;delete mousePress[h];delete mouseDown[h];}
function mmove(e) {mousePos.x=e.offsetX/gameScale;mousePos.y=e.offsetY/gameScale;}
function cmenu(e) {if(preventedEvents[1]) {e.preventDefault();}}
function scrl(e) {scroll+=-1*(e.deltaY/100);if(preventedEvents[2]) {e.preventDefault();}}
function tpress(e) {
    let rect = e.target.getBoundingClientRect();
    for(let i=0;i<e.touches.length;i++) {
        taps.push({x:e.touches[0].clientX-rect.left,y:e.touches[0].clientY-rect.top});
    }
}
function tdown(e) {
    let rect = e.target.getBoundingClientRect();
    for(let i=0;i<e.touches.length;i++) {
        touches.push({x:e.touches[0].clientX-rect.left,y:e.touches[0].clientY-rect.top});
    }
}
// image loading and canvas setup
function startUpdate(frameRate) {
    canvas=document.getElementById("game");
    ctx=canvas.getContext("2d");
    addListenersTo(canvas);
    screenData=ctx.getImageData(0,0,canvas.width,canvas.height);
    clearScreenCache=ctx.getImageData(0,0,canvas.width,canvas.height);
    let a=[];
    for(let i=0;i<canvas.width;i++){a.push(0);}
    for(let i=0;i<canvas.height;i++){screenGrid.push(a.slice());}
    for(let i=3;i<screenData.data.length;i+=4) {screenData.data[i]=255;}
    for(let i=3;i<clearScreenCache.data.length;i+=4) {clearScreenCache.data[i]=255;}
    cw=canvas.width;
    ch=canvas.height;
    var curpath="";
    deeper(images,"image");
    deeper(sounds,"sound");
    function deeper(curpos,type) {
        let addedPath="";
        for(let j=0;j<curpos.length;j++) {
            if(typeof curpos[j]=="string") {
                if(j==0) {
                    curpath+=curpos[j];
                    addedPath = curpos[j];
                } else {
                    if(type=="image") {
                        let temp = new Image();
                        temp.src = curpath + curpos[j];
                        imagePaths.push(curpath + curpos[j]);
                        ssources.push(temp);
                    } else if(type=="sound") {
                        soundPaths.push(curpath + curpos[j]);
                    }
                }
            }
            if(typeof curpos[j]=="object") {
               deeper(curpos[j],type);
            }
        }
        curpath = curpath.slice(0,curpath.length-addedPath.length);
    }
    for(let i=0;i<soundPaths.length;i++) {
        addSound(soundPaths[i],4);
    }
    updateSpeed=frameRate;
    spriteLoadLoop();
    soundLoad();
}

function soundLoad() {
    
}

function spriteLoadLoop() {
    for(let i=0;i<ssources.length;i++) {
        if(ssources[i].complete) {
            let startpos;
            let endpos = imagePaths[i].lastIndexOf(".");
            for(let j=endpos-1;acceptableChars.includes(imagePaths[i][j]);j--) {startpos=j;}
            spriteName = imagePaths[i].slice(startpos,endpos)
            if(s[spriteName]==undefined) {
                s[spriteName] = getImage(ssources[i],i);
                while(s[spriteName]==undefined) {} //wait for sprite to get got
                sloaded++;
            }
        }
    }
    if(!(sloaded>=ssources.length)){requestAnimationFrame(spriteLoadLoop);}else{
        scLengthCache=sc.length;
        if(updateSpeed=="auto") {
            requestAnimationFrame(gameLoop);
        } else {
            setInterval(gameLoop,1000/updateSpeed);
        }
        try {onImagesReady();}catch{};
    }
}

function gameLoop() {
    while(sc.length>scLengthCache) {
        sc.pop();
    }
    document.getElementById("game").style =`width: ${cw*gameScale}px; height: ${ch*gameScale}px; ${(gameScale==Math.round(gameScale))?"image-rendering: pixelated":""}`;
    clearScreen();
        update();
    resetInput();
    drawScreen();
    if(updateSpeed=="auto") {
        requestAnimationFrame(gameLoop);
    }
}

function getImage(source,position) {
    if(source.width>cw||source.heigh>ch) {
        canvas.width = source.width;
        canvas.height = source.height;
        ctxtext("Loading",25,25,"#1c99ff",20);
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(source,0,0);
    var temp = ctx.getImageData(0,0,source.width,source.height);
    let sprite = [];
    for(let y=0;y<temp.height;y++) {
        sprite.push([]);
        for(let x=0;x<temp.width;x++) {
            sprite[y].push(0);
        }
    }
    let f=0;
    for(let y=0;y<temp.height;y++) {
        for(let x=0;x<temp.width;x++) {
            if(temp.data[f+3]==0) {f+=4;continue;}
            let tempdata = temp.data;
            let isthere = false;
            for(let r=0;r<sc.length;r++) {
                if(sc[r][0]==tempdata[f]&&sc[r][1]==tempdata[f+1]&&sc[r][2]==tempdata[f+2]) {
                    isthere = true;
                }
            }
            if(!isthere) {
                sc.push([tempdata[f],tempdata[f+1],tempdata[f+2]]);
                sprite[y][x]=sc.length-1;
            } else {
                for(let r=0;r<sc.length;r++) {
                    if(sc[r][0]==tempdata[f]&&sc[r][1]==tempdata[f+1]&&sc[r][2]==tempdata[f+2]) {
                        sprite[y][x]=r;
                    }
                }
            }
            f+=4;
        }
    }
    //loading
    ctx.fillStyle="#2d2d2d";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctxtext("Loading",25,25,"#1c99ff",20);

    if(cw!=canvas.width||ch!=canvas.height) {
        canvas.width = cw;
        canvas.height = ch;
        ctxtext("Loading",25,25,"#1c99ff",20);
    }
    return {data:sprite,w:sprite[0].length,h:sprite.length,index:position};
}
function addSound(src,amount) {
    let startpos;
    let endpos = src.lastIndexOf(".");
    for(let j=endpos-1;acceptableChars.includes(src[j]);j--) {startpos=j;}
    soundName = src.slice(startpos,endpos);
    a[soundName] = [1];
    for(let i=0;i<amount;i++) {
        let loadingSound = new Audio();
        loadingSound.src = src;
        a[soundName].push(loadingSound);

        let sound = context.createMediaElementSource(loadingSound);
        sound.connect(context.destination);

        abuffer.push(sound);
    }
}
function play(sound) {
    sound[sound[0]].play();
    sound[0]++;
    if(sound[0]==sound.length-1) {
        sound[0]=1;
    }
}
//drawing
function drawScreen() {
    if(drawingMode=="pixelated") {
        dtaPntr = screenData.data;
        var dindx=0;
        for(var dy=0,lw=screenData.height;dy<lw;dy++) {
            for(var dx=0,lh=screenData.width;dx<lh;dx++) {
                var tmpvl;
                if(screenGrid[dy][dx]!==0) {
                    tmpvl= sc[screenGrid[dy][dx]];
                    dtaPntr[dindx] = tmpvl[0];
                    dtaPntr[dindx+1] = tmpvl[1];
                    dtaPntr[dindx+2] = tmpvl[2];
                }
                dindx+=4;
            }
        }

        // put effects on screen 
        if(effects.length>0) {
            var cwx4 = cw*4;
            var dtaPntr = screenData.data;
            for(let i=0;i<effects.length;i++) {
                var efPointer=effects[i];
                var efarrPointer = efPointer[5];
                var efr = efPointer[4][0];
                var efg = efPointer[4][1];
                var efb = efPointer[4][2];
                for(var y=efPointer[1],iy=0,yl=efPointer[3];y<yl;y++) { // go through each row
                    var tempy = cwx4*y; // store y num so we only have to add the x later on
                    for(var x=efPointer[0],ix=0,xl=efPointer[2];x<xl;x++) { // go through each pixel in row
                        if(efarrPointer[iy][ix]) { // if there is a pixel at this location
                            var sdpos = tempy+(x*4); // get position on screenData
                            dtaPntr[sdpos] += efr;
                            dtaPntr[sdpos+1] += efg;
                            dtaPntr[sdpos+2] += efb;
                        }
                        ix++;
                    }
                    iy++;
                }
            }
        }
        ctx.putImageData(screenData,0,0);
    }
}

function clearScreen() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    cw=canvas.width;
    ch=canvas.height;
    while(effects.length>0) {
        effects.splice(0,1);
    }
    if(drawingMode=="pixelated") {
        for(let egg=0;egg<ch;egg++) {
            for(let egg2=0;egg2<cw;egg2++) {
                screenGrid[egg][egg2]=0;
            }
        }
        var dataPointer = screenData.data;
        var parsedcolor = [parseInt(backgroundColor[1]+backgroundColor[2], 16),parseInt(backgroundColor[3]+backgroundColor[4], 16),parseInt(backgroundColor[5]+backgroundColor[6], 16)];
        for(var dpos=0,l=screenData.data.length;dpos<l;dpos+=4) {
            dataPointer[dpos] = parsedcolor[0];
            dataPointer[dpos+1] = parsedcolor[1];
            dataPointer[dpos+2] = parsedcolor[2];
            dataPointer[dpos+3] = 255;
        }
        lastColor="filler";
    } else {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0,0,cw,ch);
    }
}
function drawSprite(sprite,xpos,ypos) {
    xpos+=camera.x
    ypos+=camera.y
    if(drawingMode=="pixelated") {
        var spriteCache = sprite.data;
        //xpos=xpos-sprite.w/2<0?0:xpos-sprite.w/2;
        //ypos=ypos-sprite.h/2<0?0:ypos-sprite.h/2;
        //xpos=~~xpos;
        //ypos=~~ypos;
        var sx = ~~(xpos - sprite.w/2);
        var sy = ~~(ypos - sprite.h/2);
        var ex = ~~(xpos + sprite.w/2);
        var ey = ~~(ypos + sprite.h/2);
        var xoff = 0;
        var yoff = 0;
        //console.log(ex);
        if(sy<0 ) {if(sprite.h%2){yoff=-sy+1;}else{yoff=-sy;} sy=0; }
        if(sx<0 ) {if(sprite.w%2){xoff=-sx+1;}else{xoff=-sx;} sx=0; }
        if(ex>cw) {ex=cw+xoff;}
        if(ey>ch) {ey=ch;}
        
        if(!(sx>cw||sy>ch||ex<0||ey<0)) {
            for(let gy=sy,y=yoff;gy<ey;gy++,y++) {
                for(let gx=sx,x=xoff;gx<ex;gx++,x++) {
                    var scache = spriteCache[y][x];
                    if(scache!=0) {
                        screenGrid[gy][gx] = scache;
                    }
                }
            }
        }
    } else {
        var spriteCache = ssources[sprite.index];
        ctx.drawImage(spriteCache, xpos-spriteCache.width/2, ypos-spriteCache.height/2);
    }
}

function drawSpriteEffectBasic(sprite,xpos,ypos,effect) {
    xpos+=camera.x
    ypos+=camera.y
    if(drawingMode=="pixelated") {
        var spriteCache = sprite.data;
        var sx = ~~(xpos - sprite.w/2);
        var sy = ~~(ypos - sprite.h/2);
        var ex = ~~(xpos + sprite.w/2);
        var ey = ~~(ypos + sprite.h/2);
        var xoff = 0;
        var yoff = 0;
        if(ex>cw) {ex=cw;}
        if(ey>ch) {ey=ch;}
        if(sy<0 ) {if(sprite.h%2){yoff=-sy+1;}else{yoff=-sy;} sy=0; }
        if(sx<0 ) {if(sprite.w%2){xoff=-sx+1;}else{xoff=-sx;} sx=0; }

        let efPixels=[];
        for(let y=0,yl=ey-sy;y<yl;y++) {
            let a=[];
            for(let x=0,xl=ex-sx;x<xl;x++) {
                a.push(false);
            }
            efPixels.push(a.slice());
        }

        if(!(sx>cw||sy>ch||ex<0||ey<0)) {
            for(let gy=sy,y=yoff;gy<ey;gy++,y++) {
                for(let gx=sx,x=xoff;gx<ex;gx++,x++) {
                    var scache = spriteCache[y][x];
                    if(scache!=0) {
                        screenGrid[gy][gx] = scache;
                        efPixels[gy-sy][gx-sx]=true;
                    }
                }
            }
        }
        
        effects.push([sx,sy,ex,ey,effect.slice(),efPixels.slice()]); // add effect
    } else {
        var spriteCache = ssources[sprite.index];
        ctx.drawImage(spriteCache, xpos-spriteCache.width/2, ypos-spriteCache.height/2);
    }
} 

function drawSpriteScaled(sprite,xpos,ypos,scale=1) {
    xpos+=camera.x
    ypos+=camera.y
    if(drawingMode=="pixelated") {
        var mat = [[1,0,0],[0,1,0],[0,0,1]];
        var mat2 = [[1,0,0],[0,1,0],[0,0,1]];
        translateMat(mat2,-(sprite.w*scale/2),-(sprite.h*scale/2)); // center sprite
        scaleMat(mat,scale,scale); // scale
        matrixMultiply(mat,mat2,mat);
        translateMat(mat2,xpos,ypos); // move to x and y pos
        matrixMultiply(mat,mat2,mat);

        var ex, ey;
        var sx, sy;
        mat=invert(mat);

        sx = ~~(xpos - scale*sprite.w/2);sy = ~~(ypos - scale*sprite.h/2);
        ex = Math.round(xpos + scale*sprite.w/2);ey = Math.round(ypos + scale*sprite.h/2);
        if(ex>cw) {ex=cw;}
        if(ey>ch) {ey=ch;}
        if(sy<0 ) {sy=0; }
        if(sx<0 ) {sx=0; }

        let ghhh = sprite.h;
        let gwww = sprite.w;
        var m00 = mat[0][0], m10 = mat[1][0], m20 = mat[2][0];
        var m01 = mat[0][1], m11 = mat[1][1], m21 = mat[2][1];
        if(scale<1&&scale>0) { //at smaller sclaes we need to make sure the pixels being accesed are existant
            for(let x = sx; x < ex; x++) {
                for(let y = sy; y < ey; y++) {
                    var sdy = ~~(x * m01 + y * m11 + m21);
                    var sdx = ~~(x * m00 + y * m10 + m20);
                    if(sdy<ghhh&&sdx<gwww&&sdx>-1&&sdy>-1) {
                        var scache = sprite.data[sdy][sdx];
                        if(scache!=0) {
                            screenGrid[y][x]=scache;
                        }
                    }
                }
            }
        } else if(scale>0) {
            for(let x = sx; x < ex; x++) {
                for(let y = sy; y < ey; y++) {
                    var sdy = ~~(x * m01 + y * m11 + m21);
                    var sdx = ~~(x * m00 + y * m10 + m20);
                    var scache = sprite.data[sdy][sdx];
                    if(scache!=0) {
                        screenGrid[y][x]=scache;
                    }
                }
            }
        }
    } else {
        var spriteCache = ssources[sprite.index];
        ctx.setTransform(scale, 0, 0, scale, xpos, ypos);
        ctx.drawImage(spriteCache, -spriteCache.width/2, -spriteCache.height/2);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
}
function drawSpriteAdv(sprite,xpos,ypos,rot=0,scale=1,flipped=0) { //don't try to read or under stand, I can't even make sense of it and I just wrote it
    xpos+=camera.x
    ypos+=camera.y
    if(drawingMode=="pixelated") {    
        var mat;
        if(flipped) {
            mat = [[-1,0,0],[0,1,0],[0,0,1]];
        } else {
            mat = [[1,0,0],[0,1,0],[0,0,1]];
        }
        var mat2 = [[1,0,0],[0,1,0],[0,0,1]];
        rotateMat(mat2,rot);
        matrixMultiply(mat,mat,mat2);

        var mat2 = [[1,0,0],[0,1,0],[0,0,1]];
        translateMat(mat2,-sprite.w/2,-sprite.h/2);
        matrixMultiply(mat,mat,mat2);
        var mat2 = [[1,0,0],[0,1,0],[0,0,1]];
        scaleMat(mat2,scale,scale);
        matrixMultiply(mat,mat2,mat);
        var mat2 = [[1,0,0],[0,1,0],[0,0,1]];
        translateMat(mat2,xpos,ypos);
        matrixMultiply(mat,mat2,mat);

        var ex, ey;
        var sx, sy;

        forward(mat, 0, 0);  // find bounding box
        sx = tx; sy = ty;
        ex = tx; ey = ty;

        forward(mat, sprite.w, sprite.h);
        sx = Math.min(sx, tx); sy = Math.min(sy, ty);
        ex = Math.max(ex, tx); ey = Math.max(ey, ty);

        forward(mat, 0, sprite.h);
        sx = Math.min(sx, tx); sy = Math.min(sy, ty);
        ex = Math.max(ex, tx); ey = Math.max(ey, ty);

        forward(mat, sprite.w, 0);
        sx = Math.min(sx, tx); sy = Math.min(sy, ty);
        ex = Math.max(ex, tx); ey = Math.max(ey, ty); // stop finding bounding box
        
        mat=invert(mat); 

        let ghhh = sprite.h;
        let gwww = sprite.w;
        var m00 = mat[0][0], m10 = mat[1][0], m20 = mat[2][0];
        var m01 = mat[0][1], m11 = mat[1][1], m21 = mat[2][1];
        sx=Math.floor(sx);sy=Math.floor(sy);ex=Math.ceil(ex);ey=Math.ceil(ey);
        if(ex>=cw) {ex=cw-1;}
        if(ey>=ch) {ey=ch-1;}
        if(sy<0  ) {sy=0;   }
        if(sx<0  ) {sx=0;   }
        var sdataCache = sprite.data;
        for(let x = sx; x < ex; x++) {
            for(let y = sy; y < ey; y++) {
                var sdy = x * m01 + y * m11 + m21;
                var sdx = x * m00 + y * m10 + m20;
                if(sdy<ghhh&&sdx<gwww&&sdx>=0&&sdy>=0) {
                    var tempS = sdataCache[~~sdy][~~sdx];
                    if(tempS!=0) {
                        screenGrid[y][x]=tempS;
                    }   
                }
            }
        }
    } else {
        var spriteCache = ssources[sprite.index];
        ctx.setTransform(scale, 0, 0, scale, xpos, ypos);
        ctx.rotate(-rot);
        ctx.drawImage(spriteCache, -spriteCache.width/2, -spriteCache.height/2);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
}

function drawSpriteEffect(sprite,xpos,ypos,effect,rot=0,scale=1) { // sprite adv but you can overlay rgb with [r,g,b] in affects
    xpos+=camera.x
    ypos+=camera.y
    if(drawingMode=="pixelated") {    
        var mat = [[1,0,0],[0,1,0],[0,0,1]];
        rotateMat(mat,rot);
        var mat2 = [[1,0,0],[0,1,0],[0,0,1]];
        translateMat(mat2,-sprite.w/2,-sprite.h/2);
        matrixMultiply(mat,mat,mat2);
        var mat2 = [[1,0,0],[0,1,0],[0,0,1]];
        scaleMat(mat2,scale,scale);
        matrixMultiply(mat,mat2,mat);
        var mat2 = [[1,0,0],[0,1,0],[0,0,1]];
        translateMat(mat2,xpos,ypos);
        matrixMultiply(mat,mat2,mat);

        var ex, ey;
        var sx, sy;

        forward(mat, 0, 0);  // find bounding box
        sx = tx; sy = ty;
        ex = tx; ey = ty;

        forward(mat, sprite.w, sprite.h);
        sx = Math.min(sx, tx); sy = Math.min(sy, ty);
        ex = Math.max(ex, tx); ey = Math.max(ey, ty);

        forward(mat, 0, sprite.h);
        sx = Math.min(sx, tx); sy = Math.min(sy, ty);
        ex = Math.max(ex, tx); ey = Math.max(ey, ty);

        forward(mat, sprite.w, 0);
        sx = Math.min(sx, tx); sy = Math.min(sy, ty);
        ex = Math.max(ex, tx); ey = Math.max(ey, ty); // stop finding bounding box
        
        mat=invert(mat); 

        let ghhh = sprite.h;
        let gwww = sprite.w;
        var m00 = mat[0][0], m10 = mat[1][0], m20 = mat[2][0];
        var m01 = mat[0][1], m11 = mat[1][1], m21 = mat[2][1];
        sx=Math.floor(sx);sy=Math.floor(sy);ex=Math.ceil(ex);ey=Math.ceil(ey);
        if(ex>=cw) {ex=cw-1;}
        if(ey>=ch) {ey=ch-1;}
        if(sy<0  ) {sy=0;   }
        if(sx<0  ) {sx=0;   }
        var sdataCache = sprite.data;

        //make 2d array for what pixels should have effects
        let efPixels=[];
        for(let y=0,yl=ey-sy;y<yl;y++) {
            let a=[];
            for(let x=0,xl=ex-sx;x<xl;x++) {
                a.push(false);
            }
            efPixels.push(a.slice());
        }

        for(let x = sx; x < ex; x++) {
            for(let y = sy; y < ey; y++) {
                var sdy = x * m01 + y * m11 + m21;
                var sdx = x * m00 + y * m10 + m20;
                if(sdy<ghhh&&sdx<gwww&&sdx>0&&sdy>0) {
                    var tempS = sdataCache[~~sdy][~~sdx];
                    if(tempS!=0) {
                        screenGrid[y][x]=tempS;
                        efPixels[y-sy][x-sx]=true; // set pixel to have effects
                    }
                }
            }
        }

        effects.push([sx,sy,ex,ey,effect.slice(),efPixels.slice()]); // add effect

    } else {
        var spriteCache = ssources[sprite.index];
        ctx.setTransform(scale, 0, 0, scale, xpos, ypos);
        ctx.rotate(-rot);
        ctx.drawImage(spriteCache, -spriteCache.width/2, -spriteCache.height/2);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
}

function drawSpriteSnapToGrid(sprite,xpos,ypos,rot=0,scale=1) {
    xpos+=camera.x
    ypos+=camera.y
    scale=Math.abs(Math.round(scale));
    xpos=~~xpos;
    ypos=~~ypos;
    var tempGrid = [];
    for(let y = 0; y < sprite.h; y++) {
        let g=[];
        for(let x = 0; x < sprite.w; x++) {
            g.push(0);
        }
        tempGrid.push(g.slice());
    }
    if(rot>3.08||rot<-3.08) { //left
        var sdcache = sprite.data;
        var sdw = sprite.w;
        var sdh = sprite.h;
        for(let y=0,yl=sprite.h;y<yl;y++) {
            for(let x=0,xl=sprite.w;x<xl;x++) {
                tempGrid[y][x] = sdcache[sdw-y-1][sdw-x-1];
            }
        }
    } 
    else if(rot>1.51&&rot<1.63) { //up
        var sdcache = sprite.data;
        var sdh = sprite.h;
        for(let y=0,yl=sprite.h;y<yl;y++) {
            for(let x=0,xl=sprite.w;x<xl;x++) {
                tempGrid[y][x] = sdcache[x][sdh-y-1];
            }
        }
    } 
    else if(rot<-1.51&&rot>-1.63) { //down
        var sdcache = sprite.data;
        var sdw = sprite.w;
        var sdh = sprite.h;
        for(let y=0,yl=sprite.h;y<yl;y++) {
            for(let x=0,xl=sprite.w;x<xl;x++) {
                tempGrid[y][x] = sdcache[sdw-x-1 ][y];
            }
        }
    } 
    else if(rot>-0.06&&rot<0.06) { //right
        var sdcache = sprite.data;
        for(let y=0,yl=sprite.h;y<yl;y++) {
            for(let x=0,xl=sprite.w;x<xl;x++) {
                tempGrid[y][x] = sdcache[y][x];
            }
        }
    } 
    else { //anywhere inbetween
        
        var mat = [[1,0,0],[0,1,0],[0,0,1]];
        rotateMat(mat,rot);
        var mat2 = [[1,0,0],[0,1,0],[0,0,1]];
        translateMat(mat2,-sprite.w/2,-sprite.h/2);
        matrixMultiply(mat,mat,mat2);

        translateMat(mat2,sprite.w,sprite.h);
        matrixMultiply(mat,mat2,mat);

        var ex, ey;
        var sx, sy;

        forward(mat, 0, 0);  // find bounding box
        sx = tx; sy = ty;
        ex = tx; ey = ty;

        forward(mat, sprite.w, sprite.h);
        sx = Math.min(sx, tx); sy = Math.min(sy, ty);
        ex = Math.max(ex, tx); ey = Math.max(ey, ty);

        forward(mat, 0, sprite.h);
        sx = Math.min(sx, tx); sy = Math.min(sy, ty);
        ex = Math.max(ex, tx); ey = Math.max(ey, ty);

        forward(mat, sprite.w, 0);
        sx = Math.min(sx, tx); sy = Math.min(sy, ty);
        ex = Math.max(ex, tx); ey = Math.max(ey, ty); // stop finding bounding box
        
        mat=invert(mat); 

        let ghhh = sprite.h;
        let gwww = sprite.w;
        var m00 = mat[0][0], m10 = mat[1][0], m20 = mat[2][0];
        var m01 = mat[0][1], m11 = mat[1][1], m21 = mat[2][1];
        sx=Math.floor(sx);sy=Math.floor(sy);ex=Math.ceil(ex);ey=Math.ceil(ey);
        if(ex>=cw) {ex=cw-1;}
        if(ey>=ch) {ey=ch-1;}
        if(sy<0  ) {sy=0;   }
        if(sx<0  ) {sx=0;   }
        tempGrid = [];
        for(let y = sy; y < ey; y++) {
            let g=[];
            for(let x = sx; x < ex; x++) {
                g.push(0);
            }
            tempGrid.push(g.slice());
        }
        var sdataCache = sprite.data;
        for(let x = sx; x < ex; x++) {
            for(let y = sy; y < ey; y++) {
                var sdy = x * m01 + y * m11 + m21;
                var sdx = x * m00 + y * m10 + m20; 
                if(sdy<ghhh&&sdx<gwww&&sdx>0&&sdy>0) {
                    //console.log((y-sy) + " " + (x-sx));
                        tempGrid[y-sy][x-sx]=sdataCache[~~sdy][~~sdx];
                        //screenGrid[y][x]=sdataCache[~~sdy][~~sdx];
                }
            }
        }
    }
    
    sx=~~(xpos-((tempGrid[0].length/2)*scale));
    sy=~~(ypos-((tempGrid.length/2)*scale));
    ex=~~(xpos+((tempGrid[0].length/2)*scale));
    ey=~~(ypos+((tempGrid.length/2)*scale));

    ex=ex>cw?cw:ex;
    ey=ey>ch?ch:ey;

    if(!(sx>cw||sy>ch||ex<0||ey<0)) {
        if(drawingMode=="pixelated") {
            for(let y=sy<0?0:sy;y<ey;y++) {
                for(let x=sx<0?0:sx;x<ex;x++) {
                    var tempColorCache = tempGrid[~~((y-sy)/scale)][~~((x-sx)/scale)]; //TODO: fix shears off half of first pixels
                    if(tempColorCache==0) {                                            
                        
                    } else {
                        screenGrid[y][x] = tempColorCache;
                    }
                }
            }
        } else {
            for(let y=sy;y<ey;y+=scale) {
                for(let x=sx;x<ex;x+=scale) {
                    var tempColorCache = tempGrid[~~((y-sy)/scale)][~~((x-sx)/scale)];
                    if(tempColorCache==0) {                                            
                        
                    } else {
                        let tempcolor = sc[tempColorCache];
                        ctx.fillStyle = `rgb(${tempcolor[0]},${tempcolor[1]},${tempcolor[2]})`;
                        ctx.fillRect(x,y,scale,scale);
                    }
                }
            }
        }
    }
}

function rect(x,y,w,h,color) {
    x+=camera.x
    y+=camera.y
    if(drawingMode=="pixelated") {
        var parsedcolor;
        if(color!=lastColor) {
            lastColor = color;
            if(color[0]=="#") {
                parsedcolor = [parseInt(color[1]+color[2], 16),parseInt(color[3]+color[4], 16),parseInt(color[5]+color[6], 16)];
            } else {
                parsedcolor=[0,0,0];
                parsedcolor[0]=parseInt(color.slice(color.indexOf("(")+1,color.indexOf(",")));
                    color = color.slice(color.indexOf(",")+1);
                parsedcolor[1]=parseInt(color.slice(0,color.indexOf(",")));
                    color = color.slice(color.indexOf(",")+1);
                parsedcolor[2]=parseInt(color.slice(0,color.indexOf(")")));
            }
            sc.push(parsedcolor.slice());
        }
        var ci = sc.length-1;

        sx = ~~(x);
        sy = ~~(y);
        ex = ~~(x+w);
        ey = ~~(y+h);

        sx = sx<0?0:sx;
        sy = sy<0?0:sy;
        ex = ex>cw?cw:ex;
        ey = ey>ch?ch:ey;

        for(let y=sy;y<ey;y++) {
            for(let x=sx;x<ex;x++) {
                screenGrid[y][x] = ci;
            }
        }
    } else {
        ctx.fillStyle = color;
        ctx.fillRect(x-w/2,y-h/2,w,h);
    }
}
function translateMat(mat,ox,oy) {mat[2][0] = ox;mat[2][1] = oy;}
function rotateMat(mat,theta) {mat[0][0] = Math.cos(theta);mat[1][0]=Math.sin(theta);mat[0][1]=-Math.sin(theta);mat[1][1]=Math.cos(theta);mat[2][2]=1.0;}
function scaleMat(mat,sx,sy) {mat[0][0] = sx;mat[1][1] = sy;}
function matrixMultiply(matResult,matA,matB) {for (let c=0;c<3;c++){for (let r=0;r<3;r++){matResult[c][r]=matA[0][r]*matB[c][0]+matA[1][r]*matB[c][1]+matA[2][r]*matB[c][2];}}}
function forward(mat,in_x,in_y) {tx=in_x*mat[0][0]+in_y*mat[1][0]+mat[2][0];ty=in_x*mat[0][1]+in_y*mat[1][1]+mat[2][1];}
function invert(matIn) {   
    tempMat=[[0,0,0],[0,0,0],[0,0,0]];
    var det=matIn[0][0]*(matIn[1][1]*matIn[2][2]-matIn[1][2]*matIn[2][1])-matIn[1][0]*(matIn[0][1]*matIn[2][2]-matIn[2][1]*matIn[0][2])+matIn[2][0]*(matIn[0][1]*matIn[1][2]-matIn[1][1]*matIn[0][2]);
    var idet = 1 / det;
    tempMat[0][0]=(matIn[1][1]*matIn[2][2]-matIn[1][2]*matIn[2][1])*idet;
    tempMat[1][0]=(matIn[2][0]*matIn[1][2]-matIn[1][0]*matIn[2][2])*idet;
    tempMat[2][0]=(matIn[1][0]*matIn[2][1]-matIn[2][0]*matIn[1][1])*idet;
    tempMat[0][1]=(matIn[2][1]*matIn[0][2]-matIn[0][1]*matIn[2][2])*idet;
    tempMat[1][1]=(matIn[0][0]*matIn[2][2]-matIn[2][0]*matIn[0][2])*idet;
    tempMat[2][1]=(matIn[0][1]*matIn[2][0]-matIn[0][0]*matIn[2][1])*idet;
    tempMat[0][2]=(matIn[0][1]*matIn[1][2]-matIn[0][2]*matIn[1][1])*idet;
    tempMat[1][2]=(matIn[0][2]*matIn[1][0]-matIn[0][0]*matIn[1][2])*idet;
    tempMat[2][2]=(matIn[0][0]*matIn[1][1]-matIn[0][1]*matIn[1][0])*idet;
    return tempMat;
}

//utility
function log(what) {
    console.log(what);
}

function rand(min,max) {return Math.floor(Math.random() * (max - min + 1)) + min;}

function radToDeg(rad) {return rad / Math.PI * 180;}
function degToRad(deg) {return deg * Math.PI / 180;}

function pointTo(x1,y1,x2,y2) {var adjacent=(x1-x2);var opposite=(y1-y2);var h=Math.atan2(opposite,adjacent);return -h;}

function pointTo(obj1,obj2) {
    var adjacent = (obj1.x - obj2.x);
    var opposite = (obj1.y - obj2.y);
    var h = Math.atan2(opposite, adjacent);
    return -h;
}

function dist(obj1,obj2) {
    var one = (obj2.x - obj1.x);
    var two = (obj2.y - obj1.y);
    return Math.sqrt((one*one)+(two*two));
}
function rectRect(obj1, obj2) {
    if (obj1.x + obj1.w / 2 >= obj2.x - obj2.w / 2 && 
        obj1.x - obj1.w / 2 <= obj2.x + obj2.w / 2 && 
        obj1.y + obj1.h / 2 >= obj2.y - obj2.h / 2 && 
        obj1.y - obj1.h / 2 <= obj2.y + obj2.h / 2) 
    {
        return true;
    } else {
        return false;
    }
}

function ctxtext(string,x,y,color,size) {
    ctx.font = `${size}px verdana`;
    ctx.fillStyle = color
    ctx.fillText(string.toString(),x+camera.x,y+camera.y);
}

String.prototype.allIndexesOf = function (char) {
    var indexes = [];
    for(let i=0;i<this.length;i++) {
        if(this[i]==char) {indexes.push(i);}
    }
    return indexes;
}