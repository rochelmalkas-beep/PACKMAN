const width = 24;
const height = 19;

const gameBoard = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
  1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1,
  1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 4, 4, 4, 4, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 4, 4, 4, 4, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1,
  1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
  1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1,
  1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
];

pacmanCurrentIndex = gameBoard.indexOf(2)
const squares = [];
const pacmanStartIndex = pacmanCurrentIndex;
let timerId = NaN;
let food = 0;
let score = 0;
let lives = 3;
let currentDirection = null;
let gameStarted = false;
const grid = document.querySelector('#game-board');
const scoreDisplay = document.getElementById('score-val');
const livesDisplay = document.getElementById('lives-val');
const startMessage = document.getElementById('start-message');
const gameOverModal = document.getElementById('game-over-modal');
const finalScoreSpan = document.getElementById('final-score');
const modalBtn = document.querySelector('#game-over-modal button');
const modalTitle = document.querySelector('#game-over-modal h1');
const scoreContainer = document.getElementById('final-score');
const ghosts = [
    new Ghost('blinky', 226, 250, chaseMovement),
    new Ghost('pinky', 227, 400, randomMovement),
    new Ghost('inky', 228, 300, randomMovement),
    new Ghost('clyde', 229, 500, randomMovement)
];
const gameSounds = new SoundData();

function inIt() {
    createBoard();
    document.addEventListener('keydown', startGame);
    ghosts.forEach(ghost => {
        squares[ghost.currentIndex].classList.add(ghost.className);
        squares[ghost.currentIndex].classList.add('ghost');
    });
    showInstructions();
}
function createBoard() {
    for (let i = 0; i < gameBoard.length; i++) {
        const square = document.createElement("div");
        grid.appendChild(square);
        squares.push(square);
        square.classList.add('square');
        square.dataset.index = i;
        if (gameBoard[i] === 0) {
            square.classList.add("pac-dot");
            food++;
        }
        else if (gameBoard[i] === 1) {
            square.classList.add("wall");
        }
        else if (gameBoard[i] === 2) {
            square.classList.add("pacman");
        }
        else if (gameBoard[i] === 3) {
            square.classList.add("ghost");
        }

    }
}
function showInstructions() {
    modalTitle.innerHTML = `
        HOW TO PLAY:<br>
        <span style="font-size: 18px; line-height: 1.5; display:block; margin-top:10px;">
        1. Arrow Keys to Move<br>
        2. Eat all dots to Win<br>
        3. Avoid Ghosts<br>
        4. Space to Start
        </span>
    `;
    if (scoreContainer) {
        scoreContainer.parentElement.style.display = 'none';
    }
    modalBtn.innerHTML = "GOT IT!";
    gameOverModal.classList.add('orange-glow');
    modalBtn.onclick = closeInstructionsModal;
    gameOverModal.style.display = 'block';
}

function closeInstructionsModal() {
    gameOverModal.style.display = 'none';
    gameOverModal.classList.remove('orange-glow');
    const scoreContainer = document.getElementById('final-score');
    if (scoreContainer) {
        scoreContainer.parentElement.style.display = 'block';
    }
}

function reloadGamePage() {
    window.location.reload();
}
function startGame(event) {
    if (gameOverModal.style.display === 'block') {
        return;
    }
    if (!gameStarted && event.code === 'Space' && lives > 0) {
        gameStarted = true;
        startMessage.style.display = 'none';
        currentDirection = 'ArrowRight';
        timerId = setInterval(movePacman, 200);
        ghosts.forEach(ghost => {
            ghost.timerId = setInterval(moveGhost, ghost.speed, ghost);
        });
    }
    if (gameStarted && ['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft'].includes(event.code)) {
        event.preventDefault();
        currentDirection = event.code;
    }
}


function movePacman() {
    if (!gameStarted || !currentDirection) return;
    let nextIndex = pacmanCurrentIndex;
    const Vjump = (height - 1) * width;
    switch (currentDirection) {
        case 'ArrowLeft':
            if (pacmanCurrentIndex % width === 0) {
                nextIndex = pacmanCurrentIndex + (width - 1);
            }
            else nextIndex = pacmanCurrentIndex - 1;
            break;
        case 'ArrowRight':
            if (pacmanCurrentIndex % width === width - 1) {
                nextIndex = pacmanCurrentIndex - (width - 1);
            }
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
    pacmanCurrentIndex = nextIndex;
    squares[pacmanCurrentIndex].classList.add('pacman');
    squares[pacmanCurrentIndex].style.transform = getRotation(currentDirection);
    pacDotEaten();
    checkForGameOver();
}

function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
        score++;
        scoreDisplay.innerHTML = score;
        squares[pacmanCurrentIndex].classList.remove('pac-dot');
        playSound(gameSounds.munch);
    }
    if (score === food) {
        gameWin();
    }
}

