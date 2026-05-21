import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EmployeesView from '../views/EmployeesView.vue'
import EmployeesPanel from '../views/EmployeesPanel.vue'

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
    {
      path: '/empleados/panel',
      name: 'employees-panel',
      component: EmployeesPanel,
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router