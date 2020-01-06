const axios = require('axios');
require ('custom-env').env(true)

const apiMovies = axios.create({
    baseURL: "https://api.themoviedb.org/3/"
});
const apiKey = process.env.API_KEY;

async function getMovies() {
    const url = `discover/movie?api_key=${apiKey}&language=fr`;
    return await apiMovies.get(url);
}
// https://api.themoviedb.org/3/movie/522938?api_key=2fae416c150ee4b2e2c62a138bf9b3ea&language=fr
async function getMovieDetails(id) {
    const url = `movie/${id}?api_key=${apiKey}&language=fr`;
    return await apiMovies.get(url);
}

async function getMoviesMarvel() {
    const url = `/movie/popular?api_key=${apiKey}&language=fr&with_companies=420`;
    return await apiMovies.get(url);
}

async function getMoviesDC() {
    const url = `/movie/popular?api_key=${apiKey}&language=fr&with_companies=9993`;
    return await apiMovies.get(url);
}

module.exports = {
    getMovies,
    getMoviesMarvel,
    getMoviesDC,
    getMovieDetails
};