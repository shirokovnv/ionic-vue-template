<template>
  <ion-page>
    <ion-content>
      <div id="container">
        <strong>Users</strong>
        <ion-list>
          <transition-group name="fade" tag="ion-label">
            <ion-item v-for="user in users" :key="user.id">
              <ion-label>{{ user.name }}</ion-label>
            </ion-item>
          </transition-group>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { IonContent, IonPage, IonList, IonItem, IonLabel } from '@ionic/vue';
import useUsers from '../logic/useUsers';
import '@/theme/container.css';

export default defineComponent({
  name: 'Comments',
  components: {
    IonContent,
    IonPage,
    IonList,
    IonItem,
    IonLabel,
  },
  setup() {
    const { fetchUsers, users } = useUsers();
    onMounted(async () => {
      await fetchUsers();
    });

    return {
      users,
    };
  },
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
