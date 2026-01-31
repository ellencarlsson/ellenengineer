# Create Project

Generates a blank project template for the portfolio site. Project data lives in two files that both need updating.

## Usage

```
/create-project
```

## How it works

When invoked, Claude will:

1. Ask for the project details:
   - **Project ID** (format: `name-year`, e.g. `myapp-2025`)
   - **Project name**
   - **Year**
   - **Short description** (1 sentence, for the network page)
   - **Long description** (for the README section)
   - **Platform** (e.g. Webb, Apple Watch, iOS)
   - **Tech stack** (comma-separated)
   - **GitHub URL**
   - **Demo URL** (optional)
   - **Thesis URL** (optional)

2. Generate and insert the project data into both files:

### File 1: `src/pages/Projects/Projects.js`
Add to the `projects` array:
```js
{
  id: '{id}',
  name: '{name}',
  year: '{year}',
  platform: '{platform}',
  tech: '{main-tech}',
  description: '{short-description}',
  shortDescription: '{short-description}',
  techStack: ['{tech1}', '{tech2}'],
  github: '{github-url}',
  demo: '{demo-url}',          // null if none
  position: { x: 50, y: 50 },  // user should adjust
  connectedTo: null             // user should set
}
```

### File 2: `src/pages/ProjectDetail/ProjectDetail.js`
Add to the `projects` object:
```js
'{id}': {
  id: '{id}',
  model: 'GENERIC MODEL',
  label: '{LABEL}',
  name: '{name}',
  year: '{year}',
  capacity: '1.0 GB',
  interface: 'SATA',
  status: 'OPERATIONAL',
  ledColor: 'brown',
  description: '{long-description}',
  techStack: ['{tech1}', '{tech2}'],
  github: '{github-url}',
  demo: null,                   // or demo URL
  thesis: null,                 // or thesis URL
  image: null,
  demoVideo: null,              // YouTube embed URL if available
  resultText: '{result-text}',
  hasWorkflow: true,
  workflow: [
    {
      step: 1,
      icon: '🔧',
      title: 'STEP TITLE',
      description: 'Vad som händer',
      details: 'Teknisk detalj',
      ledColor: 'blue'
    },
    {
      step: 2,
      icon: '⚙️',
      title: 'STEP TITLE',
      description: 'Vad som händer',
      details: 'Teknisk detalj',
      ledColor: 'green'
    },
    {
      step: 3,
      icon: '✅',
      title: 'STEP TITLE',
      description: 'Vad som händer',
      details: 'Teknisk detalj',
      ledColor: 'green'
    }
  ]
}
```

## Important

- The `position` in Projects.js controls where the node appears in the network view. Values are percentages (x: 0-100, y: 0-100). Remind user to adjust.
- The `connectedTo` field should reference another project's `id` to draw a connection line. Update existing projects' `connectedTo` if needed to link to the new one.
- The workflow steps should be customized to describe the actual architecture. Ask the user about the project's flow.
- `ledColor` options: `brown`, `medium`, `burgundy`
- After inserting, run the dev server to verify it compiles.
