<template>
  <div id="signup">
    <form @submit.prevent="onSubmit">
      <h2>Signup</h2>
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
        <label for="username">Username</label>
        <input
          type="text"
          name="email"
          v-model.trim="username"
          @blur="validateUsername"
          autocomplete="off"
        />
        <p v-if="usernameIsValid === false" class="form-err-message">
          Username must be at least 10 characters long
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
          Password must be at least 10 characters long
        </p>
      </div>
      <button
        type="submit"
        :disabled="!formIsValid"
        class="button primary-btn submit-btn"
      >
        Sign Up
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      username: '',
      password: '',
      emailIsValid: '',
      usernameIsValid: '',
      passwordIsValid: '',
      serverErr: ''
    };
  },
  computed: {
    formIsValid() {
      if (
        this.emailIsValid === true &&
        this.usernameIsValid &&
        this.passwordIsValid === true
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    validateEmail() {
      if (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          this.email
        )
      ) {
        this.emailIsValid = true;
      } else {
        this.emailIsValid = false;
      }
    },
    validateUsername() {
      if (this.username.length >= 10) {
        this.usernameIsValid = true;
      } else {
        this.usernameIsValid = false;
      }
    },
    validatePassword() {
      if (this.password.length >= 10) {
        this.passwordIsValid = true;
      } else {
        this.passwordIsValid = false;
      }
    },
    onSubmit() {
      this.$store
        .dispatch('signUp', { email: this.email, password: this.password })
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
#signup {
  display: flex;
  justify-content: center;
}
</style>
