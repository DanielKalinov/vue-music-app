<template>
  <header>
    <ul id="nav-links">
      <li>
        <router-link to="/">Home</router-link>
      </li>
    </ul>
    <ul id="auth-links">
      <li>
        <router-link to="/signup" id="signupBtn" class="button primary-btn"
          >Sign Up</router-link
        >
      </li>
      <li>
        <router-link to="/login" id="loginBtn" class="button secondary-btn"
          >Log In</router-link
        >
      </li>
    </ul>
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss">
header {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  width: 100%;
  background-color: #212121;

  ul {
    display: flex;
    align-items: center;
    list-style: none;

    li {
      a {
        display: inline-block;
        padding: 10px;
        text-decoration: none;
      }
    }
  }

  #signupBtn {
    margin-right: 10px;
  }
}
</style>
