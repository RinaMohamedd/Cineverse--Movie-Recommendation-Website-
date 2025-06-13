document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });

        const data = await res.json();

        if (res.ok) {
            //stores the token in localStorage or cookie
            localStorage.setItem('token', data.token);
            
            // Store notification message with user's name in localStorage
            const welcomeMessage = data.fullname ? 
                `Welcome back, ${data.fullname}! 🎬` : 
                'Welcome back! 🎬';
            localStorage.setItem('notification', welcomeMessage);

            //check isAdmin flag from response data
            if (data.isAdmin == true) {
                window.location.href = '/admin';
            } else {
                window.location.href = '/';
            }
        } else {
            alert(`Login failed: ${data.message}`);
            if (data.message === 'User not found') {
                window.location.href = '/signup'; //redirect to signup if user doesn't exist
            }
        }
    } catch (err) {
        alert('Something went wrong!');
        console.error(err);
    }
});