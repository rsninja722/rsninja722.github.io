var gameRefreashSpeed = 0;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var mousePos;
canvas.addEventListener('mousemove', function(evt) {
        mousePos = getMousePos(canvas, evt);
      }, false);


//var canvasUpdate = setInterval(updateCanvas,gameRefreashSpeed);

var secon = setInterval(secfun,1000);
var framesg = 0;

function secfun() {
   document.getElementById("asd").innerHTML = framesg;
   framesg = 0;
}






requestAnimationFrame(updateCanvas);

//-----------------------------------------------------main loop-----------------------------------------------------
function updateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var l = particles.length;
    //for(var i=0;i<l;i++) {
    //    particles[i].move();
    //};
    for(var i=0;i<l;i++) {
        particles[i].update();
    };
    ctx.fillText(particles[5].ctype + particles[2].ctype, canvas.width/2, canvas.height/2);
    framesg+=1;
    requestAnimationFrame(updateCanvas);
}




function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
      
//-----------------------------------------------------bounce if on edge-----------------------------------------------------
function ifOnEdgeBounce(object) {
    if(object.x > canvas.width - object.w || object.x < 0) {
        var direction =  object.angl / Math.PI * 180;
        object.angl = setAngle(direction * -1);
    }
    if(object.y > canvas.height - object.h || object.y < 0) {
    var direction =  object.angl / Math.PI * 180;
        object.angl = setAngle(180 - direction);
    }
}


//-----------------------------------------------------bounce if on edge circles-----------------------------------------------------
function ifCircleOnEdgeBounce(object) {
    if(object.r + object.x > canvas.width || object.x - object.r < 0) {
        //var direction =  object.angl / Math.PI * 180;
        //object.angl = setAngle(direction * -1);
        //caculateVelocitys(object);
        object.velocity.x = -object.velocity.x;
        
    }
    if(object.r + object.y > canvas.height || object.y - object.r < 0) {
    //var direction =  object.angl / Math.PI * 180;
        //object.angl = setAngle(180 - direction);
        //caculateVelocitys(object);
        object.velocity.y = -object.velocity.y;
    }
}

function caculateVelocitys(object) {
    object.velocity.x = Math.sin(object.angl);
    object.velocity.y = Math.cos(object.angl);
}

//-----------------------------------------------------set angle with degrees-----------------------------------------------------
function setAngle(number) {
    return number * Math.PI / 180;
}

//-----------------------------------------------------drawing functions-----------------------------------------------------
function drawRect(x,y,w,h,color) {
    ctx.fillStyle = color;
    ctx.fillRect(x,y,w,h);
}
function drawRectRotate(x,y,w,h,color,angl) {
    ctx.setTransform(1, 0, 0, 1, x, y);
    ctx.rotate(angl);
    ctx.fillStyle = color;
    ctx.fillRect(-w / 2,-h / 2,w,h);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}      
function drawCircle(x,y,r,fillColor,lineColor,lineWidth) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.stroke();
}
function drawBasicCircle(x,y,r,fillColor) {
    ctx.beginPath();
    ctx.shadowBlur = 25;
    ctx.shadowColor = fillColor;
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = fillColor;
    ctx.stroke();
}
function drawPicRotate(x,y,w,h,angl,pic) {
    ctx.setTransform(1, 0, 0, 1, x, y);
    ctx.rotate(angl);
    ctx.drawImage(pic,-w/2,-h/2);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}

//-----------------------------------------------------distance between two points-----------------------------------------------------
function twoPointsDistance(object1,object2) {
    var one = (object2.x - object1.x);
    var two = (object2.y - object1.y);
    return Math.sqrt((one*one)+(two*two));
}		

//-----------------------------------------------------collision-----------------------------------------------------
//box collition
function collideBox(object1,object2) {
    if(object1.x + object1.w >= object2.x && 
       object1.x <= object2.x + object2.w &&
       object1.y + object1.h >= object2.y && 
       object1.y <= object2.y + object2.h) {
           return true;
       }
}

//circle collition
function collideCircle(object1,object2) {
    if( twoPointsDistance(object1,object2) < (object1.r + object2.r)) {
		return true;
	} else {
        return false;
    }
}

function circleBounce(object1,object2) {
    if( twoPointsDistance(object1,object2) < (object1.r + object2.r)) {
        var stored1x = object1.velocity.x;
        var stored1y = object1.velocity.y;
        var stored1speed = object1.speed;
        object1.velocity.x = object2.velocity.x * 0.99;
        object1.velocity.y = object2.velocity.y * 0.99;
        object1.speed = object2.speed;
        object2.velocity.x = stored1x * 0.99;
        object2.velocity.y = stored1y * 0.99;
        object2.speed = stored1speed;
        return true;
	} else {
        return false;
    }
}

function istouching(array,object) {
    var l = array.length;
    var objectstring = object.ctype;
    for(var k = 0; k < l; k++) {
        if(array[k] == object) { continue; }
        if((array[k].x - object.x) + (array[k].y - object.y) < 2 * (array[k].r + object.r)) {
            switch(array[k].ctype + objectstring) {
                case "circlecircle":
                    if(collideCircle(array[k],object)) { return true; } 
                    break;
                case "rectrect":
                    if(collideBox(array[k],object)) { return true; } 
                    break;
                case "circlerect":
                    
                    break;
                case "rectcircle":
                    
            }
        }
    }
    return false;
}
//-----------------------------------------------------random number-----------------------------------------------------
function randomNumber(min,max) {
    if(arguments[2] == undefined) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    } else {
        return (Math.floor(((Math.random() * (max - min + 1)) + min) * arguments[2])) / arguments[2];
    }
    
}
//===================circle test==================

