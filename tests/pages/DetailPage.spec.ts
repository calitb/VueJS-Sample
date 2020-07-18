import { shallowMount, mount } from '@vue/test-utils';
import DetailPage from '@/pages/DetailPage.vue';
import { itemImageURL, itemsFixture } from '@/items';

import { createLocalVue } from '../utils';
const localVue = createLocalVue();
localVue.filter('imageSRC', itemImageURL);

describe.skip('Detail Page', () => {
  const Parent = {
    data() {
      return {
        items: itemsFixture
      };
    }
  };

  describe('Default', () => {
    const wrapper = shallowMount(DetailPage, {
      localVue,
      parentComponent: Parent,
      propsData: {
        detailId: '4'
      }
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

  describe('Created', () => {
    const localVue = createLocalVue();

    const pushHandler = jest.fn();
    const $router = {
      push: pushHandler
    };

    mount(DetailPage, {
      localVue,
      parentComponent: Parent,
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
