import { shallowMount } from '@vue/test-utils';
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
      localVue
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
    const store = createStore({ currentItemId: '006', items: [{ id: '4', name: 'Charmander' }] });

    const wrapper = shallowMount(DetailPage, {
      store,
      localVue
    });

    it('should render the component', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render an error message', () => {
      const content = wrapper.find('div');
      expect(content.text()).toBe('NO EXISTE');
    });
  });
});
