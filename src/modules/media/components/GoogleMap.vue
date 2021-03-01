<template>
  <div class="d-flex text-center" style="height: 20vh">
    <div class="m-auto">
      <h4>Your Position</h4>
      Latitude: {{ currPos.lat.toFixed(2) }}, Longitude:
      {{ currPos.lng.toFixed(2) }}
    </div>
    <div class="m-auto">
      <h4>Distance</h4>
      {{ distance.toFixed(2) }} miles
    </div>
    <div class="m-auto">
      <h4>Clicked Position</h4>
      <span v-if="otherPos">
        Latitude: {{ otherPos.lat.toFixed(2) }}, Longitude:
        {{ otherPos.lng.toFixed(2) }}
      </span>
      <span v-else>Click the map to select a position</span>
    </div>
  </div>
  <div ref="mapDiv" style="width: 100%; height: 80vh" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useGoogleMap from '../logic/useGoogleMap';
import '@/theme/container.css';

export default defineComponent({
  name: 'GoogleMap',
  setup() {
    const { currPos, otherPos, distance, mapDiv } = useGoogleMap();
    console.log('google map');

    return {
      currPos,
      otherPos,
      distance,
      mapDiv,
    };
  },
});
</script>

<style scoped>
</style>