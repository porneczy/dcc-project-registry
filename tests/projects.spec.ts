import { beforeEach, describe, expect, it } from 'vitest'
import { useProjectStorage } from '~/composables/useProjectStorage'

describe('useProjectStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns an empty array when no projects are stored', () => {
    const { loadProjects } = useProjectStorage()

    expect(loadProjects()).toEqual([])
  })

  it('saves and loads projects from localStorage', () => {
    const { loadProjects, saveProjects } = useProjectStorage()

    const projects = [
      {
        id: '1',
        name: 'Test project',
        description: 'A test project description',
        startDate: '2026-08-15',
        budget: 100000,
      },
    ]

    saveProjects(projects)

    expect(loadProjects()).toEqual(projects)
  })

  it('returns an empty array when stored data is invalid', () => {
    localStorage.setItem(
      'dcc-project-registry:projects',
      'invalid json',
    )

    const { loadProjects } = useProjectStorage()

    expect(loadProjects()).toEqual([])
  })
})
