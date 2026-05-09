<script setup>
import { useCartStore } from "./stores/cart";
import CartSidebar from "./components/CartSidebar.vue";

const cart = useCartStore();
</script>

<template>
  <h1>Pizzería 🍕</h1>

  <!-- Botón del carrito -->
  <button class="cart-btn" @click="cart.openCart()">
    🛒
  </button>

  <!-- Carrito lateral -->
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
</style>