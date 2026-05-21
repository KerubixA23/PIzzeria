<script setup lang="ts">
import { ref } from 'vue'
import MenuTabs from '../components/menu/MenuTabs.vue'
import PizzaList from '../components/menu/PizzaList.vue'
import PizzaCustomizer from '../components/customizer/PizzaCustomizer.vue'

type HomeTab = 'menu' | 'personalizar' | 'bebidas'

const activeTab = ref<HomeTab>('menu')
</script>

<template>
  <main class="home">
    <div class="container">
      <section class="hero">
        <h1>Bienvenido a Pizza Express</h1>
        <p>Elige tu pizza favorita o crea tu propia combinación.</p>

        <MenuTabs v-model="activeTab" />
      </section>

      <section v-if="activeTab === 'menu'" class="section-content">
        <PizzaList />
      </section>

      <section v-else-if="activeTab === 'personalizar'" class="section-content">
        <PizzaCustomizer />
      </section>

      <section v-else class="placeholder-card">
        <h2>Bebidas</h2>
        <p>
          Esta sección queda lista como base visual. Después se conecta con su
          lógica y sus endpoints.
        </p>
      </section>
    </div>
  </main>
</template>

<style scoped>
.home {
  padding: 40px 0 64px;
}

.container {
  width: min(1200px, calc(100% - 32px));
  margin: 0 auto;
}

.hero {
  margin-bottom: 32px;
}

.hero h1 {
  margin: 0 0 12px;
  font-size: clamp(2.4rem, 5vw, 4.2rem);
  line-height: 1.05;
  color: #0f172a;
}

.hero p {
  margin: 0 0 28px;
  font-size: 1.25rem;
  color: #6b7280;
}

.placeholder-card {
  background: #ffffff;
  border: 1px solid #ece7e2;
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
}

.placeholder-card h2 {
  margin-top: 0;
  color: #0f172a;
}

.placeholder-card p {
  margin-bottom: 0;
  color: #6b7280;
  line-height: 1.6;
}
</style>