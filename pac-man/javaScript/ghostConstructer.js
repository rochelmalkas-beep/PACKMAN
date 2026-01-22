class Ghost {
    constructor(className, startIndex, speed, movementLogic) {
        this.className = className;
        this.startIndex = startIndex;
        this.speed = speed;
        this.currentIndex = startIndex;
        this.timerId = NaN;
        this.direction = 1;
        this.movementLogic = movementLogic;
    }
}
