images = [
    ""
];

audio = [
    ""
];

var c = { x: 0, y: 0 };
var targetX = 0;
var targetY = 0;
var autoTime = 0;

var cycleTime;

var startTime = Date.now();

function update() {
    if(circleBuffer.length === 0) {
        addToBuffer = true;
    } else {
        addToBuffer = false;
    }
    targetX = agents[updateAgents()].x;
    targetY = agents[updateAgents()].y;
    updateAgents();

    

    cycleTime = parseInt(document.getElementById("time").value) * 1000;

    if(Date.now() - startTime > cycleTime) {
        restart();
        startTime = Date.now();
    } else{
        var shouldRestart = true;
        for(var i=0;i<agents.length;i++) {
            if(agents[i].alive === true) {
                shouldRestart = false;
                break;
            }
        }
        if(shouldRestart) {
            restart();
            startTime = Date.now();
        }
    }
}

function input() {
    var manual = false;
    if (keyDown[k.LEFT] || keyDown[k.a]) { moveCamera(-2 * (1 / camera.zoom), 0); c.x += -2 * (1 / camera.zoom); manual = true; }
    if (keyDown[k.RIGHT] || keyDown[k.d]) { moveCamera(2 * (1 / camera.zoom), 0); c.x += 2 * (1 / camera.zoom); manual = true; }
    if (keyDown[k.UP] || keyDown[k.w]) { moveCamera(0, -2 * (1 / camera.zoom)); c.y += -2 * (1 / camera.zoom); manual = true; }
    if (keyDown[k.DOWN] || keyDown[k.s]) { moveCamera(0, 2 * (1 / camera.zoom)); c.y += 2 * (1 / camera.zoom); manual = true; }

    if (keyPress[k.EQUALS]) { camera.zoom++; }
    if (keyPress[k.MINUS]) { camera.zoom--; }
    camera.zoom += scroll;

    if (manual) {
        autoTime = 0;
    } else {
        autoTime++;
    }

    if (autoTime > 1000) {
        c.x = lerp(c.x, targetX, 0.01);
        c.y = lerp(c.y, targetY, 0.01);
        centerCameraOn(c.x, c.y);
    }
}

function lerp(start, end, amt) { return (1 - amt) * start + amt * end; }

var circleBuffer = [];
var addToBuffer = false;
function draw() {
    curCtx.strokeStyle = "#cccccc";

    drawAgents();
    drawBlocks();

    for(var i=0;i<circleBuffer.length;i++) {
        rect(circleBuffer[i][0],circleBuffer[i][1],2,2,"blue");
    }
    circleBuffer = [];
}

function absoluteDraw() {

}

function onAssetsLoaded() {
    for (var i = 0; i < 100; i++) {
        addAgent(0, 0);
    }

    for (var y = -gridH / 2; y < gridH / 2; y++) {
        for (var x = -gridW / 8; x < gridW; x++) {
            if (rand(0, 5) === 1) {
                if (dist({ x: 0, y: 0 }, { x: x, y: y }) > 4) {
                    blocks.push(new block(x * gridScale, y * gridScale));
                }
            }
        }
    }
    centerCameraOn(0, 0);
}

setup(100);