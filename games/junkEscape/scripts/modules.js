var sideDraw = {
    heads:{
        stock:function(x,y) {img(sprites.Dual_Green,x,y);},
        grey:function(x,y) {img(sprites.Dual_Grey,x,y);},
        yellow:function(x,y) {img(sprites.Dual_Yellow,x,y);},
        cyan:function(x,y) {img(sprites.Mono_Cyan,x,y);},
        purple:function(x,y) {img(sprites.Quad_Purple,x,y);}
    },
    bodies:{
        stock:function(x,y) {img(sprites[`40_stockbody`],x,y);},
        tanky:function(x,y) {img(sprites[`40_bulkbody`],x,y);},
        skinny:function(x,y) {img(sprites[`40_thinbody`],x,y);}
    },
    arms:{
        stock:function(x,y) {img(sprites[`40_knife`],x,y);},
        saw:function(x,y) {img(sprites[`40_saw`],x,y);},
        gun:function(x,y) {img(sprites[`40_blaster`],x,y);},
        shot:function(x,y) {img(sprites[`40_Shotgun`],x,y);},
        mini:function(x,y) {img(sprites[`40_minigun`],x,y);},
        plasma:function(x,y) {img(sprites[`40_Plasma`],x,y);}
    },
    legs:{
        stock:function(x,y) {img(sprites[`40_stockroller`],x,y);},
        spider:function(x,y) {img(sprites[`40_spider`],x,y);},
        hover:function(x,y) {img(sprites[`40_hover`],x,y);}
    }
};

var topDraw = {
    heads:{
        stock:function(x,y,ang=0,s=1) {img(sprites.EYES_dual_green,x,y,ang,s,s);},
        grey:function(x,y,ang=0,s=1) {img(sprites.EYES_dual_grey,x,y,ang,s,s);},
        yellow:function(x,y,ang=0,s=1) {img(sprites.EYES_dual_yellow,x,y,ang,s,s);},
        cyan:function(x,y,ang=0,s=1) {img(sprites.EYES_mono_cyan,x,y,ang,s,s);},
        purple:function(x,y,ang=0,s=1) {img(sprites.EYES_quad_purple,x,y,ang,s,s);}
    },
    bodies:{
        stock:function(x,y,ang=0,s=1) {img(sprites.Body_THIN,x,y,0,s,s);},
        tanky:function(x,y,ang=0,s=1) {img(sprites.Body_BULK,x,y,0,s,s);},
        skinny:function(x,y,ang=0,s=1) {img(sprites.Body_STOCK,x,y,0,s,s);}
    },
    arms:{
        stock:function(x,y,ang,s=1) {let z = Math.round(player.attackCount/3);if(z>-1&&z<6){img(sprites[`SL_000${z}`],x,y,ang,s,s);} else {img(sprites.SL_0000,x,y,ang,s,s);}},
        saw:function(x,y,ang,s=1) {let z = Math.round(count/3)%12;if(z<10){img(sprites[`Asw_000${z}`],x,y,ang,s,s);}else{img(sprites[`Asw_00${z}`],x,y,ang,s,s);}},
        gun:function(x,y,ang,s=1) {let z = Math.round(player.attackCount/3);if(z>-1&&z<4){img(sprites[`ABB_000${z}`],x,y,ang,s,s);} else {img(sprites.ABB_0000,x,y,ang,s,s);}},
        shot:function(x,y,ang,s=1) {let z = Math.round(player.attackCount/3);if(z>-1&&z<6){img(sprites[`SHTG_000${z}`],x,y,ang,s,s);} else {img(sprites.SHTG_0000,x,y,ang,s,s);}},
        mini:function(x,y,ang,s=1) {let z = player.attackCount/miniSpeed; if(z<0.33) {img(sprites[`MNGN_0001`],x,y,ang,s,s);} else if(z<0.66) {img(sprites[`MNGN_0002`],x,y,ang,s,s);} else {img(sprites[`MNGN_0000`],x,y,ang,s,s);}},
        plasma:function(x,y,ang,s=1) {let z = Math.round(player.attackCount/3);if(z>-1&&z<5){img(sprites[`PLSM_000${z}`],x,y,ang,s,s);} else {img(sprites.PLSM_0000,x,y,ang,s,s);}}
    },
    legs:{
        stock:function(x,y,ang=0,s=1) {img(sprites.stockLegs,x,y,ang,s,s);},
        spider:function(x,y,ang=0,s=1) {img(sprites[`Sp${((player.v.x||player.v.y)?Math.round(count/5)%4:0)}`],x,y,ang,s,s);},
        hover:function(x,y,ang=0,s=1) {img(sprites[`Hv${((player.v.x||player.v.y)?Math.round(count/3)%3:"off")}`],x,y,ang,s,s);}
    }
};

