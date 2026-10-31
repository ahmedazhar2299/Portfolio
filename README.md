# Muhammad Ahmed Portfolio

A minimal, Material-inspired portfolio built with React 19, TypeScript, Vite, and Framer Motion. The interface uses a restrained blue palette, soft surfaces, responsive layouts, and light/dark themes.

## Development

- `npm install`
- `npm run dev`
- `npm run build` runs TypeScript validation and builds the production site.
- `npm run preview` serves the production build.

The existing Vercel deployment remains the canonical site. Local development does not publish changes.

## Content

- `src/data/profile.ts`: identity, contact details, and public profiles.
- `src/data/portfolioSections.ts`: projects, experience, publications, education, and skills.
- `public/resume/resume.pdf`: the supplied October 2026 résumé.
- `public/social-card.svg`: editable source for the 1200 × 630 social preview.
- `src/components/PortfolioGuideBot.tsx`: the original SVG Orbit companion, with current facts and navigation.

Project cards support category filtering and native accessible detail dialogs. Experience entries expand independently. Publication records link to their DOI and support citation copying. Contact uses direct email links and clipboard copying, with a visible fallback when clipboard access is unavailable.

## Sources reviewed

Content was reconciled on October 31, 2026. The supplied `Ahmed_SDE_Resume.pdf` is the primary source for employment dates, achievements, project measurements, and education. Public repositories provide implementation details.

| Source | Use and limitations |
| --- | --- |
| [GitHub profile](https://github.com/ahmedazhar2299) and public repositories | Reviewed the repository inventory and READMEs for MyWalkSentinel, CounterfeitGuard, Sobel–Laplacian SIMD, Pix2CT, federated learning, FFT-SIMD, and Campaign_Manager. Forks are not presented as original work. |
| [LinkedIn](https://www.linkedin.com/in/ahmedazhar2299/) | Reviewed publicly indexed profile content. Direct access is restricted. Activity liked by the profile owner is not treated as their own employment or achievement. |
| [Google Scholar](https://scholar.google.com/citations?user=I05_ZfIAAAAJ) | Profile URL verified from the résumé. Profile contents are access-limited and are not represented as independently reviewed. |
| [LLM code generation paper](https://doi.org/10.1109/COMPSAC69091.2026.00285) | Title, authorship, publication date, and pages verified against the Crossref DOI record. |
| [AURA paper](https://doi.org/10.1109/COMPSAC69091.2026.00490) | Full published title, authorship, publication date, and pages verified against the Crossref DOI record. |

## Content decisions

- Updated Paismo figures to more than 30 enterprise organizations and 40% lower query latency, replacing older claims.
- Added the CSULB CECM Lab appointment, current Chapman work, publications, scholarship, and hackathon award.
- The dependency resolver and RoboInk have complete project summaries without invented public repository links.
- Clinical ICC values are described as agreement/reliability measures. Research prototypes are not described as clinically validated products.
- The World Physiotherapy Congress 2027 entry is separated from published papers and labeled upcoming. No acceptance or presentation status is inferred.
- SIMD speedup and other résumé-reported measurements retain their workload context.
- No live GitHub API or third-party profile scraping runs in visitors’ browsers.
