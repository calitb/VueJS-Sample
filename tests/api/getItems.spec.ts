import axios, { AxiosStatic } from 'axios';

import getItems from '@/api/getItems';

jest.mock('axios');

describe('API getItems', () => {
  describe('success', () => {
    const response = {
      data: [
        {
          id: '4',
          name: 'Charmander'
        },
        {
          id: '5',
          name: 'Charmeleon'
        },
        {
          id: '6',
          name: 'Charizard'
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

    it('fetches successfully data', async () => {
      const handler = jest.fn();
      await getItems(handler);

      expect(handler).toBeCalledTimes(1);
      expect(handler).toBeCalledWith(undefined, response.data, response);
    });
  });

  describe('error', () => {
    const errorMessage = 'Network Error';
    const error = new Error(errorMessage);

    beforeAll(() => {
      const mockedAxios = axios as jest.Mocked<AxiosStatic>;

      mockedAxios.get.mockRejectedValueOnce(error);
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    it('fetches erroneously data from an API', async () => {
      const handler = jest.fn();
      await getItems(handler);

      expect(handler).toBeCalledTimes(1);
      expect(handler).toBeCalledWith(error, undefined, undefined);
    });
  });
});
