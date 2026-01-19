const width = 24; // רוחב הלוח
const height = 19; //גובה
let squares = []; // מחזיק את הריבועים
let pacmanCurrentIndex = 0;
let score = 0; //ניקוד
let timerId = NaN; //זמן
let currentDirection = null; //כיוון נוכחי
let lives = 3; // חיים
const livesDisplay = document.getElementById('lives-val');
const gameOverModal = document.getElementById('game-over-modal');
const finalScoreSpan = document.getElementById('final-score');
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
    1,1,1,0,0,0,0,0,0,1,0,0,0,0,1,1,1,1,0,0,1,1,0,1,
    1,0,0,0,0,0,0,1,1,1,3,3,3,3,1,0,0,0,0,0,1,1,1,1,
    1,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,0,0,0,0,0,1,1,
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
        this.className = className; // השם (blinky, pinky...)
        this.startIndex = startIndex; // איפה היא מתחילה
        this.speed = speed; // מהירות
        this.currentIndex = startIndex; // איפה היא כרגע
        this.timerId = NaN; // השעון הפרטי שלה
        this.direction = 1; // 1 = התחלה ימינה (ברירת מחדל)
    }
}
const ghosts = [
    new Ghost('blinky', 226, 250,1), // היה 227 -> זז ל-226
    new Ghost('pinky', 227, 400,1),  // היה 228 -> זז ל-227
    new Ghost('inky', 228, 300,1),   // היה 229 -> זז ל-228
    new Ghost('clyde', 229, 500,1)   // היה 230 (קיר!) -> זז ל-229
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

        // --- השיטה החדשה והנקייה ---
        ghosts.forEach(ghost => {
            // אנחנו שולחים את moveGhost כפונקציה, ואת ghost כארגומנט שיכנס אליה
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
    // הגדרת אפשרויות התנועה
    const directions = [-1, +1, width, -width];
    
    // חישוב הכיוון המיועד
    // שימי לב: אנחנו משתמשים ב-ghost.direction שנשמר בזיכרון של הרוח
    let direction = ghost.direction;

    // בדיקה: האם אפשר להמשיך בכיוון הנוכחי?
    // התנאי: אין קיר ואין רוח אחרת במשבצת הבאה
    const isBlocked = squares[ghost.currentIndex + direction].classList.contains('wall') ||
                      squares[ghost.currentIndex + direction].classList.contains('ghost');

    if (!isBlocked) {
        // --- הדרך פנויה: זזים ---
        
        // 1. הסרה מהמקום הישן
        squares[ghost.currentIndex].classList.remove(ghost.className);
        squares[ghost.currentIndex].classList.remove('ghost');
        
        // 2. עדכון המיקום בזיכרון
        ghost.currentIndex += direction;
        
        // 3. ציור במקום החדש
        squares[ghost.currentIndex].classList.add(ghost.className);
        squares[ghost.currentIndex].classList.add('ghost');
        checkForGameOver();
        
    } else {
        // --- הדרך חסומה: מחליפים כיוון ---
        // לא זזים בסיבוב הזה, רק מעדכנים את הכיוון לפעם הבאה
        ghost.direction = directions[Math.floor(Math.random() * directions.length)];
    }
}
function checkForGameOver() {
    if (squares[pacmanCurrentIndex].classList.contains('ghost')) {
        squares[pacmanCurrentIndex].classList.remove('pacman');
        // 1. עצירת כל השעונים מיד
        clearInterval(timerId);
        ghosts.forEach(ghost => clearInterval(ghost.timerId));
        
        // 2. הורדת חיים
        lives--;
        livesDisplay.innerHTML = lives;

        // 3. בדיקה: האם נגמר המשחק?
        if (lives === 0) {
            // --- GAME OVER אמיתי ---
            gameStarted = false;
            // הצגת החלון המעוצב
            finalScoreSpan.innerHTML = score;
            gameOverModal.style.display = 'block'; 
            
        } else {
            // --- איבוד חיים בלבד (Reset) ---
            gameStarted = false;
            startMessage.style.display = 'block'; // מראה שוב את "לחץ רווח"
            startMessage.innerHTML = "OUCH! Press SPACE to continue";
            
            // החזרת השחקנים למקום
            resetCharacters();
        }
    }
}
function resetCharacters() {
    // 1. מחיקת פקמן מהמיקום הנוכחי
    squares[pacmanCurrentIndex].classList.remove('pacman');
    squares[pacmanCurrentIndex].style.transform = 'rotate(0deg)';
    
    // 2. החזרת פקמן להתחלה
    pacmanCurrentIndex = pacmanStartIndex;
    squares[pacmanCurrentIndex].classList.add('pacman');
    currentDirection = null; // איפוס כיוון

    // 3. איפוס רוחות
    ghosts.forEach(ghost => {
        // מחיקה מהמיקום הנוכחי
        squares[ghost.currentIndex].classList.remove(ghost.className);
        squares[ghost.currentIndex].classList.remove('ghost');
        
        // עצירת הטיימר שלו (חשוב!)
        clearInterval(ghost.timerId);

        // החזרה לבית
        ghost.currentIndex = ghost.startIndex;
        ghost.direction = 1; // איפוס כיוון הרוח
        
        // ציור מחדש בבית
        squares[ghost.currentIndex].classList.add(ghost.className);
        squares[ghost.currentIndex].classList.add('ghost');
    });
}