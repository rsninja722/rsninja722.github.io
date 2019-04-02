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
        switch(this.state) {
            case 0:
                this.x-=2;
                if(this.x<=310) {this.state++;}
                break;
            case 1:
                this.y-=4;
                if(this.y<=60) {this.state++;}
                break;
            case 2:
                this.x-=4;
                if(this.x<=280) {this.state++;}
                break;
            case 3:
                this.y-=2;
                if(this.y<=30) {money+=this.value;return true;}
                break;
        }
    }

    draw() {
        if(this.value<10) {
            rect(this.x-1,this.y-1,2,2,"#00ffff");
        } else {

        }
    }
}

var orbs=[];
