class slime {
    constructor(x,y,type) {
        this.x=x;
        this.y=y;
        this.w=24;
        this.h=24;
        this.angle=pointTo(this,{x:300,y:225})-degToRad(90+rand(-20,20));
        this.v={x:Math.sin(this.angle),y:Math.cos(this.angle)};
        this.type=type;
        this.jumptime=0;
        this.animFrame=0;
        this.dmgTime=0;
        switch(type) {
            case 0: this.health=this.maxHealth=2; break;
            case 1: this.health=this.maxHealth=4; break;
            case 2: this.health=this.maxHealth=7; break;
            case 3: this.health=this.maxHealth=15; break;
            case 4: this.health=this.maxHealth=25; break;
            case 5: this.health=this.maxHealth=80; break;
            case 6: this.health=this.maxHealth=200; break;
            case 7: this.health=this.maxHealth=500; break;
            case 8: this.health=this.maxHealth=5000; this.bossState=0; this.w=46; this.h=46; this.changeTime=-1;break;
        }
    }

    draw() {
        if(this.type<8) {
            var scolor = slimeColors[this.type].slice();
            scolor[1]-=this.dmgTime?120:0;
            scolor[2]-=this.dmgTime?120:0;
            if(this.jumptime<25) {
                drawSpriteEffect(s.slime2,this.x,this.y,scolor,this.angle-1.57079632,1+(Math.sin(this.jumptime/7.65)/2));
            } else {
                drawSpriteEffect(s.slime1,this.x,this.y,scolor,this.angle-1.57079632);
            }
            rect(this.x-12,this.y+16,this.w,5,"#2d2d2d");
            rect(this.x-11,this.y+17,this.w-2,3,"#a81212");
            rect(this.x-11,this.y+17,(this.w-2)*(this.health/this.maxHealth),3,"#00ff00");
        } else {
            if(this.jumptime<25) {
                drawSpriteAdv(s[`Boss${this.bossState}1`],this.x,this.y,this.angle-1.57079632,1+(Math.sin(this.jumptime/7.65)/2));
            } else {
                if(this.jumptime>(this.bossState?70:125)) {
                    drawSpriteAdv(s[`Boss${this.bossState}0`],this.x,this.y,this.angle-1.57079632,(this.jumptime%2==0?1.1:1));
                } else {
                    var idleSize = 0;
                    if(this.jumptime%10<5) {
                        idleSize=((this.jumptime%10)+1)/100;
                    } else {
                        idleSize=0.1-((this.jumptime%10)+1)/100;
                    }
                    drawSpriteAdv(s[`Boss${this.bossState}0`],this.x,this.y,this.angle-1.57079632,1+idleSize);
                }
            }
            rect(this.x-24,this.y+32,this.w,5,"#2d2d2d");
            rect(this.x-23,this.y+33,this.w-2,3,"#a81212");
            rect(this.x-23,this.y+33,(this.w-2)*(this.health/this.maxHealth),3,"#00ff00");
        }
        if(this.dmgTime>0) {this.dmgTime--;}
    }
    
