async function getRecommendation(event) {
  event.preventDefault();
  const selectedGenres = Array.from(document.querySelectorAll('input[name="genre"]:checked'))
      .map(checkbox => checkbox.value);
  const age = parseInt(document.getElementById('age-textbox').value);
  const releaseYear = document.querySelector('input[name="releaseYear"]:checked')?.value;

  const response = await fetch('http://localhost:5000/api/recommendation/start_now', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({selectedGenres, age, releaseYear})
  });

  const result = await response.json();

  if (result.success) {
    displayRecommendedMovie(result.movie);
  } else {
    alert(result.message);
  }
}


function displayRecommendedMovie(movie) {
  const overlay = document.getElementById('movie-overlay');
  document.getElementById('recommended-movie-name').textContent = movie.name;
  document.getElementById('recommended-movie-img').src = movie.img;
  document.getElementById('recommended-movie-description').textContent = movie.description;

  const embedURL = movie.trailer.replace("watch?v=", "embed/");
  document.getElementById('trailer-container').innerHTML =
  `<iframe width="560" height="315" src="${embedURL} " frameborder="0" allowfullscreen></iframe>`;

  overlay.style.display = "block";
  document.getElementById("recommendation-form").reset()
}

function closeOverlay() {
  document.getElementById('movie-overlay').style.display = "none";
}

document.querySelector('#recommendation-form').addEventListener('submit', getRecommendation);

/*document.querySelector('#recommendation-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const genre = document.querySelector('#genre').value;
    const age = document.querySelector('#age').value;
    const releaseYear = document.querySelector('#releaseYear').value;

    const response = await fetch('/api/recommendation/recommendations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({genre, age, releaseYear})
    });

    const result = await response.json();

    if (response.ok) {
        document.querySelector('#movie-result').innerHTML =
        `<h3>${result.title}</h3>
        <a href="${result.link}" target="_blank">Watch Now</a>`;
    } else {
        document.querySelector('#movie-result').textContent = result.message || 'Error happened';
    }
});*/