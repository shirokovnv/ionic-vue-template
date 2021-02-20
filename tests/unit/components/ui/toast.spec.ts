import {
  mount
} from '@vue/test-utils';
import Toast from '@/components/ui/Toast.vue';
import useToast from '@/logic/ui/useToast';

describe('Toast.vue', () => {
  const {
    isOpen,
    setOpen,
    setMessage
  } = useToast();

  it('renders toast with setted text when isOpen state = true', async () => {
    const wrapper = mount(Toast);
    const toastMessage = 'Test message';
    setOpen(true);
    setMessage(toastMessage);
    await wrapper.vm.$nextTick();
    console.log(wrapper);

    expect(isOpen.value).toBeTruthy();
    expect(wrapper.find('ion-toast').exists()).toBeTruthy();
  });

  it('doesnt render toast when isOpen state = false', async () => {
    const wrapper = mount(Toast);
    setOpen(false);
    await wrapper.vm.$nextTick();

    expect(isOpen.value).toBeFalsy();
    expect(wrapper.find('ion-toast').exists()).toBeFalsy();
  });

});
