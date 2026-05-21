<script setup lang="ts">
import { computed, ref } from 'vue'
import { ingredients, categoryLabels, categoryOrder } from '../../data/mock/ingredients'
import { useCartStore } from '../../stores/cart'
import type { Ingredient, IngredientCategory } from '../../types/ingredient'
import type { CartItem } from '../../types/pizza'

const cart = useCartStore()
const selectedIds = ref<number[]>([])
const basePrice = 8

const groupedIngredients = computed(() => {
  const grouped: Record<IngredientCategory, Ingredient[]> = {
    base: [],
    quesos: [],
    carnes: [],
    vegetales: [],
    extras: [],
  }

  for (const ingredient of ingredients) {
    grouped[ingredient.categoria].push(ingredient)
  }

  return grouped
})

const selectedIngredients = computed(() =>
  ingredients.filter((ingredient) => selectedIds.value.includes(ingredient.id)),
)

const total = computed(() => {
  const extrasTotal = selectedIngredients.value.reduce(
    (sum, ingredient) => sum + ingredient.precio,
    0,
  )
  return basePrice + extrasTotal
})

const selectedCount = computed(() => selectedIngredients.value.length)

function formatPrice(price: number): string {
  return price === 0 ? 'Gratis' : `+Q${price.toFixed(2)}`
}

function toggleIngredient(id: number): void {
  if (selectedIds.value.includes(id)) {
    selectedIds.value = selectedIds.value.filter((itemId) => itemId !== id)
    return
  }

  selectedIds.value.push(id)
}

function addCustomPizza(): void {
  const customPizza: CartItem = {
    id: `custom-${Date.now()}`,
    nombre: 'Pizza Personalizada',
    descripcion:
      selectedCount.value > 0
        ? `${selectedCount.value} ingredientes seleccionados`
        : 'Base de pizza',
    ingredientes: selectedIngredients.value.map((ingredient) => ingredient.nombre),
    precio: total.value,
    personalizada: true,
  }

  cart.addItem(customPizza)
  selectedIds.value = []
}
</script>

<template>
  <section class="customizer-layout">
    <div class="customizer-card">
      <h2>Selecciona tus ingredientes</h2>
      <p class="subtitle">
        Crea tu pizza perfecta eligiendo los ingredientes que más te gusten
      </p>

      <section
        v-for="category in categoryOrder"
        :key="category"
        class="category-section"
      >
        <h3>{{ categoryLabels[category] }}</h3>

        <div class="ingredients-grid">
          <button
            v-for="ingredient in groupedIngredients[category]"
            :key="ingredient.id"
            type="button"
            class="ingredient-item"
            :class="{ selected: selectedIds.includes(ingredient.id) }"
            @click="toggleIngredient(ingredient.id)"
          >
            <div class="ingredient-left">
              <span class="checkbox">
                <span v-if="selectedIds.includes(ingredient.id)">✓</span>
              </span>
              <span class="ingredient-name">{{ ingredient.nombre }}</span>
            </div>

            <span class="ingredient-price">
              {{ formatPrice(ingredient.precio) }}
            </span>
          </button>
        </div>
      </section>
    </div>

    <aside class="summary-card">
      <h2>Tu Pizza</h2>
      <p class="summary-subtitle">
        {{ selectedCount }} ingredientes seleccionados
      </p>

      <div class="summary-row">
        <span>Base de pizza</span>
        <strong>Q{{ basePrice.toFixed(2) }}</strong>
      </div>

      <div class="selected-box">
        <template v-if="selectedIngredients.length">
          <div
            v-for="ingredient in selectedIngredients"
            :key="ingredient.id"
            class="selected-item"
          >
            <span>{{ ingredient.nombre }}</span>
            <strong>+Q{{ ingredient.precio.toFixed(2) }}</strong>
          </div>
        </template>

        <p v-else class="empty-text">
          No has seleccionado ingredientes
        </p>
      </div>

      <div class="total-row">
        <span>Total</span>
        <strong>Q{{ total.toFixed(2) }}</strong>
      </div>

      <button class="add-button" @click="addCustomPizza">
        Agregar al Pedido
      </button>
    </aside>
  </section>
</template>

<style scoped>
.customizer-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 380px;
  gap: 24px;
  align-items: start;
}

.customizer-card,
.summary-card {
  background: #ffffff;
  border: 1px solid #ece7e2;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
}

.customizer-card {
  padding: 26px;
}

.summary-card {
  padding: 24px;
  position: sticky;
  top: 110px;
}

h2 {
  margin: 0 0 8px;
  font-size: 1.8rem;
  color: #111827;
}

.subtitle,
.summary-subtitle {
  margin: 0 0 22px;
  color: #6b7280;
  font-size: 1.05rem;
}

.category-section + .category-section {
  margin-top: 26px;
}

.category-section h3 {
  margin: 0 0 14px;
  color: #111827;
  font-size: 1.35rem;
}

.ingredients-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.ingredient-item {
  width: 100%;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  border-radius: 14px;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  cursor: pointer;
  transition: 0.2s ease;
  text-align: left;
}

.ingredient-item:hover {
  border-color: #d1d5db;
}

.ingredient-item.selected {
  border-color: #e10600;
  background: #fff5f5;
}

.ingredient-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid #d1d5db;
  border-radius: 6px;
  display: grid;
  place-items: center;
  color: #ffffff;
  font-size: 0.8rem;
  background: #ffffff;
}

.ingredient-item.selected .checkbox {
  background: #e10600;
  border-color: #e10600;
}

.ingredient-name {
  font-weight: 600;
  color: #111827;
}

.ingredient-price {
  color: #6b7280;
  font-weight: 700;
}

.summary-row,
.total-row,
.selected-item {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.summary-row {
  padding: 0 0 18px;
  border-bottom: 1px solid #ece7e2;
  color: #111827;
}

.selected-box {
  min-height: 120px;
  padding: 18px 0;
  border-bottom: 1px solid #ece7e2;
}

.selected-item + .selected-item {
  margin-top: 10px;
}

.empty-text {
  margin: 18px 0;
  text-align: center;
  color: #6b7280;
}

.total-row {
  padding: 18px 0;
  font-size: 1.2rem;
  color: #111827;
}

.total-row strong {
  color: #e10600;
  font-size: 2rem;
}

.add-button {
  width: 100%;
  border: none;
  background: #ef8d8d;
  color: #ffffff;
  padding: 14px 18px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  font-size: 1rem;
}

.add-button:hover {
  background: #e67878;
}

@media (max-width: 1024px) {
  .customizer-layout {
    grid-template-columns: 1fr;
  }

  .summary-card {
    position: static;
  }
}

@media (max-width: 768px) {
  .ingredients-grid {
    grid-template-columns: 1fr;
  }
}
</style>