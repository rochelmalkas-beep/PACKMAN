
/**
 * הפונקציה הראשית של דף הספרייה.
 * היא מופרדת מה-EventListener כדי להיות מסודרת.
 */
function initializeLibraryPage() {
    // 1. קריאה לפונקציה מהקובץ השני כדי לקבל את המשתמש
    const user = checkSecurity();

    // 2. אם חזר משתמש (כלומר אנחנו מחוברים), נעדכן את המסך
    if (user) {
        const nameSpan = document.getElementById('user-name-display');
        if (nameSpan) {
            nameSpan.innerText = user.username;
        }

        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            // חיבור הכפתור לפונקציית ה-logout מהקובץ השני
            logoutBtn.onclick = logout;
        }
    }
}

// הרצת הפונקציה רק כשהדף סיים להיטען
document.addEventListener('DOMContentLoaded', initializeLibraryPage);