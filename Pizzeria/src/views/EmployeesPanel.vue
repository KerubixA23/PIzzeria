<template>
  <main class="employees-panel">
    <div class="container">
      <header class="panel-header">
        <div>
          <h1>Panel de Empleados</h1>
          <p class="subtitle">Gestiona pedidos e inventario en tiempo real</p>
        </div>

        <div class="header-actions">
          <button class="logout-btn" @click="logout">Cerrar Sesión</button>
        </div>
      </header>

      <nav class="panel-tabs">
        <button
          v-for="t in tabs"
          :key="t"
          :class="['tab', { active: activeTab === t }]"
          @click="activeTab = t"
        >
          {{ t }}
        </button>
      </nav>

      <section class="panel-controls">
        <h2>Inventario</h2>
        <p class="small">Gestiona el stock de productos</p>

        <div class="controls-right">
          <button class="add-btn" :disabled="!interactive" @click="addProduct">+ Agregar Producto</button>
        </div>
      </section>

      <!-- Alerta de productos sin stock -->
      <section v-if="productsWithoutStock.length > 0" class="alert alert-danger">
        <div class="alert-icon">⚠️</div>
        <div class="alert-content">
          <h3>¡Productos sin stock!</h3>
          <p>Los siguientes productos están agotados: {{ getProductListString(productsWithoutStock) }}</p>
        </div>
      </section>

      <!-- Alerta de stock bajo -->
      <section v-if="productsWithLowStock.length > 0" class="alert alert-warning">
        <div class="alert-icon">⚠️</div>
        <div class="alert-content">
          <h3>Stock bajo</h3>
          <p>Los siguientes productos tienen stock bajo: {{ getProductListString(productsWithLowStock) }}</p>
        </div>
      </section>

      <section class="section-block">
        <h3>Pizzas</h3>
        <div class="cards-grid">
          <article v-for="pizza in pizzasState" :key="`pizza-${pizza.id}`" class="product-card">
            <div class="card-header">
              <h3>{{ pizza.nombre }}</h3>
              <div class="card-icons">
                <button class="icon">✏️</button>
                <button class="icon">🗑️</button>
              </div>
            </div>

            <p class="units">unidades</p>

            <div class="stock-row">
              <label>Stock:</label>
              <div class="badge">{{ pizza.stock }} unidades</div>
            </div>

            <div class="stock-controls">
              <button class="qty" :disabled="!interactive" @click="decrease(pizza)">−</button>
              <button class="qty" :disabled="!interactive" @click="increase(pizza)">+</button>
              <button class="add-ten" :disabled="!interactive" @click="addTen(pizza)">+10</button>
            </div>
          </article>
        </div>
      </section>

      <section class="section-block">
        <h3>Ingredientes</h3>
        <div class="cards-grid">
          <article v-for="ing in ingredientsState" :key="`ing-${ing.id}`" class="product-card small-card">
            <div class="card-header">
              <h4>{{ ing.nombre }}</h4>
            </div>
            <p class="category">{{ ing.categoria }}</p>
            <div class="stock-row">
              <label>Stock:</label>
              <div class="badge">{{ ing.stock }} unidades</div>
            </div>
            <div class="stock-controls">
              <button class="qty" :disabled="!interactive" @click="decrease(ing)">−</button>
              <button class="qty" :disabled="!interactive" @click="increase(ing)">+</button>
              <button class="add-ten" :disabled="!interactive" @click="addTen(ing)">+10</button>
            </div>
          </article>
        </div>
      </section>

      <section class="section-block">
        <h3>Bebidas</h3>
        <div class="cards-grid">
          <article v-for="d in drinksState" :key="`drink-${d.id}`" class="product-card">
            <div class="card-header">
              <h3>{{ d.nombre }}</h3>
              <div class="card-icons">
                <button class="icon">✏️</button>
                <button class="icon">🗑️</button>
              </div>
            </div>

            <p class="units">unidades</p>

            <div class="stock-row">
              <label>Stock:</label>
              <div class="badge">{{ d.stock }} unidades</div>
            </div>

            <div class="stock-controls">
              <button class="qty" :disabled="!interactive" @click="decrease(d)">−</button>
              <button class="qty" :disabled="!interactive" @click="increase(d)">+</button>
              <button class="add-ten" :disabled="!interactive" @click="addTen(d)">+10</button>
            </div>
          </article>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { pizzas as mockPizzas } from '../data/mock/pizzas'
import { ingredients as mockIngredients } from '../data/mock/ingredients'
import { drinks as mockDrinks } from '../data/mock/drinks'

const router = useRouter()

const tabs = ['Pedidos', 'Domicilio', 'Registro', 'Inventario']
const activeTab = ref('Inventario')

// Controles interactivos habilitados
const interactive = true

// Inicializar estado local con stock por default
const pizzasState = reactive(
  mockPizzas.map((p) => ({ ...p, stock: 50 }))
)

