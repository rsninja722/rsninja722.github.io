function collideBox(object1,object2) {
    if(object1.x + object1.w/2 >= object2.x - object2.w/2 && object1.x - object1.w/2 <= object2.x + object2.w/2 &&object1.y + object1.h/2 >= object2.y - object2.h/2 && object1.y - object1.h/2 <= object2.y + object2.h/2) {
        return true;
    }
}
function collideBoxPoint(box,point) {
    if(box.x + box.w/2 >= point.x && box.x - box.w/2 <= point.x &&box.y + box.h/2 >= point.y && box.y - box.h/2 <= point.y) {
        return true;
    }
}



function player(x,y,type,controller) {
    this.x = x;
    this.y = y;
    this.w = 30;
    this.h = 50;
    this.speed = 2;
    this.power = 1;
    this.vel = {x:0,y:0};
    this.jumpCounter = 1;
    this.controller = controller;
    switch(type) {
        case 1:
            this.speed = 2;
            this.power = 0.75;
            break;
        case 2:
            this.speed = 1.5;
            this.power = 1;
            break;
        case 3:
            this.speed = 1.2;
            this.power = 1.4;
            break;
    }
}

player.prototype.draw = function() {
    rectFancy(~~(this.x+camera.x),~~(this.y+camera.y),this.w,this.h,[125,255,125,255],[50,125,50,255],1);
}
player.prototype.update = function() {
    if(!keyDown[65]&&!keyDown[68]) { //x velocity friction
        this.vel.x -= (this.vel.x>0) ? 0.1 : -0.1;
        if(this.vel.x<0.11&&this.vel.x>-0.11) {this.vel.x=0;}
    } else {
        this.vel.x -= (this.vel.x>0) ? 0.06 : -0.06;
        if(this.vel.x<0.07&&this.vel.x>-0.07) {this.vel.x=0;}
    }

    
    switch(this.controller) { //input
        case "p1":
            if(keyPress[87]) {if(this.jumpCounter!=0){this.vel.y=2.5;this.jumpCounter--;}}
            if(keyDown[65]) {this.vel.x-=0.15;}
            if(keyDown[68]) {this.vel.x+=0.15;}
            if(keyDown[83]) {this.vel.y-=0.2;} else {this.vel.y-=0.1;}
            if(this.x<players[1].x) {camera.x=-(players[1].x-((players[1].x-this.x)/2))+cw/2;} //camera control
            if(this.x>players[1].x) {camera.x=-(this.x-((this.x-players[1].x)/2))+cw/2;}
            if(this.y<players[1].y) {camera.y=-(players[1].y-((players[1].y-this.y)/2))+ch/2;}
            if(this.y>players[1].y) {camera.y=-(this.y-((this.y-players[1].y)/2))+ch/2;}
            break;
        case "p2":
            if(keyPress[38]) {if(this.jumpCounter!=0){this.vel.y=2.5;this.jumpCounter--;}}
            if(keyDown[37]) {this.vel.x-=0.15;}
            if(keyDown[39]) {this.vel.x+=0.15;}
            if(keyDown[40]) {this.vel.y-=0.2;} else {this.vel.y-=0.1;}
            break;
    }


    if(this.vel.x>this.speed) {this.vel.x = this.speed} //speed cap
    if(this.vel.x<-this.speed) {this.vel.x = -this.speed}

    
    
    
    for(let i=0;i<this.speed*2;i++) {
        this.x += this.vel.x; //move
        this.y -= this.vel.y;
        
        if(this.y+this.h>ch) { //stop on the floor
            this.y+=this.vel.y;
            this.vel.y=0;
        } 
        if(this.x+this.w>cw) { //stop on the walls
            this.x-=this.vel.x;
            this.vel.x=0;
        } 
        if(this.x<0) {
            this.x-=this.vel.x;
            this.vel.x=0;
        } 
        if(onGround(this)) { //regen double jump
            this.jumpCounter = 1;
        }
    }

    //rectFancy(this.x,this.controller,this.w,this.h,[125,255,125,255],[50,125,50,255],1);
}
function onGround(object) {
    if(object.y+object.h+5>ch) {
        return true;
    }
}