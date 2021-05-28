import { RouteRecordRaw } from 'vue-router';
import HomeModule from './HomeModule.vue';
import Home from './views/Home.vue';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'homeModule',
    component: HomeModule,
    meta: {
      middleware: [],
    },
    children: [
      {
        path: '',
        name: 'home',
        component: Home,
      },
    ],
  },
];
