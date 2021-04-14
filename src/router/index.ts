import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Login from '@/views/Auth/Login.vue';
import Register from '@/views/Auth/Register.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
