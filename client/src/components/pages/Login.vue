<template>
  <div id="login">
    <form @submit.prevent="onSubmit">
      <h2>Login</h2>
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
      emailIsValid: 'pending',
      passwordIsValid: 'pending'
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
        .post('http://localhost:3000/login', {
          email: this.email,
          password: this.password
        })
        .then((res) => console.log(res));
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
