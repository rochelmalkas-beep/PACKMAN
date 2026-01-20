class SoundData {
    constructor() {
        this.munch = new Audio('../assets/sound/eating.mp3');
        this.death = new Audio('../assets/sound/die.mp3');
        this.win = new Audio('../assets/sound/win.mp3');
        this.lost = new Audio('../assets/sound/lost.mp3');

        this.munch.volume = 0.5;
    }
}