function updateMainMenu() {
    if(collideBoxPoint(buttons.playerVsplayer,mousePos)&&mousePress[0]) {
        gameState = 2;
        gameMode = 1;
    }
    if(collideBoxPoint(buttons.playerVsai,mousePos)&&mousePress[0]) {
        gameState = 2;
        gameMode = 2;
    }
}

function updateCharacterSelect() {
    if(gameMode==2) {
        if(collideBoxPoint(buttons.char1,mousePos)&&mousePress[0]) {
            gameState = 3;
            p1char = 1;
        }
        if(collideBoxPoint(buttons.char2,mousePos)&&mousePress[0]) {
            gameState = 3;
            p1char = 2;
        }
        if(collideBoxPoint(buttons.char3,mousePos)&&mousePress[0]) {
            gameState = 3;
            p1char = 3;
        }
    } else {
        if(keyPress[65]) {p1char=1;}
        if(keyPress[83]) {p1char=2;}
        if(keyPress[68]) {p1char=3;}

        if(keyPress[37]) {p2char=1;}
        if(keyPress[40]) {p2char=2;}
        if(keyPress[39]) {p2char=3;}     
    }
    if(collideBoxPoint(buttons.back,mousePos)&&mousePress[0]) {
        gameState--;
    }
}

function updateMapSelect() {
    if(collideBoxPoint(buttons.map,mousePos)&&mousePress[0]) {
        gameState = 4;
        if(gameMode==1) {
            players.push(new player(300,200,p1char,"p1"));
            players.push(new player(400,200,p2char,"p2"));
        } else {
            players.push(new player(300,200,p1char,"p1"));
            players.push(new player(400,200,2,"ai"));
        }
    }
    if(collideBoxPoint(buttons.back,mousePos)&&mousePress[0]) {
        gameState--;
    }
}

function updateMain() {
    for(var p=0;p<players.length;p++) {
        players[p].update();
    }
}