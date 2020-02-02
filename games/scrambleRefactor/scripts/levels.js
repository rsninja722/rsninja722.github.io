// levels
// contains info for levels, and level loading

// information for levels
// start : coordinate player loads at
// exit : rectangle for end area collision
// cameraAreas : points for the camera to center on
// collision : list of x,y,w,h,x,y,w,h... for rectangle collisions 
var levels = [
    { // grass level
        start:{x:355,y:585},
        exit:{x:996,y:390,w:10,h:129},
        limit:{bottom:496,top:300,left:500,right:800},
        drawCenter:{x:650,y:396},
        collision:[458,628,685,50,660,578,35,53,474,585,35,44,700,629,200,49,949,626,122,49,978,592,83,35,987,560,38,35,913,504,47,16,853,487,75,19,843,472,20,24,777,442,22,21,725,438,100,29,651,448,82,9,588,420,52,66,778,436,25,33,741,431,55,33,588,381,70,13,447,449,260,8,504,418,15,68,450,418,15,68,382,417,15,68,302,418,50,70,285,526,45,170,308,464,45,30,297,517,45,30,292,572,45,30,462,437,280,20,300,367,32,32,301,338,13,31,357,303,33,21,430,290,38,37,537,273,58,17,616,268,47,33,530,216,37,13,628,192,37,13,663,227,37,38,768,292,67,23,940,271,140,18]
    },
    {
        start:{x:0,y:0},
        exit:{x:100,y:-345,w:50,h:50},
        collision:[-12,72,130,79]
    }
];

// keep track of level
var level = 0;

// camera
var cam = {x:500,y:500};

// collision for levels
var blocks = [];
class block {
    constructor(x,y,w,h) {
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
    }
    draw() {
        rect(this.x,this.y,this.w,this.h,"green");
    }
}

// returns the block in the world the rectangle is colliding with
function colliding(rectangle) {
    for(let i=0,l=blocks.length;i<l;i++) {
        if(rectrect(blocks[i],rectangle)) {
            return i;
        }
    }
    return false;
}

// loads in a level
// lvl = index of level in levels array
function switchLevel(lvl) {
    blocks = [];
    var m = levels[lvl];
    player.x = m.start.x;
    player.y = m.start.y;
    player.v.y=0;
    player.v.x=0;
    player.onGround = [0,0,0];
    var c = m.collision;
    for(let i=0,l=c.length;i<l;i+=4) {
        blocks.push(new block(c[i],c[i+1],c[i+2],c[i+3]));
    }
    centerCameraOn(player.x,player.y);
    level = lvl;
}