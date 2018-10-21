
var navlist = [
    {name:"Ouro-fill-us",link:"https://rsninja722.github.io/ouro/indexo.html"},
    {name:"Circle TD",link:"https://rsninja722.github.io/circletd/indexr.html"},
    {name:"Space Shooter",link:"https://rsninja722.github.io/seperategames/indexspace.html"},
    {name:"Strategic Digger",link:"https://rsninja722.github.io/digger.html"},
    {name:"Seige Idle",link:"https://rsninja722.github.io/seperategames/sidgeidle.html"},
    {name:"Snake Game",link:"https://rsninja722.github.io/seperategames/snakegame.html"},
    {name:"Crappy Clicker Game",link:"https://rsninja722.github.io/seperategames/5number idle.html"}
]
//style
var sty = document.createElement("style");
sty.innerHTML = `
ul{list-style-type: none;margin: 0;padding: 0;width: 150px;}
li a {display: block;color: #000;padding: 8px 8px;text-decoration: none;}
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