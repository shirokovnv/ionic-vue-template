<template>
  <ion-menu contentId="main-content">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-menu-toggle :autoHide="autoHide">
          <ion-item
            button
            v-for="item in items"
            :key="item.name"
            @click="navigate(item)"
          >
            <ion-icon :name="item.icon" slot="start"></ion-icon>
            <ion-label>{{ item.name }}</ion-label>
          </ion-item>

          <ion-item button @click="doLogOut()">
            <ion-icon name="log-out" slot="start"></ion-icon>
            <ion-label>LogOut</ion-label>
          </ion-item>
        </ion-menu-toggle>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script lang="ts">
import {
  IonMenu,
  IonToolbar,
  IonTitle,
  IonHeader,
  IonMenuToggle,
  IonList,
  IonItem,
  IonIcon,
  IonContent,
  IonLabel,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import useMenu from '@/logic/layout/useMenu';
import { doLogOut } from '@/modules/auth/logic/useAuth';

export default defineComponent({
  name: 'Menu',
  components: {
    IonMenu,
    IonToolbar,
    IonTitle,
    IonHeader,
    IonMenuToggle,
    IonList,
    IonItem,
    IonIcon,
    IonContent,
    IonLabel,
  },
  setup() {
    const { items, autoHide, navigate } = useMenu();

    return {
      autoHide,
      items,
      navigate,
      doLogOut,
    };
  },
});
</script>

<style scoped>
.menu-content-open {
  pointer-events: unset !important;
}

.menu-content.menu-content-open {
  z-index: 20;
}
</style>
