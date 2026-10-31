# Muhammad Ahmed Portfolio

A minimal, Material-inspired portfolio built with React 19, TypeScript, and Vite. The interface uses a restrained blue palette, soft surfaces, responsive layouts, and light/dark themes.

## Development

- `npm install`
- `npm run dev`
- `npm run build` runs TypeScript validation and builds the production site.
- `npm run preview` serves the production build.

The existing Vercel deployment remains the canonical site. Local development does not publish changes.

## Content

- `src/data/profile.ts`: identity, contact details, and public profiles.
- `src/data/portfolioSections.ts`: projects, experience, publications, education, and skills.
- `public/resume/resume.pdf`: the current résumé download.
- `public/social-card.svg`: editable source for the 1200 × 630 social preview.
- `src/components/ProjectGallery.tsx`: filterable project cards.
- `src/components/ProjectVisual.tsx`: static SVG diagrams for the six project workflows.
- `src/components/ProjectDialog.tsx`: native project detail dialogs.

Project cards support category filtering and native accessible detail dialogs. Experience entries expand independently. Publication records link to their DOI and support citation copying. Contact uses direct email links and clipboard copying, with a visible fallback when clipboard access is unavailable.

## Hero portrait

The introduction is paired with the original rounded portrait, a yellow sparkle accent, and the caption “A little curiosity. A lot of building.” The layout adapts to light and dark themes and mobile screens. The hero has no 3D renderer or animation controls.

## Project visuals

Project covers use static, flat SVG diagrams in the portfolio’s blue, green, yellow, and purple palette. Each diagram explains its project’s workflow: dependency resolution, motion signals, vectorized edge detection, listing risk assessment, image reconstruction, or print queues. The same diagrams appear in project details. They illustrate structure and processing, rather than presenting measured results. Project previews have no animation, WebGL renderer, or playback controls.

Publication paper stacks and education-card depth use CSS, with pointer motion disabled for reduced-motion preferences and touch devices.
