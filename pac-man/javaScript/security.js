function checkSecurity() {
    if (!sessionStorage.getItem('isSessionActive')) {
        localStorage.removeItem('currentUser');
    }
    const userJson = localStorage.getItem('currentUser');
    if (!userJson) {
        window.location.replace('../Account.html');
        return null;
    }
    return JSON.parse(userJson);
}

function logout() {
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('isSessionActive');
    window.location.replace('../Account.html');
}

function initializeSecurityPage() {
    checkSecurity();
    const logoutBtn = document.getElementById('logout-btn');
        logoutBtn.onclick = logout;
}
document.addEventListener('DOMContentLoaded', initializeSecurityPage);