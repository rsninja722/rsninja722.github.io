function move(direction) {

    switch(direction) {
        case "up":
            snake.push({x:snake[0].x,y:snake[0].y,dir:1,type:"body"});
            snake[0].y--;
            var asasjdg = snake[0].dir;
            snake[0].dir = 1;
            if(didIwinthisLevel()) {
                sounds.win.play();setTimeout(lkjh,1000);
            } else { 
                snake[0].dir = asasjdg;
            
            
            if(hitStuff()) {
                snake[0].y++;
                snake.pop();
                return true;
            } else {
                snake[0].dir = 1;
                if(itemCheck()) {
                    snake[0].y++;
                    snake.pop();
                }
            }
            }
            break;
        case "down":
            snake.push({x:snake[0].x,y:snake[0].y,dir:3,type:"body"});
            snake[0].y++;
            var asasjdg = snake[0].dir;
            snake[0].dir = 3;
            if(didIwinthisLevel()) {
                sounds.win.play();setTimeout(lkjh,1000);
            } else { 
                snake[0].dir = asasjdg;
            
            if(hitStuff()) {
                snake[0].y--;
                snake.pop();
                return true;
            } else {
                snake[0].dir = 3;
                if(itemCheck()) {
                    snake[0].y--;
                    snake.pop();
                }
            }
            }
            break;
        case "left":
            snake.push({x:snake[0].x,y:snake[0].y,dir:2,type:"body"});
            snake[0].x++;
            var asasjdg = snake[0].dir;
            snake[0].dir = 2;
            if(didIwinthisLevel()) {
                sounds.win.play();setTimeout(lkjh,1000);
            } else { 
                snake[0].dir = asasjdg;
            
            if(hitStuff()) {
                snake[0].x--;
                snake.pop();
                return true;
            } else {
                snake[0].dir = 2;
                if(itemCheck()) {
                    snake[0].x--;
                    snake.pop();
                }
            }
            }
            break;
        case "right":
            snake.push({x:snake[0].x,y:snake[0].y,dir:4,type:"body"});
            snake[0].x--;
            var asasjdg = snake[0].dir;
            snake[0].dir = 4;
            if(didIwinthisLevel()) {
                sounds.win.play();setTimeout(lkjh,1000);
            } else { 
                snake[0].dir = asasjdg;
            
            if(hitStuff()) {
                snake[0].x++;
                snake.pop();
                return true;
            } else {
                snake[0].dir = 4;
                if(itemCheck()) {
                    snake[0].x++;
                    snake.pop();
                }
            }
            }
            break;
    }
}


function itemCheck() {
    if(game[snake[0].y][snake[0].x]==2) {
        sounds[`cover${rand(1,3)}`].play();
    }
    for(let i=0;i<items.length;i++) {
        if(snake[0].x==items[i].x&&snake[0].y==items[i].y) {
            switch(items[i].type) {
                case "faze":
                    fazes++;
                    items.splice(i,1);
                    i--;
                    break;
            }
        }
    }
    switch((game[snake[0].y][snake[0].x].toString())[0]) {
        case "4":
            var yup = false;
            for(var r=1;r<snake.length;r++) {
                if(snake[r].y==snake[0].y&&snake[r].x==snake[0].x&&fazes<=1) {
                    yup = true;
                }
            }

            if(!yup) { 
                keysoff = true;
                setTimeout(asdf,250);
                
            }
            break;
    }
}
function asdf() {
    keysoff = true;
    switch((game[snake[0].y][snake[0].x].toString())[1]) {
        case "1":
            sounds[`boost${rand(1,2)}`].play();
            if(move("up")) {
                
                return true;
            }
            break;
        case "2":
            sounds[`boost${rand(1,2)}`].play();
            if(move("left")) {
                
                return true;
            }
            break;
        case "3":
            sounds[`boost${rand(1,2)}`].play();
            if(move("down")) {
                
                return true;
            }
            break;
        case "4":
            sounds[`boost${rand(1,2)}`].play();
            if(move("right")) {
                
                return true;
            }
            break;
    }
    drawthestuff();
}

function lkjh() {
    resetStuff();switchLevel();first = true;
}