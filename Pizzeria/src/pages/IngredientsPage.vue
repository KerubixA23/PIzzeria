<template>
  <div class="ingredients-page">
    <div class="header">
      <h1>Ingredientes por Categoría</h1>
      <p>Selecciona los ingredientes que deseas agregar a tu pizza</p>
    </div>

    <div class="categories-container">
      <div 
        v-for="(ingredientes, categoria) in ingredientesPorCategoria"
        :key="categoria"
        class="category-section"
      >
        <div class="category-header">
          <h2>{{ getCategoryLabel(categoria) }}</h2>
          <span class="count">{{ ingredientes.length }} ingredientes</span>
        </div>

        <div class="ingredients-grid">
          <div 
            v-for="ingrediente in ingredientes"
            :key="ingrediente.id"
            class="ingredient-card"
            :class="{ 'unavailable': !ingrediente.disponible }"
          >
            <div class="ingredient-image">
              <img :src="ingrediente.imagen" :alt="ingrediente.nombre">
            </div>
            
            <div class="ingredient-info">
              <h3>{{ ingrediente.nombre }}</h3>
              <p class="price">${{ ingrediente.precio.toFixed(2) }}</p>
              
              <div class="ingredient-actions">
                <button 
                  class="btn-add"
                  :disabled="!ingrediente.disponible"
                  @click="agregarIngrediente(ingrediente)"
                >
                  {{ ingrediente.disponible ? 'Agregar' : 'No disponible' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { inventoryService } from '../data/inventoryService.js';

const ingredientesPorCategoria = ref({});

onMounted(() => {
  cargarIngredientes();
});

const cargarIngredientes = () => {
  ingredientesPorCategoria.value = inventoryService.getIngredientesPorCategoria();
};

const getCategoryLabel = (categoria) => {
  return inventoryService.getCategoryLabel(categoria);
};

const agregarIngrediente = (ingrediente) => {
  if (ingrediente.disponible) {
    console.log('Ingrediente agregado:', ingrediente.nombre);
    // Aquí puedes emitir un evento o agregar a un carrito
    // emit('add-ingredient', ingrediente);
  }
};
</script>

<style scoped>
.ingredients-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  font-size: 2.5rem;
  color: #ff6b35;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.header p {
  font-size: 1.1rem;
  color: #666;
}

.categories-container {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.category-section {
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%);
  padding: 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.category-header {
  background: linear-gradient(135deg, #ff6b35 0%, #ff8555 100%);
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category-header h2 {
  font-size: 1.8rem;
  margin: 0;
}

.count {
  background: rgba(255, 255, 255, 0.3);
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
}

.ingredients-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
}

.ingredient-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
}

.ingredient-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  border-color: #ff6b35;
}

.ingredient-card.unavailable {
  opacity: 0.6;
  cursor: not-allowed;
}

.ingredient-image {
  width: 100%;
  height: 150px;
  overflow: hidden;
  background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
}

.ingredient-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.ingredient-card:hover .ingredient-image img {
  transform: scale(1.1);
}

.ingredient-info {
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ingredient-info h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #333;
  min-height: 40px;
  display: flex;
  align-items: center;
}

.price {
  font-size: 1.3rem;
  font-weight: bold;
  color: #ff6b35;
  margin: 0;
}

.ingredient-actions {
  display: flex;
  gap: 10px;
}

.btn-add {
  flex: 1;
  background: linear-gradient(135deg, #ff6b35 0%, #ff8555 100%);
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: bold;
  transition: all 0.3s ease;
}

.btn-add:hover:not(:disabled) {
  background: linear-gradient(135deg, #ff5521 0%, #ff7043 100%);
  transform: scale(1.05);
}

.btn-add:disabled {
  background: #ccc;
  cursor: not-allowed;
  opacity: 0.6;
}

@media (max-width: 768px) {
  .ingredients-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
  }

  .header h1 {
    font-size: 2rem;
  }

  .category-header {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
}
</style>
