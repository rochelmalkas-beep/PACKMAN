document.addEventListener('DOMContentLoaded', () => {
    const currentUserJSON = localStorage.getItem('currentUser');
    if (!currentUserJSON) {
        window.location.href = '../html/main.html';
        window.location.href = '../html/login.html';
        return;
    }

 document.addEventListener('DOMContentLoaded', () => {
        localStorage.removeItem('currentUser');
        window.location.href = '../html/main.html';
        window.location.href = '../html/login.html';
    });
});