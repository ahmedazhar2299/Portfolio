import { useEffect, useMemo, useRef, useState } from "react"
import { navSections, type PortfolioSectionId } from "../data/portfolioSections"

export type GuideSectionRect = {
  top: number
  bottom: number
  height: number
  left: number
  width: number
}

const defaultSectionIds = navSections.map((section) => section.id) as PortfolioSectionId[]

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function measureRect(element: HTMLElement): GuideSectionRect {
  const rect = element.getBoundingClientRect()
  return {
    top: rect.top,
    bottom: rect.bottom,
    height: rect.height,
    left: rect.left,
    width: rect.width,
  }
}

export function useGuideBotSections(sectionIds: PortfolioSectionId[] = defaultSectionIds) {
  const [activeSection, setActiveSection] = useState<PortfolioSectionId>(sectionIds[0])
  const [activeRect, setActiveRect] = useState<GuideSectionRect | null>(null)
  const [changeToken, setChangeToken] = useState(0)
  const activeRef = useRef<PortfolioSectionId>(sectionIds[0])

  const sectionIdKey = useMemo(() => sectionIds.join("|"), [sectionIds])

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element instanceof HTMLElement)

    if (!elements.length) return undefined

    let frameId = 0

    const pickActiveSection = () => {
      const anchorLine = window.innerHeight * 0.3
      let nextSection = activeRef.current
      let nextRect: GuideSectionRect | null = null
      let bestScore = Number.NEGATIVE_INFINITY

      elements.forEach((element) => {
        const rect = measureRect(element)
        const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0))
        const visibleRatio = visibleHeight / Math.max(rect.height, 1)
        const anchorDistance = Math.abs(rect.top - anchorLine) / Math.max(window.innerHeight, 1)
        const pastAnchorBonus = rect.top <= anchorLine ? 1.4 : 0
        const score = visibleRatio * 8 + pastAnchorBonus - anchorDistance

        if (score > bestScore) {
          bestScore = score
          nextSection = element.id as PortfolioSectionId
          nextRect = rect
        }
      })

      if (nextSection !== activeRef.current) {
        activeRef.current = nextSection
        setActiveSection(nextSection)
        setChangeToken((current) => current + 1)
      }

      if (nextRect) setActiveRect(nextRect)
    }

    const schedulePick = () => {
      if (frameId) window.cancelAnimationFrame(frameId)
      frameId = window.requestAnimationFrame(pickActiveSection)
    }

    const observer = new IntersectionObserver(schedulePick, {
      root: null,
      rootMargin: "-14% 0px -42% 0px",
      threshold: [0, 0.08, 0.16, 0.3, 0.48, 0.66, 0.82],
    })

    elements.forEach((element) => observer.observe(element))

    const onScroll = () => schedulePick()
    const onResize = () => schedulePick()

    schedulePick()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId)
      observer.disconnect()
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
    }
  }, [sectionIdKey, sectionIds])

  useEffect(() => {
    const activeElement = document.getElementById(activeSection)
    if (!activeElement) return undefined

    let frameId = 0

    const updateRect = () => {
      frameId = 0
      setActiveRect(measureRect(activeElement))
    }

    const scheduleUpdate = () => {
      if (frameId) return
      frameId = window.requestAnimationFrame(updateRect)
    }

    scheduleUpdate()
    window.addEventListener("scroll", scheduleUpdate, { passive: true })
    window.addEventListener("resize", scheduleUpdate)

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId)
      window.removeEventListener("scroll", scheduleUpdate)
      window.removeEventListener("resize", scheduleUpdate)
    }
  }, [activeSection])

  return {
    activeSection,
    activeRect,
    changeToken,
    sectionIndex: clamp(sectionIds.indexOf(activeSection), 0, Math.max(sectionIds.length - 1, 0)),
  }
}
