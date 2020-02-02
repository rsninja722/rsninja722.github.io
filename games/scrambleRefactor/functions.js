var buildBlock = {x:0,y:0,w:10,h:10};
function mapInput() {
    var mp = mousePosition();
    buildBlock.x = mp.x;
    buildBlock.y=mp.y;
    if(keyPress[k.v]) {
        let world = blocks;
        var fstr="";
        for(var i=0;i<world.length;i++) {
            fstr += `${Math.round(world[i].x)},${Math.round(world[i].y)},${Math.round(world[i].w)},${Math.round(world[i].h)},`;
        }
        console.log(fstr);
    }
    if(mousePress[2]) {
        blocks.push( new block(buildBlock.x,buildBlock.y,buildBlock.w,buildBlock.h));
        map[level].collision.push(buildBlock.x);
        map[level].collision.push(buildBlock.y);
        map[level].collision.push(buildBlock.w);
        map[level].collision.push(buildBlock.h);
    }
    if(keyDown[k.z]) {
        buildBlock.w += keyDown[k.x] ? scroll*5 : scroll;
    } else {
        buildBlock.h += keyDown[k.x] ? scroll*5 : scroll;
    }
    if(keyPress[k.c]) {
        blocks.splice(blocks.length-1,1);
        map[level].collision.splice(map[level].collision.length-4,4);
    }
}

function switchLevel(lvl) {
    blocks = [];
    let m = map[lvl];
    p.x = m.start.x;
    p.y = m.start.y;
    p.v.y=0;
    p.v.x=0;
    p.onGround = [0,0,0];
    let c = m.collision;
    for(let i=0,l=c.length;i<l;i+=4) {
        blocks.push(new block(c[i],c[i+1],c[i+2],c[i+3]));
    }
    centerCameraOn(p.x,p.y);
    level = lvl;
}

function die() {
    
}

function colliding(rectangle) {
    for(let i=0,l=blocks.length;i<l;i++) {
        if(rectrect(blocks[i],rectangle)) {
            return i;
        }
    }
    return false;
}