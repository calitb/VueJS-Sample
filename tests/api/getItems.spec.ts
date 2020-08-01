import axios, { AxiosStatic } from "axios";
import {
  getPokemonItems,
  getRickAndMortyItems,
  itemImageURL,
  queryRickAndMortyItems
} from "@/api/getItems";

import { rickAndMortyClient } from "@/api/client";

describe("API getItems", () => {
  describe("API getPokemonItems", () => {
    describe("success", () => {
      const response = {
        data: [
          {
            id: "4",
            name: "Charmander"
          },
          {
            id: "5",
            name: "Charmeleon"
          },
          {
            id: "6",
            name: "Charizard"
          }
        ]
      };

      beforeAll(() => {
        const mockedAxios = axios as jest.Mocked<AxiosStatic>;
        mockedAxios.get.mockResolvedValueOnce(response);
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it("fetches successfully data", async () => {
        const result = await getPokemonItems();
        expect(result).toEqual([
          {
            id: "4",
            name: "Charmander",
            image: "https://img.pokemondb.net/artwork/charmander.jpg"
          },
          {
            id: "5",
            name: "Charmeleon",
            image: "https://img.pokemondb.net/artwork/charmeleon.jpg"
          },
          {
            id: "6",
            name: "Charizard",
            image: "https://img.pokemondb.net/artwork/charizard.jpg"
          }
        ]);
      });
    });

    describe("error", () => {
      const error = new Error("Network Error");

      beforeAll(() => {
        const mockedAxios = axios as jest.Mocked<AxiosStatic>;
        mockedAxios.get.mockRejectedValueOnce(error);
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it("fails to fetch data from an API", async () => {
        const result = await getPokemonItems();
        expect(result).toBe(error);
      });
    });

    describe("itemImageURL", () => {
      it("should return the correct URL", () => {
        expect(itemImageURL("Charmander")).toBe(
          "https://img.pokemondb.net/artwork/charmander.jpg"
        );
      });

      it("should return the correct URL when there are whitespace characters", () => {
        expect(itemImageURL("Mr. Mime")).toBe(
          "https://img.pokemondb.net/artwork/mr-mime.jpg"
        );
      });

      it("should return the correct URL when there are special characters", () => {
        expect(itemImageURL("Farfetch'd")).toBe(
          "https://img.pokemondb.net/artwork/farfetchd.jpg"
        );
      });
    });
  });

  describe("API getRickAndMortyItems", () => {
    describe("success", () => {
      const response = {
        data: {
          info: {
            count: 591,
            pages: 30,
            next: "https://rickandmortyapi.com/api/character/?page=2",
            prev: null
          },
          results: [
            {
              id: 1,
              name: "Rick Sanchez",
              image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
            },
            {
              id: 2,
              name: "Morty Smith",
              image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg"
            }
          ]
        }
      };

      const response2 = {
        data: {
          info: {
            count: 591,
            pages: 30,
            next: null,
            prev: "https://rickandmortyapi.com/api/character/?page=1"
          },
          results: [
            {
              id: 3,
              name: "Summer Smith",
              image: "https://rickandmortyapi.com/api/character/avatar/3.jpeg"
            },
            {
              id: 4,
              name: "Beth Smith",
              image: "https://rickandmortyapi.com/api/character/avatar/4.jpeg"
            }
          ]
        }
      };

      beforeAll(() => {
        const mockedAxios = axios as jest.Mocked<AxiosStatic>;
        mockedAxios.get.mockResolvedValueOnce(response);
        mockedAxios.get.mockResolvedValueOnce(response2);
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it("fetches successfully data", async () => {
        const result = await getRickAndMortyItems();

        expect(result).toEqual([
          {
            id: 1,
            name: "Rick Sanchez",
            image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
          },
          {
            id: 2,
            name: "Morty Smith",
            image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg"
          },
          {
            id: 3,
            name: "Summer Smith",
            image: "https://rickandmortyapi.com/api/character/avatar/3.jpeg"
          },
          {
            id: 4,
            name: "Beth Smith",
            image: "https://rickandmortyapi.com/api/character/avatar/4.jpeg"
          }
        ]);
      });
    });

    describe("error", () => {
      const error = new Error("Network Error");

      beforeAll(() => {
        const mockedAxios = axios as jest.Mocked<AxiosStatic>;
        mockedAxios.get.mockRejectedValueOnce(error);
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it("fails to fetch data from an API", async () => {
        const result = await getRickAndMortyItems();
        expect(result).toBe(error);
      });
    });
  });
});

describe("API GraphQL getRickAndMortyItems", () => {
  describe("success", () => {
    const response = {
      data: {
        characters: {
          results: [
            {
              id: "1",
              name: "Rick Sanchez",
              image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
            },
            {
              id: "2",
              name: "Morty Smith",
              image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg"
            }
          ],
          info: {
            next: 2
          }
        }
      }
    };

    const response2 = {
      data: {
        characters: {
          results: [
            {
              id: "3",
              name: "Summer Smith",
              image: "https://rickandmortyapi.com/api/character/avatar/3.jpeg"
            },
            {
              id: "4",
              name: "Beth Smith",
              image: "https://rickandmortyapi.com/api/character/avatar/4.jpeg"
            }
          ],
          info: {
            next: null
          }
        }
      }
    };

    (rickAndMortyClient.query as jest.Mock).mockResolvedValueOnce(response);
    (rickAndMortyClient.query as jest.Mock).mockResolvedValueOnce(response2);

    it("fetches successfully data", async () => {
      const result = await queryRickAndMortyItems();

      expect(result).toEqual([
        {
          id: "1",
          name: "Rick Sanchez",
          image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
        },
        {
          id: "2",
          name: "Morty Smith",
          image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg"
        },
        {
          id: "3",
          name: "Summer Smith",
          image: "https://rickandmortyapi.com/api/character/avatar/3.jpeg"
        },
        {
          id: "4",
          name: "Beth Smith",
          image: "https://rickandmortyapi.com/api/character/avatar/4.jpeg"
        }
      ]);
    });
  });

  describe("error", () => {
    const error = new Error("Network Error");
    (rickAndMortyClient.query as jest.Mock).mockRejectedValueOnce(error);

    it("fail to fetch data", async () => {
      const result = await queryRickAndMortyItems();
      expect(result).toBe(error);
    });
  });
});
