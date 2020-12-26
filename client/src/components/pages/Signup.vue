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
          Password must be at least 8 characters long
        </p>
      </div>
      <button type="submit" :disabled="!formIsValid" class="button primary-btn">
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
    validatePassword() {
      if (this.password.length >= 8) {
        this.passwordIsValid = true;
      } else {
        this.passwordIsValid = false;
      }
    },
    onSubmit() {
      this.$http
        .post(
          'http://localhost:3000/signup',
          {
            email: this.email,
            password: this.password
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res.data);
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
#signup {
  display: flex;
  justify-content: center;
}
</style>
