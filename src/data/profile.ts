export type CaseStudy = {
  slug: string
  title: string
  subtitle: string
  category: "Product" | "Systems" | "Research"
  summary: string
  challenge: string
  approach: string[]
  outcomes: string[]
  tech: string[]
  links: {
    repo: string
    demo?: string
  }
  heroImage?: string
}

export type StoryChapter = {
  period: string
  title: string
  place: string
  note: string
}

export type Experiment = {
  name: string
  label: "AI" | "Performance" | "Tooling" | "Web"
  summary: string
  status: "Shipped" | "In Progress" | "Exploring"
  link: string
}

export const profile = {
  name: "Muhammad Ahmed",
  role: "Software Engineer",
  location: "Los Angeles, California",
  email: "ahmed.azhar2299@gmail.com",
  phone: "+1 (562) 577-5028",
  github: "https://github.com/ahmedazhar2299",
  linkedin: "https://www.linkedin.com/in/ahmedazhar2299/",
  resume: "/resume/resume.pdf",
  availability: "Focused on AI-native backend architecture and distributed systems engineering.",
  heroStatement:
    "I design and ship AI-native backend systems where reliability, speed, and product impact matter as much as model quality.",
  shortBio:
    "From microservices to research-to-production ML workflows, I build platforms that convert complex ideas into measurable outcomes.",
}

export const storyChapters: StoryChapter[] = [
  {
    period: "2024 - 2025",
    title: "Software Engineer · Paismo",
    place: "Lahore, Pakistan",
    note: "Led a high-availability attendance policy microservice for 5K+ employees across 40+ organizations and built a RAG resume-to-job matching engine processing 1K+ resumes/day.",
  },
  {
    period: "2023 - 2024",
    title: "Software Engineer · xiQ, Inc.",
    place: "Lahore, Pakistan",
    note: "Built backend services for a multi-tenant GenAI platform with 50+ enterprise tenants and 8K+ daily active users, while improving workflow latency and deploy safety.",
  },
  {
    period: "2022",
    title: "Software Engineering Intern · Tintash",
    place: "Lahore, Pakistan",
    note: "Shipped REST endpoints, relational models, and integration-ready error contracts for client-facing products.",
  },
  {
    period: "2025 - 2027",
    title: "M.S. Computer Science (AI)",
    place: "California State University, Long Beach",
    note: "Focused on AI, computer vision, and robust systems thinking. Current GPA: 4.0.",
  },
]

