<template>
  <div id="login">
    <form @submit.prevent="onSubmit">
      <h2>Login</h2>
      <div v-if="serverErr" class="server-err-message">{{ serverErr }}</div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="text"
          name="email"
          v-model.trim="email"
          @blur="validateEmail"
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
        />
        <p v-if="passwordIsValid === false" class="form-err-message">
          Please enter a valid password
        </p>
      </div>
      <button type="submit" :disabled="!formIsValid" class="button primary-btn">
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
      emailIsValid: 'pending',
      passwordIsValid: 'pending',
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
      this.$http
        .post('http://localhost:3000/login', {
          email: this.email,
          password: this.password
        })
        .then((res) => {
          this.$emit('login', res.data.user);
          this.$router.push('/');
        })
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
