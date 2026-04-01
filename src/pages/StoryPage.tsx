import { PageIntro } from "../components/PageIntro"
import { Reveal } from "../components/Reveal"
import { Seo } from "../components/Seo"
import { storyChapters } from "../data/profile"

export function StoryPage() {
  return (
    <div className="page">
      <Seo
        title="Story"
        description="Career story, education arc, and engineering perspective of Muhammad Ahmed."
        pathname="/story"
      />

      <PageIntro
        eyebrow="Story"
        title={
          <>
            Career chapters shaped by
            <span className="title-emphasis"> systems, learning, and execution.</span>
          </>
        }
        lede="My path has moved from implementation-heavy delivery to architecture-level ownership across AI-enabled products and backend systems."
      />

      <section className="timeline-wrap">
        {storyChapters.map((chapter, index) => (
          <Reveal key={chapter.title} delay={index * 0.05}>
            <article className="glass-panel timeline-card">
              <header>
                <span>{chapter.period}</span>
                <h3>{chapter.title}</h3>
                <p>{chapter.place}</p>
              </header>
              <p>{chapter.note}</p>
            </article>
          </Reveal>
        ))}
      </section>

      <Reveal className="glass-panel quote-block">
        <p>
          "The best systems are readable by teammates, resilient under pressure, and boring in the
          right places."
        </p>
      </Reveal>
    </div>
  )
}
