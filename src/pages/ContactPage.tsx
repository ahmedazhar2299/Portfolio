import { Reveal } from "../components/Reveal"
import { Seo } from "../components/Seo"
import { contactChannels, profile } from "../data/profile"

export function ContactPage() {
  return (
    <div className="page">
      <Seo
        title="Contact"
        description="Contact Muhammad Ahmed for software engineering, AI platform, and backend architecture opportunities."
        pathname="/contact"
      />

      <header className="page-intro contact-intro">
        <Reveal>
          <span className="eyebrow">Contact</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1>
            Let’s build the next
            <span className="title-emphasis"> technically serious product.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p>
            I am currently open to full-time roles and ambitious collaborations in AI systems,
            backend engineering, and cloud platform development.
          </p>
        </Reveal>
      </header>

      <section className="contact-grid">
        {contactChannels.map((channel, index) => (
          <Reveal key={channel.label} delay={index * 0.04}>
            <article className="glass-panel contact-card">
              <span>{channel.label}</span>
              <h3>{channel.value}</h3>
              <a href={channel.href} target={channel.href.startsWith("/") ? undefined : "_blank"} rel="noreferrer">
                Open {channel.label}
              </a>
            </article>
          </Reveal>
        ))}
      </section>

      <Reveal className="glass-panel availability-card">
        <h2>Current Availability</h2>
        <p>{profile.availability}</p>
        <p>Based in {profile.location}. Remote-friendly and open to relocation for exceptional teams.</p>
      </Reveal>
    </div>
  )
}
