import Vue from 'vue'
import Router from 'vue-router'
import PlayQuiz from '@/components/PlayQuiz'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PlayQuiz',
      component: PlayQuiz
    }
  ]
})
