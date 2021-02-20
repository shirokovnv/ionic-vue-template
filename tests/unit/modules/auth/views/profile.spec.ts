import { mount } from '@vue/test-utils';
import Profile from '@/modules/auth/views/Profile.vue';

describe('Profile.vue', () => {
  it('renders profile view', () => {
    const wrapper = mount(Profile);
    expect(wrapper.text()).toMatch('Profile');
  });
});