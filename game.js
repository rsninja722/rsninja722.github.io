//globals


/*
    TODO
        !-fix bounding box being rarted
        !-fix forward function to not return partial numbers 
        -turn normal arrays into uints
        -optimization
        -mode (data/norm)
        -putimage basic mode ✓
        -draweverything
        -key codes with names not numbers
        -physics
        -basic objects
        -utils(rand,etc.)
        -text
        -documentation
*/
//Thank you to Javidx9 for affine transformation code
var counter=0.1;
setInterval(lok,3);
function lok() {counter+=0.06;}
var canvas,
ctx,
screenGrid=[],
screenData,
clearScreenCache,
cw,
ch,

images,
s={},
sc=[[256,256,256]],
sloaded=0,
ssources=[],

keyPress = [],
keyDown = [],
mousePress = [],
mouseDown = [],
scroll = 0,
mousePos = {
    x:0,
    y:0
},
tx=0,
ty=0,
preventedEvents = [false,false,false],
k={a:65,b:66,c:67,d:68,e:69,f:70,g:71,h:72,i:73,j:74,k:75,l:76,m:77,n:78,o:79,p:80,q:81,r:82,s:83,t:84,u:85,v:86,w:87,x:88,y:89,z:90,0:48,1:49,2:50,3:51,4:52,5:53,6:54,7:55,8:56,9:57,BACKTICK:192,MINUS:189,EQUALS:187,OPENSQUARE:219,ENDSQUARE:221,SEMICOLON:186,SINGLEQUOTE:222,BACKSLASH:220,COMMA:188,PERIOD:190,SLASH:191,ENTER:13,BACKSPACE:8,TAB:9,CAPSLOCK:20,SHIFT:16,CONTROL:17,ALT:18,META:91,LEFTBACKSLASH:226,ESCAPE:27,HOME:36,END:35,PAGEUP:33,PAGEDOWN:34,DELETE:46,INSERT:45,PAUSE:19,UP:38,DOWN:40,LEFT:37,RIGHT:39,CONTEXT:93,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123};
acceptableChars="qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890_-. ";//for image names
//---IO
function addListenersTo(elementToListenTo) {window.addEventListener("keydown",kdown);window.addEventListener("keyup",kup);elementToListenTo.addEventListener("mousedown",mdown);elementToListenTo.addEventListener("mouseup",mup);elementToListenTo.addEventListener("mousemove",mmove);elementToListenTo.addEventListener("contextmenu",cmenu);elementToListenTo.addEventListener("wheel",scrl);}
function removeListenersFrom(elementToListenTo) {window.removeEventListener("keydown",kdown);window.removeEventListener("keyup",kup);elementToListenTo.removeEventListener("mousedown",mdown);elementToListenTo.removeEventListener("mouseup",mup);elementToListenTo.removeEventListener("mousemove",mmove);elementToListenTo.removeEventListener("contextmenu",cmenu);elementToListenTo.removeEventListener("wheel",scrl);}
function resetInput() {for(var i=0;i<keyPress.length;i++){if(keyPress[i]){keyPress[i]=0;}}for(var i=0;i<mousePress.length;i++){if(mousePress[i]){mousePress[i]=0;}}scroll=0;}
function kdown(e) {var h=e.keyCode;keyPress[h]=keyPress[h]==[][[]]?1:0;keyDown[h]=1;if(preventedEvents[0]) {e.preventDefault();}}
function kup(e) {var h=e.keyCode;delete keyPress[h];delete keyDown[h];}
function mdown(e) {var h=e.button;mousePress[h]=mousePress[h]==[][[]]?1:0;mouseDown[h]=1;if(preventedEvents[1]) {e.preventDefault();}}
function mup(e) {var h=e.button;delete mousePress[h];delete mouseDown[h];}
function mmove(e) {mousePos.x=e.offsetX;mousePos.y=e.offsetY;}
function cmenu(e) {if(preventedEvents[1]) {e.preventDefault();}}
function scrl(e) {scroll+=-1*(e.deltaY/100);if(preventedEvents[2]) {e.preventDefault();}}
function endOfLoop() {
    resetInput();
    drawScreen();
}
function startOfLoop() {
    clearScreen();
}
//---canvas creation
/*function createCanvas(width,height) {
    let tempCanvas=document.createElement("canvas");
    tempCanvas.id="cvs";
    tempCanvas.width=`${width}`;
    tempCanvas.height=`${height}`;
    document.body.appendChild(tempCanvas);
    canvas=document.getElementById("cvs");
    ctx=canvas.getContext("2d");
    addListenersTo(canvas);
    screenData=ctx.getImageData(0,0,width,height);
    clearScreenCache=ctx.getImageData(0,0,width,height);
    let a=[];
    for(let i=0;i<width;i++){a.push(0);}
    for(let i=0;i<height;i++){screenGrid.push(a.slice());}
    for(let i=3;i<screenData.data.length;i+=4) {screenData.data[i]=255;}
    for(let i=3;i<clearScreenCache.data.length;i+=4) {clearScreenCache.data[i]=255;}
    cw=canvas.width;
    ch=canvas.height;
}*/
// image loading

