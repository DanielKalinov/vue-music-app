import { createApp } from 'vue';
import App from './App.vue';
import { createWebHistory, createRouter } from 'vue-router';
import axios from 'axios';
import Home from './components/pages/Home';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';

axios.defaults.withCredentials = true;

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/signup', component: Signup },
    { path: '/login', component: Login }
  ]
});

const app = createApp(App);
app.config.globalProperties.$http = axios;

app.use(router);

app.mount('#app');
