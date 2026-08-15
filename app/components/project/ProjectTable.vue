<script setup lang="ts">
import { toast } from 'vue-sonner'
import type { Project } from '~/types/project'
import { formatCurrency } from '~/utils/formatCurrency'
import { formatDate } from '~/utils/formatDate'

defineProps<{
  projects: Project[]
}>()

const { deleteProject } = useProjects()

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
    toast.error('A projekt törlése sikertelen.')
    return
  }

  toast.success(`A „${projectName}” projekt törölve.`)

  projectToDelete.value = undefined
  isDeleteDialogOpen.value = false
}
</script>

<template>
  <div class="overflow-x-auto rounded-lg border">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Projekt</TableHead>
          <TableHead>Leírás</TableHead>
          <TableHead>Kezdési dátum</TableHead>
          <TableHead>Költségvetés</TableHead>
          <TableHead class="text-right">
            Műveletek
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow
          v-for="project in projects"
          :key="project.id"
        >
          <TableCell class="font-medium">
            {{ project.name }}
          </TableCell>

          <TableCell>
            {{ project.description }}
          </TableCell>

          <TableCell>
            {{ formatDate(project.startDate) }}
          </TableCell>

          <TableCell>
            {{ formatCurrency(project.budget) }}
          </TableCell>

          <TableCell class="text-right">
            <div class="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                as-child
              >
                <NuxtLink :to="`/projects/${project.id}/edit`">
                  Szerkesztés
                </NuxtLink>
              </Button>

              <Button
                variant="destructive"
                size="sm"
                @click="openDeleteDialog(project)"
              >
                Törlés
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
