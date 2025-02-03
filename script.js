document.addEventListener("DOMContentLoaded", () => {
    const Gamearena = document.getElementById("Game-arena");
    const arenaSize = 600;
    const cellSize = 20;
    let score = 0;
    let gameStarted = false;
    let food = { x: 300, y: 200 };
    let snake = [{ x: 160, y: 200 }, { x: 140, y: 200 }, { x: 120, y: 200 }];
    let dx = cellSize;
    let dy = 0;
    let gameInterval;

    function drawScoreboard() {
        document.getElementById("score-board").textContent = `Score: ${score}`;
    }

    function drawDiv(x, y, className) {
        const div = document.createElement("div");
        div.className = className;
        div.style.left = `${x}px`;
        div.style.top = `${y}px`;
        div.style.width = `${cellSize}px`;
        div.style.height = `${cellSize}px`;
        return div;
    }

    function drawFoodandSnake() {
        Gamearena.innerHTML = "";
        snake.forEach((snakecell) => {
            Gamearena.appendChild(drawDiv(snakecell.x, snakecell.y, "snake"));
        });
        Gamearena.appendChild(drawDiv(food.x, food.y, "food"));
    }

    function movefood() {
        let newX, newY;
        do {
            newX = Math.floor(Math.random() * ((arenaSize - cellSize) / cellSize)) * cellSize;
            newY = Math.floor(Math.random() * ((arenaSize - cellSize) / cellSize)) * cellSize;
        } while (snake.some((cell) => cell.x === newX && cell.y === newY));
        food = { x: newX, y: newY };
    }

    function updateSnake() {
        const newHead = { x: snake[0].x + dx, y: snake[0].y + dy };
        snake.unshift(newHead);
        if (newHead.x === food.x && newHead.y === food.y) {
            score += 10;
            movefood();
        } else {
            snake.pop();
        }
    }

    function isGameOver() {
        for (let i = 1; i < snake.length; i++) {
            if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
                return true;
            }
        }

        return (
            snake[0].x < 0 ||
            snake[0].x >= arenaSize ||
            snake[0].y < 0 ||
            snake[0].y >= arenaSize
        );
    }

    function gameLoop() {
        if (!gameInterval) {
            gameInterval = setInterval(() => {
                if (!gameStarted) return;
                if (isGameOver()) {
                    gameStarted = false;
                    clearInterval(gameInterval);
                    alert(`Game Over, Score = ${score}`);
                    window.location.reload();
                    return;
                }
                updateSnake();
                drawScoreboard();
                drawFoodandSnake();
            }, 200);
        }
    }

    function changeDirection(e) {
        const LEFT_KEY = 37, RIGHT_KEY = 39, UP_KEY = 38, DOWN_KEY = 40;
        const keyPressed = e.keyCode;

        if (keyPressed === LEFT_KEY && dx === 0) {
            dx = -cellSize;
            dy = 0;
        } else if (keyPressed === RIGHT_KEY && dx === 0) {
            dx = cellSize;
            dy = 0;
        } else if (keyPressed === UP_KEY && dy === 0) {
            dx = 0;
            dy = -cellSize;
        } else if (keyPressed === DOWN_KEY && dy === 0) {
            dx = 0;
            dy = cellSize;
        }
    }

    function runGame() {
        if (!gameStarted) {
            gameStarted = true;
            gameLoop();
        }
    }

    function initiateGame() {
        const scoreBoard = document.createElement("div");
        scoreBoard.id = "score-board";
        document.body.insertBefore(scoreBoard, Gamearena);

        const startbutton = document.createElement("button");
        startbutton.id = "start-button";
        startbutton.textContent = "Start Game";
        startbutton.classList.add("start-button");
        document.body.appendChild(startbutton);

        startbutton.addEventListener("click", () => {
            startbutton.style.display = "none";
            runGame();
        });
    }

    document.addEventListener("keydown", changeDirection);
    initiateGame();
});
