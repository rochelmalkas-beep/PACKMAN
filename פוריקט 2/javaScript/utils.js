document.addEventListener('DOMContentLoaded', () => {
    const currentUserJSON = localStorage.getItem('currentUser');
    // אם אין משתמש מחובר - זרוק אותו חזרה לדף הכניסה
    if (!currentUserJSON) {
        window.location.href = '../html/main.html';
        window.location.href = '../html/login.html';
        return;
    }
    // 2. המרה חזרה לאובייקט כדי שנוכל לקרוא את השם

 document.addEventListener('DOMContentLoaded', () => {
        // מחיקת המשתמש המחובר מהזיכרון הספציפי
        localStorage.removeItem('currentUser');
        // מעבר לעמוד הכניסה
        window.location.href = '../html/main.html';
        window.location.href = '../html/login.html';
    });
});