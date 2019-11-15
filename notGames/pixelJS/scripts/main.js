// draws Ui
function mainDraw() {
    resize();
    inputCvs.style.cursor = cursor;
    // clear base canvas
    baseCtx.clearRect(0,0,baseCvs.clientWidth,baseCvs.height);

    // UI drawing
    drawLayerUI();
    drawUIBottom();
    drawButtons();
    drawPaletteNodes();
    drawUITop();

    if(projectInfo.preview) {
        drawPreview();
    }

    // loop
    requestAnimationFrame(mainDraw);
}

// renders layers onto screen
function draw() {
    // background color
    rect(-camera.x,-camera.y,cw,ch,"#1e1e1e");

    var xoff=0;
    var yoff=0;
    if(layers.length>0) {
        xoff = Math.round(layers[0].cvs.width/2);
        yoff = Math.round(layers[0].cvs.height/2);
    }

    // draw background of layers
    bottomCtx.fillStyle = projectInfo.backColor;
    bottomCtx.fillRect(0,0,bottomCvs.width,bottomCvs.height);
    if(layers.length>0) {
        imgIgnoreCutoff({spr:bottomCvs,drawLimitSize:0},xoff,yoff);
    }

    // draw layers
    for(var i=layers.length-1;i>-1;i--) {
        if(layers[i].show) {
            imgIgnoreCutoff({spr:layers[i].cvs,drawLimitSize:0},xoff,yoff);
        }
    }

    // tilling
    if(projectInfo.tileMode&&layers.length>0) {
        var offsets = [
            [-1,-1],[0,-1],[1,-1],
            [-1,0],       [1,0],
            [-1,1],[0,1],[1,1]
        ]
        var wAdd = layers[0].cvs.width;
        var hAdd = layers[0].cvs.height;
        for(var i=0;i<offsets.length;i++) {
            imgIgnoreCutoff({spr:bottomCvs,drawLimitSize:0},xoff+(wAdd*offsets[i][0]),yoff+(hAdd*offsets[i][1]));
            for(var j=0;j<layers.length;j++) {
                imgIgnoreCutoff({spr:layers[j].cvs,drawLimitSize:0},xoff+(wAdd*offsets[i][0]),yoff+(hAdd*offsets[i][1]));
            }
        }
    }

    //previews
    if(colorSelectRequest === false) {
        curCtx.globalAlpha = 0.5;
        switch(tool) {
            default:
                for(var i=0;i<previewList.length;i++) {
                    var t = previewList[i];
                    rect(t[0],t[1],t[2],t[3],"#bbbbbb");
                }
                break;
        }
        curCtx.globalAlpha = 1;
    }
}

function absoluteDraw() {
    if(message.time>0) {
        text(message.text,10,15,"#4de1f5",2);
    }
    rect(0,ch-30,100,30,"#262626")
    text(`(${mouseCords.x},${mouseCords.y})`,5,ch-10,"#555555",2);
    if(colorSelectRequest === true) {
        selectColor();
        colorSelectRequest = false;
    }
}

// only here so game.js doesn't yell at me
function update() {}

