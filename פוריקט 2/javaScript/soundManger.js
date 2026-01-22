function playSound(soundObj) {
    soundObj.currentTime = 0;
    soundObj.play();
}

function stopSound(soundObj) {
    soundObj.pause();
    soundObj.currentTime = 0;
}