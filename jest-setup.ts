jest.mock("@/api/client", () => {
  return {
    rickAndMortyClient: {
      query: jest.fn()
    }
  };
});

jest.mock("axios", () => {
  return {
    get: jest.fn()
  };
});
