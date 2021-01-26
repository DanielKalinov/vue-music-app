<template>
  <div class="song-item" :class="{ 'active-song-item': isActive }">
    <div class="song-item-header">
      <div class="song-item-post-info">
        <i class="material-icons">account_circle</i>
        <div>
          <p>{{ song.author }}</p>
          <p>{{ date }}</p>
        </div>
      </div>
    </div>
    <div class="song-item-main">
      <p class="song-item-description">{{ song.description }}</p>
      <div class="song-item-player">
        <div class="song-item-metainfo">
          <img
            :src="`http://localhost:3000/songimage/${song.artworkFilename}`"
          />
          <div class="song-item-info">
            <p
              class="song-item-title"
              :class="{
                'active-song-item': currentSong && currentSong._id === song._id
              }"
            >
              {{ song.title }}
            </p>
            <p class="song-item-artist">{{ song.artist }}</p>
          </div>
        </div>
        <i
          class="material-icons song-item-play-pause-btn"
          @click="playPause(song)"
          >{{ playPauseButton }}</i
        >
      </div>
    </div>
    <div class="song-item-actions">
      <i
        class="material-icons song-item-favorite-btn"
        :class="{ 'favorite-btn-liked': liked }"
        @click="addToFavorites({ song, userID: user.userID })"
        >favorite</i
      >
      <i class="material-icons" @click="openCommentsWindow(song._id)"
        >comment</i
      >
      <i
        v-if="song.author === user.username"
        class="material-icons song-itme-delete-btn"
        @click="deleteSong({ id: song._id })"
        >delete</i
      >
    </div>
    <div
      v-if="commentsWindowOpen"
      class="song-item-comments-window-container"
      @click="closeCommentsWindow"
      ref="commentsWindowContainer"
    >
      <div class="song-item-comments-window" ref="commentsWindow">
        <ul class="song-item-comment-list">
          <li class="song-item-comment-list-item">
            <div class="song-item-comment-info">
              <i class="material-icons">account_circle</i>
              <div>
                <p>Username</p>
                <p>Time</p>
              </div>
            </div>
            <p class="song-item-comment-content">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore id
              itaque quibusdam consequatur vitae placeat porro explicabo
              voluptatem distinctio autem perferendis doloribus.
            </p>
          </li>
        </ul>
        <form class="comments-form-group" @submit.prevent="onSubmit">
          <label for="comment">Add a comment...</label>
          <textarea
            name="comment"
            cols="30"
            rows="1"
            v-model="comment"
            @blur="validateComment"
          ></textarea>
          <button
            type="submit"
            class="button primary-btn"
            :disabled="!commentIsValid"
          >
            Comment
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  props: ['song', 'index'],
  data() {
    return {
      comment: '',
      commentsWindowOpen: false,
      commentIsValid: ''
    };
  },
  methods: {
    ...mapActions(['addToFavorites', 'deleteSong']),
    playPause(song) {
      this.$store.dispatch('playPause', { song, index: this.index });
      this.$emit('play');
    },
    openCommentsWindow() {
      if (this.commentsWindowOpen) {
        this.commentsWindowOpen = false;
        document.body.style.overflow = 'scroll';
      } else {
        this.commentsWindowOpen = true;
        document.body.style.overflow = 'hidden';
      }
    },
    closeCommentsWindow(e) {
      if (e.target === this.$refs.commentsWindowContainer) {
        this.commentsWindowOpen = false;
      }
    },
    validateComment() {
      if (this.comment) {
        this.commentIsValid = true;
      } else {
        this.commentIsValid = false;
      }
    },
    onSubmit() {
      console.log('Submit');
    }
  },
  computed: {
    ...mapGetters(['currentSong', 'paused', 'user']),
    isActive() {
      if (this.currentSong && this.currentSong._id === this.song._id) {
        return true;
      } else {
        return false;
      }
    },
    date() {
      const date = new Date(this.song.date);
      return date.toDateString();
    },
    liked() {
      const songIsFavorite = this.user.favoriteSongs.find(
        (favoriteSong) => favoriteSong._id === this.song._id
      );
      if (songIsFavorite) {
        return true;
      } else {
        return false;
      }
    },
    playPauseButton() {
      if (this.currentSong === this.song) {
        if (this.paused) {
          return 'play_arrow';
        } else {
          return 'pause';
        }
      } else {
        return 'play_arrow';
      }
    }
  },
  created() {
    window.addEventListener('click', this.closeCommentsWindow);
  },
  unmounted() {
    window.removeEventListener('click', this.closeCommentsWindow);
  }
};
</script>

<style lang="scss" scoped>
@import './SongItem.scss';
</style>
