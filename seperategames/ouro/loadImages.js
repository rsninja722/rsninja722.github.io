var images = {
    test: new Image(),
    snakeTest: new Image(),
    snakeBodyTest: new Image(),
    snakeBodyRotateTest: new Image(),
    snakeBodyTestDark: new Image(),
    snakeBodyRotateTestDark: new Image(),
    boostTest: new Image(),
    orbTest: new Image(),
    snakeHeadDarkTest: new Image(),
    two: new Image(),
    three: new Image(),
    one: new Image(),
    onelit: new Image(),
    four: new Image(),
    fourOut: new Image(),
    orb1: new Image(),
    orb2: new Image(),
    orb3: new Image(),
    orb4: new Image(),
    orb5: new Image(),
    four0: new Image(),
    four1: new Image(),
    four2: new Image(),
    four3: new Image(),
    four4: new Image(),
    four5: new Image(),
    norm: new Image(),
    rreset: new Image(),
    testyes: new Image(),
    wasd: new Image(),
    titlee: new Image(),
    w: new Image(),
    win: new Image()
}

var sounds = {
    move1: new Audio(),
    move2: new Audio(),
    move3: new Audio(),
    move4: new Audio(),
    cover1: new Audio(),
    cover2: new Audio(),
    cover3: new Audio(),
    boost1: new Audio(),
    boost2: new Audio(),
    win: new Audio(),
    no: new Audio()
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

sounds.move1.src = "images/move1.wav";
sounds.move2.src = "images/move2.wav";
sounds.move3.src = "images/move3.wav";
sounds.move4.src = "images/move4.wav";
sounds.cover1.src = "images/cover1.wav";
sounds.cover2.src = "images/cover2.wav";
sounds.cover3.src = "images/cover3.wav";
sounds.boost1.src = "images/boost1.wav";
sounds.boost2.src = "images/boost2.wav";
sounds.win.src = "images/win.wav";
sounds.no.src = "images/no.wav";


images.win.src = "images/win.png";
images.w.src = "images/w.png";
images.titlee.src = "images/title.png";
images.test.src = "images/test.png";
images.testyes.src = "images/testyes.png";
images.snakeTest.src = "images/snakeTest.png";
images.snakeHeadDarkTest.src = "images/snakeHeadDarkTest.png";
images.snakeBodyTest.src = "images/snakeBodyTest.png";
images.snakeBodyRotateTest.src = "images/snakeBodyRotateTest.png";
images.snakeBodyTestDark.src = "images/snakeBodyTestDark.png";
images.snakeBodyRotateTestDark.src = "images/snakeBodyRotateTestDark.png";
images.boostTest.src = "images/boostTest.png";
images.orbTest.src = "images/orbTest.png";
images.two.src = "images/2.png";
images.three.src = "images/3.png";
images.one.src = "images/1.png";
images.onelit.src = "images/1lit.png";
images.four.src = "images/4.png";
images.four0.src = "images/40.png";
images.four1.src = "images/41.png";
images.four2.src = "images/42.png";
images.four3.src = "images/43.png";
images.four4.src = "images/40.png";
images.four5.src = "images/40.png";
images.fourOut.src = "images/4out.png";
images.orb1.src = "images/orb1.png";
images.orb2.src = "images/orb2.png";
images.orb3.src = "images/orb3.png";
images.orb4.src = "images/orb4.png";
images.orb5.src = "images/orb5.png";
images.norm.src = "images/norm.png";
images.rreset.src = "images/reset.png";
images.wasd.src = "images/wasd.png";