const moviesList = document.getElementById('moviesList')
const selectedMovieDisplay = document.getElementById('selectedMovieDisplay')
const movieSearchBox = document.getElementById('movieSearchBox')
const searchButton = document.getElementById('searchButton')
const apiKey = 'apikey=47bdbdfc'
const apiURL = `http://www.omdbapi.com/?`

let apiHandler = new XMLHttpRequest()
let movieHandler = new XMLHttpRequest()

let searchQuery = 's=Batman'

let fullURL = `${apiURL}${searchQuery}&page=1&${apiKey}`

searchButton.addEventListener('click', function () {
    let searchTerm = movieSearchBox.value
    searchQuery = `s=${searchTerm}`
    fullURL = `${apiURL}${searchQuery}&page=1&${apiKey}`
    apiHandler.open('GET', fullURL)
    apiHandler.send()
})

apiHandler.addEventListener('load', function () {
    let movies = JSON.parse(this.responseText)
    console.log(movies)
    let movieIDs = []

    if(movies.Response == 'True')
    {
        let movieDisplay = movies.Search.map(function(movie) {
            let movieLink = `${apiURL}i=${movie.imdbID}&${apiKey}`
            movieIDs.push(movie.imdbID)
            console.log(movieLink)
            return `<div class="movieItem">
            <img src="${movie.Poster}" alt="">
            <button id="${movie.imdbID}">${movie.Title}</button>
        </div>`
        })
        moviesList.innerHTML = movieDisplay.join('')
        let movieElements = movieIDs.map(function(id) {
            document.getElementById(id).addEventListener ('click', function() {
                movieHandler.open('GET', `${apiURL}i=${id}&${apiKey}`)
                movieHandler.send()
            })
            return document.getElementById(id)
        })
        movieSearchBox.value = ''
        movieSearchBox.placeholder = "Search by title"
    }
    else
    {
        movieSearchBox.value = ''
        movieSearchBox.placeholder = `${movies.Error}`
        console.log(movies.Error)
    }
    
    
    
})

movieHandler.addEventListener('load', function() {
    let movie = JSON.parse(this.responseText)
    console.log(movie)

    let detailMovieDisplay = `<h1>${movie.Title}</h1>
    <img src="${movie.Poster}" alt="">
    <h2>Reased: ${movie.Released}</h2>
    <h3>${movie.Genre}</h3>
    <div>Directed by: ${movie.Director}</div>
    <p>${movie.Plot}</p>`

    selectedMovieDisplay.innerHTML = detailMovieDisplay
})

apiHandler.open('GET', fullURL)
apiHandler.send()