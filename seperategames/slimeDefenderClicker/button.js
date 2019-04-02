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
                    // drawSprite(s.btxtpress,this.x+this.w/2,this.y+this.h/2);
                    rect(this.x,this.y,this.w,this.h,"#202020");
                }
                else if(this.state=="hover") {
                    //drawSprite(s.btxthover,this.x+this.w/2,this.y+this.h/2);
                    rect(this.x,this.y,this.w,this.h,"#606060");
                }
                else {
                   // drawSprite(s.btxt,this.x+this.w/2,this.y+this.h/2);
                   rect(this.x,this.y,this.w,this.h,"#484848");
                }
                break;
            case "img":
                rect(this.x,this.y,this.w,this.h,"#606060");
                break;
            case "big":
                rect(this.x,this.y,this.w,this.h,"#999999");
                break;
        }
        
    }

    update() {
        if(pointRect(mousePos,this)) {
            if(mousePress[0]) {
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
buttons.push(new button(310,10,"img","dmg"));buttons.push(new button(400,10,"img","spd"));
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