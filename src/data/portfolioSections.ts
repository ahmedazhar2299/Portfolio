export const navSections = [
  { id: "about", label: "Overview" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "research", label: "Research" },
  { id: "education", label: "About" },
  { id: "contact", label: "Contact" },
] as const

export type PortfolioSectionId = (typeof navSections)[number]["id"]
export const projectFilters = ["All work", "Systems", "Machine learning", "Research"] as const
export type ProjectCategory = Exclude<(typeof projectFilters)[number], "All work">
export type ProjectVisual = "graph" | "signal" | "simd" | "shield" | "imaging" | "queue"

export type Project = {
  id: string
  title: string
  category: ProjectCategory
  label: string
  summary: string
  metric: string
  metricLabel: string
  tech: string[]
  visual: ProjectVisual
  tone: "blue" | "green" | "yellow" | "purple"
  details: string[]
  href?: string
  linkLabel?: string
  note?: string
}

export const projectEntries: Project[] = [
  {
    id: "dependency-resolver",
    title: "Making Python upgrades less painful.",
    category: "Systems",
    label: "Temporal dependency resolver",
    summary: "A temporal graph of the Python package ecosystem, with neural compatibility scoring and shortest-path search for safer upgrade sequences.",
    metric: "1M+",
    metricLabel: "PyPI packages modeled",
    tech: ["Python", "PyTorch", "Graph algorithms"],
    visual: "graph",
    tone: "blue",
    details: [
      "Modeled 1,047,966 PyPI packages as a directed temporal dependency graph.",
      "Combined a neural compatibility classifier with a version-jump penalty to score candidate transitions.",
      "Used shortest-path graph search to resolve transitive conflicts and generate upgrade sequences.",
    ],
    note: "September–October 2026. Project documented in the résumé; a public repository is not currently linked.",
  },
  {
    id: "mywalksentinel",
    title: "Understanding movement after stroke.",
    category: "Research",
    label: "MyWalkSentinel",
    summary: "Feature extraction and validation for wearable and smartphone mobility signals, connecting laboratory measurements with everyday movement at home.",
    metric: "Lab → home",
    metricLabel: "two complementary workflows",
    tech: ["Python", "NumPy", "SciPy"],
    visual: "signal",
    tone: "green",
    details: [
      "Built walking, turning, and sit-to-stand feature extraction for an NIH-funded stroke mobility study at Chapman University.",
      "Validated laboratory IMU measures against Vicon motion capture, and analyzed repeated smartphone recordings from home.",
      "The résumé reports laboratory agreement up to ICC(2,1) = 0.805 and repeatability up to ICC(3,14) = 0.972. These are agreement and reliability measures, not diagnostic accuracy.",
      "The public repository provides synthetic sample data and reproducible workflows. Controlled participant data are stored separately.",
    ],
    href: "https://github.com/ahmedazhar2299/my-walk-sentinal",
    linkLabel: "View source code",
  },
  {
    id: "simd",
    title: "More pixels. Less waiting.",
    category: "Systems",
    label: "Sobel–Laplacian SIMD",
    summary: "Edge detection on Apple Silicon, optimized with ARM NEON vector instructions and cache-conscious memory access.",
    metric: "14×",
    metricLabel: "speedup over the scalar baseline",
    tech: ["C / C++", "ARM NEON", "SIMD"],
    visual: "simd",
    tone: "yellow",
    details: [
      "Optimized Sobel and Laplacian image-processing kernels with ARM NEON 128-bit intrinsics.",
      "Processed multiple pixels in parallel while reducing branching and improving memory locality.",
      "The résumé reports a 14× execution speedup over scalar implementations. Results depend on hardware and workload.",
    ],
    href: "https://github.com/ahmedazhar2299/Sobel-Laplacian-SIMD",
    linkLabel: "View source code",
  },
  {
    id: "counterfeitguard",
    title: "Turning listing signals into risk insights.",
    category: "Machine learning",
    label: "CounterfeitGuard",
    summary: "A hybrid machine learning backend that combines structured listing features and text signals with an API for individual and batch analysis.",
    metric: "Text + data",
    metricLabel: "a hybrid risk assessment pipeline",
    tech: ["FastAPI", "XGBoost", "scikit-learn"],
    visual: "shield",
    tone: "purple",
    details: [
      "Built training and inference workflows for structured and text-based listing signals, with a fusion calibration layer.",
      "Exposed FastAPI endpoints for listing analysis, CSV batch import, feedback, and model metrics.",
      "Supports optional Gemini-generated explanation summaries, with a local fallback when no API key is configured.",
      "The repository uses synthetic and public-text training data. This is an experimental risk-assessment tool, not a guarantee of product authenticity.",
    ],
    href: "https://github.com/ahmedazhar2299/counterfeit-detection-ai",
    linkLabel: "View source code",
  },
  {
    id: "pix2ct",
    title: "Reconstructing images. Exploring possibilities.",
    category: "Machine learning",
    label: "Pix2CT",
    summary: "An experimental medical imaging workflow combining Pix2Pix CT reconstruction with MobileNetV2 transfer learning for image classification.",
    metric: "GAN + CNN",
    metricLabel: "reconstruction meets classification",
    tech: ["TensorFlow", "Pix2Pix", "MobileNetV2"],
    visual: "imaging",
    tone: "blue",
    details: [
      "Implemented a Pix2Pix conditional GAN with a U-Net generator and PatchGAN discriminator for CT-like image reconstruction.",
      "Fine-tuned MobileNetV2 to distinguish normal, bleeding, and ischemia image classes on a public dataset.",
      "Packaged preprocessing, training, and evaluation in a reproducible notebook. This is a research prototype, not a clinical diagnostic system.",
    ],
    href: "https://github.com/ahmedazhar2299/Pix2CT",
    linkLabel: "View source code",
  },
  {
    id: "roboink",
    title: "From an SVG to a physical print.",
    category: "Systems",
    label: "RoboInk",
    summary: "An event-driven printing backend that converts SVG inputs into validated G-code and schedules asynchronous jobs on AWS.",
    metric: "20",
    metricLabel: "print jobs per hour",
    tech: ["Django", "AWS SQS", "S3 · RDS"],
    visual: "queue",
    tone: "green",
    details: [
      "Architected a Django backend for an automated 3D card printing system, from SVG ingestion to G-code conversion.",
      "Used S3 for assets, SQS for asynchronous execution, and RDS for persistent job records.",
      "The résumé reports print throughput of 20 jobs per hour during the June–August 2024 project.",
    ],
    note: "Project documented in the résumé. Implementation details are summarized here; a public source repository is not linked.",
  },
]

