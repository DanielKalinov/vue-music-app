<template>
	<div id="add-song">
		<form
			class="form"
			action="/upload"
			method="POST"
			enctype="multipart/form-data"
			@submit.prevent="uploadSong"
			ref="form"
		>
			<h2>Upload a song</h2>
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
				<label for="description">Your thoughts...</label>
				<textarea
					name="description"
					rows="4"
					v-model="description"
					autocomplete="off"
					@blur="validateDescription"
				/>
				<p v-if="descriptionIsValid === false" class="form-err-message">
					Please enter a description
				</p>
			</div>
			<div class="form-group">
				<label for="songFile">Song file</label>
				<input
					type="file"
					name="songFile"
					accept="audio/*"
					ref="songFile"
					@change="handleSongFileChange"
				/>
				<p v-if="songFileIsValid === false" class="form-err-message">
					Please select a song file
				</p>
			</div>
			<div class="form-group">
				<label for="artworkFile">Artwork file</label>
				<input
					type="file"
					name="artworkFile"
					accept="image/*"
					ref="artworkFile"
					@change="handleArtworkFileChange"
				/>
				<p v-if="artworkFileIsValid === false" class="form-err-message">
					Please select an artwork file
				</p>
			</div>
			<button class="button primary-btn submit-btn" :disabled="!formIsValid">
				Submit
			</button>
		</form>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			title: '',
			artist: '',
			description: '',
			duration: null,
			songFile: null,
			artworkFile: null,
			titleIsValid: '',
			artistIsValid: '',
			descriptionIsValid: '',
			songFileIsValid: '',
			artworkFileIsValid: '',
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
		handleArtworkFileChange() {
			this.artworkFile = this.$refs.artworkFile.files[0];
			this.artworkFileIsValid = true;
		},
		uploadSong() {
			const formData = new FormData();
			formData.append('userID', this.user.userID);
			formData.append('title', this.title);
			formData.append('artist', this.artist);
			formData.append('description', this.description);
			formData.append('duration', this.duration);
			formData.append('author', this.user.username);
			formData.append('songFile', this.songFile);
			formData.append('artworkFile', this.artworkFile);
			this.$store.dispatch('uploadSong', formData).catch((err) => {
				this.serverErr = err;
				this.title = '';
				this.artist = '';
				this.description = '';
				this.songFile = '';
				this.artworkFile = '';

				this.$refs.songFile.value = '';
				this.$refs.artworkFile.value = '';

				this.titleIsValid = '';
				this.artistIsValid = '';
				this.descriptionIsValid = '';
				this.songFileIsValid = '';
			});
		}
	},
	computed: {
		...mapGetters(['user']),
		formIsValid() {
			if (
				this.titleIsValid === true &&
				this.artistIsValid === true &&
				this.descriptionIsValid === true &&
				this.songFileIsValid === true &&
				this.artworkFileIsValid === true
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
