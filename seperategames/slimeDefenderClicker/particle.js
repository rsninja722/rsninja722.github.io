var gravity = 0.1;

class particle {
    constructor(x,y,type) {
        this.x = x;
        this.y = y;
        this.angle = degToRad(rand(0,360));
        this.v = {x:Math.cos(this.angle)*2,y:Math.sin(this.angle)*2};
        this.type = type;
        switch(type) {
            case "purchace":
                this.size = rand(1,5);
                this.color = `rgb(0,${rand(150,200)},0)`;
                this.pulseState = rand(0,1);
                this.timer = rand(25,75);
                break;
        }
    }

    update() {
        this.x += this.v.x;
        this.y += this.v.y;
        this.v.y += gravity;

        if(this.v.x>0.02) {this.v.x-=0.02;}
        if(this.v.x<-0.02) {this.v.x+=0.02;}

        if(this.type="purchace") {
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
    }

    draw() {
        rect(this.x,this.y,this.size,this.size,this.color);
    }
}

var particles=[];