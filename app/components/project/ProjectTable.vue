<script setup lang="ts">
import type { Project } from '~/types/project'
import { formatCurrency } from '~/utils/formatCurrency'
import { formatDate } from '~/utils/formatDate'
import { Pencil, Trash2 } from '@lucide/vue'

defineProps<{
  projects: Project[]
}>()

const { deleteProject } = useProjects()
const { showSuccess, showError } = useProjectFeedback()

const isDeleteDialogOpen = ref(false)
const projectToDelete = ref<Project>()

const openDeleteDialog = (project: Project) => {
  projectToDelete.value = project
  isDeleteDialogOpen.value = true
}

const handleDelete = () => {
  if (!projectToDelete.value) {
    return
  }

  const projectName = projectToDelete.value.name
  const deleted = deleteProject(projectToDelete.value.id)

  if (!deleted) {
    showError('A projekt törlése sikertelen.')
    return
  }

  showSuccess(`A „${projectName}” projekt törölve.`)

  projectToDelete.value = undefined
  isDeleteDialogOpen.value = false
}
</script>

<template>
  <div class="space-y-4 md:hidden">
    <Card
      v-for="project in projects"
      :key="project.id"
    >
      <CardHeader>
        <CardTitle class="wrap-break-word">{{ project.name }}</CardTitle>
        <CardDescription class="wrap-break-word">
          {{ project.description }}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-sm text-muted-foreground">
              Kezdési dátum
            </p>
            <p class="font-medium">
              {{ formatDate(project.startDate) }}
            </p>
          </div>

          <div>
            <p class="text-sm text-muted-foreground">
              Költségvetés
            </p>
            <p class="min-w-0 break-all font-medium">
              {{ formatCurrency(project.budget) }}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter class="gap-2">
        <Button
          class="flex-1"
          variant="outline"
          aria-label="Projekt szerkesztése"
          as-child
        >
          <NuxtLink :to="`/projects/${project.id}/edit`">
            <Pencil />
          </NuxtLink>
        </Button>

        <Button
          class="flex-1"
          variant="destructive"
          aria-label="Projekt törlése"
          @click="openDeleteDialog(project)"
        >
          <Trash2 />
        </Button>
      </CardFooter>
    </Card>
  </div>

  <div class="hidden rounded-lg border md:block">
    <Table class="w-full table-fixed">
      <TableHeader>
        <TableRow>
          <TableHead class="w-[20%]">Projekt</TableHead>
          <TableHead class="w-[40%]">Leírás</TableHead>
          <TableHead class="w-[15%]">Kezdési dátum</TableHead>
          <TableHead class="w-[10%]">Költségvetés</TableHead>
          <TableHead class="w-[15%] text-right">
            Műveletek
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow
          v-for="project in projects"
          :key="project.id"
        >
          <TableCell class="whitespace-normal wrap-break-word font-medium">
            {{ project.name }}
          </TableCell>

          <TableCell class="whitespace-normal wrap-break-word">
            {{ project.description }}
          </TableCell>

          <TableCell class="whitespace-nowrap">
            {{ formatDate(project.startDate) }}
          </TableCell>

          <TableCell class="whitespace-nowrap">
            <span
              class="block truncate"
              :title="formatCurrency(project.budget)"
            >
              {{ formatCurrency(project.budget) }}
            </span>
          </TableCell>

          <TableCell class="text-right">
            <div class="flex flex-wrap justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                as-child
                aria-label="Projekt szerkesztése"
              >
                <NuxtLink :to="`/projects/${project.id}/edit`">
                  <Pencil />
                </NuxtLink>
              </Button>

              <Button
                variant="destructive"
                size="sm"
                aria-label="Projekt törlése"
                @click="openDeleteDialog(project)"
              >
                <Trash2 />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
  <AlertDialog v-model:open="isDeleteDialogOpen">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Projekt törlése
        </AlertDialogTitle>

        <AlertDialogDescription>
          Biztosan törölni szeretnéd a
          <strong>{{ projectToDelete?.name }}</strong>
          projektet? Ez a művelet nem vonható vissza.
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel>
          Mégse
        </AlertDialogCancel>

        <AlertDialogAction
          class="bg-destructive text-white hover:bg-destructive/90"
          @click="handleDelete"
        >
          Törlés
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
