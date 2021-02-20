<template>
  <ion-page>
    <div id="media_module">
      <ion-router-outlet :key="moduleKey" v-if="moduleIsReady">
      </ion-router-outlet>
      <div v-else>
        <preloader></preloader>
      </div>
    </div>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { IonRouterOutlet, IonPage } from '@ionic/vue';
import Preloader from '@/components/ui/Preloader.vue';

export default defineComponent({
  name: 'MediaModule',
  components: {
    IonRouterOutlet,
    IonPage,
    Preloader,
  },
  watch: {
    $route(to, from) {
      this.incrementKey();
    },
  },
  setup() {
    const moduleIsReady = computed(() => {
      //
      return true;
    });

    const moduleKey = ref(0);

    const incrementKey = () => {
      moduleKey.value++;
    };

    const bootstrapModule = () => {
      //
    };

    bootstrapModule();

    return {
      moduleIsReady,
      moduleKey,
      incrementKey,
      bootstrapModule,
    };
  },
});
</script>
