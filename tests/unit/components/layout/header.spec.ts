import {
  mount
} from '@vue/test-utils';
import Header from '@/components/layout/Header.vue';

describe('Header.vue', () => {
  it('renders header', () => {
    const wrapper = mount(Header);
    expect(wrapper.find('ion-title').text()).toMatch('Header');
  });
});
