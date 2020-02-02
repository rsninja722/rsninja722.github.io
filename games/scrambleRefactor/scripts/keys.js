var keyPositions = [[-23, 0], [23, 0], [0, -25]]; // where the keys should appear relative to the player 
var keys = ["a", "d", "w"]; // left right up - keys corresponding to controls
var animationKeys = ["a", "d", "w"]; // for slam animation
var pressed = [0, 0, 0]; // for pressing visualization
var keyList = "abcdefghijklmnopqrstuvwxyz1234567890"; // list of keys names for k variable the input can be set as

// counters for key switching
var keyTimer = 200; // must be bigger than 151
var keyAnimation = 0;
var keyTimeInterval = 750; // must be bigger than 151

// randomization of key switching
var bag = [0, 1, 2];
var currentKeySwitch;

function updateKeys() {
    // key switching
    keyTimer--;
    if (keyTimer == 150) {
        var rng = rand(0, bag.length - 1);
        currentKeySwitch = bag[rng];
        bag.splice(rng, 1);
        if (bag.length == 0) {
            bag = [0, 1, 2];
        }
    }

    // start switching animation
    if (keyTimer == 20) {
        keyAnimation = 30;
        animationKeys[currentKeySwitch] = keyList[rand(0, 35)];
        // if left and right keys are the same, make them not the same
        if (currentKeySwitch == 0) {
            while (animationKeys[0] == keys[1]) {
                animationKeys[0] = keyList[rand(0, 35)];
            }
        }
        if (currentKeySwitch == 1) {
            while (animationKeys[1] == keys[0]) {
                animationKeys[1] = keyList[rand(0, 35)];
            }
        }
    }

    // reset time
    if (keyTimer < 0) {
        keyTimer = keyTimeInterval;
    }

    // step animation
    if (keyAnimation > 0) {
        keyAnimation--;
        // if it is time to switch keys, switch keys
        if (keyAnimation == 0) {
            keys[currentKeySwitch] = animationKeys[currentKeySwitch];
            for (var i = 0; i < 25; i++) {
                particles.push(new particle(keyPositions[currentKeySwitch][0] + player.x, keyPositions[currentKeySwitch][1] + player.y, "key"));
            }
        }
    }

    // key doesn't work sound
    for (var i = 0; i < keyList.length; i++) {
        var ki = keyList[i];
        if (!keys.includes(ki)) {
            if (keyPress[k[ki]]) {
                play(sounds.noKey);
            }
        }
    }
}

function drawKeys() {
    for (var i = 0; i < 3; i++) {
        if (currentKeySwitch == i && keyAnimation != 0) {
            var size = 1;
            if (keyAnimation > 22) {
                size = (30 - keyAnimation) / 5;
            } else if (keyAnimation < 23 && keyAnimation > 15) {
                size = 1.4;
            } else {
                size = map_range(keyAnimation, 0, 14, 1, 1.4);
            }
            img(sprites.keyBack, keyPositions[i][0] + player.x, keyPositions[i][1] + player.y, 0, size, size);
        } else if (currentKeySwitch == i && keyTimer < 100) {
            if (pressed[i]) {
                img(sprites[`keyBackPress${(Math.round(keyTimer / 10) % 2 ? "Warn" : "")}`], keyPositions[i][0] + player.x, keyPositions[i][1] + player.y, 0, 0.9, 0.9);
            } else {
                img(sprites[`keyBack${(Math.round(keyTimer / 10) % 2 ? "Warn" : "")}`], keyPositions[i][0] + player.x, keyPositions[i][1] + player.y);
            }
        } else {
            if (pressed[i]) {
                img(sprites.keyBackPress, keyPositions[i][0] + player.x, keyPositions[i][1] + player.y, 0, 0.9, 0.9);
            } else {
                img(sprites.keyBack, keyPositions[i][0] + player.x, keyPositions[i][1] + player.y);
            }
        }
    }
    for (var i = 0; i < 3; i++) {
        if (currentKeySwitch == i && keyAnimation != 0) {
            var size = 1;
            if (keyAnimation > 22) {
                size = (30 - keyAnimation) / 5;
            } else if (keyAnimation < 23 && keyAnimation > 15) {
                size = 1.4;
            } else {
                size = map_range(keyAnimation, 0, 14, 1, 1.4);
            }
            img(sprites[animationKeys[i]], keyPositions[i][0] + player.x, keyPositions[i][1] + player.y, 0, size, size);
        } else {
            img(sprites[keys[i]], keyPositions[i][0] + player.x, keyPositions[i][1] + player.y);
        }
    }
}

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}