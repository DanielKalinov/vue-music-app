<template>
	<div id="edit-song">
		<form
			class="form"
			action="/upload"
			method="POST"
			enctype="multipart/form-data"
			@submit.prevent="
				editSong({
					userID: user.userID,
					song: { songID, title, artist, description }
				})
			"
			ref="form"
		>
			<h2>Edit your song</h2>
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
			<button class="button primary-btn submit-btn" :disabled="!formIsValid">
				Submit
			</button>
		</form>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
	data() {
		return {
			title: '',
			artist: '',
			description: '',
			songID: '',
			titleIsValid: true,
			artistIsValid: true,
			descriptionIsValid: true,
			serverErr: ''
		};
	},
	methods: {
		...mapActions(['editSong']),
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
		}
	},
	computed: {
		...mapGetters(['user']),
		formIsValid() {
			if (
				this.titleIsValid === true &&
				this.artistIsValid === true &&
				this.descriptionIsValid === true
			) {
				return true;
			} else {
				return false;
			}
		}
	},
	created() {
		const { id } = this.$route.params;
		this.$http.get(`http://localhost:3000/getsong/${id}`).then((res) => {
			const { title, artist, description, songID } = res.data.song;
			this.title = title;
			this.artist = artist;
			this.description = description;
			this.songID = songID;
		});
	}
};
</script>

<style scoped>
#edit-song {
	display: flex;
	justify-content: center;
}
</style>
