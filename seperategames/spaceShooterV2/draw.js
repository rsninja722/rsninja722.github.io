
function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);

    
    ctx.drawImage(p.back1,0,~~(timer/4)%300-300);
    ctx.drawImage(p.back1,0,~~(timer/4)%300);

    ctx.drawImage(p.back2,0,~~(timer/2)%300-300);
    ctx.drawImage(p.back2,0,~~(timer/2)%300);
    
    for(var i=0;i<particles.length;i++) {
        particles[i].draw();
    }
    for(var i=0;i<bads.length;i++) {
        bads[i].draw();
    }
    for(var i=0;i<bullets.length;i++) {
        bullets[i].draw();
    }
    for(var i=0;i<player.length;i++) {
        player[i].draw();
    }

    

    requestAnimationFrame(draw);
}