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
      meta: { hideCart: true } // <-- Oculta el carrito en la vista de login de empleados
    },
    {
      path: '/empleados/panel',
      name: 'employees-panel',
      component: EmployeesPanel,
      meta: { hideCart: true } // <-- Oculta el carrito dentro del panel administrativo
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router