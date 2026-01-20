// קובץ: javaScript/SoundData.js
class SoundData {
    constructor() {
        // טוענים את כל הסאונדים לזיכרון מראש
        this.munch = new Audio('../sound/one.mp3'); 
        this.death = new Audio('../sound/two.mp3');
        this.win = new Audio('../sound/three.mp3');
        
        // הגדרות אופציונליות (למשל ווליום חלש יותר לאכילה)
        this.munch.volume = 0.5;
    }
}