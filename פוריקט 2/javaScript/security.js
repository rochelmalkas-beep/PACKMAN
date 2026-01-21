

/**
 * בודק אם המשתמש מחובר.
 * אם לא - זורק אותו לדף ההתחברות.
 * אם כן - מחזיר את פרטי המשתמש.
 */
function checkSecurity() {
    // בדיקת סשן פעיל
    if (!sessionStorage.getItem('isSessionActive')) {
        localStorage.removeItem('currentUser');
    }

    const userJson = localStorage.getItem('currentUser');
    
    // מניעת לולאה: אם אנחנו כבר בדף ההתחברות, אל תעשה כלום
    if (window.location.pathname.includes('Account.html')) {
        return null;
    }

    // אם אין משתמש, הפניה החוצה
    if (!userJson) {
        window.location.replace('../Account.html');
        return null;
    }

    // החזרת המשתמש המפורמט
    return JSON.parse(userJson);
}

/**
 * מוחק את הנתונים ומעביר לדף ההתחברות
 */
function logout() {
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('isSessionActive');
    window.location.replace('../Account.html');
}