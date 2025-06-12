document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault(); //stop the form from refreshing the page

    const fullname = document.getElementById('fullname').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({fullname, username, email, password})
      });

      const data = await response.json();

      if (response.ok) {
        alert('Signup successful! You can now log in');
        window.location.href = '/login';
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (err) {
      alert('Something went wrong. Try again later');
      console.error(err);
    }
  });