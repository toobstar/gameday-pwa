<template>
  <div>

      <header>
          <h1>Best game to watch</h1>
      </header>

    <div class="stats">

      {{description}}
      <div v-if="updateCount > 0">
        {{updateCount}} games updated
      </div>

    </div>
    <div class="filters">

      <select v-model="teamSelected">
        <option value=""> Team </option>
        <option v-bind:value="team" v-for="team in teams">{{team}}</option>
      </select>

      <select v-model="ratingSelected">
        <option value=""> Rating </option>
        <option value="A"> A </option>
        <option value="B"> B </option>
        <option value="C"> C </option>
      </select>

      <span @click="onlyWithOz = !onlyWithOz" class="textButton"><img src="../assets/aus.png" title="Show games with Australians"/>
        <span v-if="!onlyWithOz">All</span>
        <span v-if="onlyWithOz">With Australians</span>
      </span>

    </div>

    <gamesList :listData="filteredGames"></gamesList>

    <div @click="showCount+=5" class="btn">More Games</div>

  </div>
</template>

<script>
import store from '@/data'
import GamesList from '@/components/GamesList'

export default {
	name: 'games',
  components:{ GamesList },
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
		refresh: function(data) {
			store.findAll(this)

      if (data && data.docs) {
			  this.updateCount = data.docs.length;
			  let self = this;
			  setTimeout(function() {
          self.updateCount = 0;
        }, 5000);
      }
		}
	},
  computed: {
    filteredGames:function(){
      let that = this;
      return this.games.filter(function(game,i){
          let matchTeam = that.teamSelected == '' || game.home_team.full_name == that.teamSelected || game.away_team.full_name == that.teamSelected;
          let matchRating = that.ratingSelected == '' || game.pointsBasedRating == that.ratingSelected;
          let matchOz = that.onlyWithOz == false || game.aussies;
          // if filter selected ignore count
          let matchCount = (i < that.showCount) || that.teamSelected != '' || that.ratingSelected != '' || that.onlyWithOz;
          return matchTeam && matchRating && matchOz && matchCount;
        })
    },
    description: function() {
      return (this.games && this.games.length > 0 ? "There are " + this.games.length  + " completed games this season" : 'Loading game data');
    }
  },
	created () {
		let self=this;
		store.init(function(data) { self.refresh(data) })
	},
}
</script>
<style>
  .btn{
    display: inline-block;
    padding: 10px;
    background: rgba(255,255,255,.75);
    border-radius: 5px;
    cursor: pointer;
  }
</style>





