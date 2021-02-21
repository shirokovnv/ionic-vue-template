<template>
  <ion-page>
    <ion-content>
      <div id="container">
        <strong>Users</strong>
        <ion-list>
          <transition-group name="fade" tag="ion-label">
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
import useToast from '@/logic/ui/useToast';
import {
  QueryRunner,
  QueryResult,
  QueryBuilder,
} from 'laravel-query-api-frontend';
import api from '@/config/api';
import { showProgressOnAsync } from '@/logic/ui/useProgressBar';
import { instance as axios } from '@/plugins/install/axios';
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
    const { setOpen, setMessage } = useToast();

    const fetchUsers = QueryBuilder.fetch('App\\Models\\User', 'users')
      .where(['id', '>=', 1])
      .paginate(1, 10);

    console.log('users');
    const runner = new QueryRunner(axios, `${api.localURL}/api/queries`);
    runner.addQuery(fetchUsers);

    showProgressOnAsync(
      runner
        .runTransaction()
        .then((value: QueryResult) => {
          console.log('data', value);
          items.value = value.getContent('users').data;
        })
        .catch((error: any) => {
          setMessage('Super Toast');
          setOpen(true);

          console.log('Error', error);
        })
        .finally(() => console.log('request finished')),
    );

    return {
      items,
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
