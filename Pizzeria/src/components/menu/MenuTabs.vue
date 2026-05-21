<script setup lang="ts">
type MenuTab = 'menu' | 'personalizar' | 'bebidas'

const props = defineProps<{
  modelValue: MenuTab
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: MenuTab): void
}>()

const tabs: { label: string; value: MenuTab }[] = [
  { label: 'Menú', value: 'menu' },
  { label: 'Personalizar', value: 'personalizar' },
  { label: 'Bebidas', value: 'bebidas' },
]

function selectTab(tab: MenuTab): void {
  emit('update:modelValue', tab)
}
</script>

<template>
  <div class="tabs">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      class="tab"
      :class="{ active: props.modelValue === tab.value }"
      @click="selectTab(tab.value)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<style scoped>
.tabs {
  max-width: 760px;
  background: #e7e5e4;
  border-radius: 999px;
  padding: 8px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.tab {
  border: none;
  background: transparent;
  color: #111827;
  padding: 14px;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 700;
  font-size: 1rem;
  transition: 0.2s ease;
}

.tab.active {
  background: #ffffff;
}

@media (max-width: 768px) {
  .tabs {
    grid-template-columns: 1fr;
    border-radius: 22px;
  }
}
</style>