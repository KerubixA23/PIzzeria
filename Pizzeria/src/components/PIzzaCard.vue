<template>
  <div class="pizza-card">
    <!-- Usamos pizza.name porque es la estructura de developer -->
    <h3>{{ pizza.name }}</h3>
    
    <!-- Mantenemos la lista de ingredientes de mi rama -->
    <p v-if="pizza.ingredients">Ingredientes: {{ pizza.ingredients.join(', ') }}</p>
    
    <!-- Usamos Q para quetzales (developer) o $ según prefieras, y toFixed para centavos -->
    <p>Precio: Q{{ pizza.price.toFixed(2) }}</p>

    <button @click="agregar">
      Agregar al pedido
    </button>
  </div>
</template>

<script setup>
import { useCartStore } from "../stores/cart";

const props = defineProps({
  // Mantenemos la estructura de objeto de developer por ser más limpia
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
    ingredients: props.pizza.ingredients || [],
    price: props.pizza.price
  });
}
</script>

<style scoped>
.pizza-card {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  /* Mantenemos tus estilos de diseño que son mejores */
  max-width: 300px;
  margin: 10px;
}

button {
  background: #d35400;
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background: #e67e22;
}
</style>