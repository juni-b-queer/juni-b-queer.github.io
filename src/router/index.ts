import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AppLayout from '@/Layouts/AppLayout.vue'
import TeamMembers from '@/views/TeamMembers.vue'
import UserView from '@/views/UserView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      meta: {title: 'Bluesky Team Tracker'},
      children: [
        { path: '', component: HomeView, meta: {title: 'Bluesky Team Tracker'} },
        { path: 'team-members', component: TeamMembers, meta: {title: 'Bluesky Team Tracker'} },
        {
          path: 'user/:did', // Dynamic route for UserView with an "id" parameter
          component: UserView,
          props: true, // Pass route params as props to UserView
          name: 'user',
          meta: {title: 'Bluesky Team Tracker'}
        },
      ],
    },
  ],
})

export default router
