import { caseStudies, profile } from "./profile"

export type IconName =
  | "profile"
  | "projects"
  | "timeline"
  | "stack"
  | "mail"
  | "location"
  | "status"
  | "spark"
  | "external"
  | "check"
  | "resume"
  | "github"
  | "linkedin"

export const navSections = [
  { id: "about", label: "About", icon: "profile" as IconName },
  { id: "projects", label: "Projects", icon: "projects" as IconName },
  { id: "experience", label: "Experience", icon: "timeline" as IconName },
  { id: "stack", label: "Stack", icon: "stack" as IconName },
  { id: "contact", label: "Contact", icon: "mail" as IconName },
] as const

export const introBadges = [
  { icon: "spark" as IconName, text: "Software Engineer" },
  { icon: "location" as IconName, text: "Los Angeles, California" },
  { icon: "status" as IconName, text: "Open to AI + Backend Roles" },
]

export const aboutParagraphs = [
  "I build backend and AI systems that stay reliable under production load, not just in demos.",
  "My work centers on clear service boundaries, strong observability, and practical model integration that improves real user outcomes.",
]

export const nowList = [
  "Growing distributed backend systems for high-volume product workflows.",
  "Building retrieval and ranking pipelines for hiring and decision support use cases.",
  "Pursuing an M.S. in Computer Science (AI) at California State University, Long Beach.",
]

export const projectEntries = caseStudies.slice(0, 4).map((item, index) => ({
  title: item.title,
  subtitle: item.subtitle,
  summary: item.summary,
  result: item.outcomes[0] ?? "Delivered a measurable production improvement.",
  tech: item.tech.slice(0, 4),
  image: item.heroImage ?? (index % 2 === 0 ? "/projects/Roboink.webp" : "/projects/Artsy.webp"),
  href: item.links.repo,
}))

export const experienceEntries = [
  {
    period: "2024 - 2025",
    role: "Software Engineer",
    company: "Paismo",
    note: "Led backend services for attendance and hiring systems across enterprise customers.",
  },
  {
    period: "2023 - 2024",
    role: "Software Engineer",
    company: "xiQ, Inc.",
    note: "Built production backend services for a multi-tenant GenAI platform.",
  },
  {
    period: "2022",
    role: "Software Engineering Intern",
    company: "Tintash",
    note: "Delivered API endpoints and relational models for client applications.",
  },
  {
    period: "2025 - 2027",
    role: "M.S. Computer Science (AI)",
    company: "California State University, Long Beach",
    note: "Graduate study focused on AI systems, machine learning, and software architecture.",
  },
]

export const stackGroups = [
  {
    title: "Backend + Infra",
    items: ["Node.js", "Django", "FastAPI", "PostgreSQL", "Redis", "AWS", "GCP", "Docker"],
  },
  {
    title: "AI + Data",
    items: ["RAG Pipelines", "Embeddings", "PyTorch", "TensorFlow", "OpenCV", "Evaluation Workflows"],
  },
  {
    title: "Engineering",
    items: ["System Design", "Observability", "Performance Tuning", "CI/CD", "API Architecture"],
  },
]

export const contactLinks = [
  {
    icon: "mail" as IconName,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: "linkedin" as IconName,
    label: "LinkedIn",
    value: "linkedin.com/in/ahmedazhar2299",
    href: profile.linkedin,
  },
  {
    icon: "github" as IconName,
    label: "GitHub",
    value: "github.com/ahmedazhar2299",
    href: profile.github,
  },
  {
    icon: "resume" as IconName,
    label: "Resume",
    value: "Download PDF",
    href: profile.resume,
  },
]
