import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { CartItem } from '../types/pizza'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const isOpen = ref(false)

  const toastVisible = ref(false)
  const toastTitle = ref('')
  const toastPrice = ref(0)

  let toastTimeout: ReturnType<typeof setTimeout> | null = null

  const subtotal = computed(() =>
    items.value.reduce((acumulado, item) => acumulado + item.precio, 0),
  )

  const cantidadItems = computed(() => items.value.length)

  function openCart(): void {
    isOpen.value = true
  }

  function closeCart(): void {
    isOpen.value = false
  }

  function showToast(item: CartItem): void {
    toastTitle.value = item.personalizada
      ? 'Pizza personalizada agregada al carrito!'
      : `${item.nombre} agregada al carrito!`

    toastPrice.value = item.precio
    toastVisible.value = true

    if (toastTimeout) {
      clearTimeout(toastTimeout)
    }

    toastTimeout = setTimeout(() => {
      toastVisible.value = false
    }, 2500)
  }

  function addItem(item: CartItem): void {
    items.value.push(item)
    showToast(item)
  }

  function removeItem(index: number): void {
    items.value.splice(index, 1)
  }

  function clearCart(): void {
    items.value = []
  }

  function confirmarPedido(): void {
    if (!items.value.length) return
    window.alert('Pedido confirmado de forma local. Luego aquí se conecta con el endpoint.')
  }

  function pedirDomicilio(): void {
    if (!items.value.length) return
    window.alert('Pedido a domicilio registrado de forma local. Luego aquí se conecta con el endpoint.')
  }

  return {
    items,
    isOpen,
    toastVisible,
    toastTitle,
    toastPrice,
    subtotal,
    cantidadItems,
    openCart,
    closeCart,
    addItem,
    removeItem,
    clearCart,
    confirmarPedido,
    pedirDomicilio,
  }
})