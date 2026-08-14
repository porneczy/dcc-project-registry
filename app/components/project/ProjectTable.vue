<script setup lang="ts">
import type { Project } from '~/types/project'

defineProps<{
  projects: Project[]
}>()
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
            {{ project.startDate }}
          </TableCell>

          <TableCell>
            {{ project.budget }}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
