var paletteCache = [];

for(var p=0;p<128;p++) {
    let a=[]
    for(var pp=0;pp<128;pp++) {
        a.push([0,0,0]);
    }
    paletteCache.push(a.slice());
}


function drawPalette() {
    if(uistates.palette) {
        for(let y=0,yl=paletteCache.length;y<yl;y++) {
            for(let x=0,xl=paletteCache[0].length;x<xl;x++) {
                var tempColor=paletteCache[y][x];
                screenGrid[y+10][x+10]=[tempColor[0],tempColor[1],tempColor[2],255];
            }
        }
    }
}

// when hue is changed, regenerate palette
// not done every frame, because hsvtorgb kills computor
function changePallette() { 
    for(let y=0;y<255;y+=2) {
        for(let x=0;x<255;x+=2) {
            var tempColor = HSVtoRGB(curColor.main[0]/255,x/255,(255-y)/255);
            paletteCache[~~(y/2)][~~(x/2)]=[tempColor.r,tempColor.g,tempColor.b];
        }
    }
}