export const moreProjects = [
  { title: "Federated learning", description: "IID vs. non-IID training on CIFAR-10", href: "https://github.com/ahmedazhar2299/federated-learning-cifar10-analysis" },
  { title: "FFT-SIMD", description: "Vectorized polynomial multiplication", href: "https://github.com/ahmedazhar2299/FFT-SIMD" },
  { title: "AI Chess", description: "Game-tree search with alpha–beta pruning", href: "https://github.com/ahmedazhar2299/AI-Chess" },
]

export const experienceEntries = [
  {
    company: "California State University, Long Beach",
    team: "CECM Lab",
    role: "Graduate Research Assistant",
    field: "Computational science & numerical optimization",
    period: "Aug 2026 – Present",
    location: "Long Beach, CA",
    current: true,
    logo: "/education/logos/csulb-emblem.png",
    summary: "Building automated time-series pipelines and numerical methods for large-scale environmental sensor analysis.",
    highlights: [
      "Automated ETL and FFT spectral analysis across 202 sensor stations and 30 climate scenarios, including seven-day linear interpolation and 99th-percentile spike filtering.",
      "Developed a balanced log-RMSE optimizer across seven nonlinear models to address high-frequency spectral skew. Median R² in log space improved from 0.882 to 0.921.",
    ],
    tech: ["Python", "SciPy", "FFT", "Numerical optimization"],
  },
  {
    company: "Chapman University",
    team: "Stroke mobility research",
    role: "Graduate Research Assistant",
    field: "Machine learning",
    period: "Feb 2026 – Present",
    location: "Orange, CA",
    current: true,
    logo: "/experience/logos/chapman-mark.png",
    summary: "Studying how wearable and smartphone signals can measure movement after stroke, from the laboratory to the home.",
    highlights: [
      "Engineered a Python feature-extraction pipeline for an NIH-funded study with 18 laboratory and 12 home participants, validating mobility features against 3D motion capture.",
      "Adapting pretrained inertial models, including LIMU-X and HART, to stroke gait and turning telemetry for fall-risk research in PyTorch and TensorFlow.",
    ],
    tech: ["Python", "PyTorch", "TensorFlow", "Sensor analysis"],
  },
  {
    company: "Paismo",
    team: "Enterprise workforce platform",
    role: "Software Engineer",
    field: "Backend systems",
    period: "Dec 2024 – Jul 2025",
    location: "Lahore, Pakistan",
    current: false,
    logo: "/experience/logos/paismo.png",
    summary: "Built multi-tenant services for attendance and payroll workflows used by more than 30 enterprise organizations.",
    highlights: [
      "Architected a Node.js policy-management microservice and mentored junior engineers through code reviews, system design, and production debugging.",
      "Redesigned PostgreSQL schemas and composite indexes, reducing query latency by 40% at more than 100,000 daily requests.",
    ],
    tech: ["Node.js", "PostgreSQL", "Microservices"],
  },
  {
    company: "xiQ, Inc.",
    team: "B2B campaign platform",
    role: "Software Engineer",
    field: "Distributed workflows",
    period: "Jul 2023 – Dec 2024",
    location: "Lahore, Pakistan",
    current: false,
    logo: "/experience/logos/xiq.svg",
    summary: "Developed campaign-management services and REST APIs supporting more than 8,000 daily active users.",
    highlights: [
      "Delivered customer targeting and analytics workflows in Django in collaboration with product stakeholders.",
      "Scaled asynchronous email execution to more than 300,000 runs per month through request batching, connection pooling, and Redis caching.",
    ],
    tech: ["Django", "Redis", "REST APIs", "Async processing"],
  },
  {
    company: "Tintash",
    team: "Product engineering",
    role: "Software Engineering Intern",
    field: "API development",
    period: "Jul – Sep 2022",
    location: "Lahore, Pakistan",
    current: false,
    logo: "/experience/logos/tintash.svg",
    summary: "Shipped production REST endpoints and relational data models for client-facing products.",
    highlights: ["Implemented request validation, pagination, and standardized error contracts to make API integration more predictable."],
    tech: ["REST APIs", "Relational databases", "Backend engineering"],
  },
]

