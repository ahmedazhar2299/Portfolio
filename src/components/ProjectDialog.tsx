import { useEffect, useRef } from "react"
import type { Project } from "../data/portfolioSections"
import { Icon } from "./Icon"
import { ProjectVisual } from "./ProjectVisual"

export function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const element = dialog.current
    // Removing the element releases the native modal. Calling close() in an
    // effect cleanup also fires onClose during React Strict Mode's replay.
    if (element && !element.open) element.showModal()
  }, [])

  return <dialog ref={dialog} className="project-dialog" aria-labelledby="project-dialog-title" onClose={onClose} onClick={event => {
    if (event.target === event.currentTarget) {
      const bounds = event.currentTarget.getBoundingClientRect()
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose()
    }
  }}>
    <div className={`dialog-visual tone-${project.tone}`}><ProjectVisual kind={project.visual} /><button className="icon-button dialog-close" onClick={onClose} aria-label="Close project details" autoFocus><Icon name="close" /></button></div>
    <div className="dialog-copy">
      <p className="eyebrow">{project.category} / {project.label}</p>
      <h2 id="project-dialog-title">{project.title}</h2>
      <p className="dialog-summary">{project.summary}</p>
      <div className="project-tags">{project.tech.map(item => <span key={item}>{item}</span>)}</div>
      <h3>Inside the project</h3>
      <ul>{project.details.map(detail => <li key={detail}>{detail}</li>)}</ul>
      {project.note && <p className="project-note">{project.note}</p>}
      <div className="dialog-actions">{project.href && <a className="button button-primary" href={project.href} target="_blank" rel="noreferrer">{project.linkLabel} <Icon name="external" /></a>}<button className="button button-text" onClick={onClose}>Back to projects</button></div>
    </div>
  </dialog>
}
