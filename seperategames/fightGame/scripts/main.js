screen = ctx.getImageData(0,0,canvas.width,canvas.height);
startLoad();
loadImages();


//setTimeout(start,1000);
function start() {
setInterval(update,16);
requestAnimationFrame(draw);
}



