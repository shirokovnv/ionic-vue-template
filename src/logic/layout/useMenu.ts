import { computed, reactive, readonly } from 'vue';
import router from '@/router';

const state = reactive({
  autoHide: false,
  items: [
    { name: 'Home', icon: 'home', href: '/home' },
    { name: 'Media', icon: 'archive', href: '/media' },
  ],
});

const navigate = (item: any) => {
  router.push(item.href);
};

const autoHide = computed(() => state.autoHide);
const items = computed(() => state.items);

export default function useMenu() {
  return {
    autoHide,
    items,
    navigate,
    state: readonly(state),
  };
}
