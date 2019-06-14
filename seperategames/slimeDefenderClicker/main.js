images = [
    "assets/",
    [
        "text/",
        "small1.png","small2.png","small3.png","medium1.png","large1.png"
    ],
    "txtDefult.png","txtHover.png","txtPress.png",
    "imgDefult.png","imgHover.png","imgPress.png",
    "bigDefult.png","bigPress.png",
    "icon.png",
    "duoturBarrel.png","duoturBase.png","duoturRingreload.png","duoturRingreload2.png",
    "slime1.png","slime2.png",
    "pipe.png",
    "moneybox.png",
    "attachbox.png",
    "piston.png",
    "dirt.png",
    "speedup.png","speedupPress.png",
    "dmg.png",
    "orbSmall.png","orbMedium.png","orbLarge.png",
    "Boss00.png","Boss01.png","Boss10.png","Boss11.png",
    "rock1.png","rock2.png",
    "sound1.png","sound0.png","expand1.png","expand0.png","pause0.png","pause1.png",
    "bullet1.png","bullet2.png","bullet3.png","bullet4.png","bullet5.png","bullet6.png",
    "tut.png"
];

var sounds = [
    "assets/sounds/",
    "shoot1.wav","shoot2.wav",
    "hover.wav",
    "bigClick1.wav","bigClick2.wav","bigClick3.wav",
    "buy.wav",
    "transform.wav",
    "nobuy.wav",
    "orb1.wav","orb2.wav","orb3.wav",
    "nextWave.wav",
    "hit0.wav","hit1.wav","die.wav",
    "jump1.wav","jump2.wav","jump3.wav","bigJump.wav"
]


var sound=true;
var volume=1;
var volumeCache=1;
var soundSlider = {show:false,pos:350};

backgroundColor = "#2d2d2d";

function save() {
    saveStr = "";
    saveData = [JSON.stringify(upgrades),money.toString(),sound.toString(),volume.toString(),JSON.stringify(wdat)];
    for(var i in saveData) {
        saveStr+= saveData[i] + (i==saveData.length-1?"":"|");
    }
    
    localStorage.setItem("gamesave", saveStr);
    textAnims.push( new textAnim(10,65,"medium1","game saved",[40,150,40],"dmg"));
}

function load() {
    if(localStorage.gamesave) {
        var saveData = localStorage.gamesave.split("|");
        for(var i in saveData) {
            saveData[i] = JSON.parse(saveData[i]);
        }
        upgrades=saveData[0];
        money=saveData[1];
        sound=saveData[2];
        volume=saveData[3];
        wdat=saveData[4];
    }
}
/*
    art to do
        -thumbnail
    -balencing
*/
var started = false;
var money = 0;
var upgrades = {
    sps:{stat:0,price:50},
    spc:{stat:1,price:10},
    dmg:{stat:1,price:100},
    spd:{stat:1000,price:100},
    auto:{stat:0,price:500},
    scrollClick:{stat:false}
};
var maxes = {
    sps:Infinity,
    spc:Infinity,
    dmg:Infinity,
    spd:100,
    auto:6
}
var autoSpeeds=[Infinity,1000,750,500,250,100,50];
var screenShake = [0,1,-1,2,-2,3,-3,4,-4,5,-5,6,-6,7,-7];
var curShake=0;
var gameDone=0;

var gameOver = false;

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

var pause = false;

function resetGame() {
    gameOver = false;money = 0;upgrades = {sps:{stat:0,price:50},spc:{stat:1,price:10},dmg:{stat:1,price:100},spd:{stat:1000,price:100},auto:{stat:0,price:500},scrollClick:{stat:false}};timers = {ps:{start:Date.now(),cur:Date.now()},auto:{start:Date.now(),cur:Date.now()},gun:{start:Date.now(),cur:Date.now()}};spsAnim=0;autoAnim=0;clickTimer=0;recoil=0;wdat = {wave:0,pos:0,count:0};slimes=[];bullets=[];particles=[];orbs=[];
    localStorage.gamesave = "";
    slimeTime = Date.now();
    primeSlimeTime = waves[0][0].interval;
}

