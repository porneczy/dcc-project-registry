<script setup lang="ts">
const router = useRouter()
const { createProject } = useProjects()

const handleSubmit = (projectData: {
  name: string
  description: string
  startDate: string
  budget: number
}) => {
  createProject(projectData)
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
        Új projekt
      </h1>

      <p class="mt-2 text-muted-foreground">
        Hozz létre egy új projektet.
      </p>
    </div>

    <ProjectForm
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
  </main>
</template>