    update() { 
        if(this.type==8&&this.changeTime>0) {
            this.changeTime--;
            this.jumptime=50;
            camera.y=rand(-2,2);
            curShake=this.changeTime%2?10:9;
            for(let i=0;i<25;i++) {
                particles.push(new particle(rand(this.x-this.w/2,this.x+this.w/2),rand(this.y-this.h/2,this.y+this.h/2),"boss"));
            }
        } else {
            camera.y=0;
        }

        //moving forwards
        if(this.jumptime<25) {
            this.x+=this.v.x* (this.type==8?(this.jumptime<18?0.75:0.5):(this.jumptime<18?1:0.5));
            this.y+=this.v.y* (this.type==8?(this.jumptime<18?0.75:0.5):(this.jumptime<18?1:0.5));
        }

        // jumping
        this.jumptime+=this.type==8?0.5:1;
        if(this.type==8&&this.jumptime==27) {curShake=14;}
        if(this.jumptime>=(this.type==8?(this.bossState?90:150):60)) {
            this.jumptime=0;
        }

        if(this.x>288) {this.x=288;} //off screen
        if(this.y<72) {this.y=72;}
        if(this.y+this.h/2)

        //bullet colition
        for(var j=0;j<bullets.length;j++) {
            if(rectRect(this,bullets[j])) {
                this.dmgTime=3;
                var tempdmg = bullets[j].damage;
                if(this.health>=tempdmg) {
                    textAnims.push( new textAnim(this.x,this.y+this.h/2,"medium1",`-${bullets[j].damage}`,[240,40,40,255],"dmg"));
                    bullets[j].damage=0;
                    if(this.type==8) {
                        if(this.changeTime<1) {
                            this.health-=tempdmg;
                        }
                    } else {
                        this.health-=tempdmg;
                    }
                    if(sound) {play(a[`hit${rand(0,1)}`]);}
                } else {
                    textAnims.push( new textAnim(this.x,this.y+this.h/2,"medium1",`-${this.health}`,[240,40,40,255],"dmg"));
                    bullets[j].damage-=this.health;
                    this.health=0;
                }
                if(bullets[j].damage<=0) {bullets[j].dead=true;} // despawn bullet
                if(this.health<=0) {
                    if(this.type<8) {
                        for(let i=0;i<25;i++) {
                            particles.push(new particle(this.x+rand(-8,8),this.y+rand(-8,8),"slime",particleColors[this.type][rand(0,1)]));
                        }
                    } else {
                        gameDone = 100;
                        for(let i=0;i<100;i++) {
                            var whatcolor = rand(0,1);
                            var tempcolor = `rgb(${rand(155,255)},${whatcolor?rand(0,100):rand(0,70)},${whatcolor?rand(0,50):rand(0,255)})`;
                            particles.push(new particle(this.x+rand(-20,20),this.y+rand(-20,20),"slime",tempcolor));
                        }
                    }
                    if(sound) {play(a.die);}
                    return true;
                }
            }
        }
        if(this.type==8) {
            if(this.health<this.maxHealth/2&&this.changeTime==-1) {
                this.bossState=1;
                this.changeTime=50;
                if(sound){play(a.transform);}
            }
        }

        // turn
        if(this.jumptime==(this.type==8?80:45)) {
            if(this.angle>pointTo(this,{x:300,y:225})-1.57079632) {
                this.angle+=rand(-7,1)/10;
            } else {
                this.angle+=rand(-1,7)/10;
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

var particleColors = [
    ["#86ff44","#61c12c"],
    ["#2a3fdd","#1c2ca0"],
    ["#b92fd8","#8b20a3"],
    ["#cc432a","#af3823"],
    ["#f418de","#c417b3"],
    ["#b26c1c","#965c19"],
    ["#fff53d","#d8cf2b"],
    ["#ededed","#c1c1c1"]
]
//interval time before first spaen and inbetween
var waves = [
    [ // wave 1
        {type:0,interval:2000,amount:10},
        {type:"wait",interval:5000,amount:1}
    ],
    [
        {type:0,interval:1600,amount:8},
        {type:1,interval:3000,amount:1},
        {type:"wait",interval:5000,amount:1}
    ],
    [
        {type:0,interval:1500,amount:2},
        {type:1,interval:3000,amount:2},
        {type:0,interval:1500,amount:2},
        {type:1,interval:3000,amount:2},
        {type:"wait",interval:5000,amount:1}
    ],
    [
        {type:1,interval:2500,amount:6},
        {type:0,interval:500,amount:10},
        {type:"wait",interval:5000,amount:1}
    ],
    [ // wave 5
        {type:1,interval:2000,amount:8},
        {type:2,interval:4000,amount:2},
        {type:"wait",interval:5000,amount:1}
    ],
    [
        {type:2,interval:3000,amount:1},
        {type:1,interval:2000,amount:3},
        {type:2,interval:3000,amount:1},
        {type:1,interval:2000,amount:3},
        {type:2,interval:3000,amount:1},
        {type:1,interval:2000,amount:4},
        {type:"wait",interval:5000,amount:1}
    ],
    [
        {type:2,interval:3000,amount:4},
        {type:"wait",interval:5000,amount:1}
    ],
    [
        {type:8,interval:2000,amount:1},
        {type:"wait",interval:500000,amount:1}
    ],
    [
        {type:0,interval:2000,amount:2},
        {type:"wait",interval:5000,amount:1}
    ],
    [ // wave 10
        {type:0,interval:2000,amount:2},
        {type:"wait",interval:5000,amount:1}
    ],
    [ // boss
        {type:8,interval:5000,amount:1}
    ]
]

var wdat = {wave:0,pos:0,count:0};

var slimeTime = Date.now();
var primeSlimeTime = waves[0][0].interval;
function spawnSlime() {
    if(Date.now()>=slimeTime+primeSlimeTime) {
        if(curSpawn().type=="wait") {
            setTimeout(function() {textAnims.push( new textAnim(200,210,"large1",`w`,[40,200,40,255],"wave"));},100);
            setTimeout(function() {textAnims.push( new textAnim(215,210,"large1",`a`,[40,200,40,255],"wave"));},200);
            setTimeout(function() {textAnims.push( new textAnim(230,210,"large1",`v`,[40,200,40,255],"wave"));},300);
            setTimeout(function() {textAnims.push( new textAnim(245,210,"large1",`e`,[40,200,40,255],"wave"));},400);

            let s=(wdat.wave+2).toString();
            if(s.length>0) {setTimeout(function() {textAnims.push( new textAnim(275,210,"large1",s[0],[40,200,40,255],"wave"));},600);}
            if(s.length>1) {setTimeout(function() {textAnims.push( new textAnim(290,210,"large1",s[1],[40,200,40,255],"wave"));},700);}
            if(s.length>2) {setTimeout(function() {textAnims.push( new textAnim(305,210,"large1",s[2],[40,200,40,255],"wave"));},800);}

            setTimeout(function() {if(sound){play(a.nextWave);}},1000);
        } else {
            slimes.push(new slime(0,rand(60,400),curSpawn().type));
        }
        wdat.count++;
        if(wdat.count>=curSpawn().amount) {
            wdat.pos++;
            wdat.count=0;
            if(wdat.pos==waves[wdat.wave].length) {
                wdat.wave++;
                wdat.pos=0;
            }
        }
        primeSlimeTime=curSpawn().interval;
        slimeTime=Date.now();
    }
}

function curSpawn() {
    return waves[wdat.wave][wdat.pos];
}