


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


// Movie data (manually added)----------------------------------------------
const movies = [
  {
    name: "Joker: Folie à Deux",
    genre: ["Musical", "Crime"],
    year: 2024,
    ageRating: 18,
    img: "../images/movie2.jpg",
  },
  {
    name: "Peter Pan's Neverland Nightmare",
    genre: ["Horror", "Mystery", "Thriller"],
    year: 2025,
    ageRating: 18,
    img: "../images/movie11.jpg",
  },
  {
    name: "John Wick: Chapter 4",
    genre: ["Action", "Thriller", "Crime"],
    year: 2023,
    ageRating: 18,
    img: "../images/movie12.jpg",
  },
  {
    name: "Inside Out 2",
    genre: ["Animation", "Comedy", "Drama"],
    year: 2024,
    ageRating: 7,
    img: "../images/movie28.jpg",
  },
  {
    name: "Avengers: Endgame",
    genre: ["Action", "Sci-Fi"],
    year: 2019,
    ageRating: 13,
    img: "../images/movie17.jpg",
  },
  {
    name: "Paddington 2",
    genre: ["Comedy", "Family"],
    year: 2017,
    ageRating: 7,
    img: "../images/movie35.jpg",
  },
  {
    name: "Mission: Impossible - The Final Reckoning",
    genre: ["Action", "Thriller"],
    year: 2025,
    ageRating: 13,
    img: "../images/movie9.jpg",
  },
  {
    name: "Elemental",
    genre: ["Animation", "Romance", "Comedy"],
    year: 2023,
    ageRating: 7,
    img: "../images/movie30.jpg",
  },
  {
    name: "Leave the World Behind",
    genre: ["Thriller", "Mystery", "Sci-Fi"],
    year: 2023,
    ageRating: 16,
    img: "../images/movie21.jpg",
  },
  {
    name: "The Batman",
    genre: ["Action", "Crime", "Mystery"],
    year: 2022,
    ageRating: 13,
    img: "../images/movie14.jpg",
  }
];
//----------------------------------------------------------------------------------

// Select elements------------------------------------------------------------------------
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
//-----------------------------------------------------------------------------------------------------------

// Display all movies on load--------------------------------------------------------------------------------------------------------

/*displayMovies(movies);*/

/*const movierecommendations = [
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
];*/

/*document.getElementById('recommendBtn').addEventListener('click', () => {
  alert('Button clicked!');
  recommendMovie();
});*/

/*function recommendMovie() {
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
}*/

/*function filterYear(movieYear, selectedRange) {
  if (selectedRange === "2020") return movieYear >= 2020;
    if (selectedRange === "2010") return movieYear >= 2010 && movieYear <= 2019;
    if (selectedRange === "2000") return movieYear >= 2000 && movieYear <= 2009;
    if (selectedRange === "1990") return movieYear < 2000;
    return false;
}*/
//---------------------------------------------------------------------------------------

//will see later why this isn't working-----------------------------------------------------------
/*window.addEventListener("scroll", function () {
  let navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
      navbar.style.backgroundColor = "black";
      navbar.offsetHeight;
  } else {
    navbar.style.background = "linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5))";
  }
});*/

/*window.addEventListerner("scroll", function () {
  let navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.backgroundColor = "black";
  } else {
    navbar.style.background = "linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5))";
  }
});*/

/*document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("scroll", function () {
      let navbar = document.querySelector(".navbar");
      console.log("Scroll position:", this.window.scrollY);
          if (window.scrollY > 100) {
              navbar.style.background = "black";
          } else {
              navbar.style.background = "linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5))";
      }
  });
});*/

/*function changeNavbar() {
  let scrollPosition = window.scrollY; 
            let maxScroll = document.body.scrollHeight - window.innerHeight; 

            let scrollPercentage = scrollPosition / maxScroll;

            let startColor = [255, 255, 255];
            let endColor = [0, 0, 0];

            let newColor = startColor.map((start, index) => {
                let end = endColor[index];
                return Math.round(start + (end - start) * scrollPercentage);
            });

            document.getElementById("navbar").style.backgroundColor = `rgb(${newColor[0]}, ${newColor[1]}, ${newColor[2]})`;
}*/
//--------------------------------------------------------------------------------------------------------

//recommendation functions----------------------------------------------------------------------------------------

//1.function to check if the input year matches the movie's year
function isYearMatch(movie, inputYear) {
  return movie.year >= inputYear;
}

//2.function to check if the user's age is equal to or more than the movie's age rating
function isAgeAllowed(movie, userAge) {
  return userAge >= movie.ageRating;
}

//3.function to check how many matches we find for the movie genre
function genreMatchCount(movie, userGenres) {
  /*let count = 0;
  for (let genre of movie.genre) {
    if (userGenres.includes(genre)) {
      count++;
    }
  }
  return count;*/
  return movie.genre.filter(genre => userGenres.includes(genre)).length;
}

//4.function to find the best movie recommendation
function getBestMovie(movies, inputYear, userAge, userGenres) {
  let bestMovie = null;
  let maxGenreMatches = 0;

  for (let movie of movies) {
    if (isYearMatch(movie, inputYear) && isAgeAllowed(movie, userAge)) {
      let genreMatches = genreMatchCount(movie, userGenres);
      if (genreMatches > maxGenreMatches) {
        maxGenreMatches = genreMatches;
        bestMovie = movie;
      }
    }
  }
  return bestMovie;
}

//5.function to get recommendation
function getRecommendation(event) {
  event.preventDefault();
  console.log("Form submitted!"); // Debugging line

  const selectedGenres = [...document.querySelectorAll('#recommendation-form input[type="checkbox"]:checked')].map(cb => cb.parentElement.textContent.trim());
  console.log("Selected genres:", selectedGenres); // Debugging line

  const userAge = parseInt(document.getElementById("age-textbox").value);
  console.log("User age:", userAge); // Debugging line

  const selectedYearOption = document.querySelector('#recommendation-form input[name="releaseYear"]:checked');
  console.log("Selected year option:", selectedYearOption ? selectedYearOption.value : "None"); // Debugging line


  let yearLimit = Infinity;
  if (selectedYearOption) {
    const text = selectedYearOption.parentElement.textContent.trim();
    if (text.includes("5 years")) yearLimit = new Date().getFullYear() - 5;
    else if (text.includes("10 years")) yearLimit = new Date().getFullYear() - 10;
    else if (text.includes("25 years")) yearLimit = new Date().getFullYear() - 25;
  }

  const bestMovie = getBestMovie(movies, yearLimit, userAge, selectedGenres);

  const resultDiv = document.getElementById("recommendation-result");
  if (bestMovie) {
    resultDiv.innerHTML = `
      <h3>Recommended Movie: ${bestMovie.name}</h3>
      <img src="${bestMovie.img}" alt="${bestMovie.name}" style="width:200px;">
    `;
  } else {
    resultDiv.innerHTML = `
      <h3>No matching movie found.</h3>
      <p>Try adjusting your preferences, like selecting more genres or a different release year range.</p>
    `;
  }
}
document.getElementById("recommendation-form").addEventListener("submit", getRecommendation);
//----------------------------------------------------------------------------------------------------------------