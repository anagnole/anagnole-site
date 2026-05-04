export type ProjectCategory =
  | "knowledge-graphs"
  | "agents"
  | "ml"
  | "infrastructure"
  | "apps";

export type ProjectStatus =
  | "active"
  | "shipped"
  | "experimental"
  | "coursework"
  | "archived";

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: ProjectCategory;
  featured: boolean;
  image?: string;
  links: {
    github?: string;
    npm?: string;
    demo?: string;
    paper?: string;
  };
  stack: string[];
  status: ProjectStatus;
  progress?: string;
  nextSteps?: string[];
};

export const CATEGORY_META: Record<
  ProjectCategory,
  { label: string; bar: string; dot: string; gradient: string }
> = {
  "knowledge-graphs": {
    label: "Knowledge Graphs",
    bar: "bg-blue-500",
    dot: "bg-blue-500",
    gradient:
      "bg-gradient-to-br from-blue-100 to-sky-50 dark:from-blue-950/60 dark:to-sky-950/40",
  },
  agents: {
    label: "Agents",
    bar: "bg-amber-500",
    dot: "bg-amber-500",
    gradient:
      "bg-gradient-to-br from-amber-100 to-orange-50 dark:from-amber-950/60 dark:to-orange-950/40",
  },
  infrastructure: {
    label: "Infrastructure",
    bar: "bg-slate-500",
    dot: "bg-slate-500",
    gradient:
      "bg-gradient-to-br from-slate-100 to-neutral-50 dark:from-slate-900/80 dark:to-neutral-900/60",
  },
  ml: {
    label: "Machine Learning",
    bar: "bg-emerald-500",
    dot: "bg-emerald-500",
    gradient:
      "bg-gradient-to-br from-emerald-100 to-teal-50 dark:from-emerald-950/60 dark:to-teal-950/40",
  },
  apps: {
    label: "Apps",
    bar: "bg-rose-500",
    dot: "bg-rose-500",
    gradient:
      "bg-gradient-to-br from-rose-100 to-pink-50 dark:from-rose-950/60 dark:to-pink-950/40",
  },
};

export const STATUS_META: Record<
  ProjectStatus,
  { label: string; dot: string; text: string; ring: string }
> = {
  active: {
    label: "Active",
    dot: "bg-emerald-500",
    text: "text-emerald-700 dark:text-emerald-400",
    ring: "ring-emerald-500/20",
  },
  shipped: {
    label: "Shipped",
    dot: "bg-blue-500",
    text: "text-blue-700 dark:text-blue-400",
    ring: "ring-blue-500/20",
  },
  experimental: {
    label: "Experimental",
    dot: "bg-amber-500",
    text: "text-amber-700 dark:text-amber-400",
    ring: "ring-amber-500/20",
  },
  coursework: {
    label: "Coursework",
    dot: "bg-violet-500",
    text: "text-violet-700 dark:text-violet-400",
    ring: "ring-violet-500/20",
  },
  archived: {
    label: "Archived",
    dot: "bg-neutral-400",
    text: "text-neutral-600 dark:text-neutral-400",
    ring: "ring-neutral-500/20",
  },
};

