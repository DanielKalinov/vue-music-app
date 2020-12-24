<template>
  <div id="signup">
    <form @submit.prevent="onSubmit">
      <h2>Signup</h2>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="text"
          name="email"
          v-model.trim="email"
          @blur="validateEmail"
        />
        <p v-if="!emailIsValid" class="form-err-message">
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
        <p v-if="!passwordIsValid" class="form-err-message">
          Please enter a valid password
        </p>
      </div>
      <button type="submit" :disabled="!formIsValid" class="button primary-btn">
        Sign Up
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
      if (this.password) {
        this.passwordIsValid = true;
      } else {
        this.passwordIsValid = false;
      }
    },
    onSubmit() {
      axios
        .post('http://localhost:3000/signup')
        .then((res) => console.log(res));
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
