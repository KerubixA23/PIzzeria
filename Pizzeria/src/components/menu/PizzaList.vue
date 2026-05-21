<script setup lang="ts">
import PizzaCard from './PizzaCard.vue'
import { pizzas } from '../../data/mock/pizzas'
</script>

<template>
  <section class="pizza-grid">
    <PizzaCard
      v-for="pizza in pizzas"
      :key="pizza.id"
      :pizza="pizza"
    />
  </section>
</template>

<style scoped>
.pizza-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
}
</style>