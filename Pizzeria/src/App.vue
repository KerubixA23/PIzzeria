```vue
<script setup>
import {
  Menu,
  ShoppingCart,
  ClipboardList
} from "lucide-vue-next";

import { useCartStore } from "./stores/cart";
import CartSidebar from "./components/CartSidebar.vue";
import Dashboard from "./pages/Dashboard.vue";

const cart = useCartStore();
</script>

<template>
  <div class="app">

    <!-- NAVBAR -->
    <header class="navbar">

      <!-- LOGO -->
      <div class="logo">
        <span class="logo-icon">🍕</span>
        <h1>Pizza Express</h1>
      </div>

      <!-- BOTONES -->
      <nav class="nav-buttons">

        <button class="nav-btn active-btn">
          <Menu class="icon" />
          <span>Menú</span>
        </button>

        <button class="nav-btn secondary-btn">
          <ClipboardList class="icon" />
          <span>Empleados</span>
        </button>

        <button
          class="nav-btn cart-btn"
          @click="cart.openCart()"
        >
          <ShoppingCart class="icon" />
          <span>Carrito</span>
        </button>

      </nav>
    </header>

    <!-- CONTENIDO -->
    <main class="main-content">
      <Dashboard />
    </main>

    <!-- SIDEBAR -->
    <CartSidebar />

  </div>
</template>

<style scoped>

/* =========================
   RESET
========================= */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* =========================
   APP
========================= */

.app {
  min-height: 100vh;
  background: #FDF4F1;
  font-family:
    Inter,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  color: #111827;
}

/* =========================
   NAVBAR
========================= */

.navbar {
  width: 100%;
  height: 92px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 64px;

  background: #FFFFFF;

  border-bottom: 1px solid #ECECEC;

  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.04);

  position: sticky;
  top: 0;
  z-index: 100;
}

/* =========================
   LOGO
========================= */

.logo {
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo-icon {
  font-size: 2.4rem;
}

.logo h1 {
  font-size: 2.2rem;
  font-weight: 800;
  letter-spacing: -1px;
  color: #071133;
}

/* =========================
   NAV BUTTONS
========================= */

.nav-buttons {
  display: flex;
  align-items: center;
  gap: 22px;
}

.nav-btn {
  height: 52px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  padding: 0 24px;

  border: none;
  border-radius: 16px;

  cursor: pointer;

  font-size: 1rem;
  font-weight: 700;

  transition:
    transform 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease;
}

/* =========================
   ACTIVE BUTTON
========================= */

.active-btn {
  background: #FF0000;
  color: white;

  box-shadow:
    0 6px 18px rgba(255, 0, 0, 0.22);
}

.active-btn:hover {
  background: #E00000;
  transform: translateY(-2px);
}

/* =========================
   SECONDARY BUTTON
========================= */

.secondary-btn {
  background: transparent;
  color: #334155;
}

.secondary-btn:hover {
  background: #F4F4F5;
}

/* =========================
   CART BUTTON
========================= */

.cart-btn {
  background: #FF0000;
  color: white;

  box-shadow:
    0 6px 18px rgba(255, 0, 0, 0.22);
}

.cart-btn:hover {
  background: #E00000;
  transform: translateY(-2px);
}

/* =========================
   ICONS
========================= */

.icon {
  width: 21px;
  height: 21px;
}

/* =========================
   CONTENT
========================= */

.main-content {
  padding:
    42px
    64px;
}

/* =========================
   CARD STYLE
   (PARA QUE TUS CARDS
   SE PAREZCAN AL FIGMA)
========================= */

:deep(.pizza-card),
:deep(.card) {

  background: white;

  border-radius: 24px;

  overflow: hidden;

  border: 1px solid #EFEFEF;

  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.06);

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

:deep(.pizza-card:hover),
:deep(.card:hover) {
  transform: translateY(-4px);

  box-shadow:
    0 14px 32px rgba(0, 0, 0, 0.08);
}

/* =========================
   BOTONES ROJOS DE CARDS
========================= */

:deep(.order-btn),
:deep(.btn-order) {

  background: #FF0000;
  color: white;

  border: none;

  border-radius: 14px;

  padding:
    14px
    22px;

  font-size: 1rem;
  font-weight: 700;

  cursor: pointer;

  transition: 0.2s ease;
}

:deep(.order-btn:hover),
:deep(.btn-order:hover) {
  background: #E00000;
}

/* =========================
   PRECIOS
========================= */

:deep(.price) {
  color: #FF0000;
  font-size: 2rem;
  font-weight: 800;
}

/* =========================
   TITULOS
========================= */

:deep(h2),
:deep(h3) {
  color: #071133;
  font-weight: 800;
}

/* =========================
   RESPONSIVE TABLET
========================= */

@media (max-width: 900px) {

  .navbar {
    padding: 20px 28px;
    height: auto;

    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .nav-buttons {
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .main-content {
    padding: 28px;
  }

}

/* =========================
   RESPONSIVE MOBILE
========================= */

@media (max-width: 600px) {

  .logo h1 {
    font-size: 1.6rem;
  }

  .logo-icon {
    font-size: 1.9rem;
  }

  .nav-buttons {
    width: 100%;
    flex-direction: column;
    gap: 14px;
  }

  .nav-btn {
    width: 100%;
  }

  .main-content {
    padding: 20px;
  }

}

</style>
```