function loadImages() {
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
    for(var i=0;i<images.length;i++) {
        let temp = new Image();
        temp.src = images[i];
        ssources.push(temp);
    }
    spriteLoadLoop();
}

function spriteLoadLoop() {
    for(var i=0;i<ssources.length;i++) {
        if(ssources[i].complete) {
            let startpos;
            let endpos = images[i].lastIndexOf(".");
            for(let j=endpos-1;acceptableChars.includes(images[i][j]);j--) {startpos=j;}
            s[images[i].slice(startpos,endpos)] = getImage(ssources[i]);
            sloaded++;
        }
    }
    if(!(sloaded>=ssources.length)){requestAnimationFrame(spriteLoadLoop);}else{start();}
}

function getImage(source) {
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
    return {data:sprite,w:sprite[0].length,h:sprite.length};
}
//drawing
function drawScreen() {
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
    ctx.putImageData(screenData,0,0);
}

function clearScreen() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(var egg=0;egg<600;egg++) {
        for(var egg2=0;egg2<800;egg2++) {
            screenGrid[egg][egg2]=0;
        }
    }
    for(var dpos=0,l=screenData.data.length;dpos<l;dpos++) {
        screenData.data[dpos]=dpos%4==3?255:0;
    }
}

function drawSprite(sprite,xpos,ypos) {
    var spriteCache = sprite.data;
    xpos=xpos<0?0:xpos;
    ypos=ypos<0?0:ypos;
    xposChache=xpos;
    for(let y=0;y<sprite.h&&ypos<600;y++) {
        xpos=xposChache;
        for(let x=0;x<sprite.w&&xpos<800;x++) {
            screenGrid[ypos][xpos]=spriteCache[y][x];
            xpos++;
        }
        ypos++;
    }
}

function drawSpriteScaled(sprite,xpos,ypos,scale=1) {
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
                if(sdy<ghhh&&sdx<gwww&&sdx>0&&sdy>0) {
                    screenGrid[y][x]=sprite.data[sdy][sdx];
                }
            }
        }
    } else if(scale>0) {
        for(let x = sx; x < ex; x++) {
            for(let y = sy; y < ey; y++) {
                var sdy = ~~(x * m01 + y * m11 + m21);
                var sdx = ~~(x * m00 + y * m10 + m20);
                    screenGrid[y][x]=sprite.data[sdy][sdx];
            }
        }
    }
}
function drawSpriteAdv(sprite,xpos,ypos,rot=0,scale=1) {
    var mat = [[1,0,0],[0,1,0],[0,0,1]];
    scaleMat(mat,scale,scale); //scale spritee
    var mat2 = [[1,0,0],[0,1,0],[0,0,1]];
    translateMat(mat2,-(sprite.w*scale/2),-(sprite.h*scale/2)); // center sprite
    matrixMultiply(mat,mat,mat2);

    rotateMat(mat2,rot); // rotate sprit
    matrixMultiply(mat,mat2,mat);
    
    translateMat(mat2,xpos,ypos); // move to x and y positions
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
    sx=~~sx;sy=~~sy;ex=Math.round(ex);ey=Math.round(ey);
    if(ex>cw) {ex=cw;}
    if(ey>ch) {ey=ch;}
    if(sy<0 ) {sy=0; }
    if(sx<0 ) {sx=0; }
    for(let x = sx; x < ex; x++) {
        for(let y = sy; y < ey; y++) {
            var sdy = ~~(x * m01 + y * m11 + m21);
            var sdx = ~~(x * m00 + y * m10 + m20);
            if(sdy<ghhh&&sdx<gwww&&sdx>0&&sdy>0) {
                screenGrid[y][x]=sprite.data[sdy][sdx];
            }
        }
    }
}

