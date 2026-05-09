import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
    isOpen: false
  }),

  getters: {
    subtotal: (state) =>
      state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),

    total: (state) =>
      state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  },

  actions: {

    openCart() {
      this.isOpen = true;
    },

    closeCart() {
      this.isOpen = false;
    },

    addItem(item) {
      const existing = this.items.find(i => i.id === item.id);

      if (existing) {
        existing.quantity++;
      } else {
        this.items.push({ ...item, quantity: 1 });
      }

      this.openCart();
    },

    increase(id) {
      const item = this.items.find(i => i.id === id);
      if (item) item.quantity++;
    },

    decrease(id) {
      const item = this.items.find(i => i.id === id);
      if (item && item.quantity > 1) item.quantity--;
    },

    removeItem(id) {
      this.items = this.items.filter(i => i.id !== id);
    },

    clearCart() {
      this.items = [];
    }
  }
});