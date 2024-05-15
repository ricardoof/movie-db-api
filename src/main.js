import { apiKey } from "./key.js";

const moviesContainer = document.querySelector('.movies');
const searchIcon = document.querySelector('.searchIcon');

// Consome a api e retorna os filmes populares
async function getPopularMovies() {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=1`;
    const fetchResponse = await fetch(url);
    const { results } = await fetchResponse.json();

    return results;
}

// Renderiza os filmes na tela inicial
window.onload = async function () {
    const movies = await getPopularMovies();
    movies.forEach(movie => renderMovie(movie));
}

// Evento de clique no ícone de pesquisa
searchIcon.addEventListener('click', () => {
    const searchInput = document.getElementById('movie-name').value;
    searchMovie(searchInput);
})

// Função que busca filmes na api pelo nome digitado no input
function searchMovie(searchInput) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=pt-BR&query=${searchInput}&page=1`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            moviesContainer.innerHTML = "";
            data.results.forEach(movie => renderMovie(movie));
        })
}

// Função que renderiza cada filme na tela
function renderMovie(movie) {
    const { title, poster_path, vote_average, release_date, overview } = movie;
    const isFavorite = false;
    const year = new Date(release_date).getFullYear();
    if (overview === "") {
        movie.overview = "Sinopse não disponível";
    }

    moviesContainer.innerHTML += `
        <div class="movie">
            <div class="movie-information">
                <div class="movie-image">
                    <img src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="Filme ${title}">
                </div>
                <div class="movie-text">
                    <h2 class="movie-title">${title} (${year})</h2>
                    <div class="movie-icons">
                        <div class="icon">
                            <img src="src/image/star.png" alt="Star icon">
                            <span>${vote_average}</span>
                        </div>
                        <div class="icon">
                            <img src="src/image/heart.svg" alt="Heart icon">
                            <span>Favoritar</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="movie-description">
                <span>${overview}</span>
            </div>
        </div>`;
}