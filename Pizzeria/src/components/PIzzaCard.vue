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
  border: 1px solid #e5e5e5;
  padding: 18px;
  border-radius: 14px;

  background: white;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);

  width: 100%;
  max-width: 320px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  gap: 12px;

  transition: transform 0.2s ease,
              box-shadow 0.2s ease;
}

.pizza-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 18px rgba(0,0,0,0.12);
}

h3 {
  margin: 0;
  font-size: 1.3rem;
  color: #222;
}

p {
  margin: 0;
  color: #555;
  line-height: 1.5;
}

button {
  background: #d35400;
  color: white;
  border: none;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  cursor: pointer;

  font-weight: bold;
  font-size: 0.95rem;

  transition: background 0.3s ease,
              transform 0.2s ease;
}

button:hover {
  background: #e67e22;
  transform: scale(1.02);
}

/* =========================
   TABLET
========================= */
@media (max-width: 768px) {
  .pizza-card {
    max-width: 100%;
    padding: 16px;
  }

  h3 {
    font-size: 1.2rem;
  }
}

/* =========================
   CELULAR
========================= */
@media (max-width: 480px) {
  .pizza-card {
    padding: 14px;
    border-radius: 12px;
  }

  h3 {
    font-size: 1.1rem;
  }

  p {
    font-size: 0.92rem;
  }

  button {
    width: 100%;
    padding: 14px;
    font-size: 0.95rem;
  }
}
</style>