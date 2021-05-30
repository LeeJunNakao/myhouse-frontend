import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Login from '@/views/Auth/Login.vue';
import Register from '@/views/Auth/Register.vue';
import Home from '@/views/Home/Home.vue';
import RecoverPassword from '@/views/Auth/RecoverPassword.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/',
    name: 'Home',
    component: Home },
  { path: '/login',
    name: 'Login',
    component: Login },
  { path: '/register',
    name: 'Register',
    component: Register },
  { path: '/recover-password',
    name: 'RecoverPassword',
    component: RecoverPassword },
];

const router = createRouter({ history: createWebHistory(process.env.BASE_URL),
  routes });

export default router;
