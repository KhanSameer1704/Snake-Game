const Gamearena = document.getElementById("Game-arena");
const arenaSize = 600;
const cellSize = 20;
let score = 0;
let gameStarted = false;
let food = {x: 300, y: 200};
let snake = [{x: 160, y: 200}, {x: 140, y: 200}, {x: 120, y: 200}];
let dx = cellSize; // displacement on x-axis
let dy = 0; // displacement on y-axis

function drawScoreboard() {
    const Scoreboard = document.getElementById('score-board');
    Scoreboard.textContent = `Score : ${score}`;
}

function drawSnake() {
    Gamearena.innerHTML = ''; // Clear the game arena
    snake.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.left = `${segment.x}px`;
        snakeElement.style.top = `${segment.y}px`;
        snakeElement.classList.add('snake');
        Gamearena.appendChild(snakeElement);
    });
}

function drawFood() {
    const foodElement = document.createElement('div');
    foodElement.style.left = `${food.x}px`;
    foodElement.style.top = `${food.y}px`;
    foodElement.classList.add('food');
    Gamearena.appendChild(foodElement);
}

function moveSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        generateFood();
    } else {
        snake.pop();
    }
}

function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;
    const goingUp = dy === -cellSize;
    const goingDown = dy === cellSize;
    const goingRight = dx === cellSize;
    const goingLeft = dx === -cellSize;

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -cellSize;
        dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -cellSize;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = cellSize;
        dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = cellSize;
    }
}

function checkCollision() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x >= arenaSize;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y >= arenaSize;

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}

function generateFood() {
    food.x = Math.floor(Math.random() * (arenaSize / cellSize)) * cellSize;
    food.y = Math.floor(Math.random() * (arenaSize / cellSize)) * cellSize;
}

function gameLoop() {
    if (checkCollision()) {
        alert('Game Over');
        document.location.reload();
        return;
    }
    setTimeout(() => {
        drawScoreboard();
        moveSnake();
        drawSnake();
        drawFood();
        gameLoop();
    }, 100);
}

document.addEventListener('keydown', changeDirection);

function runGame() {
    gameStarted = true;
    generateFood();
    gameLoop();
}