import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EmployeesView from '../views/EmployeesView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/empleados',
      name: 'employees',
      component: EmployeesView,
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router