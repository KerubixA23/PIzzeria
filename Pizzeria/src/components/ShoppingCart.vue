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
  padding: 24px;
  border-radius: 18px;
  max-width: 900px;
  margin: 20px auto;

  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
}

.shopping-cart h2 {
  margin-top: 0;
  margin-bottom: 24px;
  color: #222;
  font-size: 2rem;
}

/* ITEMS */
.cart-items {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.cart-item {
  background: white;
  padding: 18px;
  border-radius: 14px;
  border-left: 5px solid #d4331f;

  display: grid;
  grid-template-columns: 90px 1fr 130px;
  gap: 18px;
  align-items: start;

  box-shadow: 0 2px 10px rgba(0,0,0,0.05);

  transition: transform 0.2s ease,
              box-shadow 0.2s ease;
}

.cart-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 18px rgba(0,0,0,0.08);
}

/* NUMERO */
.item-numero {
  font-weight: bold;
  color: #d4331f;
  font-size: 1rem;
}

/* INGREDIENTES */
.item-ingredientes {
  font-size: 14px;
  color: #444;
}

.precio-base {
  margin: 0 0 8px;
  color: #666;
}

.item-ingredientes p {
  margin: 6px 0;
}

.item-ingredientes ul {
  margin: 8px 0;
  padding-left: 18px;
}

.item-ingredientes li {
  margin: 4px 0;
  line-height: 1.4;
}

.sin-ingredientes {
  color: #999;
  font-style: italic;
  margin: 5px 0;
}

/* TOTAL */
.item-total {
  text-align: right;

  display: flex;
  flex-direction: column;
  gap: 10px;
}

.total {
  margin: 0;
  font-size: 22px;
  font-weight: bold;
  color: #d4331f;
}

/* BOTONES */
.btn-remover {
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;

  font-size: 13px;
  font-weight: bold;

  transition: background 0.3s ease,
              transform 0.2s ease;
}

.btn-remover:hover {
  background: #ee5a52;
  transform: scale(1.02);
}

/* RESUMEN */
.cart-resumen {
  background: #fff;
  padding: 22px;
  border-radius: 14px;
  border-top: 3px solid #d4331f;

  margin-top: 18px;
  text-align: center;

  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.cart-resumen h3 {
  margin: 0 0 18px;
  color: #333;
}

.total-monto {
  color: #d4331f;
  font-size: 30px;
}

.btn-limpiar {
  background: #666;
  color: white;
  border: none;
  padding: 12px 22px;
  border-radius: 8px;
  cursor: pointer;

  font-weight: bold;

  transition: background 0.3s ease,
              transform 0.2s ease;
}

.btn-limpiar:hover {
  background: #555;
  transform: scale(1.02);
}

/* CARRITO VACÍO */
.carrito-vacio {
  text-align: center;
  padding: 50px 20px;
  color: #999;
}

.carrito-vacio p:first-child {
  font-size: 20px;
  margin-bottom: 10px;
}

.instruccion {
  font-size: 14px;
  font-style: italic;
}

/* =========================
   TABLET
========================= */
@media (max-width: 768px) {
  .shopping-cart {
    padding: 20px;
  }

  .cart-item {
    grid-template-columns: 1fr;
  }

  .item-total {
    text-align: left;
  }

  .total {
    font-size: 20px;
  }

  .shopping-cart h2 {
    font-size: 1.7rem;
  }
}

/* =========================
   CELULAR
========================= */
@media (max-width: 480px) {
  .shopping-cart {
    padding: 14px;
    margin: 10px;
    border-radius: 14px;
  }

  .cart-item {
    padding: 14px;
    gap: 14px;
  }

  .shopping-cart h2 {
    font-size: 1.4rem;
    text-align: center;
  }

  .item-numero {
    font-size: 0.95rem;
  }

  .item-ingredientes {
    font-size: 13px;
  }

  .item-total {
    width: 100%;
  }

  .btn-remover,
  .btn-limpiar {
    width: 100%;
  }

  .total-monto {
    font-size: 24px;
  }

  .carrito-vacio {
    padding: 30px 10px;
  }
}
</style>