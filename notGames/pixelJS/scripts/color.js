function initColor() {
    colorCtx.fillStyle = `#1e1e1e`;
    colorCtx.fillRect(0,0,130,190);
    colorCtx.fillStyle = `#353535`;
    colorCtx.fillRect(3,3,20,184);
    colorCtx.fillStyle = `#353535`;
    colorCtx.fillRect(23,3,104,104);
    colorCtx.fillRect(83,173,44,14);
}

function drawColorSelector() {
    var c;
    var d = colorData.data;
    var i=0;
    var limit = numbers.colorLimit.value;
    var shouldLimit = buttons.colorLimit.state;
    for(var y=0;y<100;y++) {
        for(var x=0;x<100;x++) {
            if(shouldLimit) {
                c = HSVtoRGB(color.hsv.h/360,Math.floor(x/limit)*limit/100,1-(Math.floor(y/limit)*limit/100));
            } else {
                c = HSVtoRGB(color.hsv.h/360,x/100,1-y/100);
            }
            d[i] = c[0];
            d[i+1] = c[1];
            d[i+2] = c[2];
            i+=4;
            
        }
    }
    colorCtx.putImageData(colorData,25,5);
    for(var i=0;i<180;i++) {
        if(shouldLimit) {
            colorCtx.fillStyle = `hsl(${Math.floor((i*2)/limit)*limit}, 100%, 50%)`;
        } else {
            colorCtx.fillStyle = `hsl(${i*2}, 100%, 50%)`;
        }
        colorCtx.fillRect(5,5+i,16,1);
    }

    colorCtx.fillStyle="#1e1e1e";
    colorCtx.fillRect(85,175,40,10);
    colorCtx.fillStyle = color.hex;
    for(var i=0;i<40;i++) {
        colorCtx.globalAlpha = i/39;
        colorCtx.fillRect(85+i,175,1,10);
        
    }
    colorCtx.globalAlpha = 1;

    colorCtx.fillStyle = `#ffffff`;
    
    var ypos = 5 + (100-(color.hsv.v));
    var xpos = 25 + (color.hsv.s);
    colorCtx.fillRect((xpos>123?123:xpos),(ypos>103?103:ypos),2,2);

    ypos = 5+(color.hsv.h/2);
    colorCtx.fillRect(5,(ypos>183?183:ypos),16,2);

    xpos = 85+(38*(color.hsv.a/100));
    colorCtx.fillRect(xpos,175,2,10);

    colorCtx.fillStyle = `#1e1e1e`;
    colorCtx.fillRect(85,110,40,40);

    colorCtx.globalAlpha = color.rgb.a/100;
    colorCtx.fillStyle = `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;
    colorCtx.fillRect(85,110,40,40);
    colorCtx.globalAlpha = 1;
}

function selectColor() {
    var m = mousePos;
    var d = canvases.ctx.getImageData(m.x-251,m.y-31,1,1);
    d = d.data;
    setColor(d[0],d[1],d[2]);
    if(buttons.eraser.state) {
        buttons.eraser.click();
    }
}

function setColor(r,g,b) {
    var hsv = RGBtoHSV(r,g,b);
    color.hsv.h = hsv[0];
    color.hsv.s = hsv[1];
    color.hsv.v = hsv[2];

    colorInput.h.value = color.hsv.h;
    colorInput.s.value = color.hsv.s;
    colorInput.v.value = color.hsv.v;
}

// from https://stackoverflow.com/questions/17242144/javascript-convert-hsb-hsv-color-to-rgb-accurately
function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function RGBtoHSV(r, g, b) {
    var max = Math.max(r, g, b), min = Math.min(r, g, b),
        d = max - min,
        h,
        s = (max === 0 ? 0 : d / max),
        v = max / 255;

    switch (max) {
        case min: h = 0; break;
        case r: h = (g - b) + d * (g < b ? 6: 0); h /= 6 * d; break;
        case g: h = (b - r) + d * 2; h /= 6 * d; break;
        case b: h = (r - g) + d * 4; h /= 6 * d; break;
    }

    return [Math.round(h*359),Math.round(s*100),Math.round(v*100)];
}

for(var i=3,l=colorData.data.length;i<l;i+=4) {
    colorData.data[i] = 255;
}