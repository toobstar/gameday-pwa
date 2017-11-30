import Vue from 'vue'
import Router from 'vue-router'
import Games from '@/components/Games'

Vue.use(Router);

export default new Router({
  routes: [
    { name:'games', path: '/', component: Games },
  ]
});
