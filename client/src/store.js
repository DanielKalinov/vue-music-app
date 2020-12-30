import { createStore } from 'vuex';
import axios from 'axios';
import router from './router';

const store = createStore({
  state() {
    return {
      user: null,
      loading: true
    };
  },
  actions: {
    auth(context) {
      axios.get('http://localhost:3000/auth').then((res) => {
        context.commit('auth', res.data.user);
      });
    },
    signUp(context, payload) {
      const { email, password } = payload;
      return new Promise((resolve, reject) => {
        axios
          .post('http://localhost:3000/signup', { email, password })
          .then((res) => {
            resolve(res);

            context.commit('signUp', res.data.user);

            router.replace('/');
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    logIn(context, payload) {
      const { email, password } = payload;
      return new Promise((resolve, reject) => {
        axios
          .post('http://localhost:3000/login', {
            email,
            password
          })
          .then((res) => {
            resolve(res);

            context.commit('login', res.data.user);

            router.replace('/');
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    logOut(context) {
      context.commit('logOut');
    },
    uploadSong() {}
  },
  mutations: {
    auth(state, user) {
      if (user) {
        state.user = user;
        state.loading = false;
      } else {
        state.user = null;
        state.loading = false;
      }
    },
    signUp(state, user) {
      state.user = user;
    },
    login(state, user) {
      state.user = user;
    },
    logOut(state) {
      axios.delete('http://localhost:3000/logout').then(() => {
        state.user = null;
        router.replace('/login');
      });
    },
    uploadSong() {}
  },
  getters: {
    user(state) {
      return state.user;
    },
    loading(state) {
      return state.loading;
    }
  }
});

export default store;
