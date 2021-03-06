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
                        if(this.y<=25) {money+=this.value;textAnims.push( new textAnim(180,5,"large1",`+$${parseNum(this.value)}`,[40,240,40,255]));if(sound){play(a[`orb${rand(1,3)}`]);}return true;}
                        break;
                }
                break;
            case "spc" :

                break;
        }   
    }

    draw() {
        if(this.value<25) {
            drawSprite(s.orbSmall,this.x,this.y);
        } else if(this.value<200) {
            drawSprite(s.orbMedium,this.x,this.y);
        } else {
            drawSprite(s.orbLarge,this.x,this.y);
        }
    }
}

var orbs=[];
