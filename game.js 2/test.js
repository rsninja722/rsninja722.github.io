var pic = document.getElementById("testpic");
var point = {x:400,y:300};
var i=0;
setup();
addListenersTo(canvases.cvs);

function input() {
    // if(keyDown[k.LEFT]) {point.x-=5;}
    // if(keyDown[k.RIGHT]) {point.x+=5;}
    // if(keyDown[k.UP]) {point.y-=5;}
    // if(keyDown[k.DOWN]) {point.y+=5;}
    if(keyDown[k.LEFT]) {moveCamera(-5,0);}
    if(keyDown[k.RIGHT]) {moveCamera(5,0);}
    if(keyDown[k.UP]) {moveCamera(0,-5);}
    if(keyDown[k.DOWN]) {moveCamera(0,5);}

    if(keyPress[k.EQUALS]) {camera.zoom++;}
    if(keyPress[k.MINUS]) {camera.zoom--;}

    if(keyDown[k.q]) {camera.angle-=0.01;}
    if(keyDown[k.e]) {camera.angle+=0.01;}
    camera.zoom+=scroll/10
    //centerCameraOn(point.x,point.y);
}

function update() {
    i+=0.01;
}

function draw() {
    var j=0;
    for(var x=-200;x<1000;x+=(48+x/10) + Math.sin(i)*2) {
        for(var y=-200;y<1000;y+=(48+x/10) - Math.cos(i)*4) {
            //if(!(j%5)) {
                imgRot(pic,x,y,i);
            // } else {
            //     img(pic,x,y);
            // }
            j++;
        }
    }
}