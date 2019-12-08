const { graphql, buildSchema } = require("graphql");
const fetch = require("node-fetch");

const typeDefs = `
  type Query {
      details: Film
  }
  type Film {
    title: String
    poster_path: String
    backdrop_path: String
    director: String
    producer: String
    release_date: String
  }
`;

const resolveFilms = parent => {
  const promises = parent.films.map(async url => {
    const response = await fetch(url);
    return response.json();
  });

  return Promise.all(promises);
};

const resolvers = {
  Planet: {
    films: resolveFilms
  },
  Person: {
    homeworld: async parent => {
      const response = await fetch(parent.homeworld);
      return response.json();
    },
    films: resolveFilms
  },
  Query: {
    hello: (_, { name }) => `Hello ${name || "World"}`,
    getPerson: async (_, { id }) => {
      const response = await fetch(`https://swapi.co/api/people/${id}/`);
      return response.json();
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log("Server is running on localhost:4000"));