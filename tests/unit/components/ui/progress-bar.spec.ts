import {
  mount
} from '@vue/test-utils';
import ProgressBar from '@/components/ui/ProgressBar.vue';
import useProgressBar from '@/logic/ui/useProgressBar';

describe('ProgressBar.vue', () => {
  const { isInProgress, setInProgress } = useProgressBar();

  it('renders progress bar when inProgress state = true', async () => {
    const wrapper = mount(ProgressBar);
    setInProgress(true);
    await wrapper.vm.$nextTick();

    expect(isInProgress.value).toBeTruthy();
    expect(wrapper.find('ion-progress-bar').exists()).toBeTruthy();
  });

  it('doesnt render progress bar when inProgress state = false', async () => {
    const wrapper = mount(ProgressBar);
    setInProgress(false);
    await wrapper.vm.$nextTick();

    expect(isInProgress.value).toBeFalsy();
    expect(wrapper.find('ion-progress-bar').exists()).toBeFalsy();
  });
});
