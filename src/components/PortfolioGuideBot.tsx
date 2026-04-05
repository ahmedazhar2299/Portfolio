import { motion, useReducedMotion } from "framer-motion"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  guideSectionProfiles,
  type GuideEmotion,
} from "../data/guideBotMessages"
import type { PortfolioSectionId } from "../data/portfolioSections"
import { useGuideBotEmotion } from "../hooks/useGuideBotEmotion"
import { type GuideSectionRect, useGuideBotSections } from "../hooks/useGuideBotSections"
import { robotEmotionPoses, type RobotEyeStyle, type RobotMouthStyle } from "./guideBotPoses"
import "./PortfolioGuideBot.css"

type RobotAnchor = {
  x: number
  y: number
  side: "left" | "right"
  pointTo: "left" | "right" | "up"
}

type GazeVector = {
  x: number
  y: number
}

type ViewportSize = {
  width: number
  height: number
}

type GuideTarget = "resume" | "contact" | "project" | "github" | "linkedin" | "email" | null
type ReactionGlyph = "spark" | "heart" | "document" | null

const DESKTOP_SIZE = { width: 156, height: 206 }
const MOBILE_SIZE = { width: 124, height: 166 }

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function useViewportSize() {
  const [viewport, setViewport] = useState<ViewportSize>(() => {
    if (typeof window === "undefined") return { width: 1440, height: 900 }
    return { width: window.innerWidth, height: window.innerHeight }
  })

  useEffect(() => {
    const onResize = () => setViewport({ width: window.innerWidth, height: window.innerHeight })
    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  return viewport
}

function useCursorTracking(onActivity: () => void) {
  const [cursor, setCursor] = useState<GazeVector>({ x: 0, y: 0 })
  const frameRef = useRef(0)
  const pendingRef = useRef<GazeVector>({ x: 0, y: 0 })

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      pendingRef.current = { x: event.clientX, y: event.clientY }
      onActivity()

      if (frameRef.current > 0) return

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = 0
        setCursor(pendingRef.current)
      })
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true })
    return () => {
      if (frameRef.current > 0) window.cancelAnimationFrame(frameRef.current)
      window.removeEventListener("pointermove", onPointerMove)
    }
  }, [onActivity])

  return cursor
}

