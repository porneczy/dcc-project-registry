import { storeToRefs } from 'pinia'
import type { Project } from '~/types/project'

export const useProjects = () => {
  const projectsStore = useProjectsStore()
  const { projects } = storeToRefs(projectsStore)

  const initialize = () => {
    projectsStore.initialize()
  }

  const createProject = (
    projectData: Omit<Project, 'id'>,
  ): Project => {
    const project: Project = {
      id: crypto.randomUUID(),
      ...projectData,
    }

    projectsStore.addProject(project)

    return project
  }

  const updateProject = (project: Project): boolean => {
    return projectsStore.updateProject(project)
  }

  const deleteProject = (id: string): boolean => {
    return projectsStore.deleteProject(id)
  }

  const getProjectById = (id: string): Project | undefined => {
    return projectsStore.getProjectById(id)
  }

  return {
    projects,
    initialize,
    createProject,
    updateProject,
    deleteProject,
    getProjectById,
  }
}
