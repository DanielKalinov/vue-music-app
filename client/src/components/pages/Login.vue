<template>
  <div id="login">
    <form @submit.prevent="onSubmit">
      <h2>Login</h2>
      <div v-if="serverErr" class="server-err-message">{{ serverErr }}</div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="text" name="email" v-model.trim="email" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" name="password" v-model.trim="password" />
      </div>
      <button type="submit" :disabled="!formIsValid" class="button primary-btn">
        Log In
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      emailIsValid: '',
      passwordIsValid: '',
      serverErr: ''
    };
  },
  computed: {
    formIsValid() {
      return true;
    }
  },
  methods: {
    onSubmit() {
      axios
        .post(
          'http://localhost:3000/login',
          {
            email: this.email,
            password: this.password
          },
          { withCredentials: true }
        )
        .then((res) => console.log(res))
        .catch((err) => {
          this.serverErr = err.response.data;
          this.email = '';
          this.password = '';
        });
    }
  }
};
</script>

<style lang="scss">
#login {
  display: flex;
  justify-content: center;
}
</style>
