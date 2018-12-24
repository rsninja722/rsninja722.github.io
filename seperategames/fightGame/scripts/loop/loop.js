
function draw() {  //########### draw ########### 
    ctx.clearRect(0,0,cw,ch);
    for(var i=0;i<screen.data.length;i++) {
        screen.data[i] = 0;
    }
    switch(gameState) {
        case 1:
            drawMainMenu();
            break;
        case 2:
            drawCharacterSelect();
            break;
        case 3:
            drawMapSelect();
            break;
        case 4:
            drawMain();
            break;
    }
    ctx.putImageData(screen,0,0);
    requestAnimationFrame(draw);
}
function update() {  //########### update ########### 
    count+=1;
    switch(gameState) {
        case 1:
            updateMainMenu();
            break;
    }
}