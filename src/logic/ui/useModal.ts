import { modalController } from '@ionic/vue';
import { computed, reactive, readonly } from 'vue';

const state = reactive({
  isOpen: false,
  modalInstance: null,
});

const setOpen = (newValue: boolean) => {
  state.isOpen = newValue;
};

const setModalInstance = (newModal: any) => {
  state.modalInstance = newModal;
};

const modalInstance = computed(() => state.modalInstance);

const isOpen = computed(() => state.isOpen);

const openModal = async (
  component: any,
  cssClass: string,
  componentProps: any,
) => {
  const modal = await modalController.create({
    component: component,
    cssClass: cssClass,
    componentProps: componentProps,
  });
  setModalInstance(modal);
  return modal.present();
};

const dismissModal = (modal: any) => {
  modal.dismiss();
};

export default function useModal() {
  return {
    isOpen,
    setOpen,
    openModal,
    dismissModal,
    setModalInstance,
    modalInstance,
    state: readonly(state),
  };
}
