<script setup lang="ts">
import { ref } from "vue";
import OrderConfirmationModal from "./OrderConfirmationModal.vue";

const showConfirmation = ref(false);

const formulario = ref({
  nombre: "",
  telefono: "",
  direccion: "",
  tipoEntrega: "domicilio",
  observaciones: ""
});

const cartItems = [
  {
    id: 1,
    name: "Pizza Familiar",
    quantity: 2,
    price: 80,
  },

  {
    id: 2,
    name: "Coca Cola",
    quantity: 1,
    price: 15,
  },
];

const total = 175;

const finalizarPedido = () => {

  showConfirmation.value = true;

};

const cerrarModal = () => {

  showConfirmation.value = false;

};
</script>

<template>

  <section class="checkout">

    <h2>
      Finalizar Pedido
    </h2>

    <form
      class="formulario"
      @submit.prevent="finalizarPedido"
    >

      <div class="campo">

        <label>
          Nombre
        </label>

        <input
          v-model="formulario.nombre"
          type="text"
          required
        />

      </div>

      <div class="campo">

        <label>
          Teléfono
        </label>

        <input
          v-model="formulario.telefono"
          type="tel"
          required
        />

      </div>

      <div class="campo">

        <label>
          Dirección
        </label>

        <input
          v-model="formulario.direccion"
          type="text"
          required
        />

      </div>

      <div class="campo">

        <label>
          Tipo de entrega
        </label>

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

        <label>
          Observaciones
        </label>

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

  <OrderConfirmationModal
    :isOpen="showConfirmation"

    :cartItems="cartItems"

    :customer="{
      name: formulario.nombre,
      phone: formulario.telefono,
      address: formulario.direccion
    }"

    :deliveryType="formulario.tipoEntrega"

    :total="total"

    @close="cerrarModal"
  />

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

  background: black;

  color: white;
}

button:hover {
  opacity: 0.9;
}

</style>