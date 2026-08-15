<script setup lang="ts">
import type { Project } from '~/types/project'

const route = useRoute()
const router = useRouter()

const {
  getProjectById,
  updateProject,
  initialize,
} = useProjects()

const { showSuccess, showError } = useProjectFeedback()

const project = ref<Project>()
const isLoading = ref(true)

onMounted(() => {
  initialize()

  const projectId = route.params.id as string
  project.value = getProjectById(projectId)

  if (!project.value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Projekt nem található',
    })
  }

  isLoading.value = false
})

const handleSubmit = (projectData: Omit<Project, 'id'>) => {
  if (!project.value) {
    return
  }

  const updated = updateProject({
    id: project.value.id,
    ...projectData,
  })

  if (!updated) {
    showError('A projekt módosítása sikertelen.')
    return
  }

  showSuccess(`A „${projectData.name}” projekt módosítva.`)

  router.push('/projects')
}

const handleCancel = () => {
  router.push('/projects')
}
</script>

<template>
  <main class="container mx-auto max-w-2xl px-4 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-semibold tracking-tight">
        Projekt szerkesztése
      </h1>

      <p class="mt-2 text-muted-foreground">
        Módosítsd a projekt adatait.
      </p>
    </div>

    <div
      v-if="isLoading"
      class="rounded-lg border p-12 text-center"
    >
      <p class="text-sm text-muted-foreground">
        Projekt betöltése...
      </p>
    </div>

    <ProjectForm
      v-else-if="project"
      :initial-values="project"
      submit-label="Projekt mentése"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
  </main>
</template>
