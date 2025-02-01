document.addEventListener("DOMContentLoaded",()=>{
    const Gamearena = document.getElementById("Game-arena");
    const arenaSize = 600;
    const cellSize = 20;
    let score = 0;
    let gameStarted = false;
    let food = {x: 300, y: 200};
    let snake =[{x: 160 , y: 200},{x: 140 , y: 200},{x: 120 , y: 200}]
    let dx = cellSize; // displacement on x-axis
    let dy = 0; // displacement on y-axis
     
     

    function drawScoreboard(){
        const Scoreboard = document.getElementById('score-board');
        Scoreboard.textcontent = `Score : ${score}`;
    }

    function gameLoop(){
        setInterval(()=>{
            drawScoreboard();
        },1000)
    }


    
    function runGame() {
        gameStarted = true; 
        gameLoop();
    }



    function initiateGame(){
        const scoreboard = document.createElement('div');
        scoreboard.id = 'score-board';
        Scoreboard.textContent = {score};
        document.body.insertBefore(scoreboard,Gamearena);


        const startbutton = document.createElement('button');
        startbutton.id = 'startbutton';
        startbutton.textContent = 'Start-Game';
        startbutton.classList.add('start-button');
        startbutton.addEventListener("click",()=>{
            startbutton.style.display = 'none';
            runGame();
        });
        document.body.appendChild(startbutton);

    }
    

    initiateGame(); //this is the first function to be executed so that we can prepare the UI.





});