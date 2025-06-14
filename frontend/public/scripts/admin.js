function showSection(id) {
    document.querySelectorAll('.section').forEach(el => el.style.display = 'none');
    document.getElementById(id).style.display = 'block';
  }
  function logout() {
    window.location.href = '/';
  }

  //frontend and backend connection function for the add movie feature
  document.getElementById('add-form').addEventListener('submit', async (e) => {
          e.preventDefault();

          const name = document.getElementById('addmovie-title').value;
          const genreCheckboxes = document.querySelectorAll('input[name="genre"]:checked');
          const genres = Array.from(genreCheckboxes).map(cb => cb.value);
          const releaseYear = document.getElementById('addmovie-year').value;
          const ageRating = document.getElementById('addmovie-age').value;
          const image = document.getElementById('addmovie-image').value;
          const trailer = document.getElementById('addmovie-trailer').value;
          const description = document.getElementById('addmovie-description').value;

          try {
              const res = await fetch('http://localhost:5000/admin/movies/add', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({name, genres, releaseYear, ageRating, image, trailer, description})
              });

              const data = await res.json();

              if (res.ok) {
                  alert('Movie added successfully!');
                  document.getElementById('add-form').reset();
              } else {
                  alert(`Movie addition failed: ${data.message}`);
              }
          } catch (err) {
              alert('Something went wrong!');
              console.error(err);
          }
      });

      //frontend and backend connection function for the remove movie feature
      document.getElementById('remove-form').addEventListener('submit', async (e) => {
          e.preventDefault();
          const movieId = document.getElementById('removemovie-id').value.trim();

          try {
              const res = await fetch(`http://localhost:5000/admin/movies/${movieId}`, {
                 method: 'DELETE'
              });

              const data = await res.json();

              if (res.ok) {
                  alert('Movie deleted successfully!');
                  document.getElementById('remove-form').reset();
              } else {
                  alert(`Movie deletion failed: ${data.message}`);
              }
          } catch (err) {
              alert('Something went wrong!');
              console.error(err);
          }
      });

      //frontend and backend connection function for the update movie feature
      document.getElementById('update-form').addEventListener('submit', async (e) => {
          e.preventDefault();

          const movieId = document.getElementById('updatemovie-id').value.trim();
          const genreCheckboxes = document.querySelectorAll('input[name="genre"]:checked');
          const genres = Array.from(genreCheckboxes).map(cb => cb.value);
          const releaseYear = document.getElementById('updatemovie-year').value;
          const ageRating = document.getElementById('updatemovie-age').value;
          const image = document.getElementById('updatemovie-image').value;
          const trailer = document.getElementById('updatemovie-trailer').value;
          const description = document.getElementById('updatemovie-description').value;

          try {
              const res = await fetch(`http://localhost:5000/admin/movies/${movieId}`, {
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({genres, releaseYear, ageRating, image, trailer, description})
              });

              const data = await res.json();

              if (res.ok) {
                  alert('Movie updated successfully!');
                  document.getElementById('update-form').reset();
              } else {
                  alert(`Movie updating failed: ${data.message}`);
              }
          } catch (err) {
              alert('Something went wrong!');
              console.error(err);
          }
      });

// User Management Functions
async function loadUsers() {
    try {
        const response = await fetch('/admin/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const users = await response.json();
        if (!Array.isArray(users)) {
            throw new Error('Invalid response format');
        }

        displayUsers(users);
    } catch (error) {
        console.error('Error loading users:', error);
        const tbody = document.getElementById('users-table-body');
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: red;">Error loading users: ${error.message}</td></tr>`;
    }
}

function displayUsers(users) {
    const tbody = document.getElementById('users-table-body');
    tbody.innerHTML = '';

    if (users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center;">No users found</td></tr>';
        return;
    }

    users.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.fullname || 'N/A'}</td>
            <td>${user.username || 'N/A'}</td>
            <td>${user.email || 'N/A'}</td>
            <td>${user.isAdmin ? 'Yes' : 'No'}</td>
            <td>${user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</td>
            <td class="action-buttons">
                <button class="edit-btn" onclick="showEditForm('${user._id}')">Edit</button>
                <button class="delete-btn" onclick="deleteUser('${user._id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

async function showEditForm(userId) {
    try {
        console.log('Fetching user details for ID:', userId);
        const response = await fetch(`/admin/users/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const user = await response.json();
        console.log('Received user data:', user);
        
        // Populate the form with user data
        document.getElementById('edit-user-id').value = user._id;
        document.getElementById('edit-fullname').value = user.fullname || '';
        document.getElementById('edit-username').value = user.username || '';
        document.getElementById('edit-email').value = user.email || '';
        document.getElementById('edit-isAdmin').checked = user.isAdmin || false;

        // Show the edit form
        const editForm = document.getElementById('edit-user-form');
        editForm.style.display = 'block';
        
        // Scroll to the form
        editForm.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Error loading user details:', error);
        alert('Error loading user details: ' + error.message);
    }
}

function hideEditForm() {
    const editForm = document.getElementById('edit-user-form');
    editForm.style.display = 'none';
    // Clear form fields
    document.getElementById('edit-user-id').value = '';
    document.getElementById('edit-fullname').value = '';
    document.getElementById('edit-username').value = '';
    document.getElementById('edit-email').value = '';
    document.getElementById('edit-isAdmin').checked = false;
}

// Add event listener for the update form
document.addEventListener('DOMContentLoaded', function() {
    const updateForm = document.getElementById('update-user-form');
    if (updateForm) {
        updateForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const userId = document.getElementById('edit-user-id').value;
            
            const userData = {
                fullname: document.getElementById('edit-fullname').value,
                username: document.getElementById('edit-username').value,
                email: document.getElementById('edit-email').value,
                isAdmin: document.getElementById('edit-isAdmin').checked
            };

            try {
                console.log('Updating user:', userId, 'with data:', userData);
                const response = await fetch(`/admin/users/${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(userData)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                alert(result.message || 'User updated successfully!');
                hideEditForm();
                loadUsers(); // Refresh the user list
            } catch (error) {
                console.error('Error updating user:', error);
                alert('Error updating user: ' + error.message);
            }
        });
    } else {
        console.error('Update form not found in the DOM');
    }
});

async function deleteUser(userId) {
    if (!confirm('Are you sure you want to delete this user?')) {
        return;
    }

    try {
        const response = await fetch(`/admin/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        alert(result.message || 'User deleted successfully!');
        loadUsers();
    } catch (error) {
        console.error('Error deleting user:', error);
        alert('Error deleting user: ' + error.message);
    }
}

// Load users when the user management section is shown
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show the selected section
    document.getElementById(sectionId).style.display = 'block';
    
    // Load users if the user management section is shown
    if (sectionId === 'users') {
        loadUsers();
    }
}