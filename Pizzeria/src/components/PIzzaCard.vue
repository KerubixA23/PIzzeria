<template>
  <div class="pizza-card">
    <h3>{{ pizza.name }}</h3>
    <p>Precio: Q{{ pizza.price }}</p>

    <button @click="agregar">Agregar al carrito</button>
  </div>
</template>

<script setup>
import { useCartStore } from "../stores/cart";

// Recibe la pizza como prop
const props = defineProps({
  pizza: {
    type: Object,
    required: true
  }
});

const cart = useCartStore();

// Función para agregar al carrito
function agregar() {
  cart.addItem(props.pizza);
}
</script>

<style scoped>
.pizza-card {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  margin: 10px;
}
</style>