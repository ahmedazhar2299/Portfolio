import { motion, useReducedMotion } from "framer-motion"
import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react"
import { Seo } from "./components/Seo"
import { profile } from "./data/profile"
import {
  type IconName,
  aboutParagraphs,
  educationEntries,
  experienceEntries,
  introBadges,
  navSections,
  nowList,
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
  subject: string
  message: string
}

const initialContactForm: ContactFormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
}

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
    <header className="block-header">
      <p className="block-label">
        <Icon name={icon} />
        {title}
      </p>
      <p>{note}</p>
    </header>
  )
}

export default function App() {
  const reducedMotion = useReducedMotion()
  const [activeSection, setActiveSection] = useState<SectionId>("about")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
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
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null)

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]) {
          const id = visible[0].target.id as SectionId
          setActiveSection(id)
        }
      },
      {
        rootMargin: "-36% 0px -48% 0px",
        threshold: [0.25, 0.5, 0.75],
      },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
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

    const { name, email, subject, message } = contactForm
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setContactStatus("error")
      return
    }

    const mailSubject = `[Portfolio] ${subject.trim()}`
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
        title="Home"
        description="Muhammad Ahmed portfolio featuring backend architecture, AI systems, and cloud engineering work."
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

            <a href={profile.resume} target="_blank" rel="noreferrer" className="topbar-resume">
              Resume
            </a>

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
              <img src="/ahmed.webp" alt="Portrait of Muhammad Ahmed" width={360} height={420} loading="lazy" />
              <h1>{profile.name}</h1>
              <p>{profile.role}</p>
              <small>{profile.location}</small>
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

            <div className="rail-card quick-links">
              <p className="rail-heading">Links</p>
              <a href={profile.github} target="_blank" rel="noreferrer">
                <Icon name="github" />
                GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                <Icon name="linkedin" />
                LinkedIn
              </a>
              <a href={`mailto:${profile.email}`}>
                <Icon name="mail" />
                Email
              </a>
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

              <div className="page-title-row">
                <div className="page-icon">
                  <Icon name="profile" />
                </div>
                <div>
                  <h2>{profile.name}</h2>
                  <p>{profile.heroStatement}</p>
                </div>
              </div>

              <div className="badge-row">
                {introBadges.map((badge) => (
                  <span key={badge.text}>
                    <Icon name={badge.icon} />
                    {badge.text}
                  </span>
                ))}
              </div>

              <div className="about-layout">
                <div className="about-copy">
                  {aboutParagraphs.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>

                <div className="callout">
                  <p>
                    <Icon name="status" />
                    Currently
                  </p>
                  <ul>
                    {nowList.map((item) => (
                      <li key={item}>
                        <Icon name="check" />
                        {item}
                      </li>
                    ))}
                  </ul>
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
                note="Applied backend, GenAI, and research work across production engineering and healthcare ML."
              />

              <div className="experience-grid">
                {experienceEntries.map((entry, index) => (
                  <motion.article
                    key={`${entry.period}-${entry.company}-${entry.role}`}
                    className="experience-card"
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: index * 0.04, ease: "easeOut" }}
                  >
                    <header className="experience-head">
                      <div className="experience-brand">
                        <figure className="experience-logo">
                          <img src={entry.logo} alt={entry.logoAlt} width={160} height={64} loading="lazy" />
                        </figure>
                        <div className="experience-title">
                          <h3>{entry.role}</h3>
                          <h4>{entry.company}</h4>
                        </div>
                      </div>

                      <div className="experience-meta">
                        <p>{entry.period}</p>
                        <span>{entry.location}</span>
                      </div>
                    </header>

                    <p className="experience-summary">{entry.summary}</p>

                    <ul className="experience-list">
                      {entry.highlights.map((item) => (
                        <li key={item}>
                          <Icon name="check" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {entry.href ? (
                      <a href={entry.href} target="_blank" rel="noreferrer" className="experience-link">
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
                note="Academic foundation in artificial intelligence, systems, and core computer science."
              />

              <div className="education-grid">
                {educationEntries.map((entry, index) => (
                  <motion.article
                    key={`${entry.period}-${entry.school}`}
                    className="education-card"
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
                  >
                    <header className="education-head">
                      <figure className="education-logo">
                        <img src={entry.logo} alt={entry.logoAlt} width={220} height={70} loading="lazy" />
                      </figure>
                      <div className="education-meta">
                        <p>{entry.period}</p>
                        <span>{entry.location}</span>
                      </div>
                    </header>

                    <h3>{entry.degree}</h3>
                    <h4>{entry.school}</h4>
                    <p className="education-note">{entry.note}</p>

                    <ul className="education-list">
                      {entry.details.map((item) => (
                        <li key={item}>
                          <Icon name="check" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {entry.href ? (
                      <a href={entry.href} target="_blank" rel="noreferrer" className="education-link">
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
                note="Projects aligned with AI engineering and distributed systems."
              />

              <div className="project-grid">
                {projectEntries.map((item, index) => (
                  <motion.article
                    key={item.title}
                    className="project-card"
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
                  >
                    <div className="project-media">
                      <img
                        src={item.image}
                        alt={`${item.title} visual`}
                        width={1600}
                        height={900}
                        loading="lazy"
                        className={item.imageFit === "contain" ? "is-contain" : ""}
                      />
                      <span>{item.visual}</span>
                    </div>
                    <div className="project-body">
                      <h3>{item.title}</h3>
                      <p className="project-subtitle">{item.subtitle}</p>
                      <p>{item.summary}</p>
                      <p className="project-result">{item.result}</p>
                      <div className="tag-row">
                        {item.tech.map((tech) => (
                          <span key={tech}>{tech}</span>
                        ))}
                      </div>
                      <a href={item.href} target="_blank" rel="noreferrer">
                        Source
                        <Icon name="external" />
                      </a>
                      <small>{item.imageCredit}</small>
                    </div>
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
              <SectionHeading icon="stack" title="Stack" note="Core tools and engineering areas I rely on most." />

              <div className="stack-grid">
                {stackGroups.map((group) => (
                  <article key={group.title} className="stack-card">
                    <h3>{group.title}</h3>
                    <ul>
                      {group.items.map((item) => (
                        <li key={item}>
                          <Icon name="check" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </article>
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
                note="Send a direct note here. Links remain in the sidebar for quick access."
              />

              <div className="contact-compose">
                <p className="contact-intro">Drop a concise message and your preferred email, and I will get back to you.</p>

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
                    <span>Subject</span>
                    <input
                      name="subject"
                      type="text"
                      placeholder="Opportunity, project, or collaboration"
                      value={contactForm.subject}
                      onChange={handleContactChange}
                      required
                    />
                  </label>

                  <label className="contact-field">
                    <span>Message</span>
                    <textarea
                      name="message"
                      rows={7}
                      placeholder="Write your message..."
                      value={contactForm.message}
                      onChange={handleContactChange}
                      required
                    />
                  </label>

                  <div className="contact-actions">
                    <button type="submit" className="contact-submit">
                      Send Message
                    </button>
                    <p className="contact-hint">This opens your default email app with the message prefilled.</p>
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
          <p>(c) {new Date().getFullYear()} {profile.name}. Built with React and Framer Motion.</p>
        </footer>
      </div>
    </>
  )
}
