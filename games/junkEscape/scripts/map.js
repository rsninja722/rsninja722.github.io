/*
    back:""
    backObjects:[]
    collision:[]
    items:[]
    enemies:[]
    entrance:{x,y,w,h}
    exit:{x,y,w,h}
*/
var curLvl = {
    backGround:[],
    size:{},
    collision:[],
    entrance:{},
    exit:{}
};
var level=0;

//x,y,r,costume,health,ai,speed,weapon,item - enemy

//clapper : [0,0,20,enemyDraw.clapper,10,0,1,0,undefined]
//saw : [0,0,10,enemyDraw.saw,5,0,1.75,1,undefined]
//hammer : [0,0,16,enemyDraw.saw,15,0,0.5,2,undefined] 
//thrower : [0,0,20,enemyDraw.throw,15,1,1,3,undefined]
//gunner : [0,0,20,enemyDraw.gunner,15,1,0.75,6,undefined]
//turret : [0,0,12,enemyDraw.turret,30,2,0,4,undefined]
//quad : [0,0,16,enemyDraw.quad,30,3,0,5,undefined]
//boss : [0,0,75,enemyDraw.plasma,150,4,0,8,undefined]
var levels = [
    {
        backGround:"back1",
        size:{x:1000,y:400},
        collision:[{x:38,y:37,w:83,h:71},{x:239,y:33,w:364,h:51},{x:422,y:113,w:84,h:215},{x:549,y:107,w:196,h:56},{x:499,y:204,w:108,h:40},{x:632,y:8,w:354,h:15},{x:506,y:45,r:20},{x:538,y:66,r:10},{x:826,y:141,w:62,h:256},{x:928,y:75,w:157,h:66},{x:927,y:392,w:153,h:66},{x:887,y:350,w:20,h:61},{x:788,y:405,w:168,h:31},{x:633,y:382,w:181,h:40},{x:399,y:400,w:181,h:10},{x:343,y:396,w:204,h:40},{x:287,y:322,w:98,h:56},{x:145,y:345,w:188,h:102},{x:43,y:268,w:88,h:157},{x:9,y:129,w:18,h:147}],
        modules:[[modules.heads.oneWork,500,160]],
        enemies:[
            [550,160,20,enemyDraw.clapper,25,0,1,0,undefined],
            [615,45,20,enemyDraw.clapper,10,0,1,0,undefined]
        ],
        entrance:{x:110,y:220,w:10,h:50},
        exit:{x:983,y:220,w:36,h:200}
    },
    {
        backGround:"back2",
        size:{x:1000,y:1000},
        collision:[{x:32,y:71,w:63,h:137},{x:28,y:251,w:55,h:87},{x:328,y:16,w:601,h:34},{x:664,y:51,w:155,h:48},{x:766,y:89,w:149,h:58},{x:759,y:125,w:135,h:18},{x:912,y:87,w:176,h:38},{x:809,y:205,w:25,h:201},{x:891,y:181,w:136,h:53},{x:912,y:329,w:32,h:111},{x:814,y:421,w:192,h:125},{x:942,y:503,w:118,h:230},{x:953,y:387,w:107,h:25},{x:684,y:934,w:215,h:110},{x:833,y:859,w:350,h:120},{x:773,y:744,w:13,h:111},{x:736,y:788,w:68,h:67},{x:838,y:791,w:73,h:37},{x:479,y:980,w:182,h:40},{x:573,y:974,w:182,h:40},{x:135,y:903,w:182,h:47},{x:180,y:787,w:182,h:17},{x:49,y:876,w:106,h:250},{x:79,y:681,w:155,h:75},{x:112,y:825,r:47},{x:49,y:464,w:96,h:104},{x:247,y:542,w:66,h:74},{x:327,y:671,w:31,h:66},{x:354,y:643,w:64,h:42},{x:362,y:630,w:23,h:40},{x:425,y:693,w:90,h:200},{x:339,y:324,w:169,h:137},{x:202,y:266,w:132,h:169},{x:383,y:195,w:30,h:134},{x:193,y:336,r:56},{x:232,y:380,r:34},{x:268,y:413,r:16},{x:293,y:386,r:16},{x:540,y:401,w:50,h:60},{x:629,y:645,r:60},{x:19,y:613,r:33},{x:-4,y:566,r:33},{x:61,y:307,w:36,h:67},{x:596,y:286,r:26}],
        modules:[[modules.arms.saw,317,210],[modules.arms.gun,956,350],[modules.legs.spider,540,730],[modules.bodies.tanky,200,840]],
        enemies:[
            [475,345,16,enemyDraw.clapper,20,0,1,0,undefined],
            [600,400,16,enemyDraw.clapper,20,0,1,0,undefined],
            [790,340,16,enemyDraw.clapper,20,0,1,0,undefined],
            [860,250,16,enemyDraw.clapper,20,0,1,0,undefined],
            [110,290,10,enemyDraw.saw,10,0,1.75,1,undefined],
            [70,560,10,enemyDraw.saw,10,0,1.75,1,undefined],
            [140,970,10,enemyDraw.saw,10,0,1.75,1,undefined],
            [835,550,10,enemyDraw.saw,10,0,1.75,1,undefined],
            [660,750,10,enemyDraw.saw,10,0,1.75,1,undefined],
            [530,750,10,enemyDraw.saw,10,0,1.75,1,undefined]
        ],
        entrance:{x:30,y:175,w:10,h:50},
        exit:{x:983,y:710,w:36,h:200}
    },
    {
        backGround:"back3",
        size:{x:1000,y:1000},
        collision:[{x:64,y:57,w:129,h:114},{x:77,y:32,w:129,h:74},{x:315,y:21,w:374,h:41},{x:779,y:41,w:148,h:94},{x:924,y:92,w:155,h:184},{x:965,y:237,w:75,h:124},{x:931,y:273,w:66,h:54},{x:957,y:532,w:95,h:55},{x:971,y:619,w:56,h:125},{x:849,y:913,r:160},{x:887,y:871,r:160},{x:950,y:837,r:160},{x:652,y:938,w:81,h:104},{x:406,y:998,w:417,h:44},{x:90,y:882,w:165,h:104},{x:193,y:940,w:52,h:119},{x:176,y:866,r:20},{x:58,y:710,w:115,h:279},{x:20,y:415,w:42,h:349},{x:289,y:300,w:61,h:125},{x:425,y:266,w:232,h:50},{x:561,y:354,w:48,h:223},{x:584,y:476,w:40,h:48},{x:618,y:488,w:56,h:28},{x:629,y:560,w:32,h:168},{x:484,y:583,w:32,h:110},{x:569,y:626,w:156,h:31},{x:376,y:552,w:239,h:51},{x:289,y:508,w:63,h:54}],
        modules:[[modules.arms.shot,575,565],[modules.bodies.skinny,385,350],[modules.heads.purp,230,120],[modules.arms.mini,525,780],[modules.bodies.tankyThree,890,635]],
        enemies:[
            [330,166,10,enemyDraw.saw,10,0,1.75,1,undefined],
            [650,170,20,enemyDraw.throw,15,1,1,3,undefined],
            [830,340,20,enemyDraw.gunner,15,1,0.75,6,undefined],
            [830,450,20,enemyDraw.gunner,15,1,0.75,6,undefined],
            [690,700,16,enemyDraw.clapper,20,0,1,0,undefined],
            [425,650,10,enemyDraw.saw,10,0,1.75,1,undefined],
            [375,900,10,enemyDraw.saw,10,0,1.75,1,undefined],
            [150,760,10,enemyDraw.saw,10,0,1.75,1,undefined],
            [190,530,20,enemyDraw.throw,15,1,1,3,undefined],
            [430,400,20,enemyDraw.throw,15,1,1,3,undefined],
            [740,150,20,enemyDraw.throw,15,1,1,3,undefined],
            [640,335,10,enemyDraw.saw,10,0,1.75,1,undefined]
        ],
        entrance:{x:30,y:180,w:10,h:50},
        exit:{x:983,y:400,w:36,h:200}
    },
    {
        backGround:"back4",
        size:{x:1000,y:500},
        collision:[{x:23,y:27,w:56,h:54},{x:168,y:15,w:12,h:29},{x:257,y:3,w:180,h:14},{x:482,y:28,w:325,h:58},{x:753,y:8,w:325,h:18},{x:775,y:29,w:50,h:39},{x:934,y:74,w:135,h:184},{x:973,y:184,w:58,h:74},{x:964,y:481,w:93,h:54},{x:516,y:497,w:1054,h:19},{x:583,y:492,w:48,h:57},{x:449,y:482,w:51,h:47},{x:317,y:466,w:60,h:77},{x:43,y:440,w:95,h:122},{x:407,y:206,w:297,h:69},{x:429,y:243,w:17,h:24},{x:646,y:201,w:46,h:29},{x:11,y:290,w:23,h:36},{x:16,y:179,w:33,h:61}],
        modules:[
            [modules.bodies.tankyTwo,825,80],
            [modules.legs.hover,139,440],
            [modules.arms.plasma,660,425]
        ],
        enemies:[
            [150,300,16,enemyDraw.quad,30,3,0,5,undefined],
            [530,100,20,enemyDraw.gunner,15,1,0.75,6,undefined],
            [430,340,20,enemyDraw.gunner,15,1,0.75,6,undefined],
            [640,95,20,enemyDraw.throw,15,1,1,3,undefined],
            [730,290,20,enemyDraw.throw,15,1,1,3,undefined],
            [390,450,20,enemyDraw.throw,15,1,1,3,undefined]
        ],
        entrance:{x:100,y:30,w:50,h:10},
        exit:{x:983,y:340,w:36,h:200}
    },
    {
        backGround:"back5",
        size:{x:800,y:2000},
        collision:[{x:60,y:1901,w:126,h:214},{x:158,y:1838,w:126,h:85},{x:246,y:1986,w:310,h:25},{x:535,y:1979,w:310,h:44},{x:733,y:1949,w:170,h:44},{x:781,y:1751,w:35,h:374},{x:762,y:1430,w:76,h:280},{x:696,y:1396,w:76,h:72},{x:612,y:1125,w:129,h:104},{x:736,y:1148,w:129,h:40},{x:673,y:680,w:29,h:510},{x:570,y:828,w:29,h:510},{x:572,y:595,w:29,h:215},{x:236,y:848,w:44,h:570},{x:238,y:878,w:44,h:570},{x:636,y:508,w:158,h:44},{x:715,y:463,w:83,h:94},{x:698,y:392,w:218,h:85},{x:716,y:38,w:172,h:76},{x:606,y:26,w:76,h:50},{x:478,y:16,w:211,h:35},{x:272,y:89,w:59,h:175},{x:196,y:137,w:154,h:80},{x:58,y:5,w:154,h:12},{x:20,y:150,w:39,h:282},{x:148,y:334,w:274,h:88},{x:36,y:434,w:74,h:153},{x:118,y:505,w:149,h:38},{x:216,y:521,w:120,h:96},{x:134,y:1130,w:246,h:66},{x:17,y:1277,w:51,h:281},{x:54,y:1495,w:109,h:214},{x:117,y:1540,w:234,h:123},{x:559,y:1742,w:185,h:90},{x:192,y:1293,w:75,h:60}],
        modules:[
            [modules.bodies.tankyFour,80,1250],
            [modules.bodies.tankyFive,110,425],
            [modules.heads.purp,575,1245]
        ],
        enemies:[
            [255,1920,10,enemyDraw.saw,5,0,1.75,1,undefined],
            [450,1920,10,enemyDraw.saw,5,0,1.75,1,undefined],
            [705,1850,10,enemyDraw.saw,5,0,1.75,1,undefined],
            [705,1650,10,enemyDraw.saw,5,0,1.75,1,undefined],
            [500,1595,10,enemyDraw.saw,5,0,1.75,1,undefined],
            [535,1470,10,enemyDraw.saw,5,0,1.75,1,undefined],
            [170,1420,10,enemyDraw.saw,5,0,1.75,1,undefined],
            [370,1520,10,enemyDraw.saw,5,0,1.75,1,undefined],
            [155,1630,20,enemyDraw.clapper,10,0,1,0,undefined],
            [160,1760,20,enemyDraw.clapper,10,0,1,0,undefined],
            [415,1305,20,enemyDraw.throw,15,1,1,3,undefined],
            [695,1235,20,enemyDraw.throw,15,1,1,3,undefined],
            [490,1030,20,enemyDraw.throw,15,1,1,3,undefined],
            [300,1020,20,enemyDraw.throw,15,1,1,3,undefined],
            [400,980,20,enemyDraw.throw,15,1,1,3,undefined],
            [400,750,12,enemyDraw.turret,30,2,0,4,undefined],
            [515,210,20,enemyDraw.gunner,15,1,0.75,6,undefined],
            [385,220,20,enemyDraw.gunner,15,1,0.75,6,undefined],
            [510,490,20,enemyDraw.gunner,15,1,0.75,6,undefined],
            [195,435,20,enemyDraw.gunner,15,1,0.75,6,undefined],
            [365,105,20,enemyDraw.gunner,15,1,0.75,6,undefined],
            [490,105,20,enemyDraw.gunner,15,1,0.75,6,undefined],
            [590,200,20,enemyDraw.gunner,15,1,0.75,6,undefined],
            [205,25,10,enemyDraw.saw,5,0,1.75,1,undefined],
            [200,70,10,enemyDraw.saw,5,0,1.75,1,undefined],
            [155,75,10,enemyDraw.saw,5,0,1.75,1,undefined],
            [160,30,10,enemyDraw.saw,5,0,1.75,1,undefined],
            [100,35,10,enemyDraw.saw,5,0,1.75,1,undefined],
            [565,1855,16,enemyDraw.quad,30,3,0,5,undefined]
        ],
        entrance:{x:30,y:1700,w:10,h:50},
        exit:{x:780,y:215,w:36,h:200}
    },
    {
        backGround:"back6",
        size:{x:1500,y:1500},
        collision:[{x:548,y:751,r:98},{x:949,y:749,r:98},{x:693,y:749,w:115,h:11},{x:407,y:750,w:115,h:11},{x:548,y:897,w:14,h:112},{x:548,y:605,w:14,h:112},{x:31,y:634,w:69,h:42},{x:30,y:869,w:69,h:42},{x:1467,y:870,w:69,h:42},{x:1466,y:634,w:69,h:42},{x:9,y:938,r:76},{x:-50,y:1048,r:171},{x:6,y:1159,r:171},{x:95,y:1283,r:171},{x:237,y:1374,r:129},{x:351,y:1451,r:129},{x:499,y:1513,r:129},{x:597,y:1546,r:129},{x:675,y:1562,r:129},{x:745,y:1568,r:129},{x:854,y:1559,r:129},{x:943,y:1540,r:129},{x:1064,y:1495,r:129},{x:1172,y:1445,r:129},{x:1228,y:1413,r:129},{x:1309,y:1341,r:129},{x:1406,y:1233,r:129},{x:1453,y:1161,r:129},{x:1493,y:1087,r:129},{x:1524,y:1012,r:129},{x:1508,y:948,r:95},{x:1508,y:551,r:95},{x:1520,y:464,r:135},{x:1474,y:365,r:135},{x:1439,y:298,r:135},{x:1385,y:229,r:135},{x:1314,y:156,r:135},{x:1254,y:109,r:135},{x:1175,y:47,r:135},{x:1084,y:1,r:135},{x:1013,y:-31,r:135},{x:938,y:-49,r:135},{x:866,y:-65,r:135},{x:831,y:-71,r:135},{x:773,y:-74,r:135},{x:712,y:-73,r:135},{x:624,y:-62,r:135},{x:539,y:-48,r:135},{x:447,y:-11,r:135},{x:355,y:23,r:135},{x:269,y:86,r:135},{x:220,y:127,r:135},{x:140,y:201,r:135},{x:69,y:302,r:135},{x:47,y:323,r:135},{x:11,y:392,r:135},{x:-18,y:450,r:135},{x:-37,y:497,r:135},{x:5,y:568,r:76}],
        modules:[
            [modules.bodies.skinnyTwo,605,620],
            [modules.arms.saw,150,600],
            [modules.arms.gun,245,910],
            [modules.arms.stock,180,1025],
            [modules.arms.shot,495,890],
            [modules.arms.mini,410,715],
            [modules.arms.plasma,280,435],
            [modules.legs.spider,625,875]
        ],
        enemies:[
            [1111,500,50,enemyDraw.plasma,150,4,0.5,8,undefined],
            [1111,1000,50,enemyDraw.plasma,150,4,0.5,8,undefined],
            [795,750,16,enemyDraw.quad,30,3,0,5,undefined],
            [310,575,12,enemyDraw.turret,30,2,0,4,undefined],
            [390,1045,12,enemyDraw.turret,30,2,0,4,undefined],
            [445,295,20,enemyDraw.gunner,15,1,0.75,6,undefined],
            [730,135,20,enemyDraw.gunner,15,1,0.75,6,undefined],
            [700,385,20,enemyDraw.gunner,15,1,0.75,6,undefined],
            [530,1285,20,enemyDraw.gunner,15,1,0.75,6,undefined],
            [880,1380,20,enemyDraw.gunner,15,1,0.75,6,undefined],
            [705,1010,20,enemyDraw.gunner,15,1,0.75,6,undefined],
            [405,825,20,enemyDraw.gunner,15,1,0.75,6,undefined],
            [1090,255,20,enemyDraw.gunner,15,1,0.75,6,undefined],
            [1275,705,20,enemyDraw.gunner,15,1,0.75,6,undefined],
            [1230,965,20,enemyDraw.gunner,15,1,0.75,6,undefined]
        ],//,[1250,750,50,enemyDraw.plasma,150,4,0.5,8,undefined]
        entrance:{x:30,y:750,w:10,h:50},
        exit:{x:1490,y:750,w:36,h:200}
    },
    {
        backGround:"back7",
        size:{x:640,y:480},
        collision:[],
        modules:[],
        enemies:[],
        entrance:{x:30,y:170,w:10,h:50},
        exit:{x:1490,y:750,w:36,h:200}
    }
];

