document.addEventListener('DOMContentLoaded', () => {
    const gameCards = document.querySelectorAll('.game-card');

    gameCards.forEach(card => {
        const video = card.querySelector('.card-video');
        
        if (video) {
            card.addEventListener('mouseenter', () => {
                video.play();
            });

            card.addEventListener('mouseleave', () => {
                video.pause();
                // video.currentTime = 0; // Optional: Reset to beginning
            });
        }
    });
});