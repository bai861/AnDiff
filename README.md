# AnDiff

AnDiff is a nanobody humanization workbench for exploring adaptive diffusion-based sequence generation workflows. The interface provides a compact dashboard, model-training view, nanobody generator, CDR/framework mask editor, and analysis panels for reviewing generated candidates.

The current app is a Vite + React frontend with a simulated inference service. It is designed as a deployable web interface that can later be connected to a real AnDiff inference backend.

## Features

- Nanobody Generator with FreeGen and ConstGen modes
- CDR / framework mask editor for locking residues or marking positions for reconstruction
- Candidate generation preview with sequence-level scoring metrics
- Training and analysis screens for model workflow demonstrations
- Responsive single-page application built with React, TypeScript, Vite, Recharts, and Lucide icons

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind-style utility classes
- Recharts
- Lucide React

## Getting Started

### Prerequisites

- Node.js 20 or newer recommended
- npm

### Install Dependencies

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

Vite will print a local development URL, usually:

```text
http://localhost:5173/
```

### Build for Production

```bash
npm run build
```

The production build is written to the `dist` directory.

### Preview the Production Build

```bash
npm run preview
```

## Deployment

AnDiff is a static Vite application, so it can be deployed on common static hosting platforms.

### Netlify

1. Push the project to a GitHub repository.
2. Create a new site in Netlify and import the repository.
3. Use the following build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy the site.

### Vercel

1. Import the GitHub repository into Vercel.
2. Select Vite as the framework preset if Vercel does not detect it automatically.
3. Use the default build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy the project.

### Generic Static Hosting

1. Build the app:

```bash
npm run build
```

2. Upload the contents of the `dist` directory to any static hosting service, CDN bucket, or web server.
3. Configure the server to serve `index.html` for unknown routes if client-side routing is added later.

## Backend Integration

The frontend currently uses a mock backend service in `services/mockBackend.ts`. To connect a production inference service, replace the mock generation logic with API calls to your backend endpoint and update `API_BASE_URL` in `constants.ts`.

## Project Structure

```text
.
├── components/       Shared UI and sequence editor components
├── services/         Mock backend and future API integration layer
├── views/            Dashboard, generator, training, analysis, and documentation views
├── App.tsx           Main application shell
├── constants.ts      App constants and default sequence configuration
├── index.tsx         React entry point
└── vite.config.ts    Vite configuration
```
