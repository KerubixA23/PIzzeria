<template>
  <div class="contenedor">

    <div
      class="pizza-card"
      v-for="pizza in pizzas"
      :key="pizza.id"
    >
      <img
        :src="pizza.imagen"
        :alt="pizza.nombre"
        class="pizza-img"
      />

      <h3>{{ pizza.nombre }}</h3>

      <p class="descripcion">
        {{ pizza.descripcion }}
      </p>

      <p class="ingredientes">
        <strong>Ingredientes:</strong>
        {{ pizza.ingredientes }}
      </p>

      <p class="precio">
        Q{{ pizza.precio }}
      </p>

      <button @click="ordenarPizza(pizza.nombre)">
        Ordenar
      </button>
    </div>

  </div>
</template>

<script setup>
import { pizzas } from '../data/pizzas.js'

const ordenarPizza = (nombre) => {
  alert(`Has ordenado: ${nombre} 🍕`)
}
</script>

<style scoped>
.contenedor {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.pizza-card {
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 15px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
  background: white;
}

.pizza-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
}

.descripcion {
  color: #555;
  margin: 10px 0;
}

.ingredientes {
  font-size: 14px;
  color: #444;
}

.precio {
  font-size: 22px;
  font-weight: bold;
  color: #e63946;
  margin: 10px 0;
}

button {
  background: #ff6b00;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
}

button:hover {
  background: #e85d04;
}
</style>