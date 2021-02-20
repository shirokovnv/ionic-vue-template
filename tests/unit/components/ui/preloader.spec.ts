import {
  mount
} from '@vue/test-utils';
import Preloader from '@/components/ui/Preloader.vue';
import usePreloader from '@/logic/ui/usePreloader';

describe('Preloader.vue', () => {
  const {
    setLoadingText
  } = usePreloader();

  it('renders preloader with setted text', async () => {
    const wrapper = mount(Preloader);
    const loadingText = 'Test loading...';
    setLoadingText(loadingText);
    await wrapper.vm.$nextTick();

    expect(wrapper.find('ion-spinner').exists()).toBeTruthy();
    expect(wrapper.text()).toMatch(loadingText);
  });

});
