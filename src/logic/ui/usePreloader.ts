import { reactive, readonly } from 'vue';

const state = reactive({
  loadingText: 'Loading, please wait...',
});

export const setLoadingText = (newValue: string) => {
  state.loadingText = newValue;
};

export default function usePreloader() {
  return {
    setLoadingText,
    state: readonly(state),
  };
}
