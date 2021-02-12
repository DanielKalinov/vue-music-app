<template>
	<div id="favorites">
		<SongList
			v-if="favoriteSongs.length > 0"
			:playlist="favoriteSongs"
			@play="onPlay"
		/>
		<div v-else id="msg-container">
			<h2>No songs added to Favorites yet.</h2>
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
				index,
				playlist: 'favoriteSongs'
			});
			this.$emit('play');
		},
		onPlay() {
			this.$emit('play');
		}
	},
	computed: {
		...mapGetters(['user', 'favoriteSongs'])
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
