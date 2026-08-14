<script setup lang="ts">
import type { Project } from '~/types/project'
import { formatCurrency } from '~/utils/formatCurrency'
import { formatDate } from '~/utils/formatDate'

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
            {{ formatDate(project.startDate) }}
          </TableCell>

          <TableCell>
            {{ formatCurrency(project.budget) }}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
