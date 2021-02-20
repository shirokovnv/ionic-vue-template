<template>
  <ion-progress-bar v-if="isInProgress" type="indeterminate"></ion-progress-bar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonProgressBar } from '@ionic/vue';
import { isInProgress } from '@/logic/ui/useProgressBar';

export default defineComponent({
  name: 'ProgressBar',
  components: {
    IonProgressBar,
  },
  setup() {
    return {
      isInProgress,
    };
  },
});
</script>

<style scoped></style>
