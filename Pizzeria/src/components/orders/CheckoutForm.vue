<script setup lang="ts">
import { ref } from "vue";

const formulario = ref({
  nombre: "",
  telefono: "",
  direccion: "",
  tipoEntrega: "domicilio",
  observaciones: ""
});

const finalizarPedido = () => {

  console.log(formulario.value);

  alert("Pedido finalizado");
};
</script>

<template>

  <section class="checkout">

    <h2>Finalizar Pedido</h2>

    <form
      class="formulario"
      @submit.prevent="finalizarPedido"
    >

      <div class="campo">

        <label>Nombre</label>

        <input
          v-model="formulario.nombre"
          type="text"
          required
        />

      </div>

      <div class="campo">

        <label>Teléfono</label>

        <input
          v-model="formulario.telefono"
          type="tel"
          required
        />

      </div>

      <div class="campo">

        <label>Dirección</label>

        <input
          v-model="formulario.direccion"
          type="text"
          required
        />

      </div>

      <div class="campo">

        <label>Tipo de entrega</label>

        <select v-model="formulario.tipoEntrega">

          <option value="domicilio">
            A domicilio
          </option>

          <option value="recoger">
            Recoger en tienda
          </option>

        </select>

      </div>

      <div class="campo">

        <label>Observaciones</label>

        <textarea
          v-model="formulario.observaciones"
          rows="4"
        ></textarea>

      </div>

      <button type="submit">
        Finalizar Pedido
      </button>

    </form>

  </section>

</template>

<style scoped>

.checkout {
  max-width: 500px;
  margin: 40px auto;
  padding: 24px;
  border-radius: 12px;
  background: #f4f4f4;
}

.formulario {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.campo {
  display: flex;
  flex-direction: column;
}

input,
select,
textarea {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

button {
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

</style>