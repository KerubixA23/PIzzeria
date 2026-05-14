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
/* CONTENEDOR */
.contenedor {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  padding: 24px;
}

/* CARD */
.pizza-card {
  border: 1px solid #e5e5e5;
  border-radius: 16px;
  padding: 18px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  background: white;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  transition: transform 0.2s ease,
              box-shadow 0.2s ease;
}

.pizza-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 18px rgba(0,0,0,0.12);
}

/* IMAGEN */
.pizza-img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 12px;
}

/* TITULO */
h3 {
  font-size: 22px;
  margin-bottom: 10px;
}

/* DESCRIPCIÓN */
.descripcion {
  color: #555;
  margin-bottom: 12px;
  line-height: 1.5;
}

/* INGREDIENTES */
.ingredientes {
  font-size: 14px;
  color: #444;
  margin-bottom: 12px;
}

/* PRECIO */
.precio {
  font-size: 24px;
  font-weight: bold;
  color: #e63946;
  margin: 14px 0;
}

/* BOTÓN */
button {
  background: #ff6b00;
  color: white;
  border: none;
  padding: 12px 16px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  font-size: 15px;

  transition: background 0.2s ease,
              transform 0.2s ease;
}

button:hover {
  background: #e85d04;
  transform: scale(1.02);
}

/* =========================
   TABLET
========================= */
@media (max-width: 768px) {
  .contenedor {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    padding: 18px;
    gap: 18px;
  }

  .pizza-img {
    height: 200px;
  }

  h3 {
    font-size: 20px;
  }

  .precio {
    font-size: 22px;
  }
}

/* =========================
   CELULAR
========================= */
@media (max-width: 480px) {
  .contenedor {
    grid-template-columns: 1fr;
    padding: 14px;
    gap: 16px;
  }

  .pizza-card {
    padding: 14px;
  }

  .pizza-img {
    height: 180px;
  }

  h3 {
    font-size: 18px;
  }

  .descripcion {
    font-size: 14px;
  }

  .ingredientes {
    font-size: 13px;
  }

  .precio {
    font-size: 20px;
  }

  button {
    width: 100%;
    padding: 14px;
  }
}
</style>