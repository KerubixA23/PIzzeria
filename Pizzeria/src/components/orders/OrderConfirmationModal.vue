<script setup lang="ts">

const props = defineProps<{
  isOpen: boolean;

  cartItems: {
    id: number;
    name: string;
    quantity: number;
    price: number;
  }[];

  customer: {
    name: string;
    phone: string;
    address: string;
  };

  deliveryType: string;

  total: number;
}>();

const emit = defineEmits(["close"]);

</script>

<template>

  <div
    v-if="props.isOpen"
    class="overlay"
  >

    <div class="modal">

      <h2 class="title">
        Confirmar Pedido
      </h2>

      <h3>
        Productos
      </h3>

      <div
        v-for="item in props.cartItems"
        :key="item.id"
        class="product"
      >

        <p>
          {{ item.name }} x{{ item.quantity }}
        </p>

        <p>
          Q{{ item.price * item.quantity }}
        </p>

      </div>

      <h3>
        Cliente
      </h3>

      <div class="customer">

        <p>
          {{ props.customer.name }}
        </p>

        <p>
          {{ props.customer.phone }}
        </p>

        <p>
          {{ props.customer.address }}
        </p>

      </div>

      <h3>
        Tipo de entrega
      </h3>

      <p>
        {{ props.deliveryType }}
      </p>

      <h2 class="total">
        Total: Q{{ props.total }}
      </h2>

      <button
        class="button"
        @click="emit('close')"
      >
        Confirmar
      </button>

    </div>

  </div>

</template>

<style scoped>

.overlay {
  position: fixed;
  inset: 0;

  background: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 1000;
}

.modal {
  background: white;

  width: 400px;
  max-width: 90%;

  padding: 24px;

  border-radius: 12px;

  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.title {
  margin-bottom: 20px;
}

.product {
  display: flex;
  justify-content: space-between;

  margin-bottom: 10px;
  padding-bottom: 8px;

  border-bottom: 1px solid #ddd;
}

.customer {
  margin-bottom: 20px;
}

.total {
  margin-top: 20px;
}

.button {
  width: 100%;

  margin-top: 20px;

  padding: 12px;

  border: none;
  border-radius: 8px;

  background: black;
  color: white;

  cursor: pointer;
}

.button:hover {
  opacity: 0.9;
}

</style>