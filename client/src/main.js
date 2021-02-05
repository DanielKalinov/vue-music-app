import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
// import store from './store';
import store from './store/index';
import router from './router';

axios.defaults.withCredentials = true;

const app = createApp(App);
app.config.globalProperties.$http = axios;

app.use(router);
app.use(store);

app.mount('#app');
