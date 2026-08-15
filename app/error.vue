<script setup lang="ts">
defineProps<{
  error: {
    statusCode?: number
    statusMessage?: string
    message?: string
  }
}>()

const handleBackToProjects = () => {
  clearError({
    redirect: '/projects',
  })
}
</script>

<template>
  <main class="flex min-h-screen items-center justify-center px-4">
    <div class="text-center">
      <p class="text-6xl font-bold">
        {{ error.statusCode || 500 }}
      </p>

      <h1 class="mt-4 text-2xl font-semibold">
        {{ error.statusCode === 404
          ? 'Az oldal vagy projekt nem található'
          : 'Hiba történt' }}
      </h1>

      <p class="mt-2 text-muted-foreground">
        A keresett tartalom nem érhető el.
      </p>

      <Button
        class="mt-6"
        @click="handleBackToProjects"
      >
        Vissza a projektekhez
      </Button>
    </div>
  </main>
</template>
