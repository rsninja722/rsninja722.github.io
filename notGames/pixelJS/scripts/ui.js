// setup html ui
htmlUI.upload.elem.style = "display:block;position:absolute;top:0;bottom:0;right:0;left:0;margin:auto;padding:10px;width:250px;height:50px;border: 2px solid #555555;";
htmlUI.newImg.elem.style = "display:block;position:absolute;top:0;bottom:0;right:0;left:0;margin:auto;padding:10px;width:300px;height:75px;border: 2px solid #555555;";
htmlUI.import.elem.style = "display:block;position:absolute;top:0;bottom:0;right:0;left:0;margin:auto;padding:10px;width:250px;height:50px;border: 2px solid #555555;";
htmlUI.export.elem.style = "display:block;position:absolute;top:0;bottom:0;right:0;left:0;margin:auto;padding:10px;width:250px;height:50px;border: 2px solid #555555;";
htmlUI.help.elem.style = "display:block;position:absolute;top:0;bottom:0;right:0;left:0;margin:auto;padding:10px;width:500px;height:400px;border: 2px solid #555555;overflow-y: scroll;overflow-x: hidden;";
htmlUI.artGen.elem.style = "display:block;position:absolute;top:0;right:0;padding:10px;width:500px;height:500px;border: 2px solid #555555;";
htmlUI.layerUpload.elem.style = "display:block;position:absolute;top:0;bottom:0;right:0;left:0;margin:auto;padding:10px;width:250px;height:50px;border: 2px solid #555555;";

function manageUI() {

    // file drop down
    if(UI.file.state&&(!uiFocus)) {
        if(!rectpoint2(UI.file,mousePos) && !rectpoint2(buttons.file,mousePos)) {
            UI.file.state = false;
            buttons.file.state = false;
        }
    }
    
    // edit drop down
    if(UI.edit.state&&(!uiFocus)) {
        if(!rectpoint2(UI.edit,mousePos) && !rectpoint2(buttons.edit,mousePos)) {
            UI.edit.state = false;
            buttons.edit.state = false;
        }
    }

    // if file and edit drop downs aren't dropped down
    if(!UI.edit.state && !UI.file.state) {
        if(mouseDown[0]) {
            // color selector
            if(uiFocus===0) {
                if(rectpoint2({x:5,y:225,w:16,h:180},mousePos)) {
                    colorSliderUi();
                    uiFocus = 1;
                }
                if(rectpoint2({x:25,y:225,w:100,h:100},mousePos)) {
                    colorSquareUi();
                    uiFocus = 2;
                }
                if(rectpoint2({x:85,y:395,w:40,h:10},mousePos)) {
                    alphaSliderUi();
                    uiFocus = 3;
                }
            } else if(uiFocus === 1) {
                colorSliderUi();
            } else if(uiFocus === 2) {
                colorSquareUi();
            } else if(uiFocus === 3) {
                alphaSliderUi();
            }
        } else {
            uiFocus = 0;
            if(rectpoint2({x:5,y:225,w:16,h:180},mousePos)) {
                cursor = "ns-resize";
            }
            if(rectpoint2({x:25,y:225,w:100,h:100},mousePos)) {
                cursor = "move"
            }
            if(rectpoint2({x:85,y:395,w:40,h:10},mousePos)) {
                cursor = "ew-resize";
            }
        }
    }
}

function colorSliderUi() {
    var limit = numbers.colorLimit.value;
    var temp =  ((mousePos.y - 225) * 2);
    temp = temp<0?0:temp;
    temp = temp>359?359:temp;
    if(buttons.colorLimit.state) { 
        colorInput.h.value = Math.floor(temp/limit)*limit;
    } else {
        colorInput.h.value = temp;
    }
}

function colorSquareUi() {
    var limit = numbers.colorLimit.value;
    var temp = 100 - (mousePos.y - 225);
    temp = temp<0?0:temp;
    temp = temp>100?100:temp;
    if(buttons.colorLimit.state) { 
        colorInput.v.value = Math.floor(temp/limit)*limit;
    } else {
        colorInput.v.value = temp;
    }

    temp = mousePos.x - 25;
    temp = temp<0?0:temp;
    temp = temp>100?100:temp;
    if(buttons.colorLimit.state) { 
        colorInput.s.value = Math.floor(temp/limit)*limit;
    } else {
        colorInput.s.value = temp;
    }
}

function alphaSliderUi() {
    var temp = ((mousePos.x - 85) * 2.5);
    temp = temp<0?0:temp;
    temp = temp>100?100:temp;

    colorInput.a.value = temp;
}