// handle user input
function canvasUpdate() {
    cursor = "crosshair";
    if(doubleClickTime>0) {
        doubleClickTime--;
    }
    doubleClick = 0;
    if(mousePress[0]) {
        if(doubleClickTime === 0) {
            doubleClickTime = 50;
        } else {
            doubleClick = 1;
        }
    }
    curLayer = limitNum(curLayer,0,layers.length-1);
    mouseCords = getMouse();
    var inDraw = mousePos.x > 250 && mousePos.y > 30;
    drawMode = 1;
    count++;
    if(message.time>0) {
        message.time--;
    }

    // left and right click with keys
    if(!typingMode) {
        if(keyPress[k["1"]]) {mousePress[0] = 1;}
        if(keyPress[k["2"]]) {mousePress[2] = 1;}
        if(keyDown[k["1"]]) {mouseDown[0] = 1;}
        if(keyDown[k["2"]]) {mouseDown[2] = 1;}
    }
    manageUI();

    if(!typingMode) {
        updateButtons();
    }

    updatePaletteNodes();

    limitNumbers();

    updateHTMLUI();

    handleLayerUI();

    if(typingMode) {
        var keysToListen = "1234567890qwertyuiopasdfghjklzxcvbnm";
        for(var i=0;i<keysToListen.length;i++) {
            if(keyPress[k[keysToListen[i]]]) {typingString += (keyDown[k.SHIFT]? keysToListen[i].toUpperCase():keysToListen[i]);}
        }
        if(keyPress[k.SPACE]) {typingString += " ";}
        if(keyPress[k.BACKSPACE]) {typingString = typingString.substring(0, typingString.length-1);}
    } else {
        // modifier
        if(keyDown[k.SPACE]) {
            // save
            if(keyPress[k.s]) {save();}

            // download
            if(keyPress[k.d]) {download();}

            // focus
            if(keyPress[k.l]) {document.getElementById("name").focus();selectAll(document.getElementById("name"));}
        } else {
            // layers
            var layerScrollAmount = 0;
            if(keyPress[k.OPENSQUARE]) {curLayer--;curLayer = limitNum(curLayer,0,layers.length-1);layerScrollAmount=45;}
            if(keyPress[k.ENDSQUARE]) {curLayer++;curLayer = limitNum(curLayer,0,layers.length-1);layerScrollAmount=-45;}
            if(rectpoint2({x:5,y:35,w:240,h:180},mousePos)||layerScrollAmount!==0) {
                layerScroll+=(scroll*20)+layerScrollAmount;
                var limit = (layers.length-3)*-45;
                limit = limit > 0 ? 0 : limit;
                if(layerScroll<limit) {
                    layerScroll = limit;
                }
                if(layerScroll>0) {
                    layerScroll = 0;
                }
            }
            

            // pan
            if(count%(Math.round(camera.zoom/2))===0) {
                if(keyDown[k.LEFT]||keyDown[k.a]) {moveCamera(-1,0);}
                if(keyDown[k.RIGHT]||keyDown[k.d]) {moveCamera(1,0);}
                if(keyDown[k.UP]||keyDown[k.w]) {moveCamera(0,-1);}
                if(keyDown[k.DOWN]||keyDown[k.s]) {moveCamera(0,1);}
            }

            //zoom
            if(scroll>0 && (tool!=="rect" && tool!=="circle") && !rectpoint2({x:5,y:35,w:240,h:180},mousePos)) {
                if(editorInfo.zoom<zooms.length-1) {editorInfo.zoom++;}
            }
            if(keyPress[k.EQUALS]) {
                if(editorInfo.zoom<zooms.length-1) {editorInfo.zoom++;}
            }
            if(scroll<0 && (tool!=="rect" && tool!=="circle") && !rectpoint2({x:5,y:35,w:240,h:180},mousePos)) {
                editorInfo.zoom-=(editorInfo.zoom>0?1:0);
            }
            if(keyPress[k.MINUS]) {
                editorInfo.zoom-=(editorInfo.zoom>0?1:0);
            }
            
            // undo/redo
            if(keyPress[k.z]) {buttons.undo.click();}
            if(keyPress[k.y]) {buttons.redo.click();}

            // get color
            if(inDraw && layers.length>0) {
                if(keyPress[k.SHIFT]||mousePress[2]) {
                    //selectColor();
                    colorSelectRequest = true;
                }
            }

            // eraser
            if(keyPress[k.x]||mousePress[1]) {
                buttons.eraser.click();
            }

            // select tools
            if(keyPress[k.c]) {buttons.pen.click();}
            if(keyPress[k.v]) {buttons.pp.click();}
            if(keyPress[k.n]) {buttons.rect.click();}
            
            // palette controls
            var p = paletteSelection;
            if(keyPress[k.j]||keyPress[k.DELETE]) {paletteSelection[0] -= (p[0]>0?1:0);}
            if(keyPress[k.l]||keyPress[k.PAGEDOWN]) {paletteSelection[0] += (p[0]<paletteNodes[0].length-1?1:0);}
            if(keyPress[k.i]||keyPress[k.HOME]) {paletteSelection[1] -= (p[1]>0?1:0);}
            if(keyPress[k.k]||keyPress[k.END]) {paletteSelection[1] += (p[1]<paletteNodes.length-1?1:0);}
            if(keyPress[k.u]||keyPress[k.INSERT]) {paletteNodes[paletteSelection[1]][paletteSelection[0]].setColor();}
            if(doubleClick&&mousePress[0]) {
                if(rectpoint2(paletteNodes[paletteSelection[1]][paletteSelection[0]],mousePos)) {
                    paletteNodes[paletteSelection[1]][paletteSelection[0]].setColor();
                }
            }
            if(keyPress[k.o]||keyPress[k.PAGEUP]) {paletteNodes[paletteSelection[1]][paletteSelection[0]].getColor();}
        }

        // tool specific
        switch(tool) {
            case "pen":
                if(keyPress[k.COMMA]) {numbers.penSize.value--;}
                if(keyPress[k.PERIOD]) {numbers.penSize.value++;}
                break;
            case "rect":
                var sizeChange = 0;
                if(keyPress[k.COMMA]) {sizeChange=-1;}
                if(keyPress[k.PERIOD]) {sizeChange=1;}
                if(scroll>0) {sizeChange=Math.ceil(scroll);}
                if(scroll<0) {sizeChange=Math.floor(scroll);}
                if(keyDown[k.SPACE]) {
                    numbers.rectW.value += sizeChange;
                } else {
                    numbers.rectH.value += sizeChange;
                }
                break;
            case "circle":
                var sizeChange = 0;
                if(keyPress[k.COMMA]) {sizeChange=-1;}
                if(keyPress[k.PERIOD]) {sizeChange=1;}
                if(scroll>0) {sizeChange=Math.ceil(scroll);}
                if(scroll<0) {sizeChange=Math.floor(scroll);}
                numbers.circleSize.value += sizeChange;
                break;
            case "bucket":
                if(keyPress[k.COMMA]) {buttons.bucket4.click();}
                if(keyPress[k.PERIOD]) {buttons.bucket8.click();}
                if(keyPress[k.SLASH]) {buttons.bucketAll.click();}
                break;
            case "border":
                if(keyPress[k.COMMA]) {buttons.allLayers.click();}
                if(keyPress[k.PERIOD]) {buttons.border1px.click();}
                if(keyPress[k.SLASH]) {buttons.border2px.click();}
                break;
        }
    }

    // undo recording
    if(tool==="") {
        
    } else {
    	if(mousePress[0]&&inDraw) {
            if(layers[curLayer].show) {
                trackUndo(curLayer);
            } else {
                message={text:"layer hidden",time:25};
            }
        }
    }

    if(inDraw) {
        handleTools();
    }

    resetInput();
}


