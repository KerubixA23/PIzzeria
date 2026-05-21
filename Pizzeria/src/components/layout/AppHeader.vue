<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useCartStore } from '../../stores/cart'

const route = useRoute()
const cart = useCartStore()

const isHome = computed(() => route.name === 'home')
const isEmployees = computed(() => route.name === 'employees')
</script>

<template>
  <header class="header">
    <div class="container header-content">
      <RouterLink to="/" class="logo">
        <span class="logo-icon">🍕</span>
        <span class="logo-text">Pizza Express</span>
      </RouterLink>

      <nav class="nav">
        <RouterLink
          to="/"
          class="nav-btn"
          :class="{ active: isHome }"
        >
          Menú
        </RouterLink>

        <RouterLink
          to="/empleados"
          class="nav-btn"
          :class="{ active: isEmployees }"
        >
          Empleados
        </RouterLink>

        <button class="nav-btn cart-btn" @click="cart.openCart()">
          Carrito
          <span class="badge">{{ cart.cantidadItems }}</span>
        </button>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 40;
  background: #ffffff;
  border-bottom: 1px solid #ece7e2;
}

.container {
  width: min(1200px, calc(100% - 32px));
  margin: 0 auto;
}

.header-content {
  min-height: 82px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.logo {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

.logo-icon {
  font-size: 2rem;
}

.logo-text {
  font-size: 2rem;
  font-weight: 800;
  color: #0f172a;
}

.nav {
  display: flex;
  align-items: center;
  gap: 14px;
}

.nav-btn {
  border: none;
  background: transparent;
  color: #0f172a;
  text-decoration: none;
  padding: 12px 20px;
  border-radius: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s ease;
}

.nav-btn:hover {
  background: #f3f4f6;
}

.nav-btn.active,
.cart-btn {
  background: #e10600;
  color: #ffffff;
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  height: 22px;
  margin-left: 8px;
  padding: 0 6px;
  border-radius: 999px;
  background: #ffffff;
  color: #e10600;
  font-size: 0.75rem;
  font-weight: 800;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
    padding: 16px 0;
  }

  .nav {
    width: 100%;
    flex-wrap: wrap;
  }
}
</style>