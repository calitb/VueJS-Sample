import ApolloClient, { InMemoryCache } from "apollo-boost";

export const rickAndMortyClient = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql/",
  cache: new InMemoryCache({
    addTypename: false
  })
});