export const publications = [
  {
    title: "Toward Reliable LLM Code Generation: Adaptive Routing Framework for Ambiguous Requirements",
    shortTitle: "Knowing when a code-generation model should ask for clarification.",
    venue: "IEEE COMPSAC",
    year: "2026",
    authorship: "First author",
    status: "Published",
    citation: "M. Ahmed, E. Tiu, N. N. Kapadia, D. Gabrido, and M. A. B. Ur Rahim. IEEE COMPSAC 2026, pp. 1953–1958.",
    description: "An adaptive routing framework for code generation under ambiguous requirements, using execution evidence to guide generation, further analysis, or clarification.",
    href: "https://doi.org/10.1109/COMPSAC69091.2026.00285",
  },
  {
    title: "Agentic Retrieval-Augmented Generation for Sustainable ETL Architecture: Automated Documentation and Design Quality Assessment to Support Carbon-Aware Data Pipelines",
    shortTitle: "AURA: bringing repository context to ETL documentation.",
    venue: "IEEE COMPSAC",
    year: "2026",
    authorship: "Co-author",
    status: "Published",
    citation: "M. Jain, M. Ahmed, and M. A. B. Ur Rahim. IEEE COMPSAC 2026, pp. 3286–3291.",
    description: "AST analysis and four coordinated agents for documentation and design-quality assessment. Evaluated on 12 ETL repositories and 413 functions, with 0.85 F1 for design-smell detection.",
    href: "https://doi.org/10.1109/COMPSAC69091.2026.00490",
  },
]

export const upcomingResearch = {
  title: "From Laboratory to Home: Agreement and Repeatability of IMU-Derived Walking, Turning, and Sit-to-Stand Mobility Markers After Stroke",
  venue: "World Physiotherapy Congress 2027",
  note: "First-author conference work listed in my résumé. Supported by NIH grant 1R15HD110941-01.",
}

export const educationEntries = [
  {
    school: "California State University, Long Beach",
    degree: "M.S. Computer Science",
    emphasis: "Artificial Intelligence",
    period: "2025 – May 2027 (expected)",
    logo: "/education/logos/csulb-emblem.png",
    achievement: "4.0 / 4.0 GPA",
    details: "Machine learning, deep learning, reinforcement learning, computer vision, and advanced algorithms.",
  },
  {
    school: "FAST National University",
    degree: "B.S. Computer Science",
    emphasis: "National University of Computer and Emerging Sciences",
    period: "2019 – July 2023",
    logo: "/education/logos/nuces-mark.png",
    achievement: "Top 5% · Dean’s List ×5",
    details: "A foundation in algorithms, distributed computing, operating systems, databases, and computer networks.",
  },
]

export const stackGroups = [
  { title: "Languages", items: "Python, C++, Java, TypeScript, JavaScript, SQL, Bash" },
  { title: "Backend & cloud", items: "Node.js, Django, FastAPI, PostgreSQL, Redis, Kafka, AWS, GCP, Docker, CI/CD" },
  { title: "Machine learning", items: "PyTorch, TensorFlow, transformer fine-tuning, LangGraph, RAG, vector search" },
  { title: "Scientific computing", items: "NumPy, SciPy, pandas, FFT, graph algorithms, ARM NEON SIMD" },
]

export const awards = [
  { title: "Departmental Excellence Scholarship", detail: "CSULB CECS · Sole departmental recipient" },
  { title: "1st place, Paismo Hackathon", detail: "2025 · Semantic résumé-to-job matching" },
]
