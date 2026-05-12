<template>
  <div>
    <h1 class="title">Resumen de Pedidos</h1>

    <SummaryCards
      :pending="pending"
      :preparing="preparing"
      :completed="completed"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SummaryCards from '../components/SummaryCards.vue'

const pending = ref(0)
const preparing = ref(0)
const completed = ref(0)

onMounted(() => {

  // Simulación de pedidos
  const orders = [
    { status: 'pending' },
    { status: 'pending' },
    { status: 'preparing' },
    { status: 'completed' },
    { status: 'completed' },
    { status: 'completed' }
  ]

  pending.value = orders.filter(o => o.status === 'pending').length

  preparing.value = orders.filter(
    o => o.status === 'preparing'
  ).length

  completed.value = orders.filter(
    o => o.status === 'completed'
  ).length
})
</script>

<style scoped>
.title {
  font-size: 32px;
  font-weight: bold;
  padding: 20px;
}
</style>