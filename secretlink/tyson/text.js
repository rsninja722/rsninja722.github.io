function drawText(font,string,x,y,color,space) {
    x+=camera.x
    y+=camera.y
    string=string.toString();
    for(let s=0;s<string.length;s++) {
        var xpos = x+s*12+s*space;
        if(xpos<cw+40&&xpos>0) { // TODO: fix
            let pos = (cw*4*y+4)+(x*4)+(s*12+s*space*4);
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
                pos+=cw*4-font.width*4;
                
            }
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
    parseFont("medium1",ssources[3],7,9,["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9",".",",",":","!","?","/","<","^",">","$","-"," "]);
    parseFont("large1",ssources[4],11,17,["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9",".",",",":","!","?","$","/","+","-"," "]);
    text.small1["0"] = text.small1.o;
    text.small2["0"] = text.small2.o;
    text.small3["0"] = text.small3.o;
}

function putText() {
    for( var i=0;i<buttons.length;i++) {
        if(buttons[i].type == "txt") {
            var tclr = buttons[i].state=="hover"?255:(buttons[i].state=="press"?120:200);
            var txttodraw;
            var sizetodraw;
            switch(buttons[i].id) {
                case "spc":
                    txttodraw="$/click";
                    sizetodraw="large1";
                    break;
                case "auto":
                    txttodraw="auto clicker";
                    sizetodraw="medium1";
                    break;
                case "sps":
                    txttodraw="$/sec";
                    sizetodraw="large1";
                    break;
            }
            drawText(text[sizetodraw],txttodraw,buttons[i].x+10,buttons[i].y+(sizetodraw=="large1"?15:20),[14,tclr,14,255],sizetodraw=="large1"?9:3);
        }
        if(buttons[i].id!="click") {
            drawText(text.small2,`p:`,buttons[i].x+buttons[i].w,buttons[i].y+16,[40,140,40,255],1);
            drawText(text.medium1,`${(upgrades[buttons[i].id].stat==maxes[buttons[i].id])?"max":parseNum(Math.floor(upgrades[buttons[i].id].price))}`,buttons[i].x+buttons[i].w+7,buttons[i].y+15,[40,140,40,255],3);

        }
    }
    
    drawText(text.medium1,`dmg:${Math.floor(upgrades.dmg.stat)}`,5,8,[40,240,40,255],5);
    drawText(text.medium1,`spd:${Math.floor(upgrades.spd.stat)}`,80,8,[40,240,40,255],5);
    drawText(text.medium1,`$/sec:${parseNum(Math.floor(upgrades.sps.stat))}`,5,38,[40,240,40,255],4);
    drawText(text.medium1,`$/click:${parseNum(Math.floor(upgrades.spc.stat))}`,90,38,[40,240,40,255],4);
    drawText(text.medium1,`auto:${(autoSpeeds[upgrades.auto.stat]==Infinity?0:autoSpeeds[upgrades.auto.stat])}`,195,38,[40,240,40,255],4);
    for(var i=0;i<textAnims.length;i++) {
        if(textAnims[i].update()) {
            textAnims.splice(i,1);
            i--;
        }
    }
    for(var i=0;i<PriotextAnims.length;i++) {
        if(PriotextAnims[i].update()) {
            PriotextAnims.splice(i,1);
            i--;
        }
    }
    drawText(text.large1,`$:${parseNum(Math.floor(money))}`,178,6,[40,240,40,255],10);
    if(!started) {
        drawText(text.large1,"click anywhere to start",10,150,[40,240,240,255],10);
    }
    if(gameOver) {
        drawText(text.medium1,"you were slimed!",100,190,[40,240,240,255],10);
        drawText(text.medium1,"hold space to restart",100,210,[40,240,240,255],5);
    }
}

// 100,000,000,000,000,000
function parseNum(num) {
    num = num.toString();
    let txt;
    switch(num.length) {
        case 18: txt = `${num[0]}${num[1]}${num[2]}.${num[3]}q`; break;
        case 17: txt = `${num[0]}${num[1]}.${num[2]}${num[3]}q`; break;
        case 16: txt = `${num[0]}.${num[1]}${num[2]}${num[3]}q`; break;

        case 15: txt = `${num[0]}${num[1]}${num[2]}t`; break;
        case 14: txt = `${num[0]}${num[1]}.${num[2]}t`; break;
        case 13: txt = `${num[0]}.${num[1]}${num[2]}t`; break;

        case 12: txt = `${num[0]}${num[1]}${num[2]}.${num[3]}b`; break;
        case 11: txt = `${num[0]}${num[1]}.${num[2]}${num[3]}b`; break;
        case 10: txt = `${num[0]}.${num[1]}${num[2]}${num[3]}b`; break;

        case 9: txt = `${num[0]}${num[1]}${num[2]}.${num[3]}m`; break;
        case 8: txt = `${num[0]}${num[1]}.${num[2]}${num[3]}m`; break;
        case 7: txt = `${num[0]}.${num[1]}${num[2]}${num[3]}m`; break;

        case 6: txt = `${num[0]}${num[1]}${num[2]}.${num[3]}k`; break;
        case 5: txt = `${num[0]}${num[1]}.${num[2]}${num[3]}k`; break;
        case 4: txt = `${num[0]}.${num[1]}${num[2]}k`; break;
    
        case 3:case 2: case 1: txt = num; break;
    }
    return txt;
}

var textAnims=[];
var PriotextAnims=[]; //higher priority for drawing

class textAnim {
    constructor(x,y,font,txt,color,type="defult") {
        this.x=x;
        this.y=y;
        this.font=font;
        this.txt=txt;
        this.color=color;
        this.type=type;
        if(type=="wave") {
            this.count=100;
            this.ogx=x;
        }
        if(type=="dmg") {
            this.count=20;
        }
        switch(font) {
            case "large1":
                this.spacing = 10;
                break;
            case "medium1":
                this.spacing = 5;
                break;
            default:
                this.spacing = 1;
                break;
        }
    }
    update() {
        if(!pause) {
            if(this.type=="wave") {
                if(this.count<20) {this.x=this.ogx+Math.pow((20-this.count),2);}
                if(this.count>80) {this.x=this.ogx-(Math.pow((this.count-80),2)/2);}
                this.count--;
                if(this.count<=0) {
                    return true;
                }
            } else if(this.type=="dmg") {
                this.y++;
                this.count--;
                if(this.count<=0) {
                    return true;
                }
            } else {
                this.y+=1;
                if(this.y>40) {
                    return true;
                }
            }
        }
        drawText(text[this.font],this.txt,~~this.x,~~this.y,this.color,this.spacing);
    }
}