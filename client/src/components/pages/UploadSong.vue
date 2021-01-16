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
        <label for="description">Your thoughts ...</label>
        <textarea
          name="description"
          rows="4"
          v-model="description"
          @blur="validateDescription"
        />
        <p v-if="descriptionIsValid === false" class="form-err-message">
          Please enter a description
        </p>
      </div>
      <div class="form-group">
        <label for="file">File</label>
        <input
          type="file"
          name="songFile"
          accept="audio/*"
          ref="songFile"
          @change="handleSongFileChange"
        />
        <p v-if="songFileIsValid === false" class="form-err-message">
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
      description: '',
      duration: null,
      songFile: null,
      titleIsValid: '',
      artistIsValid: '',
      descriptionIsValid: '',
      songFileIsValid: '',
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
    validateDescription() {
      if (this.description) {
        this.descriptionIsValid = true;
      } else {
        this.descriptionIsValid = false;
      }
    },
    validateSongFile() {
      if (this.songFile) {
        this.songFileIsValid = true;
      } else {
        this.songFileIsValid = false;
      }
    },
    handleSongFileChange() {
      this.songFile = this.$refs.songFile.files[0];
      const audio = new Audio();
      audio.preload = 'metadata';
      audio.src = URL.createObjectURL(this.songFile);
      audio.onloadedmetadata = () => {
        window.URL.revokeObjectURL(audio.src);

        var mins = ~~((audio.duration % 3600) / 60);
        var secs = ~~audio.duration % 60;

        var result = '';

        result += '' + mins + ':' + (secs < 10 ? '0' : '');
        result += '' + secs;

        this.duration = result;
      };
      this.songFileIsValid = true;
    },
    uploadSong() {
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('artist', this.artist);
      formData.append('description', this.description);
      formData.append('duration', this.duration);
      formData.append('songFile', this.songFile);
      this.$store
        .dispatch('uploadSong', formData)
        .then((res) => console.log(res))
        .catch((err) => {
          this.serverErr = err;
          this.title = '';
          this.artist = '';
          this.description = '';
          this.songFile = '';
          this.$refs.songFile.value = '';

          this.titleIsValid = '';
          this.artistIsValid = '';
          this.descriptionIsValid = '';
          this.songFileIsValid = '';
        });
    }
  },
  computed: {
    formIsValid() {
      if (
        this.titleIsValid === true &&
        this.artistIsValid === true &&
        this.descriptionIsValid === true &&
        this.songFileIsValid === true
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
