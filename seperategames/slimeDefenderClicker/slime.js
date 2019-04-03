class slime {
    constructor(x,y,type) {
        this.x=x;
        this.y=y;
        this.w=12;
        this.h=12;
        this.angle=pointTo(this,{x:300,y:200})-degToRad(90+rand(-20,20));
        this.v={x:Math.sin(this.angle),y:Math.cos(this.angle)};
        this.type=type;
        this.jumptime=0;
        this.animFrame=0;
    }

    draw() {
        if(this.type<8) {
            if(this.jumptime<25) {
                drawSpriteEffect(s.slime2,this.x,this.y,slimeColors[this.type],this.angle-1.57079632,1+(Math.sin(this.jumptime/7.65)/2));
            } else {
                drawSpriteEffect(s.slime1,this.x,this.y,slimeColors[this.type],this.angle-1.57079632);
            }
        }
    }
    
    update() { 
        if(this.jumptime<25) {
            this.x+=this.v.x*(this.jumptime<18?1.5:1);
            this.y+=this.v.y*(this.jumptime<18?1.5:1);
        }

        this.jumptime++;
        if(this.jumptime>=60) {
            this.jumptime=0;
        }

        if(this.x>300) {return true;}
        for(var j=0;j<bullets.length;j++) {
            if(rectRect(this,bullets[j])) {
                return true;
            }
        }

        if(this.jumptime==45) {
            if(this.angle>pointTo(this,{x:300,y:200})-1.57079632) {
                this.angle+=rand(-5,1)/10;
            } else {
                this.angle+=rand(-1,5)/10;
            }
            this.v={x:Math.sin(this.angle),y:Math.cos(this.angle)};
        }
    }
}
var slimes=[];
var slimeColors = [
    [-120,0,-120],
    [-120,-120,0],
    [-40,-140,-40],
    [0,-120,-120],
    [20,-100,20],
    [0,-60,-120],
    [40,40,-120],
    [0,0,0]
]

var scount=0;

var slimeTime = Date.now();
var primeSlimeTime = 100;
function spawnSlime() {
    if(Date.now()>=slimeTime+primeSlimeTime) {
        slimes.push(new slime(0,rand(0,400),scount));
        primeSlimeTime=rand(1000,1500);
        slimeTime=Date.now();

        scount++;
        if(scount>7) {scount=0;}
    }
}