var track = [
    [0,0],
    [0,-1],
    [0,-2],
    [-1,-2],
    [-2,-2],
    [-2,-3],
    [-2,-4],
    [-3,-4],
    [-4,-4],
    [-4,-3],
    [-4,-2],
    [-4,-1],
    [-4,0],
    [-4,1],
    [-4,2],
    [-3,2],
    [-2,2],
    [-2,1],
    [-1,1],
    [0,1]
];

var bricks = [
    [-0.5,0],
    [-1,0],
    [-1.5,0],
    [-2,0],
    [-2.5,0],
    [-2.5,-0.5],
    [-2.5,-1],
    [-2.5,-1.5],
    [-2.5,-2],
    [-2.5,-2.5],
    [-2.5,0.5],
    [-2.5,1],
    [-2.5,1.5],
]

var tilePos = [];
var trackRects = [];
var brickRects = [];

var car = {
    x:0,
    y:0,
    w:32,
    h:32,
    angle:-Math.PI,
    speed:0,
    MaxSpeed:4,
    acceleration:0.025,
    turningSpeed:0.02,
    frictionMulti:1
};

images = [
    "assets/images/",
    "road.png",
    "car.png",
    "grass.png",
    "bricks.png"
];

sounds = [
    ""
]

for(var i=0;i<track.length;i++) {
    var xCache = track[i][0] * 128;
    var yCache = track[i][1] * 128;
    for(var y=0;y<8;y++) {
        for(var x=0;x<8;x++) {
            tilePos.push([xCache+(x*16),yCache+(y*16)]);
        }   
    }

    trackRects.push({x:xCache+56,y:yCache+56,w:128,h:128});
}

for(var i=0;i<bricks.length;i++) {
    var xCache = bricks[i][0] * 128;
    var yCache = bricks[i][1] * 128;

    brickRects.push({x:xCache,y:yCache,w:64,h:64});
}

function update() {
    centerCameraOn(car.x,car.y);
    camera.angle = car.angle+Math.PI;

    handleInput();

    var vel = velocity(car.angle);
    for(var i=0;i<brickRects.length;i++) {
        if(rectrect(brickRects[i],car)) {
            car.speed*=-1;
            car.x += vel.x * car.speed;
            car.y += vel.y * car.speed;
            car.speed=0;
            break;
        }
    }
    car.x += vel.x * car.speed;
    car.y += vel.y * car.speed;
}

function draw() {
    if(screenSize=="1:1") {
        canvasScale = 2;
    }
    var xlim = Math.round((car.x-500)/100)*100;
    var ylim = Math.round((car.y-500)/100)*100;
    for(var x=xlim;x<xlim+1000;x+=100) {
        for(var y=ylim;y<ylim+1000;y+=100) {
            img(sprites.grass,x,y);
        }
    }

    for(var i=0;i<tilePos.length;i++) {
        var temp = tilePos[i];
        img(sprites.road,temp[0],temp[1]);
    }
    for(var i=0;i<brickRects.length;i++) {
        var temp = brickRects[i];
        img(sprites.bricks,temp.x,temp.y);
    }
}

function absoluteDraw() {
    img(sprites.car,150,150);
}


setup(60);