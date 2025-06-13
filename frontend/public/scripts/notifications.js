// Create notification popup element
const notificationPopup = document.createElement('div');
notificationPopup.className = 'notification-popup';
const notificationIcon = document.querySelector('.notification-icon');
notificationIcon.parentElement.appendChild(notificationPopup);

// Function to show notification
function showNotification(message, duration = 3000) {
    notificationPopup.textContent = message;
    notificationPopup.classList.add('show');
    
    // Hide notification after duration
    setTimeout(() => {
        notificationPopup.classList.remove('show');
    }, duration);
}

// Check for stored notification on page load
window.addEventListener('load', () => {
    const storedNotification = localStorage.getItem('notification');
    if (storedNotification) {
        // Show the notification
        showNotification(storedNotification);
        // Remove it from localStorage
        localStorage.removeItem('notification');
    }
});

// Add click event listener to notification icon
notificationIcon.addEventListener('click', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        showNotification('Please log in to see notifications');
    }
}); 