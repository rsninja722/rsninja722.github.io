function draw() {
    ctx.clearRect(0,0,cw,ch);
    clearData();
        var dataPointer = screenData.data;
        var fillPos=0;
        for(let y=0;y<ch;y++) {
            for(let x=0;x<200;x++) {
                dataPointer[fillPos]=30;
                dataPointer[fillPos+1]=30;
                dataPointer[fillPos+2]=30;
                dataPointer[fillPos+3]=255;
                fillPos+=4;
            }
            fillPos=(y+1)*(screenData.width*4);
        }
        drawPalette();
       
    drawData();
    if(uistates.newPic) { // width/height selector pop up
        rectFancy(cw/2,ch/2,250,150,"#404040","#111111");
            text("New Picture",cw/2-115,ch/2-55,"white",16);
                text("Width:",cw/2-100,ch/2-20,"white",14);
                    rectFancy(cw/2-9,ch/2-20,60,25,"#404040",focus.newPic.width?"#51ffd0":"#111111");text(pic.w,cw/2-36,ch/2-16,"white",14);
                text("Height:",cw/2-100,ch/2+20,"white",14);
                    rectFancy(cw/2-9,ch/2+20,60,25,"#404040",focus.newPic.height?"#51ffd0":"#111111");text(pic.h,cw/2-36,ch/2+26,"white",14);
                rectFancy(cw/2+70,ch/2+50,60,30,"#5bfc25",focus.newPic.create?"white":"#111111");text("Create",cw/2+43,ch/2+57,"white",16);
    }
    rect(mousePos.x-5,mousePos.y-5,10,10,"#00ffff");
}