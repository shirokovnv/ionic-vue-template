<template>
  <ion-page>
    <ion-content>
      <div id="container">
        <strong>Comments</strong>
        <ion-list>
          <transition-group name="bounce" tag="p">
            <ion-item v-for="item in items" :key="item.id">
              <ion-label>{{ item.name }}</ion-label>
            </ion-item>
          </transition-group>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, inject } from 'vue';
import { IonContent, IonPage, IonList, IonItem, IonLabel } from '@ionic/vue';
import api from '@/config/api';
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
    const items = ref([]);

    console.log('comments');
    const axios: any = inject('axios');
    axios
      .get(api.baseURL + 'comments?_start=0&_limit=5')
      .then((response: any) => {
        items.value = response.data;
        console.log(response);
      });

    return {
      items,
    };
  },
});
</script>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
