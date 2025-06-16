document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/watchlist/list', {
        credentials: 'include'
    })
    .then(res => {
        if (res.status === 401 || res.status === 404) {
            // Redirect to login if unauthorized or not found
            window.location.href = '/login';
            return;
        }
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        if (!data) return; // already redirected or errored out

        const container = document.querySelector('.movie-list-watchlist');
        if (!container) {
            console.error('Container not found');
            return;
        }

        container.innerHTML = '';

        if (!data.watchlist || data.watchlist.length === 0) {
            container.innerHTML = '<p>Your watchlist is empty.</p>';
            return;
        }

        data.watchlist.forEach(movie => {
            if (!movie) return;

            const movieHtml = `
                <div class="movie-list-item-watchlist">
                    <img class="movie-list-item-img" src="${movie.image || ''}" alt="">
                    <label class="label-watchlist">${movie.description || 'No description available'}</label>
                    <div class="movie-list-item-buttons">
                        ${movie.trailer 
                            ? `<button class="movie-list-item-button-watchlist" onclick="window.open('${movie.trailer}', '_blank')">WATCH TRAILER</button>`
                            : `<button class="movie-list-item-button-watchlist" disabled>No Trailer</button>`
                        }
                        <button class="movie-list-item-button-watchlist remove-btn" onclick="removeFromWatchlist('${movie._id}')">Remove from Watchlist</button>
                    </div>
                </div>
            `;
            container.innerHTML += movieHtml;
        });
    })
    .catch(err => {
        console.error("Error fetching watchlist:", err);
        const container = document.querySelector('.movie-list-watchlist');
        if (container) {
            container.innerHTML = '<p>Error loading watchlist.</p>';
        }
    });
});


async function removeFromWatchlist(movieId) {
    if (!movieId) {
        console.error('No movie ID provided');
        return;
    }

    try {
        console.log('Removing movie:', movieId);
        const response = await fetch('/api/watchlist/remove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ movieId })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.success) {
            // Instead of reloading the page, remove the movie element from the DOM
            const movieElement = document.querySelector(`[data-movie-id="${movieId}"]`);
            if (movieElement) {
                movieElement.remove();
            } else {
                window.location.reload();
            }
        } else {
            alert(data.message || 'Failed to remove movie from watchlist');
        }
    } catch (err) {
        console.error('Error removing from watchlist:', err);
        alert('Error removing movie from watchlist: ' + err.message);
    }
}