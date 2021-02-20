import {
  mount
} from '@vue/test-utils';
import Menu from '@/components/layout/Menu.vue';

describe('Menu.vue', () => {
  it('renders menu', () => {
    const wrapper = mount(Menu);
    expect(wrapper.find('ion-menu').text()).toMatch('Menu');
  });

  it('has 3 menu elements', () => {
    const wrapper = mount(Menu);
    const menuItems = wrapper.findAll('ion-item');
    expect(menuItems).toHaveLength(3);
  });
});
