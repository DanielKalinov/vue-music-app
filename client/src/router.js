import { createWebHistory, createRouter } from 'vue-router';
import Home from './components/pages/Home';
import UploadSong from './components/pages/UploadSong';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';
import Profile from './components/pages/Profile';
import EditSong from './components/pages/EditSong';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    {
      path: '/uploadsong',
      component: UploadSong
    },
    {
      path: '/signup',
      component: Signup
    },
    {
      path: '/login',
      component: Login
    },
    { path: '/profile', component: Profile },
    { path: '/editsong/:id', component: EditSong }
  ]
});

export default router;
