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

// colors and scales of image
var preSize=1;
var colors = ["#000000"];
var lastColors  = ["#000000"];
var pic = [];
var lastSize = {x:10,y:10};
genPic();

var bindingState = false;

requestAnimationFrame(update);

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
    var randMax = colors.length-1;
    for(var y=0;y<pic.length;y++) {
        for(var x=0;x<pic[0].length;x++) {
            pic[y][x]=rand(0,randMax);
        }
    }
    drawPic();
}
function rand(min,max) {return Math.floor(Math.random() * (max - min + 1)) + min;}

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

function addColor() {
    var newDiv = document.createElement("div");
    newDiv.id = `c${++idCount}`;
    newDiv.innerHTML=`<input type="color" id="s${idCount}">`;
    document.getElementById("colors").appendChild(newDiv);
    var colorToAdd = colors[colors.length-1];
    colors.push(colorToAdd);
    lastColors.push(colorToAdd);
    document.getElementById(`s${idCount}`).value = colors[colors.length-1];
}

function deleteColor() {
    if(idCount>1) {
        document.getElementById("colors").removeChild(document.getElementById(`c${idCount--}`));
    }
    colors.splice(colors.length-1,1);
    lastColors.splice(lastColors.length-1,1);
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