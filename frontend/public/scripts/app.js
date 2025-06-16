// Disappearing navbar after scroll
document.addEventListener('DOMContentLoaded', () => {
  let lastScrollTop = 0;
  const navbar = document.getElementById('navbar');

  if (navbar) {
    window.addEventListener('scroll', () => {
      let scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        navbar.style.top = "-100px"; // hide
      } else {
        navbar.style.top = "0"; // show
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
  }
});


//---------------------------------------------


const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");

if (arrows.length > 0 && movieLists.length > 0) {
  arrows.forEach((arrow, i) => {
    const movieList = movieLists[i];
    if (movieList) {
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
    }
  });
}
  
const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
  ".container,.movie-list-title,.navbar-container,.sidebar,.left-menu-icon,.toggle,.section1,.footer,.recommendations-body,.search-body,.login-body,.watchlist-body,.featured-content,.start_now-body,.footer-body,.about-body,.contact-body,.privacy-body,.terms-body"
);

const recommendationsBody = document.querySelector('.recommendations-body');

if (ball && items.length > 0) {
  window.addEventListener("load", () => {
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark-theme");
      ball.classList.add("active");
      items.forEach((item) => item.classList.add("active"));
      const homeBody = document.querySelector('.home-body, .recommendations-body, .search-body,.login-body,.watchlist-body,.start_now-body,.footer-body');
      if (homeBody) {
        homeBody.style.backgroundImage = "url(../images/background8.jpg)";
      }
      if (recommendationsBody) {
        recommendationsBody.classList.remove("active");
      }
    } else {
      document.body.classList.remove("dark-theme");
      ball.classList.remove("active");
      items.forEach((item) => item.classList.remove("active"));
      const homeBody = document.querySelector('.home-body, .recommendations-body, .search-body,.login-body,.watchlist-body,.start_now-body,.footer-body');
      if (homeBody) {
        homeBody.style.backgroundImage = "url(../images/background9.jpg)";
      }
      if (recommendationsBody) {
        recommendationsBody.classList.add("active");
      }
    }
  });

  ball.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    ball.classList.toggle("active");
    items.forEach((item) => item.classList.toggle("active"));
    const homeBody = document.querySelector('.home-body, .recommendations-body, .search-body,.login-body,.watchlist-body,.start_now-body,.footer-body');
    if (homeBody) {
      if (document.body.classList.contains("dark-theme")) {
        localStorage.setItem("theme", "dark");
        homeBody.style.backgroundImage = "url(../images/background8.jpg)";
        if (recommendationsBody) {
          recommendationsBody.classList.remove("active");
        }
      } else {
        localStorage.setItem("theme", "light");
        homeBody.style.backgroundImage = "url(../images/background9.jpg)";
        if (recommendationsBody) {
          recommendationsBody.classList.add("active");
        }
      }
    }
  });
}

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
//----------------------------------------------------------------------------------------

// Search Functions-----------------------------------------------------------------------
const searchInput = document.getElementById("search");
const movieCardsContainer = document.querySelector(".movie-cards");
const movieTemplate = document.querySelector("[data-user-template]");

// Ensure script runs after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    if (movieCardsContainer) {
        fetchMovies(1);
    }
});

// Function to create movie cards
function displayMovies(movies) {
    if (!movieCardsContainer) {
        console.error('Movie cards container not found');
        return;
    }

    if (!movieTemplate) {
        console.error('Movie template not found');
        return;
    }

    movieCardsContainer.innerHTML = ""; // Clear previous content

    if (!Array.isArray(movies) || movies.length === 0) {
        movieCardsContainer.innerHTML = "<p>No movies found</p>";
        return;
    }

    movies.forEach(movie => {
        try {
            const movieCard = movieTemplate.content.cloneNode(true).firstElementChild;
            if (!movieCard) {
                console.error('Failed to clone movie template');
                return;
            }

            const header = movieCard.querySelector("[data-header]");
            const year = movieCard.querySelector("[data-year]");
            const genre = movieCard.querySelector("[data-genre]");
            const img = movieCard.querySelector("[data-img]");

            if (header) header.textContent = movie.name;
            if (year) year.textContent = movie.year;
            if (genre) genre.textContent = movie.genre;
            if (img) {
                img.src = movie.image;
                img.alt = movie.name;
            }
            
            // Add movie name as identifier
            movieCard.dataset.movieName = movie.name;

            // Add click event listener to the watchlist button
            const watchlistBtn = movieCard.querySelector(".add-to-watchlist-btn");
            if (watchlistBtn) {
                watchlistBtn.addEventListener("click", async (e) => {
                    e.stopPropagation(); // Prevent card click event
                    try {
                        const response = await fetch('/api/watchlist/add', {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json",
                            },
                            credentials: "include",
                            body: JSON.stringify({ movieName: movie.name })
                        });
                        const result = await response.json();
                        if (result.success) {
                            alert("Movie added to your watchlist!");
                        } else {
                            if (result.message === "User not found.") {
                                window.location.href = "/login";
                            } else {
                                alert(result.message || "Failed to add movie.");
                            }
                        }
                    } catch (err) {
                        console.error("Error adding to watchlist:", err);
                        alert("Error adding movie to watchlist.");
                    }
                });
            }

            movieCardsContainer.appendChild(movieCard);
        } catch (err) {
            console.error('Error creating movie card:', err);
        }
    });
}

