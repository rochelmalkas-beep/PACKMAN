document.addEventListener('DOMContentLoaded', () => {
    // 1. בדיקה אם המשתמש בכלל מחובר (אבטחה)
    const currentUserJSON = localStorage.getItem('currentUser');
    // אם אין משתמש מחובר - זרוק אותו חזרה לדף הכניסה
    if (!currentUserJSON) {
        window.location.href = '../html/main.html';
        return;
    }
    // 2. המרה חזרה לאובייקט כדי שנוכל לקרוא את השם
    const currentUser = JSON.parse(currentUserJSON);
    // 3. הצגת השם בברכה
    const userNameElement = document.getElementById('user-name-display');
    if (userNameElement) {
        userNameElement.textContent = currentUser.username;
    }
    // 4. טיפול בכפתור יציאה (החץ)
    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn.addEventListener('click', () => {
        // מחיקת המשתמש המחובר מהזיכרון הספציפי
        localStorage.removeItem('currentUser');
        // מעבר לעמוד הכניסה
        window.location.href = '../html/main.html';
    });
});