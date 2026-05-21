<script setup lang="ts">
import { ref } from 'vue'
import { useCartStore } from '../../stores/cart'
import type { Pizza } from '../../types/pizza'

const props = defineProps<{
  pizza: Pizza
}>()

const cart = useCartStore()
const wasAdded = ref(false)

let addedTimeout: ReturnType<typeof setTimeout> | null = null

function agregar(): void {
  cart.addItem(props.pizza)
  wasAdded.value = true

  if (addedTimeout) {
    clearTimeout(addedTimeout)
  }

  addedTimeout = setTimeout(() => {
    wasAdded.value = false
  }, 1800)
}
</script>

<template>
  <article class="pizza-card">
    <img
      :src="pizza.imagen"
      :alt="pizza.nombre"
      class="pizza-img"
    />

    <div class="pizza-body">
      <h3>{{ pizza.nombre }}</h3>

      <p class="descripcion">
        {{ pizza.descripcion }}
      </p>

      <div class="ingredientes">
        <strong>Ingredientes:</strong>

        <ul>
          <li
            v-for="ingrediente in pizza.ingredientes"
            :key="ingrediente"
          >
            {{ ingrediente }}
          </li>
        </ul>
      </div>

      <div class="pizza-footer">
        <p class="precio">Q{{ pizza.precio.toFixed(2) }}</p>

        <button
          class="btn-order"
          :class="{ success: wasAdded }"
          @click="agregar"
        >
          <span v-if="wasAdded">✓ Agregada</span>
          <span v-else>+ Ordenar</span>
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.pizza-card {
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #ece7e2;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.pizza-img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
  background: #f3f4f6;
}

.pizza-body {
  padding: 22px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

h3 {
  margin: 0 0 12px;
  font-size: 1.9rem;
  line-height: 1.1;
  color: #0f172a;
}

.descripcion {
  margin: 0 0 18px;
  color: #6b7280;
  line-height: 1.6;
  font-size: 1.1rem;
}

.ingredientes {
  margin-bottom: 22px;
}

.ingredientes strong {
  display: block;
  margin-bottom: 10px;
  font-size: 1.1rem;
  color: #1f2937;
}

.ingredientes ul {
  margin: 0;
  padding-left: 20px;
  color: #4b5563;
}

.ingredientes li {
  margin-bottom: 8px;
}

.pizza-footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
}

.precio {
  margin: 0;
  font-size: 2.3rem;
  font-weight: 800;
  color: #e10600;
}

.btn-order {
  border: none;
  background: #e10600;
  color: #ffffff;
  padding: 13px 20px;
  border-radius: 14px;
  cursor: pointer;
  font-weight: 700;
  font-size: 1rem;
  transition: 0.2s ease;
  min-width: 140px;
}

.btn-order:hover {
  background: #c70500;
}

.btn-order.success {
  background: #159947;
}

.btn-order.success:hover {
  background: #12843d;
}
</style>