# DCC Project Registry

A responsive project management application built with Nuxt 4, Vue 3 and TypeScript.

The application allows users to create, edit, delete and search projects. Project data is persisted in the browser using `localStorage`.

## Features

- Create, edit and delete projects
- Delete confirmation dialog
- Search projects by name and description
- Client-side form validation with Vuelidate
- Success and error toast notifications
- Responsive project list with table view on desktop and card view on mobile
- Responsive navigation
- Accessible icon-based action buttons
- shadcn-vue UI components
- Date picker with configurable date range
- Client-side persistence using `localStorage`
- Docker support
- Unit and component tests with Vitest

## Tech Stack

- Nuxt 4
- Vue 3
- TypeScript
- Pinia
- Vuelidate
- shadcn-vue
- Tailwind CSS
- Reka UI
- Lucide
- Vue Sonner
- Vitest
- Vue Test Utils
- jsdom
- Docker

## Getting Started

### Requirements

- Node.js 20+
- npm
- Docker (optional)

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Production Build

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Testing

Run the test suite with:

```bash
npm run test
```

The current test suite contains 14 tests covering project storage, project management logic and project form validation.

The tests cover:

- Loading, saving and invalid data handling in `localStorage`
- Creating, updating and deleting projects
- Finding projects by ID
- Handling non-existent projects
- Required form fields
- Project name and description length validation
- Budget validation

Tests run in a jsdom environment using Vitest and Vue Test Utils.

## Docker

The project includes a Dockerfile for running the application in a container.

Build the image:

```bash
docker build -t dcc-project-registry .
```

Run the container:

```bash
docker run --rm -p 3000:3000 dcc-project-registry
```

The application will then be available at `http://localhost:3000`.

The Docker image is based on `node:20-alpine`.

## Project Structure

```text
dcc-project-registry/
├── app/
│   ├── assets/
│   │   └── css/
│   ├── components/
│   │   ├── layout/
│   │   ├── project/
│   │   └── ui/
│   ├── composables/
│   ├── lib/
│   ├── pages/
│   ├── stores/
│   ├── types/
│   └── utils/
├── tests/
│   ├── ProjectForm.spec.ts
│   ├── projects.spec.ts
│   └── useProjects.spec.ts
├── .dockerignore
├── Dockerfile
├── components.json
├── nuxt.config.ts
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

## Architecture

The application uses a lightweight layered structure.

### Components

Project-specific components are located in `app/components/project/`:

- `ProjectForm.vue` — project creation and editing form
- `ProjectSearch.vue` — project search
- `ProjectTable.vue` — responsive project listing

Reusable UI components are located in `app/components/ui/`.

### Composables

Reusable application logic is located in `app/composables/`.

`useProjects.ts` provides the main project management API:

- `createProject()`
- `updateProject()`
- `deleteProject()`
- `getProjectById()`

`useProjectStorage.ts` handles loading and saving projects to `localStorage`.

### State Management

Project state is managed with Pinia in `app/stores/projects.ts`.

The store is responsible for:

- Maintaining the project list
- Adding projects
- Updating projects
- Deleting projects
- Finding projects by ID
- Initializing state from persistent storage

### Pages

Application routes are located in `app/pages/`:

- `/projects` — project list and search
- `/projects/new` — create a new project
- `/projects/:id/edit` — edit an existing project

## Data Model

Projects use the following structure:

```ts
interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  budget: number;
}
```

Project IDs are generated using `crypto.randomUUID()`.

## Persistence

Project data is stored client-side using browser `localStorage`.

The application uses the following storage key:

```text
dcc-project-registry:projects
```

If no data exists, the application starts with an empty project list.

Invalid stored JSON is handled safely and results in an empty project list.

## Validation

Project forms use Vuelidate for client-side validation.

| Field        | Validation                      |
| ------------ | ------------------------------- |
| Project name | Required, minimum 3 characters  |
| Description  | Required, minimum 10 characters |
| Start date   | Required                        |
| Budget       | Required, minimum 1 Ft          |

## Responsive Design

The project list uses different layouts depending on the viewport.

On desktop, projects are displayed in a table containing the project name, description, start date, budget and actions.

On mobile, projects are displayed as cards containing the same information with icon-based edit and delete actions.

The navigation also adapts to smaller screen sizes.

## Available Scripts

| Command            | Description                   |
| ------------------ | ----------------------------- |
| `npm run dev`      | Start the development server  |
| `npm run build`    | Create a production build     |
| `npm run preview`  | Preview the production build  |
| `npm run generate` | Generate a static application |
| `npm run test`     | Run the Vitest test suite     |

## Development Workflow

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Before committing changes, run:

```bash
npm run test
npm run build
```

To verify the Docker image:

```bash
docker build -t dcc-project-registry .
docker run --rm -p 3000:3000 dcc-project-registry
```

## License

This project was created as a technical assessment project.