/*
function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}

function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}*/

function rotate (x, y, sin, cos, reverse) {
    return {
      x: (reverse) ? (x * cos + y * sin) : (x * cos - y * sin),
      y: (reverse) ? (y * cos - x * sin) : (y * cos + x * sin)
    };
  }

  function checkCollision (ball0, ball1) {
    var dx = ball1.x - ball0.x,
        dy = ball1.y - ball0.y,
        dist = Math.sqrt(dx * dx + dy * dy);
    //collision handling code here
    if (dist < ball0.r + ball1.r) {
      //calculate angle, sine, and cosine
      var angle = Math.atan2(dy, dx),
          sin = Math.sin(angle),
          cos = Math.cos(angle),
          //rotate ball0's position
          pos0 = {x: 0, y: 0}, //point
          //rotate ball1's position
          pos1 = rotate(dx, dy, sin, cos, true),
          //rotate ball0's velocity
          vel0 = rotate(ball0.velocity.x, ball0.velocity.y, sin, cos, true),
          //rotate ball1's velocity
          vel1 = rotate(ball1.velocity.x, ball1.velocity.y, sin, cos, true),
          //collision reaction
          vxTotal = vel0.x - vel1.x;
      vel0.x = ((ball0.mass - ball1.mass) * vel0.x + 2 * ball1.mass * vel1.x) /
               (ball0.mass + ball1.mass);
      vel1.x = vxTotal + vel0.x;
      //update position - to avoid objects becoming stuck together
      var absV = Math.abs(vel0.x) + Math.abs(vel1.x),
          overlap = (ball0.r + ball1.r) - Math.abs(pos0.x - pos1.x);
      pos0.x += vel0.x / absV * overlap;
      pos1.x += vel1.x / absV * overlap;
      //rotate positions back
      var pos0F = rotate(pos0.x, pos0.y, sin, cos, false),
          pos1F = rotate(pos1.x, pos1.y, sin, cos, false);
      //adjust positions to actual screen positions
      ball1.x = ball0.x + pos1F.x;
      ball1.y = ball0.y + pos1F.y;
      ball0.x = ball0.x + pos0F.x;
      ball0.y = ball0.y + pos0F.y;
      //rotate velocities back
      var vel0F = rotate(vel0.x, vel0.y, sin, cos, false),
          vel1F = rotate(vel1.x, vel1.y, sin, cos, false);
      ball0.velocity.x = vel0F.x;
      ball0.velocity.y = vel0F.y;
      ball1.velocity.x = vel1F.x;
      ball1.velocity.y = vel1F.y;
    }
  }

//-----------------------------------------------------constructors-----------------------------------------------------
//example rectangle object constructor
function example(x,y,w,h,angl) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.angl = setAngle(angl);
    this.update = function() {
        this.x += Math.sin(this.angl);
        this.y -= Math.cos(this.angl);
        ifOnEdgeBounce(this);
        //if (collideBox(test1,test2) == true) {
            drawRectRotate(this.x ,this.y,this.w,this.h,"green",this.angl);
        //} else {
            //drawRectRotate(this.x,this.y,this.w,this.h,"red",this.angl);
        //}
        
    }
    return this;
}
//example cirlce object constructor
function circleExample(x,y,r,angl,speed,colorr) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.angl = setAngle(angl);
    this.colorr = colorr;
    this.velocity = {
        x:Math.sin(this.angl),
        y:Math.cos(this.angl)
    }
    this.speed = speed;
    this.mass = 1;
    this.ctype = "circle";
    this.move = function() {
        //this.x += 1;
        this.x += this.velocity.x * this.speed;
        this.y -= this.velocity.y * this.speed;
        this.velocity.y -= 0.05;
    }
    this.update = function() {
        var asuhf = 0;
        this.move(); 
        ifCircleOnEdgeBounce(this);
        var l = particles.length;   
        for(var i=0;i<l;i++) {
            if(this == particles[i]) {continue;}
            if(collideCircle(this,particles[i]) == true) {
                //checkCollision (this,particles[i]);
                circleBounce(this,particles[i]);
            }
        }
        //drawBasicCircle(this.x,this.y,this.r,"green");
        //drawBasicCircle(this.x,this.y,this.r,"green");
        
       if(istouching(particles,this)) {
            asuhf = 1;
            //circleBounce(this,particles[i]);
        } 
        if(asuhf == 1) {
            //drawRect(this.x,this.y,50,50,"green");
            drawBasicCircle(this.x,this.y,this.r,"red");
        } else {
            //drawRect(this.x,this.y,50,50,this.colorr);
            drawBasicCircle(this.x,this.y,this.r,this.colorr);   
        }
    }
    return this;
}


function exampletwo(x,y,w,h,angl) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.angl = setAngle(angl);
    this.update = function() {
        this.x += Math.sin(this.angl);
        this.y -= Math.cos(this.angl);
        ifOnEdgeBounce(this);
        //if (collideBox(test1,test2) == true) {
            drawRect(this.x,this.y,this.w,this.h,"green");
        //} else {
            //drawRectRotate(this.x,this.y,this.w,this.h,"red",this.angl);
        //}
        
    }
    return this;
}
