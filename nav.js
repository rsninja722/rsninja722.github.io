
var navlist = [
    {name:"Ouro-fill-us",link:"https://rsninja722.github.io/seperategames/ouro/indexo.html"},
    {name:"slime defender clicker",link:"https://rsninja722.github.io/seperategames/slimeDefenderClicker/index.html"},
    {name:"Ground Defender",link:"https://rsninja722.github.io/seperategames/groundDefender/index.html"},
    //{name:"fight game",link:"https://rsninja722.github.io/seperategames/fightGame/index.html"},
    {name:"Zombies",link:"https://rsninja722.github.io/seperategames/zombies/index.html"},
    //{name:"Sniper Animation",link:"https://rsninja722.github.io/seperategames/lazerSniper/test.html"},
    {name:"Circle TD",link:"https://rsninja722.github.io/seperategames/circletd/indexr.html"},
    {name:"Space Shooter",link:"https://rsninja722.github.io/seperategames/indexspace.html"},
    {name:"Space Shooter V2 (ALPHA)",link:"https://rsninja722.github.io/seperategames/spaceShooterV2/index.html"},
    {name:"Strategic Digger",link:"https://rsninja722.github.io/seperategames/digger.html"},
    {name:"Digger Remake",link:"https://rsninja722.github.io/seperategames/diggerRemake/index.html"},
    //{name:"Snake Game",link:"https://rsninja722.github.io/seperategames/snakegame.html"},
    //{name:"Crappy Clicker Game",link:"https://rsninja722.github.io/seperategames/5number idle.html"},
    //{name:"Stuipid JS things",link:"https://rsninja722.github.io/seperategames/stuipid.html"},
    //{name:"the game",link:"https://rsninja722.github.io/RPGBLITZ.html"},
   // {name:"game.js really early demo",link:"https://rsninja722.github.io/test.html"},
   {name:"art gen",link:"https://rsninja722.github.io/seperategames/artgen/index.html"},
   {name:"discrod invisible gen",link:"https://rsninja722.github.io/seperategames/discordInvisbleGenerator/index.html"},
    {name:"Home",link:"https://rsninja722.github.io/index.html"}
]
//style
var sty = document.createElement("style");
sty.innerHTML = `
ul{list-style-type: none;margin: 0;padding: 0;width: 150px;}
li a {display: block;background-color: rgba(160, 160, 160, 0.5);color: #000;padding: 8px 8px;text-decoration: none;}
li a:hover {background-color: rgba(160, 160, 160, 1);color: rgb(84, 74, 177);}
`
document.getElementById("a83n7").appendChild(sty);
//slightly broken image generator
/*
//image div
var dv1 = document.createElement("div");
dv1.setAttribute("onclick","clck()");
dv1.setAttribute("style","position: absolute; right: 1%; top: 1%");
dv1.innerHTML = "hi";

//image to open nav bar
var img = document.createElement("img");
img.setAttribute("scr","sidebar.png");
dv1.appendChild(img);
*/

//nav menu div
var dv2 = document.createElement("div");
dv2.setAttribute("id","haa");
dv2.setAttribute("style","display: none; position: absolute; right: 1%; top: 50px");

//ul
var youl = document.createElement("ul");

//add links to nav menu
for(var i=0;i<navlist.length;i++) {
    var lithing = document.createElement("li");
    var lnk = document.createElement("a");
    lnk.setAttribute("href",navlist[i].link);
    lnk.innerHTML = navlist[i].name;
    lithing.appendChild(lnk);
    youl.appendChild(lithing);
}

dv2.appendChild(youl);

document.getElementById("a83n7").appendChild(dv2);

var onoff=false;
function clck(){
    if(onoff){
        document.getElementById("haa").style.display = 'none';
        onoff=false;}else{document.getElementById("haa").style.display = 'block';
        onoff=true;
    }
}