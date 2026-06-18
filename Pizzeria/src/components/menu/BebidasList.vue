<template>
  <section class="bebidas-grid">
    <article class="bebida-card" v-for="bebida in bebidas" :key="bebida.id">
      <img :src="bebida.imagen" :alt="bebida.nombre" class="bebida-img" />

      <div class="bebida-body">
        <h3>{{ bebida.nombre }}</h3>

        <p class="descripcion">{{ bebida.descripcion }}</p>

        <div class="ingredientes">
          <strong>Contenido:</strong>
          <ul>
            <li v-for="item in bebida.ingredientes" :key="item">{{ item }}</li>
          </ul>
        </div>

        <div class="bebida-footer">
          <p class="precio">Q{{ bebida.precio.toFixed(2) }}</p>
          <button class="btn-order" @click="agregar(bebida)">+ Agregar</button>
        </div>
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
import { useCartStore } from '../../stores/cart'
import { bebidas } from '../../data/mock/bebidas'
import type { CartItem } from '../../types/pizza'

const cart = useCartStore()

function agregar(bebida: CartItem): void {
  cart.addItem(bebida)
}
</script>

<style scoped>
.bebidas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
}

.bebida-card {
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #ece7e2;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.bebida-img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
  background: #f3f4f6;
}

.bebida-body {
  padding: 22px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

h3 {
  margin: 0 0 12px;
  font-size: 1.9rem;
  line-height: 1.1;
  color: #0f172a;
}

.descripcion {
  margin: 0 0 18px;
  color: #6b7280;
  line-height: 1.6;
  font-size: 1.1rem;
}

.ingredientes {
  margin-bottom: 22px;
}

.ingredientes strong {
  display: block;
  margin-bottom: 10px;
  font-size: 1.1rem;
  color: #1f2937;
}

.ingredientes ul {
  margin: 0;
  padding-left: 20px;
  color: #4b5563;
}

.ingredientes li {
  margin-bottom: 8px;
}

.bebida-footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
}

.precio {
  margin: 0;
  font-size: 2.3rem;
  font-weight: 800;
  color: #e10600;
}

.btn-order {
  border: none;
  background: #e10600;
  color: #ffffff;
  padding: 13px 20px;
  border-radius: 14px;
  cursor: pointer;
  font-weight: 700;
  font-size: 1rem;
  transition: 0.2s ease;
  min-width: 140px;
}

.btn-order:hover {
  background: #c70500;
}

@media (max-width: 768px) {
  .bebidas-grid {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 18px;
  }

  .bebida-img {
    height: 200px;
  }
}

@media (max-width: 480px) {
  .bebidas-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .bebida-card {
    padding: 14px;
  }

  .bebida-img {
    height: 180px;
  }

  h3 {
    font-size: 18px;
  }

  .precio {
    font-size: 20px;
  }

  .btn-order {
    width: 100%;
    padding: 14px;
  }
}
</style>
