import axios, { AxiosStatic } from "axios";

import getRickAndMortyItems from "@/api/getRickAndMortyItems";

describe("API getItems", () => {
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

      (axios.get as jest.Mock).mockResolvedValueOnce(response);
      (axios.get as jest.Mock).mockResolvedValueOnce(response2);

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
      (axios.get as jest.Mock).mockRejectedValueOnce(error);

      it("fails to fetch data from an API", async () => {
        try {
          await getRickAndMortyItems();
        } catch (e) {
          expect(e).toEqual(error);
        }
      });
    });
  });
});
