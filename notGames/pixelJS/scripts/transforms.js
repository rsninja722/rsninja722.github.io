var screenGrid=[],
screenData,
clearScreenCache,
drawingMode="pixelated",
s={},
sc=[[256,256,256]],
scLengthCache,
tx=0,
ty=0,
screenW=0,
screenH=0;

function handleSelectingStart() {
    var m = getMouse();
    if(toolData.selection.mode === "selecting") {
        if(mouseDown[1]) {
            var endXY = {x:m.x,y:m.y};
            endXY.x = endXY.x < 0 ? 0 : (endXY.x > projectInfo.w ? projectInfo.w : endXY.x);
            endXY.y = endXY.y < 0 ? 0 : (endXY.y > projectInfo.h ? projectInfo.h : endXY.y);
            toolData.selection.endPos = endXY;
        } else {
            var t = toolData.selection;
                var ep = t.endPos;
            var sp = t.startPos;
            var startP = {x:t.startPos.x,y:t.startPos.y};
            startP.x += sp.x > ep.x ? 1 : 0;
            startP.y += sp.y > ep.y ? 1 : 0;

            var x = Math.min(startP.x,t.endPos.x);
            var y = Math.min(startP.y,t.endPos.y);
            var w = Math.abs(startP.x-t.endPos.x);
            var h = Math.abs(startP.y-t.endPos.y);
            if(w>1 && h>1) {
                trackUndo(curLayer);
                selectionData = layers[curLayer].ctx.getImageData(x,y,w,h);
                layers[curLayer].ctx.clearRect(x,y,w,h);
                var trans = t.transforms;
                trans.x = x;
                trans.y = y;
                trans.w = w;
                trans.h = h;
                trans.angle = 0;
                trans.scaleX = 1;
                trans.scaleY = 1;
                t.layer = curLayer;
                toolData.selection.mode = "selected";
                toolCache = tool;
                switchTool("selection");
                t = toolData.selection.transforms;
                numbers.transformX.value = t.x;
                numbers.transformY.value = t.y;
                numbers.transformAngle.value = radToDeg(t.angle);
                numbers.transformSX.value = t.scaleX;
                numbers.transformSY.value = t.scaleY;
            } else {
                toolData.selection.mode = "off";
            }
        }
    }
}

function copySelection(shouldDelete) {
    var t = toolData.selection;
    if(t.mode === "selected") {
        copyData = selectionData;
        t = t.transforms;
        copyTransform.x = t.x;
        copyTransform.y = t.y;
        copyTransform.angle = t.angle;
        copyTransform.scaleX = t.scaleX;
        copyTransform.scaleY = t.scaleY;
        if(shouldDelete) {
            t.scaleX=0;
            t.scaleY=0;
            switchTool("pen");
        }
        clickSound.play();
    } else {
        copyData = layers[curLayer].ctx.getImageData(0,0,projectInfo.w,projectInfo.h);
        copyTransform.x = 0;
        copyTransform.y = 0;
        copyTransform.angle = 0;
        copyTransform.scaleX = 1;
        copyTransform.scaleY = 1;
        if(shouldDelete) {
            layers[curLayer].ctx.clearRect(0,0,projectInfo.w,projectInfo.h);
        }
        clickSound.play();
    }
}

function pasteSelection() {
    switchTool("selection");
    toolData.selection.layer = curLayer;
    toolData.selection.mode = "selected";
    var t = toolData.selection.transforms;
    t.x = copyTransform.x;
    t.y = copyTransform.y;
    t.angle = copyTransform.angle;
    t.scaleX = copyTransform.scaleX;
    t.scaleY = copyTransform.scaleY;

    numbers.transformX.value = t.x;
    numbers.transformY.value = t.y;
    numbers.transformAngle.value = radToDeg(t.angle);
    numbers.transformSX.value = t.scaleX;
    numbers.transformSY.value = t.scaleY;

    selectionData = copyData;
}

