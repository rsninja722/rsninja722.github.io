var k={a:65,b:66,c:67,d:68,e:69,f:70,g:71,h:72,i:73,j:74,k:75,l:76,m:77,n:78,o:79,p:80,q:81,r:82,s:83,t:84,u:85,v:86,w:87,x:88,y:89,z:90,0:48,1:49,2:50,3:51,4:52,5:53,6:54,7:55,8:56,9:57,BACKTICK:192,MINUS:189,EQUALS:187,OPENSQUARE:219,ENDSQUARE:221,SEMICOLON:186,SINGLEQUOTE:222,BACKSLASH:220,COMMA:188,PERIOD:190,SLASH:191,ENTER:13,BACKSPACE:8,TAB:9,CAPSLOCK:20,SHIFT:16,CONTROL:17,ALT:18,META:91,LEFTBACKSLASH:226,ESCAPE:27,HOME:36,END:35,PAGEUP:33,PAGEDOWN:34,DELETE:46,INSERT:45,PAUSE:19,UP:38,DOWN:40,LEFT:37,RIGHT:39,CONTEXT:93,SPACE:32,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123};
function rect(x,y,w,h,c) {
    ctx.fillStyle = c;
    ctx.fillRect(x-w/2,y-h/2,w,h);
}
function rectFancy(x,y,w,h,c,lc) {
    ctx.fillStyle = c;
    ctx.fillRect(x-w/2,y-h/2,w,h);
    ctx.beginPath();
    ctx.strokeStyle = lc;
    ctx.lineWidth = 2;
    ctx.rect(x-w/2,y-h/2,w,h);
    ctx.stroke();
}
function text(string,x,y,color,size) {
    // if(color!="black"&&color!="#000000") {
    //     ctx.font = `${size}px verdana`;
    //     ctx.lineWidth = 1;
    //     ctx.strokeStyle = "black";
    //     ctx.strokeText(string.toString(),x,y);
    // } else {ctx.font = `bold ${size}px verdana`;}
    ctx.font = `${size}px Arial`;
    ctx.fillStyle = color
    ctx.fillText(string.toString(),x,y);
}
function resetFocus() {
    focus.newPic.width=false;
    focus.newPic.height=false;
    focus.newPic.create=false;
}
function drawData() {
    dtaPntr = screenData.data;
    var dindx=0;
    for(var dy=0,lw=screenData.height;dy<lw;dy++) {
        for(var dx=0,lh=screenData.width;dx<lh;dx++) {
            var tmpvl;
            //if(screenGrid[dy][dx][3]!==0) {
                tmpvl= screenGrid[dy][dx];
                dtaPntr[dindx] = tmpvl[0];
                dtaPntr[dindx+1] = tmpvl[1];
                dtaPntr[dindx+2] = tmpvl[2];
                dtaPntr[dindx+3] = tmpvl[3];
            //}
            dindx+=4;
        }
    }
    ctx.putImageData(screenData,0,0);
}
function clearData() {
    for(var egg=0,l1=screenGrid.length;egg<l1;egg++) {
        for(var egg2=0,l2=screenGrid[0].length;egg2<l2;egg2++) {
            screenGrid[egg][egg2]=[0,0,0,0];
        }
    }
    for(var dpos=0,l=screenData.data.length;dpos<l;dpos++) {
        screenData.data[dpos]=0;
    }
}
// hsv to rgb function from http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
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
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}