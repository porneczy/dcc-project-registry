<script setup lang="ts">
const { projects, initialize } = useProjects()

const isLoading = ref(true)
const searchQuery = ref('')

const filteredProjects = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  if (!query) {
    return projects.value
  }

  return projects.value.filter(project => {
    return (
      project.name.toLowerCase().includes(query)
      || project.description.toLowerCase().includes(query)
    )
  })
})

onMounted(() => {
  initialize()
  isLoading.value = false
})
</script>

<template>
  <main class="container mx-auto px-4 py-8">
    <div class="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
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
      v-if="isLoading"
      class="rounded-lg border p-12 text-center"
    >
      <p class="text-sm text-muted-foreground">
        Projektek betöltése...
      </p>
    </div>

    <div
      v-else-if="projects.length === 0"
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

    <template v-else>
      <div class="mb-6">
        <ProjectSearch v-model="searchQuery" />
      </div>

      <ProjectTable
        v-if="filteredProjects.length > 0"
        :projects="filteredProjects"
      />

      <div
        v-else
        class="rounded-lg border border-dashed p-12 text-center"
      >
        <h2 class="text-lg font-medium">
          Nincs találat
        </h2>

        <p class="mt-2 text-sm text-muted-foreground">
          Próbálj meg más keresési kifejezést.
        </p>
      </div>
    </template>
  </main>
</template>
