/**
 * THE ULTIMATE CACHE-BREAKER SECURITY
 */
function syncUserState() {
    const userJSON = localStorage.getItem('currentUser');
    const nameDisplay = document.getElementById('user-name-display');
    const path = window.location.pathname.toLowerCase();
    
    // 1. PATH PROTECTION: Identify if we are on the entry/login pages
    const isPublicPage = path.includes('login.html') || path.includes('main.html') || path.endsWith('/');

    // 2. SECURITY CHECK: If on a game page but the "User" is gone (Back Button case)
    if (!isPublicPage && !userJSON) {
        console.warn("Security: Cached session detected with no user. Redirecting...");
        window.location.replace('login.html'); // Force move to login
        return;
    }

    // 3. NAME SYNC: If we have a name on screen, ensure it matches the CURRENT storage
    if (nameDisplay) {
        if (userJSON) {
            const userData = JSON.parse(userJSON);
            // Overwrite whatever was there (prevents seeing the old name)
            nameDisplay.textContent = userData.username; 
        } else {
            // If no user exists, clear the name immediately
            nameDisplay.textContent = ""; 
        }
    }
}

// CRITICAL: Listen to 'pageshow' to catch the browser when it "wakes up" from a Back-Button-Click
window.addEventListener('pageshow', (event) => {
    // Force a full clean-up every time the page appears
    syncUserState();
});

// Setup UI elements on Load
document.addEventListener('DOMContentLoaded', () => {
    syncUserState();

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.onclick = () => {
            if (confirm("האם אתה בטוח שברצונך להתנתק?")) {
                localStorage.removeItem('currentUser');
                window.location.replace('login.html');
            }
        };
    }
});