function checkSecurity() {
    const thisUser = localStorage.getItem('currentUser');
    if (thisUser) {
        return JSON.parse(thisUser);
    }
    window.location.replace('../html/Account.html');
    return;
}

function displayUserName(user) {
    const nameSpan = document.getElementById('user-name-display');
    if (nameSpan && user) {
        nameSpan.innerText = user.username;
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.replace('../html/Account.html');
}

function inIt() {
    const user = checkSecurity();
    if (user) {
        displayUserName(user);
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.onclick = logout;
        }
    }
}
document.addEventListener('DOMContentLoaded', inIt);
