import { createWebHistory, createRouter } from 'vue-router';
import Home from './components/pages/Home';
import UploadSong from './components/pages/UploadSong';
import Favorites from './components/pages/Favorites';
import MySongs from './components/pages/MySongs';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';
import EditSong from './components/pages/EditSong';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', component: Home },
		{
			path: '/uploadsong',
			component: UploadSong
		},
		{ path: '/favorites', component: Favorites },
		{ path: '/mysongs', component: MySongs },
		{
			path: '/signup',
			component: Signup
		},
		{
			path: '/login',
			component: Login
		},
		{ path: '/editsong/:id', component: EditSong }
	]
});

router.beforeEach(() => {
	window.scrollTo(0, 0);
});

export default router;
