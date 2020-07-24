import axios, { AxiosStatic } from 'axios';

import getItems from '@/api/getItems';
import itemsFixture from '../fixtures/items';

jest.mock('axios');

describe('API getItems', () => {
  describe('success', () => {
    const response = { data: [ itemsFixture ] };

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
