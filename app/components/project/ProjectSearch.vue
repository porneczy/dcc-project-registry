<script setup lang="ts">
const model = defineModel<string>({ default: '' })
</script>

<template>
  <div class="w-full max-w-sm">
    <Input
      v-model="model"
      type="search"
      placeholder="Keresés projektek között..."
      aria-label="Projektek keresése"
    />
  </div>
</template>
