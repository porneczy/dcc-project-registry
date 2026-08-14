<script setup lang="ts">
const { projects, initialize } = useProjects()

onMounted(() => {
  initialize()
})
</script>

<template>
  <main class="container mx-auto px-4 py-8">
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-semibold tracking-tight">
          Projektek
        </h1>

        <p class="mt-2 text-muted-foreground">
          A projektjeid áttekintése.
        </p>
      </div>

      <Button>
        Új projekt
      </Button>
    </div>

    <div
      v-if="projects.length === 0"
      class="rounded-lg border border-dashed p-12 text-center"
    >
      <h2 class="text-lg font-medium">
        Még nincs projekt
      </h2>

      <p class="mt-2 text-sm text-muted-foreground">
        Hozd létre az első projektedet.
      </p>

      <Button class="mt-6">
        Projekt létrehozása
      </Button>
    </div>

    <ProjectTable
      v-else
      :projects="projects"
    />
  </main>
</template>
