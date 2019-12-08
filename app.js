const express = require('express')
const movies = require('./data/movies.js');
const bodyParser = require('body-parser');

const { getMovies, getMovieDetails } = require('./config/api/MovieDb');
const getQueryGraphQL = require("./config/api/graphQl");

const app = express();

const PORT = "3000";

app.use("/public",express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views','./views');
app.set('view engine','ejs');

app.get('/',async(req,res) => {
    const movies = await getMovies();
    res.render('index', {page: "movies",datas: movies.data.results})
});

app.get('/movies',async(req,res) => {
    const movies = await getMovies();
    res.render('index', {page: "movies",datas: movies.data.results})
});

app.post('/movies',(req,res) => {
    console.log(req.body);
});

app.get('/search',async(req,res) => {
    const details = await getQueryGraphQL();
    console.log(details.data);
    res.render('index', {page: "search",datas: movies})
});

app.get('/movies/:id',async(req,res) => {
    const id = req.params.id
    const movie = await getMovieDetails(id);
    console.log(movie.data.genres);
    res.render('index', {page: "movie-details",data: movie.data})
});

app.listen(PORT,() => {
    console.log(`Listening to the port ${PORT}`)
})

