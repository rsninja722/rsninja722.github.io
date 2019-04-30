images = [
    "assets/text/small1.png","assets/text/small2.png","assets/text/small3.png","assets/text/medium1.png","assets/text/large1.png",
    "assets/txtDefult.png","assets/txtHover.png","assets/txtPress.png",
    "assets/imgDefult.png","assets/imgHover.png","assets/imgPress.png",
    "assets/bigDefult.png","assets/bigPress.png",
    "assets/icon.png",
    "assets/duoturBarrel.png","assets/duoturBase.png","assets/duoturRingreload.png","assets/duoturRingreload2.png",
    "assets/slime1.png","assets/slime2.png",
    "assets/pipe.png",
    "assets/moneybox.png",
    "assets/attachbox.png",
    "assets/piston.png",
    "assets/dirt.png",
    "assets/speedup.png","assets/speedupPress.png",
    "assets/dmg.png",
    "assets/orbSmall.png","assets/orbLarge.png",
    "assets/Boss00.png","assets/Boss01.png","assets/Boss10.png","assets/Boss11.png",
    "assets/rock1.png","assets/rock2.png",
    "assets/sound1.png","assets/sound0.png","assets/expand1.png","assets/expand0.png",
    "assets/bullet1.png","assets/bullet2.png","assets/bullet3.png","assets/bullet4.png","assets/bullet5.png","assets/bullet6.png"
];

var sound=true;

backgroundColor = "#68431e";

/*
    art to do
        -bullet
        -thumbnail
    -saving
    -balencing
    -upgrade maxes
    -sound
    -pause
    -sound settings
    -music
*/

var money = 0;
var upgrades = {
    sps:{stat:0,price:20},
    spc:{stat:1,price:50},
    dmg:{stat:1,price:10},
    spd:{stat:1000,price:10},
    auto:{stat:0,price:100},
    scrollClick:{stat:false}
}
var autoSpeeds=[Infinity,1000,900,800,750,700,650,600,550,500,450,400,350,300,275,250,225,200,175,150,125,100,75,60,50,40,30,10];
var screenShake = [0,1,-1,2,-2,3,-3,4,-4,5,-5,6,-6,7,-7];
var curShake=0;
var gameDone=0;

var timers = {
    ps:{start:Date.now(),cur:Date.now()},
    auto:{start:Date.now(),cur:Date.now()},
    gun:{start:Date.now(),cur:Date.now()}
}
var spsAnim=0;
var autoAnim=0;
var clickTimer=0;

var turrot=0;
var recoil=0;

startUpdate("auto");
setInterval(physics,1000/50);

function onImagesReady() {
    doFontStuff();// does things with fonts
}


function update() {
    camera.x=screenShake[curShake];
    if(curShake>0) {
        curShake--;
        window.navigator.vibrate(100);
    }
    for(var y=70;y<410;y+=20) {
        for(var x=10;x<310;x+=20) {
            drawSprite(s.dirt,x,y);
        }
    }
    
    // drawSpriteAdv(s.rock1,6,390,0,1);
    // drawSpriteAdv(s.rock1,132,388,1,1.1);
    // drawSpriteAdv(s.rock1,214,384,-0.3,0.9);
    // drawSpriteAdv(s.rock1,9,73,1.5,1.15);
    // drawSpriteAdv(s.rock1,203,71,3,0.8);

    // drawSpriteAdv(s.rock2,52,76,0,1);
    // drawSpriteAdv(s.rock2,118,70,1.5,1.1);
    // drawSpriteAdv(s.rock2,49,375,-0.7,0.9);
    // drawSpriteAdv(s.rock2,259,375,2,1.15);
    // drawSpriteAdv(s.rock2,18,112,-1.6,0.8);

    for(var i=0;i<particles.length;i++) { // particles
        if(particles[i].type!="purchace"&&particles[i].type!="boss") { particles[i].draw(); }
    }

    for(var i=0;i<bullets.length;i++) {
        bullets[i].draw();
    }
    drawTurret();

    rect(300,0,200,400,"#272727"); // sidebar
    
    rect(0,0,300,60,"#2d2d2d"); // topbar
        rect(0,25,170,5,"#3f3f3f") // seperator
        rect(0,55,270,5,"#3f3f3f") // bottom border

    drawSprite(s.pipe,294,97); // orb pipe

    for(var i=0;i<orbs.length;i++) { // orbs
        orbs[i].draw();
    }
    
    drawSprite(s.moneybox,235,15); // rectangle on ui with money stat

    if(spsAnim>0) {
        buttons[2].state="hover";
        spsAnim--;
    }
    //piston push animation
    var pistonPos=287;
    if(autoAnim==5||autoAnim==1) {pistonPos=282;}
    if(autoAnim==4||autoAnim==2) {pistonPos=276;}
    if(autoAnim==3) {pistonPos=270;}
    if(autoAnim>0) {
        autoAnim--;
    }
    if(autoAnim==3) {
        clickTimer=3;
    }
    drawSprite(s.piston,380,pistonPos);

    for(var i=0;i<buttons.length;i++) { // buttons
        buttons[i].draw();
        if(buttons[i].id!="click") { 
            drawSprite(s.attachbox,buttons[i].x+buttons[i].w+25,buttons[i].y+20);
        }
    }
    for(var i=0;i<slimes.length;i++) { // slimes
        slimes[i].draw();
    }
    for(var i=0;i<particles.length;i++) { // particles
        if(particles[i].type=="purchace"||particles[i].type=="boss") { particles[i].draw(); }
    }

    rect(0,380,40,20,"#2d2d2d");
    drawSprite(s[`sound${(sound?1:0)}`],10,390);
    drawSprite(s[`expand${(gameScale==1?1:0)}`],30,390);
}

