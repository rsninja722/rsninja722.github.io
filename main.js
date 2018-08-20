(function() {  
var canvas = document.getElementById("mYcAnVaS");
var ctx = canvas.getContext("2d");

var towers = [];
var enemies = [];
var bullets = [];
var cash = 100;
var lives = 30;
var popup = {message:"",timer:0};
//ligma

var enemyTypes = [
  {name:"normal circle",health:3,armour:0,color:"red",linecolor:"black",speed:1.5,radius:10,rang:1,rang2:2,danger:1},
  {name:"half big circle",health:5,armour:0,color:"orange",linecolor:"black",speed:2,radius:15,rang:1,rang2:3,danger:2},
  {name:"big circle",health:7,armour:0.7,color:"yellow",linecolor:"black",speed:2.5,radius:20,rang:1,rang2:4,danger:3},
  {name:"metal circle",health:6,armour:2,color:"gray",linecolor:"gray",speed:1.3,radius:17,rang:1,rang2:5,danger:5},
  {name:"zoom circle",health:4,armour:0,color:"green",linecolor:"yellow",speed:4,radius:12,rang:1,rang2:6,danger:1},
  {name:"ultra huge circle",health:50,armour:4,color:"blue",linecolor:"black",speed:1,radius:60,rang:7,rang2:10,danger:10},
  {name:"gigant sphere",health:600,armour:0,color:"purple",linecolor:"black",speed:0.5,radius:80,rang:8,rang2:12,danger:10}
]
var modes = [
  {name:"newb",num:1},
  {name:"normal",num:0.8},
  {name:"hard",num:0.5},
  {name:"no",num:0.25},
  {name:"NO",num:0.01}
]
var gamestate=0;
var dcounter=0;
var diffiulty = 1;
var waves = [
    [
        {type:0,amount:8,delay:1000}, //wave 1
        {type:1,amount:1,delay:2000},
        {type:-1,amount:1,delay:5000}
    ],
  	[
        {type:0,amount:10,delay:600},
        {type:1,amount:5,delay:1000},
        {type:0,amount:10,delay:600},
      	{type:-1,amount:1,delay:5000}
    ],
    [
        {type:0,amount:12,delay:500},
      	{type:-1,amount:1,delay:2000}
    ],
    [
        {type:0,amount:20,delay:500},
        {type:1,amount:10,delay:1000},
      	{type:2,amount:2,delay:2000},
      	{type:-1,amount:1,delay:2000}
    ],
    [
        {type:3,amount:4,delay:1500}, //wave 5
        {type:1,amount:11,delay:400},
      	{type:-1,amount:1,delay:2000}
    ],
    [
        {type:1,amount:5,delay:1000},
        {type:0,amount:30,delay:300},
      	{type:3,amount:7,delay:800},
      	{type:-1,amount:1,delay:2000}
    ],
    [
      	{type:3,amount:6,delay:1000},
      	{type:4,amount:5,delay:1000},
      	{type:-1,amount:1,delay:2000}
    ],
    [
      	{type:2,amount:10,delay:2000},
        {type:3,amount:10,delay:2000},
      	{type:4,amount:10,delay:2000},
      	{type:-1,amount:1,delay:2000}
    ],
    [
      	{type:0,amount:50,delay:200},
      	{type:-1,amount:1,delay:5000}
    ],
    [
      	{type:5,amount:1,delay:2000},
      	{type:-1,amount:1,delay:10000} //wave 10
    ],
  	[
      	{type:2,amount:15,delay:2000},
      	{type:-1,amount:1,delay:2000}
    ],
    [
      	{type:1,amount:30,delay:1000},
      	{type:3,amount:15,delay:1500},
      	{type:0,amount:30,delay:500},
      	{type:-1,amount:1,delay:2000}
    ],
    [
      	{type:4,amount:20,delay:1800},
      	{type:-1,amount:1,delay:2000}
    ],
    [
      	{type:2,amount:30,delay:2500},
      	{type:4,amount:10,delay:500},
      	{type:3,amount:15,delay:1700},
      	{type:-1,amount:1,delay:2000}
    ],
    [
      	{type:5,amount:1,delay:2000}, //wave 15
      	{type:-1,amount:1,delay:3000},
      	{type:1,amount:15,delay:1000},
      	{type:-1,amount:1,delay:2000}
    ],
    [
      	{type:0,amount:100,delay:50}, 
      	{type:-1,amount:1,delay:2000}
    ],
    [
      	{type:4,amount:20,delay:1000}, 
      	{type:1,amount:12,delay:2000}, 
      	{type:4,amount:20,delay:1000},
      	{type:-1,amount:1,delay:2000}
    ],
    [
      	{type:3,amount:10,delay:800}, 
      	{type:2,amount:10,delay:800}, 
      	{type:3,amount:10,delay:800}, 
      	{type:2,amount:10,delay:800}, 
      	{type:-1,amount:1,delay:2000}
    ],
    [
      	{type:5,amount:1,delay:3000}, 
      	{type:3,amount:20,delay:1000}, 
      	{type:-1,amount:1,delay:2000}
    ],
  	[
      	{type:6,amount:1,delay:10000} //wave 20
    ]
]
var waveData = {curwave:0,curtype:0,curamount:0,time:0}

preventedEvents = [false,true,false];
addListenersTo(canvas);
setInterval(update,33);

function update() {
	ctx.clearRect(0,0,canvas.width,canvas.height);
  	draw(canvas.width/2,canvas.height/2,canvas.width,canvas.height,"#00d60e");
    drawFancy(canvas.width/2,canvas.height/2,canvas.width,40,"#ccb976","#96823c");
  	if(keyPress[81]) {
      	dcounter=dcounter+1==5?0:dcounter+1;
      	diffiulty=modes[dcounter].num;
    }
    if(keyPress[65]) { //plain tower
        var temp = new tower(mousePos.x,mousePos.y,14,14,"red",1,"normal",1000,100,1,10,"sounds/normal.wav");
       if(!check(temp)) {
            if(cash>=10) {
                cash-=10;
                towers.push(temp);
              	play("sounds/place.wav");
          } else {popup.message="not enough cash dummy";popup.timer=2000;}
        } else {popup.message="not enough space ediot";popup.timer=1000;}
  }
  if(keyPress[83]) { //magic tower
        var temp = new tower(mousePos.x,mousePos.y,18,18,"purple",3,"magic",1800,120,1,30,"sounds/magic.wav");
       if(!check(temp)) {
            if(cash>=30) {
                cash-=30;
                towers.push(temp);
                play("sounds/place.wav");
          } else {popup.message="not enough cash dummy";popup.timer=2000;}
        } else {popup.message="not enough space ediot";popup.timer=1000;}
  }
  if(keyPress[71]) { //pierce tower
        var temp = new tower(mousePos.x,mousePos.y,20,20,"blue",3,"normal",1500,150,4,55,"sounds/snip.wav");
       if(!check(temp)) {
            if(cash>=55) {
                cash-=55;
                towers.push(temp);
                play("sounds/place.wav");
          } else {popup.message="not enough cash dummy";popup.timer=2000;}
        } else {popup.message="not enough space ediot";popup.timer=1000;}
  }
  if(keyPress[70]) { //ranger tower
        var temp = new tower(mousePos.x,mousePos.y,22,22,"gray",5,"normal",3000,300,1,40,"sounds/snip.wav");
       if(!check(temp)) {
            if(cash>=40) {
                cash-=40;
                towers.push(temp);
                play("sounds/place.wav");
          } else {popup.message="not enough cash dummy";popup.timer=2000;}
        } else {popup.message="not enough space ediot";popup.timer=1000;}
    }
    if(keyPress[68]) { //speed tower
        var temp = new tower(mousePos.x,mousePos.y,16,16,"green",0.8,"normal",200,180,1,35,"sounds/fast.wav");
       if(!check(temp)) {
            if(cash>=35) {
                cash-=35;
                towers.push(temp);
                play("sounds/place.wav");
          } else {popup.message="not enough cash dummy";popup.timer=2000;}
        } else {popup.message="not enough space ediot";popup.timer=1000;}
    }
        if(keyPress[72]) { //gold tower
        var temp = new specialTower(mousePos.x,mousePos.y,25,25,80,"Generator","orange")
       if(!check(temp)) {
            if(cash>=80) {
                cash-=80;
                towers.push(temp);
                play("sounds/place.wav");
          } else {popup.message="not enough cash dummy";popup.timer=2000;}
        } else {popup.message="not enough space ediot";popup.timer=1000;}
    }
  if(keyPress[74]) { //mega tower
        var temp = new tower(mousePos.x,mousePos.y,50,50,"#87e5ff",10,"magic",500,400,5,2000,"sounds/mega.wav");
       if(!check(temp)) {
            if(cash>=2000) {
                cash-=2000;
                towers.push(temp);
                play("sounds/place.wav");
          } else {popup.message="not enough cash dummy";popup.timer=2000;}
        } else {popup.message="not enough space ediot";popup.timer=1000;}
    }
    //handle waves r(x,y,w,h,color,damage,damageType,speed,range,pen,price)
    if(waveData.curwave<waves.length) {
        var temp = waves[waveData.curwave][waveData.curtype];
        if(temp.delay*diffiulty>waveData.time) {waveData.time+=33} else {
            if(temp.type!=-1) {
                var e = enemyTypes[temp.type];
                enemies.push(new enemy(e.radius,e.color,e.linecolor,e.health,e.armour,e.speed,e.name,e.rang,e.rang2,e.danger));
                waveData.time=0;
                waveData.curamount++;
                if(waveData.curamount>=temp.amount) {waveData.curamount=0;waveData.curtype++;}
                if(waveData.curtype>=waves[waveData.curwave].length) {waveData.curtype=0;waveData.curwave++;}
            } else {
                waveData.curamount=0;
                waveData.curtype=0;
                waveData.curwave++;
            }
        }
    }
    statsShow=true;
    for(var i=0;i<bullets.length;i++) {
		if(bullets[i].update()) {
            bullets.splice(i,1);
            i--;
        }
    }
  	for(var i=0;i<enemies.length;i++) {
        if(enemies[i].update()) {
            enemies.splice(i,1);
            i--;
        }
    }
  	for(var i=0;i<towers.length;i++) {
      if(towers[i].update()) {
            towers.splice(i,1);
            i--;
        }
    }
  	text(cash,canvas.width-80,20,"#ffb200",20);
  	text(lives,canvas.width-80,44,"#ff1900",20);
  	text(`wave: ${waveData.curwave+1}`,canvas.width-80,60,"#606060",15);
   	text("A - plain tower | cost: 10",0,10,"black",10);
    text("S - magic tower | cost: 30",0,22,"black",10);
    text("D - speed tower | cost: 35",0,34,"black",10);
    text("F - ranger tower | cost: 40",0,46,"black",10);
  	text("G - pierce tower | cost: 55",0,58,"black",10);
  	text("H - generator tower | cost: 80",0,70,"black",10);
  	text("J - mega tower | cost: 2000",0,82,"black",10);
  	text("Q - change mode",170,10,"black",10);
  	text("W - sell tower being hovered over",170,22,"black",10);
  	text(`mode: ${modes[dcounter].name}`,170,34,"black",10);
  	if(popup.timer>=0) {
      	popup.timer-=33;
      	text(popup.message,0,canvas.height-15,"black",15);
    }
  	if(lives<=0) {reset();}
  	if(gamestate>0) {
      	text("YOU LOSE",canvas.width/2,canvas.height/2,"red",30);
      	gamestate--;
    }
	resetInput();	
}
function bullet(x,y,r,damage,damageType,color,lineColor,speed,penetration,no) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    this.lineColor = lineColor;
    this.damage = damage;
    this.damageType = damageType;
    this.speed = speed;
    this.penetration = penetration;
    this.angel = no;
    this.vel = {
        x:Math.sin(this.angel),
        y:Math.cos(this.angel)
    }
   this.update = function() {
        this.x += this.vel.x * this.speed;
        this.y -= this.vel.y * this.speed;
        drawCircle(this.x,this.y,this.r,this.color,this.lineColor,2);
        for(var i=0;i<enemies.length;i++) {
            if(collideCircle(this,enemies[i])) {
              if(this.damageType == "magic") {
                enemies[i].health -= this.damage
              } else {
                var heck = this.damage - enemies[i].armour;
                if(heck < 0) {heck = 0}
              	enemies[i].health -= heck;
              }
                if(enemies[i].health<=0) {
                    play("sounds/ouch.wav");
                   enemies[i].dead();
                   enemies.splice(i,1);
                }
                this.penetration--;
              	i--;
                if(this.penetration<=0) {return true;}
            }
          	if(this.r + this.x > canvas.width || this.x - this.r < 0 || this.r + this.y > canvas.height || this.y - this.r < 0) {
                return true;
            }
        }
    }
}

function enemy(r,fillColor,lineColor,health,armour,speed,name,rang,rang2,danger) {
    this.x = 0;
    this.y = canvas.height/2;
    this.r = r;
  	this.fillColor = fillColor;
  	this.lineColor = lineColor;
  	this.health = health;
  	this.maxHealth = this.health;
  	this.armour = armour;
  	this.speed = speed;
  	this.name = name;
  	this.rang = rang;
  	this.rang2 = rang2;
  	this.danger = danger;
    this.update = function() {
        this.x += speed;
        drawCircle(this.x,this.y,this.r,this.fillColor,this.lineColor,this.r/10); 
      	drawFancyn(this.x-this.r,this.y+this.r+4,this.maxHealth*5,8,"#0083ff","black");
      	drawn(1+this.x-this.r,this.y+this.r+5,this.health*5-2,6,"#fc7a00");
        if(collideCirclePoint(this,mousePos)&&statsShow) {
            text(`max health: ${this.maxHealth}`,this.x-this.r,this.y-this.r-10,"black",10);
            text(`armour: ${this.armour}`,this.x-this.r,this.y-this.r-22,"black",10);
            text(`speed: ${this.speed}`,this.x-this.r,this.y-this.r-34,"black",10);
            text(this.name,this.x-this.r,this.y-this.r-46,"black",10);
            statsShow=false;
        }
      	if(this.x > canvas.width) {
          lives-=this.danger;
          return true;
        }     
    }
    this.dead = function() {
      cash += rand(this.rang,this.rang2);
    }
    return this;
}


function specialTower(x,y,w,h,price,type,color) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.price = price;
  this.type = type;
  this.color = color;
  this.timer = 0;
  this.update = function() {
    drawFancy(this.x,this.y,this.w,this.h,this.color,"black");
    if(type == "Generator") {
      this.timer++;
      if(this.timer<=33) {text("+$10",this.x,this.y,"#2afc00",13);}
      if(this.timer >= 500) {
        play("sounds/money.wav");
        cash += 10;
      this.timer = 0;
      drawFancy(this.x,this.y,this.w,this.h,"white","black");
	  
      }
    }
    if(collideBoxPoint(this,mousePos)){
        text(`type: ${this.type}`,this.x-this.w/2,this.y+this.h+10,"black",10);
        if(keyPress[87]) {
            play("sounds/place.wav");
            cash+=Math.round(this.price*diffiulty);
            return true;
        }
    }
  }
}
function tower(x,y,w,h,color,damage,damageType,speed,range,pen,price,sound) {
    this.price = price;
  	this.x = x;
    this.y = y;
  	this.w = w;
  	this.h = h;
  	this.color = color;
    this.damage = damage;
    this.damageType = damageType;
    this.speed = speed;
  	this.range = range;
    this.angle = 0;
    this.timer = this.speed;
    this.penetration = pen;
    this.sound = sound;
    this.update = function() {
      	var ligma=[];
        drawFancy(this.x,this.y,this.w,this.h,this.color,"black");
      	for(var j=0;j<enemies.length;j++) {
          	if(twoPointsDistance(this,enemies[j])<=range) {
              	ligma.push(j);
            }
        }
      	var sugondese = {x:0,pos:0};
      	for(var balls=0;balls<ligma.length;balls++) {
          	var minecraft = enemies[ligma[balls]].x;
            var roblox = sugondese.x;
          	if(minecraft>roblox) {
              	sugondese.x=minecraft;
              	sugondese.pos=ligma[balls];
            }
        }
        if(sugondese.x!=0){
            this.angle = pointTo(enemies[sugondese.pos],this);
            this.timer-=33;
            if(this.timer<=0) {
                play(this.sound);
                var c = this.damageType=="normal"?"red":"blue";
                bullets.push(new bullet(this.x+1,this.y,this.damage*2,this.damage,this.damageType,c,"black",10,this.penetration,this.angle+setAngle(90)));
                this.timer=this.speed;
          }
      }
      	drawRectRotate(this.x,this.y,this.w*1.75,this.h/2,this.color,this.angle);
     	if(collideBoxPoint(this,mousePos)){
            drawCircleOutline(this.x,this.y,this.range,this.color,"black",1);
            text(`damage: ${this.damage}`,this.x-this.w/2,this.y+this.h+10,"black",10);
            text(`type: ${this.damageType}`,this.x-this.w/2,this.y+this.h+22,"black",10);
            text(`fire delay: ${this.speed/1000}`,this.x-this.w/2,this.y+this.h+34,"black",10);
            text(`range: ${this.range}`,this.x-this.w/2,this.y+this.h+46,"black",10);
  			if(keyPress[87]) {
                play("sounds/place.wav");
              	cash+=Math.round(this.price*diffiulty);
              	return true;
            }
        }
    }
    return this;
}







