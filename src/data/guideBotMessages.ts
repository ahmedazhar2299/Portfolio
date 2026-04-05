import type { PortfolioSectionId } from "./portfolioSections"

export type GuideEmotion =
  | "idle"
  | "attentive"
  | "steady"
  | "studious"
  | "inventive"
  | "greet"
  | "curious"
  | "guiding"
  | "excited"
  | "proud"
  | "focused"
  | "sleepy"
  | "celebrate"
  | "warm"
  | "happy"

export type GuideAction =
  | {
      kind: "section"
      label: string
      target: PortfolioSectionId
    }
  | {
      kind: "resume"
      label: string
    }

export type GuideSpeech = {
  label: string
  text: string
  action?: GuideAction
}

export type GuideSectionProfile = {
  label: string
  restingEmotion: GuideEmotion
  arrivalEmotion: GuideEmotion
  nearbyEmotion: GuideEmotion
  pauseEmotion: GuideEmotion
  arrivalLines: [string, ...string[]]
  pauseLine: string
  action?: GuideAction
}

export const guideWelcomeCue: GuideSpeech = {
  label: "Orbit",
  text: "Hi, I’m Orbit. Welcome in. I’ll guide you softly while you explore.",
  action: {
    kind: "section",
    label: "Meet me",
    target: "about",
  },
}

export const guideSleepyCue: GuideSpeech = {
  label: "Orbit",
  text: "I’m resting for a second. Nudge me any time.",
}

export const guideSectionProfiles: Record<PortfolioSectionId, GuideSectionProfile> = {
  about: {
    label: "About",
    restingEmotion: "attentive",
    arrivalEmotion: "greet",
    nearbyEmotion: "curious",
    pauseEmotion: "attentive",
    arrivalLines: [
      "This is the quickest way to understand the work.",
      "A short intro first, then the deeper systems story.",
    ],
    pauseLine: "This section is the fast overview before the heavier details.",
    action: {
      kind: "section",
      label: "See experience",
      target: "experience",
    },
  },
  experience: {
    label: "Experience",
    restingEmotion: "steady",
    arrivalEmotion: "guiding",
    nearbyEmotion: "steady",
    pauseEmotion: "steady",
    arrivalLines: [
      "These roles are where the systems had to hold up in production.",
      "This section is the strongest proof of execution.",
    ],
    pauseLine: "If you want reliability under real constraints, this is the section to read closely.",
    action: {
      kind: "section",
      label: "Open projects",
      target: "projects",
    },
  },
  education: {
    label: "Education",
    restingEmotion: "studious",
    arrivalEmotion: "studious",
    nearbyEmotion: "curious",
    pauseEmotion: "studious",
    arrivalLines: [
      "This is the academic layer behind the engineering work.",
      "The theory lives here, but it stays tied to practical systems work.",
    ],
    pauseLine: "This section fills in the AI foundation behind the production mindset.",
    action: {
      kind: "section",
      label: "See stack",
      target: "stack",
    },
  },
  projects: {
    label: "Projects",
    restingEmotion: "proud",
    arrivalEmotion: "excited",
    nearbyEmotion: "proud",
    pauseEmotion: "proud",
    arrivalLines: [
      "These are the builds I’m happiest to show off.",
      "This is where the systems work becomes concrete.",
    ],
    pauseLine: "If you want one section that brings the whole story together, this is it.",
    action: {
      kind: "section",
      label: "Next: stack",
      target: "stack",
    },
  },
  stack: {
    label: "Stack",
    restingEmotion: "inventive",
    arrivalEmotion: "inventive",
    nearbyEmotion: "inventive",
    pauseEmotion: "inventive",
    arrivalLines: [
      "This is the toolkit behind the systems and ML work.",
      "These are the technologies doing the heavy lifting.",
    ],
    pauseLine: "This section is more useful if you want the technical shape of the work quickly.",
    action: {
      kind: "section",
      label: "Go to contact",
      target: "contact",
    },
  },
  contact: {
    label: "Contact",
    restingEmotion: "warm",
    arrivalEmotion: "celebrate",
    nearbyEmotion: "warm",
    pauseEmotion: "warm",
    arrivalLines: [
      "We made it to the handoff point.",
      "If something here resonates, this is the easiest place to reach out.",
    ],
    pauseLine: "This is the cleanest place to start a conversation.",
    action: {
      kind: "resume",
      label: "Open resume",
    },
  },
}
