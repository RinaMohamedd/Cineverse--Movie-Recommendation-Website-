document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/watchlist/list', {
        credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
        const container = document.querySelector('.movie-list-watchlist');
        container.innerHTML = '';
        if (!data.watchlist || data.watchlist.length === 0) {
            container.innerHTML = '<p>Your watchlist is empty.</p>';
            return;
        }
        data.watchlist.forEach(movie => {
            container.innerHTML += `
                <div class="movie-list-item-watchlist">
                    <img class="movie-list-item-img" src="${movie.image}" alt="">
                    <label class="label-watchlist">${movie.description || 'No description available'}</label>
                    ${
                        movie.trailer
                        ? `<button class="movie-list-item-button-watchlist" onclick="window.open('${movie.trailer}', '_blank')">WATCH TRAILER</button>`
                        : `<button class="movie-list-item-button-watchlist" disabled>No Trailer</button>`
                    }
                </div>
            `;
        });
    })
    .catch(err => {
        console.error("Error fetching watchlist:", err);
        document.querySelector('.movie-list-watchlist').innerHTML = '<p>Error loading watchlist.</p>';
    });
});