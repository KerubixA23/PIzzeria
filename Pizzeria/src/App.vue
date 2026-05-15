<script setup>
import { Menu, ShoppingCart, ClipboardList } from "lucide-vue-next";
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

        <button class="nav-btn active">
          <Menu class="icon" />
          <span>Menú</span>
        </button>

        <button class="nav-btn">
          <ClipboardList class="icon" />
          <span>Empleados</span>
        </button>

        <button class="nav-btn cart-btn" @click="cart.openCart()">
          <ShoppingCart class="icon" />
          <span>Carrito</span>
        </button>

      </nav>
    </header>

    <!-- CONTENIDO -->
    <Dashboard />

    <!-- SIDEBAR -->
    <CartSidebar />
  </div>
</template>

<style scoped>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  min-height: 100vh;
  background: #f5f5f5;
}

/* NAVBAR */

.navbar {
  width: 100%;
  background: #ececec;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 40px;
  flex-wrap: wrap;
  gap: 20px;
}

/* LOGO */

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  font-size: 35px;
}

.logo h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #0f172a;
}

/* BOTONES */

.nav-buttons {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 8px;

  border: none;
  background: transparent;
  padding: 14px 24px;
  border-radius: 14px;

  cursor: pointer;

  font-size: 1rem;
  font-weight: 600;

  transition: 0.3s ease;
}

.nav-btn:hover {
  background: #dcdcdc;
}

.active {
  background: #ff0000;
  color: white;
}

.cart-btn {
  background: #ff0000;
  color: white;
}

.cart-btn:hover,
.active:hover {
  background: #d60000;
}

.icon {
  width: 22px;
  height: 22px;
}

/* RESPONSIVE */

@media (max-width: 768px) {

  .navbar {
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
  }

  .nav-buttons {
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
  }

  .nav-btn {
    flex: 1;
    justify-content: center;
    min-width: 120px;
  }

  .logo h1 {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {

  .nav-buttons {
    flex-direction: column;
    width: 100%;
  }

  .nav-btn {
    width: 100%;
  }

}
</style>