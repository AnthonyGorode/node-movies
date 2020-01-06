const express = require('express')
const movies = require('./data/movies.js');
const bodyParser = require('body-parser');

const { getMovies, getMoviesMarvel, getMoviesDC, getMovieDetails } = require('./config/api/MovieDb');
const getQueryGraphQL = require("./config/api/graphQl");

const app = express();

const PORT = "3000";

app.use("/public",express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views','./views');
app.set('view engine','ejs');

app.get('/',async(req,res) => {
    try {
        const movies = await getMovies();
        res.render('index', {page: "movies", title: "Les films à découvrir", datas: movies.data.results});
    } catch (error) {
        res.render('index', {page: "error"});
    }
});

app.get('/movies',async(req,res) => {
    try {
        const movies = await getMovies();
        res.render('index', {page: "movies", title: "Les films à découvrir", datas: movies.data.results});
    } catch (error) {
        res.render('index', {page: "error"});
    }
});

app.post('/movies',(req,res) => {
    console.log(req.body);
});

app.get('/movies/marvel', async(req,res) => {
    try {
        const movies = await getMoviesMarvel();
        res.render("index", {page: "movies", title: "Les meilleurs films Marvel", datas: movies.data.results});
    } catch (error) {
        res.render('index', {page: "error"});
    }
});

app.get('/movies/dc', async(req,res) => {
    try {
        const movies = await getMoviesDC();
        res.render("index", {page: "movies", title: "Les meilleurs films DC Comics", datas: movies.data.results});
    } catch (error) {
        res.render('index', {page: "error"});
    }
});

// app.get('/search',async(req,res) => {
//     try {
//         const details = await getQueryGraphQL();
//         console.log(details.data);
//         res.render('index', {page: "search",datas: movies})
//     } catch (error) {
//         res.render('index', {page: "error"})
//     }
    
// });

app.get('/movies/:id',async(req,res) => {
    try {
        const id = req.params.id
        const movie = await getMovieDetails(id);
        console.log(movie.data.genres);
        res.render('index', {page: "movie-details",data: movie.data})
    } catch (error) {
        res.render('index', {page: "error"})
    }
    
});

app.listen(PORT,() => {
    console.log(`Listening to the port ${PORT}`)
})

