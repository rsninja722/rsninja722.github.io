var colors = ["blue","purple","green","yellow","pink","orange"];
var muchmany = 25
var particles = [];
for(var i = 0;i<muchmany;i++){
    const x = randomNumber(30,400);
    const y = randomNumber(30,400);
    const angl = randomNumber(0,359);
    const speed = 3//randomNumber(1,3,10);
    particles.push(new circleExample(x,y,randomNumber(15,20),angl,speed,colors[randomNumber(0,5)]));
}
//particles.push(new circleExample(250,250,25,70,1,"purple"));
//particles.push(new circleExample(200,200,20,45,1,"yellow"));

for(var j = 0; j <muchmany; j++) {
    for(var i = 0;i<muchmany;i++){
        if(particles[j] == particles[i]) {continue;}
        if(collideCircle(particles[j],particles[i])) {
            particles[j].x = randomNumber(30,460);
            particles[j].y = randomNumber(30,460);
            j = 0;
        }
    }
}


/*billiard ball collisions for /u/allanp000 

var parseColor = function(color, toNumber) {
    if (toNumber === true) {
        if (typeof color === 'number') {
            return (color | 0); //chop off decimal
        }
        if (typeof color === 'string' && color[0] === '#') {
            color = color.slice(1);
        }
        return window.parseInt(color, 16);
    } else {
        if (typeof color === 'number') {
            color = '#' + ('00000' + (color | 0).toString(16)).substr(-6); //pad
        }
        return color;
    }
};
function Ball(radius, color) {
    if (radius === undefined) {
        radius = 40;
    }
    if (color === undefined) {
        color = "#ff0000";
    }
    this.x = 0;
    this.y = 0;
    this.r = radius;
    this.velocity.x = 0;
    this.velocity.y = 0;
    this.mass = 1;
    this.rotation = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.color = parseColor(color);
    this.lineWidth = 1;
}

Ball.prototype.draw = function(context) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.rotation);
    context.scale(this.scaleX, this.scaleY);

    context.lineWidth = this.lineWidth;
    context.fillStyle = this.color;
    context.beginPath();
    //x, y, radius, start_angle, end_angle, anti-clockwise
    context.arc(0, 0, this.r, 0, (Math.PI * 2), true);
    context.closePath();
    context.fill();
    if (this.lineWidth > 0) {
        context.stroke();
    }
    context.restore();
};

Ball.prototype.getBounds = function() {
    return {
        x: this.x - this.r,
        y: this.y - this.r,
        width: this.r * 2,
        height: this.r * 2
    };
};

  window.onload = function () {
      var canvas = document.getElementById('canvas'),
          context = canvas.getContext('2d'),
          balls = [],
          numBalls = 15,
          bounce = -1.0;

      for (var radius, ball, i = 0; i < numBalls; i++) {
        radius = Math.random() * 20 + 15;
        ball = new Ball(radius, Math.random() * 0xffffff);
        ball.mass = radius;
        ball.x = Math.random() * canvas.width;
        ball.y = Math.random() * canvas.height;
        ball.velocity.x = Math.random() * 10 - 5;
        ball.velocity.y = Math.random() * 10 - 5;
        balls.push(ball);
      }

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

      function checkWalls (ball) {
        if (ball.x + ball.r > canvas.width) {
          ball.x = canvas.width - ball.r;
          ball.velocity.x *= bounce;
        } else if (ball.x - ball.r < 0) {
          ball.x = ball.r;
          ball.velocity.x *= bounce;
        }
        if (ball.y + ball.r > canvas.height) {
          ball.y = canvas.height - ball.r;
          ball.velocity.y *= bounce;
        } else if (ball.y - ball.r < 0) {
          ball.y = ball.r;
          ball.velocity.y *= bounce;
        }
      }

      function move (ball) {
        ball.x += ball.velocity.x;
        ball.y += ball.velocity.y;
        checkWalls(ball);
      }

      function draw (ball) {
        ball.draw(context);
      }

      (function drawFrame () {
        window.requestAnimationFrame(drawFrame, canvas);
        context.clearRect(0, 0, canvas.width, canvas.height);

        balls.forEach(move);
        for (var ballA, i = 0, len = numBalls - 1; i < len; i++) {
          ballA = balls[i];
          for (var ballB, j = i + 1; j < numBalls; j++) {
            ballB = balls[j];
            checkCollision(ballA, ballB);
          }
        }
        balls.forEach(draw);
      }());
    };
*/
