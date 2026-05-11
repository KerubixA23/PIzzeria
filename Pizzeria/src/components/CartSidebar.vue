<template>
  <!-- Fondo oscuro -->
  <div v-if="cart.isOpen" class="overlay" @click="cart.closeCart()"></div>

  <!-- Sidebar -->
  <div :class="['sidebar', { open: cart.isOpen }]">
    
    <!-- Header -->
    <div class="header">
      <h2>Carrito 🛒</h2>
      <button class="close-btn" @click="cart.closeCart()">✕</button>
    </div>

    <!-- Estado vacío -->
    <div v-if="cart.items.length === 0" class="empty">
      <p>Tu carrito está vacío</p>
    </div>

    <!-- Lista de productos -->
    <div v-else class="items">

      <div v-for="item in cart.items" :key="item.id" class="item">

        <!-- Nombre y precio -->
        <div>
          <p class="name">{{ item.name }}</p>
          <p class="price">Q{{ item.price }}</p>
        </div>

        <!-- CONTROLES DEL CARRITO -->
        <div class="controls">

          <button @click="cart.decrease(item.id)">➖</button>

          <span>{{ item.quantity }}</span>

          <button @click="cart.increase(item.id)">➕</button>

          <button class="delete" @click="cart.removeItem(item.id)">❌</button>

        </div>

        <!-- subtotal por producto -->
        <p class="subtotal">
          Subtotal: Q{{ item.price * item.quantity }}
        </p>

      </div>

      <!-- TOTAL DEL CARRITO -->
      <div class="total">
        <h3>Total: Q{{ cart.total }}</h3>
      </div>

      <!-- BOTÓN VACÍAR -->
      <button class="clear" @click="cart.clearCart()">
        Vaciar carrito 🧹
      </button>

    </div>

  </div>
</template>

<script setup>
import { useCartStore } from "../stores/cart";

const cart = useCartStore();
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
}

.sidebar {
  position: fixed;
  top: 0;
  right: -350px;
  width: 350px;
  height: 100%;
  background: white;
  transition: 0.3s;
  padding: 20px;
}

.sidebar.open {
  right: 0;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.controls {
  display: flex;
  gap: 5px;
  align-items: center;
}

.delete {
  color: red;
}

.total {
  margin-top: 20px;
  font-weight: bold;
}

.clear {
  margin-top: 10px;
  width: 100%;
  background: red;
  color: white;
  border: none;
  padding: 10px;
}

.empty {
  text-align: center;
  margin-top: 50px;
  color: gray;
}
</style>