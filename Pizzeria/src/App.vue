<script setup lang="ts">
import AppHeader from './components/layout/AppHeader.vue'
import CartSidebar from './components/cart/CartSidebar.vue'
import ToastNotice from './components/ui/ToastNotice.vue'
</script>

<template>
  <AppHeader />
  <router-view />
  <CartSidebar />
  <ToastNotice />
</template>