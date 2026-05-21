<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const codigo = ref('')
const errorMessage = ref('')

function ingresar(): void {
  if (codigo.value.trim().toUpperCase() === 'PIZZA2024') {
    errorMessage.value = ''
    // Redirigir al panel de empleados (componente temporal en desarrollo)
    router.push({ name: 'employees-panel' }).catch(() => {})
    return
  }

  errorMessage.value = 'Código incorrecto'
}
</script>

<template>
  <main class="employees-page">
    <div class="container">
      <section class="card">
        <div class="icon-wrap">
          🔒
        </div>

        <h1>Acceso para Empleados</h1>
        <p class="subtitle">
          Ingresa el código proporcionado por la empresa
        </p>

        <input
          v-model="codigo"
          type="text"
          placeholder="Código de acceso"
          class="code-input"
        />

        <button class="login-btn" @click="ingresar">
          Ingresar
        </button>

        <p v-if="errorMessage" class="error">
          {{ errorMessage }}
        </p>

        <p class="demo-code">
          Código de demostración: PIZZA2024
        </p>
      </section>
    </div>
  </main>
</template>

<style scoped>
.employees-page {
  min-height: calc(100vh - 82px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0 64px;
}

.container {
  width: min(1200px, calc(100% - 32px));
  margin: 0 auto;
}

.card {
  width: min(460px, 100%);
  margin: 0 auto;
  background: #ffffff;
  border: 1px solid #ece7e2;
  border-radius: 22px;
  padding: 34px 28px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
  text-align: center;
}

.icon-wrap {
  width: 72px;
  height: 72px;
  margin: 0 auto 20px;
  border-radius: 999px;
  background: #fee2e2;
  display: grid;
  place-items: center;
  font-size: 2rem;
}

h1 {
  margin: 0 0 10px;
  font-size: 2rem;
  color: #111827;
}

.subtitle {
  margin: 0 0 24px;
  color: #6b7280;
  font-size: 1.1rem;
}

.code-input {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  outline: none;
  margin-bottom: 16px;
  text-align: center;
  font-size: 1rem;
}

.code-input:focus {
  border-color: #e10600;
}

.login-btn {
  width: 100%;
  border: none;
  background: #e10600;
  color: #ffffff;
  padding: 14px 18px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  font-size: 1rem;
}

.error {
  margin: 14px 0 0;
  color: #dc2626;
  font-weight: 600;
}

.demo-code {
  margin: 22px 0 0;
  color: #9ca3af;
}
</style>