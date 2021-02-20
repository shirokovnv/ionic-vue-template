<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-toggle>
          <ion-button>
            <ion-icon slot="icon-only" name="menu"></ion-icon>
          </ion-button>
        </ion-menu-toggle>
      </ion-buttons>
      <ion-title>Header</ion-title>
    </ion-toolbar>
  </ion-header>
</template>

<script lang="ts">
import {
  IonMenuToggle,
  IonToolbar,
  IonTitle,
  IonHeader,
  IonIcon,
  IonButtons,
  IonButton,
} from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Header',
  components: {
    IonMenuToggle,
    IonToolbar,
    IonTitle,
    IonHeader,
    IonIcon,
    IonButtons,
    IonButton,
  },
});
</script>

<style scoped></style>
