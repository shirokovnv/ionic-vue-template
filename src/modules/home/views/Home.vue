<template>
  <ion-page>
    <ion-content>
      <div id="container">
        <strong>Ready to create an app?</strong>
        <p>Ionic Vue Template</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';
import '@/theme/container.css';

export default defineComponent({
  name: 'Home',
  components: {
    IonContent,
    IonPage,
  },
  setup() {
    console.log('home');
  },
});
</script>

<style scoped>

</style>