export const projects: Project[] = [
  {
    slug: "brainifai",
    name: "Brainifai",
    tagline: "Federated personal knowledge graph for Claude",
    description:
      "A federated personal knowledge graph that ingests from Slack, GitHub, ClickUp, Calendar, Twitter, and Claude Code sessions, routes data through an AI orchestrator, and serves specialized per-instance graphs to Claude via MCP.",
    category: "knowledge-graphs",
    featured: true,
    image: "/projects/brainifai.png",
    links: { github: "https://github.com/anagnole/Brainifai" },
    stack: ["TypeScript", "Kuzu", "MCP", "Claude", "Fastify"],
    status: "active",
    progress:
      "Engine, dashboard, and MCP hooks are wired against a freshly rebuilt graph. Day-to-day ingestion from Claude Code sessions is live; project-manager instance powers the per-project recall used across the site.",
    nextSteps: [
      "Backfill historical sources (Slack, GitHub, Calendar) into the post-cleanup graph",
      "Tighten the consolidation loop so episodes resolve into stable instances faster",
      "Ship a public read-only viewer for the project-manager instance",
    ],
  },
  {
    slug: "ehr-clinical-assistant",
    name: "EHR-Clinical-Assistant",
    tagline: "Does graph retrieval beat SQL for clinical Q&A?",
    description:
      "A thesis experiment rigorously comparing graph-based retrieval, SQL, and LLM-only baselines on clinical question answering, across both Claude and open-source Ollama models. 80-question evaluation harness covering 5 question types, plus a doctor-facing chat UI with an interactive patient knowledge graph.",
    category: "knowledge-graphs",
    featured: true,
    image: "/projects/ehr-clinical-assistant.png",
    links: { github: "https://github.com/anagnole/EHR-Clinical-Assistant" },
    stack: ["TypeScript", "Kuzu", "Postgres", "Claude", "Ollama", "Synthea"],
    status: "shipped",
    progress:
      "Full evaluation harness, retrieval strategies, and chat UI are complete. Results written up as part of the thesis.",
  },
  {
    slug: "mycelium",
    name: "Mycelium",
    tagline: "Small-world agent network library",
    description:
      "Build small-world graphs of AI agents where edges represent cognitive similarity, then traverse them to select diverse agent ensembles. Includes budget tracking and a real-time visualization dashboard.",
    category: "agents",
    featured: true,
    image: "/projects/mycelium.png",
    links: {
      github: "https://github.com/anagnole/Mycelium",
      npm: "https://www.npmjs.com/package/@anagnole/mycelium",
    },
    stack: ["TypeScript", "Watts-Strogatz", "LangGraph"],
    status: "shipped",
    progress:
      "Published on npm and used as the core of Crucible and Brainstorm. API surface is stable.",
    nextSteps: [
      "Expose richer traversal strategies beyond k-hop neighborhoods",
      "Add benchmarks comparing diverse vs random ensembles on real tasks",
    ],
  },
  {
    slug: "crucible",
    name: "Crucible",
    tagline: "Multi-agent idea-brewing that surfaces tension, not consensus",
    description:
      "Routes your prompt through a small-world network of 110 cognitively diverse AI agents. Round 2 only shows each agent their network neighbors, so tension emerges from the topology rather than artificial cross-pollination.",
    category: "agents",
    featured: true,
    image: "/projects/crucible.png",
    links: { github: "https://github.com/anagnole/Crucible" },
    stack: ["TypeScript", "React", "Mycelium", "Claude Haiku"],
    status: "shipped",
    progress:
      "Web UI is live, runs end-to-end against the Mycelium network. Built as a showcase of what topology-driven multi-agent prompts can do.",
  },
  {
    slug: "alfred",
    name: "Alfred",
    tagline: "Native macOS AI coach with wake word and Brainifai memory",
    description:
      "A SwiftUI menu bar app powered by Claude CLI, with push-to-talk speech, streaming TTS, image input, and persistent memory via Brainifai. Includes an on-device CoreML wake word detector.",
    category: "apps",
    featured: false,
    image: "/projects/alfred.png",
    links: { github: "https://github.com/anagnole/Alfred" },
    stack: ["Swift", "CoreML", "Claude CLI", "MCP"],
    status: "active",
    progress:
      "Daily-driver build with wake word, streaming TTS, image input, and Brainifai-backed memory all working. Iterating on response latency and conversational feel.",
    nextSteps: [
      "Reduce time-to-first-audio on wake word detection",
      "Expose the menu bar surface as a customizable widget grid",
    ],
  },
  {
    slug: "wake-word-ml",
    name: "wake-word-ml",
    tagline: "TC-ResNet8 wake word detector for Alfred",
    description:
      "Custom wake word detection trained on synthetic and personal voice data, exported to CoreML for on-device macOS inference. 65K parameters, sub-millisecond per frame on Apple Silicon.",
    category: "ml",
    featured: false,
    image: "/projects/wake-word-ml.png",
    links: { github: "https://github.com/anagnole/wake-word-ml" },
    stack: ["PyTorch", "CoreML", "MFCC", "TC-ResNet"],
    status: "shipped",
    progress:
      "Trained, exported, and deployed inside Alfred. Hits sub-millisecond per frame on Apple Silicon.",
  },
  {
    slug: "image-cleaner-ai",
    name: "ImageCleanerAI",
    tagline: "Strip burned-in annotations from medical images via AI prompting",
    description:
      "Streamlit app that uses fal.ai's FLUX models to remove labels, measurement lines, and patient info burned into medical image pixels. Built to preprocess training datasets without manual masking, fighting shortcut learning in classifiers.",
    category: "ml",
    featured: false,
    image: "/projects/image-cleaner-ai.png",
    links: { github: "https://github.com/anagnole/ImageCleanerAI" },
    stack: ["Python", "Streamlit", "fal.ai", "FLUX"],
    status: "experimental",
    progress:
      "Working prototype. Quality varies by image type; useful as a first-pass cleaner before manual review.",
  },
  {
    slug: "thesis-ddh-preprocessing",
    name: "DDH X-ray Preprocessing",
    tagline: "Classical OpenCV pipeline for cleaning hip x-rays",
    description:
      "Step-by-step notebook that strips overlaid measurement lines and printed labels from DDH hip x-rays using classical OpenCV inpainting. Combines line detection (Hough, Sobel, percentile threshold) with text detection (MSER, adaptive thresholding) into a single inpainting pass.",
    category: "ml",
    featured: false,
    image: "/projects/thesis-ddh-preprocessing.png",
    links: { github: "https://github.com/anagnole/ThesisProject" },
    stack: ["Python", "OpenCV", "Jupyter"],
    status: "shipped",
    progress:
      "Notebook is complete and was used to clean the dataset for downstream classification work.",
  },
  {
    slug: "pattern-recognition",
    name: "HMM Activity Recognition",
    tagline: "Classifying standing, walking, and running with Hidden Markov Models",
    description:
      "NTUA Pattern Recognition assignment implementing Hidden Markov Models from scratch to classify three activities from accelerometer recordings, with comparisons of raw signals versus feature-engineered inputs.",
    category: "ml",
    featured: false,
    image: "/projects/pattern-recognition.png",
    links: { github: "https://github.com/anagnole/PatternRecognition" },
    stack: ["Python", "NumPy", "HMM", "Jupyter"],
    status: "coursework",
    progress: "Submitted for NTUA Pattern Recognition. Notebooks reproduce the full analysis.",
  },
  {
    slug: "biosignal-sleep-analysis",
    name: "Sleep Stage Classification",
    tagline: "Multimodal EEG, EOG, EMG sleep staging in MATLAB",
    description:
      "KTH project for automatic sleep staging from polysomnography. Modular preprocessing (notch, high and low-pass filters), time, frequency, and wavelet feature extraction, and grid-searched classifiers (k-NN, RF, MLP, SVM) across single-modality and multimodal pipelines.",
    category: "ml",
    featured: false,
    image: "/projects/biosignal-sleep-analysis.png",
    links: { github: "https://github.com/anagnole/BiosignalSleepAnalysis" },
    stack: ["MATLAB", "EDF", "Wavelets", "SVM"],
    status: "coursework",
    progress: "Submitted for the KTH biosignal processing course.",
  },
  {
    slug: "agent-manager",
    name: "Agent Manager",
    tagline: "Terminal UI for running multiple AI CLI agents",
    description:
      "Tabbed terminal UI for running Claude Code and Gemini CLI side by side. Forwards permission requests to Slack, Discord, or Telegram. Adopts standalone agents already running on your system.",
    category: "infrastructure",
    featured: false,
    image: "/projects/agent-manager.png",
    links: {},
    stack: ["Ink", "node-pty", "xterm-headless"],
    status: "experimental",
    progress:
      "Local prototype. Works for daily multi-agent driving but not yet packaged for distribution.",
    nextSteps: [
      "Stabilize the adoption flow for already-running agents",
      "Publish a first cut to npm",
    ],
  },
  {
    slug: "claude-cli-wrapper",
    name: "claude-cli-wrapper",
    tagline: "Unified Anthropic Messages API across Claude CLI, Ollama, OpenRouter",
    description:
      "Monorepo with a TypeScript provider abstraction and Anthropic-compatible HTTP server. Routes any Claude SDK call through Claude CLI (with full MCP, permissions, worktree support), local Ollama models, or free OpenRouter cloud models, behind one consistent API.",
    category: "infrastructure",
    featured: false,
    image: "/projects/claude-cli-wrapper.png",
    links: {
      github: "https://github.com/anagnole/claude-cli-wrapper",
      npm: "https://www.npmjs.com/package/@anagnole/claude-cli-wrapper",
    },
    stack: ["TypeScript", "Fastify", "MCP"],
    status: "shipped",
    progress:
      "Published on npm. Used to back several internal tools that need a uniform Messages API across providers.",
  },
  {
    slug: "office-sim",
    name: "Office Sim",
    tagline: "Tycoon game where AI managers delegate real coding tasks",
    description:
      "An office tycoon game where you manage teams of AI agents that produce real code in isolated git worktrees. Managers use MCP tools to create tasks; employees execute them via Claude CLI sessions.",
    category: "agents",
    featured: false,
    image: "/projects/office-sim.png",
    links: { github: "https://github.com/anagnole/Office-Sim" },
    stack: ["TypeScript", "Fastify", "React", "PixiJS", "Claude CLI"],
    status: "experimental",
    progress:
      "Core loop runs: managers spawn tasks via MCP, employee agents execute against worktrees. Visuals and economy still rough.",
    nextSteps: [
      "Tune the manager prompt so tasks land at a useful granularity",
      "Persist office state across sessions",
    ],
  },
  {
    slug: "vec3-comparison",
    name: "Vec3 Comparison",
    tagline: "Chroma vs pgvector benchmark suite",
    description:
      "End-to-end benchmarking pipeline comparing Chroma and pgvector on ingestion, query latency, recall, and scalability from 10K to 2M vectors. Built as an NTUA university project with a published paper.",
    category: "infrastructure",
    featured: false,
    image: "/projects/vec3-comparison.png",
    links: { github: "https://github.com/anagnole/vec3-comparison" },
    stack: ["Python", "Chroma", "pgvector", "React"],
    status: "shipped",
    progress:
      "Benchmarks ran across 10K to 2M vectors. Paper is published as part of the NTUA submission.",
  },
  {
    slug: "ticketing",
    name: "Microservices Ticketing",
    tagline: "Multi-service Node platform with Kubernetes orchestration",
    description:
      "Ticket marketplace built as a set of TypeScript microservices (auth, tickets, orders, payments, expiration) coordinated through NATS streaming, deployed to Kubernetes via Skaffold, with shared error and event packages.",
    category: "infrastructure",
    featured: false,
    image: "/projects/ticketing.png",
    links: { github: "https://github.com/anagnole/ticketing" },
    stack: ["TypeScript", "Kubernetes", "NATS", "Skaffold"],
    status: "shipped",
    progress:
      "All services implemented, end-to-end flow works on a local Kubernetes cluster via Skaffold.",
  },
  {
    slug: "brainstorm",
    name: "Brainstorm",
    tagline: "CLI that expands half-baked ideas via Mycelium agent networks",
    description:
      "Feed it an idea, get diverse perspectives from cognitively distinct AI agents selected via a graph walk. Built on Mycelium and Claude CLI.",
    category: "agents",
    featured: false,
    image: "/projects/brainstorm.png",
    links: {
      github: "https://github.com/anagnole/Brainstorm",
      npm: "https://www.npmjs.com/package/@anagnole/brainstorm",
    },
    stack: ["TypeScript", "Mycelium", "Claude CLI"],
    status: "shipped",
    progress:
      "Published on npm and exposed as a Claude Code skill on this machine.",
  },
  {
    slug: "aballos",
    name: "Aballos",
    tagline: "Live map of public basketball courts and who's playing",
    description:
      "An Expo + React Native app that turns public basketball courts into a live network. Real-time check-ins from Firestore show who is on each court, with 90-minute auto-expiry, Google sign-in, and a liquid glass tab bar on iOS. Find a game, start a game, never pull up to an empty court.",
    category: "apps",
    featured: false,
    image: "/projects/aballos.png",
    links: {},
    stack: ["Expo", "React Native", "Firebase", "TypeScript"],
    status: "active",
    progress:
      "Real-time check-ins, Google sign-in, and the liquid glass iOS tab bar all working. Pre-launch polish in progress.",
    nextSteps: [
      "Seed initial courts for a launch city",
      "TestFlight build and a small private beta",
      "Onboarding flow that gets a first check-in in under 30 seconds",
    ],
  },
  {
    slug: "swipe-news",
    name: "SwipeNews",
    tagline: "Tinder-style news reader for iOS",
    description:
      "SwiftUI iOS app for browsing news headlines via swipe gestures. MVVM architecture with Models, Views, ViewModels, and Services, plus on-device asset catalogs.",
    category: "apps",
    featured: false,
    image: "/projects/swipe-news.png",
    links: { github: "https://github.com/anagnole/SwipeNews" },
    stack: ["Swift", "SwiftUI", "iOS"],
    status: "shipped",
    progress: "Working SwiftUI prototype.",
  },
  {
    slug: "snap-goals",
    name: "SnapGoals",
    tagline: "Flutter UI/UX coursework: a goal-tracking concept app",
    description:
      "NTUA UI/UX course final project. A Flutter prototype exploring goal tracking with photo-based progress capture. Built with two collaborators.",
    category: "apps",
    featured: false,
    image: "/projects/snap-goals.png",
    links: { github: "https://github.com/anagnole/UI_UX_36" },
    stack: ["Flutter", "Dart"],
    status: "coursework",
    progress: "Final submission for the NTUA UI/UX course.",
  },
  {
    slug: "ntuaflix",
    name: "NTUAflix",
    tagline: "TMDb-backed movie discovery for the NTUA software engineering course",
    description:
      "Team of four built a Netflix-style movie, TV, and people browser on top of the TMDb API. Next.js + Redux frontend with a custom carousel, Express backend, OpenAPI 3.0 docs, Postman API tests, and a Python-driven CLI test harness.",
    category: "apps",
    featured: false,
    links: { github: "https://github.com/anagnole/NTUAflix" },
    stack: ["Next.js", "React", "Redux", "Express", "TMDb"],
    status: "coursework",
    progress:
      "Final submission for the 2023-2024 NTUA Software Engineering course. Four-person team. Recently moved from the team org to my personal account.",
  },
  {
    slug: "lib-ece-dbms",
    name: "ECE Library DBMS",
    tagline: "Flask + MySQL university library system",
    description:
      "NTUA Database Systems coursework. A library management web app built on Flask with Blueprints, MySQL, WTForms validation, and Faker-generated demo data, plus full ER and relational schema diagrams.",
    category: "apps",
    featured: false,
    image: "/projects/lib-ece-dbms.png",
    links: { github: "https://github.com/anagnole/LIB_ECE_DBMS" },
    stack: ["Python", "Flask", "MySQL", "WTForms"],
    status: "coursework",
    progress: "Final submission for NTUA Database Systems.",
  },
  {
    slug: "altify",
    name: "Altify Components",
    tagline: "React Native and web component library prototype",
    description:
      "Cross-platform component library prototype built with Expo, React Native Web, and Storybook. Shared design primitives that render natively on iOS and Android, and as accessible web components.",
    category: "apps",
    featured: false,
    image: "/projects/altify.png",
    links: { github: "https://github.com/anagnole/react-native-web-altify" },
    stack: ["React Native", "Expo", "Storybook"],
    status: "archived",
    progress: "Early prototype. Not actively maintained.",
  },
];

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory() {
  const grouped: Record<string, Project[]> = {};
  for (const project of projects) {
    if (!grouped[project.category]) grouped[project.category] = [];
    grouped[project.category].push(project);
  }
  return grouped;
}

export function getAllProjectSlugs() {
  return projects.map((p) => p.slug);
}
