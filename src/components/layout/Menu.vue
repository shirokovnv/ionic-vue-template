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

          <ion-item
            button
            @click="doLogOut"
          >
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
import { defineComponent, ref } from 'vue';
import router from '@/router';
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
    const autoHide = ref(false);

    const items: any = ref([
      { name: 'Home', icon: 'home', href: '/home' },
      { name: 'Media', icon: 'archive', href: '/media' },
    ]);

    const navigate = (item: any) => {
      router.push(item.href);
    };

    return {
      autoHide,
      items,
      navigate,
      doLogOut
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
