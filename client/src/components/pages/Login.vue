<template>
  <div id="login">
    <form>
      <h2>Login</h2>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="text" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" />
      </div>
      <button type="submit" class="button primary-btn">Log In</button>
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
#login {
  display: flex;
  justify-content: center;
}
</style>
