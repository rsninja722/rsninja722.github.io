function rect(x,y,w,h,color) {
    ctx.fillStyle = color;
    ctx.fillRect(x,y,w,h);
}

function picRotate(x,y,angle,pic,w,h) {
    //ctx.scale(0.5,0.5);
    ctx.setTransform(ctxscale, 0, 0, ctxscale, x, y);
    switch(angle) {
        case 1:
            ctx.rotate(0);
            break;
        case 2:
            ctx.setTransform(ctxscale, 0, 0, ctxscale, x+w, y);
            ctx.rotate(setAngle(90));
            break;
        case 3:
            ctx.setTransform(ctxscale, 0, 0, ctxscale, x+w, y+h);
            ctx.rotate(setAngle(180));
            break;
        case 4:
            ctx.setTransform(ctxscale, 0, 0, ctxscale, x, y+h);
            ctx.rotate(setAngle(270));
            break;
    }
    
    ctx.drawImage(pic, 0, 0);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function pic(x,y,pic) {
    ctx.drawImage(pic, x, y);
}