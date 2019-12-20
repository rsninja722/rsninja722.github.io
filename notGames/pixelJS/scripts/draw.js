function drawUIBottom() {
    // top bar
    rect2(0,0,baseCvs.width,30,"#252526",baseCtx);

    // side bar
    rect2(0,215,250,baseCvs.height-215,"#252526",baseCtx);
    rect2(0,30,250,5,"#252526",baseCtx);

    // layers
    rect2(5,35,240,30,"#252525",baseCtx);
    border2(5,35,240,180,"#555555",baseCtx);

    // options
    rect2(0,460,130,105,"#1e1e1e",baseCtx);
    border2(0,460,130,105,"#555555",baseCtx);
    text2("export scale:",0,554,"#3162cc",10);

    // tools
    rect2(135,220,110,110,"#1e1e1e",baseCtx);
    border2(135,220,110,110,"#555555",baseCtx);

    // palette
    rect2(135,335,110,230,"#1e1e1e",baseCtx);
    border2(135,335,110,230,"#555555",baseCtx);

    switch(tool) {
        case "pen":
            text2("size",250,20,"#3162cc",14,baseCtx);
            break;
        case "rect":
            text2("w",260,20,"#3162cc",14,baseCtx);
            text2("h",335,20,"#3162cc",14,baseCtx);
            break;
        case "circle":
            text2("size",250,20,"#3162cc",14,baseCtx);
            break;
        case "bucket":
            text2("tolerance",325,20,"#3162cc",14,baseCtx);
            break;
        case "selection":
            text2("x",265,18,"#3162cc",14,baseCtx);
            text2("y",340,18,"#3162cc",14,baseCtx);
            text2("θ",415,18,"#3162cc",14,baseCtx);
            text2("sx",480,18,"#3162cc",14,baseCtx);
            text2("sy",560,18,"#3162cc",14,baseCtx);
            break;
    }

    var i; // used to cache what we are drawing

    // file drop down
    if(UI.file.state) {
        i = UI.file;
        rect2(i.x,i.y,i.w,i.h,"#262626",baseCtx);
        rect2(i.x,i.y+120,i.w,2,"#555555",baseCtx);
    }
    
    // edit drop down
    if(UI.edit.state) {
        i = UI.edit;
        rect2(i.x,i.y,i.w,i.h,"#262626",baseCtx);
    }
}

function drawUITop() {

    // file drop down
    if(UI.file.state) {
        i = UI.file;
        border2(i.x+1,i.y,i.w-1,i.h,"#555555",baseCtx)
    }

    // edit drop down
    if(UI.edit.state) {
        i = UI.edit;
        border2(i.x+1,i.y,i.w-1,i.h,"#555555",baseCtx)
    }
}

function drawPreview() {
    baseCtx.imageSmoothingEnabled=false;
    let pw = projectInfo.w*projectInfo.previewSize;
    let ph = projectInfo.h*projectInfo.previewSize;
    let px = baseCvs.width - pw;
    rect2(px-10,30,pw+10,ph+10,"#262626",baseCtx);
    border2(px-10,30,pw+10,ph+10,"#555555",baseCtx);
    baseCtx.setTransform(projectInfo.previewSize, 0, 0, projectInfo.previewSize, px-5, 35);
    for(var i=layers.length-1;i>-1;i--) {
        if(layers[i].show) {
            baseCtx.drawImage(layers[i].cvs,0,0);
        }
    }
    baseCtx.setTransform(1, 0, 0, 1, 0, 0);
}

function reverseMousePos(mPos) {
    var xoff = canvases.cvs.width/2;
    var yoff = canvases.cvs.height/2;
    return {x:(((mPos.x-xoff+camera.x)*camera.zoom)+251+xoff),y:(((mPos.y-yoff+camera.y)*camera.zoom)+31+yoff)};
}