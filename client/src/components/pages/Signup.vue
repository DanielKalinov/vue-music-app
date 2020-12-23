<template>
  <div id="signup">
    <form>
      <h2>Signup</h2>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="text" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" />
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm password</label>
        <input type="password" />
      </div>
      <button type="submit" class="button primary-btn">Sign Up</button>
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
#signup {
  display: flex;
  justify-content: center;
}
</style>
