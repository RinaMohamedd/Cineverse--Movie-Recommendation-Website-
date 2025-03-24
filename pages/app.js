


const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");

arrows.forEach((arrow, i) => {
    const movieList = movieLists[i];
    const itemNumber = movieList.querySelectorAll("img").length;
    let clickCounter = 0;
    arrow.addEventListener("click", () => {
      const ratio = Math.floor(window.innerWidth / 270); 
      const maxClicks = itemNumber - ratio; 
      if (clickCounter < maxClicks+1) {
        clickCounter++;
        movieList.style.transform = `translateX(${-(clickCounter * 300)}px)`;
      } else {
        movieList.style.transform = "translateX(0)";
        clickCounter = 0;
      }
    });
  });
  
const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
  ".container,.movie-list-title,.navbar-container,.sidebar,.left-menu-icon,.toggle"
);

ball.addEventListener("click", () => {
  items.forEach((item) => {
    item.classList.toggle("active");
  });	
  ball.classList.toggle("active");
});


// Movie data (manually added)
const movies = [
  { name: "Joker: Folie à Deux", year: "2024", img: src="../images/movie2.jpg" },
  { name: "Fast X", year: "2023", img: src="../images/movie13.jpg" },
  { name: "Spider-Man: No Way Home", year: "2021", img: src="../images/movie16.png" },
  { name: "The Batman", year: "2022", img: src="../images/movie14.jpg" },
  { name: "Mission: Impossible - The Final Reckoning", year: "2025", img: src="../images/movie9.jpg" },
  { name: "28 Years Later", year: "2025", img: src="../images/movie8.jpg" },
];

// Select elements
const searchInput = document.getElementById("search");
const movieCardsContainer = document.querySelector(".movie-cards"); // FIXED: Use class selector
const movieTemplate = document.querySelector("[data-user-template]");

// Ensure script runs after DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    displayMovies(movies);
});

// Function to create movie cards
function displayMovies(filteredMovies) {
    movieCardsContainer.innerHTML = ""; // Clear previous content

    filteredMovies.forEach(movie => {
        const movieCard = movieTemplate.content.cloneNode(true).firstElementChild; // FIXED: Get first child
        movieCard.querySelector("[data-header]").textContent = movie.name;
        movieCard.querySelector("[data-year]").textContent = movie.year;
        movieCard.querySelector("[data-img]").src = movie.img;
        movieCard.querySelector("[data-img]").alt = movie.name;

        movieCardsContainer.appendChild(movieCard);
    });
}

// Event listener for search input
searchInput.addEventListener("input", (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredMovies = movies.filter(movie => movie.name.toLowerCase().includes(searchValue));
    displayMovies(filteredMovies);
});

// Display all movies on load
displayMovies(movies);
const movierecommendations = [
  { title: "Mad Max: Fury Road", genre: "action", year: 2015, mood: "exciting" },
  { title: "John Wick", genre: "action", year: 2014, mood: "exciting" },
  { title: "Extraction 2", genre: "action", year: 2023, mood: "exciting" },
  { title: "The Hangover", genre: "comedy", year: 2009, mood: "funny" },
  { title: "Superbad", genre: "comedy", year: 2007, mood: "funny" },
  { title: "Free Guy", genre: "comedy", year: 2021, mood: "funny" },
  { title: "The Shawshank Redemption", genre: "drama", year: 1994, mood: "emotional" },
  { title: "Forrest Gump", genre: "drama", year: 1994, mood: "emotional" },
  { title: "Nomadland", genre: "drama", year: 2021, mood: "emotional" },
  { title: "Interstellar", genre: "sci-fi", year: 2014, mood: "thought-provoking" },
  { title: "Blade Runner 2049", genre: "sci-fi", year: 2017, mood: "thought-provoking" },
  { title: "The Creator", genre: "sci-fi", year: 2023, mood: "thought-provoking" },
  { title: "Get Out", genre: "horror", year: 2017, mood: "scary" },
  { title: "A Quiet Place", genre: "horror", year: 2018, mood: "scary" }
];
document.getElementById('recommendBtn').addEventListener('click', () => {
  alert('Button clicked!');
  recommendMovie();
});
function recommendMovie() {
    const selectedGenre = document.getElementById('genre').value;
    const selectedYear = document.getElementById('year').value;
    const selectedMood = document.getElementById('mood').value;

    const filteredMovies = movierecommendations.filter(movierecommendations => {
        return movierecommendations.genre === selectedGenre &&
            filterYear(movierecommendations.year, selectedYear) &&
            movierecommendations.mood === selectedMood;
    });

    const resultDiv = document.getElementById("recommendation");
    console.log(filteredMovies);

    if (filteredMovies.length > 0) {
        const randomMovie = filteredMovies[Math.floor(Math.random() * filteredMovies.length)];
        resultDiv.innerHTML = `<strong>${randomMovie.title}</strong>`;
    } else {
        resultDiv.innerHTML = "No movies found matching your preferences.";
    }
}
function filterYear(movieYear, selectedRange) {
  if (selectedRange === "2020") return movieYear >= 2020;
    if (selectedRange === "2010") return movieYear >= 2010 && movieYear <= 2019;
    if (selectedRange === "2000") return movieYear >= 2000 && movieYear <= 2009;
    if (selectedRange === "1990") return movieYear < 2000;
    return false;
}