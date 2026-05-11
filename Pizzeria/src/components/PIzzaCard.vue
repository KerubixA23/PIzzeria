<template>
  <div class="pizza-card">
    <h3>{{ name }}</h3>
    <p>Ingredientes: {{ ingredients.join(', ') }}</p>
    <p>Precio: ${{ price.toFixed(2) }}</p>
    <button @click="addToCart">Agregar al pedido</button>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart'

const props = defineProps({
  name: { type: String, required: true },
  ingredients: { type: Array, default: () => [] },
  price: { type: Number, required: true },
})

const cart = useCartStore()

function addToCart() {
  cart.addItem({
    name: props.name,
    ingredients: props.ingredients,
    price: props.price,
  })
}
</script>

<style scoped>
.pizza-card {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  max-width: 300px;
  margin: 0.5rem;
}

button {
  background: #d35400;
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background: #e67e22;
}
</style>