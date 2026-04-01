import { PageIntro } from "../components/PageIntro"
import { Reveal } from "../components/Reveal"
import { Seo } from "../components/Seo"
import { WorkCard } from "../components/WorkCard"
import { caseStudies } from "../data/profile"

export function WorkPage() {
  return (
    <div className="page">
      <Seo
        title="Work"
        description="Selected case studies by Muhammad Ahmed spanning product engineering, systems, and research-to-production AI workflows."
        pathname="/work"
      />

      <PageIntro
        eyebrow="Case Studies"
        title={
          <>
            A focused portfolio of
            <span className="title-emphasis"> high-leverage engineering work.</span>
          </>
        }
        lede="Each case captures the constraints, technical decisions, and production outcomes behind the build."
      />

      <section className="work-grid dense">
        {caseStudies.map((item, index) => (
          <Reveal key={item.slug} delay={index * 0.03}>
            <WorkCard item={item} />
          </Reveal>
        ))}
      </section>
    </div>
  )
}
