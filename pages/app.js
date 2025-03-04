// const arrow = document.querySelectorAll(".arrow");
// const movieLists = document.querySelectorAll(".movie-list");
// arrow.forEach((arrow,i)=>{
// arrow.addEventListener("click",()=>{
// movieLists[i].style.transform = `translateX(${movieLists[i].computedStyleMap().get("transform")[0].x.value-270}px)`
// })

// })
const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");
const scrollStep = 270; // Adjust based on movie item width

document.addEventListener("DOMContentLoaded", function () {
    const arrows = document.querySelectorAll(".arrow");
    const movieLists = document.querySelectorAll(".movie-list");
    const scrollStep = 270; // Adjust based on movie item width

    arrows.forEach((arrow) => {
        arrow.addEventListener("click", function () {
            const movieList = this.classList.contains("right-arrow")
                ? this.previousElementSibling
                : this.nextElementSibling;
            
            if (this.classList.contains("right-arrow")) {
                movieList.style.transform = `translateX(${movieList.computedStyleMap().get("transform")[0].x.value - scrollStep}px)`;
            } else {
                movieList.style.transform = `translateX(${movieList.computedStyleMap().get("transform")[0].x.value + scrollStep}px)`;
            }
        });
    });
});