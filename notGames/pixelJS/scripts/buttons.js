class button {
    constructor(x,y,w,h,state,onclick,drawBase,drawOn,drawOff,drawTop,condition=function() {return this.show;}) {
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
        this.state=state;
        this.onclick=onclick;
        this.drawBase=drawBase;
        this.drawOn=drawOn;
        this.drawOff=drawOff;
        this.drawTop=drawTop;
        this.condition=condition; // should display or not
        this.show = true;
        this.hover=false;
    }
}

button.prototype.draw = function() {
    if(this.condition()) {
        this.drawBase();
        if(this.state==true) {
            this.drawOn();
        } else {
            this.drawOff();
        }
        this.drawTop();
    }
}

button.prototype.click = function() {
    this.state=!this.state;
    clickSound.play();
    this.onclick();
}

button.prototype.update = function(noneHit) {
    if(this.condition()) {
        if(rectpoint2(this,mousePos)&&noneHit) {
            this.hover = true;
            if(mousePress[0]&&(!uiFocus)) {
               this.click();
            }
            return true;
        } else {
            this.hover = false;
        }
    }
    return false;
}

var buttons = {};

function updateButtons() {
    var noneHit = true;
    var keys = Object.keys(buttons);
    for(let i=0;i<keys.length;i++) {
        if(buttons[keys[i]].update(noneHit)) {
            noneHit = false;
        }
    }
}

function drawButtons() {
    var keys = Object.keys(buttons);
    for(let i=keys.length-1;i>-1;i--) {
        buttons[keys[i]].draw();
    }
}

// creating ui
    
