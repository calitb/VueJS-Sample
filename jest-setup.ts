jest.mock("@/api/client", () => {
  return {
    rickAndMortyClient: {
      query: jest.fn()
    }
  };
});
