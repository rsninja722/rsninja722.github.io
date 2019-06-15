var canvas = document.getElementById("cvs");
var ctx = canvas.getContext("2d");
//                                          http://www.cs.utexas.edu/~aim/
var cam = {x:0,y:0};

var imgs = {
    c1: document.getElementById("1"),
    c2: document.getElementById("2"),
    c3: document.getElementById("3"),
    c4: document.getElementById("4"),
    c5: document.getElementById("5"),
    back: document.getElementById("back"),
}

requestAnimationFrame(draw);
function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);

	rect(400,300,300,300,"#202020");
    
    ctx.drawImage(imgs.back,0,0);

    for(var i in cars) {
        cars[i].draw();
    }

    requestAnimationFrame(draw);
}

setInterval(update,16.6);
function update() {
    for(var i in cars) {
        if(cars[i].move(i)) {
        	cars.splice(i,1);
        	i--;
        }
    }
    for(var i=0,il=cars.length;i<il;i++) { // see if crash happens
        for(var j=0,jl=cars.length;j<jl;j++) {
            if(i != j) {
                if(collideBox(cars[i],cars[j])) {
                    deleteAllCars();
                    cars[i].color = "#999920";
                    cars[j].color = "#999920";
                    console.log("fail");
                }
            }
        }
    }
    spawnCar();
}

var nextSpawnTime=0;
function spawnCar() {
    if(Date.now()>=nextSpawnTime) {
        var direction;
        var pos = {x:0,y:-100};
        var size;
        switch(rand(0,3)) {
            case 0:
                direction = 0;
                pos.x = rand(0,1) ? 340 : 380;
                size = {w:30,h:50};
                break;
            case 1:
                direction = 90;
                pos.y = rand(0,1) ? 320 : 360;
                size = {w:50,h:30};
                break;
            case 2:
                direction = 180;
                pos.x = rand(0,1) ? 420 : 460;
                pos.y = 700;
                size = {w:30,h:50};
                break;
            case 3:
                direction = 270;
                pos.y = rand(0,1) ? 280 : 240;
                pos.x = 800;
                size = {w:50,h:30};
                break;
        }
        cars.push(new car(pos.x,pos.y,direction,size.w,size.h));
        cars[cars.length-1].x += cars[cars.length-1].v.x * 50;
        cars[cars.length-1].y += cars[cars.length-1].v.y * 50;
        var good = true;
        for(var h=0;h<cars.length-1;h++) {
            if(collideBox(cars[h],cars[cars.length-1])) {
                cars.splice(cars.length-1,1);
                good = false;
                break;
            }
        }
        if(good) {
            cars[cars.length-1].x -= cars[cars.length-1].v.x * 50;
            cars[cars.length-1].y -= cars[cars.length-1].v.y * 50;
        }
        nextSpawnTime = Date.now() + 400//rand(250,500);
    }
}

function deleteAllCars() {
    while(cars.length != 0) {
        cars.splice(0,1);
    }
}

//utility
function drawRectRotate(x,y,w,h,color,angl) {
    ctx.setTransform(1, 0, 0, 1, x+cam.x, y+cam.y);
    ctx.rotate(angl);
    ctx.fillStyle = color;
    ctx.fillRect(-w/2,-h/2,w,h);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}
function rect(x,y,w,h,c) {
    ctx.fillStyle = c;
    ctx.fillRect(x-w/2,y-h/2,w,h);
}
function degToRad(number) {
    return number * Math.PI / 180;
}
function rand(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function collideBox(object1,object2) {
    if(object1.x + object1.w/2 >= object2.x - object2.w/2 &&
       object1.x - object1.w/2 <= object2.x + object2.w/2 &&
       object1.y + object1.h/2 >= object2.y - object2.h/2 &&
       object1.y - object1.h/2 <= object2.y + object2.h/2) {
           return true;
       }
}
function drawPicRotate(x,y,w,h,angl,pic) {
    ctx.setTransform(1, 0, 0, 1, x, y);
    ctx.rotate(angl);
    ctx.drawImage(pic,-w/2,-h/2);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}
function twoPointsDistance(object1,object2) {
    var one = (object2.x - object1.x);
    var two = (object2.y - object1.y);
    return Math.sqrt((one*one)+(two*two));
}
function onEdge(point) {
	if(point.x>canvas.width || point.x<0 || point.y>canvas.height || point.y<0) {
		return true;
	}
}