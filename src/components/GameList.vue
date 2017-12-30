<template>
	<div class="gameList">
		<page-title title="Games" :subtitle="description"></page-title>

    <div v-if="updateCount > 0">
      {{updateCount}} games updated
    </div>

    <div class="row">
      <div style="margin-bottom: 10px;">
        <select style="margin:22px 9px 20px;" v-model="teamSelected">
          <option value=""> Team </option>
          <option v-bind:value="team" v-for="team in teams">{{team}}</option>
        </select>
        <select style="margin:22px 9px 20px;" v-model="ratingSelected">
          <option value=""> Rating </option>
          <option value="A"> A </option>
          <option value="B"> B </option>
          <option value="C"> C </option>
        </select>

        <span @click="onlyWithOz = !onlyWithOz" class="textButton"><img src="../assets/aus.png" title="Show games with Australians"/>
          <span v-if="!onlyWithOz">With Australians</span>
          <span v-if="onlyWithOz">All</span>
        </span>
        <!--<span @click="showBestBy = !showBestBy" class="textButton" ng-show="showingBest == false">Best by day</span>-->
        <!--<span @click="showBestEver()" class="textButton" ng-show="showingBest == false">Best so far</span>-->
        <span @click="showCount+=5" class="textButton">More Games</span>
      </div>
    </div>

      <div class="eve"  v-for="(game, gIdx) in games" :key="game.id" v-if="(teamSelected =='' || game.home_team.full_name == teamSelected || game.away_team.full_name == teamSelected) && (ratingSelected =='' || game.pointsBasedRating == ratingSelected) && ((gIdx < showCount) || teamSelected != '' || ratingSelected != '' || onlyWithOz) && (onlyWithOz == false || game.aussies)">
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
        <div class="note" style="float: right" @click="game.showScore = !game.showScore">
          <span title="Show randomly sorted score">Game Score</span>
          <span v-if="game.showScore">
              {{game.finalScore}}
          </span>
        </div>
        <div class="type" style="float: right">
          {{game.date}}
        </div>
        <div class="note" v-if="game.aussies">
          <span @click="game.showOzDetail = !game.showOzDetail">
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
			games: [],
			teams: [],
			onlyWithOz: false,
			showCount: 10,
			updateCount: 0,
			ratingSelected : '',
			teamSelected : ''
		}
	},
	methods: {
		refresh: function(change) {
			console.log('refresh')
			store.findAll(this)

      if (change && change.docs) {
			  this.updateCount = change.docs.length;
			  self = this;
			  setTimeout(function() {
          self.updateCount = 0;
        }, 5000);
      }
		}
	},
	created () {
		let self=this;
		store.init(function (change) {
			console.log('init done', change)
			self.refresh(change)
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
