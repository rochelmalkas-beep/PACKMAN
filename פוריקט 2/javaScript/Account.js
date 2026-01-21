const AccountSection = document.getElementById('Account-section');
const registerSection = document.getElementById('register-section');
const showRegisterLink = document.getElementById('show-register');
const showLoginLink = document.getElementById('show-Account');
const messageBox = document.getElementById('message-box');
const registerForm = document.getElementById('register-form');
const AccountForm = document.getElementById('Account-form');

function showMessage(text, type) {
    messageBox.textContent = text;
    messageBox.className = type;
    messageBox.classList.remove('hidden');
    setTimeout(() => {
        messageBox.classList.add('hidden');
    }, 1000);
}

function getUsers() {
    const usersJSON = localStorage.getItem('pacmanUsers');
    return usersJSON ? JSON.parse(usersJSON) : [];
}

function switchView(viewName) {
    if (messageBox) messageBox.classList.add('hidden');
    if (viewName === 'register') {
        AccountSection.classList.add('hidden');
        registerSection.classList.remove('hidden');
    } else {
        registerSection.classList.add('hidden');
        AccountSection.classList.remove('hidden');
    }
}

function handleAuthClick(e) {
    e.preventDefault();
        if (e.currentTarget.id === 'show-register') {
        switchView('register');
    } else {
        switchView('Account');
    }
}

function handleRegister(e) {
    e.preventDefault();
    const usernameInput = document.getElementById('reg-username').value.trim();
    const passwordInput = document.getElementById('reg-password').value.trim();
    const users = getUsers();
    if (users.some(user => user.username === usernameInput)) {
        showMessage('GAME OVER: Username is taken!', 'error');
        return;
    }
    const newUser = new User(usernameInput, passwordInput);
    users.push(newUser);
    localStorage.setItem('pacmanUsers', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    showMessage('LEVEL UP! Registered successfully.', 'success');
    registerForm.reset();
    setTimeout(() => window.location.href = 'html/games.html', 1500);
}
function handleLogin(e) {
    e.preventDefault();
    const usernameInput = document.getElementById('Account-username').value.trim();
    const passwordInput = document.getElementById('Account-password').value.trim();
    const validUser = getUsers().find(user => 
        user.username === usernameInput && user.password === passwordInput
    );

    if (validUser) {
        localStorage.setItem('currentUser', JSON.stringify(validUser));
        sessionStorage.setItem('isSessionActive', 'true');
        window.location.href = 'html/games.html';
    } else {
        alert('Incorrect username or password');
    }
}

function inIt() {
    if (showRegisterLink) showRegisterLink.addEventListener('click', handleAuthClick);
    if (showLoginLink) showLoginLink.addEventListener('click', handleAuthClick);
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    if (AccountForm) {
        AccountForm.addEventListener('submit', handleLogin);
    }
}

document.addEventListener('DOMContentLoaded', inIt);