// ------------------------file------------------------
buttons.file = new button(
    0,0,50,30,false,
    function() { // on click
        if(this.state==true) {
            UI.file.state = true;
        } else {
            UI.file.state = false;
        }
    },
    function() {rect2(this.x,this.y,this.w,this.h,this.hover?"#565656":"#363636",baseCtx);},
    function() {text2("File",this.x+5,this.y+20,"#ffb730",16,baseCtx);},
    function() {text2("File",this.x+5,this.y+20,"#4de1f5",16,baseCtx);},function() {}
);

    // ----new----
    buttons.new = new button(
        0,30,150,30,false,
        function() { // on click
            UI.file.state = false;
            buttons.file.state = false;
            hideAllHTMLUI();
            htmlUI.newImg.state = true;
        },
        function() {
            rect2(this.x,this.y,this.w,this.h,this.hover?"#565656":"#363636",baseCtx);
            if(this.hover) {
                rect2(this.x+150,this.y,this.w,this.h,"#363636",baseCtx);
                text2("Creates a new project",this.x+155,this.y+15,"#14a800",12,baseCtx,140);
            }
        },
        function() {text2("New",this.x+5,this.y+20,"#4de1f5",14,baseCtx);},
        function() {text2("New",this.x+5,this.y+20,"#4de1f5",14,baseCtx);},function() {},
        function() {return UI.file.state;}
    );

    // ----new from upload----
    buttons.newFromUpload = new button(
        0,60,150,30,false,
        function() { // on click
            UI.file.state = false;
            buttons.file.state = false;
            hideAllHTMLUI();
            htmlUI.upload.state = true;
        },
        function() {
            rect2(this.x,this.y,this.w,this.h,this.hover?"#565656":"#363636",baseCtx);
            if(this.hover) {
                rect2(this.x+150,this.y,this.w,this.h,"#363636",baseCtx);
                text2("Creates new project from an image",this.x+155,this.y+12,"#14a800",12,baseCtx,140);
            }
        },
        function() {text2("New From Upload",this.x+5,this.y+20,"#4de1f5",14,baseCtx);},
        function() {text2("New From Upload",this.x+5,this.y+20,"#4de1f5",14,baseCtx);},function() {},
        function() {return UI.file.state;}
    );

    //---- import save----
    buttons.importSave = new button(
        0,90,150,30,false,
        function() { // on click
            UI.file.state = false;
            buttons.file.state = false;
            hideAllHTMLUI();
            htmlUI.import.state = true;
        },
        function() {
            rect2(this.x,this.y,this.w,this.h,this.hover?"#565656":"#363636",baseCtx);
            if(this.hover) {
                rect2(this.x+150,this.y,this.w,this.h,"#363636",baseCtx);
                text2("Import a project from a .JSON file",this.x+155,this.y+12,"#14a800",12,baseCtx,140);
            }
        },
        function() {text2("Import Save",this.x+5,this.y+20,"#4de1f5",14,baseCtx);},
        function() {text2("Import Save",this.x+5,this.y+20,"#4de1f5",14,baseCtx);},function() {},
        function() {return UI.file.state;}
    );

    // ----load----
    buttons.load = new button(
        75,152,75,30,false,
        function() { // on click
            UI.file.state = false;
            buttons.file.state = false;
            load();
        },
        function() {
            rect2(this.x,this.y,this.w,this.h,this.hover?"#565656":"#363636",baseCtx);
            if(this.hover) {
                rect2(150,this.y,150,this.h+2,"#363636",baseCtx);
                text2("Loads from browser",155,this.y+15,"#14a800",12,baseCtx);
            }
        },
        function() {text2("Load",this.x+5,this.y+20,"#4de1f5",14,baseCtx);},
        function() {text2("Load",this.x+5,this.y+20,"#4de1f5",14,baseCtx);},function() {},
        function() {return UI.file.state;}
    );

    // ----save----
    buttons.save = new button(
        0,152,75,30,false,
        function() { // on click
            UI.file.state = false;
            buttons.file.state = false;
            save();
        },
        function() {
            rect2(this.x,this.y,this.w,this.h,this.hover?"#565656":"#363636",baseCtx);
            if(this.hover) {
                rect2(150,this.y,150,this.h,"#363636",baseCtx);
                text2("Saves to browser",155,this.y+15,"#14a800",12,baseCtx);
            }
        },
        function() {text2("Save",this.x+5,this.y+20,"#4de1f5",14,baseCtx);},
        function() {text2("Save",this.x+5,this.y+20,"#4de1f5",14,baseCtx);},function() {},
        function() {return UI.file.state;}
    );

    // ----export save----
    buttons.exportSave = new button(
        0,120,150,30,false,
        function() { // on click
            UI.file.state = false;
            buttons.file.state = false;
            hideAllHTMLUI();
            htmlUI.export.state = true;
            exportLayers();
        },
        function() {
            rect2(this.x,this.y,this.w,this.h,this.hover?"#565656":"#363636",baseCtx);
            if(this.hover) {
                rect2(this.x+150,this.y,this.w,this.h,"#363636",baseCtx);
                text2("Download the project as a .JSON file",this.x+155,this.y+12,"#14a800",12,baseCtx,140);
            }
        },
        function() {text2("Export Save",this.x+5,this.y+20,"#4de1f5",14,baseCtx);},
        function() {text2("Export Save",this.x+5,this.y+20,"#4de1f5",14,baseCtx);},function() {},
        function() {return UI.file.state;}
    );

    // ----help----
    buttons.help = new button(
        0,182,150,30,false,
        function() { // on click
            UI.file.state = false;
            buttons.file.state = false;
            hideAllHTMLUI();
            htmlUI.help.state = true;
        },
        function() {
            rect2(this.x,this.y,this.w,this.h,this.hover?"#565656":"#363636",baseCtx);
        },
        function() {text2("help",this.x+5,this.y+20,"#4de1f5",14,baseCtx);},
        function() {text2("help",this.x+5,this.y+20,"#4de1f5",14,baseCtx);},function() {},
        function() {return UI.file.state;}
    );

