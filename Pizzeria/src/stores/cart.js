import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
    isOpen: false
  }),
  actions: {
    openCart() {
      this.isOpen = true;
    },
    closeCart() {
      this.isOpen = false;
    },
    addItem(item) {
      this.items.push(item);
      this.openCart();
    }
  }
});