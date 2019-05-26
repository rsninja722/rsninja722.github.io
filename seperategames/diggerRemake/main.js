gameScale = 2;
backgroundColor = "#000000";

images = [
    "s/",
    "dirt.png",
    "stone.png",
    "deepstone.png",
    "heck.png",
    "bedrock.png",
    "coal.png",
    "iron.png",
    [
        "drill",
        "Dig0.png",
        "Dig1.png",
        "Move0.png",
        "Move1.png",
        "Move2.png",
        "left0.png",
        "left1.png",
        "left2.png" 
    ],
    "BKG.png",
    "MDG.png",
    "FRG.png"
];

var player = {
    x:20,
    y:0,
    movement:["down",0]
}

var world = [];
var ores = [];
var layers = ["dirt","dirtstone","stone","stone","stonedeepstone","deepstone","deepstone","deepstoneheck","heck"];
var blocks = {
    dirt:0,
    stone:1,
    deepstone:2,
    heck:3,
    bedrock:4,
    coal:5,
    iron:6
};
var blockTextures = Object.keys(blocks);


addChunk();
setInterval(physics,16);
startUpdate("auto");

function update() {
    drawSprite(s.BKG,400+player.x/1.5,-105);
    drawSprite(s.MDG,300+player.x/2,-105);
    var leftDrawLimit = player.x-110;
    var rightDrawLimit =  player.x+110;
    for(var w=0;w<world.length;w++) {
        var worldw = world[w];
        //add only drawing if on screen
        if(!(w*160<player.y-310)&&!(false)) {
            for(var x=0;x<64;x++) {
                if((x*10>leftDrawLimit)&&(x*10<rightDrawLimit)) {
                    for(var y=0;y<16;y++) {
                        if(worldw[y][x]>49) { // if block is a background
                            drawSpriteEffectBasic(s[`${blockTextures[worldw[y][x]-50]}`],x*10,(y*10)+(w*160),[-25,-25,-25]);
                        } else {
                            drawSprite(s[`${blockTextures[worldw[y][x]]}`],x*10,(y*10)+(w*160));
                        }
                    }
                }
            }
        }
    } 
    //11
    var startpos = ~~(player.y/10)-15 > -1 ? ~~(player.y/10)-15 : -1;
    for(var y=startpos,ey=(~~player.y/10)+150;y<ey;y++) {
        for(var x=1;x<12;x++) {
            if((-x*10>leftDrawLimit)&&(-x*10<rightDrawLimit)) {
                drawSprite(s.bedrock,-x*10,y*10);
            }
        }
        for(var x=64;x<75;x++) {
            if((x*10>leftDrawLimit)&&(x*10<rightDrawLimit)) {
                drawSprite(s.bedrock,x*10,y*10);
            }
        }
    }
    
    for(var o=0;o<ores.length;o++) {
        if(!(o*160<player.y-310)&&!(false)) {
            var p = ores[o];// pointer thing
            for(var c=0;c<p.length;c++) {
                var xpos = p[c][0]*10;
                if((xpos>leftDrawLimit)&&(xpos<rightDrawLimit)) {
                    drawSprite(s[`${blockTextures[p[c][2]]}`],p[c][0]*10,(p[c][1]*10));
                }
            }
        }
    }
    if(player.y>-1) {
        var playerRot;
        switch(player.movement[0]) {
            case "up": playerRot = 0; break;
            case "right": playerRot = -Math.PI/2; break;
            case "down": playerRot = Math.PI; break;
            case "left": playerRot = Math.PI/2; break;
        }
        drawSpriteSnapToGrid(s[`drillMove${(~~(player.movement[1]/2))%3}`],player.x,player.y,playerRot,1);
    } else {
        var dir;
        switch(player.movement[0]) {
            case "right": dir = 1; break;
            case "left": dir = 0; break;
        }
        drawSpriteAdv(s[`drillleft${(~~(player.movement[1]/2))%3}`],player.x,player.y,0,1,dir);
    }
}

