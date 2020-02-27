const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


// VARIABLES + STATE

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
let leftpress = false;
let rightpress = false;

let rows = 4;
let cols = 8;
let lmargin = 13;
let tmargin = 5;
let blocks = [];
let score = 0;



// OBJECTS

const ball = {
    x: centerX,
    y: centerY,
    r: 5,
    dx: 2,
    dy: 4,
    lives: 5,
    draw: () => {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2, true);
        ctx.fillStyle = "blue";
        ctx.fill()
    }
};

const paddle = {
    x: centerX,
    y: canvas.height - 15,
    h: 8,
    w: 60,
    speed: 3,
    dx: 6,
    draw: () => {
        ctx.fillStyle = "blue";
        ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h)
    }
};

const block = {
    h: 20,
    w: 60,
    dur: 1,
    draw: (x, y) => {
        ctx.fillStyle = "blue";
        ctx.fillRect(x, y, block.w, block.h);
    }
}

// SETUP BLOCKS
for (let c = 0; c < cols; c++) {
    blocks[c] = [];
    for (let r = 0; r < rows; r++) {
        let x = (c * (block.w + lmargin)) + lmargin;
        let y = (r * (block.h + tmargin)) + tmargin;
        blocks[c][r] = {x: x, y: y, active: true};
    }
}

function drawBlocks() {
    console.log(blocks)
    for (let c = 0; c < blocks.length; c++) {
        for (let r = 0; r < blocks[c].length; r++) {
            if (!blocks[c][r].active) continue;
            let x = blocks[c][r].x
            let y = blocks[c][r].y
            block.draw(x, y);
        }
    }
}


function handleCollision() {
    if (ball.x > canvas.width || ball.x < 0) { ball.dx *= -1};
    if (ball.y < 0) {ball.dy *= -1};
    if (ball.x > paddle.x && ball.x < paddle.x+paddle.w && ball.y > paddle.y) {
        ball.dy *= -1;
    }
    blocks.forEach(row => row.forEach( b => {
        if (!b.active) return;
        if (ball.x > b.x && ball.x < b.x+block.w && ball.y > b.y && ball.y < b.y+block.h) {
            b.active = false;
            score += 1;
            console.log(score);
            ball.dx *= -1;
            ball.dy *= -1;
        }
    }))
    if (ball.y > canvas.height) {
        if (ball.lives > 0) {
            nextLife();
        } else {
            alert("GAME OVER")
        }
    }
}

// REPAINT FUNCTION

function update() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ball.x += ball.dx;
    ball.y += ball.dy;
    handleCollision();
    if (paddle.x > 0 && leftpress) {
        paddle.x -= paddle.dx
    }
    if (paddle.x + paddle.w < canvas.width && rightpress) {
        paddle.x += paddle.dx
    }
    ball.draw();
    paddle.draw();
    drawBlocks();
    requestAnimationFrame(update);
}

function nextLife() {
    ball.x = centerX;
    ball.y = centerY + 20;
    ball.dx = (Math.random() * 3) + 1;
    ball.dy = (Math.random() * 3) + 1;
    ball.lives -= 1;
    paddle.x = centerX;
}

function gameOver() {

}


// CONTROLS EVENTS
function movePaddle(e) {
    console.log(e.key)
    if (e.key === "ArrowLeft" || e.key === "Left") {
        leftpress = true;
    }
    if (e.key === "ArrowRight" || e.key === "Right") {
        rightpress = true;
    }
}

function stopPaddle(e) {
    console.log(e.key)
    if (e.key === "ArrowLeft" || e.key === "Left") {
        leftpress = false;
    }
    if (e.key === "ArrowRight" || e.key === "Right") {
        rightpress = false;
    }
}

window.addEventListener("keydown", movePaddle);
window.addEventListener("keyup", stopPaddle)

update();