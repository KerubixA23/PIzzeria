<template>
  <div class="home-page">
    <h1>Bienvenido a la Pizzería</h1>

    <div class="pizza-grid">
      <PizzaCard
        v-for="pizza in pizzas"
        :key="pizza.id"
        :name="pizza.name"
        :ingredients="pizza.ingredients"
        :price="pizza.price"
      />
    </div>

    <section class="cart">
      <h2>Pedido</h2>
      <div v-if="cart.items.length === 0">No hay pedidos aún.</div>
      <ul v-else>
        <li v-for="(item, index) in cart.items" :key="index">
          <strong>{{ item.name }}</strong> - ${{ item.price.toFixed(2) }}
          <br />
          <small>Ingredientes: {{ item.ingredients.join(', ') }}</small>
        </li>
      </ul>
      <p class="total">Total: ${{ cart.total.toFixed(2) }}</p>
    </section>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart'
import PizzaCard from '../components/PIzzaCard.vue'

const cart = useCartStore()

const pizzas = [
  { id: 1, name: 'Margarita', ingredients: ['Tomate', 'Mozzarella', 'Albahaca'], price: 850 },
  { id: 2, name: 'Pepperoni', ingredients: ['Pepperoni', 'Mozzarella', 'Salsa'], price: 950 },
  { id: 3, name: 'Cuatro Quesos', ingredients: ['Mozzarella', 'Parmesano', 'Roquefort', 'Fontina'], price: 1050 },
]
</script>

<style scoped>
.home-page {
  padding: 1rem;
}

.pizza-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}

.cart {
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  max-width: 640px;
}

.cart ul {
  list-style: none;
  padding: 0;
}

.cart li {
  margin-bottom: 1rem;
}

.total {
  font-weight: bold;
  margin-top: 1rem;
}
</style>