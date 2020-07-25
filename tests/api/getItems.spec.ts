import axios, { AxiosStatic } from "axios";
import getItems, { itemImageURL } from "@/api/getItems";

jest.mock("axios");

describe("API getItems", () => {
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
      const handler = jest.fn();
      await getItems(handler);

      expect(handler).toBeCalledTimes(1);
      expect(handler).toBeCalledWith(
        undefined,
        [
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
        ],
        response
      );
    });
  });

  describe("error", () => {
    const errorMessage = "Network Error";
    const error = new Error(errorMessage);

    beforeAll(() => {
      const mockedAxios = axios as jest.Mocked<AxiosStatic>;

      mockedAxios.get.mockRejectedValueOnce(error);
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    it("fetches erroneously data from an API", async () => {
      const handler = jest.fn();
      await getItems(handler);

      expect(handler).toBeCalledTimes(1);
      expect(handler).toBeCalledWith(error, undefined, undefined);
    });
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
