import type { Project } from '~/types/project'

const STORAGE_KEY = 'dcc-project-registry:projects'

export const useProjectStorage = () => {
  const loadProjects = (): Project[] => {
    if (!import.meta.client) {
      return []
    }

    const storedProjects = localStorage.getItem(STORAGE_KEY)

    if (!storedProjects) {
      return []
    }

    try {
      return JSON.parse(storedProjects) as Project[]
    } catch {
      return []
    }
  }

  const saveProjects = (projects: Project[]): void => {
    if (!import.meta.client) {
      return
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
  }

  return {
    loadProjects,
    saveProjects,
  }
}
