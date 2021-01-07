<template>
  <div id="add-song">
    <form
      action="/upload"
      method="POST"
      enctype="multipart/form-data"
      @submit.prevent="uploadSong"
      ref="form"
    >
      <h2>Upload a Song</h2>
      <div v-if="serverErr" class="server-err-message">{{ serverErr }}</div>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          name="title"
          v-model="title"
          autocomplete="off"
          @blur="validateTitle"
        />
        <p v-if="titleIsValid === false" class="form-err-message">
          Please enter a title
        </p>
      </div>
      <div class="form-group">
        <label for="artist">Artist</label>
        <input
          type="text"
          name="artist"
          v-model="artist"
          autocomplete="off"
          @blur="validateArtist"
        />
        <p v-if="artistIsValid === false" class="form-err-message">
          Please enter an artist
        </p>
      </div>
      <div class="form-group">
        <label for="file">File</label>
        <input
          type="file"
          name="file"
          accept="audio/*"
          ref="file"
          @change="handleFileChange"
        />
        <p v-if="fileIsValid === false" class="form-err-message">
          Please select a file
        </p>
      </div>
      <button :disabled="!formIsValid" class="button primary-btn submit-btn">
        Submit
      </button>
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
      titleIsValid: '',
      artistIsValid: '',
      fileIsValid: '',
      serverErr: ''
    };
  },
  methods: {
    validateTitle() {
      if (this.title) {
        this.titleIsValid = true;
      } else {
        this.titleIsValid = false;
      }
    },
    validateArtist() {
      if (this.artist) {
        this.artistIsValid = true;
      } else {
        this.artistIsValid = false;
      }
    },
    validateFile() {
      if (this.file) {
        this.fileIsValid = true;
      } else {
        this.fileIsValid = false;
      }
    },
    handleFileChange() {
      this.file = this.$refs.file.files[0];
      const audio = new Audio();
      audio.preload = 'metadata';
      audio.src = URL.createObjectURL(this.file);
      audio.onloadedmetadata = () => {
        window.URL.revokeObjectURL(audio.src);
        this.duration = audio.duration;
      };
      this.fileIsValid = true;
    },
    uploadSong() {
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('artist', this.artist);
      formData.append('duration', this.duration);
      formData.append('file', this.file);
      this.$store
        .dispatch('uploadSong', formData)
        .then((res) => console.log(res))
        .catch((err) => {
          this.serverErr = err;
          this.title = '';
          this.artist = '';
          this.file = '';
          this.$refs.file.value = '';
          this.artistIsValid = '';
          this.titleIsValid = '';
          this.fileIsValid = '';
        });
    }
  },
  computed: {
    formIsValid() {
      if (
        this.titleIsValid === true &&
        this.artistIsValid === true &&
        this.fileIsValid === true
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#add-song {
  display: flex;
  justify-content: center;
}
</style>