var canvas = document.getElementById("cvs");
    var ctx = canvas.getContext("2d");
    canvas.width = document.getElementById("topbar").clientWidth;
    canvas.height = window.innerHeight;
    var cw = canvas.width;
    var ch = canvas.height;
    addListenersTo(canvas);
    var friction = 0.8;

    var counter = 0;

    var types = [
        {color:"#0466a6",reactions:[],range:0},
        {color:"#018edb",reactions:[],range:0},
        {color:"#5fc0eb",reactions:[],range:0}
    ];
    
    var particles = [];


    window.onload = function() {
        canvas.height = document.body.offsetHeight < window.innerHeight ?  window.innerHeight : document.body.offsetHeight;
        ch = canvas.height;
        for(var i=0;i<types.length;i++) {
            types[i].range = rand(24,32);
            for(var j=0;j<types.length;j++) {
                types[i].reactions[j] = randDec(-2,2);
            }
        }
        for(var y=0;y<ch;y+=10) {
            for(var x=0;x<cw;x+=10) {
                if(!rand(0,20)){particles.push(new particle(x,y,rand(0,types.length-1)));}
            }   
        }
    }
    function update() {
        canvas.width = document.getElementById("topbar").clientWidth;
        canvas.height = document.body.offsetHeight < window.innerHeight ?  window.innerHeight : document.body.offsetHeight
        cw = canvas.width;
        ch = canvas.height;
        counter++;
        if(mousePress[0]) {particles.push(new particle(mousePos.x,mousePos.y,rand(0,types.length-1)));}
        for(var i=0;i<particles.length;i++) {
            var curpart = particles[i];
            var rang = types[curpart.t].range;
            var vels = [];
            for(var j=0;j<particles.length;j++) {
                if(i==j) {continue;}
                var dist = length(curpart,particles[j]);
                if(dist<25) {
                    if(dist<8) {
                    if(dist==0) {curpart.x+=randDir();curpart.x+=randDir();curpart.y+=randDir();} else {
                            var angle = pointTo(curpart,particles[j]) + Math.PI/2;
                            curpart.v.x = (Math.sin(angle)/dist)*2;
                            curpart.v.y = (Math.cos(angle)/dist)*2;
                            curpart.x+=curpart.v.x;
                            curpart.y+=curpart.v.y;
                        }
                    }
                    if(dist<rang) {
                        var dir = types[curpart.t].reactions[particles[j].t];
                        var angle = pointTo(curpart,particles[j]) - Math.PI/2;
                        vels.push([(Math.sin(angle)*(dir/rang*10)),(Math.cos(angle)*(dir/rang*10))]);
                    }
                }
            }
            if(vels.length>0) {
                var finalx=0;
                var finaly=0;
                for(var g=0;g<vels.length;g++) {
                    finalx+=vels[g][0];
                    finaly+=vels[g][1];
                }
                finalx/=vels.length;
                finaly/=vels.length;
                curpart.v.x+=finalx*0.5;
                curpart.v.y+=finaly*0.5;
            }
        }
        for(var i=0;i<particles.length;i++) {
            particles[i].move();
        }
        
        for(var i=0;i<mousePress.length;i++){if(mousePress[i]){mousePress[i]=0}}
        resetInput();
    }

    function draw() {
        ctx.clearRect(0,0,cw,ch);
        for(var i=0;i<particles.length;i++) {
            particles[i].draw();
        }
        requestAnimationFrame(draw);
    }

    function particle(x,y,type) {
        this.x = x;
        this.y = y;
        this.v = {x:0,y:0};
        this.t = type;
        this.r = 4;
        this.move = function() {
            this.x+=this.v.x;
            this.y+=this.v.y;
            this.v.x*=friction;
            this.v.y*=friction;
            if(this.x-this.r>cw) {this.x=0;}
            if(this.y-this.r>ch) {this.y=0;}
            if(this.x+this.r<0) {this.x=cw;}
            if(this.y+this.r<0) {this.y=ch;}
        };
        this.draw = function() {
            drawCircle(this.x,this.y,this.r,types[this.t].color);
            //rect(this.x,this.y,types[this.t].color);
        }
        return this;
    }
    function drawCircle(x,y,r,fillColor) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI, false);
        ctx.fillStyle = fillColor;
        ctx.fill();
    }
    function rect(x,y,color) {
        ctx.fillStyle=color;
        ctx.fillRect(x,y,8,8);
    }
    function length(object1,object2) {
        var one = (object2.x - object1.x);
        var two = (object2.y - object1.y);
        return Math.sqrt((one*one)+(two*two));
    }
    function pointTo(obj1,obj2) {
        var adjacent = (obj1.x - obj2.x);
        var opposite = (obj1.y - obj2.y);
        var h = Math.atan2(opposite, adjacent);
        return -h;
    }
    function rand(min,max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function randDir() {
        if(rand(0,1)==1) {
            return 1;
        } else {
            return -1;
        }
    }
    function randDec(min,max) {
        return (Math.floor(((Math.random() * (max - min + 1)) + min) * 100)) / 100;
    }
    setInterval(update,16.66);
    requestAnimationFrame(draw);