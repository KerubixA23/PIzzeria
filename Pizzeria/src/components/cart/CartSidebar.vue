<script setup lang="ts">
import { useCartStore } from '../../stores/cart'

const cart = useCartStore()
</script>

<template>
  <div
    v-if="cart.isOpen"
    class="overlay"
    @click="cart.closeCart()"
  />

  <aside class="sidebar" :class="{ open: cart.isOpen }">
    <div class="sidebar-header">
      <div>
        <h2>Tu Carrito</h2>
        <p class="count">{{ cart.cantidadItems }} productos en tu carrito</p>
      </div>

      <button class="icon-btn" @click="cart.closeCart()">✕</button>
    </div>

    <div v-if="cart.items.length === 0" class="empty-state">
      <p>No hay productos todavía.</p>
      <span>Agrega una pizza para verla aquí.</span>
    </div>

    <div v-else class="sidebar-content">
      <div
        v-for="(item, index) in cart.items"
        :key="`${item.id}-${index}`"
        class="cart-item"
      >
        <button class="remove-btn" @click="cart.removeItem(index)">✕</button>

        <div class="item-title-row">
          <p class="cart-item-name">{{ item.nombre }}</p>

          <span v-if="item.personalizada" class="badge-custom">
            Personalizada
          </span>
        </div>

        <p class="cart-item-price">Q{{ item.precio.toFixed(2) }}</p>

        <div class="ingredients-block">
          <strong>Ingredientes:</strong>

          <div v-if="item.ingredientes.length" class="chips">
            <span
              v-for="ingrediente in item.ingredientes"
              :key="ingrediente"
              class="chip"
            >
              {{ ingrediente }}
            </span>
          </div>

          <p v-else class="no-ingredients">
            Sin ingredientes extra
          </p>
        </div>
      </div>

      <div class="summary">
        <div class="subtotal-row">
          <span>Subtotal</span>
          <strong>Q{{ cart.subtotal.toFixed(2) }}</strong>
        </div>

        <button class="clear-btn" @click="cart.clearCart()">
          Vaciar Carrito
        </button>

        <button class="primary-btn" @click="cart.confirmarPedido()">
          Confirmar Pedido - Q{{ cart.subtotal.toFixed(2) }}
        </button>

        <button class="secondary-btn" @click="cart.pedirDomicilio()">
          Pedir a Domicilio - Q{{ cart.subtotal.toFixed(2) }}
        </button>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  z-index: 60;
}

.sidebar {
  position: fixed;
  top: 0;
  right: -540px;
  width: min(520px, 100%);
  height: 100vh;
  background: #ffffff;
  z-index: 70;
  transition: right 0.28s ease;
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.14);
  display: flex;
  flex-direction: column;
  padding: 24px;
  overflow-y: auto;
}

.sidebar.open {
  right: 0;
}

.sidebar-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
}

.sidebar-header h2 {
  margin: 0 0 6px;
  color: #0f172a;
  font-size: 2.2rem;
}

.count {
  margin: 0;
  color: #6b7280;
}

.icon-btn {
  border: none;
  background: transparent;
  font-size: 1.4rem;
  cursor: pointer;
  color: #6b7280;
}

.empty-state {
  margin-top: 30px;
  text-align: center;
  color: #6b7280;
}

.empty-state p {
  margin: 0 0 8px;
  font-weight: 700;
  color: #334155;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.cart-item {
  position: relative;
  border: 1px solid #ece7e2;
  border-radius: 18px;
  padding: 20px;
}

.remove-btn {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 38px;
  height: 38px;
  border: 2px solid #d1d5db;
  border-radius: 12px;
  background: #ffffff;
  cursor: pointer;
  color: #9ca3af;
  font-size: 1rem;
}

.item-title-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-right: 52px;
}

.cart-item-name {
  margin: 0 0 10px;
  font-size: 1.7rem;
  font-weight: 800;
  color: #0f172a;
}

.badge-custom {
  background: #f3f4f6;
  color: #374151;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 700;
}

.cart-item-price {
  margin: 0 0 16px;
  color: #e10600;
  font-size: 1.7rem;
  font-weight: 800;
}

.ingredients-block strong {
  display: block;
  margin-bottom: 10px;
  color: #1f2937;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip {
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  color: #374151;
  padding: 8px 12px;
  border-radius: 999px;
  font-size: 0.95rem;
}

.no-ingredients {
  margin: 0;
  color: #6b7280;
}

.summary {
  margin-top: 8px;
  border-top: 1px solid #ece7e2;
  padding-top: 20px;
  display: grid;
  gap: 14px;
}

.subtotal-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.25rem;
  color: #111827;
}

.subtotal-row strong {
  font-size: 1.6rem;
  color: #e10600;
}

.clear-btn,
.primary-btn,
.secondary-btn {
  border: none;
  padding: 14px 18px;
  border-radius: 14px;
  font-weight: 700;
  cursor: pointer;
  font-size: 1rem;
}

.clear-btn {
  background: #ffffff;
  border: 1px solid #d1d5db;
  color: #111827;
}

.primary-btn {
  background: #e10600;
  color: #ffffff;
}

.secondary-btn {
  background: #ffffff;
  border: 1px solid #e10600;
  color: #e10600;
}
</style>