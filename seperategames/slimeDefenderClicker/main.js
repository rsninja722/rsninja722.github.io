images = [
    "assets/text/small1.png",
    "assets/text/small2.png",
    "assets/text/small3.png",
    "assets/text/medium1.png",
    "assets/text/large1.png",
    "assets/btxt.png",
    "assets/btxthover.png",
    "assets/btxtpress.png",
    "assets/icon.png",
    "assets/duotur_16_ammo.png",
    "assets/slime1.png",
    "assets/slime2.png"
];

backgroundColor = "#68431e";

var money = 0;
var upgrades = {
    sps:{stat:0,price:20},
    spc:{stat:1,price:50},
    dmg:{stat:1,price:10},
    spd:{stat:2000,price:10},
    auto:{stat:0,price:100}
}
var autoSpeeds=[Infinity,1000,900,800,750,700,650,600,550,500,475,450,425,400,375,350,325,300,275,250,225,200,175,150,125,100,75,60,50,40,30,10];

var timers = {
    ps:{start:Date.now(),cur:Date.now()},
    auto:{start:Date.now(),cur:Date.now()},
    gun:{start:Date.now(),cur:Date.now()}
}

startUpdate(40);

function onImagesReady() {
    doFontStuff();// does things with fonts
}

turrot=0;
function update() {
    //update timers
    timers.ps.cur = Date.now();
    timers.auto.cur = Date.now();
    timers.gun.cur = Date.now();

    if(timers.ps.cur-timers.ps.start>=1000) { // $ per second
        if(upgrades.sps.stat>0) {
            orbs.push(new orb("sps",upgrades.sps.stat)); // spawn money orb at $/s button
        }
        timers.ps.start=timers.ps.cur;// update timer
    }
    if(timers.gun.cur-timers.gun.start>=upgrades.spd.stat) { // shooting
        if(slimes.length>0) {
            bullets.push(new bullet(turrot-degToRad(90)));
        }
        timers.gun.start=timers.gun.cur;// update timer
    }

    for(var i=0;i<buttons.length;i++) { //buttons
        buttons[i].update();
    }
    for(var i=0;i<orbs.length;i++) { //orbs
        if(orbs[i].update()) {
            orbs.splice(i,1);
        }
    }
    for(var i=0;i<slimes.length;i++) { //slimes
        if(slimes[i].update()) {
            slimes.splice(i,1);
        }
    }
    for(var i=0;i<bullets.length;i++) { //bullets
        if(bullets[i].update()) {
            bullets.splice(i,1);
        }
    }

    spawnSlime();

    if(mousePress[0]) {console.log(`x:${mousePos.x} y:${mousePos.y}`);}//temporary, used for positioning ui

    if(keyDown[k.LEFT]) {turrot+=0.01;}
    if(keyDown[k.RIGHT]) {turrot-=0.01;}

    for(var i=0;i<bullets.length;i++) {
        bullets[i].draw();
    }
    drawTurret();

    rect(300,0,200,400,"#272727");//sidebar
    rect(195,0,105,30,"#2d2d2d");//topbar

    for(var i=0;i<orbs.length;i++) {
        orbs[i].draw();
    }
    for(var i=0;i<buttons.length;i++) {
        buttons[i].draw();
    }
    for(var i=0;i<slimes.length;i++) {
        slimes[i].draw();
    }
    

    //rect(mousePos.x,mousePos.y,100,100,"#999999");
}

function buyUpgrade(button)  {
    switch(button.id) {
        case "sps": // $/second
            if(money>=upgrades.sps.price) {
                money-=upgrades.sps.price;
                if(upgrades.sps.price<50) {
                    upgrades.sps.price*=2;
                } else {
                    upgrades.sps.price*=1.25;
                }
                upgrades.sps.stat++;
            }
            break;
        case "spc": // $/click
            if(money>=upgrades.spc.price) {
                money-=upgrades.spc.price;
                if(upgrades.spc.price<250) {
                    upgrades.spc.price*=2.5;
                } else {
                    upgrades.spc.price*=1.75;
                }
                upgrades.spc.stat++;
            }
        case "auto": // auto clicker
            if(money>=upgrades.auto.price) {
                money-=upgrades.auto.price;
                upgrades.auto.price*=1.55;
            }
            break;
        case "dmg":
            if(money>=upgrades.dmg.price) {
                money-=upgrades.dmg.price;
                upgrades.dmg.stat++;
                upgrades.dmg.price*=1.55;
            }
            break;
        case "spd":
            if(money>=upgrades.spd.price) {
                money-=upgrades.spd.price;
                upgrades.spd.stat-=100;
                upgrades.spd.price*=1.55;
            }
            break;
        case "click": // $ button
            orbs.push(new orb("click",upgrades.spc.stat)); // spawn money orb at $ button
            break;
    }
}

function drawTurret() {
    var targetAngle=0;
    if(slimes.length>0) {
        var distance = 1000;
        var targetSlime=0;
        for(var j=0;j<slimes.length;j++) {
            var tempDistance=dist({x:300,y:200},slimes[j]);
            if(tempDistance<distance) {
                distance=tempDistance;
                targetSlime=j;
            }
        }
        targetAngle=pointTo({x:300,y:200},slimes[targetSlime]);
    }
    if(turrot>targetAngle) {turrot-=0.02;}
    if(turrot<targetAngle) {turrot+=0.02;}
    drawSpriteAdv(s.duotur_16_ammo,300,200,turrot,0.5);
}