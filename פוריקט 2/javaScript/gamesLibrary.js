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
const grid = document.getElementById('gamesGrid');
const cards = document.querySelectorAll('.game-card');
let currentIndex = 1; // Start with the second card (index 1) as middle

function updateCarousel() {
    cards.forEach((card, index) => {
        card.classList.remove('active');
        const video = card.querySelector('video');
        
        if (index === currentIndex) {
            card.classList.add('active');
            if (video) video.play(); // Auto-play the focused video
        } else {
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        }
    });

    // Calculate the offset to keep the active card in the dead center
    const viewportWidth = grid.parentElement.offsetWidth;
    const cardWidth = cards[0].offsetWidth + 25; // width + gap
    const offset = (viewportWidth / 2) - (cardWidth / 2) - (currentIndex * cardWidth);
    
    grid.style.transform = `translateX(${offset}px)`;
}

// Button Listeners
document.getElementById('nextBtn').onclick = () => {
    if (currentIndex < cards.length - 1) {
        currentIndex++;
        updateCarousel();
    }
};

document.getElementById('prevBtn').onclick = () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
};

// Initialize on load
window.addEventListener('load', updateCarousel);