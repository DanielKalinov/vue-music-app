<template>
  <div id="login">
    <form class="form" @submit.prevent="onSubmit">
      <h2>Login</h2>
      <div v-if="serverErr" class="server-err-message">{{ serverErr }}</div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="text"
          name="email"
          v-model.trim="email"
          @blur="validateEmail"
          autocomplete="off"
        />
        <p v-if="emailIsValid === false" class="form-err-message">
          Please enter a valid email
        </p>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          v-model.trim="password"
          @blur="validatePassword"
          autocomplete="off"
        />
        <p v-if="passwordIsValid === false" class="form-err-message">
          Please enter a valid password
        </p>
      </div>
      <router-link to="/signup">Don't have an account?</router-link>
      <button
        type="submit"
        :disabled="!formIsValid"
        class="button primary-btn submit-btn"
      >
        Log In
      </button>
    </form>
  </div>
</template>

<script>
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
      if (this.emailIsValid === true && this.passwordIsValid === true) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    validateEmail() {
      if (this.email) {
        this.emailIsValid = true;
      } else {
        this.emailIsValid = false;
      }
    },
    validatePassword() {
      if (this.password) {
        this.passwordIsValid = true;
      } else {
        this.passwordIsValid = false;
      }
    },
    onSubmit() {
      this.$store
        .dispatch('logIn', { email: this.email, password: this.password })
        .catch((err) => {
          this.serverErr = err.response.data;
          this.email = '';
          this.password = '';

          this.emailIsValid = '';
          this.passwordIsValid = '';
        });
    }
  }
};
</script>

<style lang="scss" scoped>
#login {
  display: flex;
  justify-content: center;
}
</style>
