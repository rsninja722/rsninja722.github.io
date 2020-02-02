// index
// contains file paths, setup, and main update loop

// TODO
/*
- pix: downloading blend and layer hiding


*/
// image file paths for sprite loading
images = [
    "assets/images/",
    [
        "keys/",
        "a.png", "b.png", "c.png", "d.png", "e.png", "f.png", "g.png", "h.png", "i.png", "j.png", "k.png", "l.png", "m.png", "n.png", "o.png", "p.png", "q.png", "r.png", "s.png", "t.png", "u.png", "v.png", "w.png", "x.png", "y.png", "z.png", "0.png", "1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png"
    ],
    [
        "player/",
        "base0.png",
        "wheel0.png",
        "wheel1.png",
        "chassis.png",
        "spring0.png",
        "spring1.png",
        "spring2.png",
        "core0.png",
        "core1.png",
        "core2.png",
        "eyes0.png",
        "eyes1.png",
        "eyes2.png",
        "claw.png",
        "clawRight.png"
    ],
    [
        "levels/",
        "top0.png",
        "mid0.png",
        "back0.png",
        "sky0.png"
    ],
    "keyBack.png",
    "keyBackPress.png",
    "keyBackWarn.png",
    "keyBackPressWarn.png"
];

// sound file paths for audio loading
audio = [
    "assets/audio/",
    "noKey.wav"
];

var updateCount = 0;

// called once after all audio and images load 
function onAssetsLoaded() {
    switchLevel(0);
    screenSize = "fit";
    canvasScale = 0;
}

// main physics loop
function update() {
    updateCount++;
    
    updateKeys();
    
    updatePlayer();

    updateParticles();

    if (buildMode) { buildUpdate(); }
}

// start loading, setup game.js stuff, and call update at 60 fps
setup(60);