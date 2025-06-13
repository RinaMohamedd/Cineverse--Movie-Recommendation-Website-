document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/watchlist/list', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
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
                    <label class="label-watchlist">${movie.description}</label>
                    <button class="movie-list-item-button-watchlist">WATCH</button>
                </div>
            `;
        });
    })
    .catch(err => {
        document.querySelector('.movie-list-watchlist').innerHTML = '<p>Error loading watchlist.</p>';
    });
});