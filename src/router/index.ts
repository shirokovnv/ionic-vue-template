import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import middlewarePipeline from '@/middleware/middlewarePipeline';
import NotFound from '@/components/NotFound.vue';

// Load module routes dynamically.
const requireContext = require.context('../modules', true, /routes\.ts$/);
const moduleRoutes = requireContext
  .keys()
  .flatMap((file) => requireContext(file).routes);

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },

  ...moduleRoutes,

  {
    path: '/404',
    name: '404',
    component: NotFound,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: '404' },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const middleware: any = to.meta.middleware;

  if (!middleware || middleware.length === 0) {
    return next();
  }

  const context = {
    to,
    from,
    next,
  };

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  });
});

export default router;
