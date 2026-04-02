import { Link } from "react-router-dom"
import { PageIntro } from "../components/PageIntro"
import { Reveal } from "../components/Reveal"
import { Seo } from "../components/Seo"
import { WorkCard } from "../components/WorkCard"
import { caseStudies, profile } from "../data/profile"

const featuredStudies = caseStudies.slice(0, 3)

export function HomePage() {
  return (
    <div className="page">
      <Seo
        title="Muhammad Ahmed | Software Engineer, AI & Distributed Systems"
        description="I design and ship AI-native backend systems where reliability, speed, and product impact matter as much as model quality."
        pathname="/"
      />

      <PageIntro
        eyebrow="Digital Atelier"
        title={
          <>
            Engineering products that feel
            <span className="title-emphasis"> inevitable in production.</span>
          </>
        }
        lede={profile.heroStatement}
      />

      <section className="home-hero-grid">
        <Reveal className="glass-panel hero-note-card" delay={0.1}>
          <h2>Current Signal</h2>
          <p>{profile.shortBio}</p>
          <div className="inline-links">
            <Link to="/work">See Case Studies</Link>
            <Link to="/contact">Start Conversation</Link>
          </div>
        </Reveal>

        <Reveal className="portrait-card" delay={0.18}>
          <img src="/ahmed.webp" alt="Portrait of Muhammad Ahmed" width={900} height={1100} loading="eager" />
          <div>
            <p>{profile.location}</p>
            <p>{profile.availability}</p>
          </div>
        </Reveal>
      </section>

      <section className="section-block">
        <Reveal>
          <div className="section-heading-row">
            <span className="eyebrow">Selected Work</span>
            <Link to="/work">View all case studies</Link>
          </div>
        </Reveal>
        <div className="work-grid">
          {featuredStudies.map((item) => (
            <Reveal key={item.slug}>
              <WorkCard item={item} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}
