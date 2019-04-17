var buttons=[];
class button {
    constructor(x,y,type,id) {
        this.x=x;
        this.y=y;
        this.state="defult";
        this.type=type;
        switch(type) {
            case "txt":
                this.w=100;
                this.h=50;
                break;
            case "img":
                this.w=40;
                this.h=40;
                break;
            case "big":
                this.w=120;
                this.h=120;
                break;
        }
        this.id=id;
    }

    draw() {
        switch(this.type) {
            case "txt":
                if(this.state=="press") {
                    drawSprite(s.txtPress,this.x+this.w/2,this.y+this.h/2);
                }
                else if(this.state=="hover") {
                    drawSprite(s.txtHover,this.x+this.w/2,this.y+this.h/2);
                }
                else {
                    drawSprite(s.txtDefult,this.x+this.w/2,this.y+this.h/2);
                }
                break;
            case "img":
                if(this.state=="press") {
                    drawSprite(s.imgPress,this.x+this.w/2,this.y+this.h/2);
                    if(this.id=="spd") {drawSprite(s.speedupPress,this.x+this.w/2,this.y+this.h/2);}
                }
                else if(this.state=="hover") {
                    drawSprite(s.imgHover,this.x+this.w/2,this.y+this.h/2);
                    if(this.id=="spd") {drawSprite(s.speedup,this.x+this.w/2,this.y+this.h/2);}
                }
                else {
                    drawSprite(s.imgDefult,this.x+this.w/2,this.y+this.h/2);
                    if(this.id=="spd") {drawSprite(s.speedup,this.x+this.w/2,this.y+this.h/2);}
                }
                break;
            case "big":
                if(this.state=="press"||clickTimer>0) {
                    drawSprite(s.bigPress,this.x+this.w/2,this.y+this.h/2);
                    if(clickTimer>0) {clickTimer--;}
                } else {
                    drawSprite(s.bigDefult,this.x+this.w/2,this.y+this.h/2);
                }
                break;
        }
        
    }

    update() {
        if(pointRect(mousePos,this)) {
            if(mousePress[0]||scroll) {
                buyUpgrade(this);
            }
            if(mouseDown[0]) {
                this.state="press";
            } else {
                this.state="hover";
            }
        } else {
            this.state="defult";
        }
    }
}
buttons.push(new button(310,5,"img","dmg"));buttons.push(new button(405,5,"img","spd"));
buttons.push(new button(320,70,"txt","sps"));
buttons.push(new button(320,140,"big","click"));
buttons.push(new button(320,280,"txt","auto"));
buttons.push(new button(320,340,"txt","spc"));


function pointRect(obj1, obj2) {
    if (obj1.x >= obj2.x && 
        obj1.x <= obj2.x + obj2.w && 
        obj1.y >= obj2.y && 
        obj1.y <= obj2.y + obj2.h) 
    {
        return true;
    } else {
        return false;
    }
}