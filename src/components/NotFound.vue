<template>
  <ion-page>
    <ion-content>
      <div class="parent">
        <div class="child">
          <h1>Not found</h1>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonContent, IonPage } from '@ionic/vue';

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
.parent {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
}

.child {
  display: flex;
  align-items: center;
}
</style>
