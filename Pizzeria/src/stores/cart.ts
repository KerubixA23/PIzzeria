import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  const items = ref<{ name: string; ingredients: string[]; price: number }[]>([])

  function addItem(item: { name: string; ingredients: string[]; price: number }) {
    items.value.push(item)
  }

  const total = computed(() => items.value.reduce((sum, item) => sum + item.price, 0))

  return { items, addItem, total }
})
