//TODO
    //coorect key ids
    // download button
    //make thing
var idCount = 1;
addListenersTo(document);

// big screen
var canvas = document.getElementById("main");
var ctx = canvas.getContext("2d");

// prveiw of sprite
var precvs = document.getElementById("preveiw");
var prectx = precvs.getContext("2d");
precvs.width = 10;
precvs.height = 10;

precvs.addEventListener("mousedown",mouseDown);
precvs.addEventListener("mouseup",mouseUp);
precvs.addEventListener("mousemove",mouseMove);
precvs.addEventListener("contextmenu",rightClick);

var press = {l:0,r:0};
var pos = {x:0,y:0};
var drawingColor = 0;

function mouseDown(e) {
    if(e.button==0) {press.l=1;}
    if(e.button==2) {press.r=1;}
}
function rightClick(e) {
    e.preventDefault();
}
function mouseUp(e) {
    if(e.button==0) {press.l=0;}
    if(e.button==2) {press.r=0;}
}
function mouseMove(e) {
    pos.x=Math.floor(e.offsetX/preSize);
    pos.y=Math.floor(e.offsetY/preSize);
}

// colors and scales of image
var preSize=1;
var colors = ["#000000"];
var lastColors  = ["#000000"];
var pic = [];
var lastSize = {x:10,y:10};
genPic();

var addedGroups = [];

var bindingState = false;

requestAnimationFrame(update);
setInterval(input,4);

function input() {
    if(press.r) {
        drawingColor = pic[pos.y][pos.x];
    }
    if(press.l) {
        pic[pos.y][pos.x] = drawingColor;
        drawPic();
    }
}

// main loop
function update() {
    // input
    
        // add/delete color
        if(keyPress[k.q]) {deleteColor();}
        if(keyPress[k.w]) {addColor();}

        // increase/decrease width/hight
        if(keyPress[k.o]) {document.getElementById("imgw").value++;}
        if(keyPress[k.l]) {document.getElementById("imgw").value--;}

        if(keyPress[k.p]) {document.getElementById("imgh").value++;}
        if(keyPress[k.SEMICOLON]) {document.getElementById("imgh").value--;}

        if(keyPress[k.PERIOD]) {document.getElementById("psize").value++;}
        if(keyPress[k.COMMA]) {document.getElementById("psize").value--;if(document.getElementById("psize").value<1){document.getElementById("psize").value=1;}}
        
        // generate
        if(keyPress[k.g]) {gen();}

        //color hotkeys
        for(var i=0;i<9;i++) {
            if(keyPress[k[`${i+1}`]]) {
                drawingColor = i;
            }
        }
    
    // type handling
    if(document.getElementById("genSelect").value=="random + probability") {
        for(var i=0;i<colors.length;i++) {
            document.getElementById(`r${i+1}`).className = "rngShow";
        }
    } else {
        for(var i=0;i<colors.length;i++) {
            document.getElementById(`r${i+1}`).className = "rngHide";
        }
    }
    if(document.getElementById("genSelect").value=="groups") {
        for(var i=0;i<colors.length;i++) {
            document.getElementById(`g${i+1}`).className = "groupShow";
        }
    } else {
        for(var i=0;i<colors.length;i++) {
            document.getElementById(`g${i+1}`).className = "groupHide";
        }
    }
    
    //add and delete group ui
    var groups = getGroups();
    for(var i=0;i<groups.length;i++) {
        if(groups[i]>0) {
            if(!addedGroups.includes(groups[i])) {
                addGroup(groups[i]);
                addedGroups.push(groups[i]);
            }
        }
    }

    for(var i=0;i<addedGroups.length;i++) {
        if(!groups.includes(addedGroups[i])) {
            deleteGroup(addedGroups[i]);
            addedGroups.splice(i,1);
            i--;
        }
    }

    //update selected color
    document.getElementById("tbl").style = `border: 1px solid #aaaaaa; width: 10px; height: 10px; background-color: ${colors[drawingColor]}`;
    
    // detecting resizing
    var imgw = document.getElementById("imgw").value;
    var imgh = document.getElementById("imgh").value;

    if(lastSize.x!=imgw || lastSize.y!=imgh) {
        genPic();
    }

    var tempSize = document.getElementById("psize").value;
    if(tempSize!=preSize) {
        preSize=tempSize;
        if(preSize<1) {
            preSize=1;
            document.getElementById("psize").value = 1;
        }
        resizePic();
        drawPic();
    }

    // re draw when color changes
    var draw = false;
    for(var i=0;i<colors.length;i++) {
        colors[i] = document.getElementById(`s${i+1}`).value;
        if(colors[i]!=lastColors[i]) {
            draw=true;
            lastColors[i]=colors[i];
        }
    }
    if(draw) {drawPic();}


    resetInput()
    requestAnimationFrame(update);
}

