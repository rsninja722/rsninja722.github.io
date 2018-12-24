function drawMainMenu() {
    for(var x=0;x<cw;x+=10) {
        for(var y=0;y<ch;y+=10) {
            drawTest(images.test,(x)+(-count),y);
        }
    }
    drawButton(buttons[0]);
    rectFancy(mousePos.x-5,mousePos.y-5,10,10,[155,155,155,255],[50,50,50,255],2);
    //drawScaled(images.test,50,50,globalScale);
    //blah(images[0],10,10,);
    for(var g=0;g<20;g++) {
        drawText(text.medium1,"hello world",count+g*20,ch/4+g*20,[count%256,(count+80)%256,(count+160)%256,255],4);
    }
    for(var g=0;g<20;g++) {
        drawText(text.small1,"all the fps",g*20,(count+(ch/4+g*20))%ch,[count%256,(count+80)%256,(count+160)%256,255],4);
    }
}