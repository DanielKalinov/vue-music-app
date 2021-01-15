import { createWebHistory, createRouter } from 'vue-router';
import Home from './components/pages/Home';
import UploadSong from './components/pages/UploadSong';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';
import Profile from './components/pages/Profile';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    {
      path: '/uploadsong',
      component: UploadSong,
      meta: { requiresAuth: true }
    },
    {
      path: '/signup',
      component: Signup
    },
    {
      path: '/login',
      component: Login
    },
    { path: '/profile', component: Profile, meta: { requiresAuth: true } }
  ]
});

export default router;
