<template>
  <div>
    <h1>Home page</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      songs: []
    };
  },
  created() {
    this.$http.get('http://localhost:3000/songs').then((res) => {
      console.log(res.data);
    });
  }
};
</script>

<style lang="scss"></style>
