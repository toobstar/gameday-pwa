<template>
  <div id="app">
    <!--<header>-->
      <!--<span>Best game to watch</span>-->
    <!--</header>-->
    <div class="jumbotron text-center pageHeader" onclick="setImgBg();">
      <h1 class="pageHeaderTxt">NBA game of the day<span class="label label-info"></span></h1>
    </div>
    <main>
      <!--<img src="./assets/logo.png" alt="Vue.js PWA">-->
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>
<style>
  html 					{ overflow-y:scroll; }
  body 					{
    padding-top:50px;
    background-image:   url('./assets/clipsfloor.png');
    background-repeat:  repeat;
  }

  .pageHeader {
    background-image:   url('./assets/green.jpg');
    background-repeat:  repeat;
    color:  darkorange;
  }
  .pageHeaderTxt {
    border-bottom-color: #DFDFDF;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    color: #FCF8F9;
    display: inline-block;
    font-family: "Jigsaw Light", sans-serif;
    font-size: 58px;
    font-stretch: normal;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 5.8px;
    line-height: 69.6px;
    text-align: center;
    text-shadow: #444 -1px -1px 0px, #444 1px -1px 1px, #444 -1px 1px 1px, #444 1px 1px 0px;
    text-transform: uppercase;
    word-wrap: break-word;
  }

  @media (min-width: 901px) {
    .eve,.blk {
      width: 22%;
      width: -webkit-calc(25% - 20px);
      width: -moz-calc(25% - 20px);
      width: -ms-calc(25% - 20px);
      width: -o-calc(25% - 20px);
      width: calc(25% - 20px);
    }
  }

  @media (min-width: 601px) and (max-width: 900px) {
    .eve,.blk {
      width: 30%;
      width: -webkit-calc(33.33% - 20px);
      width: -moz-calc(33.33% - 20px);
      width: -ms-calc(33.33% - 20px);
      width: -o-calc(33.33% - 20px);
      width: calc(33.33% - 20px);
    }
  }

  /*@media (min-width: 601px) and (max-width: 700px) {*/
  /*.m800 .blogTiles .ele{*/
  /*width: 45%;*/
  /*width: -webkit-calc(50% - 20px);*/
  /*width: -moz-calc(50% - 20px);*/
  /*width: -ms-calc(50% - 20px);*/
  /*width: -o-calc(50% - 20px);*/
  /*width: calc(50% - 20px);*/
  /*}*/
  /*}*/

  @media (max-width: 600px) {
    .eve,.blk {
      width: 95%;
      width: -webkit-calc(100% - 20px);
      width: -moz-calc(100% - 20px);
      width: -ms-calc(100% - 20px);
      width: -o-calc(100% - 20px);
      width: calc(100% - 20px);
    }
  }

  .eve,.blk {
    display: inline-block;
    vertical-align: top;
    margin: 10px;
    border: 1px solid #eee;
    box-shadow: 0 -60px 60px -60px rgba(0,0,0,.1) inset;
    box-sizing: border-box;
    border-radius: 3px;
    background: rgba(102, 102, 102, 0.4);
    color:white;
  }

  .upcoming {
    background: rgba(136, 235, 255, 0.4);
  }

  .textButton {
    padding: 5px 15px 10px;
    margin-left: 10px;
    margin-bottom: 10px;
    font-size: 18px;
    color: #334;
    text-shadow: 1px 1px 0 #fff;
    background: rgba(240, 240,240,.6);
    border-radius: 2px 2px 0 0;
    white-space:nowrap;
    display:inline-block;
    vertical-align: middle;
  }

  .eve .title,.blk .title{
    width: 100%;
    padding: 10px;
    font-size: 18px;
    color: #334;
    text-shadow: 1px 1px 0 #fff;
    background: rgba(240, 240,240,.6);
    border-radius: 2px 2px 0 0;
  }

  .eve .type,.blk .type{
    font-size: 10px;
    padding: 10px 10px 10px;
  }
  .eve .summary,.blk .summary {
    padding: 15px 10px;
    font-size:1.4em;
  }
  .eve .summary p,.blk .summary p {
    margin: 1em 0;
    line-height: 120%;
  }

  .eve .note,.blk .note{padding: 10px 10px;font-size:0.8em;}

  .userVoted {
    border-bottom-width:2px;
    border-bottom-style:solid;
    border-bottom-color:darkslategrey;
  }


</style>
