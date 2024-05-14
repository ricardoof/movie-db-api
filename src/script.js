const inputSearch = document.getElementById('movie-name');
const moviesContainer = document.querySelector('.movies');

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTYwMWQ2ZWNiMDg0Y2JkZTU2YmM4OTUwOGViNDBlNyIsInN1YiI6IjY2M2Y5NTZmOGE4NWVlNzE2YmYzMGI5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tn_MU0S5hTi1t3r9YjmfybUzHlrBgt1r_1RXJqI9h_Y'
    }
};

fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

// Função para buscar filmes
async function getPopularMovies() {
    const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc'
    const fetchResponse = await fetch(url);
    const fetchResponseJSON = await fetchResponse.json();
    const movies = fetchResponseJSON.results;

    movies.forEach(movie => {
        renderMovie(movie);
    });
}

console.log(getPopularMovies());

function renderMovie(movie) {
    const movieElement = document.createElement('div');
    movieElement.innerHTML = `
        <div class="movie">
            <div class="movie-information">
                <div class="movie-image">
                    <img src="${movie.backdrop_path}" alt="Filme ${movie.original_title}">
                </div>
                <div class="movie-text">
                    <h2>${movie.original_title}</h2>
                    <div class="movie-icons">
                        <div class="icon">
                            <img src="src/image/star.png" alt="Star icon">
                            <span>${movie.vote_average}</span>
                        </div>
                        <div class="icon">
                            <img src="src/image/heart.svg" alt="Heart icon">
                            <span>Favoritar</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="movie-description">
                <span>${movie.overview}</span>
            </div>
        </div>`;
    moviesContainer.appendChild(movieElement);
}