function useGuideTarget(cursor: GazeVector, isMobile: boolean) {
  const [target, setTarget] = useState<GuideTarget>(null)

  useEffect(() => {
    if (isMobile) {
      setTarget(null)
      return undefined
    }

    let frameId = window.requestAnimationFrame(() => {
      const hovered = document.elementFromPoint(cursor.x, cursor.y)
      const nextTarget = hovered?.closest<HTMLElement>("[data-guide-target]")?.dataset.guideTarget as GuideTarget | undefined
      setTarget((current) => (current === (nextTarget ?? null) ? current : nextTarget ?? null))
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [cursor.x, cursor.y, isMobile])

  return target
}

function isAboutLinkTarget(target: GuideTarget): target is "github" | "linkedin" | "resume" | "email" {
  return target === "github" || target === "linkedin" || target === "resume" || target === "email"
}

function useBlink(emotion: GuideEmotion, enabled: boolean, reducedMotion: boolean) {
  const [isBlinking, setIsBlinking] = useState(false)

  useEffect(() => {
    if (enabled === false || reducedMotion) return undefined

    let primaryTimer = 0
    let secondaryTimer = 0
    let reopenTimer = 0

    const scheduleBlink = () => {
      const baseDelay = emotion === "sleepy" ? 2900 : emotion === "curious" ? 1700 : 2200
      primaryTimer = window.setTimeout(() => {
        setIsBlinking(true)
        reopenTimer = window.setTimeout(() => {
          setIsBlinking(false)
          if (emotion === "happy" || emotion === "curious") {
            secondaryTimer = window.setTimeout(() => {
              setIsBlinking(true)
              reopenTimer = window.setTimeout(() => {
                setIsBlinking(false)
                scheduleBlink()
              }, 110)
            }, 120)
            return
          }
          scheduleBlink()
        }, emotion === "sleepy" ? 180 : 110)
      }, baseDelay + Math.random() * 1600)
    }

    scheduleBlink()

    return () => {
      window.clearTimeout(primaryTimer)
      window.clearTimeout(secondaryTimer)
      window.clearTimeout(reopenTimer)
    }
  }, [emotion, enabled, reducedMotion])

  return isBlinking
}

function getRobotAnchor(
  section: PortfolioSectionId,
  viewport: ViewportSize,
  sectionRect: GuideSectionRect | null,
  isMobile: boolean,
): RobotAnchor {
  const size = isMobile ? MOBILE_SIZE : DESKTOP_SIZE
  const safeTop = isMobile ? 92 : 104
  const safeBottom = viewport.height - size.height - (isMobile ? 22 : 28)
  const measuredY = sectionRect == null
    ? viewport.height - size.height - (isMobile ? 18 : 24)
    : clamp(sectionRect.top + Math.min(sectionRect.height, isMobile ? 76 : 118), safeTop, safeBottom)
  const rightPeekX = sectionRect == null
    ? viewport.width - size.width - 10
    : Math.min(sectionRect.left + sectionRect.width - size.width * 0.42, viewport.width - size.width - 8)
  const leftPeekX = sectionRect == null
    ? -14
    : Math.max(sectionRect.left - size.width * 0.58, -size.width * 0.34)

  if (isMobile) {
    switch (section) {
      case "education":
      case "stack":
        return { x: Math.max(leftPeekX, -24), y: clamp(measuredY + 6, safeTop, safeBottom), side: "left", pointTo: "right" }
      case "contact":
        return {
          x: Math.min(rightPeekX, viewport.width - size.width - 18),
          y: clamp(measuredY - 10, safeTop, safeBottom),
          side: "right",
          pointTo: "left",
        }
      default:
        return {
          x: Math.min(rightPeekX, viewport.width - size.width - 8),
          y: clamp(measuredY, safeTop, safeBottom),
          side: "right",
          pointTo: "left",
        }
    }
  }

  switch (section) {
    case "about":
      return {
        x: rightPeekX,
        y: clamp(measuredY - 30, safeTop, safeBottom),
        side: "right",
        pointTo: "left",
      }
    case "experience":
      return {
        x: Math.min(rightPeekX + 6, viewport.width - size.width + 4),
        y: clamp(measuredY - 14, safeTop, safeBottom),
        side: "right",
        pointTo: "left",
      }
    case "education":
      return { x: leftPeekX, y: clamp(measuredY + 4, safeTop, safeBottom), side: "left", pointTo: "right" }
    case "projects":
      return {
        x: Math.min(rightPeekX + 4, viewport.width - size.width - 12),
        y: clamp(measuredY + 8, safeTop, safeBottom),
        side: "right",
        pointTo: "left",
      }
    case "stack":
      return { x: leftPeekX + 4, y: clamp(measuredY + 10, safeTop, safeBottom), side: "left", pointTo: "right" }
    case "contact":
      return {
        x: Math.min(rightPeekX - 18, viewport.width - size.width - 30),
        y: clamp(measuredY - 8, safeTop, safeBottom),
        side: "right",
        pointTo: "left",
      }
    default:
      return {
        x: rightPeekX,
        y: clamp(measuredY, safeTop, safeBottom),
        side: "right",
        pointTo: "left",
      }
  }
}

function renderBrows(emotion: GuideEmotion, isTickled: boolean) {
  if (isTickled) {
    return (
      <>
        <path d="M60 62c5-2 12-1 16 3" className="companion-bot-brow" />
        <path d="M104 65c4-4 11-5 16-3" className="companion-bot-brow" />
      </>
    )
  }

  if (emotion === "curious" || emotion === "studious") {
    return (
      <>
        <path d="M58 55c7-5 15-5 22-1" className="companion-bot-brow" />
        <path d="M101 58c6-5 13-6 20-2" className="companion-bot-brow" />
      </>
    )
  }

  if (emotion === "focused" || emotion === "steady") {
    return (
      <>
        <path d="M57 58c8-3 16-3 23 0" className="companion-bot-brow" />
        <path d="M100 58c8-3 16-3 23 0" className="companion-bot-brow" />
      </>
    )
  }

  if (emotion === "proud" || emotion === "inventive") {
    return (
      <>
        <path d="M58 56c6-4 14-4 21 1" className="companion-bot-brow" />
        <path d="M101 54c7-4 15-4 21 0" className="companion-bot-brow" />
      </>
    )
  }

  if (emotion !== "attentive") return null

  return (
    <>
      <path d="M58 58c7-2 15-2 22 1" className="companion-bot-brow" />
      <path d="M100 58c7-2 15-2 22 1" className="companion-bot-brow" />
    </>
  )
}

function getSpecialReaction(target: GuideTarget): { emotion: GuideEmotion } | null {
  switch (target) {
    case "github":
    case "linkedin":
    case "resume":
    case "email":
      return { emotion: "happy" }
    case "project":
      return { emotion: "celebrate" }
    case "contact":
      return { emotion: "warm" }
    default:
      return null
  }
}

function renderEyes(eyeStyle: RobotEyeStyle, gaze: GazeVector, isTickled: boolean) {
  const dx = gaze.x * 0.42
  const dy = gaze.y * 0.22

  if (isTickled) {
    return (
      <>
        <path d={`M56 ${82 + dy}c5 8 16 8 22 0`} className="companion-bot-eye-line" />
        <path d={`M102 ${82 + dy}c5 8 16 8 22 0`} className="companion-bot-eye-line" />
      </>
    )
  }

  if (eyeStyle === "sleepy") {
    return (
      <>
        <path d={`M${59 + dx} ${79 + dy}c5 3 13 3 18 0`} className="companion-bot-eye-line" />
        <path d={`M${103 + dx} ${79 + dy}c5 3 13 3 18 0`} className="companion-bot-eye-line" />
      </>
    )
  }

  if (eyeStyle === "attentive") {
    return (
      <>
        <path d={`M${57 + dx} ${78 + dy}c0-8 6-14 14-14h9c7 0 13 6 13 14 0 7-5 12-13 12h-9c-8 0-14-5-14-12z`} className="companion-bot-eye-solid" />
        <path d={`M${99 + dx} ${78 + dy}c0-8 6-14 14-14h9c7 0 13 6 13 14 0 7-5 12-13 12h-9c-8 0-14-5-14-12z`} className="companion-bot-eye-solid" />
      </>
    )
  }

  if (eyeStyle === "steady") {
    return (
      <>
        <path d={`M${56 + dx} ${79 + dy}c2-6 7-10 14-10h12c4 0 8 1 10 3-1 7-6 12-14 12H67c-6 0-10-2-11-5z`} className="companion-bot-eye-solid" />
        <path d={`M${97 + dx} ${79 + dy}c2-6 7-10 14-10h12c4 0 8 1 10 3-1 7-6 12-14 12h-11c-6 0-10-2-11-5z`} className="companion-bot-eye-solid" />
      </>
    )
  }

  if (eyeStyle === "studious") {
    return (
      <>
        <path d={`M${57 + dx} ${80 + dy}c1-7 6-13 14-13h10c6 0 11 4 13 10-2 5-7 8-14 8h-10c-7 0-12-2-13-5z`} className="companion-bot-eye-solid" />
        <path d={`M${99 + dx} ${82 + dy}c1-6 6-11 13-11h9c6 0 10 3 12 8-2 4-7 7-13 7h-9c-6 0-11-1.5-12-4z`} className="companion-bot-eye-solid" />
      </>
    )
  }

  if (eyeStyle === "inventive") {
    return (
      <>
        <rect x={58 + dx} y={67 + dy} width="22" height="24" rx="8" className="companion-bot-eye-solid" transform={`rotate(-5 ${69 + dx} ${79 + dy})`} />
        <rect x={102 + dx} y={67 + dy} width="22" height="24" rx="8" className="companion-bot-eye-solid" transform={`rotate(5 ${113 + dx} ${79 + dy})`} />
      </>
    )
  }

  if (eyeStyle === "beam") {
    return (
      <>
        <path d={`M56 ${79 + dy}c0-9 6-15 14-15h7c8 0 14 6 14 15 0 7-6 12-14 12h-7c-8 0-14-5-14-12z`} className="companion-bot-eye-solid" />
        <path d={`M97 ${79 + dy}c0-9 6-15 14-15h7c8 0 14 6 14 15 0 7-6 12-14 12h-7c-8 0-14-5-14-12z`} className="companion-bot-eye-solid" />
      </>
    )
  }

  if (eyeStyle === "smile") {
    return (
      <>
        <path d={`M${57 + dx} ${82 + dy}c2-11 9-17 18-17 8 0 15 6 17 17-4 4-11 6-17 6s-13-2-18-6z`} className="companion-bot-eye-solid" />
        <path d={`M${99 + dx} ${82 + dy}c2-11 9-17 18-17 8 0 15 6 17 17-4 4-11 6-17 6s-13-2-18-6z`} className="companion-bot-eye-solid" />
      </>
    )
  }

  if (eyeStyle === "curious") {
    return (
      <>
        <rect x={58 + dx} y={64 + dy} width="24" height="28" rx="8" className="companion-bot-eye-solid" />
        <rect x={102 + dx} y={69 + dy} width="20" height="22" rx="8" className="companion-bot-eye-solid" />
      </>
    )
  }

  if (eyeStyle === "proud") {
    return (
      <>
        <path d={`M${57 + dx} ${77 + dy}c2-7 8-11 15-11h10c2 0 4 .4 6 1.2-1 9-7 15-15 15h-7c-6 0-10-2-11-5.2 0 0 0 0 0 0z`} className="companion-bot-eye-solid" />
        <path d={`M${96 + dx} ${81 + dy}c1-8 7-15 15-15h8c4 0 7 1 9 3-1 7-7 13-14 13h-9c-5 0-8-.4-9-1z`} className="companion-bot-eye-solid" />
      </>
    )
  }

  if (eyeStyle === "focused") {
    return (
      <>
        <path d={`M${56 + dx} ${78 + dy}c2-5 7-8 13-8h11c4 0 7 1 9 3-1 7-6 12-13 12H66c-6 0-10-3-10-7z`} className="companion-bot-eye-solid" />
        <path d={`M${96 + dx} ${78 + dy}c2-5 7-8 13-8h11c4 0 7 1 9 3-1 7-6 12-13 12h-10c-6 0-10-3-10-7z`} className="companion-bot-eye-solid" />
      </>
    )
  }

  if (eyeStyle === "wide") {
    return (
      <>
        <rect x={56 + dx} y={62 + dy} width="28" height="30" rx="9" className="companion-bot-eye-solid" />
        <rect x={96 + dx} y={62 + dy} width="28" height="30" rx="9" className="companion-bot-eye-solid" />
      </>
    )
  }

  if (eyeStyle === "spark") {
    return (
      <>
        <path d="M71 63v11M65.5 68.5h11M67.5 65l7 7M74.5 65l-7 7" className="companion-bot-eye-line" />
        <path d="M109 63v11M103.5 68.5h11M105.5 65l7 7M112.5 65l-7 7" className="companion-bot-eye-line" />
      </>
    )
  }

  return (
    <>
      <rect x={58 + dx} y={66 + dy} width="24" height="24" rx="8" className="companion-bot-eye-solid" />
      <rect x={100 + dx} y={66 + dy} width="24" height="24" rx="8" className="companion-bot-eye-solid" />
    </>
  )
}

function renderMouth(mouthStyle: RobotMouthStyle, isTickled: boolean) {
  if (isTickled) {
    return <path d="M79 99c2 5 5 8 9 8 2 0 4-2 4-5 0 3 2 5 4 5 4 0 7-3 9-8M85 100c1 2 2 4 4 4M95 104c1 0 2-2 4-4" className="companion-bot-mouth" />
  }

  switch (mouthStyle) {
    case "beam":
      return <path d="M79 100c2 5 5 7 9 7 2 0 4-1 4-4 0 3 2 4 4 4 4 0 7-2 9-7" className="companion-bot-mouth" />
    case "grin":
      return <path d="M80 101c3 2 6 3 9 3 2 0 3-1 4-3 1 2 2 3 4 3 3 0 6-1 9-4" className="companion-bot-mouth" />
    case "cat":
      return <path d="M84 100c2 0 3 2 3 4 0 2 1 3 3 3 2 0 4-2 4-5 0 3 2 5 4 5 2 0 3-1 3-3 0-2 1-4 3-4" className="companion-bot-mouth" />
    case "smirk":
      return <path d="M82 101c2 2 4 3 6 3 2 0 3-1 4-2 1 2 3 3 6 3 2 0 5-1 8-4" className="companion-bot-mouth" />
    case "o":
      return <path d="M88 100c0-3 2-5 5-5s5 2 5 5-2 6-5 6-5-3-5-6z" className="companion-bot-mouth" />
    case "tiny":
      return <path d="M86 101c1 2 2 3 4 3 1 0 2-.6 3-2 1 1.4 2.2 2 3 2 2 0 3-1 4-3" className="companion-bot-mouth" />
    case "flat":
      return <path d="M84 101c3 1 9 1 12 0" className="companion-bot-mouth" />
    case "sleep":
      return <path d="M85 102c3-2 7-2 10 0" className="companion-bot-mouth" />
    default:
      return <path d="M83 100c2 3 4 4 6 4 2 0 3-1 4-3 1 2 2 3 4 3 2 0 4-1 6-4" className="companion-bot-mouth" />
  }
}

function getReactionGlyph(target: GuideTarget, emotion: GuideEmotion): ReactionGlyph {
  if (target === "contact") return "heart"
  if (target === "resume") return "document"
  if (target === "email") return "heart"
  if (target === "github" || target === "linkedin") return "spark"
  if (target === "project" || emotion === "celebrate") return "spark"
  return null
}

function renderReactionGlyph(glyph: ReactionGlyph) {
  switch (glyph) {
    case "heart":
      return (
        <g className="companion-bot-reaction companion-bot-reaction-heart">
          <path d="M0 4.5C0 1.9 2 0 4.2 0c1.6 0 3 .8 3.8 2.1C8.8.8 10.2 0 11.8 0 14 0 16 1.9 16 4.5c0 5-6.3 8.9-8 10.1C6.3 13.4 0 9.5 0 4.5z" />
        </g>
      )
    case "document":
      return (
        <g className="companion-bot-reaction companion-bot-reaction-document">
          <path d="M1.5 1.5h8l3 3v10a1.5 1.5 0 0 1-1.5 1.5H3A1.5 1.5 0 0 1 1.5 14.5z" />
          <path d="M9.5 1.5v3h3" />
          <path d="M4.5 8h5M4.5 10.5h5M4.5 13h3.5" />
        </g>
      )
    case "spark":
      return (
        <g className="companion-bot-reaction companion-bot-reaction-spark">
          <path d="M8 0v5M8 11v5M0 8h5M11 8h5M2.7 2.7l3.2 3.2M10.1 10.1l3.2 3.2M13.3 2.7l-3.2 3.2M5.9 10.1l-3.2 3.2" />
        </g>
      )
    default:
      return null
  }
}

function renderGreetingFace() {
  return (
    <g>
      <text x="90" y="88" textAnchor="middle" className="companion-bot-greeting-word">
        HELLO
      </text>
      <circle cx="53" cy="72" r="2.8" className="companion-bot-greeting-spark" />
      <circle cx="128" cy="72" r="2.8" className="companion-bot-greeting-spark" />
    </g>
  )
}

function RobotCharacter({
  emotion,
  gaze,
  pointTo,
  reducedMotion,
  isMobile,
  isBlinking,
  showSparkles,
  reactionGlyph,
  isTickled,
  isWelcoming,
  scrollRoll,
  isLinkJoying,
  isLinkFlipping,
  linkFlipDirection,
}: {
  emotion: GuideEmotion
  gaze: GazeVector
  pointTo: RobotAnchor["pointTo"]
  reducedMotion: boolean
  isMobile: boolean
  isBlinking: boolean
  showSparkles: boolean
  reactionGlyph: ReactionGlyph
  isTickled: boolean
  isWelcoming: boolean
  scrollRoll: number
  isLinkJoying: boolean
  isLinkFlipping: boolean
  linkFlipDirection: 1 | -1
}) {
  const basePose = robotEmotionPoses[emotion]
  const pose = isTickled
    ? { ...basePose, eyeStyle: "smile" as const, mouthStyle: "beam" as const }
    : isLinkJoying
      ? { ...basePose, eyeStyle: "beam" as const, mouthStyle: "grin" as const }
      : basePose
  const leftArmRotate = pose.leftArmRotate + (pointTo === "right" ? -16 : 0) + (isTickled ? -10 : 0)
  const rightArmRotate = pose.rightArmRotate + (pointTo === "left" ? 16 : 0) + (isTickled ? 10 : 0)
  const shellClassName = isMobile ? "companion-bot companion-bot-mobile" : "companion-bot"
  const leftHandWiggle = isTickled ? 18 : isLinkJoying ? 16 : emotion === "celebrate" || emotion === "excited" ? 10 : emotion === "greet" ? 8 : emotion === "happy" || emotion === "warm" ? 6 : emotion === "curious" || emotion === "inventive" ? 5 : emotion === "studious" ? 3 : emotion === "sleepy" ? 2 : 4
  const rightHandWiggle = isTickled ? 24 : isLinkJoying ? 22 : emotion === "greet" ? 30 : emotion === "celebrate" || emotion === "excited" ? 14 : emotion === "happy" || emotion === "warm" ? 9 : emotion === "curious" || emotion === "inventive" ? 6 : emotion === "studious" ? 3 : emotion === "sleepy" ? 2 : 4
  const headTiltDrift = emotion === "curious" || emotion === "studious" ? -3 : emotion === "inventive" ? 3 : emotion === "sleepy" ? -2 : emotion === "steady" ? 1 : 2
  const bodyDrift = isLinkJoying ? -5 : emotion === "celebrate" || emotion === "excited" ? -4 : emotion === "steady" ? -1 : emotion === "idle" ? -2 : -3
  const hoverSquirm = isTickled ? [0, -7, 2, -5, 0] : pose.floatPath
  const faceGlow = isTickled ? Math.max(pose.faceGlow, 0.86) : isLinkJoying ? Math.max(pose.faceGlow, 0.88) : pose.faceGlow
  const blush = isTickled ? Math.max(pose.blush, 0.48) : isLinkJoying ? Math.max(pose.blush, 0.4) : pose.blush
  const joyLegSwing = linkFlipDirection
  const welcomeMotion = isWelcoming && reducedMotion === false
  const greetingFaceVisible = welcomeMotion && isTickled === false
  const stageMotion = welcomeMotion
    ? {
        y: [10, -12, 2, -6, 0],
        rotate: [-10, 6, -4, 2, 0],
        scaleX: [0.9, 1.04, 0.99, 1.02, 1],
        scaleY: [1.08, 0.95, 1.03, 0.99, 1],
      }
    : {
        y: hoverSquirm,
        rotate: isTickled ? [0, -2, 2, -1, 0] : 0,
        scaleX: isTickled ? [1, 0.98, 1.02, 1] : emotion === "excited" || emotion === "celebrate" ? [1, 0.97, 1.03, 1] : [1, 1.01, 0.995, 1],
        scaleY: isTickled ? [1, 1.03, 0.99, 1] : emotion === "excited" || emotion === "celebrate" ? [1, 1.04, 0.98, 1] : [1, 0.995, 1.01, 1],
      }
  const featureMotion = isTickled
    ? {
        x: [0, -2, 2, -1, 0],
        y: [0, -1.4, 1.2, -0.8, 0],
        rotate: [0, -2.2, 2.2, -1.4, 0],
        scale: [1, 0.96, 1.06, 0.98, 1],
      }
    : emotion === "curious"
      ? {
          x: [0, 0.8, -0.4, 0],
          y: [0, -1.2, 0],
          rotate: [0, -2.6, 0],
          scale: [1, 1.02, 1],
        }
      : emotion === "attentive"
        ? {
            x: [0, 0.2, 0],
            y: [0, -0.8, 0],
            rotate: [0, -0.8, 0],
            scale: [1, 1.02, 1],
          }
        : emotion === "steady"
          ? {
              x: [0, 0.1, 0],
              y: [0, -0.2, 0],
              rotate: [0, 0.3, 0],
              scale: [1, 1.005, 1],
            }
          : emotion === "studious"
            ? {
                x: [0, 0.3, -0.2, 0],
                y: [0, -0.9, 0],
                rotate: [0, -1.8, 0],
                scale: [1, 1.015, 1],
              }
            : emotion === "inventive"
              ? {
                  x: [0, 0.8, -0.5, 0],
                  y: [0, -1, 0],
                  rotate: [0, 1.8, -0.6, 0],
                  scale: [1, 1.025, 1],
                }
      : emotion === "greet"
        ? {
            x: [0, 0.3, 0],
            y: [0, -1.6, 0],
            rotate: [0, -1.2, 0.8, 0],
            scale: [1, 1.03, 1],
          }
        : emotion === "happy" || emotion === "warm"
          ? {
              x: [0, 0.2, 0],
              y: [0, -1.1, 0],
              rotate: [0, 1.1, 0],
              scale: [1, 1.03, 1],
            }
          : emotion === "excited" || emotion === "celebrate"
            ? {
                x: [0, -0.5, 0.5, 0],
                y: [0, -2.2, 0],
                rotate: [0, -1.4, 1.4, 0],
                scale: [1, 1.05, 0.99, 1],
              }
            : emotion === "sleepy"
              ? {
                  x: [0, -0.2, 0],
                  y: [0, 0.8, 0],
                  rotate: [0, -1, 0],
                  scale: [1, 0.99, 1],
                }
              : {
                  x: [0, 0.2, 0],
                  y: [0, -0.4, 0],
                  rotate: [0, 0.6, 0],
                  scale: [1, 1.01, 1],
                }
  const featureDuration = isTickled ? 0.5 : isLinkJoying ? 0.9 : emotion === "excited" || emotion === "celebrate" ? 1.18 : pose.floatDuration * 0.84
  const cheekMotion = isTickled
    ? { scale: [1, 1.2, 0.94, 1.14, 1], opacity: [blush, blush + 0.18, blush + 0.04, blush + 0.16, blush] }
    : emotion === "happy" || emotion === "warm" || emotion === "greet"
      ? { scale: [1, 1.08, 1], opacity: [blush, blush + 0.12, blush] }
      : emotion === "attentive" || emotion === "inventive"
        ? { scale: [1, 1.05, 1], opacity: [blush, blush + 0.08, blush] }
      : emotion === "curious"
        ? { scale: [1, 1.04, 1], opacity: [blush, blush + 0.08, blush] }
        : { scale: [1, 1.02, 1], opacity: [blush, blush + 0.04, blush] }

  return (
    <motion.div
      animate={
        reducedMotion
          ? undefined
          : scrollRoll !== 0
            ? {
                rotate: [0, scrollRoll * 10, scrollRoll * -6, scrollRoll * 2, 0],
                x: [0, scrollRoll * 6, scrollRoll * -3, 0],
                y: [0, -4, 0],
              }
            : { rotate: 0, x: 0, y: 0 }
      }
      transition={{
        duration: scrollRoll !== 0 ? 0.56 : 0.24,
        ease: scrollRoll !== 0 ? [0.24, 0.9, 0.2, 1] : "easeOut",
      }}
      style={{ transformOrigin: "90px 176px" }}
    >
      <motion.div
        className={shellClassName}
        animate={reducedMotion ? undefined : stageMotion}
        transition={{
          duration: welcomeMotion ? 1.4 : isTickled ? 0.85 : pose.floatDuration,
          ease: welcomeMotion ? [0.2, 0.9, 0.2, 1] : "easeInOut",
          repeat: welcomeMotion ? 0 : Infinity,
        }}
      >
      <motion.div
        className="companion-bot-shadow"
        animate={
          reducedMotion
            ? undefined
            : isLinkFlipping
              ? { scaleX: [1, 1.16, 0.74, 1.06, 1], opacity: [0.28, 0.18, 0.08, 0.2, 0.28] }
            : welcomeMotion
              ? { scaleX: [0.76, 1.12, 1], opacity: [0.16, 0.34, 0.28] }
              : scrollRoll !== 0
                ? { scaleX: [1, 1.14, 0.94, 1], opacity: [0.28, 0.2, 0.24, 0.28] }
                : { scaleX: [1, 0.9, 1], opacity: [0.34, 0.18, 0.34] }
        }
        transition={{
          duration: isLinkFlipping ? 0.94 : welcomeMotion ? 1.2 : scrollRoll !== 0 ? 0.56 : pose.floatDuration,
          ease: isLinkFlipping || welcomeMotion || scrollRoll !== 0 ? [0.2, 0.9, 0.2, 1] : "easeInOut",
          repeat: isLinkFlipping || welcomeMotion || scrollRoll !== 0 ? 0 : Infinity,
        }}
      />

      <svg viewBox="0 0 180 220" className="companion-bot-svg" aria-hidden="true">
        <defs>
          <linearGradient id="companionBotShell" x1="8%" y1="2%" x2="86%" y2="100%">
            <stop offset="0%" className="companion-bot-stop-shell-top" />
            <stop offset="44%" className="companion-bot-stop-shell-mid" />
            <stop offset="100%" className="companion-bot-stop-shell-base" />
          </linearGradient>
          <linearGradient id="companionBotBodySoft" x1="12%" y1="0%" x2="84%" y2="100%">
            <stop offset="0%" className="companion-bot-stop-body-top" />
            <stop offset="100%" className="companion-bot-stop-body-base" />
          </linearGradient>
          <linearGradient id="companionBotFaceGlass" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="companion-bot-stop-face-top" />
            <stop offset="100%" className="companion-bot-stop-face-base" />
          </linearGradient>
          <radialGradient id="companionBotAccentGlow" cx="50%" cy="42%" r="65%">
            <stop offset="0%" className="companion-bot-stop-accent" stopOpacity="0.85" />
            <stop offset="100%" className="companion-bot-stop-accent" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="companionBotAccentSoft" cx="50%" cy="50%" r="65%">
            <stop offset="0%" className="companion-bot-stop-accent-soft" stopOpacity="0.95" />
            <stop offset="100%" className="companion-bot-stop-accent-soft" stopOpacity="0" />
          </radialGradient>
        </defs>

        <motion.ellipse
          cx="90"
          cy="208"
          rx="44"
          ry="10"
          className="companion-bot-floor-shadow"
          animate={reducedMotion ? undefined : { scaleX: [1, 0.9, 1], opacity: [0.3, 0.18, 0.3] }}
          transition={{ duration: pose.floatDuration, ease: "easeInOut", repeat: Infinity }}
        />

        <motion.g
          animate={
            reducedMotion
              ? { y: pose.bodyLift, rotate: pose.bodyRotate }
              : isLinkFlipping
                ? {
                    y: [pose.bodyLift + 4, pose.bodyLift + 9, pose.bodyLift - 8, pose.bodyLift - 2, pose.bodyLift + 1, pose.bodyLift],
                    rotate: [pose.bodyRotate, pose.bodyRotate - joyLegSwing * 4, pose.bodyRotate + joyLegSwing * 6, pose.bodyRotate - joyLegSwing * 2, pose.bodyRotate],
                    scaleX: [1, 1.04, 0.97, 1.02, 1],
                    scaleY: [1, 0.94, 1.04, 0.98, 1],
                  }
              : { y: [pose.bodyLift, pose.bodyLift + bodyDrift, pose.bodyLift], rotate: [pose.bodyRotate, pose.bodyRotate + 1.2, pose.bodyRotate] }
          }
          transition={{
            duration: isLinkFlipping ? 0.94 : pose.floatDuration * 0.92,
            ease: isLinkFlipping ? [0.2, 0.9, 0.2, 1] : "easeInOut",
            repeat: isLinkFlipping ? 0 : Infinity,
          }}
          style={{ transformOrigin: "90px 170px" }}
        >
	          <motion.g
	            animate={
	              reducedMotion
	                ? { rotate: leftArmRotate }
	                : {
	                    rotate:
	                      isLinkFlipping
	                        ? [leftArmRotate - 12, leftArmRotate - 36, leftArmRotate + 22, leftArmRotate - 18, leftArmRotate]
	                        : emotion === "greet"
	                        ? welcomeMotion
	                          ? [leftArmRotate - 16, leftArmRotate + 34, leftArmRotate - 18, leftArmRotate + 24, leftArmRotate - 4, leftArmRotate]
	                          : [leftArmRotate, leftArmRotate + 16, leftArmRotate - 6, leftArmRotate + 10, leftArmRotate]
	                        : [leftArmRotate, leftArmRotate + leftHandWiggle, leftArmRotate - leftHandWiggle * 0.42, leftArmRotate],
	                  }
	            }
	            transition={{
	              duration: isLinkFlipping ? 0.94 : emotion === "greet" ? (welcomeMotion ? 1.18 : 0.92) : pose.floatDuration * 0.78,
	              ease: isLinkFlipping || welcomeMotion ? [0.2, 0.9, 0.2, 1] : "easeInOut",
	              repeat: isLinkFlipping || welcomeMotion ? 0 : Infinity,
	            }}
	            style={{ transformOrigin: "54px 164px" }}
	          >
            <ellipse cx="52" cy="162" rx="9" ry="15" className="companion-bot-arm-shell" transform="rotate(10 52 162)" />
            <ellipse cx="45" cy="178" rx="6.2" ry="7.4" className="companion-bot-hand-shell" />
          </motion.g>

	          <motion.g
	            animate={
	              reducedMotion
	                ? { rotate: rightArmRotate }
	                : {
	                    rotate:
	                      isLinkFlipping
	                        ? [rightArmRotate + 16, rightArmRotate + 44, rightArmRotate - 24, rightArmRotate + 20, rightArmRotate]
	                        : emotion === "greet"
	                        ? welcomeMotion
	                          ? [rightArmRotate + 12, rightArmRotate - 62, rightArmRotate + 24, rightArmRotate - 48, rightArmRotate + 20, rightArmRotate]
	                          : [rightArmRotate, rightArmRotate - 34, rightArmRotate + 14, rightArmRotate - 28, rightArmRotate + 10, rightArmRotate]
	                        : [rightArmRotate, rightArmRotate - rightHandWiggle, rightArmRotate + rightHandWiggle * 0.42, rightArmRotate],
	                  }
	            }
	            transition={{
	              duration: isLinkFlipping ? 0.94 : emotion === "greet" ? (welcomeMotion ? 1.26 : 1.05) : pose.floatDuration * 0.78,
	              ease: isLinkFlipping || welcomeMotion ? [0.2, 0.9, 0.2, 1] : "easeInOut",
	              repeat: isLinkFlipping || welcomeMotion ? 0 : Infinity,
	            }}
	            style={{ transformOrigin: "126px 164px" }}
	          >
            <ellipse cx="128" cy="162" rx="9" ry="15" className="companion-bot-arm-shell" transform="rotate(-10 128 162)" />
            <ellipse cx="135" cy="178" rx="6.2" ry="7.4" className="companion-bot-hand-shell" />
          </motion.g>

          <path d="M72 152h36c18 0 30 11 30 28v20c0 13-9 20-18 20h-10c-7 0-13-5-16-11-3 6-9 11-16 11H60c-9 0-18-7-18-20v-20c0-17 12-28 30-28z" className="companion-bot-body-shell" />
          <path d="M69 156h42c14 0 24 10 24 24v13c0 11-9 19-19 19H64c-10 0-19-8-19-19v-13c0-14 10-24 24-24z" className="companion-bot-body-panel" />
          <path d="M83 184c2 4 5 6 7 6s5-2 7-6" className="companion-bot-body-panel-line" />
          <path d="M72 156c3-5 10-9 18-9s15 4 18 9" className="companion-bot-body-highlight" />
          <motion.g
            animate={
              reducedMotion
                ? undefined
                : isLinkFlipping
                  ? {
                      rotate: [0, -18 * joyLegSwing, 52 * joyLegSwing, -12 * joyLegSwing, 0],
                      y: [0, -5, -12, -3, 0],
                      scaleY: [1, 0.9, 0.78, 0.94, 1],
                    }
                  : { rotate: 0, y: 0, scaleY: 1 }
            }
            transition={{ duration: isLinkFlipping ? 1.02 : 0.24, ease: [0.2, 0.9, 0.2, 1] }}
            style={{ transformOrigin: "76px 196px" }}
          >
            <path d="M85 214h-8c-8 0-15-6-15-14v-6h15z" className="companion-bot-leg-stem" />
            <path d="M61 208h19c7 0 13 4 14 9H69c-5 0-8-4-8-9z" className="companion-bot-foot-shell" />
          </motion.g>
          <motion.g
            animate={
              reducedMotion
                ? undefined
                : isLinkFlipping
                  ? {
                      rotate: [0, 20 * joyLegSwing, -48 * joyLegSwing, 14 * joyLegSwing, 0],
                      y: [0, -4, -10, -2, 0],
                      scaleY: [1, 0.92, 0.8, 0.95, 1],
                    }
                  : { rotate: 0, y: 0, scaleY: 1 }
            }
            transition={{ duration: isLinkFlipping ? 1.02 : 0.24, ease: [0.2, 0.9, 0.2, 1] }}
            style={{ transformOrigin: "104px 196px" }}
          >
            <path d="M95 214h8c8 0 15-6 15-14v-6h-15z" className="companion-bot-leg-stem" />
            <path d="M86 217c1-5 7-9 14-9h19c0 5-3 9-8 9z" className="companion-bot-foot-shell" />
          </motion.g>
          <circle cx="90" cy="179" r="4.6" className="companion-bot-core-light" />
        </motion.g>

        <motion.g
          animate={
            reducedMotion
              ? { rotate: pose.headRotate, y: pose.headLift }
              : { rotate: [pose.headRotate, pose.headRotate + headTiltDrift, pose.headRotate], y: [pose.headLift, pose.headLift - 1.5, pose.headLift] }
          }
          transition={{ duration: pose.floatDuration * 0.9, ease: "easeInOut", repeat: Infinity }}
          style={{ transformOrigin: "90px 86px" }}
        >
          <rect x="18" y="24" width="144" height="116" rx="42" className="companion-bot-head-shell" />
          <rect x="10" y="56" width="16" height="34" rx="8" className="companion-bot-side-fin" />
          <rect x="154" y="56" width="16" height="34" rx="8" className="companion-bot-side-fin" />
          <path d="M28 34h124c12 0 22 10 22 22v10H6V56c0-12 10-22 22-22z" className="companion-bot-head-band" />
          <rect x="30" y="46" width="120" height="86" rx="28" className="companion-bot-faceplate" />
          <rect x="33" y="49" width="114" height="80" rx="26" className="companion-bot-face-rim" />
          <ellipse cx="78" cy="58" rx="16" ry="8" className="companion-bot-gloss" transform="rotate(-18 78 58)" />
          <ellipse cx="90" cy="88" rx="40" ry="30" fill="url(#companionBotAccentGlow)" className="companion-bot-face-ambient" style={{ opacity: faceGlow }} />
          <motion.g
            animate={reducedMotion ? undefined : cheekMotion}
            transition={{ duration: isTickled ? 0.54 : featureDuration, ease: "easeInOut", repeat: Infinity }}
            style={{ transformOrigin: "90px 92px" }}
          >
            <ellipse cx="66" cy="92" rx="12" ry="8" fill="url(#companionBotAccentSoft)" className="companion-bot-cheek" style={{ opacity: blush }} />
            <ellipse cx="114" cy="92" rx="12" ry="8" fill="url(#companionBotAccentSoft)" className="companion-bot-cheek" style={{ opacity: blush }} />
          </motion.g>
          <motion.g
            animate={reducedMotion ? undefined : featureMotion}
            transition={{ duration: featureDuration, ease: "easeInOut", repeat: Infinity }}
          >
            <motion.g
              animate={
                reducedMotion
                  ? { opacity: greetingFaceVisible ? 1 : 0 }
                  : {
                      opacity: greetingFaceVisible ? 1 : 0,
                      y: greetingFaceVisible ? 0 : -2,
                      scale: greetingFaceVisible ? 1 : 0.96,
                    }
              }
              transition={{ duration: 0.28, ease: [0.2, 0.9, 0.2, 1] }}
            >
              {greetingFaceVisible ? renderGreetingFace() : null}
            </motion.g>
            <motion.g
              animate={
                reducedMotion
                  ? { opacity: greetingFaceVisible ? 0 : 1 }
                  : {
                      opacity: greetingFaceVisible ? 0 : 1,
                      y: greetingFaceVisible ? 2 : 0,
                      scale: greetingFaceVisible ? 0.98 : 1,
                    }
              }
              transition={{ duration: 0.24, ease: [0.2, 0.9, 0.2, 1] }}
            >
              {renderBrows(emotion, isTickled)}
              <motion.g
                animate={
                  reducedMotion
                    ? undefined
                    : {
                        scaleY: isBlinking ? 0.1 : 1,
                        y: emotion === "sleepy" ? [0, 0.6, 0] : emotion === "focused" ? [0, -0.4, 0] : 0,
                      }
              }
              transition={{
                duration: isBlinking ? 0.1 : 0.18,
                ease: "easeInOut",
              }}
              style={{ transformOrigin: "90px 82px" }}
            >
              {renderEyes(pose.eyeStyle, gaze, isTickled)}
            </motion.g>
            <motion.g
                animate={
                  reducedMotion
                    ? undefined
                    : {
                        scaleX: isTickled ? [1, 1.08, 0.94, 1.04, 1] : emotion === "greet" || emotion === "happy" || emotion === "warm" ? [1, 1.03, 1] : 1,
                        y: isTickled ? [0, -0.8, 0.4, 0] : emotion === "sleepy" ? [0, 0.6, 0] : 0,
                      }
              }
              transition={{
                duration: featureDuration,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              style={{ transformOrigin: "94px 102px" }}
            >
              {renderMouth(pose.mouthStyle, isTickled)}
              </motion.g>
            </motion.g>
          </motion.g>
        </motion.g>

        {showSparkles ? (
          <motion.g
            className="companion-bot-sparkles"
            animate={
              reducedMotion
                ? undefined
                : {
                    opacity: [0.45, 1, 0.45],
                    scale: [0.92, 1.08, 0.92],
                    y: [0, -2, 0],
                  }
            }
            transition={{ duration: 1.4, ease: "easeInOut", repeat: Infinity }}
          >
            <path d="M34 56v10M29 61h10" />
            <path d="M147 48v10M142 53h10" />
            <path d="M133 98v7M129.5 101.5h7" />
            <circle cx="122" cy="40" r="2.5" className="companion-bot-spark-orb" />
          </motion.g>
        ) : null}

        {reactionGlyph != null ? (
          <motion.g
            transform="translate(128 24)"
            animate={
              reducedMotion
                ? undefined
                : {
                    y: [0, -4, 0],
                    scale: [0.92, 1, 0.92],
                    opacity: [0.6, 1, 0.6],
                  }
            }
            transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
          >
            {renderReactionGlyph(reactionGlyph)}
          </motion.g>
        ) : null}
      </svg>
      </motion.div>
    </motion.div>
  )
}

function RobotToggleIcon({ mode }: { mode: "hide" | "wake" }) {
  if (mode === "wake") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3v5M12 16v5M3 12h5M16 12h5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4v8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7.5 7.4a6 6 0 1 0 9 0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function PortfolioGuideBot() {
  const reducedMotion = Boolean(useReducedMotion())
  const viewport = useViewportSize()
  const isMobile = viewport.width <= 840
  const { activeSection, activeRect, changeToken } = useGuideBotSections()
  const [isEnabled, setIsEnabled] = useState<boolean>(() => {
    if (typeof window === "undefined") return true
    return window.localStorage.getItem("portfolio-companion-enabled") !== "false"
  })
  const [isHovered, setIsHovered] = useState(false)
  const [lastInteractionAt, setLastInteractionAt] = useState(() => Date.now())
  const [scrollRoll, setScrollRoll] = useState(0)
  const [linkJoy, setLinkJoy] = useState<{ active: boolean; direction: 1 | -1 }>({ active: false, direction: 1 })
  const lastCommitRef = useRef(0)
  const lastScrollYRef = useRef(0)
  const scrollResetRef = useRef<number | null>(null)
  const linkJoyResetRef = useRef<number | null>(null)
  const lastGuideTargetRef = useRef<GuideTarget>(null)

  const markInteraction = useCallback(() => {
    const now = Date.now()
    if (now - lastCommitRef.current < 220) return
    lastCommitRef.current = now
    setLastInteractionAt(now)
  }, [])

  const cursor = useCursorTracking(markInteraction)
  const guideTarget = useGuideTarget(cursor, isMobile)
  const anchor = useMemo(
    () => getRobotAnchor(activeSection, viewport, activeRect, isMobile),
    [activeRect, activeSection, isMobile, viewport],
  )

  const robotSize = isMobile ? MOBILE_SIZE : DESKTOP_SIZE
  const robotCenter = useMemo(
    () => ({ x: anchor.x + robotSize.width * 0.5, y: anchor.y + robotSize.height * 0.42 }),
    [anchor.x, anchor.y, robotSize.height, robotSize.width],
  )

  const distanceToCursor = useMemo(() => {
    if (isMobile) return Number.POSITIVE_INFINITY
    const dx = cursor.x - robotCenter.x
    const dy = cursor.y - robotCenter.y
    return Math.hypot(dx, dy)
  }, [cursor.x, cursor.y, isMobile, robotCenter.x, robotCenter.y])

  const isNearby = distanceToCursor < 220 && isHovered === false
  const { emotion, setShowSpeech, isWelcoming } = useGuideBotEmotion({
    activeSection,
    changeToken,
    isHovered,
    isNearby,
    isEnabled,
    lastInteractionAt,
  })
  const specialReaction = useMemo(() => getSpecialReaction(guideTarget), [guideTarget])
  const displayEmotion = specialReaction?.emotion ?? emotion
  const isBlinking = useBlink(displayEmotion, isEnabled, reducedMotion)
  const isAboutLinkHovered = isAboutLinkTarget(guideTarget)

  useEffect(() => {
    if (typeof window === "undefined") return
    window.localStorage.setItem("portfolio-companion-enabled", String(isEnabled))
  }, [isEnabled])

  useEffect(() => {
    if (typeof window === "undefined") return undefined

    const previousTarget = lastGuideTargetRef.current
    lastGuideTargetRef.current = guideTarget

    if (reducedMotion || isMobile || !isAboutLinkHovered) {
      setLinkJoy((current) => (current.active ? { ...current, active: false } : current))
      return undefined
    }
    if (guideTarget === previousTarget) return undefined

    const direction: 1 | -1 = guideTarget === "linkedin" || guideTarget === "resume" ? 1 : -1
    setLinkJoy({ active: true, direction })

    if (linkJoyResetRef.current != null) {
      window.clearTimeout(linkJoyResetRef.current)
    }

    linkJoyResetRef.current = window.setTimeout(() => {
      setLinkJoy((current) => ({ ...current, active: false }))
    }, 860)

    return () => {
      if (linkJoyResetRef.current != null) {
        window.clearTimeout(linkJoyResetRef.current)
      }
    }
  }, [guideTarget, isAboutLinkHovered, isMobile, reducedMotion])

  useEffect(() => {
    if (typeof window === "undefined") return
    lastScrollYRef.current = window.scrollY

    const onScroll = () => markInteraction()
    const onPointerDown = () => markInteraction()
    const onKeyDown = () => markInteraction()
    const onTouchStart = () => markInteraction()

    const onScrollWithRoll = () => {
      onScroll()
      if (reducedMotion || isMobile) return

      const currentY = window.scrollY
      const delta = currentY - lastScrollYRef.current
      if (Math.abs(delta) < 3) return

      const direction = delta > 0 ? 1 : -1
      lastScrollYRef.current = currentY
      setScrollRoll(direction)

      if (scrollResetRef.current != null) {
        window.clearTimeout(scrollResetRef.current)
      }

      scrollResetRef.current = window.setTimeout(() => {
        setScrollRoll(0)
      }, 220)
    }

    window.addEventListener("scroll", onScrollWithRoll, { passive: true })
    window.addEventListener("pointerdown", onPointerDown, { passive: true })
    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("touchstart", onTouchStart, { passive: true })

    return () => {
      window.removeEventListener("scroll", onScrollWithRoll)
      window.removeEventListener("pointerdown", onPointerDown)
      window.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("touchstart", onTouchStart)
      if (scrollResetRef.current != null) {
        window.clearTimeout(scrollResetRef.current)
      }
    }
  }, [isMobile, markInteraction, reducedMotion])

  const gaze = useMemo<GazeVector>(() => {
    if (isMobile) {
      return { x: anchor.side === "left" ? 1.4 : -1.4, y: 0 }
    }

    return {
      x: clamp((cursor.x - robotCenter.x) / 28, -4, 4),
      y: clamp((cursor.y - robotCenter.y) / 42, -3.2, 3.2),
    }
  }, [anchor.side, cursor.x, cursor.y, isMobile, robotCenter.x, robotCenter.y])

  const revealOffset = isHovered || isNearby || guideTarget != null ? 0 : anchor.side === "left" ? -12 : 12
  const flipTravel = anchor.side === "right" ? -1 : 1
  const showSparkles = isAboutLinkHovered || guideTarget === "project" || guideTarget === "contact" || displayEmotion === "celebrate" || isWelcoming
  const reactionGlyph = guideTarget != null ? getReactionGlyph(guideTarget, displayEmotion) : isWelcoming ? "heart" : null

  if (isEnabled === false) {
    return (
      <motion.button
        type="button"
        className="companion-bot-restore"
        onClick={() => {
          setIsEnabled(true)
          setShowSpeech(true)
          setLastInteractionAt(Date.now())
        }}
        initial={reducedMotion ? undefined : { opacity: 0, y: 14, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        aria-label="Wake robot guide"
      >
        <RobotToggleIcon mode="wake" />
        <span>Wake Orbit</span>
      </motion.button>
    )
  }

  return (
    <div className="companion-bot-layer" aria-label="Portfolio robot companion">
      <motion.div
        className={anchor.side === "left" ? "companion-bot-wrap is-left" : "companion-bot-wrap is-right"}
        animate={
          reducedMotion || !linkJoy.active
            ? { x: anchor.x + revealOffset, y: anchor.y, scaleX: 1, scaleY: 1 }
            : {
                x: [
                  anchor.x + revealOffset,
                  anchor.x + revealOffset + flipTravel * 4,
                  anchor.x + revealOffset - flipTravel * 2,
                  anchor.x + revealOffset + flipTravel * 1,
                  anchor.x + revealOffset,
                ],
                y: [anchor.y, anchor.y - 10, anchor.y - 16, anchor.y - 6, anchor.y],
                scaleX: [1, 0.98, 1.03, 0.995, 1],
                scaleY: [1, 1.05, 0.96, 1.02, 1],
              }
        }
        transition={
          reducedMotion || !linkJoy.active
            ? { type: "spring", stiffness: 150, damping: 18, mass: 0.72 }
            : { duration: 0.68, ease: [0.22, 0.9, 0.2, 1] }
        }
        style={{ transformOrigin: "50% 84%" }}
      >
        <div className="companion-bot-stage">
          <motion.div
            key={`${activeSection}-${changeToken}`}
            className="companion-bot-arrival"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10, scaleX: 0.94, scaleY: 1.06 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: [10, -6, 0], scaleX: [0.94, 1.03, 1], scaleY: [1.06, 0.97, 1] }}
            transition={{ duration: 0.55, ease: [0.2, 0.9, 0.2, 1] }}
          >
            <motion.button
              type="button"
              className="companion-bot-trigger"
              onMouseEnter={() => {
                setIsHovered(true)
                markInteraction()
              }}
              onMouseLeave={() => setIsHovered(false)}
              onFocus={() => {
                setIsHovered(true)
                markInteraction()
              }}
              onBlur={() => setIsHovered(false)}
              onClick={() => {
                setShowSpeech(true)
                markInteraction()
              }}
              whileHover={reducedMotion ? undefined : { scale: 1.03, rotate: anchor.side === "left" ? -2 : 2 }}
              whileTap={reducedMotion ? undefined : { scale: 0.98 }}
              aria-label={`Orbit companion near ${guideSectionProfiles[activeSection].label}`}
            >
              <RobotCharacter
                emotion={displayEmotion}
                gaze={gaze}
                pointTo={anchor.pointTo}
                reducedMotion={reducedMotion}
                isMobile={isMobile}
                isBlinking={isBlinking}
                showSparkles={showSparkles}
                reactionGlyph={reactionGlyph}
                isTickled={isHovered}
                isWelcoming={isWelcoming}
                scrollRoll={scrollRoll}
                isLinkJoying={isAboutLinkHovered}
                isLinkFlipping={false}
                linkFlipDirection={linkJoy.direction}
              />
            </motion.button>
          </motion.div>

          <motion.button
            type="button"
            className="companion-bot-power"
            onClick={() => setIsEnabled(false)}
            whileHover={reducedMotion ? undefined : { y: -1 }}
            whileTap={reducedMotion ? undefined : { scale: 0.96 }}
            aria-label="Hide robot guide"
          >
            <RobotToggleIcon mode="hide" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
