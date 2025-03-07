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

  gsap.fromTo(
    ".logo-text",
    { y: 0 }, 
    {
      y: -10,   
      repeat: -1,
      yoyo: true,
      stagger: 0.1, 
      ease: "power1.inOut",
      duration: 0.5
    }
  );


// const arrows = document.querySelectorAll(".arrow");
// const movieLists = document.querySelectorAll(".movie-list");
// const scrollStep = 270; // Adjust based on movie item width

// document.addEventListener("DOMContentLoaded", function () {
//     const arrows = document.querySelectorAll(".arrow");
//     const movieLists = document.querySelectorAll(".movie-list");
//     const scrollStep = 270; // Adjust based on movie item width

//     arrows.forEach((arrow) => {
//         arrow.addEventListener("click", function () {
//             const movieList = this.classList.contains("right-arrow")
//                 ? this.previousElementSibling
//                 : this.nextElementSibling;
            
//             if (this.classList.contains("right-arrow")) {
//                 movieList.style.transform = `translateX(${movieList.computedStyleMap().get("transform")[0].x.value - scrollStep}px)`;
//             } else {
//                 movieList.style.transform = `translateX(${movieList.computedStyleMap().get("transform")[0].x.value + scrollStep}px)`;
//             }
//         });
//     });
// });
// const ball =document.querySelector(".toggle-ball");
// const items=document.querySelectorAll(".container,.movie-list-title,.navbar-container,.sidebar,.left-menu-icon,.toggle");
// ball.addEventListener("click",()=>{
//     items.forEach(item=>{
//         item.classList.toggle("active")
//     })
// })
