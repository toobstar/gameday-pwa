import Vue from 'vue'
import Router from 'vue-router'
//import Hello from '@/components/Hello'
import GameList from '@/components/GameList'
//import UserList from '@/components/UserList'
//import UserDetails from '@/components/UserDetails'

Vue.use(Router)

export default new Router({
  routes: [
    //{
    //  path: '/',
    //  name: 'Hello',
    //  component: Hello
    //}
    //,
    //{
    //  path: '/games',
    //  name: 'Games',
    //  component: Games
    //},
    { name:'games', path: '/',         component: GameList }
    //{ name:'games', path: '/games',         component: GameList }
    //{ name:'home', path: '/users',         component: UserList },
    //{ name:'user_new', path: '/user/new', component: UserDetails, props: { isNewUser: true} },
    //{ name:'user_edit', path: '/user/:id', component: UserDetails, props: true }

  ]
})
