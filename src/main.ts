import { createApp } from 'vue';
import Vue3Material from 'vue3-material';
import App from './App.vue';
import router from './router';
import store from './store';

createApp(App)
  .use(store)
  .use(router)
  .use(Vue3Material)
  .mount('#app');
