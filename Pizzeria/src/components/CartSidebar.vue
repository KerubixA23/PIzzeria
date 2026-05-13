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
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 99;
}

/* SIDEBAR */
.sidebar {
  position: fixed;
  top: 0;
  right: -100%;
  width: 350px;
  max-width: 100%;
  height: 100vh;
  background: white;
  transition: right 0.3s ease;
  padding: 20px;
  z-index: 100;

  display: flex;
  flex-direction: column;
}

.sidebar.open {
  right: 0;
}

/* HEADER */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.close-btn {
  border: none;
  background: transparent;
  font-size: 20px;
  cursor: pointer;
}

/* LISTA */
.items {
  flex: 1;
  overflow-y: auto;
}

/* ITEM */
.item {
  border-bottom: 1px solid #ddd;
  padding: 15px 0;

  display: flex;
  flex-direction: column;
  gap: 10px;
}

.name {
  font-weight: bold;
  font-size: 16px;
}

.price {
  color: #666;
}

/* CONTROLES */
.controls {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.controls button {
  border: none;
  background: #f0f0f0;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
}

.controls span {
  min-width: 20px;
  text-align: center;
}

.delete {
  background: #ffe5e5 !important;
  color: red;
}

/* SUBTOTAL */
.subtotal {
  font-size: 14px;
  color: #444;
}

/* TOTAL */
.total {
  margin-top: 20px;
  font-weight: bold;
  font-size: 18px;
}

/* BOTÓN */
.clear {
  margin-top: 15px;
  width: 100%;
  background: red;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

/* VACÍO */
.empty {
  text-align: center;
  margin-top: 50px;
  color: gray;
}

/* =========================
   TABLET
========================= */
@media (max-width: 768px) {
  .sidebar {
    width: 300px;
    padding: 16px;
  }

  .name {
    font-size: 15px;
  }

  .total {
    font-size: 16px;
  }
}

/* =========================
   CELULAR
========================= */
@media (max-width: 480px) {
  .sidebar {
    width: 100%;
    right: -100%;
    padding: 14px;
  }

  .controls {
    justify-content: space-between;
  }

  .controls button {
    flex: 1;
  }

  .clear {
    padding: 14px;
    font-size: 15px;
  }
}
</style>