// set the correct display values for html ui
function updateHTMLUI() {
    let keys = Object.keys(htmlUI);
    for(let i=0;i<keys.length;i++) {
        updateElementShow(htmlUI[keys[i]]);
    }
    
    // color
    if(document.getElementById("hex").value!=color.hex&&document.getElementById("hex").value.length>6) {
        color.hex = document.getElementById("hex").value;
        var h = color.hex;
        var rgb = [parseInt(h[1]+h[2],16),parseInt(h[3]+h[4],16),parseInt(h[5]+h[6],16)];
        color.rgb.r = rgb[0];
        color.rgb.g = rgb[1];
        color.rgb.b = rgb[2];

        var hsv = RGBtoHSV(rgb[0],rgb[1],rgb[2]);
        color.hsv.h = hsv[0];
        color.hsv.s = hsv[1];
        color.hsv.v = hsv[2];

        colorInput.h.value = color.hsv.h;
        colorInput.s.value = color.hsv.s;
        colorInput.v.value = color.hsv.v;
    }

    if(parseInt(colorInput.h.value)>359) {colorInput.h.value=359;}
    if(parseInt(colorInput.h.value)<0) {colorInput.h.value=0;}
    if(parseInt(colorInput.s.value)>100) {colorInput.s.value=100;}
    if(parseInt(colorInput.s.value)<0) {colorInput.s.value=0;}
    if(parseInt(colorInput.v.value)>100) {colorInput.v.value=100;}
    if(parseInt(colorInput.v.value)<0) {colorInput.v.value=0;}
    if(parseInt(colorInput.a.value)>100) {colorInput.a.value=100;}
    if(parseInt(colorInput.a.value)<0) {colorInput.a.value=0;}
    keys = Object.keys(colorInput);
    for(let i=0;i<keys.length;i++) {
        color.hsv[keys[i]] = parseInt(colorInput[keys[i]].value);
    }
    var rgb = HSVtoRGB(color.hsv.h/359,color.hsv.s/100,color.hsv.v/100);
    color.rgb.r = rgb[0];
    color.rgb.g = rgb[1];
    color.rgb.b = rgb[2];
    color.rgb.a = color.hsv.a;

    keys=["r","g","b"];
    for(var i=0;i<rgb.length;i++) {
        rgb[i] = (rgb[i].toString(16)).length<2 ? "0"+rgb[i].toString(16) : rgb[i].toString(16);
    }

    var cache = color.hex;
    color.hex = `#${rgb[0]}${rgb[1]}${rgb[2]}`;

    if(color.hex!=cache) {
        document.getElementById("hex").value = color.hex;
    }
    projectInfo.backColor = document.getElementById("backColor").value;
    toolData.pen.size = numbers.penSize.value;
    toolData.rect.w = numbers.rectW.value;
    toolData.rect.h = numbers.rectH.value;
    toolData.circle.size = numbers.circleSize.value;
    toolData.bucket.tolerance = numbers.fillTolerance.value;
    projectInfo.previewSize = numbers.preSize.value;
}
function updateElementShow(element) {
    if(element.state==true) {
        setElement(element.elem,"block");
    } else {
        setElement(element.elem,"none");
    }
}
function setElement(elem,state) {
    elem.style.display = state;
}

// html button functions 
    // new img
    function newImgCancel() {
        htmlUI.newImg.state = false;
    }

    // upload
    function uploadCancel() {
        htmlUI.upload.state = false;
    }

    function uploadUpload() {
        if(document.getElementById("fileUpload").files[0]!==undefined) {
            document.getElementById("uploadCache").src = URL.createObjectURL(document.getElementById("fileUpload").files[0]);  
        }
    
        htmlUI.upload.state = false;
    }

    // upload layer
    function uploadLayerCancel() {
        htmlUI.layerUpload.state = false;
    }

    function uploadLayerUpload() {
        if(document.getElementById("fileUploadLayer").files[0]!==undefined) {
            document.getElementById("uploadLayerCache").src = URL.createObjectURL(document.getElementById("fileUploadLayer").files[0]);  
        }
    
        htmlUI.layerUpload.state = false;
    }

    //import
    function importCancel() {
        htmlUI.import.state = false;
    }

    //export
    function exportCancel() {
        htmlUI.export.state = false;
    }

    //help
    function helpCancel() {
        htmlUI.help.state = false;
    }

    //art gen
    function artCancel() {
        htmlUI.artGen.state = false;
    }

function hideAllHTMLUI() {
    htmlUI.newImg.state = false;
    htmlUI.upload.state = false;
    htmlUI.import.state = false;
    htmlUI.export.state = false;
    htmlUI.artGen.state = false;
    htmlUI.help.state = false;
    htmlUI.layerUpload.state = false;
}