// creates a new layer at a positon in the layers array
function addLayer(position,name=`Layer${layerIdCount}`) {
	var newcvs = document.createElement("canvas");
	newcvs.style = "z-index: -666;position:absolute;background-color:white;display:none;"
	newcvs.id = `layer${layerIdCount}`
	
	document.getElementById("layers").appendChild(newcvs);
	
	var tempcvs = document.getElementById(`layer${layerIdCount}`);
	
	layers.splice(position,0,{
        displayName:name,
        name:`Layer${layerIdCount}`,
        show:true,
		cvs:tempcvs,
        ctx:tempcvs.getContext("2d")
    });
    
    layers[position].cvs.width = projectInfo.w;
    layers[position].cvs.height = projectInfo.h;
    layerIdCount++;
}

// move a layer up
function repositionUp(index) {
    if(index>0 && index<layers.length) {
        var layerToMove = layers.splice(index,1,{})[0];
        var layerAbove = layers.splice(index-1,1,{})[0];

        layers[index] = layerAbove;
        layers[index-1] = layerToMove;
    }
}

// move a layer down
function repositionDown(index) {
    if(index>-1 && index<layers.length-1) {
        var layerToMove = layers.splice(index,1,{})[0];
        var layerBelow = layers.splice(index+1,1,{})[0];

        layers[index] = layerBelow;
        layers[index+1] = layerToMove;
    }
}

// delete a layer
function removeLayer(position) {
    document.getElementById("layers").removeChild(layers[position].cvs);
    layers.splice(position,1);
}

// delete old layer and put new one in place
function replaceLayerWithNew(position) {
    removeLayer(position);
    addLayer(position);
}

// merges layer with one below
function mergeLayers(position) {
    if(position<layers.length-1) {
        layers[position+1].ctx.drawImage(layers[position].cvs,0,0);
        removeLayer(position);
    }
}

// removes all layers
function clearLayers() {
    layers = [];
    var layersElem = document.getElementById("layers");
    while(layersElem.firstChild) {
        layersElem.removeChild(layersElem.firstChild);
    }
}

// updates the size of the background layer
function resizeBottom() {
    camera.x = cw/2 - projectInfo.w/2;
    camera.y = ch/2 - projectInfo.h/2;

    bottomCvs.width = projectInfo.w;
    bottomCvs.height = projectInfo.h;

    bottomCtx.fillStyle = "#353535";
    bottomCtx.fillRect(0,0,bottomCvs.width,bottomCvs.height);
}

// draws the layer UI
function drawLayerUI() {
    rect2(0,30,250,185,"#252526",baseCtx);
    rect2(5,35,240,185,"#1e1e1e",baseCtx);

    for(var i=0,l=layers.length;i<l;i++) {
        var yoff = 70+(i*45)+layerScroll;
        // big rectangle
        rect2(10,yoff,220,40,(i===curLayer?"#444444":"#333333"));

        // name
        if(typingMode && layerNameTarget === i) {
            rect2(50,yoff+10,130,20,"#222222");
            text2(layers[i].displayName+(Math.round(count/50)%2?"|":""),50,yoff+25,"#888888",14,baseCtx);
        } else {
            text2(layers[i].displayName,50,yoff+25,"#888888",14,baseCtx);
        }

        // visibility
        rect2(210,yoff,20,40,"#333333");

        // up
        rect2(180,yoff,30,20,"#333333");
        // down
        rect2(180,yoff+20,30,20,"#333333");

        // different color on hover
        if(layerButtonsHover.hovering) {
            if(layerButtonsHover.index === i) {
                if(layerButtonsHover.button === "up") {
                    rect2(180,yoff,30,20,"#444444");
                }
                if(layerButtonsHover.button === "down") {
                    rect2(180,yoff+20,30,20,"#444444");
                }
                if(layerButtonsHover.button === "visibility") {
                    rect2(210,yoff,20,40,"#444444");
                }
            }
        }

        rect2(11,yoff+1,38,38,"#252525");

        baseCtx.drawImage(layers[i].cvs,0,0,projectInfo.w,projectInfo.h,11,yoff+1,38,38);

        // button pictures
        baseCtx.drawImage((layers[i].show?sprites.visOn.spr:sprites.visOff.spr),210,yoff);

        baseCtx.drawImage(sprites.up.spr,180,yoff);
        baseCtx.drawImage(sprites.down.spr,180,yoff+20);
    }

    // scroll bar
    var limit = (layers.length-3)*45;
    limit = limit < 0 ? 0 : limit;

    var ypos = 100 * (-layerScroll / limit); 

    rect2(232,70+ypos,10,30,(layerScrollHover?"#666666":"#444444"));
}

// handles input of the layer UI
function handleLayerUI() {
    layerButtonsHover.hovering = false;
    if(typingMode) {
        if(keyPress[k.ESCAPE] || keyPress[k.ENTER] || mousePress[0]) {
            typingMode = false;
        }
    }
    for(var i=0,l=layers.length;i<l;i++) {
        // set name to typing string
        if(typingMode && layerNameTarget === i) {
            layers[i].displayName = typingString;
        }
    }
    if(mousePos.y > 64 && mousePos.y < 215) {
        // buttons
        for(var i=0,l=layers.length;i<l;i++) {
            var yoff = 70+(i*45)+layerScroll;
            // up
            if(rectpoint2({x:180,y:yoff,w:30,h:20},mousePos)) {
                layerButtonsHover = {index:i,button:"up",hovering:true};
                if(mousePress[0]) {repositionUp(i);clickSound.play();}
            } else
            // down
            if(rectpoint2({x:180,y:yoff+20,w:30,h:20},mousePos)) {
                layerButtonsHover = {index:i,button:"down",hovering:true};
                if(mousePress[0]) {repositionDown(i);clickSound.play();}
            } else 
            // show hide
            if(rectpoint2({x:210,y:yoff,w:20,h:40},mousePos)) {
                layerButtonsHover = {index:i,button:"visibility",hovering:true};
                if(mousePress[0]) {layers[i].show = !layers[i].show;clickSound.play();}
            } else 
            // rename
            if(rectpoint2({x:50,y:yoff+10,w:120,h:20},mousePos)&&mousePress[0]&&doubleClick) {
                typingString = "";
                typingMode = true;
                layerNameTarget = i;
            } else 
            // select
            if(mousePress[0]) {
                if(rectpoint2({x:10,y:yoff,w:220,h:40},mousePos)) {
                    curLayer = i;
                }
            }
        }
        // scroll bar
        var limit = (layers.length-3)*45;
        limit = limit < 0 ? 0 : limit;

        var ypos = 100 * (-layerScroll / limit);

        layerScrollHover = false;
        if(!isNaN(ypos)) {
            if(rectpoint2({x:232,y:70+ypos,w:10,h:30},mousePos)) {
                layerScrollHover = true;
            }
            if(!mouseDown[0]) {scrollBarHeld=false;}
            if((mouseDown[0] && rectpoint2({x:232,y:70,w:10,h:130},mousePos)) || scrollBarHeld) {
                var my = mousePos.y > 185 ? 185 : mousePos.y;
                layerScroll = (-((my-70)/100) * limit)+20;
                scrollBarHeld = true;
            }
        }
    }
}