function check(kek) {
	for(var i=0;i<towers.length;i++) {
		if(kek==towers[i]) {continue;}
      	if(collideBox(kek,towers[i])) {return true;}
    }
  	return false;
}



function play(src) {
    var snd = new Audio(src);
    snd.play();
}



function draw(x,y,w,h,color) {
    ctx.fillStyle = color;
    ctx.fillRect(x-(w/2),y-(h/2),w,h);
}
function drawn(x,y,w,h,color) {
    ctx.fillStyle = color;
    ctx.fillRect(x,y,w,h);
}
function drawFancy(x,y,w,h,color,lineColor) {
    ctx.fillStyle = color;
    ctx.fillRect(x-(w/2),y-(h/2),w,h);
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2;
    ctx.rect(x-(w/2),y-(h/2),w,h);
    ctx.stroke();
}
function drawFancyn(x,y,w,h,color,lineColor) {
    ctx.fillStyle = color;
    ctx.fillRect(x,y,w,h);
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2;
    ctx.rect(x,y,w,h);
    ctx.stroke();
}
function drawRectRotate(x,y,w,h,color,angl) {
    ctx.setTransform(1, 0, 0, 1, x, y);
    ctx.rotate(angl);
    ctx.fillStyle = color;
    ctx.fillRect((-w / 2)+w/3,-h / 2,w-w/4,h);
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.rect((-w / 2)+w/3,-h / 2,w-w/4,h);
    ctx.stroke();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}   
