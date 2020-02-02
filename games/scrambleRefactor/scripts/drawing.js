// drawing
// contains main drawing loops

// increment a number every drawing frame
var animationCount = 0;

// drawing with camera transformations
function draw() {
    animationCount++;

    if(buildMode) {
        // camera limits
        canvasScale = 1;
        canvases.cvs.width = 800;
        canvases.cvs.height = 600;
        canvases.cvs.style.imageRendering = "pixelated";
        var limits = levels[level].cameraAreas;
        for(var i=0;i<limits.length;i++) {
            rect(limits[i].x,limits[i].y,400,300,`rgb(50,50,${50+(i*25)})`);
        }
    } else if(canvases.cvs.width === 800) {
        canvasScale = 0;
        canvases.cvs.width = 400;
        canvases.cvs.height = 300;
        canvases.cvs.style.imageRendering = "pixelated";
    }

    imgIgnoreCutoff(sprites.sky0,levels[level].drawCenter.x,levels[level].drawCenter.y);
    imgIgnoreCutoff(sprites.back0,levels[level].drawCenter.x,levels[level].drawCenter.y);

    // level blocks
    for(var i=0;i<blocks.length;i++) {
        //blocks[i].draw();
    }

    imgIgnoreCutoff(sprites.mid0,levels[level].drawCenter.x,levels[level].drawCenter.y);

    // building block to be added
    if(buildMode) {
        if(buildBlock.type===0) {
            rect(buildBlock.x,buildBlock.y,buildBlock.w,buildBlock.h,"green");
        } else {
            rect(buildBlock.x,buildBlock.y,400,300,`rgb(50,50,${50+(levels[level].cameraAreas.length*25)})`);
        }
    }

    playerDraw();

    drawParticles();

    imgIgnoreCutoff(sprites.top0,levels[level].drawCenter.x,levels[level].drawCenter.y);

    drawKeys();
    
}

// drawing without transformations
function absoluteDraw() {

}