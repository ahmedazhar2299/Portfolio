import { profile } from "./profile"

export type IconName =
  | "profile"
  | "projects"
  | "timeline"
  | "education"
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
  { id: "education", label: "Education", icon: "education" as IconName },
  { id: "projects", label: "Projects", icon: "projects" as IconName },
  { id: "stack", label: "Stack", icon: "stack" as IconName },
  { id: "contact", label: "Contact", icon: "mail" as IconName },
] as const

export const introBadges = [
  { icon: "spark" as IconName, text: "Software Engineer" },
  { icon: "location" as IconName, text: "Los Angeles, California" },
  { icon: "timeline" as IconName, text: "AI + Distributed Systems" },
]

export const projectEntries = [
  {
    title: "Federated Learning on CIFAR-10",
    subtitle: "Distributed model training across IID and non-IID clients",
    summary: "Evaluated federated training behavior across different client distributions using Flower + TensorFlow.",
    result: "Built repeatable experiments for convergence, round-level accuracy, and training stability.",
    tech: ["Python", "Flower", "TensorFlow"],
    image: "/projects/covers/federated-network.svg",
    imageFit: "contain",
    visual: "Distributed Graph",
    imageCredit: "Wikimedia Commons",
    href: "https://github.com/ahmedazhar2299/federated-learning-cifar10-analysis",
  },
  {
    title: "Pix2CT",
    subtitle: "GAN reconstruction and transfer learning for medical CT analysis",
    summary: "Built a low-data medical imaging workflow with Pix2Pix reconstruction and MobileNetV2 classification.",
    result: "Packaged reconstruction and diagnosis into one reproducible deep learning pipeline.",
    tech: ["PyTorch", "Pix2Pix", "MobileNetV2"],
    image: "/projects/covers/medical-ct.jpg",
    imageFit: "cover",
    visual: "Medical CT",
    imageCredit: "Wikimedia Commons",
    href: "https://github.com/ahmedazhar2299/Pix2CT",
  },
  {
    title: "FFT-SIMD",
    subtitle: "High-performance transforms for large-scale polynomial computation",
    summary: "Implemented FFT/NTT workloads with SIMD acceleration for high-throughput polynomial operations.",
    result: "Measured clear speedups versus scalar implementations across representative workloads.",
    tech: ["C++", "FFT", "SIMD"],
    image: "/projects/covers/fft-spectrum.png",
    imageFit: "contain",
    visual: "Frequency Analysis",
    imageCredit: "Wikimedia Commons",
    href: "https://github.com/ahmedazhar2299/FFT-SIMD",
  },
  {
    title: "Sobel-Laplacian-SIMD",
    subtitle: "Edge detection kernels optimized for modern parallel hardware",
    summary: "Optimized Sobel and Laplacian kernels with ARM NEON intrinsics and memory-locality improvements.",
    result: "Created faster edge-detection kernels with practical low-latency systems patterns.",
    tech: ["C", "ARM NEON", "Image Processing"],
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
    period: "2026 - Present",
    role: "Research Assistant, Machine Learning for Stroke Neurorehabilitation",
    company: "Chapman University",
    location: "Orange, California",
    summary:
      "Designing ML workflows on wearable-sensor activity data to support clinically relevant, remote stroke rehabilitation monitoring.",
    highlights: [
      "Built feature-engineering and preprocessing pipelines for wearable multi-day rehabilitation data.",
      "Developed and evaluated activity-classification models for stroke-versus-healthy movement analysis.",
    ],
    logo: "/experience/logos/chapman-mark.png",
    logoAlt: "Chapman University brand mark",
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
      "Launched a high-availability policy microservice serving 100K+ requests/day across 40+ organizations.",
      "Reduced policy latency by 80% and shipped a RAG resume-to-job matcher with improved ranking precision.",
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
      "Built multi-tenant GenAI backend services supporting 50+ enterprise tenants and 8K+ daily active users.",
      "Improved workflow latency by 35% and strengthened deployments with observability and alerting guardrails.",
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
      "Built production REST endpoints and relational models for client-facing products.",
      "Implemented validation, pagination, and stable error contracts for smoother frontend integration.",
    ],
    logo: "/experience/logos/tintash.svg",
    logoAlt: "Tintash logo",
    href: "https://tintash.com/",
  },
]

export type EducationEntry = {
  period: string
  degree: string
  school: string
  location: string
  note: string
  details: string[]
  logo: string
  logoAlt: string
  href?: string
}

export const educationEntries: EducationEntry[] = [
  {
    period: "2025 - 2027",
    degree: "Master of Science in Computer Science (Artificial Intelligence)",
    school: "California State University, Long Beach",
    location: "Long Beach, California",
    note: "Graduate focus on AI systems, machine learning, and distributed software engineering.",
    details: ["Expected graduation: May 2027.", "Current GPA: 4.0, with advanced AI and distributed systems coursework."],
    logo: "/education/logos/csulb-emblem.png",
    logoAlt: "California State University, Long Beach LB mark",
    href: "https://www.csulb.edu/",
  },
  {
    period: "2019 - 2023",
    degree: "Bachelor of Science in Computer Science",
    school: "National University of Computer and Emerging Sciences (FAST-NUCES)",
    location: "Lahore, Pakistan",
    note: "Strong foundation in computer science fundamentals, systems, and applied machine learning.",
    details: ["Graduated: July 2023.", "Core CS foundation across systems, algorithms, networks, and databases."],
    logo: "/education/logos/nuces-mark.png",
    logoAlt: "National University of Computer and Emerging Sciences seal",
    href: "https://nu.edu.pk/",
  },
]

export type SkillGroup = {
  title: string
  note: string
  items: string[]
}

export const stackGroups: SkillGroup[] = [
  {
    title: "Backend + Distributed APIs",
    note: "Reliable service design for production workflows.",
    items: ["Node.js", "FastAPI", "PostgreSQL", "Redis", "REST APIs"],
  },
  {
    title: "AI Engineering + ML Systems",
    note: "Practical model pipelines with retrieval and evaluation.",
    items: ["Python", "RAG Pipelines", "PyTorch", "TensorFlow", "Embeddings"],
  },
  {
    title: "Cloud + Delivery Engineering",
    note: "Deployment safety, performance, and observability.",
    items: ["AWS", "Docker", "CI/CD", "Observability", "Performance Tuning"],
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
