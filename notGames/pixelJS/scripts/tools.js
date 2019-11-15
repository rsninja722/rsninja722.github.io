function switchTool(toolName) {
    tool = toolName;
    hideAllTools();
    showTool(toolName);
}

function hideAllTools() {
    var u = UI.tools; // list of tools
    var keys = Object.keys(u);
    for(var i=0;i<keys.length;i++) {
        var t = u[keys[i]]; // tool
        var n = t.numbers; // list of keys of numbers
        for(var j=0;j<n.length;j++) {
            if(numbers[n[j]].state) {
                numbers[n[j]].state = false;
            }
        }
        var b = t.buttons; // list of keys of buttons
        for(var j=0;j<b.length;j++) {
            if(buttons[b[j]].show) {
                buttons[b[j]].show = false;
            }
        }
        buttons[keys[i]].state = false;
    }
    
}

function showTool(toolName) {
    var t = UI.tools[toolName];
    var n = t.numbers;
    for(var j=0;j<n.length;j++) {
        numbers[n[j]].state = true;
    }
    var b = t.buttons;
    for(var j=0;j<b.length;j++) {
        buttons[b[j]].show = true;
    }
    buttons[toolName].state = true;
}

function handleTools() {
	// neon mode
	// colorInput.h.value=parseInt(colorInput.h.value)+1;
	// if(colorInput.h.value>359) {
	// 	colorInput.h.value=0;
	// }
	if(layers.length>0 && rectpoint2({x:250,y:30,w:cw,h:ch},mousePos)) {
        if(layers[curLayer].show) {
            var m = getMouse();
            var tempCtx = layers[curLayer].ctx;
            tempCtx.fillStyle = color.hex;
            tempCtx.globalAlpha = color.hsv.a/100;
            function putPixel(x,y,w,h) {
                tempCtx.clearRect(x,y,w,h);
                tempCtx.fillRect(x,y,w,h);
            }
            function putPreview(x,y,w,h) {
                let r = projectInfo.w;
                let b = projectInfo.h;
                if(r%2) {x+=0.5;}
                if(b%2) {y+=0.5;}
                if( (x+w>0 && y+h>0 && x<r && y<b) ) {
                    previewList.push([x,y,w,h]);
                }
            }
            function previewToPixels() {
                for(var i=0;i<previewList.length;i++) {
                    var p = previewList[i];
                    putPixel(Math.floor(p[0]),Math.floor(p[1]),p[2],p[3]);
                }
            }
            
            previewList = [];
            switch(tool) {

                // --------------------------------pen--------------------------------
                case "pen":
                    var t = toolData.pen.lastPos;
                    var s = toolData.pen.size;
                    var off = -(Math.floor(s/2));

                    
                    if(keyDown[k.SPACE]) {
                        var lp = toolData.pen.linePos;
                        
                        var sx = Math.min(lp.x,m.x);
                        var ex = Math.max(lp.x,m.x);
                        var sy = Math.min(lp.y,m.y);
                        var ey = Math.max(lp.y,m.y);

                        var p = [];

                        //put points in line
                        if((lp.x < m.x && lp.y < m.y) || (lp.x > m.x && lp.y > m.y)) {
                            for(var iy=sy;iy<=ey;iy++) {
                                for(var ix=sx;ix<=ex;ix++) {
                                    if(pDistance(ix,iy,lp.x,lp.y,m.x,m.y)<=0.5) {
                                        p.push([ix+off,iy+off]);
                                    }
                                }
                            }
                        } else {
                            for(var iy=sy;iy<=ey;iy++) {
                                for(var ix=ex;ix>=sx;ix--) {
                                    if(pDistance(ix,iy,lp.x,lp.y,m.x,m.y)<=0.5) {
                                        p.push([ix+off,iy+off]);
                                    }
                                }
                            }
                        }

                    
                        var c = 0;
                        var final = [];
                        
                        while(c<p.length) {
                            if( c>0 && c+1 < p.length
                                && (p[c-1][0] == p[c][0] || p[c-1][1] == p[c][1])
                                && (p[c+1][0] == p[c][0] || p[c+1][1] == p[c][1])
                                && p[c-1][0] != p[c+1][0]
                                && p[c-1][1] != p[c+1][1]) {
                                c++;
                            }
                            final.push(p[c]);
                            c++;
                        }

                        // add previews
                        for(var i=0,l=final.length;i<l;i++) {
                            putPreview(final[i][0],final[i][1],s,s);
                        }

                        // draw
                        if(mousePress[0]) {
                            for(var i=0,l=final.length;i<l;i++) {
                                putPixel(final[i][0],final[i][1],s,s);
                            }
                            toolData.pen.linePos = m;
                        }

                    } else if(mouseDown[0]) {
                        if(dist(t,m)>1) {
                            var sx = Math.min(t.x,m.x);
                            var ex = Math.max(t.x,m.x);
                            var sy = Math.min(t.y,m.y);
                            var ey = Math.max(t.y,m.y);

                            for(var y=sy;y<=ey;y++) {
                                for(var x=sx;x<=ex;x++) {
                                    if(pDistance(x,y,t.x,t.y,m.x,m.y)<=0.5) {
                                        putPixel(x+off,y+off,s,s);
                                    }
                                }
                            }
                        }
                        putPixel(m.x+off,m.y+off,s,s);
                        toolData.pen.linePos = m;
                    }
                    
                    putPreview(m.x+off,m.y+off,s,s);

                    toolData.pen.lastPos = m;
                    break;

                // -------------------------------- rectangle --------------------------------
                case "rect":
                    var rw = toolData.rect.w;
                    var rh = toolData.rect.h;
                    var xoff = -(Math.floor(rw/2));
                    var yoff = -(Math.floor(rh/2));

                    if(mousePress[0]) {
                        putPixel(m.x+xoff,m.y+yoff,rw,rh);
                    }

                    putPreview(m.x+xoff,m.y+yoff,rw,rh);
                    break;

                // --------------------------------pixel perfect pen------------------------------------
                case "pp":
                    var t = toolData.pp.lastPos;
                    if(mouseDown[0]) {
                        var linesToAdd = [[m.x,m.y]];
                        if(dist(t,m)>1) {
                            linesToAdd = ppLine(t,m);
                        }

                        var p = toolData.pp.points;

                        for(var i=0,l=linesToAdd.length;i<l;i++) {
                            var duplicates = false;
                            var lta = linesToAdd[i];
                            for(var j=0,jl=p.length;j<jl;j++) {
                                if(p[j][0]===lta[0] && p[j][1]===lta[1]) {
                                    duplicates = true;
                                }
                            }
                            if( !duplicates ) {
                                toolData.pp.points.push([lta[0],lta[1]]);
                            }
                        }

                        p = pixelPerfect(toolData.pp.points);
                        
                        for(var i=0,l=p.length;i<l;i++) {
                            putPreview(p[i][0],p[i][1],1,1);
                        } 
                    } else {
                        if(toolData.pp.points.length>0) {
                            p = pixelPerfect(toolData.pp.points);
                            for(var i=0,l=p.length;i<l;i++) {
                                putPixel(p[i][0],p[i][1],1,1);
                            }
                            toolData.pp.points = [];
                        }
                    }
                    toolData.pp.lastPos = m;
                    break;
                // -------------------------------- circle --------------------------------
                case "circle":
                    circle(m.x,m.y,toolData.circle.size);
                    if(mouseDown[0]) {
                        previewToPixels();
                    }
                    break;
                // -------------------------------- bucket --------------------------------
                case "bucket":
                    if(mousePress[0]) {
                        var d = layers[curLayer].ctx.getImageData(0,0,projectInfo.w,projectInfo.h).data;    
                        var pos = 0;
                        var matrix = [];
                        for(var y=0;y<projectInfo.h;y++) {
                            matrix.push([]);
                            for(var x=0;x<projectInfo.w;x++) {
                                matrix[y][x] = [d[pos],d[pos+1],d[pos+2],d[pos+3]];
                                pos+=4;
                            }
                        }
                        var pw = projectInfo.w-1;
                        var ph = projectInfo.h-1;

                        var tx = m.x;
                        tx = tx < 0 ? 0 : tx;
                        tx = tx > pw ? pw : tx;
                        var ty = m.y;
                        ty = ty < 0 ? 0 : ty;
                        ty = ty > ph ? ph : ty;

                        var target = matrix[ty][tx];
                        var replace = [color.rgb.r,color.rgb.g,color.rgb.b,255];

                        if(!arrEqual(target,replace)) {

                            var q = [];
                            q.push([tx,ty]);

                            var delta = toolData.bucket.tolerance;
                            var haveGoneTo = [];
                            for(var y=0;y<projectInfo.h;y++) {
                                var arr = [];
                                for(var x=0;x<projectInfo.w;x++) {
                                    arr.push(false);
                                }
                                haveGoneTo.push(arr);
                            }
                            function closeEnough(arr1,arr2) {
                                if(delta === 0 ) {
                                    if(arr1[0] === arr2[0]
                                        && arr1[1] === arr2[1]
                                        && arr1[2] === arr2[2]
                                        && arr1[3] === arr2[3]) {
                                            return true;
                                        }
                                        return false;
                                } else {
                                    if( Math.abs((arr1[0]+arr1[1]+arr1[2]+arr1[3]) - (arr2[0]+arr2[1]+arr2[2]+arr2[3])) < delta) {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                }
                            }
                            var deltaNotZero = delta !== 0;
                            if(toolData.bucket.mode==="4") {
                                while(q.length>0) {
                                    var n = q.pop();
                                    if(deltaNotZero){if(haveGoneTo[n[1]][n[0]]) {continue;}}
                                    matrix[n[1]][n[0]] = replace;

                                    if(n[1]<ph) {if(closeEnough(matrix[n[1]+1][n[0]],target)) {q.push([n[0],n[1]+1]);}}
                                    if(n[0]<pw) {if(closeEnough(matrix[n[1]][n[0]+1],target)) {q.push([n[0]+1,n[1]]);}}
                                    if(n[1]>0) {if(closeEnough(matrix[n[1]-1][n[0]],target)) {q.push([n[0],n[1]-1]);}}
                                    if(n[0]>0) {if(closeEnough(matrix[n[1]][n[0]-1],target)) {q.push([n[0]-1,n[1]]);}}
                                    if(deltaNotZero) {haveGoneTo[n[1]][n[0]] = true;}
                                }
                            } else if(toolData.bucket.mode==="8") {
                                while(q.length>0) {
                                    var n = q.pop();
                                    if(deltaNotZero){if(haveGoneTo[n[1]][n[0]]) {continue;}}
                                    matrix[n[1]][n[0]] = replace;
                                    var rlim = n[0]<pw;
                                    var llim = n[0]>0;
                                    var blim = n[1]<ph;
                                    var tlim = n[1]>0;

                                    if(blim) {if(closeEnough(matrix[n[1]+1][n[0]],target)) {q.push([n[0],n[1]+1]);}}
                                    if(rlim) {if(closeEnough(matrix[n[1]][n[0]+1],target)) {q.push([n[0]+1,n[1]]);}}
                                    if(tlim) {if(closeEnough(matrix[n[1]-1][n[0]],target)) {q.push([n[0],n[1]-1]);}}
                                    if(llim) {if(closeEnough(matrix[n[1]][n[0]-1],target)) {q.push([n[0]-1,n[1]]);}}
                                    if(rlim && blim) {if(closeEnough(matrix[n[1]+1][n[0]+1],target)) {q.push([n[0]+1,n[1]+1]);}}
                                    if(llim && tlim) {if(closeEnough(matrix[n[1]-1][n[0]-1],target)) {q.push([n[0]-1,n[1]-1]);}}
                                    if(rlim && tlim) {if(closeEnough(matrix[n[1]-1][n[0]+1],target)) {q.push([n[0]+1,n[1]-1]);}}
                                    if(llim && blim) {if(closeEnough(matrix[n[1]+1][n[0]-1],target)) {q.push([n[0]-1,n[1]+1]);}}
                                    if(deltaNotZero) {haveGoneTo[n[1]][n[0]] = true;}
                                }
                            } else {
                                for(var y=0,yl=matrix.length;y<yl;y++) {
                                    for(var x=0,xl=matrix[y].length;x<xl;x++) {
                                        if(closeEnough(matrix[y][x],target)) {
                                            matrix[y][x] = replace;
                                        }
                                    }
                                }
                            }
                            pos=0;
                            var width = 0;
                            for(var y=0;y<projectInfo.h;y++) {
                                for(var x=0;x<projectInfo.w;x++) {
                                    if(!arrEqual(matrix[y][x],[d[pos],d[pos+1],d[pos+2],d[pos+3]])) {
                                        width++;
                                    } else {
                                        if(width!==0) {
                                            putPixel(x-width,y,width,1);
                                            width = 0;
                                        }
                                    }
                                    pos+=4;
                                    if(x===pw) {
                                        if(width!==0) {
                                            putPixel(1+x-width,y,width,1);
                                            width = 0;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    break;
                case "border":
                    
                    break;
            }   
            tempCtx.globalAlpha = 1;
        } else {
            message={text:"layer hidden",time:25};
        }
    }
}

function generateBorder(type) {
    trackUndo(curLayer);
    var tempCtx = layers[curLayer].ctx;
    tempCtx.fillStyle = color.hex;
    tempCtx.globalAlpha = color.hsv.a/100;

    var ph = projectInfo.h;
    var pw = projectInfo.w;

    var arr = [];
    var borderArr = [];
    for(var y=0;y<ph;y++) {
        var a = [];
        for(var x=0;x<pw;x++) {
            a.push(false);
        }
        arr.push(a);
        borderArr.push(a);
    }
    if(toolData.border.mode === "one layer") {
        var d = layers[curLayer].ctx.getImageData(0,0,pw,ph);
        d = d.data;

        var count = 3;
        for(var y=0,yl=ph;y<yl;y++) {
            for(var x=0,xl=pw;x<xl;x++) {
                if(d[count] !== 0) {arr[y][x] = true;}
                count+=4;
            }
        }
    }
    if(toolData.border.mode === "all layers") {
        for(var i=0,l=layers.length;i<l;i++) {
            var d = layers[i].ctx.getImageData(0,0,pw,ph);
            d = d.data;

            var count = 3;
            for(var y=0,yl=ph;y<yl;y++) {
                for(var x=0,xl=pw;x<xl;x++) {
                    if(d[count] !== 0) {arr[y][x] = true;}
                    count+=4;
                }
            }
        }
    }
    var phLimit = ph-1;
    var pwLimit = pw-1;
    if(type === "1px") {
        for(var y=0;y<ph;y++) {
            for(var x=0;x<pw;x++) {
                var top = y-1 < 0 ? 0 : y-1;
                var bottom = y+1 > phLimit ? phLimit : y+1;
                var left = x-1 < 0 ? 0 : x-1;
                var right = x+1 > pwLimit ? pwLimit : x+1;
                if((arr[top][x] === true ||
                    arr[bottom][x] === true ||
                    arr[y][left] === true ||
                    arr[y][right] === true) &&
                    arr[y][x] === false) {
                    tempCtx.clearRect(x,y,1,1);
                    tempCtx.fillRect(x,y,1,1);
                }
            }
        }
    }
    if(type === "2px") {
        for(var y=0;y<ph;y++) {
            for(var x=0;x<pw;x++) {
                var top = y-1 < 0 ? 0 : y-1;
                var bottom = y+1 > phLimit ? phLimit : y+1;
                var left = x-1 < 0 ? 0 : x-1;
                var right = x+1 > pwLimit ? pwLimit : x+1;
                if((arr[top][x] === true ||
                    arr[bottom][x] === true ||
                    arr[y][left] === true ||
                    arr[y][right] === true ||
                    arr[top][left] === true ||
                    arr[bottom][left] === true ||
                    arr[top][right] === true ||
                    arr[bottom][right] === true) &&
                    arr[y][x] === false) {
                    tempCtx.clearRect(x,y,1,1);
                    tempCtx.fillRect(x,y,1,1);
                }
            }
        }
    }
    tempCtx.globalAlpha = 1;
}

function arrEqual(arr1,arr2) {
    if(arr1[0] === arr2[0]
    && arr1[1] === arr2[1]
    && arr1[2] === arr2[2]
    && arr1[3] === arr2[3]) {
        return true;
    }
    return false;
}

function ppLine(p0,p1) {
    var lineArray = [];

    var sx = Math.min(p0.x,p1.x);
    var ex = Math.max(p0.x,p1.x);
    var sy = Math.min(p0.y,p1.y);
    var ey = Math.max(p0.y,p1.y);

    if((p0.x < p1.x && p0.y < p1.y) || (p0.x > p1.x && p0.y > p1.y)) {
        for(var iy=sy;iy<=ey;iy++) {
            for(var ix=sx;ix<=ex;ix++) {
                if(pDistance(ix,iy,p0.x,p0.y,p1.x,p1.y)<=0.5) {
                    lineArray.push([ix,iy]);
                }
            }
        }
    } else {
        for(var iy=sy;iy<=ey;iy++) {
            for(var ix=ex;ix>=sx;ix--) {
                if(pDistance(ix,iy,p0.x,p0.y,p1.x,p1.y)<=0.5) {
                    lineArray.push([ix,iy]);
                }
            }
        }
    }

    return pixelPerfect(lineArray);
}

// make pixel perfect  https://rickyhan.com/jekyll/update/2018/11/22/pixel-art-algorithm-pixel-perfect.html
function pixelPerfect(p) {
    var c = 0;
    var final = [];
    
    while(c<p.length) {
        if( c>0 && c+1 < p.length
            && (p[c-1][0] == p[c][0] || p[c-1][1] == p[c][1])
            && (p[c+1][0] == p[c][0] || p[c+1][1] == p[c][1])
            && p[c-1][0] != p[c+1][0]
            && p[c-1][1] != p[c+1][1]) {
            c++;
        }
        final.push(p[c]);
        c++;
    }

    return final;
}

function getMouse() {
    let m = mousePosition();
    let offset = 0;
    if(tool==="pen" && toolData.pen.size%2 === 0) {offset=-0.5;}
    m.x = Math.round(m.x - (projectInfo.w%2?1:0.5) - offset);
    m.y = Math.round(m.y - (projectInfo.h%2?1:0.5) - offset);
    return m;
}