// ------------------------edit--------------------
buttons.edit = new button(
    50,0,50,30,false,
    function() { // on click
        if(this.state==true) {
            UI.edit.state = true;
        } else {
            UI.edit.state = false;
        }
    },
    function() {rect2(this.x,this.y,this.w,this.h,this.hover?"#565656":"#363636",baseCtx);},
    function() {text2("Edit",this.x+5,this.y+20,"#ffb730",16,baseCtx);},
    function() {text2("Edit",this.x+5,this.y+20,"#4de1f5",16,baseCtx);},function() {}
);

    // ----gen texture----
    buttons.genTexture = new button(
        50,30,150,30,false,
        function() { // on click
            UI.edit.state = false;
            buttons.edit.state = false;
            hideAllHTMLUI();
            htmlUI.artGen.state = true;
        },
        function() {
            rect2(this.x,this.y,this.w,this.h,this.hover?"#565656":"#363636",baseCtx);
            if(this.hover) {
                rect2(this.x+150,this.y,this.w,this.h,"#363636",baseCtx);
                text2("Randomly generate and import a texture",this.x+155,this.y+13,"#14a800",12,baseCtx,140);
            }
        },
        function() {text2("Generate Texture",this.x+5,this.y+20,"#4de1f5",14,baseCtx);},
        function() {text2("Generate Texture",this.x+5,this.y+20,"#4de1f5",14,baseCtx);},function() {},
        function() {return UI.edit.state;}
    );

// ----download----
buttons.download = new button(
    100,0,30,30,false,
    function() { // on click
        this.state = false;
        download();
    },
    function() {rect2(this.x,this.y,this.w,this.h,this.hover?"#565656":"#363636",baseCtx);},function() {},function() {},
    function() {buttonImg("download",this);} // top
);

// ----undo----
buttons.undo = new button(
    70,430,30,20,false,
    function() { // on click
        this.state = false;
        undo();
    },
    function() {rect2(this.x,this.y,this.w,this.h,this.hover?"#565656":"#363636",baseCtx);},
    function() {},function() {buttonImg("undo",this);},function() {}
);
// ----redo----
buttons.redo = new button(
    100,430,30,20,false,
    function() { // on click
        this.state = false;
        redo();
    },
    function() {rect2(this.x,this.y,this.w,this.h,this.hover?"#565656":"#363636",baseCtx);},
    function() {},function() {buttonImg("redo",this);},function() {}
);

// ------------------------options box------------------------
    // ----tile----
    buttons.tile = new button(
        5,465,20,20,false,
        function() {
            projectInfo.tileMode = this.state;
        },
        function() {rect2(this.x,this.y,this.w,this.h,this.hover?"#444444":"#363636",baseCtx);},
        function() {buttonImg("tileOn",this);},
        function() {buttonImg("tileOff",this);},function() {}
    );

    // ----preview----
    buttons.preview = new button(
        55,465,20,20,false,
        function() {
            projectInfo.preview = this.state;
            numbers.preSize.state = this.state;
        },
        function() {rect2(this.x,this.y,this.w,this.h,this.hover?"#444444":"#363636",baseCtx);},
        function() {buttonImg("previewOn",this);},
        function() {buttonImg("previewOff",this);},function() {}
    );
    // ----colorLimit----
    buttons.colorLimit = new button(
        55,490,20,20,false,
        function() {
            numbers.colorLimit.state = this.state;
        },
        function() {rect2(this.x,this.y,this.w,this.h,this.hover?"#444444":"#363636",baseCtx);},
        function() {buttonImg("limitOn",this);},
        function() {buttonImg("limitOff",this);},function() {}
    );