// resizes everything to fit the window
function resize() {
    if(isNaN(camera.x) || isNaN(camera.y)) {
        camera.x = cw/2;
        camera.y = ch/2;
    }
    let iw = document.body.clientWidth;
    let ih = window.innerHeight;
    baseCvs.width = iw;
    baseCvs.height = ih;
    inputCvs.width = iw;
    inputCvs.height = ih;

    if(canvases.cvs!=undefined) {
        canvases.cvs.width = Math.round((iw - 252)/2)*2 - 2;
        canvases.cvs.height = Math.round((ih - 32)/2)*2 - 2;
        canvases.cvs.style["z-index"] = -42069;
        camera.zoom = zooms[editorInfo.zoom];
    }
}

// draw color selector 5 times a second
setInterval(drawColorSelector,100);

// start update loop
setInterval(canvasUpdate,4);

// start draw loop
requestAnimationFrame(mainDraw);

images = [
    "images/",
    "download.png",
    "redo.png",
    "undo.png",
    "tileOn.png",
    "tileOff.png",
    "previewOn.png",
    "previewOff.png",
    "penOff.png",
    "penOn.png",
    "ppOff.png",
    "ppOn.png",
    "rectOff.png",
    "rectOn.png",
    "circleOn.png",
    "circleOff.png",
    "fillOn.png",
    "fillOff.png",
    "bucket4On.png",
    "bucket4Off.png",
    "bucket8On.png",
    "bucket8Off.png",
    "bucketAllOn.png",
    "bucketAllOff.png",
    "limitOn.png",
    "limitOff.png",
    "add.png",
    "delete.png",
    "replace.png",
    "merge.png",
    "up.png",
    "down.png",
    "visOn.png",
    "visOff.png",
    "borderOn.png",
    "borderOff.png"
]

// initialize game.js
setup();

// when game.js loads, try to load a project saved to localStorage
function onAssetsLoaded() {
    pcache = JSON.parse(JSON.stringify(projectInfo));
    initColor();
    resize();
    setTimeout(load,100);
    switchTool("pen");
    addListenersTo(inputCvs);
    loadPalette();
}