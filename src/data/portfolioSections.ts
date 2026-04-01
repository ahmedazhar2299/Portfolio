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
  { id: "experience", label: "Experience", icon: "timeline" as IconName },
  { id: "projects", label: "Projects", icon: "projects" as IconName },
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
    image: "/projects/covers/federated-network.svg",
    imageFit: "contain",
    visual: "Distributed Graph",
    imageCredit: "Wikimedia Commons",
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
    image: "/projects/covers/medical-ct.jpg",
    imageFit: "cover",
    visual: "Medical CT",
    imageCredit: "Wikimedia Commons",
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
    image: "/projects/covers/fft-spectrum.png",
    imageFit: "contain",
    visual: "Frequency Analysis",
    imageCredit: "Wikimedia Commons",
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
    image: "/projects/covers/edge-detection.png",
    imageFit: "cover",
    visual: "Edge Detection",
    imageCredit: "Wikimedia Commons",
    href: "https://github.com/ahmedazhar2299/Sobel-Laplacian-SIMD",
  },
]

export type ExperienceEntry = {
  period: string
  role: string
  company: string
  location: string
  summary: string
  highlights: string[]
  logo: string
  logoAlt: string
  href?: string
}

export const experienceEntries: ExperienceEntry[] = [
  {
    period: "2025 - Present",
    role: "Research Assistant, Machine Learning for Stroke Neurorehabilitation",
    company: "Chapman University",
    location: "Orange, California",
    summary:
      "Designing ML workflows on wearable-sensor activity data to support clinically relevant, remote stroke rehabilitation monitoring.",
    highlights: [
      "Collect and curate naturalistic movement data from stroke and healthy cohorts using L5/S1 wearable sensor setups.",
      "Build feature-engineering and preprocessing workflows for multi-day time-series data, including segmentation and quality filtering.",
      "Develop and evaluate activity-classification models (RNN and baseline models) for stroke-versus-healthy movement differentiation.",
      "Translate model outputs into clinician-friendly analyses; related published dataset work in this research line reports up to 97.3% classification accuracy.",
    ],
    logo: "/experience/logos/chapman.gif",
    logoAlt: "Chapman University logo",
    href: "https://digitalcommons.chapman.edu/pt_data/3/",
  },
  {
    period: "Dec 2024 - Jul 2025",
    role: "Software Engineer",
    company: "Paismo",
    location: "Lahore, Pakistan",
    summary:
      "Owned backend architecture for attendance policy execution and AI-assisted hiring workflows on a high-throughput SaaS platform.",
    highlights: [
      "Designed and rolled out a high-availability attendance policy microservice serving 5K+ employees across 40+ organizations and 100K+ requests/day.",
      "Cut policy-evaluation latency by 80% through schema redesign, targeted indexing, query-plan tuning, and cache-aside reads.",
      "Built a RAG-based resume-to-job matching engine processing 1K+ resumes/day and indexing 50K+ embeddings.",
      "Added an offline evaluation harness with hybrid relevance scoring that improved top-K precision by 18%.",
    ],
    logo: "/experience/logos/paismo.png",
    logoAlt: "Paismo logo",
    href: "https://paismo.com/",
  },
  {
    period: "Jul 2023 - Dec 2024",
    role: "Software Engineer",
    company: "xiQ, Inc.",
    location: "Lahore, Pakistan",
    summary:
      "Built and operated backend services for a multi-tenant B2B GenAI email platform with strong tenant isolation and reliability guardrails.",
    highlights: [
      "Supported 50+ enterprise tenants and 8K+ daily active users across LLM-powered, API-driven workflow surfaces.",
      "Improved performance at 300K+ workflow executions/month using batching, pagination, connection pooling, and cache improvements.",
      "Reduced end-to-end latency by 35% through profiling and targeted database/query optimizations.",
      "Strengthened production operations with dashboards, alerts, and deploy checks, enabling 10+ safe deploys/week and 40% faster incident detection.",
    ],
    logo: "/experience/logos/xiq.svg",
    logoAlt: "xiQ logo",
    href: "https://xiqinc.com/",
  },
  {
    period: "Jul 2022 - Sep 2022",
    role: "Software Engineering Intern",
    company: "Tintash",
    location: "Lahore, Pakistan",
    summary:
      "Shipped backend features for client-facing products with a focus on clean API contracts and dependable data modeling.",
    highlights: [
      "Built production REST endpoints and relational data models used by web product teams.",
      "Implemented validation, pagination, and consistent error contracts to simplify downstream frontend integration.",
      "Contributed to maintainable service patterns that improved handoff quality for production delivery.",
    ],
    logo: "/experience/logos/tintash.svg",
    logoAlt: "Tintash logo",
    href: "https://tintash.com/",
  },
  {
    period: "2025 - 2027",
    role: "M.S. Computer Science (Artificial Intelligence)",
    company: "California State University, Long Beach",
    location: "Long Beach, California",
    summary:
      "Graduate study focused on AI systems, distributed computing, and production-grade software engineering.",
    highlights: [
      "Current GPA: 4.0.",
      "Coursework includes Distributed Computing, Machine Vision, Reinforcement Learning, and LLM-focused advanced AI topics.",
      "Applying graduate research and systems thinking directly to production engineering work.",
    ],
    logo: "/experience/logos/csulb.png",
    logoAlt: "California State University, Long Beach logo",
    href: "https://www.csulb.edu/",
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
