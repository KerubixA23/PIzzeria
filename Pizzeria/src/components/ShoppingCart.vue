<template>
  <div class="shopping-cart">
    <h2>Carrito de Compras</h2>
    
    <div v-if="cartStore.cantidadItems > 0" class="cart-items">
      <div v-for="(pizza, index) in cartStore.obtenerItems()" :key="pizza.id" class="cart-item">
        <div class="item-numero">Pizza #{{ index + 1 }}</div>
        <div class="item-ingredientes">
          <p class="precio-base">Base: Q8.00</p>
          <p v-if="pizza.ingredientesSeleccionados.length > 0">
            <strong>Ingredientes:</strong>
          </p>
          <ul v-if="pizza.ingredientesSeleccionados.length > 0">
            <li v-for="ing in pizza.ingredientesSeleccionados" :key="ing.id">
              {{ ing.nombre }} (+Q{{ ing.precio.toFixed(2) }})
            </li>
          </ul>
          <p v-else class="sin-ingredientes">Sin ingredientes adicionales</p>
        </div>
        <div class="item-total">
          <p class="total">Q{{ pizza.precioTotal.toFixed(2) }}</p>
          <button @click="remover(pizza.id!)" class="btn-remover">Remover</button>
        </div>
      </div>

      <div class="cart-resumen">
        <h3>Total: <span class="total-monto">Q{{ cartStore.total.toFixed(2) }}</span></h3>
        <button @click="limpiar" class="btn-limpiar">Limpiar Carrito</button>
      </div>
    </div>

    <div v-else class="carrito-vacio">
      <p>El carrito está vacío</p>
      <p class="instruccion">Selecciona ingredientes para agregar pizzas</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cartStore'

const cartStore = useCartStore()

function remover(id: string) {
  cartStore.removerDelCarrito(id)
}

function limpiar() {
  if (confirm('¿Deseas vaciar el carrito?')) {
    cartStore.vaciarCarrito()
  }
}
</script>

<style scoped>
.shopping-cart {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  margin: 20px auto;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.cart-item {
  background: white;
  padding: 15px;
  border-radius: 6px;
  border-left: 4px solid #d4331f;
  display: grid;
  grid-template-columns: 80px 1fr 120px;
  gap: 15px;
  align-items: start;
}

.item-numero {
  font-weight: bold;
  color: #d4331f;
}

.item-ingredientes {
  font-size: 14px;
}

.precio-base {
  margin: 0 0 8px 0;
  color: #666;
}

.item-ingredientes p {
  margin: 5px 0;
}

.item-ingredientes ul {
  margin: 5px 0;
  padding-left: 20px;
}

.item-ingredientes li {
  margin: 3px 0;
}

.sin-ingredientes {
  color: #999;
  font-style: italic;
  margin: 5px 0;
}

.item-total {
  text-align: right;
}

.total {
  margin: 0 0 10px 0;
  font-size: 20px;
  font-weight: bold;
  color: #d4331f;
}

.btn-remover {
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: background 0.3s;
}

.btn-remover:hover {
  background: #ee5a52;
}

.cart-resumen {
  background: #fff;
  padding: 20px;
  border-radius: 6px;
  border-top: 2px solid #d4331f;
  margin-top: 15px;
  text-align: center;
}

.cart-resumen h3 {
  margin: 0 0 15px 0;
  color: #333;
}

.total-monto {
  color: #d4331f;
  font-size: 28px;
}

.btn-limpiar {
  background: #666;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-limpiar:hover {
  background: #555;
}

.carrito-vacio {
  text-align: center;
  padding: 40px 20px;
  color: #999;
}

.carrito-vacio p:first-child {
  font-size: 18px;
  margin-bottom: 10px;
}

.instruccion {
  font-size: 14px;
  font-style: italic;
}
</style>
