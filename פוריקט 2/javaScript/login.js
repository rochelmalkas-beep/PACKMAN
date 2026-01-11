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
//פונקצית שליפת משתמשים
function getUsers() {
    const usersJSON = localStorage.getItem('pacmanUsers'); 
    return usersJSON ? JSON.parse(usersJSON) : [];
}
// מבטל ריענון של אתר כמו במצלמר וגם מציג את הההרשמה או את ההתחברות לפי הלינק שלחצו
showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginSection.classList.add('hidden');
    registerSection.classList.remove('hidden');
    messageBox.classList.add('hidden');
});
registerForm.addEventListener('submit', (e) => {
    e.preventDefault(); // מונע שליחת טופס רגילה ורענון הדף
    
    // לוקח את הערכים מהשדות ומוחק רווחים מיותרים בהתחלה/סוף (trim)
    const usernameInput = document.getElementById('reg-username').value.trim();
    const passwordInput = document.getElementById('reg-password').value.trim();
    
    const users = getUsers(); // מביא את רשימת המשתמשים הקיימת
    // בדיקת כפילות: האם יש כבר משתמש עם השם הזה?
    const userExists = users.some(user => user.username === usernameInput);
    if (userExists) {
        showMessage('GAME OVER: שם המשתמש תפוס!', 'error');
        return; // עוצר את הפונקציה כאן, לא ממשיך להרשמה
    }
    // יצירת אובייקט למשתמש החדש
    const newUser = {
        username: usernameInput,
        password: passwordInput,
        highScore: 0 // מגדיר שיא התחלתי של 0
    };
    users.push(newUser); // מוסיף את המשתמש החדש לרשימה (מערך)
    // שומר את הרשימה המעודכנת חזרה לזיכרון הדפדפן
    // חייבים להפוך את המערך לטקסט בעזרת JSON.stringify
    localStorage.setItem('pacmanUsers', JSON.stringify(users));
    showMessage('LEVEL UP! נרשמת בהצלחה.', 'success');
    registerForm.reset(); // מנקה את השדות בטופס
    // מעבר אוטומטי למסך התחברות אחרי שנייה וחצי
    setTimeout(() => {
        registerSection.classList.add('hidden');
        loginSection.classList.remove('hidden');
        loginForm.reset();
    }, 1500);
});
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // מונע רענון דף
    const usernameInput = document.getElementById('login-username').value.trim();
    const passwordInput = document.getElementById('login-password').value.trim();
    const users = getUsers(); // טוען את המשתמשים

    // מחפש משתמש אחד שבו גם השם וגם הסיסמה תואמים למה שהוזן
    const validUser = users.find(user => user.username === usernameInput && user.password === passwordInput);

    if (validUser) {
        // אם נמצא משתמש כזה:
        showMessage('LOADING...', 'success');
        // שומרים בזיכרון "מי המשתמש שמחובר עכשיו" (currentUser)
        // זה חשוב כדי שבמשחק עצמו נדע למי לשמור את השיא
        localStorage.setItem('currentUser', JSON.stringify(validUser));
        loginForm.reset();

        setTimeout(() => {
            // כאן קורה המעבר! שימי לב שהשם game.html תואם לשם הקובץ שלך
            window.location.href = 'games.html'; 
        }, 1500); // מחכים 2 שניות (2000 מילי-שניות) כדי שיראו את ה-LOADING
    } else {
        // אם לא נמצא משתמש תואם:
        showMessage('שגיאה: שם משתמש או סיסמא לא נכונים', 'error');
    }
});
    