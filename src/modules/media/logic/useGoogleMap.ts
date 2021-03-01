import { Loader } from '@googlemaps/js-api-loader';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import useGeolocation from './useGeolocation';
declare let google: any;

const GOOGLE_MAPS_API_KEY = '';

export default function useGoogleMap() {
  const { coords } = useGeolocation();

  const currPos = computed(() => ({
    lat: coords.value.latitude,
    lng: coords.value.longitude,
  }));

  const otherPos = ref<any | null>(null);
  const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY });
  const mapDiv = ref<any | null>(null);
  const map = ref<any | null>(null);

  let clickListener: any = null;

  onMounted(async () => {
    await loader.load();
    map.value = new google.maps.Map(mapDiv.value, {
      center: currPos.value,
      zoom: 7,
    });

    if (map.value !== null) {
      clickListener = map.value.addListener(
        'click',
        ({ latLng: { lat, lng } }: { latLng: { lat: any; lng: any } }) =>
          (otherPos.value = { lat: lat(), lng: lng() }),
      );
    }
  });

  onUnmounted(async () => {
    if (clickListener) clickListener.remove();
  });

  let line: any = null;

  watch([map, currPos, otherPos], () => {
    if (line) line.setMap(null);
    if (map.value && otherPos.value != null)
      line = new google.maps.Polyline({
        path: [currPos.value, otherPos.value],
        map: map.value,
      });
  });

  const haversineDistance = (pos1: any, pos2: any) => {
    const R = 3958.8; // Radius of the Earth in miles
    const rlat1 = pos1.lat * (Math.PI / 180); // Convert degrees to radians
    const rlat2 = pos2.lat * (Math.PI / 180); // Convert degrees to radians
    const difflat = rlat2 - rlat1; // Radian difference (latitudes)
    const difflon = (pos2.lng - pos1.lng) * (Math.PI / 180); // Radian difference (longitudes)
    const d =
      2 *
      R *
      Math.asin(
        Math.sqrt(
          Math.sin(difflat / 2) * Math.sin(difflat / 2) +
            Math.cos(rlat1) *
              Math.cos(rlat2) *
              Math.sin(difflon / 2) *
              Math.sin(difflon / 2),
        ),
      );
    return d;
  };
  const distance = computed(() =>
    otherPos.value === null
      ? 0
      : haversineDistance(currPos.value, otherPos.value),
  );

  return { currPos, otherPos, distance, mapDiv };
}
