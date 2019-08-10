function handleInput() {
    var anyInput=false;
    var div = car.turningSpeed/(Math.abs(car.speed)/8<1?1:Math.abs(car.speed)/8)==Infinity?0:car.turningSpeed/(Math.abs(car.speed)/8<1?1:Math.abs(car.speed)/8);
    div /= car.frictionMulti;
    var multi = car.turningSpeed*Math.abs(car.speed);
    multi /= car.frictionMulti;
    if(keyDown[k.w]||keyDown[k.UP]) {
        car.speed += car.acceleration;
        anyInput=true;
    }
    if(keyDown[k.s]||keyDown[k.DOWN]) {
        if(car.speed>0) {
            car.speed -= car.acceleration*2;
        } else {
            car.speed -= car.acceleration/2;
        }
        anyInput=true;
    }
    if(keyDown[k.a]||keyDown[k.LEFT]) {
        if(car.speed<1&&car.speed>-1) {
            car.angle += multi;
        } else {
            car.angle += div;
        }
    }
    if(keyDown[k.d]||keyDown[k.RIGHT]) {
        if(car.speed<1&&car.speed>-1) {
            car.angle -= multi;
        } else {
            car.angle -= div;
        }
    }
    if(!anyInput) {
        if(car.speed>0) {
            car.speed -= car.acceleration*car.frictionMulti/2;
        }
        if(car.speed<0) {
            car.speed += car.acceleration/2;
        }
        if(car.speed<0.05&&car.speed>-0.05) {car.speed=0;}
    }
    car.MaxSpeed=2;
    car.frictionMulti=2;
    for(var i=0;i<trackRects.length;i++) {
        if(rectpoint(trackRects[i],car)) {
            car.MaxSpeed=4;
            car.frictionMulti=1;
        }
    }
    if(car.speed>car.MaxSpeed) {
        car.speed -= car.acceleration*4;
    }
}