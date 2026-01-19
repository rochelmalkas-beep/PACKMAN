window.addEventListener('load', () => {
    initCarousel();
});

function initCarousel() {
    const grid = document.getElementById('gamesGrid');
    const cards = document.querySelectorAll('.game-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (!grid || cards.length === 0) return;

    // Start with the middle card (Index 1)
    let currentIndex = 1; 

    function updateCarousel() {
        // --- 1. MEASURE (Dynamic) ---
        // We measure the card width on the fly so CSS changes don't break JS
        const sampleCard = cards[0];
        const style = window.getComputedStyle(sampleCard);
        const cardWidth = sampleCard.offsetWidth;
        const marginLeft = parseFloat(style.marginLeft) || 0;
        const marginRight = parseFloat(style.marginRight) || 0;
        
        // Full width used for movement math
        const fullCardWidth = cardWidth + marginLeft + marginRight;

        // --- 2. UPDATE VISUALS ---
        cards.forEach((card, index) => {
            const video = card.querySelector('video');
            
            if (index === currentIndex) {
                // ACTIVE (Middle)
                card.classList.add('active');
                if (video) video.play().catch(() => {}); 
            } else {
                // SIDES
                card.classList.remove('active');
                if (video) {
                    video.pause();
                    video.currentTime = 0;
                }
            }
        });

        // --- 3. PIVOT MATH ---
        // Pivot around Index 1.
        // If Index is 1, move 0.
        // If Index is 0, move +Width.
        // If Index is 2, move -Width.
        const pivotIndex = 1; 
        const offset = (pivotIndex - currentIndex) * fullCardWidth;

        grid.style.transform = `translateX(${offset}px)`;
    }

    // --- 4. CLICKS ---
    cards.forEach((card, index) => {
        card.addEventListener('click', (e) => {
            if (currentIndex !== index) {
                e.preventDefault(); 
                currentIndex = index;
                updateCarousel();
            }
        });

        // Hover Video
        const video = card.querySelector('video');
        if (video) {
            card.addEventListener('mouseenter', () => {
                video.play().catch(() => {});
            });
            card.addEventListener('mouseleave', () => {
                if (!card.classList.contains('active')) {
                    video.pause();
                    video.currentTime = 0;
                }
            });
        }
    });

    // --- 5. BUTTONS ---
    nextBtn.onclick = () => {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    };

    prevBtn.onclick = () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    };

    // Run immediately
    updateCarousel();
    window.addEventListener('resize', updateCarousel);
}