/**
 * SECURITY GUARD: Unified Check
 */
function enforceSecurity() {
    // 1. Get the page type from the body tag (more reliable than URL)
    const pageType = document.body.getAttribute('data-page-type');
    const user = localStorage.getItem('currentUser');

    // SCENARIO: LANDED ON LOGIN BUT USER STILL EXISTS (BACK BUTTON CASE)
    if (pageType === 'public' && user) {
        console.warn("Security: Session detected on public page. Clearing.");
        localStorage.removeItem('currentUser');
    }

    // SCENARIO: ON GAME PAGE BUT NO USER
    if (pageType === 'private' && !user) {
        console.error("Security: Access Denied. Redirecting...");
        window.location.href = 'login.html';
    }
}

// CRITICAL: Run every time the page is shown (even from back button cache)
window.addEventListener('pageshow', enforceSecurity);

// SECONDARY: Run on normal load
document.addEventListener('DOMContentLoaded', () => {
    enforceSecurity();

    // Setup Logout Button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.onclick = () => {
            if (confirm("האם אתה בטוח שברצונך להתנתק?")) {
                localStorage.removeItem('currentUser');
                window.location.href = 'login.html';
            }
        };
    }
});