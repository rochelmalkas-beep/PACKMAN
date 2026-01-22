
function initializeLibraryPage() {
    const user = checkSecurity();
    if (user) {
        const nameSpan = document.getElementById('user-name-display');
            nameSpan.innerText = user.username;
    }
}

document.addEventListener('DOMContentLoaded', initializeLibraryPage);