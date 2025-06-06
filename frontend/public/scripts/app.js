// Disappearing navbar after scroll
document.addEventListener('DOMContentLoaded', () => {
  let lastScrollTop = 0;
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      navbar.style.top = "-100px"; // hide
    } else {
      navbar.style.top = "0"; // show
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
});

//---------------------------------------------


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
  ".container,.movie-list-title,.navbar-container,.sidebar,.left-menu-icon,.toggle,#profile"
);

window.addEventListener("load", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
    ball.classList.add("active");
    items.forEach((item) => item.classList.add("active"));
  } else {
    document.body.classList.remove("dark-theme");
    ball.classList.remove("active");
    items.forEach((item) => item.classList.remove("active"));
  }
});

ball.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  ball.classList.toggle("active");
  items.forEach((item) => item.classList.toggle("active"));
  if (document.body.classList.contains("dark-theme")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

// Movie data (manually added)----------------------------------------------
const movies = [
  {
    name: "Joker: Folie à Deux",
    genre: ["Musical", " Crime"],
    year: 2024,
    ageRating: 18,
    img: "../images/movie2.jpg",
    trailer: "https://www.youtube.com/watch?v=zAGVQLHvwOY",
    description: "Arthur Fleck (Joaquin Phoenix) forms a twisted bond with Lee Quinzel (Lady Gaga) in Arkham Asylum, blending psychological drama with musical elements."
  },
  {
    name: "Peter Pan's Neverland Nightmare",
    genre: ["Horror", " Mystery", " Thriller"],
    year: 2025,
    ageRating: 18,
    img: "../images/movie11.jpg",
    trailer: "https://www.youtube.com/watch?v=IpvJ67xxJQA",
    description: "It is a dark reimagining where Peter Pan becomes a tyrant in a twisted Neverland, with Tinerbell portrayed as a drug addict."
  },
  {
    name: "Snow White",
    genre: ["Fantasy", " Musical"],
    year: 2025,
    ageRating: 10,
    img: "../images/movie6.jpg",
    trailer: "https://www.youtube.com/watch?v=iV46TJKL8cU",
    description: "The live-action adaptation where Snow White (Rachel Zegler) embarks on a journey to become a fearless leader, confronting her stepmother, teh Evil Queen (Gal Gadot)."
  },
  {
    name: "Mufasa: The Lion King",
    genre: ["Animation", " Family", " Drama"],
    year: 2024,
    ageRating: 10,
    img: "../images/movie3.jpg",
    trailer: "https://www.youtube.com/watch?v=o17MF9vnabg",
    description: "A prequel exploring Mufasa's rise from orphaned cub to Pride Lands' king, highlighting his bond with brother Taka (later Scar)."
  },
  {
    name: "Wicked: Part One",
    genre: ["Musical", " Fantasy", " Drama"],
    year: 2024,
    ageRating: 10,
    img: "../images/movie7.jpg",
    trailer: "https://www.youtube.com/watch?v=6COmYeLsz4c",
    description: "A musical fantasy exploring the origins of Elphaba, the future Wicked Witch of the West, and her complex friendship with Glinda in the Land of Oz."
  },
  {
    name: "28 Years Later",
    genre: ["Horror", " Thriller"],
    year: 2025,
    ageRating: 18,
    img: "../images/movie8.jpg",
    trailer: "https://www.youtube.com/watch?v=mcvLKldPM08",
    description: "A sequel to 28 Days Later and 28 Weeks Later, this film explores the aftermath of the rage virus decades later, as new survivors face a terrifying resurgence of the infection."
  },
  {
    name: "Mission: Impossible - The Final Reckoning",
    genre: ["Action", " Adventure", " Thriller"],
    year: 2025,
    ageRating: 13,
    img: "../images/movie9.jpg",
    trailer: "https://www.youtube.com/watch?v=NOhDyUmT9z0",
    description: "Following Ethan Hunt (Tom Cruise) as he confronts the aftermath of battling a rogue A.I. known as the Entity, leading to high-stakes missions across land, sea, and air."
  },
  {
    name: "Mickey 17",
    genre: ["Sci-Fi", " Comedy", " Adventure"],
    year: 2025,
    ageRating: 17,
    img: "../images/movie10.jpg",
    trailer: "https://www.youtube.com/watch?v=osYpGSz_0i4",
    description: "A is a sci-fi film where Mickey (Robert Pattinson), a clone worker on a space mission, returns to find he's been replaced, leading to a secret struggle for survival."
  },
  {
    name: "John Wick: Chapter 4",
    genre: ["Action", " Thriller", " Crime"],
    year: 2023,
    ageRating: 18,
    img: "../images/movie12.jpg",
    trailer: "https://www.youtube.com/watch?v=qEVUtrk8_B4",
    description: "John Wick uncovers a way to defeat the High Table but must face powerfuk new enemies across the globe."
  },
  {
    name: "Fast X",
    genre: ["Action", " Adventure"],
    year: 2023,
    ageRating: 13,
    img: "../images/movie13.jpg",
    trailer: "https://www.youtube.com/watch?v=eoOaKN4qCKw",
    description: "Dom Toretto and his family are hunted by Dante Reyes, who seeks revenge for his father's downfall."
  },
  {
    name: "The Batman",
    genre: ["Action", " Adventure", " Crime", " Drama"],
    year: 2022,
    ageRating: 13,
    img: "../images/movie14.jpg",
    trailer: "https://www.youtube.com/watch?v=mqqft2x_Aa4",
    description: "Btaman investigates a series of cryptic murders by the Riddler, uncovering corruption in Gotham."
  },
  {
    name: "Top Gun: Maverick",
    genre: ["Action", " Adventure"],
    year: 2022,
    ageRating: 13,
    img: "../images/moviee15.jpg",
    trailer: "https://www.youtube.com/watch?v=qSqVVswa420",
    description: "Maverick returns to train elite pilots for a high-stakes mission while confronting his past."
  },
  {
    name: "Spider-Man: No Way Home",
    genre: ["Action", " Adventure", " Fantasy"],
    year: 2021,
    ageRating: 13,
    img: "../images/movie16.png",
    trailer: "https://www.youtube.com/watch?v=JfVOs4VSpmA",
    description: "A spell gone wrong opens the multiverse, bringing past Spider-Man villains into Peter Parker's world."
  },
  {
    name: "Avengers: Endgame",
    genre: ["Action", " Adventure", " Drama", " Fantasy", " Sci-Fi"],
    year: 2019,
    ageRating: 13,
    img: "../images/movie17.jpg",
    trailer: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
    description: "The Avengers unite for a final battle to undo Thanos' snap and restore the universe."
  },
  {
    name: "Mad Max: Fury Road",
    genre: ["Action", " Adventure", " Sci-Fi"],
    year: 2015,
    ageRating: 17,
    img: "../images/movie18.jpg",
    trailer: "https://www.youtube.com/watch?v=hEJnMQG9ev8",
    description: "In a post-apocalyptic wasteland, Max joins forces with Furiosa to escape a tyrannical waelord."
  },
  {
    name: "Deadpool & Wolverine",
    genre: ["Action", " Adventure", " Comedy"],
    year: 2024,
    ageRating: 17,
    img: "../images/movie19.jpg",
    trailer: "https://www.youtube.com/watch?v=73_1biulkYk",
    description: "Deadpool teams up with a reluctant Wolverine to take on a new multiversal threat."
  },
  {
    name: "Oppenheimer",
    genre: ["Thriller", " Drama"],
    year: 2023,
    ageRating: 17,
    img: "../images/movie20.jpg",
    trailer: "https://www.youtube.com/watch?v=uYPbbksJxIg",
    description: "J.Robert Oppenheimer leads the creation of the atomic bomb, facing the weight of its devastating impact."
  },
  {
    name: "Leave the World Behind",
    genre: ["Thriller", " Drama", " Mystery", " Sci-Fi"],
    year: 2023,
    ageRating: 17,
    img: "../images/movie21.jpg",
    trailer: "https://www.youtube.com/watch?v=cMVBi_e8o-Y",
    description: "A family's vacation turns eerie as a mysterious blackout hints at a global catastrophe."
  },
  {
    name: "Knock at the Cabin",
    genre: ["Horror", " Mystery", " Thriller"],
    year: 2023,
    ageRating: 17,
    img: "../images/movie22.jpg",
    trailer: "https://www.youtube.com/watch?v=0wiBHEACNHs",
    description: "A family is forced to make an unthinkable choice to prevent an impending apocalypse."
  },
  {
    name: "Missing",
    genre: ["Mystery", " Thriller"],
    year: 2023,
    ageRating: 13,
    img: "../images/moviee23.jpg",
    trailer: "https://www.youtube.com/watch?v=LVAsRO4QxXU",
    description: "A tech-savvy teen uses online tools to track down her mother, who vanished on vacation."
  },
  {
    name: "The Call",
    genre: ["Mystery", " Thriller", " Horror"],
    year: 2020,
    ageRating: 17,
    img: "../images/movie24.jpg",
    trailer: "https://www.youtube.com/watch?v=hxkKeniT-0Q",
    description: "A woman connects with a stranger from the past, only to realize she's a dangerous killer."
  },
  {
    name: "The Black Phone",
    genre: ["Mystery", " Thriller", " Horror"],
    year: 2022,
    ageRating: 17,
    img: "../images/movie25.jpg",
    trailer: "https://www.youtube.com/watch?v=3eGP6im8AZA",
    description: "A kidnapped boy receives calls from past victims on a mysterious disconnected phone."
  },
  {
    name: "The Boy",
    genre: ["Mystery", " Thriller", " Horror"],
    year: 2016,
    ageRating: 13,
    img: "../images/movie26.jpg",
    trailer: "https://www.youtube.com/watch?v=XGbB9UQ6r1g",
    description: "A nanny is hired to care for a lifelike doll, but eerie events suggest it may be alive."
  },
  {
    name: "Nope",
    genre: ["Mystery", " Sci-Fi", " Horror"],
    year: 2022,
    ageRating: 17,
    img: "../images/movie27.jpg",
    trailer: "https://www.youtube.com/watch?v=JtK1dLwCABg",
    description: "Siblings running a horse ranch discover a mysterious, otherworldly presence in the sky."
  },
  {
    name: "Inside Out 2",
    genre: ["Animation", " Comedy", " Drama"],
    year: 2024,
    ageRating: 7,
    img: "../images/movie28.jpg",
    trailer: "https://www.youtube.com/watch?v=LEjhY15eCx0",
    description: "Riley's mind welcomes new emotions, shaking up her journey through teenage life."
  },
  {
    name: "Wish",
    genre: ["Animation", " Adventure", " Fantasy", " Family"],
    year: 2023,
    ageRating: 10,
    img: "../images/movie29.jpg",
    trailer: "https://www.youtube.com/watch?v=oyRxxpD3yNw",
    description: "A young girl's wish brings a magical star to life, leading to an adventure to save her kingdom."
  },
  {
    name: "Elemental",
    genre: ["Animation", " Romance", " Comedy"],
    year: 2023,
    ageRating: 7,
    img: "../images/moviee30.jpg",
    trailer: "https://www.youtube.com/watch?v=hXzcyx9V0xw",
    description: "In a city where elements don't mix, a fiery girl and a watery guy form an unlikely bond."
  },
  {
    name: "Puss in Boots: The Last Wish",
    genre: ["Animation", " Adventure", " Fantasy"],
    year: 2022,
    ageRating: 10,
    img: "../images/movie31.jpg",
    trailer: "https://www.youtube.com/watch?v=RqrXhwS33yc",
    description: "Puss embarks on a daring quest to restore his nine lives before time runs out."
  },
  {
    name: "Encanto",
    genre: ["Animation", " Fantasy", " Family"],
    year: 2021,
    ageRating: 8,
    img: "../images/movie32.jpg",
    trailer: "https://www.youtube.com/watch?v=CaimKeDcudo",
    description: "A girl in a magical family discovers she's the only one without powers and must eave their home."
  },
  {
    name: "Luca",
    genre: ["Animation", " Adventure", " Comedy"],
    year: 2021,
    ageRating: 8,
    img: "../images/movie33.jpg",
    trailer: "https://www.youtube.com/watch?v=0hgHY9k-44U",
    description: "A young sea monster experiences a life-changing summer in a charming Italian town."
  },
  {
    name: "Coco",
    genre: ["Animation", " Adventure", " Family", " Fantasy", " Musical"],
    year: 2017,
    ageRating: 8,
    img: "../images/moviee34.jpg",
    trailer: "https://www.youtube.com/watch?v=xlnPHQ3TLX8",
    description: "A boy travels to the Land of the Dead to uncover his family's hidden past and love for music."
  },
  {
    name: "Paddington 2",
    genre: ["Comedy", " Family", " Adventure"],
    year: 2017,
    ageRating: 8,
    img: "../images/movie35.jpg",
    trailer: "https://www.youtube.com/watch?v=sw7RElt-SvE",
    description: "Paddington goes on a fun adventure to clear his name after being wrongly accused of theft."
  }
];
//----------------------------------------------------------------------------------

function getRecommendation(event) {
  event.preventDefault();
  const selectedGenres = Array.from(document.querySelectorAll('input[name="genre"]:checked'))
      .map(checkbox => checkbox.value);
  const age = parseInt(document.getElementById('age-textbox').value);

  const releaseYear = document.querySelector('input[name="releaseYear"]:checked')?.value;

  const filteredMovies = movies.filter(movie => {
      const genreMatch = selectedGenres.some(genre => movie.genre.includes(genre));

      let yearMatch = false;
      if (releaseYear === "any") {
          yearMatch = true;
      } else {
          const currentYear = new Date().getFullYear();
          const yearDiff = currentYear - movie.year;
          yearMatch = yearDiff <= parseInt(releaseYear);
      }
      const ageMatch = age >= movie.ageRating;

      return genreMatch && yearMatch && ageMatch;
  });

  if (filteredMovies.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredMovies.length);
    const recommendedMovie = filteredMovies[randomIndex];
    displayRecommendedMovie(recommendedMovie);
  } else {
      alert("No movie found based on your preferences.");
  }
}


