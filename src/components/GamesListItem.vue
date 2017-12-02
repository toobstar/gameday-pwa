<template>
  <div class="game" v-on:click="emitSize">
    <div class="gameContent">

      <div class="title" v-on:click="toggleStats(ALL)">
        <div class="team">
          <div class="name">{{game.away_team.full_name}}</div>
          <img :src="'/static/img/logos/' + game.away_team.abbreviation + '.gif'" alt=""/>
        </div>
        <div class="date">
          {{game.date}}
          <div class="at">&#64;</div>
        </div>
        <div class="team">
          <div class="name">{{game.home_team.full_name}}</div>
          <img :src="'/static/img/logos/' + game.home_team.abbreviation + '.gif'" alt=""/>
        </div>
      </div>

      <div class="controls">
        <div>
          <icon name="icon-rating" :clazz="game.pointsBasedRating"></icon> {{game.pointsBasedRating}} Rating
        </div>
        <div v-on:click="toggleStats(OZ)">
          <icon name="icon-australia" :clazz="game.aussies ? 'blue' : ''" ></icon> {{hasAussies}}
        </div>
        <div v-on:click="toggleStats(SCORE)">
          <icon name="icon-results" clazz="results" ></icon> Results
        </div>
      </div>

      <div class="info">

          <div v-if="game.aussies && (stats == OZ || stats == ALL)">
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

        <div class="score" v-if="stats == SCORE || stats == ALL">
          {{game.finalScore}}
        </div>
      </div>

    </div>
    <div class="gameSpacing"></div>
  </div>
</template>

<script>
  import Icon from '@/components/Icon.vue'
  const NONE = 'NONE'
  const SCORE = 'SCORE'
  const OZ = 'OZ'
  const ALL = 'ALL'

export default {
	name: 'gameListItem',
  components: { Icon },
  props: {
    game: {
      type: Object,
      default: {},
    }
  },
  data: function(){
    return {
      NONE: 'NONE',
      SCORE: 'SCORE',
      OZ: 'OZ',
      ALL: 'ALL',
      stats: 'NONE',
    }
  },
	methods: {
    emitSize(){
      this.$emit('sizeChanged');
    },
    toggleStats(s){
      this.stats = s !== this.stats ? s : this.NONE;
    }
	},
	computed: {
    hasAussies: function(){
      return (this.game.aussies ? this.game.aussies.length :'No')+' aussie'+(this.game.aussies ? this.game.aussies.length != 1 ? 's':'':'');
    }
	}
}
</script>
<style scoped>
  .game{ position: relative;}
  .gameContent{
    background: rgba(255,255,255,.75);
    border-radius: 5px;
    cursor: pointer;
  }
  .gameSpacing{padding-bottom: 3px;}

  .title,.controls{
    position: relative;
    font-size: 0;
  }
  .title>div,.controls>div{font-size: 15px;}
  .title .team {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    width: 50%;
  }
  .title .date{
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    padding: 5px;
    text-align: center;
    font-weight: 400;
    z-index: 3;
  }
  .title .date .at{
    font-size: 100px;
    font-weight: 600;
    color: rgba(0, 0, 0, .1);
    line-height: 50px;
  }
  .title .team img {
    position: absolute;
    left:0;
    top:0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
    filter: blur(5px);
    opacity: .5;
  }
  .title .team .name {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 100px;
    font-size: 1.5em;
    font-weight: 400;
    text-shadow: 1px 1px 0 #fff;
  }

  .controls{
    border-top: 1px solid rgba(0,0,0,.1);
    z-index: 5;
  }
  .controls div+div{border-left: 1px solid rgba(0,0,0,.1);}
  .controls>div{
    display: inline-block;
    width: calc(100% / 3);
    padding: 5px;
    text-align: center;
  }
  .controls>div:hover{background: rgba(0,0,0,.05);}

  .game svg.icon{fill:#999;}
  svg.icon.A{fill:#090;}
  svg.icon.B{fill:#990;}
  svg.icon.C{fill:#900;}
  svg.icon.blue{fill:#06a;}
  div:hover > svg.icon.results{fill:#06a;}

  .info{
    color: #eee;
    background: rgba(0,0,0,.8);
    border-radius: 0 0 5px 5px;
  }
  .info > div {
    padding: 10px;
    text-align: center;
  }

</style>
