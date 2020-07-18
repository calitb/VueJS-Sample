import { mount, Wrapper } from '@vue/test-utils';
import App from '@/App.vue';
import * as getItems from '@/api/getItems';
import { Item } from '@/items';

import { createLocalVue } from './utils';

describe.skip('App', () => {
  describe('Default', () => {
    let spyGetItems: jest.SpyInstance<Promise<void>, [getItems.APIHandler<Item[]>]>;
    let wrapper: Wrapper<any>;
    const localVue = createLocalVue();

    const items = [
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
    ];

    const Parent = {
      data() {
        return {
          items: []
        };
      }
    };

    beforeAll(() => {
      spyGetItems = jest.spyOn(getItems, 'default').mockImplementation(async (handler) => {
        handler(undefined, items, undefined);
      });
      wrapper = mount(App, {
        localVue,
        parentComponent: Parent,
        stubs: {
          'router-view': true
        }
      });
    });

    afterAll(() => {
      spyGetItems.mockRestore();
    });

    it('should load the items correctly', () => {
      expect(wrapper.vm.$root._data).toStrictEqual({ items });
    });

    it('should render the component', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('No items because of fetch error', () => {
    let spyGetItems: jest.SpyInstance<Promise<void>, [getItems.APIHandler<Item[]>]>;
    let wrapper: Wrapper<any>;
    const localVue = createLocalVue();

    const errorMessage = 'Network Error';
    const error = new Error(errorMessage);

    const Parent = {
      data() {
        return {
          items: []
        };
      }
    };

    beforeAll(() => {
      spyGetItems = jest.spyOn(getItems, 'default').mockImplementation(async (handler) => {
        handler(error, undefined, undefined);
      });
      wrapper = mount(App, {
        localVue,
        parentComponent: Parent,
        stubs: {
          'router-view': true
        }
      });
    });

    afterAll(() => {
      spyGetItems.mockRestore();
    });

    it('should keep the empty items array', () => {
      expect(wrapper.vm.$root._data).toStrictEqual({ items: [] });
    });

    it('should render the component', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