var worldDraw = {
    heads:{
        stock:function(x,y,ang=0,s=1) {img(sprites.EYES_dual_green,x,y,ang,s,s);},
        grey:function(x,y,ang=0,s=1) {img(sprites.EYES_dual_grey,x,y,ang,s,s);},
        yellow:function(x,y,ang=0,s=1) {img(sprites.EYES_dual_yellow,x,y,ang,s,s);},
        cyan:function(x,y,ang=0,s=1) {img(sprites.EYES_mono_cyan,x,y,ang,s,s);},
        purple:function(x,y,ang=0,s=1) {img(sprites.EYES_quad_purple,x,y,ang,s,s);}
    },
    bodies:{
        stock:function(x,y,ang=0,s=1) {img(sprites.Body_THIN,x,y,0,s,s);},
        tanky:function(x,y,ang=0,s=1) {img(sprites.Body_BULK,x,y,0,s,s);},
        skinny:function(x,y,ang=0,s=1) {img(sprites.Body_STOCK,x,y,0,s,s);}
    },
    arms:{
        stock:function(x,y,ang=0,s=1) {img(sprites.SL_0000,x,y,ang,s,s);},
        saw:function(x,y,ang=0,s=1) {img(sprites[`Asw_0000`],x,y,ang,s,s);},
        gun:function(x,y,ang=0,s=1) {img(sprites.ABB_0000,x,y,ang,s,s);},
        shot:function(x,y,ang,s=1) {img(sprites.SHTG_0000,x,y,ang,s,s);},
        mini:function(x,y,ang,s=1) {img(sprites[`MNGN_0000`],x,y,ang,s,s);},
        plasma:function(x,y,ang=0,s=1) {img(sprites.PLSM_0000,x,y,ang,s,s);}
    },
    legs:{
        stock:function(x,y,ang=0,s=1) {img(sprites.stockLegs,x,y,ang,s,s);},
        spider:function(x,y,ang=0,s=1) {img(sprites.Sp0,x,y,ang,s,s);},
        hover:function(x,y,ang=0,s=1) {img(sprites[`Hvoff`],x,y,ang,s,s);}
    }
};