// ------------------------layer------------------------
    // ----delete----
    buttons.deleteLayer = new button(
        7,37,25,25,false,
        function() {
            removeLayer(curLayer);
        },
        function() {rect2(this.x,this.y,this.w,this.h,this.hover?"#444444":"#363636",baseCtx);},
        function() {buttonImg("delete",this);},
        function() {buttonImg("delete",this);},function() {}
    ); 

    // ----replace----
    buttons.replaceLayer = new button(
        32,37,25,25,false,
        function() {
            replaceLayerWithNew(curLayer);
        },
        function() {rect2(this.x,this.y,this.w,this.h,this.hover?"#444444":"#363636",baseCtx);},
        function() {buttonImg("replace",this);},
        function() {buttonImg("replace",this);},function() {}
    );

    // ----merge----
    buttons.mergeLayer = new button(
        192,37,25,25,false,
        function() {
            mergeLayers(curLayer);
        },
        function() {rect2(this.x,this.y,this.w,this.h,this.hover?"#444444":"#363636",baseCtx);},
        function() {buttonImg("merge",this);},
        function() {buttonImg("merge",this);},function() {}
    );

    // ----add----
    buttons.addLayer = new button(
        217,37,25,25,false,
        function() {
            addLayer(curLayer);
        },
        function() {rect2(this.x,this.y,this.w,this.h,this.hover?"#444444":"#363636",baseCtx);},
        function() {buttonImg("add",this);},
        function() {buttonImg("add",this);},function() {}
    );
// ------------------------tools------------------------


// ----eraser----
buttons.eraser = new button(
    70,410,60,20,false,
    function() { // on click
        if(this.state) {
            alphaCache = color.hsv.a;
            color.hsv.a = 0;
            colorInput.a.value = 0;
        } else {
            color.hsv.a = alphaCache;
            colorInput.a.value = alphaCache;
        }
    },
    function() {rect2(this.x,this.y,this.w,this.h,this.hover?"#565656":"#363636",baseCtx);},
    function() {text2("erase",this.x+12,this.y+12,"#ffb730",12,baseCtx);},
    function() {text2("erase",this.x+12,this.y+12,"#4de1f5",12,baseCtx);},function() {}
);

// ----circle----
buttons.circle = new button(
    140,225,30,30,false,
    function() { // on click
        switchTool("circle");
    },
    function() {rect2(this.x,this.y,this.w,this.h,this.hover?"#565656":"#363636",baseCtx);},
    function() {buttonImg("circleOn",this);},
    function() {buttonImg("circleOff",this);},function() {}
);

// ----rect----
buttons.rect = new button(
    140,260,30,30,false,
    function() { // on click
        switchTool("rect");
    },
    function() {rect2(this.x,this.y,this.w,this.h,this.hover?"#565656":"#363636",baseCtx);},
    function() {buttonImg("rectOn",this);},
    function() {buttonImg("rectOff",this);},function() {}
);

// ----pixel perfect pen----
buttons.pp = new button(
    175,295,30,30,false,
    function() { // on click
        switchTool("pp");
    },
    function() {rect2(this.x,this.y,this.w,this.h,this.hover?"#565656":"#363636",baseCtx);},
    function() {buttonImg("ppOn",this);},
    function() {buttonImg("ppOff",this);},function() {}
);

// ----pen----
buttons.pen = new button(
    140,295,30,30,true,
    function() { // on click
        switchTool("pen");
    },
    function() {rect2(this.x,this.y,this.w,this.h,this.hover?"#565656":"#363636",baseCtx);},
    function() {buttonImg("penOn",this);},
    function() {buttonImg("penOff",this);},function() {}
);