load();
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
    if(buttons.length>5) {drawSprite(s.piston,380,pistonPos);}

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

    rect(0,380,60,20,"#2d2d2d");
    drawSprite(s[`sound${(sound?1:0)}`],10,390);
    drawSprite(s[`expand${(gameScale==1?1:0)}`],30,390);
    drawSprite(s[`pause${(pause?1:0)}`],50,390);
    if(pause) {
        drawSpriteScaled(s.pause0,250,200,5);
    }
    if(soundSlider.show) {
        rect(0,340,20,40,"#303030");
        rect(3,345+(30*(1-volume)),14,5,"#404040");
    }
    if(gameOver) {
        rect(95,170,210,60,"#2d2d2d");
    }
    if(!started) {
        rect(22,236,256,128,"#2d2d2d");
        drawSprite(s.tut,150,300);
    }
}

function input(clickButtons) {
    if(!pause&&started&&clickButtons&&!gameOver) {
        for(var i=0;i<buttons.length;i++) { //buttons
            buttons[i].update(false);
        }
    }
    if(pointRect(mousePos,{x:2,y:382,w:16,h:16})) {
        soundSlider.show = true;
    }
    if(mousePress[0]) {
        //console.log(`x:${mousePos.x} y:${mousePos.y}`);
        if(pointRect(mousePos,{x:2,y:382,w:16,h:16})) {
            if(sound==1) {sound=0;volumeCache=volume;volume=0;changeVolume();} else {sound=1;volume=volumeCache;changeVolume();}
        }
        if(pointRect(mousePos,{x:22,y:382,w:16,h:16})) {
            if(gameScale==1) {gameScale=2;} else {gameScale=1;}
        }
        if(pointRect(mousePos,{x:42,y:382,w:16,h:16})) {
            if(pause==1) {pause=0;} else {pause=1;}
        }
        if(!started) {
            started=true;
            context = new AudioContext();
            addSound("assets/sounds/sdc1.wav",1);
            addSound("assets/sounds/particle1.wav",20);
            for(let i=0;i<soundPaths.length;i++) {
                addSound(soundPaths[i],4);
            }
            a.sdc1[1].loop=true;
            a.sdc1[1].play();
        }
    }
    if(mousePos.x>20||mousePos.y<330) {soundSlider.show=false;}
    if(soundSlider.show&&mouseDown[0]&&mousePos.y<375) {
        let ypos = mousePos.y;
        if(ypos<345) {ypos=345;}
        if(ypos>375) {ypos=375;}
        volume=(30-(ypos-345))/30;
        changeVolume();
    }
    resetInput();
}

