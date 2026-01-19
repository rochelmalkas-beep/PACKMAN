function checkSecurity() {
    const path = window.location.pathname.toLowerCase();
    const user = localStorage.getItem('currentUser');
    
    // Determine if we are on a "Public" page (Login/Register)
    const isPublicPage = path.includes('login') || path.includes('main') || path === '/' || path.endsWith('index.html');

    // SCENARIO A: On a public page but still have a "User" session (Back Button hit)
    if (isPublicPage && user) {
        console.log("Security Trace: Back button detected. Clearing session.");
        localStorage.removeItem('currentUser');
        // No redirect needed, they are already on the login page
    }

    // SCENARIO B: On a private page (Game/Selection) with NO session
    if (!isPublicPage && !user) {
        console.log("Security Trace: No user found. Redirecting to login.");
        window.location.href = 'login.html';
    }
}

// 1. Run immediately when script loads
checkSecurity();

// 2. Run when the page is fully shown (handles cache)
window.addEventListener('pageshow', checkSecurity);

// 3. THE "PRO" BACKUP: Check every 500ms 
// This catches back-button issues that events sometimes miss
setInterval(checkSecurity, 500);

// 4. Setup UI elements that only exist after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if(confirm("Are you sure you want to quit?")) {
                localStorage.removeItem('currentUser');
                window.location.href = 'login.html';
            }
        });
    }

    // Update username display
    const nameDisplay = document.getElementById('user-name-display');
    const user = localStorage.getItem('currentUser');
    if (nameDisplay && user) {
        nameDisplay.textContent = JSON.parse(user).username;
    }
});