// ----bucket----
buttons.bucket = new button(
    210,295,30,30,false,
    function() { // on click
        switchTool("bucket");
    },
    function() {rect2(this.x,this.y,this.w,this.h,this.hover?"#565656":"#363636",baseCtx);},
    function() {buttonImg("fillOn",this);},
    function() {buttonImg("fillOff",this);},function() {}
);

    buttons.bucket4 = new button(
        250,5,20,20,true,
        function() {
            buttons.bucket8.state = false;
            buttons.bucketAll.state = false;
            toolData.bucket.mode="8";
            this.state = true;
        },
        function() {rect2(this.x,this.y,this.w,this.h,this.hover?"#565656":"#363636",baseCtx);},
        function() {buttonImg("bucket4On",this);},
        function() {buttonImg("bucket4Off",this);},function() {},
        function() {return tool==="bucket";}
    );

    buttons.bucket8 = new button(
        275,5,20,20,false,
        function() {
            buttons.bucket4.state = false;
            buttons.bucketAll.state = false;
            toolData.bucket.mode="8";
            this.state = true;
        },
        function() {rect2(this.x,this.y,this.w,this.h,this.hover?"#565656":"#363636",baseCtx);},
        function() {buttonImg("bucket8On",this);},
        function() {buttonImg("bucket8Off",this);},function() {},
        function() {return tool==="bucket";}
    );

    buttons.bucketAll = new button(
        300,5,20,20,false,
        function() {
            buttons.bucket4.state = false;
            buttons.bucket8.state = false;
            toolData.bucket.mode="all";
            this.state = true;
        },
        function() {rect2(this.x,this.y,this.w,this.h,this.hover?"#565656":"#363636",baseCtx);},
        function() {buttonImg("bucketAllOn",this);},
        function() {buttonImg("bucketAllOff",this);},function() {},
        function() {return tool==="bucket";}
    );

// ----border----
buttons.border = new button(
    210,260,30,30,false,
    function() { // on click
        switchTool("border");
    },
    function() {rect2(this.x,this.y,this.w,this.h,this.hover?"#565656":"#363636",baseCtx);},
    function() {buttonImg("borderOn",this);},
    function() {buttonImg("borderOff",this);},function() {}
);
    // ----all layers----
    buttons.allLayers = new button(
        250,5,60,20,false,
        function() { // on click
            if(this.state) {
                toolData.border.mode = "all layers";
            } else {
                toolData.border.mode = "one layer";
            }
        },
        function() {rect2(this.x,this.y,this.w,this.h,"#444444",baseCtx);rect2(this.x+1,this.y+1,this.w-2,this.h-2,this.hover?"#363636":"#252525",baseCtx);},
        function() {text2("all layers",this.x+3,this.y+13,"#ffb730",10,baseCtx);},
        function() {text2("all layers",this.x+3,this.y+13,"#4de1f5",10,baseCtx);},function() {},
        function() {return tool==="border";}
    );

    // ----1px border----
    buttons.border1px = new button(
        315,5,25,20,false,
        function() { // on click
            this.state = false;
            generateBorder("1px");
        },
        function() {rect2(this.x,this.y,this.w,this.h,"#444444",baseCtx);rect2(this.x+1,this.y+1,this.w-2,this.h-2,this.hover?"#363636":"#252525",baseCtx);},
        function() {text2("1px",this.x+3,this.y+13,"#4de1f5",10,baseCtx);},
        function() {text2("1px",this.x+3,this.y+13,"#4de1f5",10,baseCtx);},function() {},
        function() {return tool==="border";}
    );

    // ----2px border----
    buttons.border2px = new button(
        345,5,25,20,false,
        function() { // on click
            this.state = false;
            generateBorder("2px");
        },
        function() {rect2(this.x,this.y,this.w,this.h,"#444444",baseCtx);rect2(this.x+1,this.y+1,this.w-2,this.h-2,this.hover?"#363636":"#252525",baseCtx);},
        function() {text2("2px",this.x+3,this.y+13,"#4de1f5",10,baseCtx);},
        function() {text2("2px",this.x+3,this.y+13,"#4de1f5",10,baseCtx);},function() {},
        function() {return tool==="border";}
    );

function buttonImg(img,btn) {
    if(sprites[img]) {
        img2(sprites[img].spr,btn.x+btn.w/2,btn.y+btn.h/2,baseCtx);
    }
}