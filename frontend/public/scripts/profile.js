const addBtn = document.getElementById('addPicBtn') || document.getElementById('updatePicBtn');
const modal = document.getElementById('uploadModal');
const closeBtn = document.querySelector('.close-btn');

if (addBtn && modal && closeBtn) {
    addBtn.addEventListener('click', () => modal.style.display = 'flex');
    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', e => {
        if (e.target == modal) modal.style.display = 'none';
    });
}

document.getElementById("change-password-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const oldPassword = document.getElementById("old-password").value;
    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (newPassword !== confirmPassword) {
        alert("Passwords don't match");
        return;
    }
    
    try {
        const res = await fetch("http://localhost:5000/api/users/change-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({oldPassword, newPassword})
        });

        const data = await res.json();

        if (res.ok) {
            alert(data.message);
            const logoutRes = await fetch('/api/users/logout', {
              method: 'POST',
              credentials: 'include'
            });

            if (logoutRes.ok) {
                window.location.href = "/login";
            } else {
                alert("Logout failed, but password was changed");
            }
        } else {
            alert(data.message || "Failed to change password");
        }
    } catch (err) {
        console.error("Error changing password:", err);
        alert("Something went wrong");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const togglePasswordBtn = document.getElementById("toggle-password-form");
    const passwordModal = document.getElementById("passwordModal");
    const closePasswordBtn = passwordModal.querySelector(".close-btn");

    if (togglePasswordBtn && passwordModal && closePasswordBtn) {
        togglePasswordBtn.addEventListener("click", () => {
            passwordModal.style.display = "flex";
        });

        closePasswordBtn.addEventListener("click", () => {
            passwordModal.style.display = "none";
        });

        window.addEventListener("click", (e) => {
            if (e.target === passwordModal) {
                passwordModal.style.display = "none";
            }
        });
    }
});