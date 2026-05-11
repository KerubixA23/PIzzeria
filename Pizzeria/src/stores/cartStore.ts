import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Pizza } from '../services/pizzaService'

export const useCartStore = defineStore('cart', () => {
  const items = ref<Pizza[]>([])

  const total = computed(() => {
    return items.value.reduce((sum, pizza) => sum + pizza.precioTotal, 0)
  })

  const cantidadItems = computed(() => items.value.length)

  function agregarAlCarrito(pizza: Pizza) {
    items.value.push(pizza)
  }

  function removerDelCarrito(id: string) {
    items.value = items.value.filter(pizza => pizza.id !== id)
  }

  function vaciarCarrito() {
    items.value = []
  }

  function obtenerItems() {
    return items.value
  }

  return {
    items,
    total,
    cantidadItems,
    agregarAlCarrito,
    removerDelCarrito,
    vaciarCarrito,
    obtenerItems
  }
})
