const loginSection = document.getElementById('login-section');
const registerSection = document.getElementById('register-section');
const showRegisterLink = document.getElementById('show-register');
const showLoginLink = document.getElementById('show-login');
const messageBox = document.getElementById('message-box');
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');

function initializeAccountPage() {
    ensureDefaultUsersExist();
    showRegisterLink.addEventListener('click', handleAuthClick);
    showLoginLink.addEventListener('click', handleAuthClick);
    registerForm.addEventListener('submit', handleRegister);
    loginForm.addEventListener('submit', handleLogin);
}

function ensureDefaultUsersExist() {
    const users = getUsers();
    const defaultUsers = [
        new User('malka', '7714'),
        new User('iska', '123'),
        new User('aa', '11')
    ];
    const dataChanged = ensureDefaultUsers(users, defaultUsers);
    if (dataChanged) {
        localStorage.setItem('pacmanUsers', JSON.stringify(users));
    }
}

function getUsers() {
    const usersJSON = localStorage.getItem('pacmanUsers');
    return usersJSON ? JSON.parse(usersJSON) : [];
}

function ensureDefaultUsers(users, defaultUsers) {
    let dataChanged = false;
    for (const defaultUser of defaultUsers) {
        let exists = false;
        for (const user of users) {
            if (user.username === defaultUser.username) {
                exists = true;
                break;
            }
        }
        if (!exists) {
            users.push(defaultUser);
            dataChanged = true;
        }
    }
    return dataChanged;
}

function handleAuthClick(e) {
    e.preventDefault();
    if (e.currentTarget.id === 'show-register') {
        switchView('register');
    } else {
        switchView('login');
    }
}

function switchView(viewName) {
  messageBox.classList.add('hidden');
    if (viewName === 'register') {
        loginSection.classList.add('hidden');
        registerSection.classList.remove('hidden');
    } else {
        registerSection.classList.add('hidden');
        loginSection.classList.remove('hidden');
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
    sessionStorage.setItem('isSessionActive', 'true');
    showMessage('LEVEL UP! Registered successfully.', 'success');
    registerForm.reset();
    setTimeout(() => window.location.href = 'html/gamesLobby.html', 1500);
}

function handleLogin(e) {
    e.preventDefault();
    const usernameInput = document.getElementById('login-username').value.trim();
    const passwordInput = document.getElementById('login-password').value.trim();
    const validUser = getUsers().find(user =>
        user.username === usernameInput && user.password === passwordInput
    );
    if (validUser) {
        localStorage.setItem('currentUser', JSON.stringify(validUser));
        sessionStorage.setItem('isSessionActive', 'true');
        window.location.href = 'html/gamesLobby.html';
    } else {
        showMessage('Incorrect username or password', 'error');
    }
}

function showMessage(text, type) {
    messageBox.textContent = text;
    messageBox.className = type;
    messageBox.classList.remove('hidden');
    setTimeout(() => {
        messageBox.classList.add('hidden');
    }, 1000);
}



document.addEventListener('DOMContentLoaded', initializeAccountPage);

