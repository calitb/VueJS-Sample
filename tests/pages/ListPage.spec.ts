import { shallowMount, mount, RouterLinkStub } from '@vue/test-utils';
import ListPage from '@/pages/ListPage.vue';
import { itemImageURL, itemsFixture } from '@/items';

import { createLocalVue, createStore } from '../utils';
const localVue = createLocalVue();
localVue.filter('imageSRC', itemImageURL);

describe('List Page', () => {
  describe('Default', () => {
    const store = createStore({ items: itemsFixture });
    const wrapper = shallowMount(ListPage, {
      localVue,
      store,
      stubs: {
        'router-link': true
      }
    });

    it('should render the component', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render 3 items ', () => {
      const items = wrapper.findAll('b-list-group-item-stub');
      expect(items).toHaveLength(3);
    });

    it('should render the images', () => {
      const items = wrapper.findAll('b-list-group-item-stub');
      const image = items.at(0).find('img');
      expect(image.attributes().src).toBe('https://img.pokemondb.net/artwork/charmander.jpg');
    });

    it('should render the name', () => {
      const items = wrapper.findAll('b-list-group-item-stub');
      const image = items.at(1).find('router-link-stub');
      expect(image.text()).toBe('Charmeleon');
    });
  });

  describe('Links', () => {
    const store = createStore({ items: itemsFixture });
    const wrapper = mount(ListPage, {
      localVue,
      store,
      stubs: {
        RouterLink: RouterLinkStub
      }
    });

    it('should render the link', () => {
      expect(
        wrapper
          .findAllComponents(RouterLinkStub)
          .at(2)
          .props().to
      ).toEqual({ name: 'detail', params: { detailId: '6' } });
    });
  });
});
