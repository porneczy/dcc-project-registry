import { defineStore } from 'pinia'
import type { Project } from '~/types/project'

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<Project[]>([])

  const { loadProjects, saveProjects } = useProjectStorage()

  const initialize = () => {
    projects.value = loadProjects()
  }

  const addProject = (project: Project) => {
    projects.value.push(project)
    saveProjects(projects.value)
  }

  const updateProject = (project: Project) => {
    const index = projects.value.findIndex(
      existingProject => existingProject.id === project.id,
    )

    if (index === -1) {
      return false
    }

    projects.value[index] = project
    saveProjects(projects.value)

    return true
  }

  const deleteProject = (id: string) => {
    const initialLength = projects.value.length

    projects.value = projects.value.filter(
      project => project.id !== id,
    )

    if (projects.value.length === initialLength) {
      return false
    }

    saveProjects(projects.value)

    return true
  }

  const getProjectById = (id: string) => {
    return projects.value.find(project => project.id === id)
  }

  return {
    projects,
    initialize,
    addProject,
    updateProject,
    deleteProject,
    getProjectById,
  }
})
