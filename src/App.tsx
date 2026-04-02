import { motion, useReducedMotion } from "framer-motion"
import { useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from "react"
import { Seo } from "./components/Seo"
import { profile } from "./data/profile"
import {
  type IconName,
  educationEntries,
  experienceEntries,
  introBadges,
  navSections,
  projectEntries,
  stackGroups,
} from "./data/portfolioSections"

type SectionId = (typeof navSections)[number]["id"]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

type ContactFormState = {
  name: string
  email: string
  message: string
}

type ThemePreference = "light" | "dark" | "system"

const initialContactForm: ContactFormState = {
  name: "",
  email: "",
  message: "",
}

const themeOptions: Array<{ value: ThemePreference; label: string }> = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
]

function Icon({ name, className }: { name: IconName; className?: string }) {
  const cls = className ?? "icon"

  switch (name) {
    case "profile":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="8" r="3.3" />
          <path d="M5 20c0-3.7 3.2-6 7-6s7 2.3 7 6" />
        </svg>
      )
    case "projects":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3.5" y="5" width="17" height="14" rx="2.2" />
          <path d="M3.5 9h17M10 9V5" />
        </svg>
      )
    case "timeline":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M6 5v14M18 5v14M6 12h12" />
          <circle cx="12" cy="12" r="2.2" />
        </svg>
      )
    case "education":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="m3 9 9-4 9 4-9 4-9-4Z" />
          <path d="M7 11.5V15c0 1.8 2.2 3.2 5 3.2s5-1.4 5-3.2v-3.5" />
          <path d="M21 9v5.4" />
        </svg>
      )
    case "stack":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="m12 3 8 4.2-8 4.2-8-4.2L12 3Z" />
          <path d="m4 12 8 4.2 8-4.2" />
          <path d="m4 16.5 8 4.2 8-4.2" />
        </svg>
      )
    case "mail":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
          <path d="m4.5 7 7.5 6 7.5-6" />
        </svg>
      )
    case "location":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 20s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z" />
          <circle cx="12" cy="10" r="2.1" />
        </svg>
      )
    case "status":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="8" />
          <path d="M8.5 12.5 11 15l4.5-5" />
        </svg>
      )
    case "spark":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 3v5M12 16v5M3 12h5M16 12h5" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )
    case "external":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M10 5H5v14h14v-5" />
          <path d="M14 5h5v5M10 14 19 5" />
        </svg>
      )
    case "check":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="m5 12 4 4 10-10" />
        </svg>
      )
    case "resume":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M7 3h7l4 4v14H7z" />
          <path d="M14 3v4h4M10 12h6M10 16h6" />
        </svg>
      )
    case "github":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="m9 8-4 4 4 4M15 8l4 4-4 4" />
          <path d="m14 6-4 12" />
        </svg>
      )
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M8 10v7M8 7h.01M12 17v-4a2 2 0 1 1 4 0v4" />
        </svg>
      )
    default:
      return null
  }
}

function SectionHeading({ icon, title, note }: { icon: IconName; title: string; note: string }) {
  return (
    <header className="block-header" data-title={title}>
      <div className="block-topline" aria-hidden="true">
        <span className="block-icon-badge">
          <Icon name={icon} />
        </span>
        <span className="block-topline-rule" />
        <span className="block-topline-dot" />
      </div>
      <div className="block-heading-copy">
        <h2 className="block-title">{title}</h2>
        <p className="block-note">{note}</p>
      </div>
    </header>
  )
}