function drawCircle(x,y,r,fillColor,lineColor,lineWidth) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.setLineDash([]);
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.stroke();
}
function drawCircleOutline(x,y,r,fillColor,lineColor,lineWidth) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.setLineDash([5, 15]);
    ctx.fillStyle = fillColor;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.stroke();
}
function text(string,x,y,color,size) {
    if(color!="black"&&color!="#000000") {
      	ctx.setLineDash([]);
        ctx.font = `${size}px verdana`;
        ctx.lineWidth = 3;
        ctx.strokeStyle = "black";
        ctx.strokeText(string.toString(),x,y);
    } else {ctx.font = `bold ${size}px verdana`;}
    ctx.fillStyle = color
    ctx.fillText(string.toString(),x,y);
}
function twoPointsDistance(object1,object2) {
    var one = (object2.x - object1.x);
    var two = (object2.y - object1.y);
    return Math.sqrt((one*one)+(two*two));
}		
function collideCircle(object1,object2) {
    if( twoPointsDistance(object1,object2) < (object1.r + object2.r)) {
		return true;
	} else {
        return false;
    }
}
function collideBox(object1,object2) {
    if(object1.x + object1.w/2 >= object2.x - object2.w/2 && 
       object1.x - object1.w/2 <= object2.x + object2.w/2 &&
       object1.y + object1.h/2 >= object2.y - object2.h/2 && 
       object1.y - object1.h/2 <= object2.y + object2.h/2) {
           return true;
       }
}
function pointTo(obj1,obj2) {
    var adjacent = (obj1.x - obj2.x);
    var opposite = (obj1.y - obj2.y);
    var h = Math.atan2(opposite, adjacent);
  	return h;
}
function rand(min,max) {
    if(arguments[2] == undefined) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    } else {
        return (Math.floor(((Math.random() * (max - min + 1)) + min) * arguments[2])) / arguments[2];
    }
    
}
function collideBoxPoint(box,point) {
     if(box.x + box.w/2 >= point.x && 
        box.x - box.w/2 <= point.x &&
        box.y + box.h/2 >= point.y && 
        box.y - box.h/2 <= point.y ) {
           return true;
       }
}
function collideCirclePoint(circle,point) {
    if( twoPointsDistance(circle,point) < circle.r) {
		return true;
	} else {
        return false;
    }
}
function setAngle(number) {
    return number * Math.PI / 180;
}

function reset() {
  	gamestate=100;
    towers = [];
    enemies = [];
    bullets = [];
    cash = 100;
    lives = 30;
    dcounter=0;
    diffiulty = 1;
  	waveData = {curwave:0,curtype:0,curamount:0,time:0};
}
})();