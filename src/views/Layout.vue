<template>
  <ion-split-pane contentId="main-content">
    <Menu v-if="isLoggedIn"></Menu>
    <div class="ion-page" id="main-content">
      <Header></Header>
      <progress-bar></progress-bar>
      <toast></toast>
      <ion-content class="ion-padding">
        <ion-router-outlet> </ion-router-outlet>
      </ion-content>
    </div>
  </ion-split-pane>
</template>

<script lang="ts">
import { IonRouterOutlet, IonSplitPane, IonContent } from '@ionic/vue';
import { defineComponent } from 'vue';
import Menu from '@/components/layout/Menu.vue';
import Header from '@/components/layout/Header.vue';
import ProgressBar from '@/components/ui/ProgressBar.vue';
import Toast from '@/components/ui/Toast.vue';
import { isLoggedIn } from '@/modules/auth/logic/useAuth';

export default defineComponent({
  name: 'Layout',
  components: {
    IonRouterOutlet,
    IonSplitPane,
    IonContent,
    Menu,
    Header,
    ProgressBar,
    Toast,
  },
  setup() {
    return {
      isLoggedIn
    }
  }
});
</script>

<style scoped></style>
