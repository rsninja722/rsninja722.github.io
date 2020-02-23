var agents = [];
var speed = 1;
var turnMulti = 1;
var spacing = 0.4;
var distance = 50;

function restart() {
    agents.sort(compare);
    
    for (var i = 0, l = agents.length; i < l; i++) {
        if(agents[i].x < 50) {
            agents[i].weights = randArray(5);
            agents[i].biases = randArray(2);
        }
        agents[i].x = 0;
        agents[i].y = 0;
        agents[i].angle = rand(-10,10)/100;
        agents[i].alive = true;
    }

    var indexHalf = Math.floor(agents.length / 2);

    agents.splice(indexHalf-25, indexHalf+25);

    for (var i = 0, l = agents.length; i < l; i++) {
        var a = agents[i];
        agents.push(new agent(a.x, a.y, mutate(a.weights), mutate(a.biases), a.eyeSpacing));
        agents.push(new agent(a.x, a.y, mutate(mutate(a.weights)), mutate(mutate(a.biases)), a.eyeSpacing));
        agents.push(new agent(a.x, a.y, mutate(a.weights), mutate(a.biases), a.eyeSpacing));
        if(l-i > 15) {
            if(rand(0,3)==0) {
                agents[i].weights = mutate(agents[i].weights);
            }
        }
    }
}

function compare(a, b) {
    if (a.score < b.score) {
        return 1;
    }
    if (a.score > b.score) {
        return -1;
    }
    return 0;
}

function addAgent(x, y) {
    agents.push(new agent(x, y, randArray(5), randArray(2), spacing));
}

function randArray(size) {
    var a = [];
    for (let i = 0; i < size; i++) {
        a.push(rand(-20, 20) * 0.1);
    }
    return a;
}

function mutate(arr) {
    for (var j = 0; j < arr.length; j++) {
        if (rand(0, 1) == 1) {
            arr[j] += rand(-10, 10) / 20;
        }
    }
    return arr;
}

class agent {
    constructor(x, y, weights, biases, eyeSpacing) {
        this.x = x;
        this.y = y;
        this.angle = 0;
        this.score = 0;

        this.pointL = { x: x, y: y };
        this.pointR = { x: x, y: y };

        // hitting, distance
        this.in1 = [false, 0];
        this.in2 = [false, 0];

        this.eyeSpacing = eyeSpacing;

        this.w = 10;
        this.h = 10;

        this.weights = weights;
        this.biases = biases;

        this.color = "#aaa";

        this.alive = true;
        this.time = 0;
    }
}

function drawAgents() {
    for (var j = 0, jl = agents.length; j < jl; j++) {
        agents[j].draw();
    }
}

function updateAgents() {
    var farthest = [0,0];
    for (var j = 0, jl = agents.length; j < jl; j++) {
        if(agents[j].alive) {
            agents[j].update();
        }
        if(agents[j].x > farthest[0]) {
            farthest = [agents[j].x,j];
        }
    }
    return farthest[1];
}

agent.prototype.draw = function () {
    line(this.x, this.y, this.pointL.x, this.pointL.y);
    line(this.x, this.y, this.pointR.x, this.pointR.y);
    rect(this.x, this.y, this.w, this.h, this.color);

}

