var cars = []; // array for all car objects
class car {
    constructor(x,y,angle,w,h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.angle = degToRad(angle);
        this.v = {x:Math.round(Math.sin(this.angle)),y:Math.round(Math.cos(this.angle))}; // velocity
        this.speed = 1;
        this.maxSpeed = 3;
        this.targetSpeed = 2;
        this.acceleration = 0.1;
        this.state = 0;
        this.firstBrake = true;
        this.detectBox={};
        this.color = "";
        this.pic = imgs[`c${rand(1,4)}`];
        if(rand(0,25)==1) {this.pic=imgs.c5;}
    }
    move(i) {
    	if(this.speed>this.targetSpeed) { // accelerate, decelerate, or do nothing
    		this.speed -= this.acceleration;
    	} else if(this.speed<this.targetSpeed) {
    		this.speed += this.acceleration;
    	}
    	
    	var spd = this.speed;
    	
    	this.speed=spd>this.maxSpeed?this.maxSpeed:spd; // make sure not over speed limit
    	this.speed=spd<0?0:spd; // make sure not reversing
    	
        this.x += this.v.x*this.speed; // move
        this.y += this.v.y*this.speed;

        if(this.targetSpeed==0&&this.state==1) { // attempt to move through inter section
        	calcSpeed(this);
        }
        if(this.state==0) {
        	switch(~~this.angle) {
        		case 0:if(this.y>150) {this.state = 1;calcSpeed(this);}break; // if at intersection, try to go through, else stop
        		case 1:if(this.x>250) {this.state = 1;calcSpeed(this);}break;
        		case 3:if(this.y<450) {this.state = 1;calcSpeed(this);}break;
        		case 4:if(this.x<550) {this.state = 1;calcSpeed(this);}break;
        	}
        } else if(this.state==1) {
        	switch(~~this.angle) {
        		case 0:if(this.y>450) {this.state = 2;}break; // when through intersection, stop being noticed by simulator
        		case 1:if(this.x>550) {this.state = 2;}break;
        		case 3:if(this.y<150) {this.state = 2;}break;
        		case 4:if(this.x<250) {this.state = 2;}break;
        	}
		} else {
        	if(onEdge(this)) { // if of screen, screw off
        		return true;
        	}
        }
        switch(~~this.angle) {
    		case 0:this.detectBox={x:this.x,y:this.y+40,w:10,h:50};break; // detection box for brakeing
    		case 1:this.detectBox={x:this.x+40,y:this.y,w:50,h:10};break;
    		case 3:this.detectBox={x:this.x,y:this.y-40,w:10,h:50};break;
    		case 4:this.detectBox={x:this.x-40,y:this.y,w:50,h:10};break;
    	}
        if(this.state==0&&this.firstBrake) {
        	for(var j=0,l=cars.length;j<l;j++) {
	            if(i != j) {
	                if(collideBox(this.detectBox,cars[j])) { // brake if car is in front
                        this.targetSpeed = 0;
                        this.firstBrake = false;
	                }
	            }
	        }
        } else if(this.state==0&&this.targetSpeed==0) {
            for(var j=0,l=cars.length;j<l;j++) {
	            if(i != j) {
	                if(collideBox(this.detectBox,cars[j])) { // if nothing in front, move
                        this.targetSpeed = 2;
	                }
	            }
	        }
        }
    }
    simMove() {
        if(this.speed>this.targetSpeed) { // accelerate, decelerate, or do nothing
    		this.speed -= this.acceleration;
    	} else if(this.speed<this.targetSpeed) {
    		this.speed += this.acceleration;
    	}
    	
    	var spd = this.speed;
    	
    	this.speed=spd>this.maxSpeed?this.maxSpeed:spd; // make sure not over speed limit
    	this.speed=spd<0?0:spd; // make sure not reversing
    	
        this.x += this.v.x*this.speed; // move
        this.y += this.v.y*this.speed;

        var done = false;
        switch(~~this.angle) {
            case 0:if(this.y>450) {this.state = 2;done = true;}break; // when through intersection, stop being noticed by simulator
            case 1:if(this.x>550) {this.state = 2;done = true;}break;
            case 3:if(this.y<150) {this.state = 2;done = true;}break;
            case 4:if(this.x<250) {this.state = 2;done = true;}break;
        }
        if(done) {
            return true;
        }
    }
    draw() {
        /*if(this.color!="") {
            rect(this.x,this.y,this.w,this.h,this.color);
        } else {
            rect(this.x,this.y,this.w,this.h,this.state==1?"#209920":(this.state==0?"#202099":"#992020")); // car
        }*/
        var tempangle;
        switch(~~this.angle) {
            case 0:tempangle=3.141592653589793;break; // when through intersection, stop being noticed by simulator
            case 1:tempangle=1.5707963267948966;break;
            case 3:tempangle=0;break;
            case 4:tempangle=4.71238898038469;break;
        }
        drawPicRotate(this.x,this.y,30,50,tempangle,this.pic);
        //rect(this.detectBox.x,this.detectBox.y,this.detectBox.w,this.detectBox.h,"#999999"); // detection box
    }
}

