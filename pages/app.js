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

// ball.addEventListener("click", () => {
//   items.forEach((item) => {
//     item.classList.toggle("active");
//   });
//   ball.classList.toggle("active");
// });

  // gsap.fromTo(
  //   ".logo-text",
  //   { y: 0 }, 
  //   {
  //     y: -10,   
  //     repeat: -1,
  //     yoyo: true,
  //     stagger: 0.1, 
  //     ease: "power1.inOut",
  //     duration: 0.5
  //   }
  // );

  const form = document.getElementById('form');
  const username = document.getElementById('username');
  const password = document.getElementById('password');

  form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
  });

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
  };

