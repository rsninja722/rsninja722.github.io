var canvas = document.getElementById("cvs");
var ctx = canvas.getContext('2d');

var cw = canvas.width;
var ch = canvas.height;

var camera = {x:0,y:0};

var count = 0;
var globalScale = 1;

addListenersTo(canvas);

var players = [];
var gameState = 1;//1 == main menu, 2 == character select
var gameMode = 0;//1 == pvp, 2 == pvai
var p1char = 0;
var p2char = 0;

var imageSources = [];
var images = {};
var screen;

var text = {};

var buttons = {};
button(cw/2,ch/2-25,250,30,"playerVsplayer");
button(cw/2,ch/2+25,250,30,"playerVsai");
button(150,ch/2,100,100,"char1");
button(300,ch/2,100,100,"char2");
button(450,ch/2,100,100,"char3");
button(200,ch/2,150,100,"map");
button(400,ch/2,150,100,"prank");
button(25,ch-15,40,20,"back");


function button(x,y,w,h,name) {
    buttons[name] = {x:x,y:y,w:w,h:h};    
}

function block(x,y,w,h) {
    blocks.push({x:x,y:y,w:w,h:h});    
}