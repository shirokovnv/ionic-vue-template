<template>
  <ion-page>
    <ion-content>
      <div id="container">
        <strong>Google Map</strong>
        <google-map></google-map>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonContent, IonPage } from '@ionic/vue';
import GoogleMap from '../components/GoogleMap.vue';
import '@/theme/container.css';

export default defineComponent({
  name: 'Maps',
  components: {
    IonContent,
    IonPage,
    GoogleMap,
  },
});
</script>

<style scoped>
</style>
