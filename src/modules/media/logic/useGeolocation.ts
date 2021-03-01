import { onMounted, onUnmounted, ref } from 'vue';

const coords = ref({ latitude: 0, longitude: 0 });
const isSupported = 'navigator' in window && 'geolocation' in navigator;
let watcher: any = null;

export default function useGeolocation() {
  onMounted(() => {
    if (isSupported) {
      watcher = navigator.geolocation.watchPosition(
        (position) => (coords.value = position.coords),
      );
    }
  });

  onUnmounted(() => {
    if (watcher) navigator.geolocation.clearWatch(watcher);
  });

  return {
    coords,
    isSupported,
  };
}
