function createCanvas(id) {
    var tempCanvas = document.createElement("canvas");
    tempCanvas.id = id;
    tempCanvas.width = canvases.cvs.width;
    tempCanvas.height = canvases.cvs.height;
    tempCanvas.style = "display:none;image-rendering:pixelated;";

    document.body.appendChild(tempCanvas);

    canvases[`${id}cvs`] = document.getElementById(id);
    canvases[`${id}ctx`] = canvases[`${id}cvs`].getContext("2d");
}

function startLoops(updateFPS) {
    try {draw} catch {console.warn("no draw function found");return null;}
    try {update} catch {console.warn("no update function found");return null;}
    try {input} catch {seperateInputLoop=false;}

    requestAnimationFrame(drawLoop);
    setInterval(updateLoop,updateFPS);

    if(seperateInputLoop) {
        setInterval(inputLoop,4);
    }
}