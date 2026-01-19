const width = 24; 
const height = 19; 
let squares = []; 
let pacmanCurrentIndex = 0;
let score = 0; 
let timerId = NaN; 
let currentDirection = null;
let lives = 3;
const livesDisplay = document.getElementById('lives-val');
const gameOverModal = document.getElementById('game-over-modal');
const finalScoreSpan = document.getElementById('final-score');
const scoreDisplay = document.getElementById('score-val'); 
let gameStarted = false; 
const grid = document.querySelector('#game-board');
const startMessage = document.getElementById('start-message');
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
    1,0,0,0,0,0,0,1,1,1,3,3,3,3,1,0,0,0,0,0,1,1,1,1,
    1,0,0,0,0,0,0,0,1,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,
    1,1,1,1,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,0,0,0,1,1,1,0,0,1,
    0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,
    1,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,0,0,1,1,
    1,0,0,0,0,1,1,0,1,0,1,0,0,1,1,1,1,1,0,1,0,0,0,1,
    1,0,0,1,1,1,0,0,1,0,1,0,0,1,0,0,0,1,0,1,1,1,0,1,
    1,0,1,1,0,0,0,0,1,0,0,0,2,0,0,0,0,1,1,1,0,0,0,1, 
    1,1,0,0,0,1,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1 
];
pacmanCurrentIndex = gameBoard.indexOf(2)
pacmanStartIndex = pacmanCurrentIndex;
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

class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className; 
        this.startIndex = startIndex;
        this.speed = speed;
        this.currentIndex = startIndex;
        this.timerId = NaN; 
        this.direction = 1; 
    }
}
const ghosts = [
    new Ghost('blinky', 226, 250,1),
    new Ghost('pinky', 227, 400,1),
    new Ghost('inky', 228, 300,1),  
    new Ghost('clyde', 229, 500,1)  
];
ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className);
    squares[ghost.currentIndex].classList.add('ghost');
});

document.addEventListener('keydown', function(event) {
    
if (!gameStarted && event.code === 'Space'&& lives > 0) {
        gameStarted = true;
        startMessage.style.display = 'none';
        
        currentDirection = 'ArrowRight';
        timerId = setInterval(movePacman, 200);

        ghosts.forEach(ghost => {
            ghost.timerId = setInterval(moveGhost, ghost.speed, ghost);
        });
    }
    
    if(gameStarted && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.code))
    {
        event.preventDefault();
       currentDirection = event.code;
    }

    });

function movePacman(){
    if(!gameStarted || !currentDirection)
        return;
    let nextIndex = pacmanCurrentIndex;
    let Vjump = (height-1)*width;
    switch(currentDirection){
        case 'ArrowLeft':
            if (pacmanCurrentIndex % width === 0)
                nextIndex = pacmanCurrentIndex+(width-1);
            else nextIndex = pacmanCurrentIndex-1;
            break;
        case 'ArrowRight':
             if (pacmanCurrentIndex % width === width - 1)
                nextIndex = pacmanCurrentIndex-(width-1);
            else nextIndex = pacmanCurrentIndex + 1;
            break;
        case 'ArrowUp':
            if (pacmanCurrentIndex - width < 0) {
                nextIndex = pacmanCurrentIndex + Vjump; 
            } else {
                nextIndex = pacmanCurrentIndex - width;
            }
            break;

        case 'ArrowDown':
            if (pacmanCurrentIndex + width >= width * 19) {
                nextIndex = pacmanCurrentIndex - Vjump; 
            } else {
                nextIndex = pacmanCurrentIndex + width;
            }
            break;
        }
    if (squares[nextIndex].classList.contains('wall'))
        return;
    squares[pacmanCurrentIndex].classList.remove('pacman');
    pacmanCurrentIndex=nextIndex;
    squares[pacmanCurrentIndex].classList.add('pacman');
    squares[pacmanCurrentIndex].style.transform = getRotation(currentDirection);
    pacDotEaten();
    checkForGameOver();
}

function pacDotEaten(){
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')){
        score++;
        scoreDisplay.innerHTML = score; 
        squares[pacmanCurrentIndex].classList.remove('pac-dot');
    }
}

function getRotation (direction){
    if (direction === 'ArrowRight') return 'rotate(0deg)';
    if (direction === 'ArrowLeft') return 'scaleX(-1)'; 
    if (direction === 'ArrowUp') return 'rotate(270deg)';
    if (direction === 'ArrowDown') return 'rotate(90deg)';
    return 'rotate(0deg)';
}
function moveGhost(ghost) {
    const directions = [-1, +1, width, -width];
    
    let direction = ghost.direction;

    const isBlocked = squares[ghost.currentIndex + direction].classList.contains('wall') ||
                      squares[ghost.currentIndex + direction].classList.contains('ghost');

    if (!isBlocked) {        
        squares[ghost.currentIndex].classList.remove(ghost.className);
        squares[ghost.currentIndex].classList.remove('ghost');
        
        ghost.currentIndex += direction;
        
        squares[ghost.currentIndex].classList.add(ghost.className);
        squares[ghost.currentIndex].classList.add('ghost');
        checkForGameOver();
        
    } else {
        ghost.direction = directions[Math.floor(Math.random() * directions.length)];
    }
}
function checkForGameOver() {
    if (squares[pacmanCurrentIndex].classList.contains('ghost')) {
        squares[pacmanCurrentIndex].classList.remove('pacman');
        clearInterval(timerId);
        ghosts.forEach(ghost => clearInterval(ghost.timerId));
        
        lives--;
        livesDisplay.innerHTML = lives;

        if (lives === 0) {
            gameStarted = false;
            finalScoreSpan.innerHTML = score;
            gameOverModal.style.display = 'block'; 
            
        } else {
            gameStarted = false;
            startMessage.style.display = 'block'; 
            startMessage.innerHTML = "OUCH! Press SPACE to continue";
            
            resetCharacters();
        }
    }
}
function resetCharacters() {
    squares[pacmanCurrentIndex].classList.remove('pacman');
    squares[pacmanCurrentIndex].style.transform = 'rotate(0deg)';
    
    pacmanCurrentIndex = pacmanStartIndex;
    squares[pacmanCurrentIndex].classList.add('pacman');
    currentDirection = null; 

    ghosts.forEach(ghost => {
        squares[ghost.currentIndex].classList.remove(ghost.className);
        squares[ghost.currentIndex].classList.remove('ghost');

        clearInterval(ghost.timerId);
        ghost.currentIndex = ghost.startIndex;
        ghost.direction = 1; 
        squares[ghost.currentIndex].classList.add(ghost.className);
        squares[ghost.currentIndex].classList.add('ghost');
    });
}