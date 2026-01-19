const loginSection = document.getElementById('login-section');
const registerSection = document.getElementById('register-section');
const showRegisterLink = document.getElementById('show-register');
const showLoginLink = document.getElementById('show-login');
const messageBox = document.getElementById('message-box');
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
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
showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginSection.classList.add('hidden');
    registerSection.classList.remove('hidden');
    messageBox.classList.add('hidden');
});
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const usernameInput = document.getElementById('reg-username').value.trim();
    const passwordInput = document.getElementById('reg-password').value.trim();
    
    const users = getUsers(); 
    const userExists = users.some(user => user.username === usernameInput);
    if (userExists) {
        showMessage('GAME OVER: שם המשתמש תפוס!', 'error');
        return; 
    }
    const newUser = {
        username: usernameInput,
        password: passwordInput,
        highScore: 0 
    };
    users.push(newUser); 
    localStorage.setItem('pacmanUsers', JSON.stringify(users));
    showMessage('LEVEL UP! נרשמת בהצלחה.', 'success');
    registerForm.reset(); 
    setTimeout(() => {
        registerSection.classList.add('hidden');
        loginSection.classList.remove('hidden');
        loginForm.reset();
    }, 1500);
});
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const usernameInput = document.getElementById('login-username').value.trim();
    const passwordInput = document.getElementById('login-password').value.trim();
    const users = getUsers(); 

    const validUser = users.find(user => user.username === usernameInput && user.password === passwordInput);

    if (validUser) {
        showMessage('LOADING...', 'success');
        localStorage.setItem('currentUser', JSON.stringify(validUser));
        loginForm.reset();

        setTimeout(() => { window.location.href = 'games.html'; }, 1500); 
    } else {
        showMessage('שגיאה: שם משתמש או סיסמא לא נכונים', 'error');
    }
});
    