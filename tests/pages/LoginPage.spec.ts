import { shallowMount, mount, Wrapper } from '@vue/test-utils';
import LoginPage from '@/pages/LoginPage.vue';

import * as Storage from '@/utils/Storage';

import { createLocalVue } from '../utils';
const localVue = createLocalVue();

describe('Login Page', () => {
  describe('Empty form', () => {
    const wrapper = shallowMount(LoginPage, { localVue });

    it('should render the component', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render a form', () => {
      const form = wrapper.find('b-form-stub');
      expect(form.exists()).toBeTruthy();
    });

    it('should render two inputs', () => {
      const form = wrapper.find('b-form-stub');
      const inputs = form.findAll('b-form-input-stub');
      expect(inputs).toHaveLength(2);
    });

    it('should render a disabled button', () => {
      const form = wrapper.find('b-form-stub');
      const button = form.find('b-button-stub');
      expect(button.exists()).toBeTruthy();

      expect(button.attributes().disabled).toBe('true');
    });

    it('should not render a message', () => {
      const message = wrapper.find('p');
      expect(message.exists()).toBeFalsy();
    });
  });

  describe('Filled form', () => {
    const wrapper = shallowMount(LoginPage, { localVue });

    beforeAll(async () => {
      await wrapper.setData({
        username: 'asas',
        password: '12345'
      });
    });

    it('should render the component', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render filled fields', () => {
      const form = wrapper.find('b-form-stub');
      const inputs = form.findAll('b-form-input-stub');

      expect(inputs.at(0).attributes().value).toBe('asas');
      expect(inputs.at(1).attributes().value).toBe('12345');
    });

    it('should render an enable button', () => {
      const form = wrapper.find('b-form-stub');
      const button = form.find('b-button-stub');
      expect(button.exists()).toBeTruthy();

      expect(button.attributes().disabled).toBe(undefined);
    });

    it('should not render a message', () => {
      const message = wrapper.find('p');
      expect(message.exists()).toBeFalsy();
    });
  });

  describe('Events', () => {
    let spySetItem: jest.SpyInstance<void, [string, string]>;
    let wrapper: Wrapper<any>;

    const localVue = createLocalVue();

    const pushHandler = jest.fn();
    const $router = {
      push: pushHandler
    };

    beforeAll(async () => {
      spySetItem = jest.spyOn(Storage, 'setItem').mockImplementation((key: string) => {});
      wrapper = mount(LoginPage, {
        localVue,
        mocks: {
          $router
        }
      });

      await wrapper.setData({
        username: 'asas',
        password: '12345'
      });
    });

    afterAll(() => {
      spySetItem.mockRestore();
    });

    it('should perform the login when button is clicked', () => {
      const button = wrapper.find('button');
      expect(button.exists()).toBeTruthy();

      button.trigger('click');

      expect(pushHandler).toBeCalledTimes(1);
      expect(pushHandler).toBeCalledWith({ name: 'list' });

      expect(spySetItem).toBeCalledTimes(1);
      expect(spySetItem).toBeCalledWith('SESSION', 'true');
    });
  });
});
