import { RouteRecordRaw } from 'vue-router';
import MediaModule from './MediaModule.vue';
import Index from './views/Index.vue';
import Posts from './views/Posts.vue';
import Comments from './views/Comments.vue';
import Users from './views/Users.vue';
import Articles from './views/Articles.vue';
import auth from '@/middleware/auth';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/media/',
    name: 'mediaModule',
    component: MediaModule,
    meta: {
      middleware: [auth],
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
