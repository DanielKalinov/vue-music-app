<template>
  <div id="add-song">
    <form>
      <h2>Add a Song</h2>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" name="title" />
      </div>
      <div class="form-group">
        <label for="artist">Artist</label>
        <input type="text" name="artist" />
      </div>
      <div class="form-group">
        <label for="audioFile">Audio file</label>
        <input type="file" name="audioFile" accept="audio/*" />
      </div>
      <button class="button primary-btn submit-btn">Upload</button>
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
#add-song {
  display: flex;
  justify-content: center;
}
</style>
