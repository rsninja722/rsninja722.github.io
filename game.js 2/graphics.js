function img(img,x,y) {
    curCtx.drawImage(img,Math.round(x+camera.x+difx+(img.width/2)),Math.round(y+camera.y+dify+(img.height/2)));
}

function imgRot(img,x,y,angle) {
    curCtx.setTransform(1, 0, 0, 1, Math.round(x+camera.x+difx+(img.width)), Math.round(y+camera.y+dify+(img.height)));
    curCtx.rotate(angle);
    curCtx.drawImage(img,Math.round(-img.width/2),Math.round(-img.height/2));
    curCtx.setTransform(1, 0, 0, 1, 0, 0);
}

function centerCameraOn(x,y) {
    camera.x = -x+canvases.cvs.width/2;
    camera.y = -y+canvases.cvs.height/2;
}

function moveCamera(x,y) {
    camera.x -= y * Math.sin(camera.angle);
    camera.y -= y * Math.cos(camera.angle);
    camera.x -= x * Math.sin(camera.angle + 1.57079632);
    camera.y -= x * Math.cos(camera.angle + 1.57079632);
}

function imgRotScale(x,y,angle,scale,pic,ctx) {
    ctx.setTransform(scale, 0, 0, scale, x, y);
    ctx.rotate(angle);
    ctx.drawImage(pic,-pic.width/2,-pic.height/2);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function render() {
    if(drawMode==1) {
        imgRotScale(canvases.cvs.width/2,canvases.cvs.height/2,0,camera.zoom,canvases.buffer1cvs,canvases.ctx);
    }
    if(drawMode==2) {
        imgRotScale(canvases.cvs.width/2,canvases.cvs.height/2,camera.angle,1,canvases.buffer2cvs,canvases.buffer1ctx);
        imgRotScale(canvases.cvs.width/2,canvases.cvs.height/2,0,camera.zoom,canvases.buffer1cvs,canvases.ctx);
    }
}

function clearCanvases() {
    canvases.ctx.clearRect(0,0,canvases.cvs.width,canvases.cvs.height);
    canvases.buffer1ctx.clearRect(0,0,canvases.buffer1cvs.width,canvases.buffer1cvs.height);
    canvases.buffer2ctx.clearRect(0,0,canvases.buffer2cvs.width,canvases.buffer2cvs.height);
}

function switchDrawMode() {
    if(camera.zoom<1) {camera.zoom=1;}
    if(camera.angle!=0) {
        drawMode=2;
    } else if(camera.zoom!=1) {
        drawMode=1;
    } else {
        drawMode=0;
    }
    switch (drawMode) {
        case 0: curCtx = canvases.ctx; break;
        case 1: curCtx = canvases.buffer1ctx; break;
        case 2: curCtx = canvases.buffer2ctx; break;
    }
}

function resizeBuffers() {
    var tempSize = maxCvsSize/camera.zoom;
    var tempSizeAndPadding = tempSize + (tempSize/4)

    canvases.buffer2cvs.width = tempSizeAndPadding;
    canvases.buffer2cvs.height = tempSizeAndPadding;
    
    if(drawMode==2) {
        difx = (canvases.buffer2cvs.width - canvases.cvs.width)/2;
        dify = (canvases.buffer2cvs.height - canvases.cvs.height)/2;
    } else {
        difx=0;
        dify=0;
    }
    canvases.buffer2ctx.imageSmoothingEnabled = false;
}