function bottomMapDraw() {
    switch(level) {
        case 0:
            imgIgnoreCutoff(sprites.LV1_Exit,500,200);
            break;
        case 1:
            imgIgnoreCutoff(sprites.gatesLVL2,500,500);
            break;
        case 2:
            imgIgnoreCutoff(sprites.LVL3_EnterExit,500,500);
            break;
        case 3:
            imgIgnoreCutoff(sprites.LVL4_EnterExit,500,250);
            break;
        case 4:
            imgIgnoreCutoff(sprites.LVL5_EnterExit,400,1000);
            let df = Math.round(count/7)%12;
            imgIgnoreCutoff(sprites[`LVL5_BBLS_${df}`],400,1000);
            break;
        case 5:
            imgIgnoreCutoff(sprites.LVL6_EnterExit,750,750);
            break;
        case 6:
            imgIgnoreCutoff(sprites.LVL7_Enter,320,240);
            break;
    }
}

function topMapDraw() {
    let c;
    let frame=0;
    switch(level) {
        case 0:
            c = count%100;
            frame = 0;
            if(c<80) {if(c>75) {frame=3;} else if(c>70) {frame=2;} else if(c>65) {frame=1;}}
            imgIgnoreCutoff(sprites[`LV1_Lamp${frame}`],500,200);

            c=count%250;
            if(c>175) {frame=2;} else if(c>75) {frame=1;} else {frame=0;}
            imgIgnoreCutoff(sprites[`LV1_LED${frame}`],500,200);
            
            imgIgnoreCutoff(sprites[`Ship${(Math.round(count/30)%3)}`],500,200);
            imgIgnoreCutoff(sprites[`SS-${(Math.round(count/10)%12)}`],500,200);
            break;
        case 1:
            c = count%100;
            frame = 0;
            if(c<50&&c>45) {frame=1;}
            if(c<55&&c>50) {frame=2;}
            imgIgnoreCutoff(sprites[`lamp${frame}`],500,500);
            c=count%250;
            if(c>175) {frame=2;} else if(c>75) {frame=1;} else {frame=0;}
            imgIgnoreCutoff(sprites[`led${frame}`],500,500);

            imgIgnoreCutoff(sprites.lightsLVL2,500,500);

            img(sprites.lamp,595,285,count/100);
            break;
        case 2:
            imgIgnoreCutoff(sprites[`LVL3_Plants`],500,500);
            c = count%100;
            frame = 0;
            if(c<50&&c>45) {frame=1;}
            if(c<55&&c>50) {frame=2;}
            imgIgnoreCutoff(sprites[`LVL3_Lamps_000${frame}`],500,500);
            c=count%250;
            if(c>175) {frame=2;} else if(c>75) {frame=1;} else {frame=0;}
            imgIgnoreCutoff(sprites[`LVL3_LEDS_000${frame}`],500,500);

            c=count%100;
            if(c>75) {frame=3;} else if(c>50) {frame=2;} else if(c>25) {frame=1;} else {frame=0;}
            imgIgnoreCutoff(sprites[`Spores_000${frame}`],500,500);
            break;
        case 3:
            c = count%100;
            frame = 0;
            if(c<50&&c>45) {frame=1;}
            if(c<55&&c>50) {frame=2;}
            imgIgnoreCutoff(sprites[`LVL4_Panel_000${frame}`],500,250);
            c=count%250;
            if(c>175) {frame=2;} else if(c>75) {frame=1;} else {frame=0;}
            imgIgnoreCutoff(sprites[`LVL4_LED_000${frame}`],500,250);

            img(sprites.Lamp_asset_Dual,430,220,count/100);
            break;
        case 4:
            c = count%100;
            frame = 0;
            if(c<50&&c>45) {frame=1;}
            if(c<55&&c>50) {frame=2;}
            imgIgnoreCutoff(sprites[`LVL5_Lamps_000${frame}`],400,1000);
            c=count%250;
            if(c>175) {frame=2;} else if(c>75) {frame=1;} else {frame=0;}
            imgIgnoreCutoff(sprites[`LVL5_LEDS_000${frame}`],400,1000);

            img(sprites.Lamp_asset_Dual,500,1740,count/75);
            break;
        case 5:
            imgIgnoreCutoff(sprites.LVL6_quadlamps,545,750);
            imgIgnoreCutoff(sprites.LVL6_quadlamps_2,945,750);
            break;
        case 6:
                imgIgnoreCutoff(sprites.LVL7_Factory,320,240);
                imgIgnoreCutoff(sprites.LVL7_Lamps,320,240);

                imgIgnoreCutoff(sprites.LZRBM_0,320,240);
            break;
    }
}