agent.prototype.update = function () {
    this.time++;
    vx = Math.cos(this.angle) * speed;
    vy = Math.sin(this.angle) * speed;

    var nearBlocks = this.getNearBlocks();

    this.x += vx;
    if (this.colliding(nearBlocks)) {
        // this.alive = false;
        this.x -= vx;
    }

    this.y += vy;

    if (this.colliding(nearBlocks)) {
        // this.alive = false;
        this.y -= vy;
    }

    var angleL = this.angle - this.eyeSpacing;
    this.pointL = { x: this.x + Math.cos(angleL) * distance, y: this.y + Math.sin(angleL) * distance };

    var angleR = this.angle + this.eyeSpacing;
    this.pointR = { x: this.x + Math.cos(angleR) * distance, y: this.y + Math.sin(angleR) * distance };

    this.in1[0] = false;
    this.in2[0] = false;
    this.eyeTriggered(nearBlocks);

    this.angle += sigmoid(this.weights[3] * this.angle + this.weights[4] * this.biases[1]) / 25 * turnMulti;
    this.color = "#666";
    // both on
    if (this.in1[0] && this.in2[0]) {
        this.angle += sigmoid(this.in1[1] * this.weights[0] + this.in2[1] * this.weights[1] + this.biases[0] * this.weights[2]) / 50 * turnMulti;
        this.color = "#7f7";
        // left on
    } else if (this.in1[0]) {
        this.angle += sigmoid(this.in1[1] * this.weights[0] + this.biases[0] * this.weights[2]) / 50 * turnMulti;
        this.color = "#77f";
        // right on
    } else if (this.in2[0]) {
        this.angle += sigmoid(this.in2[1] * this.weights[1] + this.biases[0] * this.weights[2]) / 50 * turnMulti;
        this.color = "#f77";
        // none on, turn weather nearest block is above or below    
    } else {
        
    }

    this.score = this.x - Math.abs(this.y); //+ this.time/8;
}

function sigmoid(z) {
    return -0.5 + (1 / (1 + Math.exp(-z)));
}

agent.prototype.getNearBlocks = function () {
    var nearBlocks = [];
    var x = this.x;
    var y = this.y;
    for (var i = 0; i < blocks.length; i++) {
        if (Math.abs(blocks[i].x - x) < 60 && Math.abs(blocks[i].y - y) < 60) {
            nearBlocks.push(i);
        }
    }
    return nearBlocks;
}

agent.prototype.colliding = function (blockList) {
    for (var i = 0, l = blockList.length; i < l; i++) {
        if (rectrect(this, blocks[blockList[i]])) {
            return true;
        }
    }
    return false;
}

agent.prototype.eyeTriggered = function (blockList) {

    var points = [];
    var halfScale = gridScale / 2;
    for (var i = 0, l = blockList.length; i < l; i++) {
        var b = blocks[blockList[i]];
        if (lineRect(this.x, this.y, this.pointL.x, this.pointL.y, b.x - halfScale, b.y - halfScale, gridScale, gridScale)) {
            if (points.length === 1) {
                this.in1 = [true, dist(this, points[0])];
            } else {
                this.in1 = [true, Math.min(dist(this, points[0]), dist(this, points[1]))];
            }
            points = [];
            break;
        }
    }

    for (var i = 0, l = blockList.length; i < l; i++) {
        var b = blocks[blockList[i]];
        if (lineRect(this.x, this.y, this.pointR.x, this.pointR.y, b.x - halfScale, b.y - halfScale, gridScale, gridScale)) {
            if (points.length === 1) {
                this.in2 = [true, dist(this, points[0])];
            } else {
                this.in2 = [true, Math.min(dist(this, points[0]), dist(this, points[1]))];
            }
            points = [];
            break;
        }
    }

    //http://www.jeffreythompson.org/collision-detection/line-rect.php
    function lineRect(x1, y1, x2, y2, rx, ry, rw, rh) {

        // check if the line has hit any of the rectangle's sides
        // uses the Line/Line function below
        var left = lineLine(x1, y1, x2, y2, rx, ry, rx, ry + rh);
        var right = lineLine(x1, y1, x2, y2, rx + rw, ry, rx + rw, ry + rh);
        var top = lineLine(x1, y1, x2, y2, rx, ry, rx + rw, ry);
        var bottom = lineLine(x1, y1, x2, y2, rx, ry + rh, rx + rw, ry + rh);

        // if ANY of the above are true, the line
        // has hit the rectangle
        if (left || right || top || bottom) {
            return true;
        }
        return false;
    }


    // LINE/LINE
    function lineLine(x1, y1, x2, y2, x3, y3, x4, y4) {

        // calculate the direction of the lines
        var uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
        var uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

        // if uA and uB are between 0-1, lines are colliding
        if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
            var intersectionX = x1 + (uA * (x2 - x1));
            var intersectionY = y1 + (uA * (y2 - y1));
            points.push({ x: intersectionX, y: intersectionY });

            if (addToBuffer) {
                // optionally, draw a circle where the lines meet

                circleBuffer.push([intersectionX, intersectionY]);
            }

            return true;
        }
        return false;
    }
}