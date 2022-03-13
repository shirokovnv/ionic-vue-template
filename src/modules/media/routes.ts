import { RouteRecordRaw } from 'vue-router';
import MediaModule from './MediaModule.vue';
import Comments from './views/Comments.vue';
import Index from './views/Index.vue';
import Users from './views/Users.vue';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/media/',
    name: 'mediaModule',
    component: MediaModule,
    meta: {
      middleware: [],
    },
    children: [
      {
        path: '',
        component: Index,
      },
      {
        path: 'comments',
        component: Comments,
      },
      {
        path: 'users',
        component: Users,
      },
    ],
  },
];
