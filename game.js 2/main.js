// create globals
var canvases={cvs:null,ctx:null,buffer1cvs:null,buffer1ctx:null,buffer2cvs:null,buffer2ctx:null},camera={zoom:1,angle:0,x:0,y:0},drawMode=0,curCtx,maxCvsSize,difx,dify,seperateInputLoop=true;

//setup canvases and input
function setup(updateFPS) {
    canvases.cvs = document.getElementById("game");
    canvases.ctx = canvases.cvs.getContext("2d");

    createCanvas("buffer1");
    createCanvas("buffer2");

    canvases.ctx.imageSmoothingEnabled = false;
    canvases.buffer1ctx.imageSmoothingEnabled = false;
    canvases.buffer2ctx.imageSmoothingEnabled = false;

    maxCvsSize=Math.max(canvases.cvs.width,canvases.cvs.height);
    
    addListenersTo(canvases.cvs);
    
    startLoops(updateFPS);
}

function drawLoop() {
    switchDrawMode();
    
    resizeBuffers();

    clearCanvases();

    draw();
    
    render();

    requestAnimationFrame(drawLoop);
}

function updateLoop() {
    update();

    if(seperateInputLoop===false) {
        resetInput();
    }
}


function inputLoop() {
    input();

    resetInput();
}