function handleSelectingMovement() {
    var t = toolData.selection.transforms;
    
    t.x = numbers.transformX.value;
    t.y = numbers.transformY.value;
    t.angle = degToRad(numbers.transformAngle.value);
    t.scaleX = numbers.transformSX.value;
    t.scaleY = numbers.transformSY.value;

    if(keyPress[k.ENTER] || keyPress[k.ESCAPE]) {switchTool("pen");} // confirm select

    mouseCords = getMouse();
    var inDraw = mousePos.x > 250 && mousePos.y > 30;

    
    if(keyPress[k.LEFT]) {t.x--;}
    if(keyPress[k.RIGHT]) {t.x++;}
    if(keyPress[k.UP]) {t.y--;}
    if(keyPress[k.DOWN]) {t.y++;}
copySelection
    if(inDraw) {
        var b = toolData.selection.boundingBox;
        var p = reverseMousePos({x:b.x,y:b.y});
        if(rectpoint2({x:p.x,y:p.y,w:b.w*camera.zoom,h:b.h*camera.zoom},mousePos)) {
            cursor = "move";
            if(mousePress[0]) {
                toolData.selection.startPos=mouseCords;
                toolData.selection.target = "move";
            }
        } else {
            cursor = "none";
            if(mousePress[0]) {
                toolData.selection.target = "rotate";
            }
        }

    }

    if(mouseDown[0]) {
        if(toolData.selection.target === "move") {
            t.x -= toolData.selection.startPos.x - mouseCords.x;
            t.y -= toolData.selection.startPos.y - mouseCords.y;
            toolData.selection.startPos=mouseCords;
        }
        if(toolData.selection.target === "rotate") {
            toolData.selection.transforms.angle  = -pointTo({x:t.x+t.w/2,y:t.y+t.h/2},getMouse());
        }
    } else {
        toolData.selection.target = "none";
    }

    numbers.transformX.value = t.x;
    numbers.transformY.value = t.y;
    numbers.transformAngle.value = radToDeg(t.angle);
    numbers.transformSX.value = t.scaleX;
    numbers.transformSY.value = t.scaleY;
}

function drawSelection() {
    var t = toolData.selection.transforms;
    if(toolData.selection.mode==="selecting") {
        
        var ep = toolData.selection.endPos;
        var sp = toolData.selection.startPos;
        var startP = {x:toolData.selection.startPos.x,y:toolData.selection.startPos.y};
        startP.x += sp.x > ep.x ? 1 : 0;
        startP.y += sp.y > ep.y ? 1 : 0;

        var p1 = toolData.selection.mode === "selected" ? reverseMousePos({x:t.x,y:t.y}) : reverseMousePos(startP);
        var x1 = p1.x;
        var y1 = p1.y;
        x1 = x1 < 251 ? 251 : x1;
        y1 = y1 < 31 ? 31 : y1;
        var p2 = toolData.selection.mode === "selected" ? reverseMousePos({x:t.x+t.w,y:t.y+t.h}) : reverseMousePos(toolData.selection.endPos);
        var x2 = p2.x;
        var y2 = p2.y;
        x2 = x2 < 251 ? 251 : x2;
        y2 = y2 < 31 ? 31 : y2;

        rect2(x1,y1,2,y2-y1,"#252525");
        rect2(x1,y1,x2-x1,2,"#252525");
        rect2(x2,y1,2,y2-y1,"#555555");
        rect2(x1,y2,x2-x1,2,"#555555");
    }
}

function drawSelectContent(xoff,yoff,target="show") {
    var tempCanv = document.createElement("canvas");
    tempCanv.width = screenW = projectInfo.w;//toolData.selection.transforms.w;
    tempCanv.height = screenH =  projectInfo.h;//toolData.selection.transforms.h;
    var tempCtx = tempCanv.getContext("2d");

    screenData = tempCtx.getImageData(0,0,tempCanv.width,tempCanv.height);
    screenGrid = [];
    var a=[];
    for(var i=0;i<tempCanv.width;i++){a.push(-1);}
    for(var i=0;i<tempCanv.height;i++){screenGrid.push(a.slice());}

    var t = toolData.selection.transforms;
    
    if(target === "show") {
        drawSpriteAdv(tempCtx,selectionData,t.x,t.y,t.angle,t.scaleX,t.scaleY,true);

        imgIgnoreCutoff({spr:tempCanv,drawLimitSize:0},xoff,yoff);
    } else if(target === "confirm") {
        drawSpriteAdv(tempCtx,selectionData,t.x,t.y,t.angle,t.scaleX,t.scaleY,false);

        layers[toolData.selection.layer].ctx.drawImage(tempCanv,0,0);
    }
}

