<script setup lang="ts">
import 'vue-sonner/style.css'
import { Toaster } from '~/components/ui/sonner'
import Navbar from '~/components/layout/Navbar.vue'
</script>

<template>
  <Navbar />

  <NuxtPage />

  <Toaster
    position="top-center"
    :duration="3000"
    :toast-options="{
      style: {
        background: 'var(--primary)',
        color: 'var(--primary-foreground)',
        border: '1px solid var(--border)',
      },
    }"
  />
</template>
