import { gql } from "apollo-boost";

export default gql`
  query RickAndMortyCharacters($page: Int) {
    characters(page: $page) {
      info {
        next
      }
      results {
        id
        name
        image
      }
    }
  }
`;