function physics() {
    if(gameOver) {
        if(keyPress[k.SPACE]) {
            resetGame();
        }
    }
    if(!pause&&started&&!gameOver) {
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
                if(sound){play(a[`bigClick${rand(1,3)}`]);}
            }
            timers.ps.start=timers.ps.cur;// update timer
        }

        if(timers.gun.cur-timers.gun.start>=upgrades.spd.stat) { // shooting
            if(slimes.length>0) {
                if(sound){play(a[`shoot${rand(1,2)}`]);}
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
            if(sound){play(a[`bigClick${rand(1,3)}`]);}

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
        switch(buttons.length) {
            case 2:
                if(money>25) {
                    buttons.push(new button(320,70,"txt","sps"));
                    for(let i=0;i<75;i++) {
                        particles.push(new particle(rand(320,420),rand(70,120),"purchace"));
                    }
                    if(sound){play(a.buy);}
                }
                break;
            case 3:
                if(money>75) {
                    buttons.push(new button(310,5,"img","dmg"));
                    buttons.push(new button(405,5,"img","spd"));
                    for(let i=0;i<40;i++) {
                        particles.push(new particle(rand(310,350),rand(5,45),"purchace"));
                    }
                    for(let i=0;i<40;i++) {
                        particles.push(new particle(rand(405,445),rand(5,45),"purchace"));
                    }
                    if(sound){play(a.buy);}
                }
                break;
            case 5:
                if(money>400) {
                    buttons.push(new button(320,280,"txt","auto"));
                    for(let i=0;i<40;i++) {
                        particles.push(new particle(rand(320,420),rand(280,330),"purchace"));
                    }
                    if(sound){play(a.buy);}
                }
                break;
        }
    }
}
function buyUpgrade(button)  {
    var wasPurchaceSuccesful = false;
    switch(button.id) {
        case "sps": // $/second
            if(money>=upgrades.sps.price) {
                money-=upgrades.sps.price;
                PriotextAnims.push( new textAnim(175,5,"large1",`-$${parseNum(~~upgrades.sps.price)}`,[200,0,0,255]));
                upgrades.sps.price+=upgrades.sps.price*2;
                if(upgrades.sps.stat==0) {
                    upgrades.sps.stat=5;
                } else {
                    upgrades.sps.stat+=Math.round(upgrades.sps.stat*2 );
                }
                wasPurchaceSuccesful=true;
            }
            break;
        case "spc": // $/click
            if(money>=upgrades.spc.price) {
                money-=upgrades.spc.price;
                PriotextAnims.push( new textAnim(175,5,"large1",`-$${parseNum(~~upgrades.spc.price)}`,[200,0,0,255]));
                upgrades.spc.price+=upgrades.spc.price*2;
                upgrades.spc.stat+=Math.round(upgrades.spc.stat*1.1);
                wasPurchaceSuccesful=true;
            }
            break;
        case "auto": // auto clicker
            if(money>=upgrades.auto.price&&upgrades.auto.stat!=maxes.auto) {
                money-=upgrades.auto.price;
                PriotextAnims.push( new textAnim(175,5,"large1",`-$${parseNum(~~upgrades.auto.price)}`,[200,0,0,255]));
                upgrades.auto.price+=Math.round(upgrades.auto.price*3);
                upgrades.auto.stat++;
                wasPurchaceSuccesful=true;
            }
            break;
        case "dmg":
            if(money>=upgrades.dmg.price) {
                money-=upgrades.dmg.price;
                PriotextAnims.push( new textAnim(175,5,"large1",`-$${parseNum(~~upgrades.dmg.price)}`,[200,0,0,255]));
                upgrades.dmg.stat++;
                upgrades.dmg.price*=3.5;
                wasPurchaceSuccesful=true;
            }
            break;
        case "spd":
            if(money>=upgrades.spd.price&&upgrades.spd.stat!=maxes.spd) {
                money-=upgrades.spd.price;
                PriotextAnims.push( new textAnim(175,5,"large1",`-$${parseNum(~~upgrades.spd.price)}`,[200,0,0,255]));
                upgrades.spd.stat-=100;
                upgrades.spd.price*=3.5;
                wasPurchaceSuccesful=true;
            }
            break;
        case "click": // $ button
            orbs.push(new orb("click",upgrades.spc.stat)); // spawn money orb at $ button
            if(sound){play(a[`bigClick${rand(1,3)}`]);}
            break;
    }
    if(wasPurchaceSuccesful==true) {
        curShake=4;
        if(sound){play(a.buy);}
        button.spawnparticles();
    } else if(button.id!="click") {
        if(sound){play(a.nobuy);}
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

function changeVolume() {
    for(var i in volumeList) {
        volumeList[i].gain.value=volume;
    }
}

function rectrect(object1,object2) {
    if(object1.x + object1.w/2 >= object2.x - object2.w/2 &&
       object1.x - object1.w/2 <= object2.x + object2.w/2 &&
       object1.y + object1.h/2 >= object2.y - object2.h/2 &&
       object1.y - object1.h/2 <= object2.y + object2.h/2) {
           return true;
       }
}
function dist(object1,object2) {
    var one = (object2.x - object1.x);
    var two = (object2.y - object1.y);
    return Math.sqrt((one*one)+(two*two));
}