import { useEffect, useMemo, useRef, useState } from "react"
import { Icon } from "./components/Icon"
import { PortfolioGuideBot } from "./components/PortfolioGuideBot"
import { ProjectDialog } from "./components/ProjectDialog"
import { ProjectGallery } from "./components/ProjectGallery"
import { DepthCard } from "./components/DepthCard"
import { Seo } from "./components/Seo"
import { profile, publicProfiles } from "./data/profile"
import { awards, educationEntries, experienceEntries, moreProjects, navSections, projectEntries, projectFilters, publications, stackGroups, upcomingResearch, type PortfolioSectionId, type Project } from "./data/portfolioSections"

type Theme = "light" | "dark"

function SectionHeading({ label, title, copy, children }: { label: string; title: string; copy?: string; children?: React.ReactNode }) {
  return <header className="section-heading"><div><p className="eyebrow">{label}</p><h2>{title}</h2>{copy && <p className="section-description">{copy}</p>}</div>{children}</header>
}

function readTheme(): Theme {
  try {
    const saved = localStorage.getItem("portfolio-theme")
    if (saved === "light" || saved === "dark") return saved
  } catch { /* Use the light palette when storage is unavailable. */ }
  return "light"
}

export default function App() {
  const [activeSection, setActiveSection] = useState<PortfolioSectionId>("about")
  const [theme, setTheme] = useState<Theme>(readTheme)
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState<(typeof projectFilters)[number]>("All work")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle")
  const [citationStatus, setCitationStatus] = useState("")
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const menuButton = useRef<HTMLButtonElement>(null)
  const projects = useMemo(() => projectEntries.filter(project => filter === "All work" || project.category === filter), [filter])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "light" ? "#f8fafd" : "#111318")
    try { localStorage.setItem("portfolio-theme", theme) } catch { /* Theme still works without storage. */ }
  }, [theme])

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActiveSection(visible.target.id as PortfolioSectionId)
    }, { rootMargin: "-100px 0px -55% 0px", threshold: 0 })
    navSections.forEach(({ id }) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMenuOpen(false); menuButton.current?.focus() }
    }
    document.addEventListener("keydown", close)
    return () => document.removeEventListener("keydown", close)
  }, [menuOpen])

  useEffect(() => () => clearTimeout(copyTimer.current), [])

  const navigate = (id: PortfolioSectionId) => {
    document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })
    history.replaceState(null, "", `#${id}`)
    setMenuOpen(false)
  }

  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(profile.email); setCopyStatus("copied") }
    catch { setCopyStatus("error") }
    clearTimeout(copyTimer.current)
    copyTimer.current = setTimeout(() => setCopyStatus("idle"), 4000)
  }

  const copyCitation = async (citation: string) => {
    try { await navigator.clipboard.writeText(citation); setCitationStatus("Citation copied.") }
    catch { setCitationStatus("Could not copy. The citation is available under Paper details.") }
  }

  return <div className="site-shell" data-active-section={activeSection}>
    <Seo title="Muhammad Ahmed | Software Engineer & Researcher" description={profile.heroStatement} pathname="/" />
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <div className="header-inner">
        <a className="wordmark" href="#about" aria-label="Muhammad Ahmed, home"><span className="brand-mark">a<span>.</span></span><span>Muhammad Ahmed<span className="wordmark-caption">Engineer by Profession | Researcher by Passion | Athlete by Lifestyle</span></span></a>
        <nav id="main-navigation" className={menuOpen ? "site-nav is-open" : "site-nav"} aria-label="Main navigation">
          {navSections.map(item => <a key={item.id} href={`#${item.id}`} className={activeSection === item.id ? "is-active" : ""} aria-current={activeSection === item.id ? "location" : undefined} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
        </nav>
        <div className="header-actions"><button className="icon-button theme-toggle" onClick={() => setTheme(theme === "light" ? "dark" : "light")} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}><Icon name={theme === "light" ? "moon" : "sun"} /></button><button ref={menuButton} className="icon-button menu-toggle" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? "close" : "menu"} /></button></div>
      </div>
    </header>

    <main id="main" tabIndex={-1}>
      <section id="about" className="hero section-shell">
        <div className="hero-copy">
          <p className="hero-greeting"><span className="greeting-line" /> Hi, I’m Ahmed.</p>
          <h1>Building software.<br /><span>Advancing research.</span></h1>
          <p className="hero-description">{profile.shortBio}</p>
          <div className="hero-actions"><a className="button button-primary" href="#projects">Explore my work <Icon name="arrow" /></a><a className="button button-outlined" href={profile.resume} target="_blank" rel="noreferrer">View résumé <Icon name="download" /></a></div>
          <p className="hero-location"><Icon name="location" /> Long Beach, California <span>·</span> M.S. Computer Science, CSULB</p>
        </div>
        <div className="hero-portrait">
          <div className="portrait-frame"><img src="/ahmed.webp" alt="Muhammad Ahmed" width="1192" height="896" fetchPriority="high" /></div>
          <div className="portrait-label"><span className="status-dot" /><span>A little curiosity. A lot of building.</span></div>
          <span className="portrait-accent" aria-hidden="true"><Icon name="spark" /></span>
        </div>
      </section>

      <div className="section-shell current-strip">
        <div className="current-label"><span className="status-dot" /> Currently</div>
        <a href="#experience"><span className="current-icon"><Icon name="research" /></span><span><strong>ML for stroke mobility</strong><span>Chapman University</span></span><Icon name="arrow" /></a>
        <a href="#experience"><span className="current-icon"><Icon name="code" /></span><span><strong>Computational science</strong><span>CSULB · CECM Lab</span></span><Icon name="arrow" /></a>
      </div>

      <section id="projects" className="section-shell content-section projects-section">
        <SectionHeading label="Selected projects" title="A few things I’ve been building." copy="Across systems engineering, applied machine learning, and research."><a className="inline-link" href={profile.github} target="_blank" rel="noreferrer">All repositories <Icon name="external" /></a></SectionHeading>
        <div className="project-toolbar"><div className="filter-group" role="group" aria-label="Filter projects">{projectFilters.map(item => <button key={item} className={filter === item ? "filter-chip is-selected" : "filter-chip"} onClick={() => setFilter(item)} aria-pressed={filter === item}>{filter === item && <Icon name="check" />}{item}</button>)}</div><span className="project-count" aria-live="polite">{projects.length} {projects.length === 1 ? "project" : "projects"}</span></div>
        <ProjectGallery projects={projects} onSelect={setSelectedProject} />
        <div className="more-work"><p>Also on my workbench</p><div>{moreProjects.map(project => <a key={project.title} href={project.href} target="_blank" rel="noreferrer"><span><strong>{project.title}</strong><span>{project.description}</span></span><Icon name="external" /></a>)}</div></div>
      </section>

      <section id="experience" className="experience-section"><div className="section-shell content-section">
        <SectionHeading label="Experience" title="From production to the research lab." copy="The teams I’ve worked with, and the problems I’ve helped solve." />
        <div className="experience-list">{experienceEntries.map(entry => <details className="experience-item" key={entry.company} open={entry.current}>
          <summary><span className="company-logo"><img src={entry.logo} alt="" width="48" height="48" loading="lazy" /></span><span className="experience-summary"><span className="experience-company">{entry.company}{entry.current && <span className="current-badge">Current</span>}</span><span className="experience-role">{entry.role}<span>{entry.team}</span></span></span><span className="experience-date">{entry.period}</span><span className="experience-expand"><Icon name="chevron" /></span></summary>
          <div className="experience-body"><p className="experience-field">{entry.field}<span>{entry.location}</span></p><p>{entry.summary}</p><ul>{entry.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul><div className="project-tags">{entry.tech.map(item => <span key={item}>{item}</span>)}</div></div>
        </details>)}</div>
        <div className="impact-row" aria-label="Selected production experience"><div><strong>100K+</strong><span>daily requests at Paismo</span></div><div><strong>40%</strong><span>lower query latency at Paismo</span></div><div><strong>300K+</strong><span>monthly email workflow runs at xiQ</span></div></div>
      </div></section>

      <section id="research" className="section-shell content-section research-section">
        <SectionHeading label="Research & publications" title="Questions worth looking into." copy="Reliable AI-generated code, maintainable data systems, and movement after stroke."><a className="inline-link" href={profile.scholar} target="_blank" rel="noreferrer">Google Scholar <Icon name="external" /></a></SectionHeading>
        <div className="publications">{publications.map((paper, index) => <article className="publication" key={paper.href}>
          <div className="publication-index"><span className="paper-sculpture" aria-hidden="true"><span /><span /><span>0{index + 1}</span></span></div><div className="publication-body"><div className="publication-meta"><span>{paper.venue} {paper.year}</span><span>{paper.authorship}</span></div><h3><a href={paper.href} target="_blank" rel="noreferrer">{paper.shortTitle}<Icon name="external" /></a></h3><p>{paper.description}</p><details className="paper-details"><summary>Paper details <Icon name="chevron" /></summary><p>{paper.title}</p><p>{paper.citation}</p></details><div className="publication-actions"><a className="inline-link" href={paper.href} target="_blank" rel="noreferrer">Read paper <Icon name="arrow" /></a><button className="inline-link citation-button" onClick={() => copyCitation(paper.citation)}><Icon name="copy" /> Copy citation</button></div></div>
        </article>)}</div>
        <p className="citation-status" role="status">{citationStatus}</p>
        <aside className="upcoming-research"><span className="upcoming-icon"><Icon name="research" /></span><div><p className="eyebrow">Looking ahead · {upcomingResearch.venue}</p><h3>{upcomingResearch.title}</h3><p>{upcomingResearch.note}</p></div><span className="upcoming-badge">Upcoming</span></aside>
      </section>

      <section id="education" className="about-section"><div className="section-shell content-section">
        <SectionHeading label="A little more about me" title="Curiosity is the common thread." copy="I like understanding how things work, whether that means tracing a slow query, studying a movement signal, or finding a better algorithm." />
        <div className="education-grid">{educationEntries.map(entry => <DepthCard className="education-card" key={entry.school}><div className="education-card-top"><img src={entry.logo} alt="" width="48" height="48" loading="lazy" /><span>{entry.period}</span></div><h3>{entry.degree}</h3><p className="education-emphasis">{entry.emphasis}</p><p className="education-school">{entry.school}</p><span className="achievement"><Icon name="school" />{entry.achievement}</span><p className="education-details">{entry.details}</p></DepthCard>)}</div>
        <div className="awards">{awards.map(award => <div key={award.title}><Icon name="spark" /><p><strong>{award.title}</strong><span>{award.detail}</span></p></div>)}</div>
        <div className="toolkit"><div><p className="eyebrow">My toolkit</p><h3>Different problems.<br />The right tools.</h3><a className="inline-link" href={profile.resume} target="_blank" rel="noreferrer">Full résumé <Icon name="arrow" /></a></div><dl>{stackGroups.map(group => <div key={group.title}><dt>{group.title}</dt><dd>{group.items}</dd></div>)}</dl></div>
      </div></section>

      <section id="contact" className="section-shell contact-section">
        <div className="contact-card"><div className="contact-copy"><p className="eyebrow">Get in touch</p><h2>Let’s build something<br /><span>thoughtful.</span></h2><p>Have a role, a research question, or an interesting problem in mind? I’d be glad to hear about it.</p><div className="contact-actions"><a className="button button-primary" href={`mailto:${profile.email}`}>Say hello <Icon name="mail" /></a><button className="button button-outlined" onClick={copyEmail}><Icon name={copyStatus === "copied" ? "check" : "copy"} />{copyStatus === "copied" ? "Email copied" : "Copy email"}</button></div><p className="copy-status" role="status">{copyStatus === "error" ? `Copy unavailable. Email me at ${profile.email}` : <a href={`mailto:${profile.email}`}>{profile.email}</a>}</p></div><div className="contact-profiles">{publicProfiles.map(item => <a href={item.href} key={item.label} target="_blank" rel="noreferrer"><span><strong>{item.label}</strong><span>{item.description}</span></span><Icon name="external" /></a>)}</div></div>
      </section>
    </main>
    <footer className="site-footer section-shell"><a className="footer-brand" href="#about"><span className="brand-mark">a<span>.</span></span><span>Made with care, in Long Beach.</span></a><span>© {new Date().getFullYear()} Muhammad Ahmed</span><a href="#about" className="back-top">Back to top <Icon name="arrow" /></a></footer>
    <PortfolioGuideBot activeSection={activeSection} onNavigate={navigate} />
    {selectedProject && <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />}
  </div>
}
