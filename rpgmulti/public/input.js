/*
    1. use addListenersTo to add listeners to your canvas
    2. in your game loop, have resetInput() at the end 
    3. if you want to remove the listeners use removeListenersFrom and pass in what you passed in at step one
        what are the variables?
        keyPress - when a key is pressed once (keycodes are used) eg: if(keyPress[39]) {}
        keyDown - when a key is held down (keycodes are used) eg: if(keyDown[39]) {}
        mousePress - when a mouse button is pressed once (0 - left click, 1 - middle click, 2 - right click) eg: if(MousePress[39]) {}
        mouseDown - when a mouse button is held down (0 - left click, 1 - middle click, 2 - right click) eg: if(MouseDown[39]) {}
        scroll - positive or negative integer value, positive is scrolling up, negative is scrolling down eg: hotbarPosition += scroll;
        preventedEvents = prevents events depending on what is set to true (position 0 - prevent keys, position 1 - prevent mouse clicks, position 2 - prevent scrolling,) eg: preventedEvents[2] = true;
*/


var keyPress = [];
var keyDown = [];
var mousePress = [];
var mouseDown = [];
var scroll = 0;
var preventedEvents = [false,false,false];

function addListenersTo(elementToListenTo) {
    window.addEventListener("keydown",kdown);
    window.addEventListener("keyup",kup);
    elementToListenTo.addEventListener("mousedown",mdown);
    elementToListenTo.addEventListener("mouseup",mup);
    elementToListenTo.addEventListener("contextmenu",cmenu);
    elementToListenTo.addEventListener("wheel",scrl);
}

function removeListenersFrom(elementToListenTo) {
    window.removeEventListener("keydown",kdown);
    window.removeEventListener("keyup",kup);
    elementToListenTo.removeEventListener("mousedown",mdown);
    elementToListenTo.removeEventListener("mouseup",mup);
    elementToListenTo.removeEventListener("contextmenu",cmenu);
    elementToListenTo.removeEventListener("wheel",scrl);
}

function resetInput() {
    for(var i=0;i<keyPress.length;i++){if(keyPress[i]){keyPress[i]=0}}
    for(var i=0;i<mousePress.length;i++){if(mousePress[i]){mousePress[i]=0}}
    scroll=0;
}



function kdown(e) {
    var h=e.keyCode;
    keyPress[h]=keyPress[h]==[][[]]?1:0;
    keyDown[h]=1;
    if(preventedEvents[0]) {e.preventDefault()}
}
function kup(e) {
    var h=e.keyCode;
    delete keyPress[h];
    delete keyDown[h];
}
function mdown(e) {
    var h=e.button;
    mousePress[h]=mousePress[h]==[][[]]?1:0;
    mouseDown[h]=1;
    if(preventedEvents[1]) {e.preventDefault()}
}
function mup(e) {
    var h=e.button;
    delete mousePress[h];
    delete mouseDown[h];
}
function cmenu(e) {
    if(preventedEvents[1]) {e.preventDefault()}
}
function scrl(e) {
    scroll+=-1*(e.deltaY/100);
    if(preventedEvents[2]) {e.preventDefault()}
}

