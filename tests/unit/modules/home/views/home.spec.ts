import { mount } from '@vue/test-utils';
import Home from '@/modules/home/views/Home.vue';

describe('Home.vue', () => {
  it('renders home view', () => {
    const wrapper = mount(Home);
    expect(wrapper.text()).toMatch('Ready to create an app?');
  });
});