function input() {
    for(var i=0;i<buttons.length;i++) { //buttons
        buttons[i].update(false);
    }
    if(mousePress[0]) {
        //console.log(`x:${mousePos.x} y:${mousePos.y}`);
        if(pointRect(mousePos,{x:2,y:382,w:16,h:16})) {
            if(sound==1) {sound=0;} else {sound=1;}
        }
        if(pointRect(mousePos,{x:22,y:382,w:16,h:16})) {
            if(gameScale==1) {gameScale=2;} else {gameScale=1;}
        }
    }
    resetInput();
}

function physics() {
    if(gameDone>1) {
        gameDone--;
    }
    if(gameDone==2) {
        setTimeout(function() {textAnims.push( new textAnim(230,210,"large1",`y`,[0,212,255,255],"wave"));},100);
        setTimeout(function() {textAnims.push( new textAnim(250,210,"large1",`o`,[0,212,255,255],"wave"));},200);
        setTimeout(function() {textAnims.push( new textAnim(270,210,"large1",`u`,[0,212,255,255],"wave"));},300);

        setTimeout(function() {textAnims.push( new textAnim(220,230,"large1",`w`,[18,235,255,255],"wave"));},400);
        setTimeout(function() {textAnims.push( new textAnim(240,230,"large1",`i`,[18,235,255,255],"wave"));},400);
        setTimeout(function() {textAnims.push( new textAnim(260,230,"large1",`n`,[18,235,255,255],"wave"));},400);
        setTimeout(function() {textAnims.push( new textAnim(280,230,"large1",`!`,[18,235,255,255],"wave"));},400);
    }
    //update timers
    timers.ps.cur = Date.now();
    timers.auto.cur = Date.now();
    timers.gun.cur = Date.now();

    if(timers.ps.cur-timers.ps.start>=1000) { // $ per second
        if(upgrades.sps.stat>0) {
            orbs.push(new orb("sps",upgrades.sps.stat)); // spawn money orb at $/s button
            spsAnim=3; // animate 
        }
        timers.ps.start=timers.ps.cur;// update timer
    }

    if(timers.gun.cur-timers.gun.start>=upgrades.spd.stat) { // shooting
        if(slimes.length>0) {
            bullets.push(new bullet(turrot-degToRad(90)));
            recoil=5.5;
            var pxspawn = 300+Math.sin(turrot-1.5707963)*40;
            var pyspawn = 225+Math.cos(turrot-1.5707963)*40;
            for(let i=0;i<50;i++) {
                particles.push(new particle(pxspawn,pyspawn,"shoot"));
            }
        }
        timers.gun.start=timers.gun.cur;// update timer
    }

    if(timers.auto.cur-timers.auto.start>=autoSpeeds[upgrades.auto.stat]) { // auto click
        autoAnim=5;
        orbs.push(new orb("click",upgrades.spc.stat)); 
        
        timers.auto.start=timers.auto.cur;// update timer
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
    for(var i=0;i<particles.length;i++) { //particles
        if(particles[i].update()) {
            particles.splice(i,1);
        }
    }

    resetInput();
    for(var i=0;i<buttons.length;i++) { //buttons
        buttons[i].update(true);
    }
    spawnSlime();
}
function buyUpgrade(button)  {
    var wasPurchaceSuccesful = false;
    switch(button.id) {
        case "sps": // $/second
            if(money>=upgrades.sps.price) {
                money-=upgrades.sps.price;
                PriotextAnims.push( new textAnim(175,5,"large1",`-$${parseNum(~~upgrades.sps.price)}`,[200,0,0,255]));
                if(upgrades.sps.price<50) {
                    upgrades.sps.price*=2;
                } else {
                    upgrades.sps.price*=1.25;
                }
                upgrades.sps.stat++;
                wasPurchaceSuccesful=true;
            }
            break;
        case "spc": // $/click
            if(money>=upgrades.spc.price) {
                money-=upgrades.spc.price;
                PriotextAnims.push( new textAnim(175,5,"large1",`-$${parseNum(~~upgrades.spc.price)}`,[200,0,0,255]));
                if(upgrades.spc.price<250) {
                    upgrades.spc.price*=2.5;
                } else {
                    upgrades.spc.price*=1.75;
                }
                upgrades.spc.stat++;
                wasPurchaceSuccesful=true;
            }
            break;
        case "auto": // auto clicker
            if(money>=upgrades.auto.price) {
                money-=upgrades.auto.price;
                PriotextAnims.push( new textAnim(175,5,"large1",`-$${parseNum(~~upgrades.auto.price)}`,[200,0,0,255]));
                upgrades.auto.price*=1.15;
                upgrades.auto.stat++;
                wasPurchaceSuccesful=true;
            }
            break;
        case "dmg":
            if(money>=upgrades.dmg.price) {
                money-=upgrades.dmg.price;
                PriotextAnims.push( new textAnim(175,5,"large1",`-$${parseNum(~~upgrades.dmg.price)}`,[200,0,0,255]));
                upgrades.dmg.stat++;
                upgrades.dmg.price*=1.55;
                wasPurchaceSuccesful=true;
            }
            break;
        case "spd":
            if(money>=upgrades.spd.price) {
                money-=upgrades.spd.price;
                PriotextAnims.push( new textAnim(175,5,"large1",`-$${parseNum(~~upgrades.spd.price)}`,[200,0,0,255]));
                upgrades.spd.stat-=100;
                upgrades.spd.price*=1.55;
                wasPurchaceSuccesful=true;
            }
            break;
        case "click": // $ button
            orbs.push(new orb("click",upgrades.spc.stat)); // spawn money orb at $ button
            break;
    }
    if(wasPurchaceSuccesful==true) {
        button.spawnparticles();
    } else if(button.id!="click") {
        //play sound fk you no buy
    }
}

function drawTurret() {
    var targetAngle=0;
    if(slimes.length>0) {
        var distance = 1000;
        var targetSlime=0;
        for(var j=0;j<slimes.length;j++) {
            var tempDistance=dist({x:300,y:225},slimes[j]);
            if(tempDistance<distance) {
                distance=tempDistance;
                targetSlime=j;
            }
        }
        targetAngle=pointTo({x:300,y:225},slimes[targetSlime]);
    }
    if(turrot>targetAngle) {turrot-=0.02;}
    if(turrot<targetAngle) {turrot+=0.02;}
    drawSpriteAdv(s.duoturBarrel,300-Math.sin(turrot-1.5707963)*recoil,225-Math.cos(turrot-1.5707963)*recoil,turrot,0.5);
    drawSpriteAdv(s.duoturBase,300,225,0,0.5);
    if(recoil<=0) {
        drawSpriteAdv(s.duoturRingreload2,300,225,0,0.5);
    } else {
        if(recoil==5.5) {
            drawSpriteAdv(s.duoturRingreload,300,225,0,0.5);
        } else {
            drawSpriteAdv(s.duoturRingreload,300,225,-(11-recoil)/30,0.5);
        }
    }
    if(recoil==5.5) {
        recoil=10;
    } else if(recoil>0) {
        if(upgrades.spd.stat>500) {
            recoil--;
        } else {
            recoil-=2;
        }
    }
}