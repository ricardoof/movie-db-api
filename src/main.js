import apiKey from "./config.js";

const moviesContainer = document.querySelector('.movies');
const input = document.getElementById('movie-name');
const searchButton = document.querySelector('.searchIcon');
const showFavorites = document.getElementById('onlyFavorites');

fetch('/apiKey')
    .then(response => response.json())
    .then(data => {
        const apiKey = data.apiKey;
        const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=1`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Manipular os dados da API
                console.log(data);
            })
            .catch(error => console.error('Erro:', error));
    })
    .catch(error => console.error('Erro ao buscar a API Key:', error));


// Consome a api e retorna os filmes populares
async function getPopularMovies() {
    try {
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=1`;
        const fetchResponse = await fetch(url);
        const { results } = await fetchResponse.json();

        return results;
    } catch (error) {
        moviesContainer.innerHTML = `<h2 class="conectError">Erro ao carregar os filmes</h2>`;
    }
}

// Renderiza os filmes na tela inicial
window.onload = async function () {
    const movies = await getPopularMovies();
    movies.forEach(movie => renderMovie(movie));
}

//Busca o filme apertando enter
input.addEventListener('keyup', (event) => {
    if (event.keyCode == 13) {
        searchMovie();
    }
});

//Busca o filme clicando no botão de pesquisa
searchButton.addEventListener('click', searchMovie);

// Função que busca o filme na api
function searchMovie() {
    const title = input.value;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=pt-BR&query=${title}&page=1`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            moviesContainer.innerHTML = "";
            data.results.forEach(movie => renderMovie(movie));
            if (data.results.length === 0) {
                moviesContainer.innerHTML = `<h2 class="movieNotFind">Nenhum filme encontrado</h2>`;
            }
        })
}

function favoriteButtonPressed(event, movie) {
    const favoriteState = {
        favorited: 'src/image/heart-fill.svg',
        notFavorited: 'src/image/heart.svg'
    }
    if (event.target.src.includes(favoriteState.notFavorited)) {
        event.target.src = favoriteState.favorited;
        saveToLocalStorage(movie);
    } else {
        event.target.src = favoriteState.notFavorited;
        removeFromLocalStorage(movie.id);
    }
}

function getFavoriteMovies() {
    return JSON.parse(localStorage.getItem('favoriteMovies'))
}

function saveToLocalStorage(movie) {
    const movies = getFavoriteMovies() || [];
    movies.push(movie);
    const moviesJSON = JSON.stringify(movies);
    localStorage.setItem('favoriteMovies', moviesJSON);
}

function checkMovieIsFavorited(id) {
    const movies = getFavoriteMovies() || []
    return movies.find(movie => movie.id == id)
}


function removeFromLocalStorage(id) {
    const movies = getFavoriteMovies() || [];
    const findMovie = movies.find(movie => movie.id == id);
    const newMovies = movies.filter(movie => movie.id !== findMovie.id);
    localStorage.setItem('favoriteMovies', JSON.stringify(newMovies));
}

showFavorites.addEventListener('click', () => {
    if (showFavorites.checked) {
        const movies = getFavoriteMovies();
        moviesContainer.innerHTML = "";
        movies.forEach(movie => renderMovie(movie));
    } else {
        moviesContainer.innerHTML = "";
        getPopularMovies().then(movies => movies.forEach(movie => renderMovie(movie)));
    }
});

function renderMovie(movie) {
    const { id, title, poster_path, vote_average, release_date, overview } = movie;
    const isFavorited = checkMovieIsFavorited(id);
    const year = new Date(release_date).getFullYear();

    const movieElement = document.createElement('div'); // Criar um elemento temporário
    movieElement.innerHTML = `
        <div class="movie">
            <div class="movie-information">
                <div class="movie-image">
                    <img src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="Filme title">
                </div>
                <div class="movie-text">
                    <h2 class="movie-title">${title} (${year})</h2>
                    <div class="movie-icons">
                        <div class="icon">
                            <img src="src/image/star.png" alt="Star icon">
                            <span>${vote_average}</span>
                        </div>
                        <div class="icon favorite">
                            <img src="${isFavorited ? 'src/image/heart-fill.svg' : 'src/image/heart.svg'}" alt="Heart icon">
                            <span>Favoritar</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="movie-description">
                <span>${overview}</span>
            </div>
        </div>`;

    const favoriteIcon = movieElement.querySelector('.movie .favorite');
    if (favoriteIcon) {
        favoriteIcon.addEventListener('click', (event) => favoriteButtonPressed(event, movie));
    } else {
        console.error('Elemento do ícone favorito não encontrado no elemento do filme!');
    }
    moviesContainer.appendChild(movieElement);
}
