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
      <div v-for="(item, index) in cart.items" :key="index" class="item">
        <div>
          <p class="name">{{ item.name }}</p>
          <p class="price">Q{{ item.price }}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { useCartStore } from "../stores/cart";

const cart = useCartStore();
</script>

<style scoped>
/* Fondo oscuro */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 5;
}

/* Sidebar */
.sidebar {
  position: fixed;
  top: 0;
  right: -350px;
  width: 350px;
  height: 100%;
  background: #fff;
  box-shadow: -3px 0 10px rgba(0,0,0,0.2);
  transition: right 0.3s ease;
  padding: 20px;
  z-index: 10;
}

/* Cuando está abierto */
.sidebar.open {
  right: 0;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Botón cerrar */
.close-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

/* Estado vacío */
.empty {
  text-align: center;
  margin-top: 60px;
  color: gray;
}

/* Lista de items */
.items {
  margin-top: 20px;
}

/* Item */
.item {
  border-bottom: 1px solid #eee;
  padding: 10px 0;
}

/* Nombre */
.name {
  font-weight: bold;
}

/* Precio */
.price {
  color: #555;
}
</style>
