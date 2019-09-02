//collision code from: http://jeffreythompson.org/collision-detection/line-circle.php
function lineCircle(x1, y1, x2, y2, cx, cy, r) {

    var inside1 = pointCircle(x1,y1, cx,cy,r);
    var inside2 = pointCircle(x2,y2, cx,cy,r);
    if (inside1 || inside2) {return true;}

    var distX = x1 - x2;
    var distY = y1 - y2;
    var len = Math.sqrt( (distX*distX) + (distY*distY) );

    var dot = ( ((cx-x1)*(x2-x1)) + ((cy-y1)*(y2-y1)) ) / (len * len);

    var closestX = x1 + (dot * (x2-x1));
    var closestY = y1 + (dot * (y2-y1));

    var onSegment = linePoint(x1,y1,x2,y2, closestX,closestY);
    if (!onSegment) {return false;}

    distX = closestX - cx;
    distY = closestY - cy;
    var distance = Math.sqrt( (distX*distX) + (distY*distY) );

    if (distance <= r) {
        return true;
    }
    return false;
}

function pointCircle(px, py, cx, cy, r) {
    var distX = px - cx;
    var distY = py - cy;
    var distance = Math.sqrt( (distX*distX) + (distY*distY) );

    if (distance <= r) {
        return true;
    }
    return false;
}

function linePoint(x1, y1, x2, y2, px, py) {
    var d1 = distance(px,py, x1,y1);
    var d2 = distance(px,py, x2,y2);

    var lineLen = distance(x1,y1, x2,y2);

    var buffer = 0.1;

    if (d1+d2 >= lineLen-buffer && d1+d2 <= lineLen+buffer) {
        return true;
    }
    return false;
}

function distance(x1,y1,x2,y2) {
    let one = (x2 - x1);
    let two = (y2 - y1);
    return Math.sqrt((one*one)+(two*two));
}


function lineRect(x1, y1, x2, y2, rx, ry, rw, rh) {
    rx = rx - rw/2;
    ry = ry - rh/2;
    var left =   lineLine(x1,y1,x2,y2, rx,ry,rx, ry+rh);
    var right =  lineLine(x1,y1,x2,y2, rx+rw,ry, rx+rw,ry+rh);
    var top =    lineLine(x1,y1,x2,y2, rx,ry, rx+rw,ry);
    var bottom = lineLine(x1,y1,x2,y2, rx,ry+rh, rx+rw,ry+rh);

    if (left || right || top || bottom) {
        return true;
    }
    return false;
}


function lineLine(x1, y1, x2, y2, x3, y3, x4, y4) {
    var uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
    var uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));

    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
        return true;
    }
    return false;
}