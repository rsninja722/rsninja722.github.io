function drawTest(iimg,x,y) {
    x=Math.round(x);
    y=Math.round(y);
    var yoffset = screen.width*4;
    var xoffset = x*4;

    var w = iimg[1]*4;
    var h = (iimg[2]*(screen.width*4))+(yoffset*y);

    var v = 0;
    for(var oy=yoffset*y;oy<h;oy+=yoffset) {
        var a = xoffset+oy;
        var b = a+w;
        for(var ox=a;ox<b;ox++) {
            screen.data[ox] = iimg[0][v];
            v++;
        }
    }
}


function drawScaled(img,x,y,scale) {
    var yoffset = screen.width;
    var xoffset = x;
    var g = screen.data;
    var d = img[0];
    var w = img[1];
    var h = ((img[2]*scale)*(screen.width))+(yoffset*y);

    var v = 0;
    var f = 0;
    for(var oy=yoffset*y;oy<h;oy+=yoffset) {
        var a = xoffset+oy;
        var b = a+w*scale;
        for(var ox=a;ox<b;ox+=scale) {
            var p=ox*4;
            
            
            if(d[v+3]==255) {
                for(var t =0;t<scale*4;t+=4) {
                    g[p+t] = d[v];
                    g[p+1+t] = d[v+1];
                    g[p+2+t] = d[v+2];
                    g[p+3+t] = d[v+3];
                }
            }
            v+=4;
        }
        f++;
        if(scale==f) {
            f=0;
        } else {
            v-=w*4;
        }
    }
}

function rectFancy(x,y,w,h,color,outLineColor,thickness) {
    var yoffset = screen.width;
    var xoffset = x;
    var g = screen.data;
    var oh = (h*(screen.width))+(yoffset*y);
    var hminusone = h-1;
    var wminusone = w-1;
    var v = 0;
    for(var oy=yoffset*y;oy<oh;oy+=yoffset) {
        var a = xoffset+oy;
        var b = a+w;

        var vv = 0;
        for(var ox=a;ox<b;ox++) {
            var p=ox*4;
            
            //if((p>(y+1)*yoffset)) {
            if(color[3]==255) {
            g[p] = color[0];
            g[p+1] = color[1];
            g[p+2] = color[2];
            g[p+3] = color[3];
            } else {
                g[p] += color[0];
                g[p+1] += color[1];
                g[p+2] += color[2];
                g[p+3] = color[3];
            }
            if(thickness==1) {
                if(v==0||v==hminusone||vv==0||vv==wminusone) {
                    g[p] = outLineColor[0];
                    g[p+1] = outLineColor[1];
                    g[p+2] = outLineColor[2];
                    g[p+3] = outLineColor[3];
                }
            } else {
                if(v==0||v==1||v==hminusone||v==hminusone-1||vv==0||vv==1||vv==wminusone||vv==wminusone-1) {
                    g[p] = outLineColor[0];
                    g[p+1] = outLineColor[1];
                    g[p+2] = outLineColor[2];
                    g[p+3] = outLineColor[3];
                }
            }
            //}
            vv++;
        }
        v++;
    }
}

function drawButton({x,y,w,h}) {
    rectFancy(x-w/2,y-h/2,w,h,[155,155,155,255],[50,50,50,255],2);
}



function drawText(font,string,x,y,color,space) {
    var sw = screen.width
    for(let s=0;s<string.length;s++) {
        let pos = (screen.width*4*y+4)+(x*4)+(s*12+s*space*4);
        let count = 0;
        for(let y=0;y<font.height;y++) {
            for(let x=0;x<font.width;x++) {
                if(font[string[s]][count]!=0) {
                var tempLetter = font[string[s]][count];
                screen.data[pos] = color[0]-(255-tempLetter);
                screen.data[pos+1] = color[1]-(255-tempLetter);
                screen.data[pos+2] = color[2]-(255-tempLetter);
                screen.data[pos+3] = 255;
                }
                count++;
                pos+=4;
            }    
            pos+=sw*4-font.width*4;
            
        }
    }
}