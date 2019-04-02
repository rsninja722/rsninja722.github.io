function drawText(font,string,x,y,color,space) {
   // console.log(string);
    string=string.toString();
    var sw = canvas.width
    for(let s=0;s<string.length;s++) {
        let pos = (canvas.width*4*y+4)+(x*4)+(s*12+s*space*4);
        let count = 0;
        for(let y=0;y<font.height;y++) {
            for(let x=0;x<font.width;x++) {
                if(font[string[s]][count]!=0) {
                    var tempData=screenData.data;
                    var tempLetter = font[string[s]][count];
                    tempData[pos] = color[0]-(255-tempLetter);
                    tempData[pos+1] = color[1]-(255-tempLetter);
                    tempData[pos+2] = color[2]-(255-tempLetter);
                    tempData[pos+3] = 255;
                }
                count++;
                pos+=4;
            }    
            pos+=sw*4-font.width*4;
            
        }
    }
}

function parseFont(name,img,w,h,order) {
    ctx.clearRect(0,0,cw,ch);
    ctx.drawImage(img,0,0);
    text[name] =  {};
    text[name].width = w;
    text[name].height = h;
    for(let i=0;i<order.length;i++) {
        let temp = ctx.getImageData(i*w,0,w,h);
        let tempChar = [];
        for(let h=0;h<temp.data.length;h+=4) {
            tempChar.push(temp.data[h]);
        }
        text[name][order[i]] = tempChar;
    }
}

var text={};
function doFontStuff() {
    parseFont("small1",ssources[0],3,5,["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","1","2","3","4","5","6","7","8","9",".","!","?"," "]);
    parseFont("small2",ssources[1],3,5,["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","1","2","3","4","5","6","7","8","9",".","!","?",":"," "]);
    parseFont("small3",ssources[2],3,5,["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","1","2","3","4","5","6","7","8","9",".","!","?"," "]);
    //add $ /
    parseFont("medium1",ssources[3],7,9,["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9",".",",",":","!","?","/","<","^",">"," ","$"]);
    parseFont("large1",ssources[4],11,17,["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9",".",",",":","!","?","$","/"," "]);
    text.small1["0"] = text.small1.o;
    text.small2["0"] = text.small2.o;
    text.small3["0"] = text.small3.o;
}

function putText() {
    for( var i=0;i<buttons.length;i++) {
        if(buttons[i].type == "txt") {
            var txttodraw;
            var sizetodraw;
            switch(buttons[i].id) {
                case "spc":
                    txttodraw="$/c";
                    sizetodraw="large1";
                    break;
                case "auto":
                    txttodraw="auto clicker";
                    sizetodraw="medium1";
                    break;
                case "sps":
                    txttodraw="$/s";
                    sizetodraw="large1";
                    break;
            }
            drawText(text[sizetodraw],txttodraw,buttons[i].x+10,buttons[i].y+(sizetodraw=="large1"?15:20),[14,255,14,255],sizetodraw=="large1"?9:4);
        }
        if(buttons[i].id!="click") {
            drawText(text.small2,`p:`,buttons[i].x+buttons[i].w+2,buttons[i].y+15,[40,140,40,255],1);
            drawText(text.medium1,`${~~(upgrades[buttons[i].id].price)}`,buttons[i].x+buttons[i].w+10,buttons[i].y+15,[40,140,40,255],3);

        }
    }
    drawText(text.large1,`$:${~~money}`,200,5,[40,240,40,255],10);
}