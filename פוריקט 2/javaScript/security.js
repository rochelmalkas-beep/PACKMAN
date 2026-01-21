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
checkSecurity();
