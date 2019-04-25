class orb{
    constructor(path,value) {
        this.path=path;
        this.value=value;
        this.state=0;
        switch(path) {
            case "click":
                this.x=330;
                this.y=150;
                break;
            case "sps":
                this.x=330;
                this.y=95;
                break;
        }
    }

    update() {
        switch(this.path) {
            case "click":
            case "sps":
                switch(this.state) {
                    case 0:
                        this.x-=2;
                        if(this.x<=310) {this.state++;}
                        break;
                    case 1:
                        this.y-=4;
                        if(this.y<=60) {this.state++;this.y=60;}
                        break;
                    case 2:
                        var ic = 0;
                        while(ic<4) {
                            this.x-=1;
                            if(this.x<=280) {this.state++;ic=4;}
                            ic++;
                        }
                        break;
                    case 3:
                        this.y-=2;
                        if(this.y<=25) {money+=this.value;textAnims.push( new textAnim(170,5,"large1",`+$${parseNum(this.value)}`,[40,240,40,255]));return true;}
                        break;
                }
                break;
            case "spc" :

                break;
        }   
    }

    draw() {
        if(this.value<10) {
            drawSprite(s.orbSmall,this.x,this.y);
            //effects.push([this.x-5,this.y-5,this.x+5,this.y+5,[0,50,0],orbSmallEffect.slice()]);
        } else {
            drawSprite(s.orbLarge,this.x,this.y);
        }
    }
}

var orbs=[];

var orbSmallEffect=[];
for(var y=0;y<10;y++) {
    var a=[];
    for(var x=0;x<10;x++) {
        a.push(true);
    }
    orbSmallEffect.push(a.slice());
}