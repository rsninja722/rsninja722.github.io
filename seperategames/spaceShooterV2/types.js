var shotTypes = [
    [
        {w:6,h:6,pic:p.bullet1,speed:2,damage:1,pen:0,angle:0,x:0,y:0}
    ],
    [
        {w:6,h:6,pic:p.bullet1,speed:3,damage:1,pen:0,angle:-10,x:0,y:0},
        {w:6,h:6,pic:p.bullet1,speed:4,damage:1,pen:1,angle:0,x:0,y:0},
        {w:6,h:6,pic:p.bullet1,speed:3,damage:1,pen:0,angle:10,x:0,y:0}
    ],
    [
        {w:6,h:6,pic:p.bullet1,speed:2,damage:1,pen:0,angle:-10,x:0,y:0},
        {w:6,h:6,pic:p.bullet1,speed:2.5,damage:1,pen:0,angle:0,x:0,y:0},
        {w:6,h:6,pic:p.bullet1,speed:2,damage:1,pen:0,angle:10,x:0,y:0}
    ],
    [
        {w:6,h:6,pic:p.bullet1,speed:1,damage:1,pen:0,angle:0,x:6,y:0},
        {w:6,h:6,pic:p.bullet1,speed:1,damage:1,pen:0,angle:0,x:0,y:0},
        {w:6,h:6,pic:p.bullet1,speed:1,damage:1,pen:0,angle:0,x:-6,y:0}
    ]
];


var movementTypes = [
    [
        {x:0,y:1.25,frames:-1,s:1}
    ],
    
    [
        {x:0,y:1,frames:30,s:1},
        {x:0,y:0,frames:10,s:1}
    ],
    [
        {x:-0.5,y:1,frames:15,s:2},
        {x:0,y:-0.5,frames:15,s:2},
        {x:0.5,y:0.5,frames:15,s:2},
        {x:0,y:-0.5,frames:15,s:2}
    ]
]

var astroids = [
    [
        [0,1,1,0],
        [0,1,1,1],
        [1,1,1,1],
        [0,0,1,1]
    ],
    [
        [0,0,0,0],
        [0,1,1,0],
        [0,0,1,0],
        [0,0,0,0]
    ],
    [
        [0,1,1,0],
        [1,1,1,1],
        [1,1,1,1],
        [0,1,1,0]
    ]
]