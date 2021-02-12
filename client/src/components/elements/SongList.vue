<template>
	<div v-if="user" id="song-list">
		<ul>
			<li v-for="(song, index) in playlist" :key="song.id">
				<SongItem
					@play="onPlay"
					:song="song"
					:index="index"
					:playlist="playlist"
				/>
			</li>
		</ul>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import SongItem from './SongItem';

export default {
	props: ['playlist'],

	components: {
		SongItem
	},
	methods: {
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
	margin: auto;
	max-width: 640px;
	list-style: none;
}
</style>
