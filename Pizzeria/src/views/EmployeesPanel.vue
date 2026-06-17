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
    
      <template v-if="activeTab === 'Inventario'">
        <!-- Toast notification -->
        <div v-if="notice.show" :class="['toast', notice.type]">
          {{ notice.text }}
        </div>

        <!-- Edit Modal -->
        <div v-if="showEditModal" class="modal-backdrop">
        <div class="modal">
          <header>
            <h3>Editar Producto</h3>
            <button class="close" @click="closeEdit">✖</button>
          </header>
          <div class="body">
            <p class="subtitle">Modifica los detalles del producto</p>

            <label>Nombre
              <input v-model="editing.nombre" placeholder="Nombre del producto" />
            </label>

            <label>Cantidad
              <input type="number" v-model.number="editing.stock" />
            </label>

            <label>Unidad
              <input v-model="editing.unit" placeholder="unidades" />
            </label>

            <label>Stock Mínimo
              <input type="number" v-model.number="editing.minStock" />
            </label>
          </div>
          <footer>
            <button class="btn cancel" @click="closeEdit">Cancelar</button>
            <button class="btn save" @click="saveEdit">Guardar</button>
          </footer>
        </div>
      </div>

      <!-- Confirm Delete Modal -->
      <div v-if="showConfirmDelete" class="modal-backdrop">
        <div class="modal">
          <header>
            <h3>¿Eliminar producto?</h3>
            <button class="close" @click="showConfirmDelete = false">✖</button>
          </header>
          <div class="body">
            <p>¿Desea eliminar "{{ confirmItem ? confirmItem.nombre : '' }}"?</p>
          </div>
          <footer>
            <button class="btn cancel" @click="showConfirmDelete = false">Cancelar</button>
            <button class="btn save" @click="performDelete">Eliminar</button>
          </footer>
        </div>
      </div>

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

      <div class="stats-grid">
  <div class="stat-card yellow">
    <p>Total Productos</p>
    <h2>
      {{ pizzasState.length + ingredientsState.length + drinksState.length }}
    </h2>
  </div>

  <div class="stat-card blue">
    <p>Stock Bajo</p>
    <h2>{{ productsWithLowStock.length }}</h2>
  </div>

  <div class="stat-card green">
    <p>Sin Stock</p>
    <h2>{{ productsWithoutStock.length }}</h2>
  </div>
</div>

        <section class="section-block">
        <h3>Pizzas</h3>
        <div class="cards-grid">
          <article v-for="pizza in pizzasState" :key="`pizza-${pizza.id}`" class="product-card">
            <div class="card-header">
              <h3>{{ pizza.nombre }}</h3>
              <div class="card-icons">
                <button class="icon" @click="openEdit(pizza, 'pizzas')">✏️</button>
                <button class="icon" @click="promptDelete(pizza, 'pizzas')">🗑️</button>
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
              <div class="card-icons">
                <button class="icon" @click="openEdit(ing, 'ingredients')">✏️</button>
                <button class="icon" @click="promptDelete(ing, 'ingredients')">🗑️</button>
              </div>
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
                <button class="icon" @click="openEdit(d, 'drinks')">✏️</button>
                <button class="icon" @click="promptDelete(d, 'drinks')">🗑️</button>
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

        </template>

      <template v-else-if="activeTab === 'Pedidos'">
        <section class="section-block">
          <h3>Pedidos</h3>
          <div class="empty-state">
         No hay pedidos para mostrar
         </div>
        </section>
      </template>

      <template v-else-if="activeTab === 'Domicilio'">
        <section class="section-block">
          <h3>Domicilio</h3>
          <div class="empty-state">
         No hay pedidos a domicilio para mostrar
         </div>
        </section>
      </template>

     <template v-else-if="activeTab === 'Registro'">

  <div class="stats-grid">

    <div class="stat-card yellow">
      <p>Total Pedidos</p>
      <h2>{{ totalPedidos }}</h2>
    </div>

    <div class="stat-card green">
      <p>Total Ventas</p>
      <h2>Q{{ totalVentas }}</h2>
    </div>

    <div class="stat-card blue">
      <p>Efectivo</p>
      <h2>Q{{ totalEfectivo }}</h2>
    </div>

    <div class="stat-card purple">
      <p>Transferencias</p>
      <h2>Q{{ totalTransferencias }}</h2>
    </div>

  </div>

</template>
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

const pedidosLocal = ref([])
const pedidosDomicilio = ref([])

const totalPedidos = ref(0)
const totalVentas = ref(0)
const totalEfectivo = ref(0)
const totalTransferencias = ref(0)

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

// --- Edit / Delete modal state and handlers ---
const showEditModal = ref(false)
const editing = ref<any | null>(null)
const editingCollection = ref<'pizzas'|'ingredients'|'drinks' | null>(null)

function openEdit(item: any, collection: 'pizzas'|'ingredients'|'drinks') {
  editing.value = { ...item, unit: item.unit ?? 'unidades', minStock: item.minStock ?? 0 }
  editingCollection.value = collection
  showEditModal.value = true
}

function closeEdit() {
  showEditModal.value = false
  editing.value = null
  editingCollection.value = null
}

