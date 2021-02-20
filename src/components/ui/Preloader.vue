<template>
  <div class="parent">
    <div class="child">
      <ion-spinner name="crescent"></ion-spinner>
    </div>
    <div class="child">
      {{ loadingText }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import { IonSpinner } from '@ionic/vue';
import usePreloader from '@/logic/ui/usePreloader';

export default defineComponent({
  name: 'Preloader',
  components: {
    IonSpinner,
  },
  setup() {
    const { state } = usePreloader();
    const { loadingText } = toRefs(state);

    return {
      loadingText,
    };
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
