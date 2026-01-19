function checkSecurity() {
    if (window.location.pathname.includes('login.html')) {
        return;
    }
    // שינוי ל-sessionStorage: כך המידע יימחק בסגירת הדפדפן
    const user = sessionStorage.getItem('currentUser');
    if (!user) {
        window.location.replace('../html/login.html');
    }
};
checkSecurity();
function init() {
    displayUserName();
    handleLogout();
    preventBackNavigation();
}
// קריאה לפונקציה ברגע שהדף מוכן
document.addEventListener('DOMContentLoaded', initializePage);


function displayUserName() {
    const nameSpan = document.getElementById('user-name-display') || document.getElementById('player-name-display');
    // שינוי ל-sessionStorage
    const currentUserData = sessionStorage.getItem('currentUser');

    if (nameSpan && currentUserData) {
        try {
            const userObj = JSON.parse(currentUserData);
            nameSpan.innerText = ' ' + (userObj.username || userObj.name || userObj) + ' ';
        } catch (e) {
            nameSpan.innerText = ' ' + currentUserData + ' ';
        }
    }
}
function logout() {
    // שינוי ל-sessionStorage
    sessionStorage.removeItem('currentUser');
    window.location.replace('../html/login.html');
}
function handleLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
}
function preventBack() {
    window.history.pushState(null, null, window.location.href);
}
function preventBackNavigation() {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = preventBack();
}