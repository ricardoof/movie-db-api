const moviesContainer = document.querySelector('.movies');

function renderMovie(movie) {
    const movieElement = document.createElement('div');
    movieElement.innerHTML = `
    <div class="movie">
        <div class="movie-information">
            <div class="movie-image">
                <img src="src/image/Image.png" alt="">
            </div>
            <div class="movie-text">
                <h2>${movie.title}</h2>
                <div class="movie-icons">
                    <div class="icon">
                        <img src="src/image/star.png" alt="Star icon">
                        <span>${movie.rating}</span>
                    </div>
                    <div class="icon">
                        <img src="src/image/heart.svg" alt="Heart icon">
                        <span>Favoritar</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="movie-description">
            <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book.
            </span>
        </div>
    </div>`;

    moviesContainer.appendChild(movieElement);
}

const movies = [
    {
        image: 'https://img.elo7.com.br/product/original/3FBA809/big-poster-filme-batman-2022-90x60-cm-lo002-poster-batman.jpg',
        title: 'Batman',
        rating: 9.2,
        year: 2022,
        description: 'Descrição do filme',
        isFavorited: true,
    },
    {
        image: 'https://upload.wikimedia.org/wikipedia/pt/thumb/9/9b/Avengers_Endgame.jpg/250px-Avengers_Endgame.jpg',
        title: 'Avengers',
        rating: 9.2,
        year: 2019,
        description: 'Descrição do filme',
        isFavorited: false,
    },
    {
        image: 'https://upload.wikimedia.org/wikipedia/en/1/17/Doctor_Strange_in_the_Multiverse_of_Madness_poster.jpg',
        title: 'Doctor Strange',
        rating: 9.2,
        year: 2022,
        description: 'Descrição do filme',
        isFavorited: false,
    },
]

movies.forEach(movie => renderMovie(movie));