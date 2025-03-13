


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
