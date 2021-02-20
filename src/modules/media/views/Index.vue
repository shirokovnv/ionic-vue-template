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
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
