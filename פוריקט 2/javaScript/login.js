// --- הגדרת משתנים (אלמנטים מה-HTML) ---
const loginSection = document.getElementById('login-section');
const registerSection = document.getElementById('register-section');
const showRegisterLink = document.getElementById('show-register');
const showLoginLink = document.getElementById('show-login'); // ודאי שיש לך כפתור כזה ב-HTML לחזרה להתחברות
const messageBox = document.getElementById('message-box');
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');

// --- פונקציה להצגת הודעות ---
function showMessage(text, type) {
    messageBox.textContent = text;
    messageBox.className = type; // מוודא שהעיצוב (אדום/ירוק) מתעדכן
    messageBox.classList.remove('hidden');
    
    // הסתרת ההודעה אחרי שניה
    setTimeout(() => {
        messageBox.classList.add('hidden');
    }, 1000);
}

// --- פונקציה לשליפת כל המשתמשים מהזיכרון ---
function getUsers() {
    const usersJSON = sessionStorage.getItem('pacmanUsers');
    return usersJSON ? JSON.parse(usersJSON) : [];
}

// --- מעבר בין מסך התחברות למסך הרשמה ---
showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginSection.classList.add('hidden');
    registerSection.classList.remove('hidden');
    messageBox.classList.add('hidden'); // מנקה הודעות ישנות אם היו
});

// (אופציונלי) אם יש לך כפתור "כבר יש לי משתמש" שרוצה לחזור להתחברות
if (showLoginLink) {
    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerSection.classList.add('hidden');
        loginSection.classList.remove('hidden');
        messageBox.classList.add('hidden');
    });
}

// --- לוגיקה של הרשמה (Register) ---
registerForm.addEventListener('submit', (e) => {
    e.preventDefault(); // מונע רענון של הדף

    const usernameInput = document.getElementById('reg-username').value.trim();
    const passwordInput = document.getElementById('reg-password').value.trim();

    const users = getUsers();

    // 1. בדיקה אם המשתמש כבר קיים
    const userExists = users.some(user => user.username === usernameInput);
    if (userExists) {
        showMessage('GAME OVER:Username is taken!', 'error');
        return;
    }

    // 2. יצירת משתמש חדש
    const newUser = {
        username: usernameInput,
        password: passwordInput,
        highScore: 0
    };

    // 3. שמירת המשתמש ברשימת המשתמשים הכללית
    users.push(newUser);
    sessionStorage.setItem('pacmanUsers', JSON.stringify(users));

    // 4. *** התחברות אוטומטית ***
    // שומרים את המשתמש החדש כ"משתמש מחובר" כדי שהמשחק יזהה אותו
    sessionStorage.setItem('currentUser', JSON.stringify(newUser));

    showMessage('LEVEL UP! You have registered successfully lets move on to the game.', 'success');
    registerForm.reset();
    // 5. מעבר לדף המשחק
    setTimeout(() => {
        window.location.href = 'games.html';
    }, 1500);
});

// --- לוגיקה של התחברות (Login) ---
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // מונע רענון של הדף

    const usernameInput = document.getElementById('login-username').value.trim();
    const passwordInput = document.getElementById('login-password').value.trim();
    
    const users = getUsers();

    // חיפוש משתמש תואם
    const validUser = users.find(user => user.username === usernameInput && user.password === passwordInput);

    if (validUser) {
        showMessage('LOADING...', 'success');
        
        // שמירת המשתמש המחובר
        sessionStorage.setItem('currentUser', JSON.stringify(validUser));
        loginForm.reset();

        // מעבר לדף המשחק
        setTimeout(() => {
            window.location.href = 'games.html';
        }, 1500);
    } else {
        showMessage('Error: Incorrect username or password', 'error');
    }
});