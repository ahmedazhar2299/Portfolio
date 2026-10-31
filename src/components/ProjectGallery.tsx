import type { Project } from "../data/portfolioSections"
import { Icon } from "./Icon"
import { ProjectVisual } from "./ProjectVisual"
import "./ProjectDepth.css"

export function ProjectGallery({ projects, onSelect }: { projects: Project[]; onSelect: (project: Project) => void }) {
  return <div className="project-grid">
    {projects.map(project => <article className="project-card" key={project.id}>
      <button className="project-open" onClick={() => onSelect(project)} aria-label={`Explore ${project.label}`}>
        <div className={`project-visual tone-${project.tone}`}>
          <div className="project-visual-top"><span>{project.category}</span><span className="project-open-icon"><Icon name="arrow" /></span></div>
          <ProjectVisual kind={project.visual} />
        </div>
        <div className="project-copy"><p className="project-label">{project.label}</p><h3>{project.title}</h3><p className="project-description">{project.summary}</p><div className="project-metric"><strong>{project.metric}</strong><span>{project.metricLabel}</span></div><div className="project-card-footer"><span>{project.tech.join(" · ")}</span><span className="project-details-label">Explore <Icon name="arrow" /></span></div></div>
      </button>
    </article>)}
  </div>
}
