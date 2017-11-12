<template>
	<div class="gameList">
		<page-title title="Games" :subtitle="description"></page-title>
		<ul>
			<li v-for="game in games" :key="game.id">
				<router-link :to="{name: 'game_edit', params: {id: game.id}}">
				<p>
					<h5>{{ game.firstname }} {{ game.lastname }}</h5>
					    {{ game.phone }}<br/>
					    {{ game.email }}
				</p>
				</router-link>
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
		console.log('START')
		store.init()
		store.find2(this, 'games')
	},
	computed: {
		description: function() {
			return "You have " + (this.games ? this.games.length : 'x') + " team members";
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