const { graphql, buildSchema } = require("graphql");
const { getMovieDetails } = require("./MovieDb");

const axios = require('axios');
require ('custom-env').env(true)

const apiMovies = axios.create({
    baseURL: "https://api.themoviedb.org/3/"
});
const apiKey = process.env.API_KEY;

const typeDefs = buildSchema(`
  type Query {
      getFilm(id: Int): Film
  }
  type Film {
    title: String
    poster_path: String
    backdrop_path: String
    tagline: String
    release_date: String
  }
`);

// const resolveFilms = parent => {
//   const promises = parent.films.map(async url => {
//     const response = await fetch(url);
//     return response.json();
//   });

//   return Promise.all(promises);
// };

const resolvers = {
  Query: {
    getFilm: async (id) => {
      return await apiMovies.get(url);
    //   return response.json();
    }
  }
};

async function getQueryGraphQL() {
    return await graphql( typeDefs, '{ getFilm(id: 522938){ title } }',resolvers );
}

module.exports = getQueryGraphQL;
// const server = new GraphQLServer({ typeDefs, resolvers });
// server.start(() => console.log("Server is running on localhost:4000"));