export const caseStudies: CaseStudy[] = [
  {
    slug: "attendance-policy-engine",
    title: "Attendance Policy Engine",
    subtitle: "High-availability policy microservice for workforce platforms",
    category: "Product",
    summary:
      "Redesigned attendance policy execution into a resilient service layer that scaled to 100K+ requests/day without degrading response times.",
    challenge:
      "Existing policy evaluation paths were slow, hard to audit, and brittle under growing customer-specific rules.",
    approach: [
      "Introduced a dedicated Node.js + SQL service boundary with strict domain contracts.",
      "Reworked schema and indexing strategy around high-frequency policy reads.",
      "Added cache-aside read paths for repeated policy lookups.",
      "Instrumented latency and query-plan monitoring to continuously enforce performance budgets.",
    ],
    outcomes: [
      "80% latency reduction in policy evaluation endpoints.",
      "Stable throughput for 5K+ employees across 40+ organizations.",
      "Improved traceability for policy decisions in production workflows.",
    ],
    tech: ["Node.js", "SQL", "Caching", "Observability"],
    links: {
      repo: "https://github.com/ahmedazhar2299",
    },
  },
  {
    slug: "resume-rag-matching",
    title: "Resume-to-Job RAG Matching",
    subtitle: "Semantic retrieval and ranking pipeline for hiring workflows",
    category: "Product",
    summary:
      "Built a hybrid retrieval and ranking system that mapped resumes to job requirements with stronger relevance and measurable precision gains.",
    challenge:
      "Keyword-first matching produced weak relevance and poor ranking quality for nuanced skill and experience alignment.",
    approach: [
      "Implemented ingestion pipelines for structured resume parsing and embedding generation.",
      "Indexed 50K+ embeddings with vector retrieval and metadata filters.",
      "Combined semantic retrieval with hybrid relevance scoring for final ranking.",
      "Created offline evaluation harnesses to measure top-K precision against baselines.",
    ],
    outcomes: [
      "Scaled to 1K+ resumes processed per day.",
      "18% improvement in top-K precision.",
      "Enabled repeatable tuning with experiment traceability.",
    ],
    tech: ["RAG", "Embeddings", "Ranking", "Evaluation"],
    links: {
      repo: "https://github.com/ahmedazhar2299",
    },
  },
  {
    slug: "brain-ct-reconstruction",
    title: "Brain CT Reconstruction and Classification",
    subtitle: "GAN reconstruction + transfer-learning classifier",
    category: "Research",
    summary:
      "Developed an end-to-end medical imaging pipeline that combined conditional GAN reconstruction and transfer learning for robust classification under data scarcity.",
    challenge:
      "Limited labeled medical data constrained model generalization and increased overfitting risk.",
    approach: [
      "Built Python + OpenCV preprocessing and quality control workflows.",
      "Trained conditional GAN models to synthesize realistic slices and expand training diversity.",
      "Fine-tuned transfer-learning classifiers with stratified validation.",
      "Tracked SSIM/PSNR for reconstruction and AUC for downstream classification.",
    ],
    outcomes: [
      "Expanded scarce labeled dataset by approximately 4x.",
      "Raised AUC by 0.07 over real-only baseline.",
      "Reduced overfitting while preserving diagnostic signal.",
    ],
    tech: ["Python", "PyTorch", "TensorFlow", "OpenCV"],
    links: {
      repo: "https://github.com/ahmedazhar2299/Pix2CT",
    },
    heroImage: "/projects/Artsy.webp",
  },
  {
    slug: "roboink-orchestration",
    title: "RoboInk Orchestration",
    subtitle: "Event-driven printing workflow on AWS",
    category: "Systems",
    summary:
      "Designed an asynchronous print orchestration system that converted SVG assets into production-ready G-code with durable queueing semantics.",
    challenge:
      "Print jobs required reliable conversion, scheduling, and retries without duplicate execution or silent failure.",
    approach: [
      "Architected event-driven job flow using Django, S3, SQS, and RDS.",
      "Added idempotency keys, visibility-timeout-aware retries, and dead-letter handling.",
      "Instrumented processing metrics and failure alerts for operational control.",
      "Standardized job state transitions for debugging and auditing.",
    ],
    outcomes: [
      "35% reduction in failed print runs.",
      "Sustained throughput of 20 jobs/hour in testing.",
      "Operational clarity through explicit queue and state telemetry.",
    ],
    tech: ["Django", "AWS S3", "AWS SQS", "AWS RDS"],
    links: {
      repo: "https://github.com/ahmedazhar2299",
      demo: "https://roboink.de/",
    },
    heroImage: "/projects/Roboink.webp",
  },
  {
    slug: "simd-edge-detection",
    title: "SIMD Edge Detection Suite",
    subtitle: "NEON and OpenMP acceleration for image kernels",
    category: "Systems",
    summary:
      "Explored low-level image processing acceleration with SIMD and parallel execution strategies for practical throughput gains.",
    challenge:
      "Scalar edge-detection pipelines became compute-bound at higher resolutions and batch sizes.",
    approach: [
      "Implemented SIMD intrinsics for Sobel and Laplacian kernels.",
      "Parallelized workloads with OpenMP for multi-core execution.",
      "Reduced branching and improved memory locality in hot paths.",
      "Benchmarked against scalar baselines across representative workloads.",
    ],
    outcomes: [
      "Significant runtime improvements over scalar implementations.",
      "Better cache behavior and higher pixel throughput.",
      "Reusable optimization patterns for future systems work.",
    ],
    tech: ["C", "C++", "ARM NEON", "OpenMP"],
    links: {
      repo: "https://github.com/ahmedazhar2299/Sobel-Laplacian-OpenMP",
    },
  },
]

export const experiments: Experiment[] = [
  {
    name: "Federated CIFAR-10 Analysis",
    label: "AI",
    summary:
      "Compared IID vs non-IID client distributions and measured convergence behavior under realistic federated learning constraints.",
    status: "Shipped",
    link: "https://github.com/ahmedazhar2299/federated-learning-cifar10-analysis",
  },
  {
    name: "AI Chess Engine",
    label: "AI",
    summary:
      "Implemented alpha-beta pruning and adaptive move evaluation to build a responsive Python chess engine.",
    status: "Shipped",
    link: "https://github.com/ahmedazhar2299/AI-Chess",
  },
  {
    name: "Campaign Funding Dapp",
    label: "Web",
    summary:
      "Built a Solidity-powered funding application with React front-end workflows and contract interactions.",
    status: "Shipped",
    link: "https://github.com/ahmedazhar2299/Campaign-Funding-Dapp",
  },
  {
    name: "FFT-SIMD",
    label: "Performance",
    summary:
      "Explored SIMD acceleration paths for FFT and NTT computations used in large-integer polynomial multiplication.",
    status: "Exploring",
    link: "https://github.com/ahmedazhar2299/FFT-SIMD",
  },
  {
    name: "Machine Vision Coursework Lab",
    label: "Tooling",
    summary:
      "Iterative prototyping environment for model diagnostics, visual inspection, and rapid experimentation.",
    status: "In Progress",
    link: "https://github.com/ahmedazhar2299/Machine-Vision-CECS-553",
  },
]

export const contactChannels = [
  {
    label: "Email",
    value: "ahmed.azhar2299@gmail.com",
    href: "mailto:ahmed.azhar2299@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/ahmedazhar2299",
    href: "https://www.linkedin.com/in/ahmedazhar2299/",
  },
  {
    label: "GitHub",
    value: "github.com/ahmedazhar2299",
    href: "https://github.com/ahmedazhar2299",
  },
  {
    label: "Resume",
    value: "Download latest PDF",
    href: "/resume/resume.pdf",
  },
]
