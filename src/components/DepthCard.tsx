import type { ReactNode, PointerEvent } from "react"

export function DepthCard({ className, children }: { className: string; children: ReactNode }) {
  const reset = (element: HTMLElement) => { element.style.setProperty("--card-rx", "0deg"); element.style.setProperty("--card-ry", "0deg") }
  const move = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const element = event.currentTarget
    const bounds = element.getBoundingClientRect()
    element.style.setProperty("--card-rx", `${((event.clientY - bounds.top) / bounds.height - .5) * -3}deg`)
    element.style.setProperty("--card-ry", `${((event.clientX - bounds.left) / bounds.width - .5) * 4}deg`)
  }
  return <article className={`${className} depth-card`} onPointerMove={move} onPointerLeave={event => reset(event.currentTarget)}>{children}</article>
}