function drawSpriteAdv(targetCtx,sprite,xpos,ypos,rot=0,scaleX=1,scaleY=1,showBounds=false) {
    xpos+=sprite.width/2;
    ypos+=sprite.height/2;

    // scaleX=Math.abs(Math.round(scaleX));
    // scaleY=Math.abs(Math.round(scaleY));
    
    var sdw = sprite.width;
    var sdh = sprite.height;

    var inGrid = [];
    for(let y = 0; y < sdh; y++) {
        let g=[];
        for(let x = 0; x < sdw; x++) {
            g.push((y*sdw)+x);
        }
        inGrid.push(g.slice());
    }

    if(rot>-0.09&&rot<0.09) { //right
        for(let y=0,yl=sdh;y<yl;y++) {
            for(let x=0,xl=sdw;x<xl;x++) {
                inGrid[y][x] = (y*sdw)+x;
            }
        }
        rot = 0;
    } else if(rot>3.05||rot<-3.05) { //left
        for(let y=0,yl=sdh;y<yl;y++) {
            for(let x=0,xl=sdw;x<xl;x++) {
                inGrid[y][x] = (sdh-y-1)*sdw + (sdw-x-1);
            }
        }
        rot = 0;
    }
    else if(rot>1.48&&rot<1.66) { //up
        // var sdcache = sprite.data;
        // for(let y=0,yl=sdh;y<yl;y++) {
        //     for(let x=0,xl=sdw;x<xl;x++) {
        //         inGrid[y][x] = x*sdw + sdh-y-1;
        //     }
        // }
        rot = Math.PI/2;
    }
    else if(rot<-1.48&&rot>-1.66) { //down
        // var sdcache = sprite.data;
        // for(let y=0,yl=sdh;y<yl;y++) {
        //     for(let x=0,xl=sdw;x<xl;x++) {
        //         inGrid[y][x] = (sdw-x-1)*sdw + y;
        //     }
        // }
        rot = -Math.PI/2;
    }

    var mat = [[1,0,0],[0,1,0],[0,0,1]];
    rotateMat(mat,rot);
    var mat2 = [[1,0,0],[0,1,0],[0,0,1]];
    translateMat(mat2,-sdw/2,-sdh/2);
    matrixMultiply(mat,mat,mat2);
    var mat2 = [[1,0,0],[0,1,0],[0,0,1]];
    scaleMat(mat2,scaleX,scaleY);
    matrixMultiply(mat,mat2,mat);
    var mat2 = [[1,0,0],[0,1,0],[0,0,1]];
    translateMat(mat2,xpos,ypos);
    matrixMultiply(mat,mat2,mat);

    var ex, ey;
    var sx, sy;

    forward(mat, 0, 0);  // find bounding box
    sx = tx; sy = ty;
    ex = tx; ey = ty;

    forward(mat, sdw, sdh);
    sx = Math.min(sx, tx); sy = Math.min(sy, ty);
    ex = Math.max(ex, tx); ey = Math.max(ey, ty);

    forward(mat, 0, sdh);
    sx = Math.min(sx, tx); sy = Math.min(sy, ty);
    ex = Math.max(ex, tx); ey = Math.max(ey, ty);

    forward(mat, sdw, 0);
    sx = Math.min(sx, tx); sy = Math.min(sy, ty);
    ex = Math.max(ex, tx); ey = Math.max(ey, ty); // stop finding bounding box
    
    mat=invert(mat);

    let ghhh = sdh;
    let gwww = sdw;
    var m00 = mat[0][0], m10 = mat[1][0], m20 = mat[2][0];
    var m01 = mat[0][1], m11 = mat[1][1], m21 = mat[2][1];
    sx=Math.floor(sx);sy=Math.floor(sy);ex=Math.ceil(ex);ey=Math.ceil(ey);
    if(ex>=screenW) {ex=screenW;}
    if(ey>=screenH) {ey=screenH;}
    if(sy<0) {sy=0;}
    if(sx<0) {sx=0;}
    var b = toolData.selection.boundingBox;
    b.x = sx;
    b.y = sy;
    b.w = ex-sx;
    b.h = ey-sy;
    for(let x = sx; x < ex; x++) {
        for(let y = sy; y < ey; y++) {
            screenGrid[y][x] = -2;
            var sdy = x * m01 + y * m11 + m21;
            var sdx = x * m00 + y * m10 + m20;
            if(sdy<ghhh&&sdx<gwww&&sdx>-1&&sdy>-1) {
                screenGrid[y][x]=inGrid[~~sdy][~~sdx];
            }
        }
    }
    var dtaPntr = screenData.data;
    var slcd = selectionData.data;
    var dindx=0;
    if(showBounds===true) {
        for(var dy=0,lw=screenData.height;dy<lw;dy++) {
            for(var dx=0,lh=screenData.width;dx<lh;dx++) {
                var tmpvl= screenGrid[dy][dx];
                if(tmpvl!==-1) {
                    if(tmpvl===-2 || slcd[(tmpvl*4)+3] === 0) { // background
                        dtaPntr[dindx] = 33;
                        dtaPntr[dindx+1] = 33;
                        dtaPntr[dindx+2] = 33;
                        dtaPntr[dindx+3] = 100;
                    } else {
                        tmpvl*=4;
                        dtaPntr[dindx] = slcd[tmpvl];
                        dtaPntr[dindx+1] = slcd[tmpvl+1];
                        dtaPntr[dindx+2] = slcd[tmpvl+2];
                        dtaPntr[dindx+3] = slcd[tmpvl+3];
                    }
                }
                dindx+=4;
            }
        }
    } else {
        for(var dy=0,lw=screenData.height;dy<lw;dy++) {
            for(var dx=0,lh=screenData.width;dx<lh;dx++) {
                var tmpvl= screenGrid[dy][dx];
                if(tmpvl!==-1) {
                    tmpvl*=4;
                    dtaPntr[dindx] = slcd[tmpvl];
                    dtaPntr[dindx+1] = slcd[tmpvl+1];
                    dtaPntr[dindx+2] = slcd[tmpvl+2];
                    dtaPntr[dindx+3] = slcd[tmpvl+3];
                }
                dindx+=4;
            }
        }
    }
    targetCtx.putImageData(screenData,0,0);
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