function gameWin() {
    gameStarted = false;
    clearInterval(timerId);
    ghosts.forEach(ghost => clearInterval(ghost.timerId));
    document.removeEventListener('keydown', startGame);
    playSound(gameSounds.win);
    modalTitle.innerHTML = "YOU WON!";
    modalBtn.innerHTML = "PLAY AGAIN";
    finalScoreSpan.innerHTML = score;
    gameOverModal.classList.add('game-won-modal');
    modalBtn.onclick = reloadGamePage;
    gameOverModal.style.display = 'block';
}
function checkForGameOver() {
    if (squares[pacmanCurrentIndex].classList.contains('ghost')) {
        squares[pacmanCurrentIndex].classList.remove('pacman');
        clearInterval(timerId);
        ghosts.forEach(ghost => clearInterval(ghost.timerId));
        lives--;
        playSound(gameSounds.lost);
        livesDisplay.innerHTML = lives;
        if (lives === 0) {
            gameStarted = false;
            modalTitle.innerHTML = "GAME OVER!";
            modalBtn.innerHTML = "PLAY AGAIN";
            finalScoreSpan.innerHTML = score;
            playSound(gameSounds.death);
            modalBtn.onclick = reloadGamePage;
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

function randomMovement(ghost) {
    const directions = [-1, +1, width, -width];
    let direction = ghost.direction;
    let nextIndex = ghost.currentIndex + direction;
    if (!squares[nextIndex] ||
        squares[nextIndex].classList.contains('wall') ||
        squares[nextIndex].classList.contains('ghost')) {
        direction = directions[Math.floor(Math.random() * directions.length)];
    }
    return direction;
}
function chaseMovement(ghost) {
    const directions = [-1, +1, width, -width];
    const [pacmanX, pacmanY] = getCoordinates(pacmanCurrentIndex);
    let oppositeDirection = -ghost.direction;
    let bestDirection = null;
    let shortestDistance = Infinity;
    let validMovesCount = 0;
    directions.forEach(dir => {
        const nextMove = ghost.currentIndex + dir;
        if (!squares[nextMove] ||
            squares[nextMove].classList.contains('wall') ||
            squares[nextMove].classList.contains('ghost')) {
            return;
        }
        if (dir === oppositeDirection) {
            return;
        }
        validMovesCount++;
        const [ghostX, ghostY] = getCoordinates(nextMove);
        const distance = Math.abs(ghostX - pacmanX) + Math.abs(ghostY - pacmanY);
        if (distance < shortestDistance) {
            shortestDistance = distance;
            bestDirection = dir;
        }
    });

    if (bestDirection !== null) {
        return bestDirection;
    }
    if (validMovesCount === 0) {
        return oppositeDirection;
    }
    return randomMovement(ghost);
}

function getRotation(direction) {
    if (direction === 'ArrowRight') return 'rotate(0deg)';
    if (direction === 'ArrowLeft') return 'scaleX(-1)';
    if (direction === 'ArrowUp') return 'rotate(270deg)';
    if (direction === 'ArrowDown') return 'rotate(90deg)';
    return 'rotate(0deg)';
}

function getCoordinates(index) {
    return [index % width, Math.floor(index / width)];
}

function moveGhost(ghost) {
    const direction = ghost.movementLogic(ghost);
    ghost.direction = direction;
    const nextIndex = ghost.currentIndex + direction;
    const isBlocked = !squares[nextIndex] ||
        squares[nextIndex].classList.contains('wall') ||
        squares[nextIndex].classList.contains('ghost');
    if (isBlocked) {
        ghost.direction = randomMovement(ghost);
        return;
    }
    squares[ghost.currentIndex].classList.remove(ghost.className);
    squares[ghost.currentIndex].classList.remove('ghost');
    ghost.currentIndex += direction;
    squares[ghost.currentIndex].classList.add(ghost.className);
    squares[ghost.currentIndex].classList.add('ghost');
    checkForGameOver();
}
inIt();
