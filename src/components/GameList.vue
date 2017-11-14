<template>
	<div class="gameList">
		<page-title title="Games" :subtitle="description"></page-title>


      <div class="eve"  v-for="game in games" :key="game.id">
        <div class="title">
          <span>
			  {{game.away_team.full_name}}
		  </span>
		<!--<img :src="'./assets/logos/' + game.home_team.abbreviation + '.gif'" alt="" style="max-height: 40px">-->
		<img :src="'/static/img/logos/' + game.away_team.abbreviation + '.gif'" alt="" style="max-height: 40px">
          &#64; <br/>
          <span >
			  {{game.home_team.full_name}}
		  </span>
			<img :src="'/static/img/logos/' + game.home_team.abbreviation + '.gif'" alt="" style="max-height: 40px">
        </div>
        <div class="summary">
          Rating {{game.pointsBasedRating}}
        </div>
        <div class="note" style="float: right">
          <span>Game Score</span>
          <span>
              {{game.finalScore}}
          </span>
        </div>
        <div class="type" style="float: right">
          {{game.date}}
        </div>
        <div class="note" v-if="game.aussies">
          <span v-on:click="toggleAussies(game.id)">
              <img src="../assets/aus.png" title="Show Aussie player details" alt="Show Aussie player details"/>
          </span>
          <span style="padding:0 10px 0 10px;" v-if="game.showOzDetail">
              <div v-for="player in game.aussies" :key="player.id">
                  <br/>
                  {{player.name}}: {{player.points}} points
                  <span v-if="player.assists > 0">/ {{player.assists}} assists</span>
                  <span v-if="player.turnovers > 0">/ {{player.turnovers}} turnovers</span>
                  <span v-if="player.steals > 0">/ {{player.steals}} steals</span>
                  <span v-if="player.blocks > 0">/ {{player.blocks}} blocks</span>
                  in {{player.minutes}}mins.
                  Shooting at {{player.field_goal_percentage}}%
                  <span v-if="player.three_point_percentage > 0">({{player.three_point_percentage}}% from 3)</span>.
                  <br/>
              </div>
            </span>
        </div>
      </div>

    <!--<ul>-->
			<!--<li v-for="game in games" :key="game.id">-->
				<!--<p>-->
					<!--<h5>{{ game.id }}</h5>-->
					<!--pointsTotalDiff {{ game.pointsTotalDiff }}-->
					<!--pointsFinalDiff {{ game.pointsFinalDiff }}-->
					<!--leadChanges {{ game.leadChanges }}-->
					<!--pointsBasedScore {{ game.pointsBasedScore }}-->
					<!--pointsBasedRating {{ game.pointsBasedRating }}-->
					<!--aussies {{ game.aussies }}-->
					<!--finalScore {{ game.finalScore }}-->
				<!--</p>-->
			<!--</li>-->
		<!--</ul>-->
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
	methods: {
		refresh: function() {
			console.log('refresh')
			store.findAll(this, 'games')
		},
		toggleAussies: function(gameId) {
			console.log('toggleAussies',gameId)

            let game = this.games.filter(function(g){
              return g.id === gameId;
            })[0];

			game.showOzDetail = !game.showOzDetail
		}
	},
	created () {
		let self=this;
		store.init(function () {
			console.log('init done')
			self.refresh()
		})
	},
	computed: {
		description: function() {
			return (this.games && this.games.length > 0 ? "There are " + this.games.length  + " completed games this season" : 'Loading game data');
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