//[ stat, fail level, side draw func index, top draw func index]
var modules = {
    heads:{
        stock:[0,0,sideDraw.heads.stock,topDraw.heads.stock,"head",function(){effect=2;},worldDraw.heads.stock,100],
        oneBreak:[1,1,sideDraw.heads.grey,topDraw.heads.grey,"head",function(){effect=1;},worldDraw.heads.grey,99],
        oneWork:[2,10,sideDraw.heads.yellow,topDraw.heads.yellow,"head",function(){},worldDraw.heads.yellow,1],
        purp:[3,10,sideDraw.heads.purple,topDraw.heads.purple,"head",function(){},worldDraw.heads.purple,25]
    },
    bodies:{
        stock:[15,3,sideDraw.bodies.stock,topDraw.bodies.stock,"body",function(){},worldDraw.bodies.stock,100,15],
        tanky:[25,2,sideDraw.bodies.tanky,topDraw.bodies.tanky,"body",function(){player.health/=2;},worldDraw.bodies.tanky,15,25],
        skinny:[10,10,sideDraw.bodies.skinny,topDraw.bodies.skinny,"body",function(){},worldDraw.bodies.skinny,0,10],
        tankyTwo:[25,10,sideDraw.bodies.tanky,topDraw.bodies.tanky,"body",function(){},worldDraw.bodies.tanky,0,25],
        skinnyTwo:[10,10,sideDraw.bodies.skinny,topDraw.bodies.skinny,"body",function(){},worldDraw.bodies.skinny,0,10]
    },
    arms:{
        stock:[0,2,sideDraw.arms.stock,topDraw.arms.stock,"arms",function(){speeds[0]=60;player.attackSpeed=60;},worldDraw.arms.stock,100],
        saw:[1,10,sideDraw.arms.saw,topDraw.arms.saw,"arms",function(){},worldDraw.arms.saw,85],
        gun:[2,2,sideDraw.arms.gun,topDraw.arms.gun,"arms",function(){speeds[2]=60;player.attackSpeed=60;},worldDraw.arms.gun,10],
        shot:[3,3,sideDraw.arms.shot,topDraw.arms.shot,"arms",function(){speeds[3]=150;player.attackSpeed=150;},worldDraw.arms.shot,20],
        mini:[4,5,sideDraw.arms.mini,topDraw.arms.mini,"arms",function(){maxMin=5;},worldDraw.arms.mini,95],
        plasma:[5,10,sideDraw.arms.plasma,topDraw.arms.plasma,"arms",function(){},worldDraw.arms.plasma,50]
    },
    legs:{
        stock:[0,10,sideDraw.legs.stock,topDraw.legs.stock,"legs",function(){},worldDraw.legs.stock,100],
        spider:[1,3,sideDraw.legs.spider,topDraw.legs.spider,"legs",function(){moveSpeeds[2]=1;moveSpeeds[3]=0.07;},worldDraw.legs.spider,100],
        hover:[2,10,sideDraw.legs.hover,topDraw.legs.hover,"legs",function(){},worldDraw.legs.hover,100]
    }
};

var speeds = [
    30,30,30,80,1,70
]

function swapModule() {
    for(let i=0;i<items.length;i++) {
        if(dist(player,items[i])<75) {
            play(sounds.switch);
            switch(items[i].m[4]){
                case "head":
                    items.push(new module(player.x,player.y,player.modules[0]));
                    player.modules[0] = items[i].m;
                    switch(player.modules[0][0]) {
                        case 0:
                            effect=2;
                            break;
                        case 1:
                            if(level>0) {
                                effect=1;
                            } else {
                                effect=0;
                            }
                            break;
                        case 2:
                            effect=0;
                            break;
                        case 3:
                            effect=0;
                            break;
                    }
                    break;
                case "body":
                    player.modules[1][0] = player.health;
                    items.push(new module(player.x,player.y,player.modules[1]));
                    player.modules[1] = items[i].m;
                    player.health = player.modules[1][0];
                    player.maxHealth = player.modules[1][8];
                    break;
                case "arms":
                    items.push(new module(player.x,player.y,player.modules[2]));
                    player.modules[2] = items[i].m;
                    switch(player.modules[2][0]) {
                        case 0:
                            player.attackSpeed=speeds[0]; break;
                        case 1:
                            player.attackSpeed=speeds[1]; break;
                        case 2:
                            player.attackSpeed=speeds[2]; break;
                        case 3:
                            player.attackSpeed=speeds[3]; break;
                        case 4:
                            player.attackSpeed=1; break;
                        case 5:
                            player.attackSpeed=speeds[5]; break;
                    }
                    
                    break;
                case "legs":
                    items.push(new module(player.x,player.y,player.modules[3]));
                    player.modules[3] = items[i].m;
                    break;
            }
            items.splice(i,1);
            i=Infinity;
        }
    }
}

function closeToModule() {
    for(let i=0;i<items.length;i++) {
        if(dist(player,items[i])<75) {
            return true;
        }
    }
    return false;
}

var items = [];
class module {
    constructor(x,y,m) {
        this.x=x;
        this.y=y;
        this.m=m;
    }
}

module.prototype.draw = function() {
    if(this.m[6]!==undefined) {
        this.m[6](this.x,this.y);
    }
}