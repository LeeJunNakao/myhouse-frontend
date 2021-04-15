import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Login from '@/views/Auth/Login.vue';
import Register from '@/views/Auth/Register.vue';
import Home from '@/views/Home/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
