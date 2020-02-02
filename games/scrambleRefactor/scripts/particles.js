var particles = [];
class particle {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.v = { x: 0, y: 0 };
        this.type = type;
        this.angle = 0;
        this.speed = 0;
        switch (type) {
            case "key":
                this.speed = rand(10, 20) / 10;
                this.angle = degToRad(rand(0, 359));
                this.x += Math.cos(this.angle) * 8;
                this.y += Math.sin(this.angle) * 8;
                break;
            case "walk":
                this.speed = rand(15, 30) / 10;
                if (player.v.x > 0) {
                    this.angle = degToRad(rand(180, 270));
                    this.x -= player.w / 2;
                } else {
                    this.angle = degToRad(rand(270, 360));
                    this.x += player.w / 2;
                }
                this.v.x = Math.cos(this.angle);
                this.v.y = Math.sin(this.angle);
                this.w = 2;
                this.h = 2;
                break;
        }
    }
    draw() {
        switch (this.type) {
            case "key":
                rect(Math.round(this.x), Math.round(this.y), 2, 2, "#777777");
                break;
            case "walk":
                let col;
                switch (level) {
                    case 0: col = "green"; break;
                }
                rect(Math.round(this.x), Math.round(this.y), 2, 2, col);
                break;
        }
    }
    update() {
        switch (this.type) {
            case "key":
                this.speed -= 0.1;
                if (this.speed <= 0) {
                    return true;
                }
                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed;
                break;
            case "walk":
                this.v.x = (this.v.x, 0.1);
                this.v.y += 0.05;
                this.x += this.v.x;
                this.y += this.v.y;
                for (let i = 0, l = blocks.length; i < l; i++) {
                    if (rectrect(this, blocks[i])) {
                        return true;
                    }
                }
                break;
        }
    }
}

function updateParticles() {
    for (var i = 0; i < particles.length; i++) {
        if (particles[i].update()) {
            particles.splice(i, 1);
            i--;
        }
    }
}

function drawParticles() {
    for(var i=0;i<particles.length;i++) {
        particles[i].draw();
    }
}

function friction(num,amount) {
    if(num>0) {num -= amount;}
    if(num<0) {num += amount;}
    if(Math.abs(num)<amount*2) {num = 0;}
    return num;
}