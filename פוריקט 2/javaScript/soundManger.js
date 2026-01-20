function playSound(soundObj) {
    if (!soundObj) return;
    soundObj.currentTime = 0;
    soundObj.play().catch(error => console.log("Audio Error:", error));
}

function stopSound(soundObj) {
    if (!soundObj) return;
    soundObj.pause();
    soundObj.currentTime = 0;
}