import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import type { CaseStudy } from "../data/profile"

type WorkCardProps = {
  item: CaseStudy
}

export function WorkCard({ item }: WorkCardProps) {
  return (
    <motion.article
      className="work-card glass-panel"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
    >
      <div className="work-card-head">
        <span>{item.category}</span>
        <h3>{item.title}</h3>
        <p>{item.subtitle}</p>
      </div>

      <p className="work-card-summary">{item.summary}</p>

      <ul className="chip-row">
        {item.tech.slice(0, 4).map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>

      <div className="work-card-links">
        <Link to={`/work/${item.slug}`}>Open Case Study</Link>
        <a href={item.links.repo} target="_blank" rel="noreferrer">
          Source
        </a>
      </div>
    </motion.article>
  )
}
