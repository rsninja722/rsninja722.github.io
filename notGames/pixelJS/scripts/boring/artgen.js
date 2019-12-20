var artIdCount = 0;
var selectedColor = 0;

// big screen
var artGenCanvas = document.getElementById("artMain");
var artGenCtx = artGenCanvas.getContext("2d");

// prveiw of sprite
var precvs = document.getElementById("preveiw");
var preartGenCtx = precvs.getContext("2d");
precvs.width = 10;
precvs.height = 10;

// colors and scales of image
var preSize=1;
var colors = [];
var lastColors  = [];
var pic = [];
var lastSize = {x:10,y:10};
var cursorTime = 0;
genPic();

var addedGroups = [];

var bindingState = false;

requestAnimationFrame(updateArtGen);

// main loop
function updateArtGen() {
    // update color selectors
    if(document.getElementById(`s${selectedColor}`) != undefined) {
        document.getElementById(`s${selectedColor}`).style.backgroundColor = color.hex;
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
        colors[i] = document.getElementById(`s${i+1}`).style.backgroundColor;
        if(colors[i]!=lastColors[i]) {
            draw=true;
            lastColors[i]=colors[i];
        }
    }
    if(draw) {drawPic();}

    requestAnimationFrame(updateArtGen);
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
            preartGenCtx.fillStyle = colors[pic[y][x]];
            preartGenCtx.fillRect(x*preSize,y*preSize,preSize,preSize);
        }
    }
    var yl=pic.length;
    var xl=pic[0].length;
    for(var y=0;y<artGenCanvas.height/preSize;y++) {
        for(var x=0;x<artGenCanvas.width/preSize;x++) {
            artGenCtx.fillStyle = colors[pic[y%yl][x%xl]];
            artGenCtx.fillRect(x*preSize,y*preSize,preSize,preSize);
        }
    }
}

//resizing artGenCanvas and variables
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

//resizing artGenCanvas
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
    if(artIdCount>1) {
        document.getElementById("groups").removeChild(document.getElementById(`gs${gid}`));
    }
}

function addColor() {
    var newDiv = document.createElement("div");
    newDiv.id = `c${++artIdCount}`;
    newDiv.innerHTML=`<div class="color" id="s${artIdCount}"> </div> <input type="number" class="rngHide" id="r${artIdCount}" value="1"> <input type="number" class="groupHide" id="g${artIdCount}" value="0">`;
    document.getElementById("colors").appendChild(newDiv);
    var colorToAdd = colors.length === 0 ? "#000000" : colors[colors.length-1];
    colors.push(colorToAdd);
    lastColors.push(colorToAdd);
    document.getElementById(`s${artIdCount}`).style.backgroundColor = colorToAdd;
    document.getElementById(`s${artIdCount}`).onclick = function() {
        for(var i=0;i<colors.length;i++) {
            document.getElementById(`s${i+1}`).style.borderColor = "";
        }
        this.style.borderColor = "#39b7bd";
        selectedColor = this.id[1];
    }
}

function deleteColor() {
    if(artIdCount>1) {
        document.getElementById("colors").removeChild(document.getElementById(`c${artIdCount--}`));
        colors.splice(colors.length-1,1);
        lastColors.splice(lastColors.length-1,1);
    }
    
}

function importPicture() {
    addLayer(curLayer,"texture");
    layers[curLayer].ctx.drawImage(artGenCanvas,0,0);
    htmlUI.artGen.state = false;
}

addColor();