// קובץ: javaScript/soundFunctions.js

function playSound(soundObj) {
    // בדיקת תקינות: אם לא שלחו סאונד, לא עושים כלום
    if (!soundObj) return;

    // 1. מחזירים להתחלה (למקרה שהוא כבר מתנגן)
    soundObj.currentTime = 0;
    
    // 2. מנגנים (עם הגנה משגיאות דפדפן)
    soundObj.play().catch(error => console.log("Audio Error:", error));
}

function stopSound(soundObj) {
    if (!soundObj) return;
    soundObj.pause();
    soundObj.currentTime = 0;
}