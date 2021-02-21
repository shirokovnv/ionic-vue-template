<template>
  <ion-page>
    <div id="auth_module">
      <ion-router-outlet :key="reactiveKey" v-if="moduleIsReady">
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
  name: 'AuthModule',
  components: {
    IonRouterOutlet,
    IonPage,
    Preloader,
  },
  watch: {
    $route(to, from) {
      this.reactiveKey++;
    },
  },
  setup() {
    const moduleIsReady = computed(() => {
      return true;
    });

    const reactiveKey = ref(0);

    const moduleKey = computed(() => {
      return 'auth';
    });

    const bootstrapModule = () => {
      console.log('bootstrapped auth module');
    };

    bootstrapModule();

    return {
      moduleIsReady,
      moduleKey,
      reactiveKey,
      bootstrapModule,
    };
  },
});
</script>

<style scoped></style>
