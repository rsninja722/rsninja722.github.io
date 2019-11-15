// ----new----
function newImgCreate() {// create a new project
    projectInfo = JSON.parse(JSON.stringify(pcache));
    handleProjectInfo();
    clearLayers();

    projectInfo.w = parseInt(document.getElementById("newW").value);
    projectInfo.h = parseInt(document.getElementById("newH").value);
    document.getElementById("imgw").value = projectInfo.w < 50 ? projectInfo.w : 50;
    document.getElementById("imgh").value = projectInfo.h < 50 ? projectInfo.h : 50;
    addLayer(0);

    resizeBottom();

    htmlUI.newImg.state = false;
}

// ----new from upload----
document.getElementById("fileUpload").onchange = function () {// cache image when uploaded
    if(document.getElementById("fileUpload").files[0]!==undefined) {
        document.getElementById("uploadCache").src = URL.createObjectURL(document.getElementById("fileUpload").files[0]);  
    }

    htmlUI.upload.state = false;
}
document.getElementById("uploadCache").onload = function() {// detect when image is uploaded and create a new project
    clearLayers();
    projectInfo = JSON.parse(JSON.stringify(pcache));
    handleProjectInfo();
    projectInfo.w = parseInt(document.getElementById("uploadCache").width);
    projectInfo.h = parseInt(document.getElementById("uploadCache").height);
    document.getElementById("imgw").value = projectInfo.w < 50 ? projectInfo.w : 50;
    document.getElementById("imgh").value = projectInfo.h < 50 ? projectInfo.h : 50;

    addLayer(0);

    resizeBottom();

    layers[0].ctx.drawImage(document.getElementById("uploadCache"),0,0);
}

// ----import save----
document.getElementById("fileImport").onchange = function () {// detect when JSON is uploaded and load project
    if(document.getElementById("fileImport").files[0]!==undefined) {
        clearLayers();
        var loadedJSON = loadJSON(URL.createObjectURL(document.getElementById("fileImport").files[0]));
        if(loadedJSON.info === undefined) {console.warn("not valid file");return 1;}
        projectInfo = loadedJSON.info;
        document.getElementById("imgw").value = projectInfo.w < 50 ? projectInfo.w : 50;
        document.getElementById("imgh").value = projectInfo.h < 50 ? projectInfo.h : 50;

        handleProjectInfo();
        var l = loadedJSON.layers;
        for(let i=0;i<l.length;i++) {
            addLayer(layers.length,l[i].name);
            var imgCache = new Image();
            imgCache.src = l[i].data;
            cacheArray.push([imgCache,false]);

            requestAnimationFrame(imgLoading);
            //imgCache.onload = function() {
             //   debugger;
                
            //}
        }
        resizeBottom();
    }
    htmlUI.import.state = false;
}

// ----load----
function load() {// attempts to load a project from localStorage
    if(localStorage.projectSave!==undefined) {
        clearLayers();
        var loadedJSON = JSON.parse(localStorage.projectSave);
        if(loadedJSON.info === undefined) {console.warn("not valid file");return 1;}
        projectInfo = loadedJSON.info;
        document.getElementById("imgw").value = projectInfo.w < 50 ? projectInfo.w : 50;
        document.getElementById("imgh").value = projectInfo.h < 50 ? projectInfo.h : 50;
        
        handleProjectInfo();
        document.getElementById("backColor").value = projectInfo.backColor;
        var l = loadedJSON.layers;
        for(let i=0;i<l.length;i++) {
            addLayer(layers.length,l[i].name);
            var imgCache = new Image();
            imgCache.src = l[i].data;
            cacheArray.push([imgCache,false]);

            requestAnimationFrame(imgLoading);
        }
        resizeBottom();
        message={text:"loaded",time:250}
        if(projectInfo.backColor==undefined) {
            projectInfo.backColor = "#353535";
            document.getElementById("backColor").value = "#353535";
        }
    }
}

// ----save----
function save() {// saves a project to localStorage
    if(layers.length>0) {
        var obj = {info:projectInfo,layers:[]};
        for(var i=0;i<layers.length;i++) {
            obj.layers.push({name:layers[i].displayName,data:layers[i].cvs.toDataURL(),});
        }

        localStorage.projectSave =  JSON.stringify(obj);
        message={text:"saved",time:100}
    }
}