function calcSpeed(car) {
    car.targetSpeed=2;
	
	if(simulation(car)) { // true == succes   false == wait for opertunity
		car.targetSpeed=2;
	} else {
		car.targetSpeed=0;
    }
}

function simulation(car) {
    simCars = getCarsInBlock(car);
    testCar = car;
    if(simCars.length==0) {return true;}
    
    var startPoses = [];
    for(var p in simCars) {
        startPoses.push([simCars[p].x,simCars[p].y,simCars[p].speed]);
    }
    let carStart = [testCar.x,testCar.y,testCar.speed];//[testCar.x-testCar.v.x*testCar.speed,testCar.y-testCar.v.y*testCar.speed,testCar.speed+0];
    if(testCar.w>testCar.h) {
        testCar.w+=50;
        testCar.h+=15;
    } else {
        testCar.w+=15;
        testCar.h+=50;
    }
    

    var noHit = true;
    while(true) {
        for(var u=0,ul=simCars.length;u<ul;u++) {
            simCars[u].simMove();
        }
        if(testCar.simMove()) { // move, if out of block, stop
            break;
        }
        for(var r=0,rl=simCars.length;r<rl;r++) { // see if crash happens
            if(collideBox(testCar,simCars[r])) {
                noHit = false;
            }
        }
        if(!noHit) {
            break;
        }
    }
    testCar.x = carStart[0];
    testCar.y = carStart[1];
    testCar.speed = carStart[2];
    
    for(var p in simCars) {
        simCars[p].x = startPoses[p][0];
        simCars[p].y = startPoses[p][1];
        simCars[p].speed = startPoses[p][2];
        simCars[p].state = 1;
    }
    
    testCar.state = 1;
    if(testCar.w>testCar.h) {
        testCar.w-=50;
        testCar.h-=15;
    } else {
        testCar.w-=15;
        testCar.h-=50;
    }
    if(noHit) {
        start("acceleration",car);
        return true;
    } else {
        start("deceleration",car);
        return false;
    }
}

function start(celeration,car) { // accelerate or decelerate cars at the same time
    var dir;
    switch(~~car.angle) {
        case 0: case 3:
            dir = "x";
            break;
        case 1: case 4:
            dir = "y";
            break;
    }
    if(celeration=="acceleration") {
        if(dir=="x") {
            for(var d in cars) {
                if(cars[d].x==car.x) {
                    if(cars[d].targetSpeed==0) { // accelerate cars along same x coordinate
                        cars[d].targetSpeed = 2;
                    }
                }
            }
        } else if(dir=="y") {
            for(var d in cars) {
                if(cars[d].y==car.y) {
                    if(cars[d].targetSpeed==0) { // accelerate cars along same y coordinate
                        cars[d].targetSpeed = 2;
                    }
                }
            }
        }
    } else if(celeration=="deceleration") {
        if(dir=="x") {
            for(var d in cars) {
                if(cars[d].x==car.x) {
                    if(cars[d].state==0&&cars[d].firstBrake==false) { // deccelerate cars along same x coordinate
                        cars[d].targetSpeed = 0;
                    }
                }
            }
        } else if(dir=="y") {
            for(var d in cars) {
                if(cars[d].y==car.y) {
                    if(cars[d].state==0&&cars[d].firstBrake==false) { // deccelerate cars along same y coordinate
                        cars[d].targetSpeed = 0;
                    }
                }
            }
        }
    }
}

function getCarsInBlock(ignore) {
    var simList = [];
    for(var t=0,tl=cars.length;t<tl;t++) {
        var cache = cars[t];
        if(cache.state==1) {
            if(cache.x!=ignore.x && cache.y!=ignore.y) {
                simList.push(cars[t]);
            }
        }
    }
    return simList;
}