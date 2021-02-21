<template>
  <ion-page>
    <ion-content>
      <div id="container">
        <h1>Not found</h1>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonContent, IonPage } from '@ionic/vue';
import '@/theme/container.css';

export default defineComponent({
  name: 'NotFound',
  components: {
    IonContent,
    IonPage,
  },
  setup() {
    console.log('not found');
  },
});
</script>

<style scoped>

</style>