// generate new pattern
function gen() {
    var genMode = document.getElementById("genSelect").value;
    if(genMode == "random + probability") { // random with probability
        var rng = getRng();
        var rngBase = 100/colors.length;
        rng = rng.map(x => ~~(x * rngBase));

        for(var i in rng) {
            if(i!=0) {
                rng[i]+=rng[i-1];
            }
        }

        var randMax = rng[rng.length-1];

        for(var y=0;y<pic.length;y++) {
            for(var x=0;x<pic[0].length;x++) {
                pic[y][x]=randPixel(randMax,rng);
            }
        }
    } else if(genMode == "groups") {
        var groupData = getGroupData();
        var randMax = colors.length-1;
        var groups=getGroups();
        var validColors = [];
        for(var i=0;i<groups.length;i++) {
            if(groups[i]==0) {
                validColors.push(i);
            }
        }
        for(var y=0;y<pic.length;y++) {
            for(var x=0;x<pic[0].length;x++) {
                pic[y][x]=validColors[rand(0,validColors.length-1)]; //prevernt everything
                var gkeys = Object.keys(groupData);
                
                for(var i=0;i<gkeys.length;i++) {//console.log(groupData[gkeys[0]].chance);
                    if(rand(0,groupData[gkeys[i]].chance)==1) {
                        //console.log("fuck off")
                        var size = rand(1,groupData[gkeys[i]].max);
                        var xpos=x;var ypos=y;
                        var gcolors=[];
                        for(var j=0;j<groups.length;j++) {
                            if(groups[j]==gkeys[i]) {
                                gcolors.push(j);
                            }
                        }
                        for(var j=0;j<size;j++) {
                            pic[ypos][xpos]=gcolors[rand(0,gcolors.length-1)];
                            xpos+=rand(-1,1);
                            ypos+=rand(-1,1);
                            if(xpos>pic[0].length-1) {xpos=pic[0].length-1;}
                            if(ypos>pic.length-1) {ypos=pic.length-1;}
                            if(xpos<0) {xpos=0;}
                            if(ypos<0) {ypos=0;}
                        }
                    }
                }
            }
        }
    } else { // random
        var randMax = colors.length-1;
        for(var y=0;y<pic.length;y++) {
            for(var x=0;x<pic[0].length;x++) {
                pic[y][x]=rand(0,randMax);
            }
        }
    }
    
    drawPic();
}
function rand(min,max) {return Math.floor(Math.random() * (max - min + 1)) + min;}

function randPixel(range,rng) {
    var randNum = rand(0,range);
    for( var j=0;j<rng.length;j++) {
        if(randNum<=rng[j]) {
            return j;
        }
    }
}

function getRng() {
    var returnArray = [];
    for(var i=0;i<colors.length;i++) {
        returnArray.push(parseFloat(document.getElementById(`r${i+1}`).value));
    }
    return returnArray;
}

