import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { navSections, type PortfolioSectionId } from "../data/portfolioSections"
import "./PortfolioGuideBot.css"

type Props = { activeSection: PortfolioSectionId; onNavigate: (id: PortfolioSectionId) => void }
type Mood = "hello" | "happy" | "wow" | "sleepy"

const sectionNotes: Record<PortfolioSectionId, string> = {
  about: "Hi, I’m Orbit. I can help you find Ahmed’s projects, research, or experience. My antenna also accepts high fives.",
  experience: "Ahmed works in research at Chapman and CSULB. Before that, he built production systems at Paismo and xiQ.",
  education: "Ahmed studies computer science at Cal State Long Beach, with an emphasis in AI and a 4.0 graduate GPA.",
  projects: "Choose a project to explore its approach and implementation. You can also filter by systems, machine learning, or research.",
  research: "Two IEEE COMPSAC publications cover reliable code generation and agentic ETL analysis. You can read the papers or copy a citation.",
  contact: "Have something in mind? Send Ahmed an email, or find him on GitHub, LinkedIn, and Google Scholar.",
}

const facts = [
  "Ahmed optimized PostgreSQL queries at Paismo, reducing latency by 40 percent at more than 100,000 daily requests.",
  "At xiQ, Ahmed helped scale asynchronous email workflows to more than 300,000 runs a month.",
  "Ahmed’s work spans stroke mobility research, Python dependency graphs, and SIMD image processing.",
  "Ahmed received the CSULB CECS Departmental Excellence Scholarship.",
  "Orbit’s official job title is Senior Navigation Bot. Self-appointed.",
]

function Robot({ mood, highFives, onPoke, onToggle, open }: { mood: Mood; highFives: number; onPoke: () => void; onToggle: () => void; open: boolean }) {
  const reduceMotion = useReducedMotion()
  const eyes = mood === "happy" ? <><path d="M35 50q7-8 14 0" /><path d="M65 50q7-8 14 0" /></> : mood === "sleepy" ? <><path d="M35 50h14" /><path d="M65 50h14" /></> : <><ellipse cx="42" cy="49" rx={mood === "wow" ? 6 : 5} ry={mood === "wow" ? 7 : 6} /><ellipse cx="72" cy="49" rx={mood === "wow" ? 6 : 5} ry={mood === "wow" ? 7 : 6} /></>
  return <motion.div className="orbit-robot" animate={reduceMotion ? { y: 0, rotate: 0 } : mood === "happy" ? { y: [0, -7, 0], rotate: [0, -2, 2, 0] } : { y: [0, -2, 0] }} transition={{ duration: mood === "happy" ? 0.55 : 2.8, repeat: reduceMotion || mood === "happy" ? 0 : Infinity }}>
    <button className="antenna-button" onClick={(event) => { event.stopPropagation(); onPoke() }} aria-label="Poke Orbit’s antenna"><span /></button>
    <button className="orbit-body-trigger" onClick={onToggle} aria-expanded={open} aria-label={open ? "Close Orbit guide" : "Open Orbit guide"}><svg viewBox="0 0 114 126" aria-hidden="true">
      <ellipse className="orbit-shadow" cx="57" cy="119" rx="34" ry="5" />
      <path className="orbit-ear" d="M17 43c-8 2-9 22 1 25l5-2V44Z" /><path className="orbit-ear" d="M97 43c8 2 9 22-1 25l-5-2V44Z" />
      <rect className="orbit-head" x="20" y="25" width="74" height="58" rx="25" />
      <rect className="orbit-face" x="28" y="34" width="58" height="39" rx="17" />
      <g className="orbit-eyes">{eyes}</g>
      {mood === "wow" ? <circle className="orbit-mouth-fill" cx="57" cy="63" r="4" /> : <path className="orbit-mouth" d={mood === "sleepy" ? "M52 63h10" : "M50 61q7 8 14 0"} />}
      <path className="orbit-body" d="M32 84q25-12 50 0l-5 28q-20 10-40 0Z" />
      <rect className="orbit-screen" x="43" y="88" width="28" height="16" rx="7" /><path className="orbit-heart" d="M51 95c0-4 5-5 6-1 1-4 6-3 6 1 0 4-6 7-6 7s-6-3-6-7Z" />
      <path className="orbit-arm" d="M34 89Q20 91 20 104" /><path className="orbit-arm" d="M80 89q14 2 14 15" />
      <path className="orbit-foot" d="M43 111v7H31" /><path className="orbit-foot" d="M71 111v7h12" />
    </svg></button>
    {highFives > 0 && <motion.span className="high-five-badge" initial={{ scale: 0 }} animate={{ scale: 1 }}>+{highFives}</motion.span>}
  </motion.div>
}

export function PortfolioGuideBot({ activeSection, onNavigate }: Props) {
  const reduceMotion = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mood, setMood] = useState<Mood>("hello")
  const [message, setMessage] = useState(sectionNotes.about)
  const [factIndex, setFactIndex] = useState(0)
  const [highFives, setHighFives] = useState(0)
  const moodTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(moodTimer.current), [])

  useEffect(() => { setMessage(sectionNotes[activeSection]); setMood("hello") }, [activeSection])
  useEffect(() => {
    if (open) return
    const timer = window.setTimeout(() => setMood("sleepy"), 12000)
    return () => window.clearTimeout(timer)
  }, [open, activeSection])

  const highFive = () => {
    setHighFives((count) => count + 1); setMood("happy"); setMessage("High five received. Excellent form.")
    clearTimeout(moodTimer.current)
    moodTimer.current = setTimeout(() => setMood("hello"), 900)
  }
  const nextFact = () => {
    setMessage(facts[factIndex]); setFactIndex((factIndex + 1) % facts.length); setMood("wow")
  }

  if (hidden) return <button className="orbit-wake" onClick={() => { setHidden(false); setOpen(true) }} aria-label="Wake Orbit"><span>●</span> Wake Orbit</button>

  return <aside className={open ? "orbit-companion is-open" : "orbit-companion"} aria-label="Orbit, portfolio guide">
    <AnimatePresence>
      {open && <motion.div className="orbit-panel" initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.98 }}>
        <header><div><span>ORBIT / GUIDE</span><strong>{navSections.find((item) => item.id === activeSection)?.label}</strong></div><button onClick={() => setOpen(false)} aria-label="Close Orbit panel">×</button></header>
        <p>{message}</p>
        <div className="orbit-nav" aria-label="Jump to a section">{navSections.map((item) => <button key={item.id} className={activeSection === item.id ? "is-active" : ""} onClick={() => { onNavigate(item.id); setOpen(false) }}>{item.label}</button>)}</div>
        <div className="orbit-actions"><button onClick={highFive}>High five <span>✦</span></button><button onClick={nextFact}>Tell me something</button></div>
        <button className="orbit-hide" onClick={() => setHidden(true)}>Send Orbit to recharge</button>
      </motion.div>}
    </AnimatePresence>
    <div className="orbit-trigger">
      {!open && <span className="orbit-hint">Need a guide?</span>}
      <Robot mood={mood} highFives={highFives} onPoke={highFive} onToggle={() => { setOpen(!open); setMood("hello") }} open={open} />
    </div>
  </aside>
}
