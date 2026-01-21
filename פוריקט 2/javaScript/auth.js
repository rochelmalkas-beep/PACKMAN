function checkSecurity() {
    if (!sessionStorage.getItem('isSessionActive')) {
        localStorage.removeItem('currentUser');
    }
    const userJson = localStorage.getItem('currentUser');
    if (window.location.pathname.includes('Account.html')) {
        return null;
    }
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

document.addEventListener('DOMContentLoaded', () => {
    const user = checkSecurity();
    if (user) {
        const nameSpan = document.getElementById('user-name-display');
        if (nameSpan) nameSpan.innerText = user.username;
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) logoutBtn.onclick = logout;
    }
});