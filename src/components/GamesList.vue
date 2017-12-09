<template>
  <div ref="gamesListWrapper">

    <transition-group
      name="elastic-list"
      tag="div"
      class="elastic-list"
      ref="gamesList"
      v-bind:css="false"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:leave="leave"
    >
      <gamesListItem v-for="(d,k) in listData"
           :key="d.id"
           :game="d"
           @sizeChanged="updateVisibles"
      ></gamesListItem>
    </transition-group>

  </div>
</template>

<script>
  import Velocity from "velocity-animate";
  import GamesListItem from '@/components/GamesListItem.vue'
  export default {
    name: "gamesList",
    components: { GamesListItem },
    props: {
      listData:{
        type: Array,
      },
  },
  data: function(){
    return {
      sequenceSpeed: 2000,
      sequenceDelay: 10,
    }
  },
  methods: {
    beforeEnter: function (el) {
      el.style.opacity = 0
      el.style.height = 0
    },
    enter: function (el, done) {
      var delay = el.dataset.index * this.sequenceDelay
      var that = this;
      setTimeout(function () {
        that.updateVisible(el);
      }, delay)
    },
    updateVisible: function(el){
      let tempH = el.style.height;
      el.style.height = 'initial'
      this.$nextTick(() => {
        let to = el.offsetHeight
        el.style.height = tempH;
      Velocity(el,{
        opacity:1,
        height:to,
      },{duration:this.sequenceSpeed});
    });
    },
    leave: function (el, done) {
      var delay = el.dataset.index * this.sequenceDelay
      setTimeout(function () {
        Velocity(el,{
          opacity:0,
          height:0,
        },{duration:this.sequenceSpeed});
      }, delay)
    },
    updateVisibles: function(){
      if(this.$refs.gamesList && this.$refs.gamesList.children){
        for (var i = 0; i < this.$refs.gamesList.children.length; i++) {
          this.updateVisible(this.$refs.gamesList.children[i].elm);
        }
      }
    },
  },
  watch:{
    listData(){
      this.updateVisibles()
    }
  },
  mounted () {
    this.updateVisibles()
    window.addEventListener('resize', this.updateVisibles);
  },
  beforeDestroy(){
    window.removeEventListener('resize', this.updateVisibles);
  }
  }
</script>