function saveEdit() {
  if (!editing.value || !editingCollection.value) return
  const col = editingCollection.value
  let arr: any[] = col === 'pizzas' ? pizzasState : col === 'ingredients' ? ingredientsState : drinksState
  const idx = arr.findIndex(i => i.id === editing.value.id)
  if (idx >= 0) {
    // update in-place to keep reactivity
    arr[idx] = { ...arr[idx], ...editing.value }
  }
  const name = editing.value.nombre
  closeEdit()
  // show success notification
  showToast(`"${name}" guardado.`)
}

// Confirmation modal state for delete
const showConfirmDelete = ref(false)
const confirmItem = ref<any | null>(null)
const confirmCollection = ref<'pizzas'|'ingredients'|'drinks' | null>(null)

function promptDelete(item: any, collection: 'pizzas'|'ingredients'|'drinks') {
  confirmItem.value = item
  confirmCollection.value = collection
  showConfirmDelete.value = true
}

function performDelete() {
  if (!confirmItem.value || !confirmCollection.value) return
  const name = confirmItem.value.nombre
  const collection = confirmCollection.value
  let arr: any[] = collection === 'pizzas' ? pizzasState : collection === 'ingredients' ? ingredientsState : drinksState
  const idx = arr.findIndex(i => i.id === confirmItem.value.id)
  if (idx >= 0) arr.splice(idx, 1)
  showConfirmDelete.value = false
  confirmItem.value = null
  confirmCollection.value = null
  showToast(`"${name}" eliminado.`, 'success')
}

// Toast / notification state
const notice = ref({ show: false, text: '', type: '' })

function showToast(text: string, type = 'success') {
  notice.value = { show: true, text, type }
  setTimeout(() => { notice.value.show = false }, 2500)
}

function logout() {
  router.push({ name: 'employees' }).catch(() => {})
}
</script>

<style scoped>
.employees-panel {
  min-height: calc(100vh - 82px);
  padding: 24px 0 80px;
  background: #f7efe9;
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
  margin: 0;
  font-size: 3rem;
  font-weight: 800;
  color: #0f172a;
}

.subtitle {
  font-size: 1.2rem;
  color: #64748b;
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
  justify-content: center;
  background: #e5e7eb;
  border-radius: 18px;
  width: fit-content;
  margin: 30px auto;
  padding: 4px;
  gap: 0;
}

.tab {
  min-width: 180px;
  padding: 12px 22px;
  border: none;
  background: transparent;
  border-radius: 16px;
  font-weight: 600;
}

.tab.active {
  background: white;
  box-shadow: none;
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
  background: white;
  border-radius: 18px;
  padding: 22px;
  border: 1px solid #ececec;
  box-shadow: 0 2px 8px rgba(0,0,0,.04);
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

/* Modal styles */
.modal-backdrop {
  position: fixed; inset: 0; display: flex; align-items: center; justify-content: center;
  background: rgba(0,0,0,0.35);
  z-index: 50;
}
.modal {
  width: 520px; background: #fff; border-radius: 12px; padding: 16px; box-shadow: 0 8px 40px rgba(0,0,0,0.2);
}
.modal header { display:flex; justify-content:space-between; align-items:center }
.modal header h3 { margin: 0 }
.modal .close { border: none; background: transparent; font-size: 18px }
.modal .body { display: grid; gap: 10px; margin-top: 12px }
.modal label { display:block; font-size: 14px; color: #333 }
.modal input { width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #e6e6e6 }
.modal footer { display:flex; justify-content:flex-end; gap: 10px; margin-top: 14px }
.btn { padding: 8px 14px; border-radius: 8px; border: none; cursor: pointer }
.btn.cancel { background: #fff; border: 1px solid #e6e6e6 }
.btn.save { background: #e21717; color: #fff }

/* Toast styles */
.toast {
  position: fixed;
  right: 20px;
  bottom: 20px;
  background: rgba(255,255,255,0.96);
  color: #0f172a;
  padding: 8px 12px;
  border-radius: 999px;
  box-shadow: 0 6px 18px rgba(15,23,42,0.06);
  z-index: 60;
  border: 1px solid rgba(15,23,42,0.04);
  font-weight: 600;
  font-size: 0.95rem;
  pointer-events: none;
}
.toast.success {
  background: rgba(16,185,129,0.12);
  color: #065f46;
  border-color: rgba(16,185,129,0.18);
}
.toast.error {
  background: rgba(239,68,68,0.08);
  color: #7f1d1d;
  border-color: rgba(239,68,68,0.12);
} 

@media (max-width: 900px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .panel-tabs {
    width: 100%;
    flex-wrap: wrap;
  }

  .tab {
    min-width: 140px;
  }

  .panel-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
}

.empty-state {
  min-height: 220px;
  background: #f4f4f4;
  border: 1px solid #e5e7eb;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  font-size: 1.2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  margin-top: 30px;
}

.stat-card {
  border-radius: 20px;
  padding: 28px;
  min-height: 180px;
  border: 1px solid;
}

.stat-card h2 {
  font-size: 3rem;
  margin: 20px 0;
}

.yellow {
  background: #faf8e8;
  border-color: #f3d547;
}

.blue {
  background: #eef5ff;
  border-color: #93c5fd;
}

.green {
  background: #eefbf2;
  border-color: #86efac;
}

.purple {
  background: #f8f0ff;
  border-color: #d8b4fe;
}

</style>
