<template>
  <div class="menu-container">
    <div class="pizza-card" v-for="pizza in pizzas" :key="pizza.id">
      
      <img :src="pizza.imagen" :alt="pizza.nombre" class="pizza-img" />

      <div class="pizza-info">
        <h2>{{ pizza.nombre }}</h2>

        <p class="descripcion">
          {{ pizza.descripcion }}
        </p>

        <p class="ingredientes">
          <strong>Ingredientes:</strong>
          {{ pizza.ingredientes }}
        </p>

        <div class="footer-card">
          <span class="precio">Q{{ pizza.precio }}</span>

          <button @click="ordenarPizza(pizza)">
            Ordenar
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "MenuPizzas",

  data() {
    return {
      pizzas: [
        {
          id: 1,
          nombre: "Pizza Pepperoni",
          descripcion: "Pizza clásica con queso mozzarella y pepperoni.",
          ingredientes: "Queso, salsa de tomate, pepperoni",
          precio: 85,
          imagen: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3"
        },
        {
          id: 2,
          nombre: "Pizza Hawaiana",
          descripcion: "Combinación de jamón y piña con queso extra.",
          ingredientes: "Jamón, piña, queso mozzarella",
          precio: 90,
          imagen: "https://images.unsplash.com/photo-1513104890138-7c749659a591"
        },
        {
          id: 3,
          nombre: "Pizza Suprema",
          descripcion: "Pizza con variedad de carnes y vegetales.",
          ingredientes: "Pepperoni, jamón, chile, cebolla, aceitunas",
          precio: 110,
          imagen: "https://images.unsplash.com/photo-1548365328-9f547fb0953b"
        }
      ]
    };
  },

  methods: {
    ordenarPizza(pizza) {
      alert(`Has ordenado: ${pizza.nombre}`);
    }
  }
};
</script>

<style scoped>
.menu-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  padding: 20px;
}

.pizza-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.pizza-card:hover {
  transform: scale(1.03);
}

.pizza-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.pizza-info {
  padding: 15px;
}

.descripcion {
  color: #555;
  margin: 10px 0;
}

.ingredientes {
  font-size: 14px;
  color: #444;
}

.footer-card {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.precio {
  font-size: 20px;
  font-weight: bold;
  color: #e63946;
}

button {
  background: #ff6b00;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background: #e85d04;
}
</style>