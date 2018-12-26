function drawMainMenu() {
    /*for(var x=0;x<cw;x+=10) {       ####test####
        for(var y=0;y<ch;y+=10) {
            drawTest(images.test,(x)+(-count),y);
        }
    }
    drawButton(buttons[0]);
    rectFancy(mousePos.x-5,mousePos.y-5,10,10,[155,155,155,255],[50,50,50,255],2);
    //drawScaled(images.test,50,50,globalScale);
    //blah(images[0],10,10,);
    for(var g=0;g<20;g++) {
        drawText(text.large1,"hello world",count+g*20,ch/4+g*20,[count%256,(count+80)%256,(count+160)%256,255],11);
    }
    for(var g=0;g<20;g++) {
        drawText(text.small1,"all the fps",g*20,(count+(ch/4+g*20))%ch,[count%256,(count+80)%256,(count+160)%256,255],4);
    }*/
    drawButton(buttons.playerVsplayer);
    drawButton(buttons.playerVsai);
    if(collideBoxPoint(buttons.playerVsplayer,mousePos)) {
        drawText(text.large1,"player vs. player",195,167,[255,125,125,255],9);
    } else {
        drawText(text.large1,"player vs. player",195,167,[255,75,75,255],9);
    }
    if(collideBoxPoint(buttons.playerVsai,mousePos)) {
        drawText(text.large1,"player vs. ai",225,217,[125,125,255,255],9);
    } else {
        drawText(text.large1,"player vs. ai",225,217,[75,75,255,255],9);
    }
}

function drawCharacterSelect() {
    for(var lol=1;lol<4;lol++) {
        drawButton(buttons[`char${lol}`]);
    }
    if(gameMode==1) {
        rectFancy(100,250,50,25,[125,125,125,255],[100,100,100,255],2);
            drawText(text.medium1,"a",105,255,[89,153,255,255],0);
            drawText(text.medium1,"/",115,255,[153,153,153,255],0);
            drawText(text.medium1,"<",124,255,[225,28,25,255],0);
        rectFancy(250,250,50,25,[125,125,125,255],[100,100,100,255],2);
            drawText(text.medium1,"s",255,255,[89,153,255,255],0);
            drawText(text.medium1,"/",265,255,[153,153,153,255],0);
            drawText(text.medium1,"^",274,255,[225,28,25,255],0);
        rectFancy(400,250,50,25,[125,125,125,255],[100,100,100,255],2);
            drawText(text.medium1,"d",405,255,[89,153,255,255],0);
            drawText(text.medium1,"/",415,255,[153,153,153,255],0);
            drawText(text.medium1,">",424,255,[225,28,25,255],0);
        rectFancy(100,300,100,100,[155,155,155,255],[50,50,50,255],2);
        rectFancy(400,300,100,100,[155,155,155,255],[50,50,50,255],2);
            var p1display = p1char==0?"choose":(p1char==1?"speed":(p1char==2?"norm":"strong"));
            var p2display = p2char==0?"choose":(p2char==1?"speed":(p2char==2?"norm":"strong"));
            drawText(text.large1,p1display,110,340,[225,225,255,255],11);
            drawText(text.large1,p2display,410,340,[225,255,255,255],11);
    }
    drawScaled(images.p1,100,150,1);
    drawButton(buttons.back);
    drawText(text.large1,"speed man",0,0,[225,255,0,255],11);
}

function drawMapSelect() {
    drawButton(buttons.map);
    drawButton(buttons.prank);
    drawButton(buttons.back);
}

function drawMain() {
    rectFancy(0+~~camera.x,ch+~~camera.y,600,50,[125,125,125,255],[0,0,0,255],0);
    rectFancy(-50+~~camera.x,0+~~camera.y,50,400,[125,125,125,255],[0,0,0,255],0);
    rectFancy(cw+~~camera.x,0+~~camera.y,50,400,[125,125,125,255],[0,0,0,255],0);
    for(var p=0;p<players.length;p++) {
        players[p].draw();
    }
}