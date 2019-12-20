function trackUndo(layerNum,beforeUndo=false) {
    if(layers.length) {
        var tempID =  `undo${idCount}`;
        var tempCanv = document.createElement("canvas");
        tempCanv.id = tempID;
        tempCanv.width = projectInfo.w;
        tempCanv.height = projectInfo.h;
        tempCanv.style = "display:none;";
        
        document.getElementById("undo").appendChild(tempCanv);

        var tempCvs = document.getElementById(tempID)
        
        var tempLayer = {layer:layers[layerNum].name,id:tempID,cvs:tempCvs,ctx:tempCvs.getContext("2d")};

        
        tempLayer.ctx.drawImage(layers[layerNum].cvs,0,0);
        
        
        if(!beforeUndo) {
            if(undoPosition<undoList.length-1) {
                while(undoList.length > undoPosition) {
                    removeUndo(undoList.length-1);
                    undoList.pop();
                }
            }
        }
        if(!(!firstUndo&&undoPosition==undoList.length-1)) {
            if(undoList.length>undoMax) {
                removeUndo(0);
                undoList.shift();
                undoList.push(tempLayer);
            } else {
                undoList.push(tempLayer);
                if(!beforeUndo){
                    undoPosition++;
                }
            }
            idCount++;
        }
        
        if(beforeUndo) {
            firstUndo = false;
        } else {
            firstUndo = true;
        }
    }
}

function removeUndo(position) {
    var undoParent = document.getElementById("undo");
    var tempList = undoParent.getElementsByTagName("canvas");
    undoParent.removeChild(tempList[position]);
}

function undo() {
    if(firstUndo) {
        trackUndo(curLayer,true);
    }
    if(undoPosition>0) {
        undoPosition--;
        drawUndo();
        toolData.selection.mode = "off";
    }
}

function redo() {
    if(undoPosition<undoList.length-1) {
        undoPosition++;
        drawUndo();
        toolData.selection.mode = "off";
    }
}

function drawUndo() {
    if(layers.length) {
        var u = undoList[undoPosition];
        var layerPos = -1;
        for(var i=0;i<layers.length;i++) {
            if(layers[i].name === u.layer) {
                layerPos = i;
            }
        }
        if(layerPos !== -1) {
            var l = layers[layerPos];
            l.ctx.clearRect(0,0,l.cvs.width,l.cvs.height);
            l.ctx.drawImage(u.cvs,0,0);
        }
    }
}