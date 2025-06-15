window.addEventListener("DOMContentLoaded", async () => {
    try {
        const res = await fetch("/api/users/check-session", {
            method: "GET",
            credentials: "include"
        });
        const data = await res.json();

        console.log("Session data", data);

        const profileText = document.querySelector(".profile-text a");
        const authBtn = document.getElementById("auth-btn");

        if (data.loggedIn) {
            profileText.textContent = data.username || "User";
            profileText.href = "/profile";

            authBtn.textContent = "Logout";
            authBtn.onclick = async () => {
                await fetch("/api/users/logout", {
                    method: "POST",
                    credentials: "include"
                });
                window.location.href = "/login";
            };
        } else {
            //alert("You need to be logged in to view your profile");
            profileText.textContent = "Profile";
            profileText.href = "/login";

            authBtn.textContent = "Login";
            authBtn.onclick = () => {
                window.location.href = "/login";
            };
        }
    } catch (err) {
        console.error("Session check failed:", err);
        alert("Something went wrong. Please try again later.");
    }
});

fetch('/api/users/check-session')
  .then(res => res.json())
  .then(data => {
      if (data.loggedIn && data.isAdmin) {
          const adminLink = document.getElementById('admin-link');
          if (adminLink) adminLink.style.display = 'inline-block';
      }
  });
  