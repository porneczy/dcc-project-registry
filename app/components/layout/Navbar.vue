<script setup lang="ts">
const route = useRoute()

const isActive = (path: string) => {
  if (path === '/projects') {
    return route.path === '/projects'
      || route.path.endsWith('/edit')
  }

  return route.path === path
}
</script>

<template>
  <header class="border-b">
    <nav class="container mx-auto flex items-center justify-between px-4 py-4">
      <NuxtLink
        to="/projects"
        class="text-lg font-semibold"
      >
        DCC Project Registry
      </NuxtLink>

      <div class="flex items-center gap-2">
        <Button
          :variant="isActive('/projects') ? 'default' : 'ghost'"
          as-child
        >
          <NuxtLink to="/projects">
            Projektek listája
          </NuxtLink>
        </Button>

        <Button
          :variant="isActive('/projects/new') ? 'default' : 'ghost'"
          as-child
        >
          <NuxtLink to="/projects/new">
            Új projekt
          </NuxtLink>
        </Button>
      </div>
    </nav>
  </header>
</template>
