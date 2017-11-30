<template>
  <div class="game" v-on:click="emitSize">
    <div class="gameContent">

        <div class="title">
          <div class="team">
            {{game.away_team.full_name}}
            <img :src="'/static/img/logos/' + game.away_team.abbreviation + '.gif'" alt=""/>
          </div>
          <div class="at">&#64;</div>
          <div class="team">
            {{game.home_team.full_name}}
            <img :src="'/static/img/logos/' + game.home_team.abbreviation + '.gif'" alt=""/>
          </div>
        </div>

        <div class="infos">
          <div class="date">{{game.date}}</div>
          <div class="rating">Rating {{game.pointsBasedRating}}</div>
          <div class="aussies" v-if="game.aussies">
            <div @click="game.showOzDetail = !game.showOzDetail">
                <img src="../assets/aus.png" title="Show Aussie player details" alt="Show Aussie player details"/>
            </div>
            <div v-if="game.showOzDetail">
              <div v-for="player in game.aussies" :key="player.id">
                {{player.name}}: {{player.points}} points
                <span v-if="player.assists > 0">/ {{player.assists}} assists</span>
                <span v-if="player.turnovers > 0">/ {{player.turnovers}} turnovers</span>
                <span v-if="player.steals > 0">/ {{player.steals}} steals</span>
                <span v-if="player.blocks > 0">/ {{player.blocks}} blocks</span>
                in {{player.minutes}}mins.
                Shooting at {{player.field_goal_percentage}}%
                <span v-if="player.three_point_percentage > 0">({{player.three_point_percentage}}% from 3)</span>.
              </div>
            </div>
          </div>
          <div class="score" @click="game.showScore = !game.showScore">
            <div title="Show randomly sorted score">Game Score</div>
            <div v-if="game.showScore">{{game.finalScore}}</div>
          </div>
        </div>

    </div>
    <div class="gameSpacing"></div>
  </div>
</template>

<script>
export default {
	name: 'gameListItem',
  props: {
    game: {
      type: Object,
      default: {},
    }
  },
	methods: {
    emitSize(){
      this.$emit('sizeChanged');
    }
	},
	computed: {
		description: function() {
			return 'a';
		}
	}
}
</script>
<style scoped>
  .game{ position: relative;}
  .gameContent{
    background: rgba(255,255,255,.75);
    border-radius: 3px;
  }
  .gameSpacing{padding-bottom: 3px;}

  .title{
    background: rgba(255,255,255,.25);
  }
  .title > div {
    display: inline-block;
    vertical-align: middle;
  }

</style>
