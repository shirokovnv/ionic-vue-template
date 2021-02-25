import SignIn from '@/modules/auth/views/SignIn.vue';
import { mount } from '@vue/test-utils';

describe('SignIn.vue', () => {
  it('has h1 and renders it properly', () => {
    const wrapper = mount(SignIn);
    const h1 = wrapper.findAll('h1');

    expect(h1).toHaveLength(1);
    expect(h1[0].text()).toMatch('SignIn');
  });

  it('has email and password inputs', () => {
    const wrapper = mount(SignIn);
    const emailInput = wrapper.find('ion-input[name=email]');
    const passwordInput = wrapper.find('ion-input[name=password]');

    expect(emailInput.exists()).toBeTruthy();
    expect(passwordInput.exists()).toBeTruthy();
  });

  it('has exactly one submit button with proper title', () => {
    const wrapper = mount(SignIn);
    const buttons = wrapper.findAll('ion-button');

    expect(buttons).toHaveLength(1);
    expect(buttons[0].html()).toMatch('SignIn');
  });
});
