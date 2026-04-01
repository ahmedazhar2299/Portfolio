import { MotionConfig, motion, useReducedMotion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"
import { profile } from "./data/profile"

type Theme = "light" | "dark"

type SectionProps = {
  id: string
  title: string
  eyebrow: string
  delay?: number
  children: React.ReactNode
}

const navLinks = [
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
]

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark"

  const stored = window.localStorage.getItem("theme")
  if (stored === "light" || stored === "dark") return stored

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function Section({ id, title, eyebrow, delay = 0, children }: SectionProps) {
  return (
    <motion.section
      id={id}
      className="section"
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      <div className="section-heading">
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </motion.section>
  )
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const reduceMotion = useReducedMotion()

  const yearsCoding = useMemo(() => {
    const startYear = 2022
    return Math.max(2, new Date().getFullYear() - startYear)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
  }

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <div className="page-bg" aria-hidden="true">
        <div className="grid-mask" />
        {!reduceMotion && (
          <>
            <motion.div
              className="orb orb-a"
              animate={{ x: [0, 28, -16, 0], y: [0, -30, 18, 0] }}
              transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
            />
            <motion.div
              className="orb orb-b"
              animate={{ x: [0, -20, 24, 0], y: [0, 16, -24, 0] }}
              transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
            />
            <motion.div
              className="orb orb-c"
              animate={{ x: [0, 16, -14, 0], y: [0, -10, 20, 0] }}
              transition={{ repeat: Infinity, duration: 24, ease: "easeInOut" }}
            />
          </>
        )}
      </div>

      <div className="wordmark" aria-hidden="true">
        AHMED
      </div>

      <header className="topbar">
        <div className="topbar-inner shell glass">
          <nav aria-label="Primary">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <button className="theme-btn" onClick={toggleTheme} type="button" aria-label="Toggle theme">
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
      </header>

      <main id="main-content" className="shell main">
        <motion.section
          className="hero glass"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-copy">
            <span className="eyebrow">{profile.location}</span>
            <h1>
              Production-grade AI systems, cloud architecture, and backend engineering that move
              business metrics.
            </h1>
            <p>{profile.tagline}</p>

            <div className="hero-links">
              <a href={`mailto:${profile.email}`}>Email</a>
              <a href={profile.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href={profile.resume} target="_blank" rel="noreferrer">
                Resume
              </a>
            </div>

            <div className="stats-grid" aria-label="Professional highlights">
              {profile.stats.map((stat) => (
                <article key={stat.label} className="stat-card">
                  <p>{stat.label}</p>
                  <h3>{stat.value}</h3>
                </article>
              ))}
              <article className="stat-card">
                <p>Years Building in Industry</p>
                <h3>{yearsCoding}+</h3>
              </article>
            </div>
          </div>

          <div className="hero-visual">
            <img src="/ahmed.webp" alt="Portrait of Muhammad Ahmed" loading="eager" width={720} height={840} />
            <div className="hero-note">
              <h3>Profile Signal</h3>
              <p>
                {profile.sourceNotes.github} {profile.sourceNotes.linkedin}
              </p>
            </div>
          </div>
        </motion.section>

        <Section id="experience" eyebrow="Career" title="Professional Experience" delay={0.04}>
          <ol className="timeline" aria-label="Professional experience timeline">
            {profile.experience.map((item) => (
              <motion.li
                key={`${item.company}-${item.period}`}
                className="timeline-item glass"
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 220, damping: 22 }}
              >
                <div className="timeline-head">
                  <div>
                    <h3>{item.role}</h3>
                    <p>
                      {item.company} · {item.location}
                    </p>
                  </div>
                  <span>{item.period}</span>
                </div>
                <ul>
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </motion.li>
            ))}
          </ol>
        </Section>

        <Section id="projects" eyebrow="Build" title="Selected Projects" delay={0.08}>
          <div className="project-grid">
            {profile.projects.map((project) => (
              <motion.article
                key={project.name}
                className="project-card glass"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
              >
                <div className="project-head">
                  <h3>{project.name}</h3>
                  <p>{project.subtitle}</p>
                </div>
                <p className="project-desc">{project.description}</p>
                <ul className="tags">
                  {project.stack.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <div className="project-links">
                  <a href={project.repo} target="_blank" rel="noreferrer">
                    Source
                  </a>
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noreferrer">
                      Live
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </Section>

        <Section id="skills" eyebrow="Capability" title="Technical Depth" delay={0.12}>
          <div className="skills-layout">
            <article className="glass skills-card">
              <h3>Core Stack</h3>
              <div className="skill-groups">
                {profile.skillGroups.map((group) => (
                  <div key={group.label}>
                    <p>{group.label}</p>
                    <ul>
                      {group.items.map((skill) => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </article>

            <article className="glass skills-card">
              <h3>GitHub Language Mix</h3>
              <ul className="language-bars" aria-label="Language distribution from GitHub">
                {profile.languageMix.map((item) => {
                  const width = `${Math.max(18, item.count * 11)}%`
                  return (
                    <li key={item.language}>
                      <div className="language-meta">
                        <span>{item.language}</span>
                        <strong>{item.count}</strong>
                      </div>
                      <div className="bar-track">
                        <motion.span
                          className="bar-fill"
                          initial={{ width: 0 }}
                          whileInView={{ width }}
                          viewport={{ once: true, amount: 0.7 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                        />
                      </div>
                    </li>
                  )
                })}
              </ul>
            </article>
          </div>

          <article className="glass education">
            <h3>Education</h3>
            <div>
              {profile.education.map((item) => (
                <div key={item.school} className="edu-item">
                  <h4>{item.school}</h4>
                  <p>{item.degree}</p>
                  <span>
                    {item.date} · {item.detail}
                  </span>
                </div>
              ))}
            </div>
          </article>
        </Section>

        <Section id="contact" eyebrow="Next" title="Let’s Build Something Ambitious" delay={0.16}>
          <article className="glass cta-card">
            <p>
              I’m actively open to high-impact software engineering roles across AI systems,
              platform/backend, and cloud architecture.
            </p>
            <div>
              <a href={`mailto:${profile.email}`}>Contact via Email</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                View LinkedIn
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer">
                Explore GitHub
              </a>
            </div>
          </article>
        </Section>
      </main>

      <footer className="shell footer">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with React, TypeScript, and Framer
          Motion.
        </p>
      </footer>
    </MotionConfig>
  )
}
