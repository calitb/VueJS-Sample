import { shallowMount, mount } from '@vue/test-utils';
import DetailPage from '@/pages/DetailPage.vue';
import { itemImageURL } from '@/items';

import { createLocalVue, createStore } from '../utils';
const localVue = createLocalVue();
localVue.filter('imageSRC', itemImageURL);

describe('Detail Page', () => {
  describe('Default', () => {
    const store = createStore({ currentItemId: '004', items: [{ id: '4', name: 'Charmander' }] });
    const wrapper = shallowMount(DetailPage, {
      store,
      localVue,
      propsData: {
        detailId: '4'
      }
    });

    it('should render the component', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render the component', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render the name', () => {
      const card = wrapper.find('b-card-stub');
      expect(card.attributes().title).toBe('Charmander');
    });

    it('should render the image', () => {
      const card = wrapper.find('b-card-stub');
      expect(card.attributes().imgsrc).toBe('https://img.pokemondb.net/artwork/charmander.jpg');
    });
  });

  describe('Wrong route', () => {
    const localVue = createLocalVue();
    const store = createStore();

    const pushHandler = jest.fn();
    const $router = {
      push: pushHandler
    };

    mount(DetailPage, {
      store,
      localVue,
      propsData: {
        detailId: 'abs'
      },
      mocks: {
        $router
      }
    });

    it('should handle an invalid prop type', () => {
      expect(pushHandler).toBeCalledTimes(1);
      expect(pushHandler).toBeCalledWith({ name: 'error' });
    });
  });
});
