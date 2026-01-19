
function checkSecurity() {
    if (window.location.pathname.includes('login.html')) {
        return;
    }
    const user = localStorage.getItem('currentUser');
    if (!user) {
        window.location.replace('../html/login.html'); 
    }
};
checkSecurity();
// 2. פונקציות שקורות כשהדף נטען
document.addEventListener('DOMContentLoaded', function() {
    
    // א. הצגת שם המשתמש (אם האלמנט קיים בדף)
    displayUserName();

    // ב. טיפול בכפתור התנתקות
    handleLogout();

    // ג. מניעת חזרה אחורה בדפדפן (אופציונלי, לאבטחה מחמירה)
    preventBackNavigation();
});

// --- פונקציות עזר ---

function displayUserName() {
    // מנסה למצוא את האלמנט של השם (השתמשתי ב-ID שיש לך ב-games.html)
    // שימי לב: ב-HTML שלך כתוב id="user-name-display"
    const nameSpan = document.getElementById('user-name-display') || document.getElementById('player-name-display');
    
    const currentUserData = localStorage.getItem('currentUser');

    if (nameSpan && currentUserData) {
        try {
            const userObj = JSON.parse(currentUserData);
            // מציג את השם מתוך האובייקט או את המחרוזת עצמה
            nameSpan.innerText = ' ' + (userObj.username || userObj.name || userObj) + ' '; 
        } catch (e) {
            nameSpan.innerText = ' ' + currentUserData + ' ';
        }
    }
}

function handleLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('currentUser');
            window.location.replace('../html/login.html');
        });
    }
}

function preventBackNavigation() {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
        window.history.pushState(null, null, window.location.href);
    };
}