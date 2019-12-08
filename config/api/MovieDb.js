const axios = require('axios');
require ('custom-env').env(true)

const apiMovies = axios.create({
    baseURL: "https://api.themoviedb.org/3/"
});
const apiKey = process.env.API_KEY;

async function getMovies() {
    const url = `/discover/movie?api_key=${apiKey}&language=fr`;
    return await apiMovies.get(url);
}

async function getMovieDetails(id) {
    const url = `/movie/${id}?api_key=${apiKey}&language=fr`;
    return await apiMovies.get(url);
}

module.exports = {
    getMovies: getMovies,
    getMovieDetails: getMovieDetails
};