const ingredientsState = reactive(
  mockIngredients.map((i) => ({ ...i, stock: 100 }))
)

const drinksState = reactive(
  mockDrinks.map((d) => ({ ...d, stock: 200 }))
)

// Computed properties para alertas de stock
const productsWithoutStock = computed(() => {
  const allProducts = [...pizzasState, ...ingredientsState, ...drinksState]
  return allProducts.filter(p => p.stock === 0)
})

const productsWithLowStock = computed(() => {
  const allProducts = [...pizzasState, ...ingredientsState, ...drinksState]
  return allProducts.filter(p => p.stock > 0 && p.stock <= 10)
})

function getProductListString(products: any[]): string {
  return products.map(p => `${p.nombre} (${p.stock})`).join(', ')
}

function decrease(pizza: any) {
  if (!interactive) return
  if (pizza.stock > 0) pizza.stock -= 1
}

function increase(pizza: any) {
  if (!interactive) return
  pizza.stock += 1
}

function addTen(pizza: any) {
  if (!interactive) return
  pizza.stock += 10
}

function addProduct() {
  if (!interactive) return
  // placeholder: agregar una pizza vacía para desarrollo
  const id = pizzasState.length + 1
  pizzasState.push({ id, nombre: 'Nuevo Producto', descripcion: '', ingredientes: [], precio: 0, imagen: '', stock: 0 })
}

function logout() {
  router.push({ name: 'employees' }).catch(() => {})
}
</script>

<style scoped>
.employees-panel {
  min-height: calc(100vh - 82px);
  padding: 24px 0 80px;
}

.container {
  width: min(1200px, calc(100% - 32px));
  margin: 0 auto;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.panel-header h1 {
  margin: 0 0 6px;
  font-size: 2rem;
}

.subtitle {
  margin: 0;
  color: #6b7280;
}

.header-actions .logout-btn {
  background: #fff;
  border: 1px solid #e5e7eb;
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
}

.panel-tabs {
  display: flex;
  gap: 12px;
  margin: 18px 0;
}

.tab {
  padding: 10px 18px;
  border-radius: 999px;
  border: 1px solid transparent;
  background: #f3f4f6;
  cursor: pointer;
}

.tab.active {
  background: #fff;
  border-color: #e5e7eb;
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.06);
}

.panel-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 18px 0 8px;
}

.panel-controls h2 { margin: 0; }
.panel-controls .small { margin: 4px 0 0; color: #6b7280 }

.controls-right .add-btn {
  background: #e10600;
  color: #fff;
  border: none;
  padding: 10px 16px;
  border-radius: 12px;
  cursor: pointer;
}

.controls-right .add-btn:disabled {
  opacity: 0.6;
  cursor: default;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 18px;
  margin-top: 12px;
}

.product-card {
  background: #fff;
  border: 1px solid #f0e6e3;
  border-radius: 12px;
  padding: 18px;
}

.card-header { display:flex; justify-content:space-between; align-items:center }
.card-header h3 { margin:0 }
.card-icons .icon { background: transparent; border: none; cursor: pointer; margin-left: 8px }

.units { color:#9ca3af; margin: 8px 0 }

.stock-row { display:flex; align-items:center; gap:12px }
.badge { background:#10b981; color:#fff; padding:6px 10px; border-radius:999px; font-weight:700 }

.stock-controls { display:flex; gap:10px; margin-top:12px }
.qty { width:70px; padding:10px; border-radius:8px; border:1px solid #e5e7eb; background:#fff; cursor:pointer }
.qty:disabled { opacity: 0.6; cursor: default }
.add-ten { background:#e10600; color:#fff; border:none; padding:10px 16px; border-radius:8px; cursor:pointer }
.add-ten:disabled { opacity: 0.6; cursor: default }

 .section-block { margin-top: 22px }
 .small-card { padding: 12px }
 .category { color: #6b7280; margin: 8px 0 }

.alert {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 16px;
  border: 1px solid;
}

.alert-danger {
  background: #fee2e2;
  border-color: #fca5a5;
}

.alert-danger .alert-icon {
  color: #dc2626;
  font-size: 1.5rem;
}

.alert-danger h3,
.alert-danger p {
  color: #dc2626;
  margin: 0;
}

.alert-danger h3 {
  font-size: 1.1rem;
  margin-bottom: 4px;
}

.alert-warning {
  background: #fef3c7;
  border-color: #fde047;
}

.alert-warning .alert-icon {
  color: #d97706;
  font-size: 1.5rem;
}

.alert-warning h3,
.alert-warning p {
  color: #d97706;
  margin: 0;
}

.alert-warning h3 {
  font-size: 1.1rem;
  margin-bottom: 4px;
}

.alert-content {
  flex: 1;
}

.alert-content p {
  font-size: 0.95rem;
  line-height: 1.4;
}

</style>
