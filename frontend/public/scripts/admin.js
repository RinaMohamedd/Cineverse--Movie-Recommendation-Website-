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