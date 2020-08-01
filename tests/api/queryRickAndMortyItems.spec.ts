import queryRickAndMortyItems from "@/api/queryRickAndMortyItems";
import { rickAndMortyClient } from "@/api/client";

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
      try {
        await queryRickAndMortyItems();
      } catch (e) {
        expect(e).toEqual(error);
      }
    });
  });
});
