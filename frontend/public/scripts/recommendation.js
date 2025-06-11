document.getElementById("get-recommendation-button").addEventListener("click", async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
        alert("You need to be logged in to get a movie recommendation");
        return;
    }

    const genreInputs = document.querySelectorAll('input[name="genre"]:checked');
    const selectedGenres = Array.from(genreInputs).map(input => input.value);

    if (selectedGenres.length < 2) {
        alert("Please select at least two genres");
        return;
    }

    const age = document.getElementById("age-textbox").value;
    if (!age || age <= 0) {
        alert("PLease enter a valid age");
        return;
    }

    const releaseYear = document.querySelector('input[name="releaseYear"]:checked')?.value;
    if (!releaseYear) {
        alert("Please pick a release year option");
        return;
    }

    const preferences = {
        genres: selectedGenres,
        ageRating: parseInt(age),
        releaseYear: releaseYear
    };

    try {
        const response = await fetch("/api/recommendation/start_now", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(preferences)
        });

        const data = await response.json();

        if (data.success) {
            const movie = data.movie;
            console.log("Recommended Movie:", movie);

            //update overlay content
            document.getElementById("recommended-movie-name").textContent = movie.name || "No name given";
            document.getElementById("recommended-movie-img").src = movie.image || "";
            document.getElementById("recommended-movie-img").alt = movie.name || "Movie poster";
            document.getElementById("recommended-movie-description").textContent = movie.description || "No description available";

            let trailerURL = movie.trailer || "";
            if (trailerURL.includes("watch?v=")) {
                trailerURL = trailerURL.replace("watch?v=", "embed/");
            }
            const trailerContainer = document.getElementById("trailer-container");
            trailerContainer.innerHTML = movie.trailer 
            ? `<iframe width="300" height="200" src="${trailerURL}" frameborder="0" allowfullscreen></iframe>` 
            : "";

            document.getElementById("movie-overlay").style.display = "flex";
        } else {
            console.log(data.message || "Failed to get recommendation");
        }
    } catch (error) {
        console.error("Error fetching recommendation", error)
    }
});

document.querySelector(".close-btn").addEventListener("click", () => {
    document.getElementById("movie-overlay").style.display = "none";
    document.getElementById("recommended-movie-name").textContent = "";
    document.getElementById("recommended-movie-img").src = "";
    document.getElementById("recommended-movie-description").textContent = "";
    document.getElementById("trailer-container").innerHTML = "";
    document.getElementById("recommendation-form").reset();
});