function switchLevel(lvl) {
    enemies=[];
    bullets=[];
    particles=[];
    items=[];
    parts=[];

    player.v={x:0,y:0};
    miniSpeed=15;

    var l = levels[lvl];
    curLvl.backGround = l.backGround;
    curLvl.size = l.size;
    curLvl.collision = l.collision;
    curLvl.entrance = l.entrance;
    curLvl.exit = l.exit;
    player.x = l.entrance.x;
    player.y = l.entrance.y;
    c.x = l.size.x/2;
    c.y = l.size.y/2;
    leaveTime=0;

    centerCameraOn(c.x,c.y);
    
    for(let i=0;i<l.modules.length;i++) {
        items.push( new module(l.modules[i][1],l.modules[i][2],l.modules[i][0]));
    }

    for(let i=0;i<l.enemies.length;i++) {
        let ee = l.enemies[i];
        enemies.push( new enemy(ee[0],ee[1],ee[2],ee[3],ee[4],ee[5],ee[6],ee[7],ee[8]));
    }

    level = lvl;
}

function colliding(circ) {
    for(var ii=0,ll=col.length;ii<ll;ii++) {
        var colCache = col[ii];
        if(colCache.r !== undefined) {
            if(circlecircle(circ,colCache)) {return true;}
        } else {
            if(circlerect(circ,colCache)) {return true;}
        }
    }
    return false;
}