var baseCvs = document.getElementById("base");
var baseCtx = baseCvs.getContext("2d");

var bottomCvs = document.getElementById("bottom");
var bottomCtx = bottomCvs.getContext("2d");

var colorCvs = document.getElementById("color");
var colorCtx = colorCvs.getContext("2d");
var colorData = colorCtx.getImageData(0,0,100,100);

var inputCvs = document.getElementById("inputEater");
var doubleClickTime = 0;
var doubleClick = 0;
var colorSelectRequest = false;

var numberInputs = document.getElementById("numberInputs");

var clickSound = new Audio();
clickSound.src = "click.wav";

var cursor = "defult";

var cacheArray=[];

var count=0;

var htmlUI = {
    upload:{elem:document.getElementById("upload"),state:false},
    newImg:{elem:document.getElementById("new"),state:false},
    import:{elem:document.getElementById("import"),state:false},
    export:{elem:document.getElementById("export"),state:false},
    help:{elem:document.getElementById("help"),state:false},
    artGen:{elem:document.getElementById("artGen"),state:false},
    layerUpload:{elem:document.getElementById("uploadLayer"),state:false}
}

var colorInput = {
    h:document.getElementById("h"),
    s:document.getElementById("s"),
    v:document.getElementById("v"),
    a:document.getElementById("a")
}

var UI = {
    file:{state:false,x:0,y:30,w:150,h:180},
    edit:{state:false,x:50,y:30,w:150,h:150},
    tools:{
        pen: {
            numbers:["penSize"],
            buttons:[]
        },
        rect: {
            numbers:["rectW","rectH"],
            buttons:[]
        },
        circle: {
            numbers:["circleSize"],
            buttons:[]
        },
        pp: {
            numbers:[],
            buttons:[]
        },
        bucket: {
            numbers:["fillTolerance"],
            buttons:[]
        },
        border: {
            numbers:[],
            buttons:[]
        },
        selection: {
            numbers:["transformX","transformY","transformAngle","transformSX","transformSY"],
            buttons:[]
        }
    }
}

var uiFocus = 0;

var curLayer=0;
var layers = [];
var layerIdCount = 0;
var layerScroll = 0;
var layerUIFocus = "none";
var layerButtonsHover = {index:0,button:"up",hovering:false};
var layerScrollHover = false;
var layerNameTarget = 0;
var scrollBarHeld = true;


var mouseCords;

var mirror = {x:{on:false,pos:5},y:{on:false,pos:5}};
var mirrorMode = false;
var repositionMode = false;
var repositionToolCache = "";

var tool = "pen";

var toolCache = "";

var toolData = {
	pen:{
        lastPos:{x:0,y:0},
        size:1,
        linePos:{x:-1,y:-1}
    },
    rect:{
        w:5,
        h:3
    },
    circle:{
	    size:6
    },
    pp:{
        points:[],
        lastPos:{x:0,y:0}
    },
    bucket:{
        mode:"4",
        tolerance:0
    },
    border:{
        mode:"one layer"
    },
    selection:{
        mode:"off",
        layer:0,
        startPos:{x:0,y:0},
        endPos:{x:0,y:0},
        transforms:{x:0,y:0,angle:0,scaleX:0,scaleY:0,w:0,h:0},
        boundingBox:{x:0,y:0,w:0,h:0}
    }
}

var selectionData;
var copyData;
var copyTransform = {x:0,y:0,angle:0,scaleX:0,scaleY:0};

var previewList = [];

var zooms = [1,1.5,3,4,5,6,8,10,15,20,32,48];
var editorInfo = {
    zoom:0
}

var projectInfo = {
    w:16,
    h:16,
    backColor:"#353535",
    tileMode:false,
    preview:false,
    previewSize:1
}
var pcache;

var color = {
    hsv:{h:0,s:100,v:100,a:100},
    rgb:{r:255,g:0,b:0,a:100},
    hex:"#ff0000"
}

var selectCount=0;

var paletteSelection = [0,0];

var message = {text:"",time:0}

var alphaCache = -1;

var firstUndo = true;
var undoPosition = 0;
var idCount = 0;
var undoList = [];
var undoMax = 50;

var lim = 0.5;

var typingString = "";
var typingMode = false;