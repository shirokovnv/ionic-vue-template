import { computed, reactive, readonly } from 'vue';
import { toastController } from '@ionic/vue';

const state = reactive({
  isOpen: false,
  options: {
    duration: 2000,
    message: '',
  },
});

export const setOpen = (isOpen: boolean) => {
  state.isOpen = isOpen;
};

export const setDuration = (duration: number) => {
  state.options.duration = duration;
};

export const setMessage = (message: string) => {
  state.options.message = message;
};

export const isOpen = computed(() => state.isOpen);
export const duration = computed(() => state.options.duration);
export const message = computed(() => state.options.message);

export const openToast = async (message: string, duration: number) => {
  setDuration(duration);
  setMessage(message);

  const toast = await toastController.create(state.options);
  return toast.present();
};

export default function useToast() {
  return {
    openToast,
    setOpen,
    isOpen,
    duration,
    setDuration,
    message,
    setMessage,
    state: readonly(state),
  };
}
