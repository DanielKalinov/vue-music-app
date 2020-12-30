<template>
  <div id="add-song">
    <form>
      <h2>Upload a Song</h2>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" name="title" />
      </div>
      <div class="form-group">
        <label for="artist">Artist</label>
        <input type="text" name="artist" />
      </div>
      <div class="form-group">
        <label for="file">File</label>
        <input
          type="file"
          name="file"
          accept="audio/*"
          @change="handleFileChange"
          ref="audioFile"
        />
      </div>
      <button class="button primary-btn submit-btn">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      artist: '',
      duration: null,
      file: null,
      path: ''
    };
  },
  methods: {
    handleFileChange() {
      this.file = this.$refs.audioFile.files[0];
      const audio = new Audio();
      audio.preload = 'metadata';
      audio.src = URL.createObjectURL(this.file);
      audio.onloadedmetadata = () => {
        window.URL.revokeObjectURL(audio.src);
        this.duration = audio.duration;
        this.path = '/songs/' + this.file.name;
      };
    },
    uploadSong() {
      this.$store.dispatch('uploadSong', {
        title: this.title,
        artist: this.artist,
        file: this.file
      });
    }
  }
};
</script>

<style lang="scss">
#add-song {
  display: flex;
  justify-content: center;
}
</style>
