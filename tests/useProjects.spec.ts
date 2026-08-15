import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useProjects } from '~/composables/useProjects'

describe('useProjects', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('creates a project', () => {
    const { projects, createProject } = useProjects()

    const project = createProject({
      name: 'Test project',
      description: 'A test project description',
      startDate: '2026-08-15',
      budget: 100000,
    })

    expect(project.id).toEqual(expect.any(String))
    expect(project.name).toBe('Test project')
    expect(projects.value).toContainEqual(project)
  })

  it('updates an existing project', () => {
    const { createProject, updateProject, getProjectById } = useProjects()

    const project = createProject({
      name: 'Test project',
      description: 'A test project description',
      startDate: '2026-08-15',
      budget: 100000,
    })

    const updatedProject = {
      ...project,
      name: 'Updated project',
      budget: 200000,
    }

    expect(updateProject(updatedProject)).toBe(true)
    expect(getProjectById(project.id)).toEqual(updatedProject)
  })

  it('returns false when updating a non-existent project', () => {
    const { updateProject } = useProjects()

    expect(
      updateProject({
        id: 'does-not-exist',
        name: 'Test project',
        description: 'A test project description',
        startDate: '2026-08-15',
        budget: 100000,
      }),
    ).toBe(false)
  })

  it('deletes an existing project', () => {
    const { createProject, deleteProject, getProjectById } = useProjects()

    const project = createProject({
      name: 'Test project',
      description: 'A test project description',
      startDate: '2026-08-15',
      budget: 100000,
    })

    expect(deleteProject(project.id)).toBe(true)
    expect(getProjectById(project.id)).toBeUndefined()
  })

  it('returns false when deleting a non-existent project', () => {
    const { deleteProject } = useProjects()

    expect(deleteProject('does-not-exist')).toBe(false)
  })

  it('returns a project by id', () => {
    const { createProject, getProjectById } = useProjects()

    const project = createProject({
      name: 'Test project',
      description: 'A test project description',
      startDate: '2026-08-15',
      budget: 100000,
    })

    expect(getProjectById(project.id)).toEqual(project)
  })

  it('returns undefined for an unknown id', () => {
    const { getProjectById } = useProjects()

    expect(getProjectById('does-not-exist')).toBeUndefined()
  })
})
