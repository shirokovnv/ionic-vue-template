<template>
  <ion-page>
    <ion-content>
      <div id="container">
        <strong>Comments</strong>
        <ion-list>
          <transition-group name="bounce" tag="p">
            <ion-item v-for="comment in comments" :key="comment.id">
              <ion-label>{{ comment.name }}</ion-label>
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
import useComments from '../logic/useComments';
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
    const { comments, fetchComments } = useComments();
    onMounted(async () => {
      fetchComments();
    });

    return {
      comments
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
