<template>
  <ion-page>
    <ion-content>
      <div id="container">
        <strong>Profile</strong>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonContent, IonPage } from '@ionic/vue';
import '@/theme/container.css';

export default defineComponent({
  name: 'Profile',
  components: {
    IonContent,
    IonPage,
  },
  setup() {
    console.log('profile');
  },
});
</script>

<style scoped>

</style>