function translateMat(mat,ox,oy) {
    mat[2][0] = ox;
    mat[2][1] = oy;
}

function rotateMat(mat,theta) {
    mat[0][0] = Math.cos(theta);  mat[1][0] = Math.sin(theta);
    mat[0][1] = -Math.sin(theta); mat[1][1] = Math.cos(theta);
}

function scaleMat(mat,sx,sy) {
    mat[0][0] = sx;
    mat[1][1] = sy;
}
function matrixMultiply(matResult,matA,matB) {
    for (let c=0;c<3;c++){
        for (let r=0;r<3;r++){
            matResult[c][r] = matA[0][r] * matB[c][0] + matA[1][r] * matB[c][1] + matA[2][r] * matB[c][2];
        }
    }
}
function forward(mat,in_x,in_y) {
    tx = in_x * mat[0][0] + in_y * mat[1][0] + mat[2][0];
    ty = in_x * mat[0][1] + in_y * mat[1][1] + mat[2][1];
}
function invert(matIn) {   
    tempMat=[[0,0,0],[0,0,0],[0,0,0]];
    var det = matIn[0][0] * (matIn[1][1] * matIn[2][2] - matIn[1][2] * matIn[2][1]) -
        matIn[1][0] * (matIn[0][1] * matIn[2][2] - matIn[2][1] * matIn[0][2]) +
        matIn[2][0] * (matIn[0][1] * matIn[1][2] - matIn[1][1] * matIn[0][2]);

    var idet = 1 / det;
    tempMat[0][0] = (matIn[1][1] * matIn[2][2] - matIn[1][2] * matIn[2][1]) * idet;
    tempMat[1][0] = (matIn[2][0] * matIn[1][2] - matIn[1][0] * matIn[2][2]) * idet;
    tempMat[2][0] = (matIn[1][0] * matIn[2][1] - matIn[2][0] * matIn[1][1]) * idet;
    tempMat[0][1] = (matIn[2][1] * matIn[0][2] - matIn[0][1] * matIn[2][2]) * idet;
    tempMat[1][1] = (matIn[0][0] * matIn[2][2] - matIn[2][0] * matIn[0][2]) * idet;
    tempMat[2][1] = (matIn[0][1] * matIn[2][0] - matIn[0][0] * matIn[2][1]) * idet;
    tempMat[0][2] = (matIn[0][1] * matIn[1][2] - matIn[0][2] * matIn[1][1]) * idet;
    tempMat[1][2] = (matIn[0][2] * matIn[1][0] - matIn[0][0] * matIn[1][2]) * idet;
    tempMat[2][2] = (matIn[0][0] * matIn[1][1] - matIn[0][1] * matIn[1][0]) * idet;
    return tempMat;
}



function drawSpriterotated(sprite,xpos,ypos,rot) {

}

//utility
function rand(min,max) {return Math.floor(Math.random() * (max - min + 1)) + min;}
function randZeroTo(max) {return Math.floor(Math.random() * (max  + 1));}

function radToDeg(rad) {return rad / Math.PI * 180;}
function degToRad(deg) {return deg * Math.PI / 180;}