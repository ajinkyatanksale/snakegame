var x = 10, y = 10, snakex = 250, snakey = 250, interval, score = 0, isStart = false, isPause = false, direction = 0, id1 = 2;
var position = [{x: 250, y: 250}, {x: 240, y: 250}]
// var x_arr = [250, 240];
// var y_arr = [250, 240];

function start() {
    setScore();     
    setPrey(); 
    interval = setInterval(forward, 100);
    isStart = true;
    document.getElementById("start").disabled = true;
}

function setPrey() {
    document.getElementById('prey').style.display = "block";
    x = Math.floor(Math.random() * 50)+1;
    y = Math.floor(Math.random() * 50)+1;
    document.getElementById("prey").style.left = x*10+'px';
    document.getElementById("prey").style.top = y*10+'px';
}

function fwd() {
    if (direction != 1 && isStart && !isPause) {
        clearInterval(interval);
        interval = setInterval(forward, 100);
    }
}

function bwd() {
    if (direction != 0 && isStart && !isPause) {
        clearInterval(interval);
        interval = setInterval(backward, 100);
    }
}

function upwd() {
    if (direction != 3 && isStart && !isPause) {
        clearInterval(interval);
        interval = setInterval(up, 100);
    }
}

function dnwd() {
    if (direction != 2 && isStart && !isPause) {
        clearInterval(interval);
        interval = setInterval(down, 100);
    }
}

function forward() {
    if (snakex <= 490) {
        direction = 0;
        snakex += 10;
        document.getElementById("s0").style.left = snakex + "px";
        if (snakex == x*10 && snakey == y*10) {
            score += 10;
            setScore();
            setPrey();
            var newNode = document.createElement("div");
            newNode.id = "s"+id1;
            newNode.className = "snake1";
            id1++;
            document.getElementById("snake").appendChild(newNode);
            position[position.length] = {x:0, y:0};
        }

        for (var i=position.length-1; i>0; i--) {
            position[i].x = position[i-1].x;
            position[i].y = position[i-1].y;
            document.getElementById("s"+i).style.left = position[i].x + "px";
            document.getElementById("s"+i).style.top = position[i].y + "px";
        }
        
        position[0].x = snakex; position[0].y = snakey;
    }
    else {
        clearInterval(interval);
        gameOver();
    }
}

function backward() {
    if (snakex >= 20) {
        direction = 1;
        snakex -= 10;
        document.getElementById("s0").style.left = snakex + "px";
        if (snakex == x*10 && snakey == y*10) {
            score += 10;
            setScore();
            setPrey();
            var newNode = document.createElement("div");
            newNode.id = "s"+id1;
            newNode.className = "snake1";
            id1++;
            document.getElementById("snake").appendChild(newNode);
            position[position.length] = {x:0, y:0};
        }
        
        for (var i=position.length-1; i>0; i--) {
            position[i].x = position[i-1].x;
            position[i].y = position[i-1].y;
            document.getElementById("s"+i).style.left = position[i].x + "px";
            document.getElementById("s"+i).style.top = position[i].y + "px";
        }
        
        position[0].x = snakex; position[0].y = snakey;
    }
    else {
        clearInterval(interval);
        gameOver();
    }

}

function up() {
    if (snakey >= 20) {
        direction = 2;
        snakey -= 10;
        document.getElementById("s0").style.top = snakey + "px";
        if (snakex == x*10 && snakey == y*10) {
            score += 10;
            setScore();
            setPrey();
            var newNode = document.createElement("div");
            newNode.id = "s"+id1;
            newNode.className = "snake1";
            id1++;
            document.getElementById("snake").appendChild(newNode);
            position[position.length] = {x:0, y:0};
        }
        
        for (var i=position.length-1; i>0; i--) {
            position[i].x = position[i-1].x;
            position[i].y = position[i-1].y;
            document.getElementById("s"+i).style.left = position[i].x + "px";
            document.getElementById("s"+i).style.top = position[i].y + "px";
        }
        
        position[0].x = snakex; position[0].y = snakey;
    }
    else {
        clearInterval(interval);
        gameOver();
    }
}

function down() {
    if (snakey <= 490) {
        direction = 3;
        snakey += 10;
        document.getElementById("s0").style.top = snakey + "px";
        if (snakex == x*10 && snakey == y*10) {
            score += 10;
            setScore();
            setPrey();
            var newNode = document.createElement("div");
            newNode.id = "s"+id1;
            newNode.className = "snake1";
            id1++;
            document.getElementById("snake").appendChild(newNode);
            position[position.length] = {x:0, y:0};
        }
       
        for (var i=position.length-1; i>0; i--) {
            position[i].x = position[i-1].x;
            position[i].y = position[i-1].y;
            document.getElementById("s"+i).style.left = position[i].x + "px";
            document.getElementById("s"+i).style.top = position[i].y + "px";
        }
        
        position[0].x = snakex; position[0].y = snakey;
    }
    else {
        clearInterval(interval);
        gameOver();
    }
}

function setScore() {
    document.getElementById("score").innerHTML = "Score:" + score;
}

function gameOver() {
    document.getElementById("result").innerHTML = "Game Over";
    isStart = false;
}

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;
    if (e.keyCode == '38') {
        upwd();
    }
    else if (e.keyCode == '40') {
        dnwd();
    }
    else if (e.keyCode == '37') {
        bwd();
    }
    else if (e.keyCode == '39') {
        fwd();
    }
}

function pause(){
    if (!isPause) {
        isPause = true;
        clearInterval(interval);
        document.getElementById("pause").innerText = "Resume";
    }
    else {
        isPause = false;
        switch(direction) {
            case 0:
                fwd();
                break;
            case 1:
                bwd();
                break;
            case 2:
                upwd();
                break;
            case 3:
                dnwd();
                break;
        }
        document.getElementById("pause").innerText = "Pause";
    }
    
}

function reset() {
    clearInterval(interval);
    document.getElementById("result").innerHTML = "";
    document.getElementById("prey").style.display = "none";
    document.getElementById("prey").style.left = 10 + 'px';
    document.getElementById("prey").style.top = 10 +'px';
    snakex = 250; snakey = 250;
    document.getElementById("s0").style.left = 250 + "px";
    document.getElementById("s0").style.top = 250 + "px";
    document.getElementById("s1").style.left = 240 + "px";
    document.getElementById("s1").style.top = 250 + "px";
    position[0].x = snakex; position[0].y = snakey;
    position[1].x = snakex-10; position[1].y = snakey;
    var len = position.length;
    for (var i=2; i<len; i++) {
        position.pop();
        document.getElementById("s"+i).remove();
    }
    id1 = 2;
    score = 0;
    setScore();
    isStart = false;
    direction = 0;
    document.getElementById("start").disabled = false;
}