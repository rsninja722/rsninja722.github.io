// variations on game.js drawing functions to work in a normal canvas
function rectpoint2(rect,point) {
    if(rect.x + rect.w >= point.x &&
       rect.x <= point.x &&
       rect.y + rect.h >= point.y &&
       rect.y <= point.y) {
        return true;
    } else {
        return false;
    }
}

function rect2(x,y,w,h,c,ctx=baseCtx) {
    ctx.fillStyle = c;
    ctx.fillRect(x,y,w,h);
}

function border2(x,y,w,h,c,ctx) {
    ctx.strokeStyle = c;
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.stroke();
}

function img2(img,x,y,ctx=baseCtx,angle=0,sx=1,sy=1) {
    ctx.setTransform(sx, 0, 0, sy, Math.round(x), Math.round(y));
    ctx.rotate(angle);
    ctx.drawImage(img,Math.round(-img.width/2),Math.round(-img.height/2));
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}


function text2(txt,x,y,color="black",size=1,ctx=baseCtx,maxWidth=1000) {
    txt = txt.toString();
    ctx.fillStyle = color;
    ctx.font = `${size}px Consolas`;
                                                                                        //I hate text wrapping now
    var txtList = txt.split("\n");                                                      //split string on enters
    for(let i=0;i<txtList.length;i++) {                                                 //go through array of strings
        if(ctx.measureText(txtList[i]).width>maxWidth) {                             //if the string is too big, divide up into smaller strings
            var tempTxt = txtList[i].split(" ");                                        //split into individual words
            var tempStr="";                                                             //string for measuring size
            var addAmount=0;                                                            //track where in the txtList we are
            txtList.splice(i,1);                                                        //remove the too long string
            for(let j=0;j<tempTxt.length;j++) {                                         //go through the split up string
                if(ctx.measureText(tempStr + tempTxt[j] + " ").width<maxWidth) {     //if adding a word doesn't make tempStr too long, add it, other wise, add tempStr to txtList;
                    tempStr += tempTxt[j] + " ";
                } else {
                    if(j==0) {tempStr+=tempTxt[j];}                                     //if we are here when j is 0, we have one word that is longer then the maxWidth, so we just draw it
                    txtList.splice(i+addAmount,0,tempStr);                              //put tempStr in txtList
                    addAmount++;                                                        //move the position we put the tempStr in
                    tempStr="";                                                         //reset tempStr
                    tempTxt.splice(0,(j==0?1:j));                                       //delete words that have been used
                    j=-1;                                                               //make it so in the next loop, j starts at 0
                }
            }
            if(tempStr.length!=0) {
                txtList.splice(i+addAmount,0,tempStr);                                  //add any leftover text
            }
        }
    }

    for(let i=0;i<txtList.length;i++) {
        ctx.fillText(txtList[i],x,y+(i*size+i));
    }
}

function pDistance(x, y, x1, y1, x2, y2) {

  var A = x - x1;
  var B = y - y1;
  var C = x2 - x1;
  var D = y2 - y1;

  var dot = A * C + B * D;
  var len_sq = C * C + D * D;
  var param = -1;
  if (len_sq != 0) //in case of 0 length line
      param = dot / len_sq;

  var xx, yy;

  if (param < 0) {
    xx = x1;
    yy = y1;
  }
  else if (param > 1) {
    xx = x2;
    yy = y2;
  }
  else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }

  var dx = x - xx;
  var dy = y - yy;
  return Math.sqrt(dx * dx + dy * dy);
}

// https://stackoverflow.com/questions/10878209/midpoint-circle-algorithm-for-filled-circles
function circle(cx, cy, radius) {
    var error = -radius;
    var x = radius;
    var y = 0;

    while (x >= y) {
        var lastY = y;

        error += y;
        ++y;
        error += y;

        plot4points(cx, cy, x, lastY);

        if (error >= 0) {
            if (x != lastY) {
                plot4points(cx, cy, lastY, x);
            }
            error -= x;
            --x;
            error -= x;
        }
    }
    var center = previewList[0][1];
    previewList.shift();
    for(var i=0;i<previewList.length;i++) {
        if(previewList[i][1]>center) {
            previewList[i][1]--;
        }
    }

    var rw = projectInfo.w;
    var rh = projectInfo.h;
    var xoff = (rw%2)/2;
    var yoff = (rh%2)/2;
    for(var i=0;i<previewList.length;i++) {
        previewList[i][0]+=xoff;
        previewList[i][1]+=yoff;
    }
}

function plot4points(cx, cy, x, y) {
    horizontalLine(cx - x, cy + y, cx + x);
    if (y != 0)
        horizontalLine(cx - x, cy - y, cx + x);
}    

function horizontalLine(sx,y,ex) { 
    var w = ex - sx;
    previewList.push([sx,y,w,1]);
}

function limitNum(num,min,max) {
    if(num<min) {return min;}
    if(num>max) {return max;}
    return num;
}