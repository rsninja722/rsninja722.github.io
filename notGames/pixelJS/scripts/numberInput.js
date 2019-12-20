class numberInput {
    constructor(x,y,id,value,min,max) {
        let temp = document.createElement("input");
        temp.style = `position:absolute;left:${x}px;top:${y}px;display:block;width:50px;`;
        temp.id = id;
        temp.value = value;
        temp.type = "number";
        numberInputs.appendChild(temp);
        this.elem = document.getElementById(id);
        this.min = min;
        this.max = max;
    }
    get value() {return parseFloat(this.elem.value);}
    set value(val) {this.elem.value = val;}

    get state() {
        let d = this.elem.style.display;
        return d == "block" ? true : false;
    }
    set state(bool) {
        if(bool) {
            this.elem.style.display = "block";
        } else {
            this.elem.style.display = "none";
        }
    }

}
numberInput.prototype.limit = function() {
    let v = this.value;
    if(v<this.min) {this.value=this.min;}
    if(v>this.max) {this.value=this.max;}
}

var numbers = {};

function limitNumbers() {
    var keys = Object.keys(numbers);
    for(let i=0;i<keys.length;i++) {
        numbers[keys[i]].limit();
    }
}

// pen
numbers.penSize = new numberInput(285,5,"penSize",1,1,1000);
numbers.preSize = new numberInput(75,465,"preSize",1,1,6);numbers.preSize.state=false;
numbers.colorLimit = new numberInput(75,490,"colorLimit",1,1,16);numbers.colorLimit.state=false;
numbers.rectW = new numberInput(275,5,"rectW",5,1,1000);numbers.rectW.state=false;
numbers.rectH = new numberInput(350,5,"rectH",3,1,1000);numbers.rectH.state=false;
numbers.circleSize = new numberInput(285,5,"circleSize",6,2,1000);numbers.circleSize.state=false;
numbers.fillTolerance = new numberInput(400,5,"fillTolerance",0,0,1000);numbers.fillTolerance.state=false;
numbers.exportScale = new numberInput(75,540,"exportScale",1,1,16);
numbers.transformX = new numberInput(275,5,"transformX",1,-10000,10000);
numbers.transformY = new numberInput(350,5,"transformY",1,-10000,10000);
numbers.transformAngle = new numberInput(425,5,"transformAngle",0,-360,360);
numbers.transformSX = new numberInput(500,5,"transformSX",1,-100,100);
numbers.transformSY = new numberInput(575,5,"transformSY",1,-100,100);