// Event listener for search input
if (searchInput) {
    searchInput.addEventListener("input", async (e) => {
        const searchValue = e.target.value.toLowerCase();
        try {
            const res = await fetch(`/api/movies/search?q=${encodeURIComponent(searchValue)}`);
            const data = await res.json();
            displayMovies(data);
        } catch (err) {
            console.error("Search error:", err);
            if (movieCardsContainer) {
                movieCardsContainer.innerHTML = "<p>Failed to fetch search results.</p>";
            }
        }
    });
}

//functions to generate the pages with the movies' details
function closeMovieDetails() {
    const movieDetailsBox = document.getElementById('movie-modal');
    if (movieDetailsBox) {
        movieDetailsBox.style.display = 'none';
    }
}

async function showMovieDetails(movieTitle) {
    try {
        const res = await fetch("/api/movies/search");
        const data = await res.json();
        const movie = data.find(m => m.name === movieTitle);

        const modalContent = document.getElementById("modal-content");
        if (!modalContent) {
            console.error('Modal content element not found');
            return;
        }

        if (!movie) {
            modalContent.innerHTML = "<p>Movie not found 😢</p>";
            return;
        }

        const elements = {
            "movie-name": movie.name,
            "movie-img": `/uploads/${movie.image}`,
            "movie-genres": movie.genre.join(", "),
            "movie-year": movie.year,
            "movie-rating": movie.ageRating,
            "movie-description": movie.description
        };

        for (const [id, value] of Object.entries(elements)) {
            const element = document.getElementById(id);
            if (element) {
                if (id === "movie-img") {
                    element.src = value;
                } else {
                    element.innerText = value;
                }
            }
        }

        const movieModal = document.getElementById("movie-modal");
        if (movieModal) {
            movieModal.style.display = "block";
        }
    } catch (err) {
        console.error("Error fetching movie details:", err);
        const modalContent = document.getElementById("modal-content");
        if (modalContent) {
            modalContent.innerHTML = "<p>Something went wrong 😵</p>";
        }
    }
}

let currentPage = 1;

async function fetchMovies(page = 1) {
    try {
        const res = await fetch(`/api/movies/search?page=${page}`);
        const data = await res.json();

        if (data.movies) {
            displayMovies(data.movies);
            updatePaginationButtons(data.currentPage, data.totalPages);
        } else {
            displayMovies(data);
        }
    } catch (err) {
        console.error("Error fetching paginated movies:", err);
        if (movieCardsContainer) {
            movieCardsContainer.innerHTML = "<p>Error loading movies. Please try again later.</p>";
        }
    }
}

// Add pagination event listeners
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

if (nextBtn) {
    nextBtn.addEventListener("click", () => {
        currentPage++;
        fetchMovies(currentPage);
    });
}

if (prevBtn) {
    prevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            fetchMovies(currentPage);
        }
    });
}

function updatePaginationButtons(currentPage, total) {
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
    }
    if (nextBtn) {
        nextBtn.disabled = currentPage === total;
    }
}
//----------------------------------------------------------------------------------------------------------------

//toggle password function
function togglePassword(fieldId, icon) {
  const input = document.getElementById(fieldId);
  const isPassword = input.type === 'password';
  input.type = isPassword ? 'text' : 'password';
  icon.classList.toggle('fa-eye-slash', isPassword);
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

function showAdminMovieForm(formType) {
  const forms = ['add', 'remove', 'update'];
  forms.forEach(type => {
    const form = document.getElementById(`${type}-form`);
    form.style.display = (type === formType) ? 'block' : 'none';
  });
}

