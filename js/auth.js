// Fetch existing users from localStorage
let users = JSON.parse(localStorage.getItem('users')) || [];

// Sign-Up Validation
const signupForm = document.getElementById('signupForm');
if(signupForm){
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('newUsername').value.trim();
    const email = document.getElementById('newEmail').value.trim();
    const password = document.getElementById('newPassword').value.trim();
    
    const existingUser = users.find(u => u.username === username || u.email === email);
    const msg = document.getElementById('signupMsg');

    if(existingUser){
      msg.textContent = "User already exists! Try logging in.";
      msg.style.color = "red";
    } else {
      users.push({username,email,password});
      localStorage.setItem('users', JSON.stringify(users));
      msg.textContent = "Sign-Up successful! You can now login.";
      msg.style.color = "green";
      signupForm.reset();
    }
  });
}

// Login Validation
const loginForm = document.getElementById('loginForm');
if(loginForm){
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const msg = document.getElementById('error');

    if(users.length === 0){
      msg.textContent = "No users found! Please sign up first.";
      return;
    }

    const user = users.find(u => u.username === username && u.password === password);

    if(user){
      // Save logged-in user
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      window.location.href = "snake.html"; // Redirect to Snake game
    } else {
      msg.textContent = "Invalid username or password!";
    }
  });
}
