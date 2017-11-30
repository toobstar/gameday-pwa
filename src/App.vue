<template>
  <div>
    <header>
      <h1>Best game to watch</h1>
    </header>
    <main>
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
  html,
  body {
    margin: 0;
    height: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 15px;
    background-image: url('./assets/clipsfloor.png');
    background-repeat: repeat;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  header {
    position: relative;
    margin: 0;
    padding: 30px;
    background-color: rgba(0,0,0,.25);
  }
  header h1{
    margin: 0;
    font-size: 3em;
    font-weight: 100;
    color: rgba(255,255,255,.75);
  }

  main {
    max-width: 1000px;
    margin: 0 auto;
    padding: 10px;
  }
</style>