function getGroups() {
    var returnArray = [];
    for(var i=0;i<colors.length;i++) {
        returnArray.push(parseFloat(document.getElementById(`g${i+1}`).value));
    }
    return returnArray;
}

function getGroupData() {
    var returnArray = {};
    for(var j=0;j<addedGroups.length;j++) {
        returnArray[`${addedGroups[j]}`]=({chance:parseInt(document.getElementById(`gc${addedGroups[j]}`).value),max:parseInt(document.getElementById(`gms${addedGroups[j]}`).value)});
    }
    return returnArray;
}

//draw main screen and preveiw
function drawPic() {
    for(var y=0;y<pic.length;y++) {
        for(var x=0;x<pic[0].length;x++) {
            prectx.fillStyle = colors[pic[y][x]];
            prectx.fillRect(x*preSize,y*preSize,preSize,preSize);
        }
    }
    var yl=pic.length;
    var xl=pic[0].length;
    for(var y=0;y<canvas.height/preSize;y++) {
        for(var x=0;x<canvas.width/preSize;x++) {
            ctx.fillStyle = colors[pic[y%yl][x%xl]];
            ctx.fillRect(x*preSize,y*preSize,preSize,preSize);
        }
    }
}

//resizing canvas and variables
function genPic() {
    var imgw = document.getElementById("imgw").value;
    var imgh = document.getElementById("imgh").value;

    precvs.width = imgw*preSize;
    precvs.height = imgh*preSize;
    pic=[];
    var a=[];
    for(var x=0;x<imgw;x++) {
        a.push(0);
    }
    for(var y=0;y<imgh;y++) {
        pic.push(a.slice());
    }
    
    lastSize.x=imgw;
    lastSize.y=imgh;
}

//resizing canvas
function resizePic() {
    var imgw = document.getElementById("imgw").value;
    var imgh = document.getElementById("imgh").value;
    precvs.width = imgw*preSize;
    precvs.height = imgh*preSize;
}

// scale up
function plus() {
    preSize++;
    document.getElementById("psize").value = preSize;
    resizePic();
    drawPic();
}

//scale down
function minus() {
    preSize--;
    if(preSize<1) {
        preSize=1;
    }
    document.getElementById("psize").value = preSize;
    resizePic();
    drawPic();
}

function addGroup(gid) {
    var newDiv = document.createElement("div");
    newDiv.id = `gs${gid}`; //group settings
    newDiv.innerHTML=`${gid}: chance<input type="number" class="groupShow" id="gc${gid}"> max size<input type="number" class="groupShow" id="gms${gid}">`;
    document.getElementById("groups").appendChild(newDiv);
}

function deleteGroup(gid) {
    if(idCount>1) {
        document.getElementById("groups").removeChild(document.getElementById(`gs${gid}`));
    }
}

function addColor() {
    var newDiv = document.createElement("div");
    newDiv.id = `c${++idCount}`;
    newDiv.innerHTML=`<input type="color" id="s${idCount}"> <input type="number" class="rngHide" id="r${idCount}" value="1"> <input type="number" class="groupHide" id="g${idCount}" value="0">`;
    document.getElementById("colors").appendChild(newDiv);
    var colorToAdd = colors[colors.length-1];
    colors.push(colorToAdd);
    lastColors.push(colorToAdd);
    document.getElementById(`s${idCount}`).value = colors[colors.length-1];
}

function deleteColor() {
    if(idCount>1) {
        document.getElementById("colors").removeChild(document.getElementById(`c${idCount--}`));
        colors.splice(colors.length-1,1);
        lastColors.splice(lastColors.length-1,1);
    }
    
}

function toggle() {
    if(bindingState) {
        document.getElementById("keyBindings").style = "position: absolute;left:100px;top:370px;display:none;";
        bindingState=false;
    } else {
        document.getElementById("keyBindings").style = "position: absolute;left:100px;top:370px;";
        bindingState=true;
    }
}