function physics() {
    if(player.movement[1]) {
        switch(player.movement[0]) {
            case "up": player.y--; break;
            case "right": player.x++; break;
            case "down": player.y++; break;
            case "left": player.x--; break;
        }
        player.movement[1]--;
        if(player.movement[1]==0&&player.y>-1) {
            var p = ores[~~(player.y/160)];
            var pos = {x:Math.round(player.x/10),y:Math.round(player.y/10)};
            for(let i=0;i<p.length;i++) {
                if(pos.x==p[i][0]&&pos.y==p[i][1]) {
                    p.splice(i,1);
                    break;
                }
            }
            var curblock = world[~~(player.y/160)][(player.y/10)%16][pos.x];
            if(curblock<50) {
                world[~~(player.y/160)][(player.y/10)%16][pos.x]=parseInt(`5${curblock}`);
            }
        }
    } else {
        if((keyDown[k.w]||keyDown[k.UP])&&player.y!=-10) {player.movement=["up",10];}
        if(keyDown[k.s]||keyDown[k.DOWN]) {player.movement=["down",10];}
        if((keyDown[k.a]||keyDown[k.LEFT])&&player.x!=0) {player.movement=["left",10];}
        if((keyDown[k.d]||keyDown[k.RIGHT])&&player.x!=630) {player.movement=["right",10];}
    }
    camera.x = ~~(-player.x + cw/2);
    camera.y = ~~(-player.y + ch/2);
    if(player.y>(world.length*160-200)) {addChunk();}
}

function addChunk() {
    if(world.length==layers.length) {
        layers.push("heck");
    }
    var layer = layers[world.length];
    var ypos = world.length;
    var chunk = [];
    var oreChunk = [];
    for(var y=0;y<16;y++) {
        var hslice = [];
        for(var x=0;x<64;x++) {
            switch(layer) {
                case "dirt":
                    hslice.push(blocks.dirt);
                    if(rand(0,10)==5) {oreChunk.push([x,y+(ypos*16),blocks.coal]);}
                    break;
                case "dirtstone":
                    if(rand(0,~~((15-y)/2))==0) {
                        hslice.push(blocks.stone);
                    } else {
                        hslice.push(blocks.dirt);
                    }
                    if(rand(0,10)==5) {oreChunk.push([x,y+(ypos*16),blocks.coal]);}
                    break;
                case "stone":
                    hslice.push(blocks.stone);
                    if(rand(0,10)==5) {oreChunk.push([x,y+(ypos*16),blocks.coal]);}
                    if(rand(0,20)==5) {oreChunk.push([x,y+(ypos*16),blocks.iron]);}
                    break;
                case "stonedeepstone":
                    if(rand(0,~~((15-y)/2))==0) {
                        hslice.push(blocks.deepstone);
                    } else {
                        hslice.push(blocks.stone);
                    }
                    if(rand(0,15)==5) {oreChunk.push([x,y+(ypos*16),blocks.coal]);}
                    if(rand(0,17)==5) {oreChunk.push([x,y+(ypos*16),blocks.iron]);}
                    break;  
                case "deepstone":
                    hslice.push(blocks.deepstone);
                    if(rand(0,20)==5) {oreChunk.push([x,y+(ypos*16),blocks.coal]);}
                    if(rand(0,14)==5) {oreChunk.push([x,y+(ypos*16),blocks.iron]);}
                    break;
                case "deepstoneheck":
                    if(rand(0,~~((15-y)/2))==0) {
                        hslice.push(blocks.heck);
                    } else {
                        hslice.push(blocks.deepstone);
                    }
                    if(rand(0,25)==5) {oreChunk.push([x,y+(ypos*16),blocks.coal]);}
                    if(rand(0,12)==5) {oreChunk.push([x,y+(ypos*16),blocks.iron]);}
                    break;
                case "heck":
                    hslice.push(blocks.heck);
                    if(rand(0,30)==5) {oreChunk.push([x,y+(ypos*16),blocks.coal]);}
                    if(rand(0,10)==5) {oreChunk.push([x,y+(ypos*16),blocks.iron]);}
                    break;
            }
        }
        chunk.push(hslice.slice());
    }
    world.push(chunk.slice());
    ores.push(oreChunk.slice());
    var p = ores[ores.length-1];//pointer thing
    for(let i=0;i<p.length;i++) {
        for(let j=0;j<p.length;j++) {
            if(i==j) {continue;}
            if(p[i][0]==p[j][0] && p[i][1]==p[j][1]) {
                p.splice(i,1);
                i--;
                break;
            }
        }
    }
}