// ----export save----
function exportLayers() {// creates a downloadable JSON file of the project
    if(layers.length>0) {
        var obj = {info:projectInfo,layers:[]};
        for(var i=0;i<layers.length;i++) {
            obj.layers.push({name:layers[i].displayName,data:layers[i].cvs.toDataURL()});
        }

        var blob = new Blob([JSON.stringify(obj)], {type : 'application/json'});
        document.getElementById("exportA").href = URL.createObjectURL(blob);
        document.getElementById("exportA").innerHTML = "Download Save";
    }
}

// ----download----
function download() {
    var dcvs = document.getElementById("download");
    var dctx = dcvs.getContext("2d");
    dctx.imageSmoothingEnabled = false;
    var s = numbers.exportScale.value;
    dcvs.width = projectInfo.w*s;
    dcvs.height = projectInfo.h*s;

    var drawData = dctx.getImageData(0, 0, dcvs.width, dcvs.height);

    // I hate image data

    // go through all layers
    for(var i=layers.length-1;i>-1;i--) {
        layers[i].ctx.imageSmoothingEnabled = false;

        // get image data
        var imgData = layers[i].ctx.getImageData(0, 0, projectInfo.w, projectInfo.h);

        var drawPosition = 0;
        var layerPosition = 0;
        // go through every pixel in layer
        for(var y=0,yl=imgData.height;y<yl;y++) {
            for(var x=0,xl=imgData.width;x<xl;x++) {

                drawPosition = (x*s*4) + (y*s*drawData.width*4);
                // set square of export scale size
                for(var y2=0;y2<s;y2++) {
                    for(var x2=0;x2<s;x2++) {
                        drawData.data[drawPosition] = imgData.data[layerPosition];
                        drawData.data[drawPosition+1] = imgData.data[layerPosition+1];
                        drawData.data[drawPosition+2] = imgData.data[layerPosition+2];
                        drawData.data[drawPosition+3] = imgData.data[layerPosition+3];
                        drawPosition += 4;
                    }
                    drawPosition = (x*s*4) + (y*s*drawData.width*4) + (drawData.width*4*(y2+1));
                }

                layerPosition+=4;
            }   
        }

        var tempCanv = document.createElement("canvas");
        tempCanv.width = dcvs.width;
        tempCanv.height = dcvs.height;

        var tempCtx = tempCanv.getContext("2d");

        tempCtx.putImageData(drawData,0,0);

        dctx.drawImage(tempCanv,0,0);
    }

    var link = document.createElement("a");
    link.download = document.getElementById("name").value;
    link.href = dcvs.toDataURL("image/png;base64");
    
    var e = document.createEvent("MouseEvents");
    e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    link.dispatchEvent(e);
}

// if enter is pressed on name box thing
function checkEnter(e) {
    if(event.keyCode === k.ENTER) {
        download();
    }
}

function selectAll(e) {
    if(selectCount===0) {
        selectCount=1;
        e.setSelectionRange(0, e.value.length);
    }
}

// returns parsed JSON from a file
function loadJSON(file) {
    var request = new XMLHttpRequest();
    request.open("GET", file, false);
    request.send(null)
    return JSON.parse(request.responseText);
}

// loop that is called when a project is loaded from JSON
function imgLoading() { 
    var done = true;
    for(var i=0;i<cacheArray.length;i++) {
        if(cacheArray[i][0].complete && !cacheArray[i][1]) {
            layers[i].ctx.drawImage(cacheArray[i][0],0,0);
            cacheArray[i][1] = true;
        } else if(cacheArray[i][1]==false) {
            done = false;
        }
    }
    if(done) {
        cacheArray = [];
    } else {
        requestAnimationFrame(imgLoading);
    }
}

// handle project info and set things correctly
function handleProjectInfo() {
    undoList = [];
    while(document.getElementById("undo").getElementsByTagName("canvas").length>0) {
        removeUndo(0);
    }
    editorInfo.zoom=0;
    undoPosition = 0;
    idCount = 0;
    document.getElementById("backColor").value = projectInfo.backColor;
    numbers.preSize.value = projectInfo.previewSize;
    buttons.tile.state = projectInfo.tileMode;
    buttons.preview.state = projectInfo.preview;
    numbers.preSize.state = projectInfo.preview;
}