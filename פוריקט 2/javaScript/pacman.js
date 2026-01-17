const width = 24; // רוחב הלוח
const height = 19; //גובה
let squares = []; // מחזיק את הריבועים
let pacmanCurrentIndex = 0; //מיקום נוחכי
let score = 0; //ניקוד
let timerId = NaN; //זמן
let currentDirection = null; //כיוון נוכחי
const scoreDisplay = document.getElementById('score-val'); //תצוגת ניקוד
let gameStarted = false; //האם המשחק התחיל
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
        this.className = className; // השם (blinky, pinky...)
        this.startIndex = startIndex; // איפה היא מתחילה
        this.speed = speed; // מהירות
        this.currentIndex = startIndex; // איפה היא כרגע
        this.timerId = NaN; // השעון הפרטי שלה
    }
}const ghosts = [
    new Ghost('blinky', 227, 250), // אדומה
    new Ghost('pinky', 228, 400),  // ורודה
    new Ghost('inky', 229, 300),   // כחולה
    new Ghost('clyde', 230, 500)   // כתומה
];// ציור ראשוני של הרוחות
ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className);
    squares[ghost.currentIndex].classList.add('ghost');
});

document.addEventListener('keydown', function(event) {
    
    if (!gameStarted && event.code === 'Space') {
        
        gameStarted = true;
        startMessage.style.display = 'none';
      
        currentDirection = 'ArrowRight';
        timerId = setInterval(movePacman, 200);
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