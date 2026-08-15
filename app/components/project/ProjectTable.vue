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
            <Button
              variant="outline"
              size="sm"
              as-child
            >
              <NuxtLink :to="`/projects/${project.id}/edit`">
                Szerkesztés
              </NuxtLink>
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
