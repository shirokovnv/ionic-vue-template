import {
  mount
} from '@vue/test-utils';
import SignUp from '@/modules/auth/views/SignUp.vue';

describe('SignUp.vue', () => {
  it('has h1 and renders it properly', () => {
    const wrapper = mount(SignUp);
    const h1 = wrapper.findAll('h1');

    expect(h1).toHaveLength(1);
    expect(h1[0].text()).toMatch('SignUp');
  });

  it('has name, email and password inputs', () => {
    const wrapper = mount(SignUp);
    const nameInput = wrapper.find('ion-input[name=name]');
    const emailInput = wrapper.find('ion-input[name=email]');
    const passwordInput = wrapper.find('ion-input[name=password]');

    expect(nameInput.exists()).toBeTruthy();
    expect(emailInput.exists()).toBeTruthy();
    expect(passwordInput.exists()).toBeTruthy();
  });

  it('has exactly one submit button with proper title', () => {
    const wrapper = mount(SignUp);
    const buttons = wrapper.findAll('ion-button');

    expect(buttons).toHaveLength(1);
    expect(buttons[0].html()).toMatch('SignUp');
  });

});
