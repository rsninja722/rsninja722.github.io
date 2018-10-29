var canvas = document.getElementById("cvs");
var ctx = canvas.getContext("2d");

var cw;
var ch;

var timer = 0;
var player = [];
var bads = [];
var bullets = [];
var particles = [];
player.push(new ship(canvas.width/2,canvas.height-20,p.ship,1,12,12,2,7));
spawnBads();

addListenersTo(canvas);

setInterval(update,16);
requestAnimationFrame(draw);



function setAngle(number) {
    return number * Math.PI / 180;
}

function rand(max,min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shoot(obj,type) {
    for(let i=0;i<shotTypes[type-1].length;i++) {
    var loc = type-1;
    
    let angle;
    
    var temptype = shotTypes[loc][i];
    switch(obj.classType) {
        case "ship":
            angle=0+temptype.angle;
            break;
        case "bad":
            angle=180+temptype.angle;
            break;
    }
    bullets.push(new bullet(obj.x+temptype.x,obj.y+temptype.y,setAngle(angle),temptype.pic,temptype.speed,temptype.w,temptype.h,temptype.damage,temptype.pen))
    }
}
function pic(x,y,w,h,pic) {
    ctx.drawImage(pic,x-(w/2),y-(h/2));
}

function collideRect(object1,object2) {
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