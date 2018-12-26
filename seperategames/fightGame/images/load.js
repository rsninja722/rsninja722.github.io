var imageList = [
    "ui/p1.png",
    "text/small1.png",
    "text/small2.png",
    "text/small3.png",
    "text/medium1.png",
    "text/large1.png", //5
    
]
var totalLoaded = 0;


function startLoad() {
    for(var i=0;i<imageList.length;i++) {
        let temp = new Image();
        temp.src = `images/${imageList[i]}`;
        imageSources.push(temp);
    }
}

function loadImages() {
    for(var i=0;i<imageSources.length;i++) {
        if(imageSources[i].complete) {
            images[imageList[i].slice((imageList[i].indexOf("/"))+1,imageList[i].indexOf("."))] = getImage(imageSources[i]);
            totalLoaded++;
        }
    }
    if(!(totalLoaded>=imageSources.length)) {
        requestAnimationFrame(loadImages);
    } else {
        startTextLoading();
    }
}



function getImage(imagey) {
    ctx.clearRect(0,0,cw,ch);
    ctx.drawImage(imagey,0,0);
    var temp = ctx.getImageData(0,0,imagey.width,imagey.height);
    var picture = [[],temp.width,temp.height,false];
    for(let j=0;j<temp.data.length;j++) {
        picture[0][j] = temp.data[j];
    }
    for(var j=3;j<temp.data.length;j+=4) {
        if(temp.data[j]!=255) {
            picture[3]=true;
            break;
        }
    }
    return picture;
}

function parseFont(name,img,w,h,order) {
    ctx.clearRect(0,0,cw,ch);
    ctx.drawImage(img,0,0);
    text[name] =  {};
    text[name].width = w;
    text[name].height = h;
    for(let i=0;i<order.length;i++) {
        let temp = ctx.getImageData(i*w,0,w,h);
        let tempChar = [];
        for(let h=0;h<temp.data.length;h+=4) {
            tempChar.push(temp.data[h]);
        }
        text[name][order[i]] = tempChar;
    }
}

function startTextLoading() {
    parseFont("small1",imageSources[1],3,5,["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","1","2","3","4","5","6","7","8","9",".","!","?"," "]);
    parseFont("small2",imageSources[2],3,5,["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","1","2","3","4","5","6","7","8","9",".","!","?"," "]);
    parseFont("small3",imageSources[3],3,5,["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","1","2","3","4","5","6","7","8","9",".","!","?"," "]);
    parseFont("medium1",imageSources[4],7,9,["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9",".",",",":","!","?","/","<","^",">"," "]);
    parseFont("large1",imageSources[5],11,17,["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9",".",",",":","!","?"," "]);
    text.small1["0"] = text.small1.o;
    text.small2["0"] = text.small2.o;
    text.small3["0"] = text.small3.o;
    setTimeout(start,100);
}