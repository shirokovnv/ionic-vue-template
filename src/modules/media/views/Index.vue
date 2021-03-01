<template>
  <ion-page>
    <ion-content>
      <div id="container">
        <strong>Index media</strong>
        <ion-list>
          <ion-item v-for="item in items" :key="item.id" @click="onClick(item)">
            <ion-label>{{ item.name }}</ion-label>
          </ion-item>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { IonContent, IonPage, IonList, IonItem, IonLabel } from '@ionic/vue';
import router from '@/router';
import '@/theme/container.css';

export default defineComponent({
  name: 'Posts',
  components: {
    IonContent,
    IonPage,
    IonList,
    IonItem,
    IonLabel,
  },
  setup() {
    const items = reactive([
      {
        name: 'Comments',
        href: '/media/comments',
      },
      {
        name: 'Users',
        href: '/media/users',
      },
      {
        name: 'Maps',
        href: '/media/maps',
      },
    ]);

    const onClick = (item: any) => {
      router.push(item.href);
    };

    return {
      items,
      onClick,
    };
  },
});
</script>

<style scoped>
</style>
