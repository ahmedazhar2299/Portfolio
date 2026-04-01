import { Link, useParams } from "react-router-dom"
import { PageIntro } from "../components/PageIntro"
import { Reveal } from "../components/Reveal"
import { Seo } from "../components/Seo"
import { caseStudies } from "../data/profile"
import { NotFoundPage } from "./NotFoundPage"

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const projectIndex = caseStudies.findIndex((item) => item.slug === slug)

  if (projectIndex === -1) {
    return <NotFoundPage />
  }

  const project = caseStudies[projectIndex]
  const previous = projectIndex > 0 ? caseStudies[projectIndex - 1] : null
  const next = projectIndex < caseStudies.length - 1 ? caseStudies[projectIndex + 1] : null

  return (
    <div className="page">
      <Seo
        title={project.title}
        description={project.summary}
        pathname={`/work/${project.slug}`}
      />

      <PageIntro
        eyebrow={project.category}
        title={project.title}
        lede={project.summary}
      />

      {project.heroImage && (
        <Reveal className="project-hero-image">
          <img src={project.heroImage} alt={`${project.title} preview`} width={1600} height={900} loading="eager" />
        </Reveal>
      )}

      <section className="project-layout">
        <Reveal className="glass-panel project-panel">
          <h2>Challenge</h2>
          <p>{project.challenge}</p>
        </Reveal>

        <Reveal className="glass-panel project-panel" delay={0.05}>
          <h2>Approach</h2>
          <ul>
            {project.approach.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </Reveal>
      </section>

      <Reveal className="glass-panel project-panel">
        <h2>Outcomes</h2>
        <ul>
          {project.outcomes.map((outcome) => (
            <li key={outcome}>{outcome}</li>
          ))}
        </ul>

        <h3>Tech Stack</h3>
        <ul className="chip-row">
          {project.tech.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>

        <div className="inline-links">
          <a href={project.links.repo} target="_blank" rel="noreferrer">
            Source Code
          </a>
          {project.links.demo && (
            <a href={project.links.demo} target="_blank" rel="noreferrer">
              Live Product
            </a>
          )}
        </div>
      </Reveal>

      <section className="project-nav">
        {previous ? <Link to={`/work/${previous.slug}`}>← {previous.title}</Link> : <span />}
        {next ? <Link to={`/work/${next.slug}`}>{next.title} →</Link> : <span />}
      </section>
    </div>
  )
}
