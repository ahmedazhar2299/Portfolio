import { useEffect, useMemo, useRef, useState } from "react"
import {
  guideSectionProfiles,
  guideSleepyCue,
  guideWelcomeCue,
  type GuideEmotion,
  type GuideSpeech,
} from "../data/guideBotMessages"
import type { PortfolioSectionId } from "../data/portfolioSections"

type UseGuideBotEmotionParams = {
  activeSection: PortfolioSectionId
  changeToken: number
  isHovered: boolean
  isNearby: boolean
  isEnabled: boolean
  lastInteractionAt: number
}

export function useGuideBotEmotion({
  activeSection,
  changeToken,
  isHovered,
  isNearby,
  isEnabled,
  lastInteractionAt,
}: UseGuideBotEmotionParams) {
  const [emotion, setEmotion] = useState<GuideEmotion>("greet")
  const [speech, setSpeech] = useState<GuideSpeech | null>(guideWelcomeCue)
  const [showSpeech, setShowSpeech] = useState(true)
  const [welcomeComplete, setWelcomeComplete] = useState(false)
  const [timeTick, setTimeTick] = useState(() => Date.now())
  const pausePromptRef = useRef<string | null>(null)
  const sleepyPromptShownRef = useRef(false)
  const nearbyPromptRef = useRef<string | null>(null)
  const restingEmotionRef = useRef<GuideEmotion>(guideSectionProfiles[activeSection].restingEmotion)

  const sectionProfile = guideSectionProfiles[activeSection]
  restingEmotionRef.current = sectionProfile.restingEmotion
  const idleMs = timeTick - lastInteractionAt
  const isPaused = idleMs > 2200 && idleMs < 7000
  const isSleepy = idleMs >= 7000

  useEffect(() => {
    if (!isEnabled) return undefined
    const intervalId = window.setInterval(() => setTimeTick(Date.now()), 700)
    return () => window.clearInterval(intervalId)
  }, [isEnabled])

  useEffect(() => {
    if (!isEnabled) return
    setWelcomeComplete(false)
    setSpeech(guideWelcomeCue)
    setShowSpeech(true)
    pausePromptRef.current = null
    sleepyPromptShownRef.current = false
    nearbyPromptRef.current = null
  }, [isEnabled])

  useEffect(() => {
    if (!isEnabled || welcomeComplete) return undefined

    setEmotion("greet")
    setSpeech(guideWelcomeCue)
    setShowSpeech(true)

    const speechTimer = window.setTimeout(() => setShowSpeech(false), 2600)
    const settleTimer = window.setTimeout(() => {
      setEmotion(restingEmotionRef.current)
      setWelcomeComplete(true)
    }, 2000)

    return () => {
      window.clearTimeout(speechTimer)
      window.clearTimeout(settleTimer)
    }
  }, [isEnabled, welcomeComplete])

  useEffect(() => {
    if (!isEnabled || !welcomeComplete) return undefined

    const arrivalText = sectionProfile.arrivalLines[changeToken % sectionProfile.arrivalLines.length]
    setEmotion(sectionProfile.arrivalEmotion)
    setSpeech({
      label: sectionProfile.label,
      text: arrivalText,
      action: sectionProfile.action,
    })
    setShowSpeech(true)
    pausePromptRef.current = null
    sleepyPromptShownRef.current = false
    nearbyPromptRef.current = null

    const speechTimer = window.setTimeout(() => setShowSpeech(false), activeSection === "contact" ? 3400 : 2300)
    const settleTimer = window.setTimeout(() => setEmotion(sectionProfile.restingEmotion), 1200)

    return () => {
      window.clearTimeout(speechTimer)
      window.clearTimeout(settleTimer)
    }
  }, [activeSection, changeToken, isEnabled, sectionProfile, welcomeComplete])

  useEffect(() => {
    if (!isEnabled || !welcomeComplete) return undefined

    if (isHovered) {
      setEmotion("happy")
      return undefined
    }

    if (isSleepy) {
      setEmotion("sleepy")

      if (!sleepyPromptShownRef.current) {
        sleepyPromptShownRef.current = true
        setSpeech(guideSleepyCue)
        setShowSpeech(true)
        const timer = window.setTimeout(() => setShowSpeech(false), 1800)
        return () => window.clearTimeout(timer)
      }
      return undefined
    }

    if (showSpeech) return undefined

    if (isNearby) {
      setEmotion(sectionProfile.nearbyEmotion)
      const nearbyKey = `${activeSection}:${changeToken}:nearby`

      if (nearbyPromptRef.current !== nearbyKey && activeSection !== "contact") {
        nearbyPromptRef.current = nearbyKey
        setSpeech({
          label: sectionProfile.label,
          text: sectionProfile.pauseLine,
          action: sectionProfile.action,
        })
        setShowSpeech(true)
        const timer = window.setTimeout(() => setShowSpeech(false), 1750)
        return () => window.clearTimeout(timer)
      }
      return undefined
    }

    if (isPaused) {
      setEmotion(sectionProfile.pauseEmotion)
      const pauseKey = `${activeSection}:${changeToken}`

      if (pausePromptRef.current !== pauseKey) {
        pausePromptRef.current = pauseKey
        setSpeech({
          label: sectionProfile.label,
          text: sectionProfile.pauseLine,
          action: sectionProfile.action,
        })
        setShowSpeech(true)
        const timer = window.setTimeout(() => setShowSpeech(false), 1900)
        return () => window.clearTimeout(timer)
      }
      return undefined
    }

    setEmotion(sectionProfile.restingEmotion)
    return undefined
  }, [
    activeSection,
    changeToken,
    isEnabled,
    isHovered,
    isNearby,
    isPaused,
    isSleepy,
    sectionProfile,
    showSpeech,
    welcomeComplete,
  ])

  const speechPayload = useMemo(() => (showSpeech ? speech : null), [showSpeech, speech])

  return {
    emotion,
    speech: speechPayload,
    setShowSpeech,
    isWelcoming: welcomeComplete === false,
  }
}
