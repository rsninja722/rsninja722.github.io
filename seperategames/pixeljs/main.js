var canvas = document.getElementById("cvs");
var ctx = canvas.getContext("2d");
addListenersTo(canvas);


canvas.width = window.innerWidth-50; // fill page with canvas
canvas.height = window.innerHeight-50;
var cw = canvas.width;
var ch = canvas.height;

var screenData=ctx.getImageData(0,0,canvas.width,canvas.height);
var screenGrid=[];

var pic={w:"",h:"",data:[]};
var tans={x:0,y:0,scale:0};
var curColor = {
    main:[0,0,0,0]
}
var uistates={
    newPic:false,
    palette:false
};
var focus = {
    newPic: {
        width:true,
        height:false,
        create:false   
    }
}

var typednumber=false;
function handleTyping() {
    if(keyPress[k["0"]]) {typednumber="0";}
    else if(keyPress[k["1"]]) {typednumber="1";}
    else if(keyPress[k["2"]]) {typednumber="2";}
    else if(keyPress[k["3"]]) {typednumber="3";}
    else if(keyPress[k["4"]]) {typednumber="4";}
    else if(keyPress[k["5"]]) {typednumber="5";}
    else if(keyPress[k["6"]]) {typednumber="6";}
    else if(keyPress[k["7"]]) {typednumber="7";}
    else if(keyPress[k["8"]]) {typednumber="8";}
    else if(keyPress[k["9"]]) {typednumber="9";}
    else {typednumber=false;}
}

function generatePicture() {
    pic.w=parseInt(pic.w);
    pic.h=parseInt(pic.h);
    for(var y=0;y<pic.h;y++) { // make 2d array of colors 
        let a = [];
        for(var x=0;x<pic.w;x++) {
            a.push([0,0,0,0]);
        }
        pic.data.push(a.slice());
    }
}

function update() {
    canvas.width = window.innerWidth-50; // resize canvas
    canvas.height = window.innerHeight-50;
    cw = canvas.width;
    ch = canvas.height;

    
    handleTyping();
    if(uistates.newPic) { // logic for picture creation window
        if(focus.newPic.create) {
            if(keyPress[k.ENTER]) {
                resetFocus();
                uistates.newPic=false;
                generatePicture();
                uistates.palette=true;
            }
        }
        if(focus.newPic.height) {
            if(typednumber) {pic.h+=typednumber;if(pic.h.length>5) {pic.h = pic.h.substring(0, pic.h.length - 1);}}
            if(keyPress[k.BACKSPACE]) {pic.h = pic.h.substring(0, pic.h.length - 1);}
            if(keyPress[k.ENTER]) {resetFocus();focus.newPic.create=true;}
        }
        if(focus.newPic.width) {
            if(typednumber) {pic.w+=typednumber;if(pic.w.length>5) {pic.w = pic.w.substring(0, pic.w.length - 1);}}
            if(keyPress[k.BACKSPACE]) {pic.w = pic.w.substring(0, pic.w.length - 1);}
            if(keyPress[k.ENTER]) {resetFocus();focus.newPic.height=true;}
        }
    }
    draw();
    resetInput();
    requestAnimationFrame(update);
}

window.addEventListener("resize",resizeScreen);
function resizeScreen() { // when window is resized, regenerate imgdata
    screenData=ctx.getImageData(0,0,canvas.width,canvas.height); // remake data
    screenGrid=[];
    let a=[];
    for(let i=0;i<canvas.width;i++){a.push([0,0,0,0]);}
    for(let i=0;i<canvas.height;i++){screenGrid.push(a.slice());}console.log(screenGrid);
}
// for imgdata
let a=[];
for(let i=0;i<canvas.width;i++){a.push([0,0,0,0]);}
for(let i=0;i<canvas.height;i++){screenGrid.push(a.slice());}

uistates.newPic=true; // make picure creation window
changePallette(); // make color selector palette thing

requestAnimationFrame(update);