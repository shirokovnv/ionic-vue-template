<template>
  <ion-app>
    <layout></layout>
  </ion-app>
</template>

<script lang="ts">
import { IonApp } from '@ionic/vue';
import { defineComponent } from 'vue';
import Layout from '@/views/Layout.vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    Layout,
  },
});
</script>
