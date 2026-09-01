import { motion, useReducedMotion } from "framer-motion"
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { PortfolioGuideBot } from "./components/PortfolioGuideBot"
import { Seo } from "./components/Seo"
import { profile } from "./data/profile"
import { type PortfolioSectionId, educationEntries, experienceEntries, navSections, projectEntries, stackGroups } from "./data/portfolioSections"

type Theme = "light" | "dark"
type ContactForm = { name: string; email: string; message: string }
const emptyForm: ContactForm = { name: "", email: "", message: "" }

function ArrowIcon() { return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 6l4 4-4 4" /></svg> }
function ExternalIcon() { return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M8 4H4v12h12v-4M10 10l6-6M11 4h5v5" /></svg> }
function ThemeIcon({ theme }: { theme: Theme }) {
  return theme === "dark" ? <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M16 12.2A6.7 6.7 0 0 1 7.8 4 6.8 6.8 0 1 0 16 12.2Z" /></svg> : <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="3.2" /><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.3 4.3l1.4 1.4M14.3 14.3l1.4 1.4M4.3 15.7l1.4-1.4M14.3 5.7l1.4-1.4" /></svg>
}
function SectionTitle({ kicker, title, copy }: { kicker: string; title: string; copy: string }) {
  return <header className="section-title"><span>{kicker}</span><h2>{title}</h2><p>{copy}</p></header>
}

export default function App() {
  const reduceMotion = useReducedMotion()
  const [activeSection, setActiveSection] = useState<PortfolioSectionId>("about")
  const [menuOpen, setMenuOpen] = useState(false)
  const [form, setForm] = useState<ContactForm>(emptyForm)
  const [formStatus, setFormStatus] = useState<"idle" | "error" | "ready">("idle")
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("portfolio-theme")
    if (saved === "light" || saved === "dark") return saved
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem("portfolio-theme", theme)
  }, [theme])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveSection(visible.target.id as PortfolioSectionId)
    }, { rootMargin: "-18% 0px -62%", threshold: [0, 0.2, 0.5] })
    navSections.forEach(({ id }) => { const section = document.getElementById(id); if (section) observer.observe(section) })
    return () => observer.disconnect()
  }, [])

  const navigate = (id: PortfolioSectionId) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" })
    setMenuOpen(false)
  }
  const onFormChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value })); setFormStatus("idle")
  }
  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) { setFormStatus("error"); return }
    const subject = encodeURIComponent(`Portfolio note from ${form.name.trim()}`)
    const body = encodeURIComponent(`${form.message.trim()}\n\nFrom: ${form.name.trim()} (${form.email.trim()})`)
    setFormStatus("ready"); window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  return <div className="site-shell">
    <Seo title="Muhammad Ahmed | Software Engineer" description={profile.heroStatement} pathname="/" />
    <header className="site-header">
      <a className="wordmark" href="#about" onClick={(event) => { event.preventDefault(); navigate("about") }} aria-label="Muhammad Ahmed, home"><span>MA</span><strong>Muhammad Ahmed</strong></a>
      <nav className={menuOpen ? "site-nav is-open" : "site-nav"} aria-label="Main navigation">
        {navSections.map((item) => <button key={item.id} className={activeSection === item.id ? "is-active" : ""} onClick={() => navigate(item.id)}>{item.label}</button>)}
      </nav>
      <div className="header-actions">
        <button className="theme-toggle" onClick={() => setTheme(theme === "light" ? "dark" : "light")} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}><ThemeIcon theme={theme} /></button>
        <button className={menuOpen ? "menu-toggle is-open" : "menu-toggle"} onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation"><span /><span /></button>
      </div>
    </header>

    <main>
      <section id="about" className="hero section-shell">
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <p className="eyebrow"><span /> Software engineer in Los Angeles</p>
          <h1>I build reliable systems for <em>ambitious ideas.</em></h1>
          <p className="hero-lede">I work across AI, backend engineering, and distributed systems, turning research and product requirements into software that holds up in production.</p>
          <div className="hero-actions"><button className="primary-button" onClick={() => navigate("projects")}>Explore my work <ArrowIcon /></button><a className="text-button" href={profile.resume} target="_blank" rel="noreferrer">View résumé <ExternalIcon /></a></div>
          <div className="hero-proof" aria-label="Selected professional highlights"><div><strong>100K+</strong><span>daily requests supported</span></div><div><strong>80%</strong><span>latency reduction</span></div><div><strong>4.0</strong><span>graduate GPA</span></div></div>
        </motion.div>
        <motion.div className="hero-portrait" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.65, delay: 0.08 }}>
          <div className="portrait-frame"><img src="/ahmed.webp" alt="Muhammad Ahmed" width="720" height="860" /></div>
          <div className="portrait-note"><span>Currently</span><p>Researching machine learning for stroke rehabilitation at Chapman University.</p></div>
        </motion.div>
      </section>

      <section id="experience" className="section-shell content-section">
        <SectionTitle kicker="Experience" title="Work built around measurable outcomes." copy="A concise view of the teams, systems, and responsibilities that shaped my engineering practice." />
        <div className="timeline">{experienceEntries.map((entry) => <article className="timeline-row" key={`${entry.company}-${entry.period}`}>
          <p className="timeline-period">{entry.period}</p><div className="timeline-mark"><span /></div>
          <div className="timeline-content"><header><div><h3>{entry.role}</h3><p>{entry.company} · {entry.location}</p></div><img src={entry.logo} alt="" width="100" height="48" loading="lazy" /></header><p>{entry.summary}</p><ul>{entry.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></div>
        </article>)}</div>
      </section>

      <section id="projects" className="section-shell content-section">
        <SectionTitle kicker="Selected work" title="Systems, research, and experiments." copy="A few projects that show how I approach performance, machine learning, and dependable implementation." />
        <div className="project-grid">{projectEntries.map((project, index) => <motion.a className="project-card" key={project.title} href={project.href} target="_blank" rel="noreferrer" whileHover={reduceMotion ? undefined : { y: -4 }}>
          <figure><img src={project.image} alt="" className={project.imageFit === "contain" ? "contain" : ""} loading="lazy" /></figure>
          <div className="project-card-copy"><div className="project-number">0{index + 1}</div><p className="project-label">{project.tech.join(" · ")}</p><h3>{project.title}</h3><p>{project.summary}</p><span>View repository <ArrowIcon /></span></div>
        </motion.a>)}</div>
      </section>

      <section id="stack" className="section-shell content-section">
        <SectionTitle kicker="Toolkit" title="Tools chosen for the problem." copy="My core stack spans service architecture, applied machine learning, and production delivery." />
        <div className="stack-grid">{stackGroups.map((group, index) => <article className="stack-card" key={group.title}><span>0{index + 1}</span><h3>{group.title}</h3><p>{group.note}</p><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div>
      </section>

      <section id="education" className="section-shell content-section">
        <SectionTitle kicker="Education" title="A foundation in computer science." copy="Formal study has supported the same thread running through my work: understanding systems deeply enough to improve them." />
        <div className="education-list">{educationEntries.map((entry) => <article key={entry.school}><img src={entry.logo} alt="" width="76" height="76" loading="lazy" /><div><p>{entry.period}</p><h3>{entry.degree}</h3><span>{entry.school} · {entry.location}</span><p>{entry.note}</p></div></article>)}</div>
      </section>

      <section id="contact" className="contact-section"><div className="section-shell contact-inner">
        <div className="contact-copy"><p className="eyebrow"><span /> Let’s talk</p><h2>Have a hard problem worth solving?</h2><p>I’m open to software engineering roles and thoughtful collaborations in AI systems, backend platforms, and applied research.</p><div className="contact-links"><a href={profile.github} target="_blank" rel="noreferrer">GitHub <ExternalIcon /></a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ExternalIcon /></a></div></div>
        <form className="contact-form" onSubmit={submitContact} noValidate><label><span>Name</span><input name="name" value={form.name} onChange={onFormChange} placeholder="Your name" /></label><label><span>Email</span><input name="email" type="email" value={form.email} onChange={onFormChange} placeholder="you@example.com" /></label><label><span>Message</span><textarea name="message" rows={4} value={form.message} onChange={onFormChange} placeholder="What would you like to build?" /></label><button className="primary-button" type="submit">Draft email <ArrowIcon /></button>{formStatus === "error" && <p className="form-message error" role="alert">Please complete all three fields.</p>}{formStatus === "ready" && <p className="form-message">Your email app should be open with a draft.</p>}</form>
      </div></section>
    </main>
    <footer className="site-footer"><p>© {new Date().getFullYear()} Muhammad Ahmed</p><button onClick={() => navigate("about")}>Back to top ↑</button></footer>
    <PortfolioGuideBot activeSection={activeSection} onNavigate={navigate} />
  </div>
}
