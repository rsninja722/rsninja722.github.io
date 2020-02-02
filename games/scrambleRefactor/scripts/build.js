// build
// contains updating during build mode. Used to make levels

// current block being added
var buildBlock = { x: 0, y: 0, w: 10, h: 10, type:0};

// weather building should happen or not
var buildMode = false;

// should only be called while in build mode
function buildUpdate() {
    
    // panning
    if (keyDown[k.LEFT]) { moveCamera(-2, 0); }
    if (keyDown[k.RIGHT]) { moveCamera(2, 0); }
    if (keyDown[k.UP]) { moveCamera(0, -2); }
    if (keyDown[k.DOWN]) { moveCamera(0, 2); }

    // move block to mouse
    var mp = mousePosition();
    buildBlock.x = mp.x;
    buildBlock.y = mp.y;

    // print list of block dimensions to be used in levels array
    if (keyPress[k.v]) {
        var world = blocks;
        var finalString = "";
        for (var i = 0; i < world.length; i++) {
            finalString += `${Math.round(world[i].x)},${Math.round(world[i].y)},${Math.round(world[i].w)},${Math.round(world[i].h)},`;
        }
        finalString += "\n";
        world = levels[level].cameraAreas;
        for (var i = 0; i < world.length; i++) {
            finalString += `{x:${Math.round(world[i].x)},y:${Math.round(world[i].y)}},`;
        }
        console.log(finalString);
    }

    // place block
    if (mousePress[2]) {
        if(buildBlock.type===0) {
            blocks.push(new block(buildBlock.x, buildBlock.y, buildBlock.w, buildBlock.h));
            levels[level].collision.push(buildBlock.x);
            levels[level].collision.push(buildBlock.y);
            levels[level].collision.push(buildBlock.w);
            levels[level].collision.push(buildBlock.h);
        } else {
            levels[level].cameraAreas.push({x:buildBlock.x,y:buildBlock.y});
        }
    }

    if(mousePress[0]) {
        buildBlock.type = buildBlock.type ? 0 : 1; 
    }

    // scroll to increase size 
    // hold z to change dimension being scaled
    // hold x to scale faster
    if (keyDown[k.z]) {
        buildBlock.w += keyDown[k.x] ? scroll * 5 : scroll;
    } else {
        buildBlock.h += keyDown[k.x] ? scroll * 5 : scroll;
    }

    // delete newest block
    if (keyPress[k.c]) {
        if(buildBlock.type===0) {
            blocks.splice(blocks.length - 1, 1);
            levels[level].collision.splice(levels[level].collision.length - 4, 4);
        } else {
            levels[level].cameraAreas.pop();
        }
    }
}