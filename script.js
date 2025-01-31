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



    function startGame(){
        const scoreboard = document.createElement('div');
        scoreboard.id = 'score-board';
        scoreboard.textContent = '10';
        document.body.insertBefore(scoreboard,Gamearena);

    }
    

    startGame();





});