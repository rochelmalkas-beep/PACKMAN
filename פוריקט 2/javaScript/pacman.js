const width = 24; // רוחב הלוח
let squares = [];
let pacmanCurrentIndex = 0;
pacmanCurrentIndex = gameBoard.indexOf(2)
const grid = document.querySelector('#game-board');
const startMessage = document.getElementById('start-message');
let gameStarted = false; 
const gameBoard = [
    1,1,1,1,1,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,1,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,1,0,1,1,1,0,0,0,1,0,1,1,0,0,0,1,
    1,1,1,0,0,1,1,1,1,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,
    1,0,1,0,0,1,0,0,0,0,1,0,0,1,1,1,1,0,0,0,1,0,0,1,
    1,0,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,1,0,0,1,
    1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,1,1,
    1,1,1,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,
    1,0,0,0,0,0,0,1,1,1,1,3,3,3,1,0,0,0,0,0,1,1,1,1,
    1,0,0,0,0,0,0,0,1,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,
    1,1,1,1,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,0,0,0,1,1,1,0,0,1,
    0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,
    1,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,0,0,1,1,
    1,0,0,0,0,1,1,0,1,0,1,0,0,1,1,1,1,1,0,1,0,0,0,1,
    1,0,0,1,1,1,0,0,1,0,1,0,0,1,0,0,0,1,0,1,1,1,0,1,
    1,0,1,1,0,0,0,0,1,0,1,0,2,1,0,0,0,1,1,1,0,0,0,1, 
    1,1,0,0,0,1,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1 
];
function createBoard(){
    for(let i=0;i<gameBoard.length;i++){
        const square=document.createElement("div");
        grid.appendChild(square);
        squares.push(square);
        square.classList.add('square');
        if(gameBoard[i]===0)
            square.classList.add("pac-dot");
         else if(gameBoard[i]===1)
            square.classList.add("wall");   
        else if(gameBoard[i]===2)
            square.classList.add("pacman");
           else if(gameBoard[i]===3)
            square.classList.add("ghost");

    }
}
createBoard();

document.addEventListener('keydown', function(event) {
    
    if (!gameStarted && event.code === 'Space') {
        
        gameStarted = true;
        
        startMessage.style.display = 'none';
        // startGame(); <-- פונקציה שנוסיף בעתיד
    }
});