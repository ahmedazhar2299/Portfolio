import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { PageIntro } from "../components/PageIntro"
import { Reveal } from "../components/Reveal"
import { Seo } from "../components/Seo"
import { experiments } from "../data/profile"

const filters = ["All", "AI", "Performance", "Tooling", "Web"] as const

type Filter = (typeof filters)[number]

export function PlaygroundPage() {
  const [filter, setFilter] = useState<Filter>("All")

  const visibleExperiments = useMemo(() => {
    if (filter === "All") return experiments
    return experiments.filter((experiment) => experiment.label === filter)
  }, [filter])

  return (
    <div className="page">
      <Seo
        title="Playground"
        description="A working lab of experiments, prototypes, and technical explorations by Muhammad Ahmed."
        pathname="/playground"
      />

      <PageIntro
        eyebrow="Playground"
        title={
          <>
            Experimental threads from my
            <span className="title-emphasis"> research and systems lab.</span>
          </>
        }
        lede="This is where I test new ideas, pressure-test techniques, and build prototypes before they become product decisions."
      />

      <Reveal className="filter-row" delay={0.05}>
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={item === filter ? "is-active" : ""}
          >
            {item}
          </button>
        ))}
      </Reveal>

      <section className="experiment-grid">
        {visibleExperiments.map((experiment, index) => (
          <Reveal key={experiment.name} delay={index * 0.04}>
            <motion.article className="glass-panel experiment-card" whileHover={{ y: -4 }}>
              <div className="experiment-head">
                <span>{experiment.label}</span>
                <strong>{experiment.status}</strong>
              </div>
              <h3>{experiment.name}</h3>
              <p>{experiment.summary}</p>
              <a href={experiment.link} target="_blank" rel="noreferrer">
                Explore Repository
              </a>
            </motion.article>
          </Reveal>
        ))}
      </section>
    </div>
  )
}
