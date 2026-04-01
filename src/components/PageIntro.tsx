import type { ReactNode } from "react"
import { Reveal } from "./Reveal"

type PageIntroProps = {
  eyebrow: string
  title: ReactNode
  lede: string
}

export function PageIntro({ eyebrow, title, lede }: PageIntroProps) {
  return (
    <header className="page-intro">
      <Reveal>
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <Reveal delay={0.05}>
        <h1>{title}</h1>
      </Reveal>
      <Reveal delay={0.1}>
        <p>{lede}</p>
      </Reveal>
    </header>
  )
}