function displayRecommendedMovie(movie) {
  const overlay = document.getElementById('movie-overlay');
  const movieName = document.getElementById('recommended-movie-name');
  const movieImg = document.getElementById('recommended-movie-img');
  const movieDesc = document.getElementById('recommended-movie-description');
  const videoURL = movie.trailer;
  const embedURL = videoURL.replace("watch?v=", "embed/");
  const movieTrailer = document.getElementById('trailer-container').innerHTML =
  '<iframe width="560" height="315" src="' + embedURL + '" frameborder="0"></iframe>';
  movieName.textContent = movie.name;
  movieImg.src = movie.img;
  movieDesc.textContent = movie.description;

  overlay.style.display = "block";
  document.getElementById("recommendation-form").reset()
}

function closeOverlay() {
  const overlay = document.getElementById('movie-overlay');
  overlay.style.display = "none";
}

// Select elements------------------------------------------------------------------------
const searchInput = document.getElementById("search");
const movieCardsContainer = document.querySelector(".movie-cards"); // FIXED: Use class selector
const movieTemplate = document.querySelector("[data-user-template]");

// Ensure script runs after DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    displayMovies(movies);
});

// Function to create movie cards
function displayMovies(movies) {
  movieCardsContainer.innerHTML = ""; // Clear previous content

  movies.forEach(movie => {
      const movieCard = movieTemplate.content.cloneNode(true).firstElementChild; // FIXED: Get first child
      movieCard.querySelector("[data-header]").textContent = movie.name;
      movieCard.querySelector("[data-year]").textContent = movie.year;
      movieCard.querySelector("[data-genre]").textContent = movie.genre;
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

//Login Validation
/*const form = document.getElementById('form');
  const username = document.getElementById('username');
  const password = document.getElementById('password');

  const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
  }

  const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
  };

  const validateInputs = () => {
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();
    let isValid = true;

    if(usernameValue === ''){
      setError(username, 'Username is required!');
      isValid = false;
    } else {
      setSuccess(username);
    }

    if(passwordValue === '') {
      setError(password, 'Password is required!');
      isValid = false; 
    } else if (passwordValue.length < 8) {
      setError(password, 'Password must be at least 8 characters!');
      isValid = false;
    } else {
      setSuccess(password);
    }

    if (isValid) {
      window.location.href = "index.html";
    }

    form.addEventListener('submit', e => {
      e.preventDefault();
  
      validateInputs();
    });

  };
*/
//--------------------------------------------------------------------------------------------------------




// //recommendation functions----------------------------------------------------------------------------------------

// //1.function to check if the input year matches the movie's year
// function isYearMatch(movie, inputYear) {
//   return movie.year >= inputYear;
// }

// //2.function to check if the user's age is equal to or more than the movie's age rating
// function isAgeAllowed(movie, userAge) {
//   return userAge >= movie.ageRating;
// }

// //3.function to check how many matches we find for the movie genre
// function genreMatchCount(movie, userGenres) {
//   /*let count = 0;
//   for (let genre of movie.genre) {
//     if (userGenres.includes(genre)) {
//       count++;
//     }
//   }
//   return count;*/
//   return movie.genre.filter(genre => userGenres.includes(genre)).length;
// }

// //4.function to find the best movie recommendation
// function getBestMovie(movies, inputYear, userAge, userGenres) {
//   let bestMovie = null;
//   let maxGenreMatches = 0;

//   for (let movie of movies) {
//     if (isYearMatch(movie, inputYear) && isAgeAllowed(movie, userAge)) {
//       let genreMatches = genreMatchCount(movie, userGenres);
//       if (genreMatches > maxGenreMatches) {
//         maxGenreMatches = genreMatches;
//         bestMovie = movie;
//       }
//     }
//   }
//   return bestMovie;
// }

// //5.function to show the movie overlay
// function showOverlay(bestMovie) {
//   const overlay = document.getElementById('movie-overlay');
//   const movieName = document.getElementById('recommended-movie-name');
//   const movieImg = document.getElementById('recommended-movie-img');
//   const movieDescription = document.getElementById('recommended-movie-description');
//   movieName.textContent = bestMovie.name;
//   movieImg.src = bestMovie.img;
//   movieDescription.textContent = bestMovie.description;
//   overlay.style.display = 'flex';
// }

// //6.function to close the overlay
// function closeOverlay() {
//   const overlay = document.getElementById('movie-overlay');
//   overlay.style.display = 'none';
// }

// //7.function to get recommendation
// function getRecommendation(event) {
//   event.preventDefault();
//   console.log("Form submitted!"); // Debugging line

//   const selectedGenres = [...document.querySelectorAll('#recommendation-form input[type="checkbox"]:checked')].map(cb => cb.parentElement.textContent.trim());
//   console.log("Selected genres:", selectedGenres); // Debugging line

//   const userAge = parseInt(document.getElementById("age-textbox").value);
//   console.log("User age:", userAge); // Debugging line

//   const selectedYearOption = document.querySelector('#recommendation-form input[name="releaseYear"]:checked');
//   console.log("Selected year option:", selectedYearOption ? selectedYearOption.value : "None"); // Debugging line


//   let yearLimit = Infinity;
//   /*if (selectedYearOption) {
//     const text = selectedYearOption.parentElement.textContent.trim();
//     if (text.includes("5 years")) yearLimit = new Date().getFullYear() - 5;
//     else if (text.includes("10 years")) yearLimit = new Date().getFullYear() - 10;
//     else if (text.includes("25 years")) yearLimit = new Date().getFullYear() - 25;
//   }*/
//   if (selectedYearOption) {
//     const value = selectedYearOption.value;
//     if (value === "5") yearLimit = new Date().getFullYear() - 5;
//     else if (value === "10") yearLimit = new Date().getFullYear() - 10;
//     else if (value === "25") yearLimit = new Date().getFullYear() - 25;
//     // No need to change yearLimit for "any", as it's already set to Infinity
//   }


//   const bestMovie = getBestMovie(movies, yearLimit, userAge, selectedGenres);

//   if (bestMovie) {
//     showOverlay(bestMovie);
//   } else {
//     alert("No matching movie found. Try adjusting your preferences.");
//   }
//   document.getElementById("recommendation-form").reset();

//   /*const resultDiv = document.getElementById("recommendation-result");
//   if (bestMovie) {
//     resultDiv.innerHTML = `
//       <h3>Recommended Movie: ${bestMovie.name}</h3>
//       <img src="${bestMovie.img}" alt="${bestMovie.name}" style="width:200px;">
//     `;
//   } else {
//     resultDiv.innerHTML = `
//       <h3>No matching movie found.</h3>
//       <p>Try adjusting your preferences, like selecting more genres or a different release year range.</p>
//     `;
//   }*/
// }
// document.getElementById("recommendation-form").addEventListener("submit", getRecommendation);
//-------------------------------------------------------------------------
    
//toggle password function
function togglePassword(fieldId, icon) {
  const input = document.getElementById(fieldId);
  const isPassword = input.type === 'password';
  input.type = isPassword ? 'text' : 'password';
  icon.classList.toggle('fa-eye-slash', isPassword);
 }
//----------------------------------------------------------------------------------------------------------------

//functions to generate the pages with the movies' details
function closeMovieDetails() {
  const movieDetailsBox = document.getElementById('movie-modal');
  movieDetailsBox.style.display = 'none';
}

function showMovieDetails(movieTitle) {
  const movie = movies.find(m => m.name === movieTitle);
  if (!movie) {
    document.getElementById("modal-content").innerHTML = "<p>Movie not found 😢</p>";
    return;
  }
  document.getElementById("movie-name").innerText = movie.name;
  document.getElementById("movie-img").src = movie.img;
  document.getElementById("movie-genres").innerText = movie.genre.join(", ");
  document.getElementById("movie-year").innerText = movie.year;
  document.getElementById("movie-rating").innerText = movie.ageRating;
  document.getElementById("movie-description").innerText = movie.description;
  document.getElementById("movie-modal").style.display = "block";
}

let prevScrollPos = window.scrollY;
window.addEventListener("scroll", function () {
  let currentScrollPos = this.window.scrollY;
  const navbar = document.querySelector(".navbar");
  if (prevScrollPos > currentScrollPos) {
    navbar.style.top = "0";
  } else {
    navbar.style.top = "-50px";
  }
  prevScrollPos = currentScrollPos;
});

/*let prevScrollPos = window.scrollY;
window.addEventListener("scroll", function () {
  let currentScrollPos = this.window.scrollY;
  const navbar = document.querySelector(".navbar-container");
  if (prevScrollPos > currentScrollPos) {
    navbar.style.top = "0";
  } else {
    navbar.style.top = "-50px";
  }
  prevScrollPos = currentScrollPos;
});*/