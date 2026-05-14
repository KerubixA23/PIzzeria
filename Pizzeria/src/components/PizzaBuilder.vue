<template>
  <div class="app-container">
    <section class="selector-panel">
      <div class="section-header">
        <div>
          <p class="eyebrow">Panel de ingredientes</p>
          <h1>Arma tu pizza</h1>
          <p class="subtitle">Ajusta la cantidad de cada ingrediente y sigue el total en el panel derecho.</p>
        </div>
      </div>

      <div class="ingredient-grid">
        <article
          v-for="ingredient in ingredients"
          :key="ingredient.id"
          class="ingredient-card"
        >
          <div>
            <h2>{{ ingredient.name }}</h2>
            <p class="price">Precio: ${{ ingredient.price.toFixed(2) }}</p>
          </div>

          <div class="quantity-controls">
            <button
              type="button"
              class="adjust-btn"
              @click="decreaseCount(ingredient)"
              :disabled="ingredient.selectedCount === 0"
            >
              -
            </button>
            <span class="count">{{ ingredient.selectedCount }}</span>
            <button
              type="button"
              class="adjust-btn"
              @click="increaseCount(ingredient)"
            >
              +
            </button>
          </div>
        </article>
      </div>
    </section>

    <aside class="summary-panel">
      <div class="summary-header">
        <p class="eyebrow">Resumen</p>
        <h2>Tu selección</h2>
      </div>

      <div class="summary-row">
        <span>Ingredientes seleccionados</span>
        <strong>{{ ingredientCount }}</strong>
      </div>

      <div v-if="selectedIngredients.length === 0" class="empty-state">
        <p>No hay ingredientes seleccionados aún.</p>
      </div>

      <ul class="selected-list" v-else>
        <li v-for="item in selectedIngredients" :key="item.id">
          <span>{{ item.name }} x{{ item.selectedCount }}</span>
          <span>${{ (item.price * item.selectedCount).toFixed(2) }}</span>
        </li>
      </ul>

      <div class="total-row">
        <span>Total</span>
        <strong>${{ totalPrice.toFixed(2) }}</strong>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'

const ingredients = reactive([
  { id: 1, name: 'Queso Mozzarella', price: 2.5, selectedCount: 0 },
  { id: 2, name: 'Jamón', price: 3.0, selectedCount: 0 },
  { id: 3, name: 'Champiñones', price: 2.0, selectedCount: 0 },
  { id: 4, name: 'Pimiento', price: 1.8, selectedCount: 0 },
  { id: 5, name: 'Aceitunas', price: 1.6, selectedCount: 0 },
  { id: 6, name: 'Anchoas', price: 2.7, selectedCount: 0 }
])

const selectedIngredients = computed(() => ingredients.filter((item) => item.selectedCount > 0))
const ingredientCount = computed(() => selectedIngredients.value.reduce((sum, item) => sum + item.selectedCount, 0))
const totalPrice = computed(() => selectedIngredients.value.reduce((sum, item) => sum + item.price * item.selectedCount, 0))

function increaseCount(item) {
  item.selectedCount += 1
}

function decreaseCount(item) {
  if (item.selectedCount > 0) {
    item.selectedCount -= 1
  }
}
</script>

<style scoped>
/* CONTENEDOR PRINCIPAL */
.app-container {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(320px, 1fr);
  gap: 24px;
  padding: 24px;
  min-height: 100vh;
  background: #f7f7f9;
}

/* PANELES */
.selector-panel,
.summary-panel {
  background: #ffffff;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 12px 30px rgba(16, 24, 40, 0.08);
}

/* HEADERS */
.section-header,
.summary-header {
  margin-bottom: 24px;
}

.eyebrow {
  margin: 0 0 8px;
  color: #7c7f84;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

h1,
h2 {
  margin: 0;
  color: #111827;
}

h1 {
  font-size: 2rem;
}

h2 {
  font-size: 1.2rem;
}

.subtitle {
  margin-top: 12px;
  color: #4b5563;
  line-height: 1.6;
}

/* GRID DE INGREDIENTES */
.ingredient-grid {
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

/* CARD */
.ingredient-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 18px;

  transition: transform 0.2s ease,
              box-shadow 0.2s ease;
}

.ingredient-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 18px rgba(0,0,0,0.08);
}

.ingredient-card h2 {
  margin: 0 0 6px;
  font-size: 1rem;
}

.price {
  margin: 0;
  color: #6b7280;
  font-size: 0.95rem;
}

/* CONTROLES */
.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.adjust-btn {
  width: 38px;
  height: 38px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  background: #ffffff;
  color: #111827;
  font-size: 1.2rem;
  cursor: pointer;

  transition: all 0.2s ease;
}

.adjust-btn:hover {
  background: #f3f4f6;
}

.adjust-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.count {
  min-width: 28px;
  text-align: center;
  font-weight: 700;
}

/* RESUMEN */
.summary-row,
.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 14px 0;
  border-bottom: 1px solid #e5e7eb;
}

.total-row {
  margin-top: 20px;
  border-bottom: none;
  font-size: 1.15rem;
  font-weight: bold;
}

/* LISTA */
.selected-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.selected-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 12px 0;
  border-bottom: 1px solid #f3f4f6;

  gap: 10px;
}

.selected-list li:last-child {
  border-bottom: none;
}

/* ESTADO VACÍO */
.empty-state {
  padding: 16px;
  border-radius: 14px;
  background: #f8fafc;
  color: #6b7280;
  text-align: center;
}

/* =========================
   TABLET
========================= */
@media (max-width: 960px) {
  .app-container {
    grid-template-columns: 1fr;
  }

  .summary-panel {
    order: -1;
  }

  h1 {
    font-size: 1.8rem;
  }
}

/* =========================
   CELULAR
========================= */
@media (max-width: 600px) {
  .app-container {
    padding: 14px;
    gap: 16px;
  }

  .selector-panel,
  .summary-panel {
    padding: 18px;
    border-radius: 16px;
  }

  .ingredient-grid {
    grid-template-columns: 1fr;
  }

  .ingredient-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .quantity-controls {
    width: 100%;
    justify-content: space-between;
  }

  .adjust-btn {
    flex: 1;
    height: 42px;
  }

  h1 {
    font-size: 1.5rem;
  }

  .subtitle {
    font-size: 0.95rem;
  }

  .selected-list li {
    flex-direction: column;
    align-items: flex-start;
  }

  .summary-row,
  .total-row {
    font-size: 0.95rem;
  }
}
</style>