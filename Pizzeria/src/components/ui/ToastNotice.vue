<script setup lang="ts">
import { useCartStore } from '../../stores/cart'

const cart = useCartStore()
</script>

<template>
  <transition name="toast">
    <div v-if="cart.toastVisible" class="toast">
      <div class="icon">✔</div>

      <div class="content">
        <p class="title">{{ cart.toastTitle }}</p>
        <p class="price">Precio: Q{{ cart.toastPrice.toFixed(2) }}</p>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.toast {
  position: fixed;
  right: 22px;
  bottom: 22px;
  z-index: 90;
  background: #ffffff;
  border: 1px solid #ece7e2;
  border-radius: 16px;
  box-shadow: 0 16px 34px rgba(15, 23, 42, 0.14);
  padding: 16px 18px;
  min-width: 320px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.icon {
  width: 34px;
  height: 34px;
  border-radius: 999px;
  background: #111827;
  color: #ffffff;
  display: grid;
  place-items: center;
  font-size: 0.9rem;
}

.title {
  margin: 0 0 4px;
  font-weight: 700;
  color: #111827;
}

.price {
  margin: 0;
  color: #9ca3af;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.22s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(14px);
}
</style>