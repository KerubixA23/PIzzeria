<template>
  <div class="pizza-card">
    <h3>{{ pizza.name }}</h3>
    <p>Precio: Q{{ pizza.price }}</p>

    <button @click="agregar">
      Agregar al carrito
    </button>
  </div>
</template>

<script setup>
import { useCartStore } from "../stores/cart";

const props = defineProps({
  pizza: {
    type: Object,
    required: true
  }
});

const cart = useCartStore();

function agregar() {
  cart.addItem({
    id: props.pizza.id || Date.now(),
    name: props.pizza.name,
    price: props.pizza.price
  });
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