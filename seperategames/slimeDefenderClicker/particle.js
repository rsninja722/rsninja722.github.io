var gravity = 0.1;

class particle {
    constructor(x,y,type,option=false) {
        this.x = x;
        this.y = y;
        this.type = type;
        switch(type) {
            case "purchace":
                this.size = rand(1,5);
                this.color = `rgb(0,${rand(150,200)},0)`;
                this.pulseState = rand(0,1);
                this.timer = rand(25,75);
                this.angle = degToRad(rand(0,360));
                this.v = {x:Math.cos(this.angle)*2,y:Math.sin(this.angle)*2};
                break;
            case "shoot":
                this.size = rand(1,3);
                this.color = `rbg(${rand(200,255)},50,50)`;
                this.speed = rand(4,12);
                this.angle = -(turrot+Math.PI)+Math.random()-0.5;
                this.v = {x:Math.cos(this.angle)*this.speed,y:Math.sin(this.angle)*this.speed};
                break;
            case "slime": 
                this.size = rand(3,6);
                this.color = option;
                this.angle = degToRad(rand(0,360));
                this.timer = rand(25,75);
                this.speed = rand(0,30)/10;
                this.v = {x:Math.sin(this.angle)*this.speed,y:Math.cos(this.angle)*this.speed};
                break;
        }
    }

    update() {
        this.x += this.v.x;
        this.y += this.v.y;
    
        if(this.type=="purchace") {
            this.v.y += gravity;

            if(this.v.x>0.02) {this.v.x-=0.02;}
            if(this.v.x<-0.02) {this.v.x+=0.02;}
            var poses = this.color.allIndexesOf(",");
            var curc = parseInt(this.color.slice(poses[0]+1,poses[1]));
            if(this.pulseState) {
                curc+=4;
                if(curc>200) {this.pulseState=0;}
                this.color = `rgb(0,${curc},0)`;
            } else {
                curc-=4;
                if(curc<100) {this.pulseState=1;}
                this.color = `rgb(0,${curc},0)`;
            }
            this.timer--;
            if(this.timer<1) {return true;}
        }
        if(this.type=="shoot") {
            if(this.v.x<0) {this.v.x+=0.2+(15.2-this.v.x)/60;} else {return true;}
            if(this.v.y>0) {this.v.y-=0.2;}
            if(this.v.y<0) {this.v.y+=0.2;}

            var curc = parseInt(this.color.slice(this.color.indexOf("(")+1,this.color.indexOf(",")));
            curc-=3;
            this.color = `rgb(${curc},50,50)`;
        }
        if(this.type=="slime") {
            if(this.v.y>0) {this.v.y-=0.2;}
            if(this.v.y<0) {this.v.y+=0.2;}
            if(this.v.x>0) {this.v.x-=0.2;}
            if(this.v.x<0) {this.v.x+=0.2;}
            if(this.v.x>-0.3&&this.v.x<0.3) {this.v.x=0;} 
            if(this.v.y>-0.3&&this.v.y<0.3) {this.v.y=0;} 
            this.timer--;
            if(this.timer<1) {return true;}
        }
    }

    draw() {
        rect(this.x,this.y,this.size,this.size,this.color);
    }
}

var particles=[];