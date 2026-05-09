<template>
  <div class="pizza-customizer">
    <h2>Personaliza tu Pizza</h2>
    
    <div class="precio-info">
      <p class="precio-base">Base: Q{{ precioBase.toFixed(2) }}</p>
      <p class="precio-total">Total: <strong>Q{{ precioTotal.toFixed(2) }}</strong></p>
    </div>

    <div class="ingredientes-section">
      <h3>Ingredientes Disponibles</h3>
      <div class="categorias">
        <div v-for="categoria in categorias" :key="categoria" class="categoria">
          <h4>{{ categoria }}</h4>
          <div class="ingredientes-lista">
            <label v-for="ingrediente in getIngredientesPorCategoria(categoria)" 
                   :key="ingrediente.id" 
                   class="ingrediente-item">
              <input 
                type="checkbox" 
                :value="ingrediente.id"
                v-model.number="selectedIds"
                @change="actualizarPrecio"
              />
              <span>{{ ingrediente.nombre }} (+Q{{ ingrediente.precio.toFixed(2) }})</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="ingredientes-seleccionados">
      <h3>Ingredientes Seleccionados:</h3>
      <div v-if="ingredientesSeleccionados.length > 0" class="lista-seleccionados">
        <span v-for="ingrediente in ingredientesSeleccionados" 
              :key="ingrediente.id" 
              class="ingrediente-tag">
          {{ ingrediente.nombre }} <button @click="removerIngrediente(ingrediente.id)">✕</button>
        </span>
      </div>
      <p v-else class="sin-ingredientes">Sin ingredientes adicionales</p>
    </div>

    <button class="btn-agregar" @click="agregarAlCarrito">
      Agregar al Carrito - Q{{ precioTotal.toFixed(2) }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { obtenerIngredientes, obtenerIngredientesPorCategoria, crearPizza, calcularPrecioTotal } from '../services/pizzaService'
import { useCartStore } from '../stores/cartStore'
import type { Ingrediente } from '../services/pizzaService'

const cartStore = useCartStore()
const todosLosIngredientes = obtenerIngredientes()
const precioBase = 8.00
const selectedIds = ref<number[]>([])

const categorias = computed(() => {
  const cats = new Set(todosLosIngredientes.map(ing => ing.categoria))
  return Array.from(cats)
})

const ingredientesSeleccionados = computed(() => {
  return todosLosIngredientes.filter(ing => selectedIds.value.includes(ing.id))
})

const precioTotal = computed(() => {
  return calcularPrecioTotal(ingredientesSeleccionados.value)
})

function getIngredientesPorCategoria(categoria: string): Ingrediente[] {
  return obtenerIngredientesPorCategoria(categoria)
}

function actualizarPrecio() {
  // El computed va a actualizar automáticamente el precio
}

function removerIngrediente(id: number) {
  selectedIds.value = selectedIds.value.filter(ingId => ingId !== id)
}

function agregarAlCarrito() {
  const pizza = crearPizza(ingredientesSeleccionados.value)
  cartStore.agregarAlCarrito(pizza)
  selectedIds.value = []
}
</script>

<style scoped>
.pizza-customizer {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  margin: 20px auto;
}

.precio-info {
  background: white;
  padding: 15px;
  border-radius: 6px;
  margin-bottom: 20px;
  text-align: center;
}

.precio-base {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.precio-total {
  margin: 10px 0 0 0;
  color: #d4331f;
  font-size: 24px;
  font-weight: bold;
}

.ingredientes-section {
  margin-bottom: 20px;
}

.ingredientes-section h3 {
  margin-top: 0;
  color: #333;
}

.categorias {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.categoria {
  background: white;
  padding: 15px;
  border-radius: 6px;
  border-left: 4px solid #d4331f;
}

.categoria h4 {
  margin: 0 0 10px 0;
  color: #d4331f;
}

.ingredientes-lista {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ingrediente-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
}

.ingrediente-item input {
  margin-right: 8px;
  cursor: pointer;
}

.ingredientes-seleccionados {
  background: white;
  padding: 15px;
  border-radius: 6px;
  margin-bottom: 20px;
}

.ingredientes-seleccionados h3 {
  margin: 0 0 10px 0;
  color: #333;
}

.lista-seleccionados {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
}

.ingrediente-tag {
  background: #d4331f;
  color: white;
  padding: 6px 10px;
  border-radius: 20px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.ingrediente-tag button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
  padding: 0;
}

.sin-ingredientes {
  color: #999;
  font-style: italic;
  margin: 0;
}

.btn-agregar {
  width: 100%;
  padding: 15px;
  background: #d4331f;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-agregar:hover {
  background: #c0291a;
}
</style>
