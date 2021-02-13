<template>
	<div id="my-songs">
		<SongList
			v-if="user.uploadedSongs.length > 0"
			:playlist="user.uploadedSongs"
			@play="onPlay"
		/>
		<div v-else id="msg-container">
			<h2>No songs uploaded yet.</h2>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import SongList from '../elements/SongList';

export default {
	components: {
		SongList
	},
	methods: {
		playPause(song, index) {
			this.$store.dispatch('playPause', {
				song,
				index
			});
			this.$emit('play');
		},
		onPlay() {
			this.$emit('play');
		}
	},
	computed: {
		...mapGetters(['user'])
	}
};
</script>

<style lang="scss" scoped>
ul {
	list-style: none;

	li {
		padding: 10px;

		&:hover {
			background-color: #424242;
		}
	}
}
#msg-container {
	display: flex;
	align-items: center;
	justify-content: center;
	padding-top: 200px;
}
</style>
