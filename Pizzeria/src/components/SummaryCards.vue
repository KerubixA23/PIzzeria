<template>
  <div class="cards-container">
    
    <div class="card pending">
      <h2>Pendientes</h2>
      <p>{{ pending }}</p>
    </div>

    <div class="card preparing">
      <h2>En preparación</h2>
      <p>{{ preparing }}</p>
    </div>

    <div class="card completed">
      <h2>Completados</h2>
      <p>{{ completed }}</p>
    </div>

  </div>
</template>

<script setup>
defineProps({
  pending: Number,
  preparing: Number,
  completed: Number
})
</script>

<style scoped>
.cards-container {
  display: flex;
  gap: 20px;
  padding: 20px;
  flex-wrap: wrap;
}

.card {
  flex: 1;
  min-width: 220px;
  padding: 25px;
  border-radius: 16px;
  color: white;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
  transition: 0.3s;
}

.card:hover {
  transform: translateY(-5px);
}

.card h2 {
  font-size: 20px;
  margin-bottom: 10px;
}

.card p {
  font-size: 40px;
  font-weight: bold;
}

.pending {
  background: linear-gradient(135deg, #ff9800, #ffb74d);
}

.preparing {
  background: linear-gradient(135deg, #2196f3, #64b5f6);
}

.completed {
  background: linear-gradient(135deg, #4caf50, #81c784);
}
</style>