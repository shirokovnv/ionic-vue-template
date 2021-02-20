import { RouteRecordRaw } from 'vue-router';
import AuthModule from './AuthModule.vue';
import Profile from './views/Profile.vue';
import SignUp from './views/SignUp.vue';
import SignIn from './views/SignIn.vue';
import auth from '@/middleware/auth';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/auth/',
    name: 'authModule',
    component: AuthModule,
    children: [
      {
        path: 'profile',
        name: 'profile',
        component: Profile,
        meta: {
          middleware: [auth],
        },
      },
      {
        path: 'signin',
        name: 'signin',
        component: SignIn,
      },
      {
        path: 'signup',
        name: 'signup',
        component: SignUp,
      },
      {
        path: '',
        redirect: '/auth/profile',
      },
    ],
  },
];
