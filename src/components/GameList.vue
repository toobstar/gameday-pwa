<template>
	<div class="gameList">
		<page-title title="Games" :subtitle="description"></page-title>
		<ul>
			<li v-for="game in games" :key="game.id">
				<p>
					<h5>{{ game.id }}</h5>
					pointsTotalDiff {{ game.pointsTotalDiff }}
					pointsFinalDiff {{ game.pointsFinalDiff }}
					leadChanges {{ game.leadChanges }}
					pointsBasedScore {{ game.pointsBasedScore }}
					pointsBasedRating {{ game.pointsBasedRating }}
					aussies {{ game.aussies }}
					finalScore {{ game.finalScore }}
				</p>
			</li>
		</ul>
	</div>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import store from '@/data'

export default {
	name: 'gameList',
	components: { PageTitle },
	data() {
		return {
			games: []
		}
	},
	created () {
		store.init()
		store.findAll(this, 'games')
	},
	computed: {
		description: function() {
			return "There are " + (this.games ? this.games.length : 'x') + " completed games this season";
		}
	}
}

</script>

<style scoped>
	ul {
		list-style-type: none;
		padding:0;
	}

	li {
		border-top: 1px solid #2196F3;
		border-bottom: 1px solid #2196F3;
		color: #616161;
		font-size: 0.9em;
	}

	li a {
		text-decoration: none;
		color: inherit;
	}

	h5 {
		margin: 0;
		color: #212121;
		font-size: 1em;
	}

</style>