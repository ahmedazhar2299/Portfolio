import { profile } from "./profile"

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

export const projectEntries = [
  {
    title: "Federated Learning on CIFAR-10",
    subtitle: "Distributed model training across IID and non-IID clients",
    summary:
      "Built a Flower-based federated learning setup to compare global convergence under different client data distributions and training strategies.",
    result:
      "Tracks round-level global accuracy and highlights how decentralized collaboration outperforms isolated local training.",
    tech: ["Python", "Flower", "TensorFlow", "Federated Learning"],
    image: "/projects/placeholders/federated-systems.svg",
    href: "https://github.com/ahmedazhar2299/federated-learning-cifar10-analysis",
  },
  {
    title: "Pix2CT",
    subtitle: "GAN reconstruction and transfer learning for medical CT analysis",
    summary:
      "Combined Pix2Pix conditional GAN reconstruction with MobileNetV2-based classification for brain CT workflows in low-data settings.",
    result:
      "Delivers realistic reconstruction and diagnostic classification stages in one reproducible deep learning pipeline.",
    tech: ["PyTorch", "TensorFlow", "Pix2Pix GAN", "MobileNetV2"],
    image: "/projects/placeholders/medical-ai.svg",
    href: "https://github.com/ahmedazhar2299/Pix2CT",
  },
  {
    title: "FFT-SIMD",
    subtitle: "High-performance transforms for large-scale polynomial computation",
    summary:
      "Implemented FFT and NTT workflows with SIMD acceleration to improve throughput for large integer polynomial multiplication.",
    result:
      "Demonstrates substantial speed improvements over scalar baselines using AVX/NEON vectorized compute paths.",
    tech: ["C++", "FFT", "SIMD", "Performance Engineering"],
    image: "/projects/placeholders/fft-simd.svg",
    href: "https://github.com/ahmedazhar2299/FFT-SIMD",
  },
  {
    title: "Sobel-Laplacian-SIMD",
    subtitle: "Edge detection kernels optimized for modern parallel hardware",
    summary:
      "Optimized Sobel and Laplacian image kernels with ARM NEON intrinsics to reduce branching and improve memory-locality in hot loops.",
    result:
      "Shows practical parallel systems optimization patterns for low-latency image processing workloads.",
    tech: ["C", "ARM NEON", "Image Processing", "Systems Optimization"],
    image: "/projects/placeholders/vision-simd.svg",
    href: "https://github.com/ahmedazhar2299/Sobel-Laplacian-SIMD",
  },
]

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
