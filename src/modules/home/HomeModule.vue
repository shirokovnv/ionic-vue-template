<template>
  <ion-page>
    <div id="home_module">
      <ion-router-outlet :key="moduleKey" v-if="moduleIsReady">
      </ion-router-outlet>
      <div v-else>
        <preloader></preloader>
      </div>
    </div>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { IonRouterOutlet, IonPage } from '@ionic/vue';
import Preloader from '@/components/ui/Preloader.vue';

export default defineComponent({
  name: 'HomeModule',
  components: {
    IonRouterOutlet,
    IonPage,
    Preloader,
  },
  setup() {
    const moduleIsReady = computed(() => {
      //
      return true;
    });

    const moduleKey = computed(() => {
      //
      return 'home';
    });

    const bootstrapModule = () => {
      //
      console.log('home bootstrapped');
    };

    bootstrapModule();

    return {
      moduleIsReady,
      moduleKey,
      bootstrapModule,
    };
  },
});
</script>
