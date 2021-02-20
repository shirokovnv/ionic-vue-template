import { mount } from '@vue/test-utils';
import NotFound from '@/components/NotFound.vue';

describe('NotFound.vue', () => {
  it('renders not found page', () => {
    const wrapper = mount(NotFound);
    expect(wrapper.text()).toMatch('Not found');
  });
});