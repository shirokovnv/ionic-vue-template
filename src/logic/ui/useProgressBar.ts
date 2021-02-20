import { computed, reactive, readonly } from 'vue';

const state = reactive({
  inProgress: false,
});

export const setInProgress = (newValue: boolean) => {
  state.inProgress = newValue;
};

export const isInProgress = computed(() => {
  return state.inProgress;
});

export const showProgressOnAsync = (target: Promise<any>) => {
  setInProgress(true);
  target.finally(() => setInProgress(false));
};

export default function useProgressBar() {
  return {
    setInProgress,
    showProgressOnAsync,
    isInProgress,
    state: readonly(state),
  };
}
