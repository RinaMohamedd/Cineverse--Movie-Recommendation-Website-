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
                    alert('Login successful!');
                    //stores the token in localStorage or cookie
                    localStorage.setItem('token', data.token);
                    window.location.href = '/';
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