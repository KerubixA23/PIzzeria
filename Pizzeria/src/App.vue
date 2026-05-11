<script setup>
import { useCartStore } from "./stores/cart";
import CartSidebar from "./components/CartSidebar.vue";
import Dashboard from "./pages/Dashboard.vue";

const cart = useCartStore();
</script>

<template>
  <Dashboard />

  <h1>Pizzería 🍕</h1>

  <!-- BOTÓN CARRITO -->
  <button class="cart-btn" @click="cart.openCart()">
    🛒
  </button>

  <!-- BOTÓN TEST -->
  <button
    class="test-btn"
    @click="cart.addItem({ id: 1, name: 'Pizza Test', price: 50 })"
  >
    TEST AGREGAR
  </button>

  <!-- SIDEBAR -->
  <CartSidebar />
</template>

<style scoped>
.cart-btn {
  position: fixed;
  top: 20px;
  right: 80px;
  background: white;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  padding: 15px;
  font-size: 25px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.test-btn {
  position: fixed;
  top: 90px;
  right: 80px;
  background: #ff5722;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 10px;
  cursor: pointer;
}
</style>