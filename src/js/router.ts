import VueRouter, {
  RouteConfig,
} from 'vue-router';
const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@pages/home/index.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@pages/about/index.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
