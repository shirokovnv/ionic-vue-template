import Toast from '@/components/ui/Toast.vue';
import useToast from '@/logic/ui/useToast';
import { shallowMount } from '@vue/test-utils';

describe('Toast.vue', () => {
  const { isOpen, setOpen, setMessage } = useToast();

  it('renders toast with setted text when isOpen state = true', async () => {
    const wrapper = shallowMount(Toast);
    const toastMessage = 'Test message';
    setOpen(true);
    setMessage(toastMessage);
    await wrapper.vm.$nextTick();

    expect(isOpen.value).toBeTruthy();
    expect(wrapper.find('ion-toast-stub').exists()).toBeTruthy();
    expect(wrapper.find('ion-toast-stub').attributes('is-open')).toMatch(
      'true',
    );
  });

  it('doesnt render toast when isOpen state = false', async () => {
    const wrapper = shallowMount(Toast);
    setOpen(false);
    await wrapper.vm.$nextTick();

    expect(isOpen.value).toBeFalsy();
    expect(wrapper.find('ion-toast-stub').exists()).toBeTruthy();
    expect(wrapper.find('ion-toast-stub').attributes('is-open')).toMatch(
      'false',
    );
  });
});
