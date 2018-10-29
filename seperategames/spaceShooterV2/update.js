function update() {
    cw=canvas.width;
    ch=canvas.height;

    if(rand(0,50)==1) {spawnBads();}
    if(rand(0,150)==1) {spawnAstroids();}

    for(var i=0;i<player.length;i++) {
        player[i].handleInput();
    }
    for(var i=0;i<bullets.length;i++) {
        if(bullets[i].update()) {
            for(let j=0;j<10;j++) {
                particles.push(new particle(bullets[i].x,bullets[i].y,2,rand(15,25),"color","red"));
            }
            bullets.splice(i,1);
            i--;
        }

    }
    for(var i=0;i<bads.length;i++) {
        if(bads[i].move()) {
            bads.splice(i,1);
            i--;
        }
    }
    for(var i=0;i<particles.length;i++) {
        if(particles[i].move()) {
            particles.splice(i,1);
            i--;
        }
    }

    if(keyDown[89]) {spawnBads();}
    if(keyPress[85]) {spawnBlocks();}
    
    timer++;

    resetInput();
}



function spawnBlocks() {
    for(var x=0;x<60;x+=6) {
        for(var y=0;y<60;y+=6) {
            bads.push(new bad(x,y,p.block1,0.5,0,6,6,1,1));
        }
    }
}