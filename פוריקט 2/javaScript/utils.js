// javaScript/utils.js

const DB_KEY = 'pacmanUsers';
const SESSION_KEY = 'currentUser';

// 1. Database Helpers
function getUsers() {
    const users = localStorage.getItem(DB_KEY);
    return users ? JSON.parse(users) : [];
}

function saveUser(user) {
    const users = getUsers();
    if (users.find(u => u.username === user.username)) {
        return false; 
    }
    users.push(user);
    localStorage.setItem(DB_KEY, JSON.stringify(users));
    return true;
}

// 2. Auth Logic
function getCurrentUser() {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
}

function logout() {
    localStorage.removeItem(SESSION_KEY);
    window.location.href = 'main.html';
}

// 3. Security Check (The Fix)
// Only run this check if we are NOT on the login page
if (!window.location.pathname.endsWith('main.html')) {
    const user = getCurrentUser();
    if (!user) {
        // If not logged in and not on login page, go to login
        window.location.href = 'main.html';
    } else {
        // If logged in, update the UI name if it exists
        const nameDisplay = document.getElementById('user-name-display');
        if (nameDisplay) nameDisplay.textContent = user.username;
    }
}

// 4. Logout Handler
document.addEventListener('DOMContentLoaded', () => {
HEAD
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

});