var canvas = document.getElementById("cvs");
var ctx = canvas.getContext("2d");

var cw = canvas.width;
var ch = canvas.height;

var count = 0;
var globalScale = 1;

addListenersTo(canvas);

var players = [];
var gameState = 1;//1 == main menu

var imageSources = [];
var images = {};
var screen;

var text = {};

var buttons = [];
button(cw/2,ch/2,50,30,"test");



function button(x,y,w,h,text) {
    buttons.push({x:x,y:y,w:w,h:h,text:text});    
}

