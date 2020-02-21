const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

const ball = {
    x: 100,
    y: 100,
    r: 5,
    dx: 5,
    dy: 4,
    draw: () => {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2, true);
        ctx.fillStyle = "blue";
        ctx.fill()
    },
};

const paddle = {
    x: centerX,
    y: canvas.height - 15,
    h: 15,
    w: 60,
    speed: 5,
    dx: 0,
    dy: 0,
    draw: () => {
        ctx.fillStyle = "black";
        ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h)
    },
};

const block = {
    x: centerX,
    y: centerY,
    h: 30,
    w: 60,
    draw: () => {
        ctx.fillStyle = "red";
        ctx.fillRect(block.x, block.y, block.w, block.h);
    },
}


function update() {
    ctx.clearRect(0,0,canvas.width, canvas.height);

    requestAnimationFrame();
}



block.draw();
paddle.draw();
ball.draw();