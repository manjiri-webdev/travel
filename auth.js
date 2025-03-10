// Store users data
let users = JSON.parse(localStorage.getItem('users')) || [];

// Validation functions
function validateName(name) {
    return name.length >= 2;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 8;
}

// Sign up form validation and submission
function validateAndSubmit(event) {
    event.preventDefault();
    
    // Reset error messages
    document.querySelectorAll('.error-message').forEach(elem => elem.textContent = '');
    
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    let isValid = true;

    if (!validateName(fullName)) {
        document.getElementById('nameError').textContent = 'Name must be at least 2 characters long';
        isValid = false;
    }

    if (!validateEmail(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        isValid = false;
    }

    if (!validatePassword(password)) {
        document.getElementById('passwordError').textContent = 'Password must be at least 8 characters long';
        isValid = false;
    }

    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
        isValid = false;
    }

    if (users.some(user => user.email === email)) {
        document.getElementById('emailError').textContent = 'Email already registered';
        isValid = false;
    }

    if (isValid) {
        // Add new user
        const newUser = {
            fullName,
            email,
            password,
            dateRegistered: new Date().toISOString(),
            lastLogin: null
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Store in users.txt (this would normally be done server-side)
        storeUserData(newUser);
        
        alert('Registration successful! Please login.');
        window.location.href = 'login.html';
    }

    return false;
}

// Login validation
function validateLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    const userIndex = users.findIndex(u => u.email === email && u.password === password);
    
    if (userIndex !== -1) {
        // Update last login time
        users[userIndex].lastLogin = new Date().toISOString();
        localStorage.setItem('users', JSON.stringify(users));
        
        // Store current user
        localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
        
        alert('Login successful!');
        window.location.href = 'index.html';
    } else {
        document.getElementById('loginEmailError').textContent = 'Invalid email or password';
    }

    return false;
}

// Store user data in a hidden format
function storeUserData(user) {
    const userDataString = `${user.fullName}|${user.email}|${user.dateRegistered}|${user.lastLogin || 'Never'}\n`;
    console.log('User data stored:', userDataString);
}

// Function to check if user is logged in
function checkLoginStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        // Update UI for logged-in user
        const signInButton = document.querySelector('.btn-signin');
        if (signInButton) {
            signInButton.textContent = 'Logout';
            signInButton.href = '#';
            signInButton.onclick = function(e) {
                e.preventDefault();
                localStorage.removeItem('currentUser');
                window.location.reload();
            };
        }
    }
}

// Add event listener for page load
document.addEventListener('DOMContentLoaded', checkLoginStatus); 