export type ExperienceItem = {
  period: string
  role: string
  company: string
  location: string
  bullets: string[]
}

export type ProjectItem = {
  name: string
  subtitle: string
  description: string
  stack: string[]
  repo: string
  demo?: string
}

export const profile = {
  name: "Muhammad Ahmed",
  firstName: "Muhammad",
  role: "Software Engineer",
  location: "Los Angeles, California, USA",
  tagline:
    "Building AI-native backend platforms and cloud systems that scale with reliability, observability, and measurable product impact.",
  email: "ahmed.azhar2299@gmail.com",
  phone: "+1 (562) 577-5028",
  github: "https://github.com/ahmedazhar2299",
  linkedin: "https://www.linkedin.com/in/ahmedazhar2299/",
  resume: "/resume/resume.pdf",
  education: [
    {
      school: "California State University, Long Beach",
      degree: "M.S. Computer Science (Artificial Intelligence)",
      date: "Expected May 2027",
      detail: "GPA: 4.0",
    },
    {
      school: "National University of Computer and Emerging Sciences",
      degree: "B.S. Computer Science",
      date: "Jul 2023",
      detail: "Lahore, Pakistan",
    },
  ],
  stats: [
    { label: "Public Repositories", value: "27" },
    { label: "GitHub Followers", value: "6" },
    { label: "Experience", value: "2+ years" },
    { label: "Daily Resume Matches Built", value: "1K+" },
  ],
  skillGroups: [
    {
      label: "Languages",
      items: ["Python", "C++", "JavaScript", "TypeScript", "SQL", "NoSQL"],
    },
    {
      label: "Cloud & Platform",
      items: ["AWS", "Google Cloud", "Docker", "REST APIs", "PostgreSQL", "MongoDB"],
    },
    {
      label: "Frameworks",
      items: ["React", "Node.js", "Django", "Flask", "TensorFlow", "PyTorch"],
    },
  ],
  languageMix: [
    { language: "JavaScript", count: 8 },
    { language: "Jupyter Notebook", count: 3 },
    { language: "Python", count: 2 },
    { language: "C", count: 2 },
    { language: "Java", count: 2 },
  ],
  experience: [
    {
      period: "Dec 2024 - Jul 2025",
      role: "Software Engineer",
      company: "Paismo",
      location: "Lahore, Pakistan",
      bullets: [
        "Owned end-to-end design and rollout of a high-availability attendance policy microservice (Node.js, SQL) serving 5K+ employees across 40+ organizations and 100K+ requests/day.",
        "Reduced latency by 80% through schema design, targeted indexing, query plan tuning, and cache-aside reads.",
        "Built a RAG-based resume-to-job matching system processing 1K+ resumes/day and indexing 50K+ embeddings.",
        "Improved top-K precision by 18% using hybrid relevance scoring and an offline evaluation harness.",
      ],
    },
    {
      period: "Jul 2023 - Dec 2024",
      role: "Software Engineer",
      company: "xiQ, Inc.",
      location: "Lahore, Pakistan",
      bullets: [
        "Built and maintained backend services for a multi-tenant B2B GenAI email platform supporting 50+ enterprise tenants and 8K+ daily active users.",
        "Improved performance for 300K+ workflow executions/month via pagination, batching, connection pooling, and caching.",
        "Reduced latency by 35% and improved production safety with deployment guardrails, dashboards, alerts, and runbooks.",
        "Enabled 10+ safe deploys/week and reduced incident detection time by 40%.",
      ],
    },
    {
      period: "Jul 2022 - Sep 2022",
      role: "Software Engineering Intern",
      company: "Tintash",
      location: "Lahore, Pakistan",
      bullets: [
        "Shipped production REST endpoints and relational data models for a client-facing application.",
        "Implemented validation, pagination, and consistent error contracts to streamline web client integration.",
      ],
    },
  ] as ExperienceItem[],
  projects: [
    {
      name: "Brain CT Scan Reconstruction and Classification",
      subtitle: "Python, TensorFlow, PyTorch, GANs, OpenCV",
      description:
        "Built an end-to-end CT imaging pipeline, trained a conditional GAN to synthesize realistic slices, expanded scarce labeled data by 4x, and improved AUC by 0.07 using stratified evaluation and regularization.",
      stack: ["PyTorch", "TensorFlow", "GAN", "Computer Vision"],
      repo: "https://github.com/ahmedazhar2299/Pix2CT",
    },
    {
      name: "RoboInk: Automated 3D Card Printing System",
      subtitle: "Django, AWS (S3, SQS, RDS), SVG, G-code",
      description:
        "Architected an event-driven print orchestration service with idempotent async workers, retry logic, and DLQ handling; reduced failed print runs by 35% and reached 20 jobs/hour throughput in testing.",
      stack: ["Django", "AWS", "SQS", "RDS"],
      repo: "https://github.com/ahmedazhar2299",
      demo: "https://roboink.de/",
    },
    {
      name: "Campaign-Funding-Dapp",
      subtitle: "React, Redux Toolkit, Truffle, Solidity",
      description:
        "Decentralized application for campaign funding with a full Web3 workflow and smart-contract powered transactions.",
      stack: ["React", "Solidity", "Web3", "JavaScript"],
      repo: "https://github.com/ahmedazhar2299/Campaign-Funding-Dapp",
    },
    {
      name: "Sobel-Laplacian-OpenMP",
      subtitle: "C, Parallel Computing",
      description:
        "Performance-focused edge-detection implementation optimized with OpenMP for parallel throughput and improved runtime efficiency.",
      stack: ["C", "OpenMP", "Performance"],
      repo: "https://github.com/ahmedazhar2299/Sobel-Laplacian-OpenMP",
    },
  ] as ProjectItem[],
  sourceNotes: {
    github: "GitHub API public profile and repositories synced on April 1, 2026.",
    linkedin:
      "LinkedIn profile URL is included. Automated scraping is blocked by LinkedIn; professional timeline is populated from resume content.",
  },
}