function ThemeGlyph({ mode }: { mode: ThemePreference }) {
  if (mode === "light") {
    return (
      <svg viewBox="0 0 24 24" className="theme-glyph" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.2 5.2l2.1 2.1M16.7 16.7l2.1 2.1M5.2 18.8l2.1-2.1M16.7 7.3l2.1-2.1" />
      </svg>
    )
  }

  if (mode === "dark") {
    return (
      <svg viewBox="0 0 24 24" className="theme-glyph" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M20 14.2A8.5 8.5 0 1 1 9.8 4a7.2 7.2 0 0 0 10.2 10.2Z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className="theme-glyph" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3.5" y="4.5" width="17" height="12" rx="2.2" />
      <path d="M8.5 19.5h7M12 16.5v3" />
    </svg>
  )
}

function ThemeMenu({
  value,
  onChange,
  className,
}: {
  value: ThemePreference
  onChange: (value: ThemePreference) => void
  className?: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const current = themeOptions.find((option) => option.value === value) ?? themeOptions[2]

  useEffect(() => {
    if (!isOpen) return

    const onDocumentPointerDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setIsOpen(false)
    }

    const onDocumentKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false)
    }

    document.addEventListener("mousedown", onDocumentPointerDown)
    document.addEventListener("keydown", onDocumentKeyDown)
    return () => {
      document.removeEventListener("mousedown", onDocumentPointerDown)
      document.removeEventListener("keydown", onDocumentKeyDown)
    }
  }, [isOpen])

  return (
    <div className={className ? `theme-menu ${className}` : "theme-menu"} ref={menuRef}>
      <button
        type="button"
        className={isOpen ? "theme-menu-trigger is-open" : "theme-menu-trigger"}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Theme"
      >
        <ThemeGlyph mode={current.value} />
        <span>{current.label}</span>
        <svg viewBox="0 0 24 24" className="theme-chevron" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="m7 10 5 5 5-5" />
        </svg>
      </button>

      {isOpen ? (
        <div className="theme-menu-list" role="menu" aria-label="Theme options">
          {themeOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              role="menuitemradio"
              aria-checked={value === option.value}
              className={value === option.value ? "theme-menu-item is-active" : "theme-menu-item"}
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
            >
              <ThemeGlyph mode={option.value} />
              <span>{option.label}</span>
              {value === option.value ? <Icon name="check" className="theme-menu-check" /> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default function App() {
  const reducedMotion = useReducedMotion()
  const [activeSection, setActiveSection] = useState<SectionId>("about")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [themePreference, setThemePreference] = useState<ThemePreference>(() => {
    if (typeof window === "undefined") return "system"
    const stored = window.localStorage.getItem("theme-preference")
    if (stored === "light" || stored === "dark" || stored === "system") return stored
    return "system"
  })
  const [systemPrefersDark, setSystemPrefersDark] = useState(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia("(prefers-color-scheme: dark)").matches
  })
  const [contactForm, setContactForm] = useState<ContactFormState>(initialContactForm)
  const [contactStatus, setContactStatus] = useState<"idle" | "error" | "sent">("idle")

  const sectionIds = useMemo(() => navSections.map((item) => item.id), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const updatePreference = () => setSystemPrefersDark(mediaQuery.matches)
    updatePreference()
    mediaQuery.addEventListener("change", updatePreference)
    return () => mediaQuery.removeEventListener("change", updatePreference)
  }, [])

  useEffect(() => {
    const resolvedTheme = themePreference === "system" ? (systemPrefersDark ? "dark" : "light") : themePreference
    document.documentElement.setAttribute("data-theme", resolvedTheme)
    window.localStorage.setItem("theme-preference", themePreference)
  }, [systemPrefersDark, themePreference])

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null)

    if (!sections.length) return

    let ticking = false

    const updateActiveSection = () => {
      const anchorOffset = window.innerHeight * 0.26
      let nextActive = sectionIds[0]
      let nearestOffset = Number.NEGATIVE_INFINITY

      sections.forEach((section) => {
        const sectionId = section.id as SectionId
        const top = section.getBoundingClientRect().top

        if (top <= anchorOffset && top > nearestOffset) {
          nearestOffset = top
          nextActive = sectionId
        }
      })

      setActiveSection((prev) => (prev === nextActive ? prev : nextActive))
    }

    const onScrollOrResize = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        updateActiveSection()
        ticking = false
      })
    }

    updateActiveSection()
    window.addEventListener("scroll", onScrollOrResize, { passive: true })
    window.addEventListener("resize", onScrollOrResize)
    return () => {
      window.removeEventListener("scroll", onScrollOrResize)
      window.removeEventListener("resize", onScrollOrResize)
    }
  }, [sectionIds])

  const scrollToSection = (id: SectionId) => {
    const section = document.getElementById(id)
    if (!section) return

    section.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" })
    setMobileMenuOpen(false)
  }

  const handleContactChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = event.target.name as keyof ContactFormState
    const value = event.target.value

    setContactForm((prev) => ({ ...prev, [field]: value }))
    if (contactStatus !== "idle") setContactStatus("idle")
  }

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { name, email, message } = contactForm
    if (!name.trim() || !email.trim() || !message.trim()) {
      setContactStatus("error")
      return
    }

    const mailSubject = `[Portfolio] Message from ${name.trim()}`
    const mailBody = [
      `Hi ${profile.name},`,
      "",
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      "",
      message.trim(),
      "",
      "Sent from your portfolio contact section.",
    ].join("\n")

    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`
    setContactStatus("sent")
    setContactForm(initialContactForm)
  }

  return (
    <>
      <Seo
        title="Muhammad Ahmed | Software Engineer, AI & Distributed Systems"
        description="Engineer contributing to scalable AI-native backend systems, optimizing for reliability, performance, and impact"
        pathname="/"
      />

      <div className="notion-root">
        <header className={scrolled ? "topbar is-scrolled" : "topbar"}>
          <div className="topbar-shell">
            <div className="crumbs">
              <button type="button" onClick={() => scrollToSection("about")}>
                {profile.name}
              </button>
              <span>/</span>
              <p>Portfolio</p>
            </div>

            <nav className="topbar-links" aria-label="Primary">
              {navSections.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={activeSection === item.id ? "is-active" : ""}
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <ThemeMenu className="topbar-theme-menu" value={themePreference} onChange={setThemePreference} />

            <button
              type="button"
              className={mobileMenuOpen ? "mobile-toggle is-open" : "mobile-toggle"}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>

          <div className={mobileMenuOpen ? "mobile-panel is-open" : "mobile-panel"}>
            <ThemeMenu className="mobile-theme-menu" value={themePreference} onChange={setThemePreference} />
            {navSections.map((item) => (
              <button
                key={item.id}
                type="button"
                className={activeSection === item.id ? "is-active" : ""}
                onClick={() => scrollToSection(item.id)}
              >
                <Icon name={item.icon} />
                {item.label}
              </button>
            ))}
          </div>
        </header>

        <div className="workspace">
          <aside className="left-rail">
            <div className="rail-card profile-card">
              <div className="profile-card-visual">
                <img src="/ahmed.webp" alt="Portrait of Muhammad Ahmed" width={360} height={460} loading="lazy" />
              </div>
              <span className="profile-card-label">Software Engineer</span>
              <h1>{profile.name}</h1>
              <small className="profile-card-location">
                <Icon name="location" />
                {profile.location}
              </small>
              <span className="profile-card-note">{profile.availability}</span>
            </div>

            <div className="rail-card">
              <p className="rail-heading">Contents</p>
              <nav aria-label="Section index" className="rail-nav">
                {navSections.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={activeSection === item.id ? "is-active" : ""}
                    onClick={() => scrollToSection(item.id)}
                  >
                    <Icon name={item.icon} />
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

          </aside>

          <main className="document">
            <motion.section
              id="about"
              className="doc-block about-block"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="page-cover" aria-hidden="true" />

              <div className="about-sheet">
                <div className="about-ribbon">
                  <div className="about-ribbon-mark">
                    <div className="page-icon about-page-icon">
                      <Icon name="profile" />
                    </div>
                    <figure className="about-mobile-portrait">
                      <img src="/ahmed.webp" alt="Portrait of Muhammad Ahmed" width={160} height={200} loading="eager" />
                      <span className="about-mobile-portrait-badge" aria-hidden="true">
                        <Icon name="profile" />
                      </span>
                    </figure>
                  </div>

                  <div className="about-ribbon-copy">
                    <h2>{profile.name}</h2>
                    <p>{profile.heroStatement}</p>
                  </div>
                </div>

                <div className="about-grid">
                  <div className="about-copy">
                    <p className="hero-support">{profile.shortBio}</p>
                  </div>

                  <aside className="about-ledger">
                    <div className="about-token-column">
                      {introBadges.map((badge) => (
                        <span key={badge.text} className="about-token-item">
                          <Icon name={badge.icon} />
                          <span>{badge.text}</span>
                        </span>
                      ))}
                    </div>

                    <div className="about-link-row" aria-label="Primary profile links">
                      <a href={profile.github} target="_blank" rel="noreferrer" className="about-link-minimal">
                        <Icon name="github" />
                        <span>GitHub</span>
                        <Icon name="external" className="icon about-link-trail" />
                      </a>
                      <a href={profile.linkedin} target="_blank" rel="noreferrer" className="about-link-minimal">
                        <Icon name="linkedin" />
                        <span>LinkedIn</span>
                        <Icon name="external" className="icon about-link-trail" />
                      </a>
                      <a href={profile.resume} target="_blank" rel="noreferrer" className="about-link-minimal">
                        <Icon name="resume" />
                        <span>Resume</span>
                        <Icon name="external" className="icon about-link-trail" />
                      </a>
                      <a href={`mailto:${profile.email}`} className="about-link-minimal">
                        <Icon name="mail" />
                        <span>Email</span>
                      </a>
                    </div>
                  </aside>
                </div>
              </div>
            </motion.section>

            <motion.section
              id="experience"
              className="doc-block"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <SectionHeading
                icon="timeline"
                title="Experience"
                note="A focused timeline of roles."
              />

              <div className="minimal-list">
                {experienceEntries.map((entry, index) => (
                  <motion.article
                    key={`${entry.period}-${entry.company}-${entry.role}`}
                    className="minimal-item"
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: index * 0.04, ease: "easeOut" }}
                  >
                    <header className="minimal-item-head">
                      <div className="minimal-item-brand">
                        <figure className="minimal-item-logo">
                          <img src={entry.logo} alt={entry.logoAlt} width={160} height={64} loading="lazy" />
                        </figure>
                        <div className="minimal-item-title">
                          <h3>{entry.role}</h3>
                          <p>
                            {entry.company} · {entry.location}
                          </p>
                        </div>
                      </div>

                      <p className="minimal-item-meta">{entry.period}</p>
                    </header>

                    <p className="minimal-item-summary">{entry.summary}</p>

                    <div className="minimal-item-highlights">
                      {entry.highlights.slice(0, 2).map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>

                    {entry.href ? (
                      <a href={entry.href} target="_blank" rel="noreferrer" className="minimal-item-link">
                        Reference
                        <Icon name="external" />
                      </a>
                    ) : null}
                  </motion.article>
                ))}
              </div>
            </motion.section>

            <motion.section
              id="education"
              className="doc-block"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <SectionHeading
                icon="education"
                title="Education"
                note="Academic milestones and focus areas."
              />

              <div className="minimal-list">
                {educationEntries.map((entry, index) => (
                  <motion.article
                    key={`${entry.period}-${entry.school}`}
                    className="minimal-item"
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
                  >
                    <header className="minimal-item-head">
                      <div className="minimal-item-brand">
                        <figure className="minimal-item-logo">
                          <img src={entry.logo} alt={entry.logoAlt} width={220} height={70} loading="lazy" />
                        </figure>
                        <div className="minimal-item-title">
                          <h3>{entry.degree}</h3>
                          <p>
                            {entry.school} · {entry.location}
                          </p>
                        </div>
                      </div>
                      <p className="minimal-item-meta">{entry.period}</p>
                    </header>

                    <p className="minimal-item-summary">{entry.note}</p>

                    <div className="minimal-item-highlights">
                      {entry.details.slice(0, 2).map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>

                    {entry.href ? (
                      <a href={entry.href} target="_blank" rel="noreferrer" className="minimal-item-link">
                        Institution
                        <Icon name="external" />
                      </a>
                    ) : null}
                  </motion.article>
                ))}
              </div>
            </motion.section>

            <motion.section
              id="projects"
              className="doc-block"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <SectionHeading
                icon="projects"
                title="Projects"
                note="My technical work in AI and systems."
              />

              <div className="project-list-minimal">
                {projectEntries.map((item, index) => (
                  <motion.article
                    key={item.title}
                    className="project-item-minimal"
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
                  >
                    <figure className="project-thumb-minimal">
                      <img
                        src={item.image}
                        alt={`${item.title} visual`}
                        width={1600}
                        height={900}
                        loading="lazy"
                        className={item.imageFit === "contain" ? "is-contain" : ""}
                      />
                    </figure>

                    <div className="project-content-minimal">
                      <h3>{item.title}</h3>
                      <p className="project-subtitle-minimal">{item.subtitle}</p>
                      <p className="project-summary-minimal">{item.summary}</p>
                      <div className="project-tags-minimal">
                        {item.tech.slice(0, 3).map((tech) => (
                          <span key={tech}>{tech}</span>
                        ))}
                      </div>
                    </div>

                    <a href={item.href} target="_blank" rel="noreferrer" className="project-link-minimal">
                      Source
                      <Icon name="external" />
                    </a>
                  </motion.article>
                ))}
              </div>
            </motion.section>

            <motion.section
              id="stack"
              className="doc-block"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <SectionHeading icon="stack" title="Stack" note="Core tools and technologies I reach for most." />

              <div className="stack-minimal-grid">
                {stackGroups.map((group, index) => (
                  <motion.article
                    key={group.title}
                    className="stack-minimal-card"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: index * 0.04, ease: "easeOut" }}
                  >
                    <h3>{group.title}</h3>
                    <p className="stack-minimal-note">{group.note}</p>
                    <div className="stack-minimal-tags">
                      {group.items.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.section>

            <motion.section
              id="contact"
              className="doc-block"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <SectionHeading
                icon="mail"
                title="Contact"
                note="Reach out to me."
              />

              <div className="contact-compose">
                <p className="contact-intro">Send a short message and your email for a reply.</p>

                <form className="contact-form" onSubmit={handleContactSubmit}>
                  <div className="contact-row">
                    <label className="contact-field">
                      <span>Name</span>
                      <input
                        name="name"
                        type="text"
                        placeholder="Your full name"
                        value={contactForm.name}
                        onChange={handleContactChange}
                        required
                      />
                    </label>

                    <label className="contact-field">
                      <span>Email</span>
                      <input
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={contactForm.email}
                        onChange={handleContactChange}
                        required
                      />
                    </label>
                  </div>

                  <label className="contact-field">
                    <span>Message</span>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Write a short message..."
                      value={contactForm.message}
                      onChange={handleContactChange}
                      required
                    />
                  </label>

                  <div className="contact-actions">
                    <button type="submit" className="contact-submit">
                      Send Message
                    </button>
                    <p className="contact-hint">Opens your default email app.</p>
                  </div>

                  {contactStatus === "error" ? (
                    <p className="contact-feedback is-error">Please fill all fields before sending.</p>
                  ) : null}
                  {contactStatus === "sent" ? (
                    <p className="contact-feedback is-sent">Draft opened successfully. Send it from your email client.</p>
                  ) : null}
                </form>
              </div>
            </motion.section>
          </main>
        </div>

        <footer className="footer-note">
          <p>(c) {new Date().getFullYear()} {profile.name}.</p>
        </footer>
      </div>
    </>
  )
}
