import { createApp } from 'vue';
import App from './App.vue';
import { createWebHistory, createRouter } from 'vue-router';
import axios from 'axios';
import Home from './components/pages/Home';
import AddSong from './components/pages/AddSong';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';
import Profile from './components/pages/Profile';

axios.defaults.withCredentials = true;

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/addsong', component: AddSong },
    { path: '/signup', component: Signup },
    { path: '/login', component: Login },
    { path: '/profile', component: Profile }
  ]
});

const app = createApp(App);
app.config.globalProperties.$http = axios;

app.use(router);

app.mount('#app');
