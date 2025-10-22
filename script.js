const correctPassword = "Anil@143";

function checkPassword() {
    const userInput = document.getElementById('passwordInput').value;
    const errorMessage = document.getElementById('errorMessage');
    
    if (userInput === correctPassword) {
        document.querySelector('.login-container').classList.add('hidden');
        document.getElementById('birthdayPage').classList.remove('hidden');
    } else {
        errorMessage.textContent = "Incorrect password. Please try again.";
    }
}

function showMessage() {
    const message = "🎉 Surprise! 🎉 Anil! I know your birthday isn't for a few days, but I just had to send you an early surprise. 🎉Wishing you an amazing year ahead filled with happiness, success, and all the things you love. Consider this an early start to the celebrations—happy advance birthday! 🎉🎂";
    document.getElementById('surpriseMessage').textContent = message;
    document.getElementById('surpriseMessage').style.display = 'block';
}
