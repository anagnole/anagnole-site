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
  carouselImage?: string;
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
      "A multi-instance federated knowledge graph that ingests from Slack, GitHub, ClickUp, Apple Calendar, Twitter/X, Git repos, and Claude Code sessions, then routes data through an AI orchestrator (Claude Haiku) into specialized per-instance graphs (coding, manager, project-manager, EHR, researcher, general). Each instance gets its own Kuzu database and MCP server. Schema covers atom, entity, and episode nodes with spreading activation, episodic recall, and scheduled maintenance passes; cross-source identity resolution links the same person across Slack, GitHub, and email.",
    category: "knowledge-graphs",
    featured: true,
    image: "/projects/brainifai.png",
    links: { github: "https://github.com/anagnole/Brainifai" },
    stack: ["TypeScript", "Node.js", "Kuzu", "MCP", "Claude Haiku", "Fastify", "React", "Sigma.js"],
    status: "active",
    progress:
      "Engine, dashboard, and MCP hooks are wired against a freshly rebuilt graph. Day-to-day ingestion from Claude Code sessions is live; the project-manager instance powers per-project recall used across this site.",
    nextSteps: [
      "Backfill historical sources (Slack, GitHub, Calendar) into the post-cleanup graph",
      "Tighten the consolidation loop so episodes resolve into stable instances faster",
      "Ship a public read-only viewer for the project-manager instance",
      "Complete tier-recompute and alias-confirm maintenance passes",
    ],
  },
  {
    slug: "ehr-clinical-assistant",
    name: "EHR-Clinical-Assistant",
    tagline: "Does graph retrieval beat SQL for clinical Q&A?",
    description:
      "A thesis experiment rigorously comparing graph-based retrieval against SQL and LLM-only baselines for clinical question answering. Synthetic dataset of 2000+ patients (Synthea, seed 42) with 7 node types and 12 relationships in Kuzu, mirrored in Postgres. 80-question evaluation harness covering simple lookup, multi-hop, temporal, cohort, and reasoning questions. A unified provider abstraction routes the same harness through Claude (via MCP) and Ollama, plus a doctor-facing chat UI with streaming responses, an interactive Sigma.js patient graph, and document generation (referral letters, SOAP notes).",
    category: "knowledge-graphs",
    featured: true,
    image: "/projects/ehr-clinical-assistant.png",
    links: { github: "https://github.com/anagnole/EHR-Clinical-Assistant" },
    stack: ["TypeScript", "Kuzu", "PostgreSQL", "Claude CLI", "Ollama", "MCP", "Fastify", "React", "Sigma.js", "Synthea"],
    status: "active",
    progress:
      "Currently the thesis-in-progress. Evaluation harness, retrieval strategies, and clinical chat UI all run end-to-end. Preliminary results on simple-lookup questions favor graph retrieval (around 81% accuracy versus 76% for the SQL baseline).",
    nextSteps: [
      "Finish the comparison write-up across graph, SQL, and LLM-only retrieval",
      "Run remaining ablations on open-source models (qwen2.5:32b, mistral-small)",
      "Extend the evaluation to multi-hop, temporal, cohort, and reasoning question types",
      "Polish the doctor-facing UI for the thesis defense demo",
    ],
  },
  {
    slug: "mycelium",
    name: "Mycelium",
    tagline: "Small-world agent networks with personality embeddings",
    description:
      "A library for building Watts-Strogatz small-world graphs of AI agents where edges represent cognitive similarity in a 6-axis personality embedding (analytical/intuitive, convergent/divergent, abstract/concrete, critical/generative, individual/systemic, conservative/innovative). Three walk strategies (random, diversity-biased, cluster-bridging) select diverse ensembles. Budget-aware iteration mode lets consumers report costs and stops the walk when the cap is hit. A real-time visualization dashboard streams the graph, walk path, selections, radar charts, and event log over WebSocket.",
    category: "agents",
    featured: true,
    image: "/projects/mycelium.png",
    links: {
      github: "https://github.com/anagnole/Mycelium",
      npm: "https://www.npmjs.com/package/@anagnole/mycelium",
    },
    stack: ["TypeScript", "Watts-Strogatz", "LangGraph", "WebSocket", "React"],
    status: "shipped",
    progress:
      "Published on npm and used as the core of Crucible and Brainstorm. API surface is stable.",
    nextSteps: [
      "Expose richer traversal strategies beyond k-hop neighborhoods",
      "Add benchmarks comparing diverse vs random ensembles on real inference tasks",
    ],
  },
  {
    slug: "crucible",
    name: "Crucible",
    tagline: "Multi-agent idea-brewing that surfaces tension, not consensus",
    description:
      "Routes your prompt through a small-world network of 110 cognitively diverse AI agents. Round 1 has every agent analyze the idea independently. In round 2, each agent only sees responses from its network neighbors (topology-shaped, not all-to-all), so tension emerges from structure rather than artificial cross-pollination. A meta-agent extracts a tension map highlighting agreements, disagreements, and outliers. Streams over SSE, with interactive network and architecture visualizations.",
    category: "agents",
    featured: true,
    image: "/projects/crucible.png",
    links: { github: "https://github.com/anagnole/Crucible" },
    stack: ["TypeScript", "React", "Mycelium", "Claude Haiku", "Express", "Vite", "Tailwind"],
    status: "shipped",
    progress:
      "Web UI is live and runs end-to-end against the Mycelium network. Built as a showcase of what topology-driven multi-agent prompts can do.",
  },
  {
    slug: "alfred",
    name: "Alfred",
    tagline: "Native macOS AI coach with wake word and Brainifai memory",
    description:
      "A SwiftUI menu bar app powered by Claude CLI, with push-to-talk speech, streaming TTS, image drag-and-drop, and persistent memory backed by the Brainifai knowledge graph. An on-device CoreML wake word detector runs at under 2% CPU at 12 inferences/sec and requires 3 consecutive detections to fire, minimizing false positives. Multi-session conversations with a history sidebar; an alternate Fastify + React web UI is available for remote control.",
    category: "apps",
    featured: false,
    image: "/projects/alfred.png",
    links: { github: "https://github.com/anagnole/Alfred" },
    stack: ["Swift", "SwiftUI", "CoreML", "Claude CLI", "MCP", "Fastify", "React"],
    status: "shipped",
    progress:
      "Daily-driver build with wake word, streaming TTS, image input, and Brainifai-backed memory all working.",
  },
  {
    slug: "wake-word-ml",
    name: "wake-word-ml",
    tagline: "TC-ResNet8 wake word detector for Alfred",
    description:
      "A 65K-parameter TC-ResNet8 trained on synthetic macOS TTS voices, hard negatives (Hey Albert, Hey Alfredo), and personal recordings. Processes 40-dimensional MFCCs from 1-second 16 kHz audio and exports to a roughly 250 KB CoreML model. Sub-millisecond per frame on Apple Silicon, well under 2% CPU at 12 inferences per second. The training pipeline supports retraining with more personal samples, additional ambient noise, and tunable sensitivity.",
    category: "ml",
    featured: false,
    image: "/projects/wake-word-ml.png",
    links: { github: "https://github.com/anagnole/wake-word-ml" },
    stack: ["Python", "PyTorch", "torchaudio", "coremltools", "MFCC", "TC-ResNet8"],
    status: "shipped",
    progress:
      "Trained, exported, and deployed inside Alfred. Hits sub-millisecond per frame on Apple Silicon.",
  },
  {
    slug: "image-cleaner-ai",
    name: "ImageCleanerAI",
    tagline: "Strip burned-in annotations from medical images via AI prompting",
    description:
      "Streamlit app that removes burned-in labels, measurement lines, arrows, and patient info from medical images by routing them through fal.ai generative models. Four selectable model tiers (FLUX Dev, Kontext Pro, FLUX.2 Pro, Gemini 3.1 Flash) with per-image cost estimates. Built to preprocess training datasets without manual masking, fighting shortcut learning where classifiers learn to associate markings with diagnoses rather than actual anatomy.",
    category: "ml",
    featured: false,
    image: "/projects/image-cleaner-ai.png",
    links: { github: "https://github.com/anagnole/ImageCleanerAI" },
    stack: ["Python", "Streamlit", "fal.ai", "FLUX", "Gemini"],
    status: "experimental",
    progress:
      "Working prototype. Quality varies by image type; useful as a first-pass cleaner before manual review.",
  },
  {
    slug: "thesis-ddh-preprocessing",
    name: "DDH X-ray Preprocessing",
    tagline: "Classical OpenCV pipeline for cleaning hip x-rays",
    description:
      "Modular Jupyter notebook that strips overlaid measurement lines and printed labels from DDH hip x-rays using classical OpenCV inpainting. Five sections, multiple detection strategies (percentile threshold, HoughLinesP, Sobel/DoG derivatives) for lines and (adaptive thresholding, MSER, hybrid union) for text. A mask registry tracks every detection, combines selected masks, and inpaints once. Cleaned output written to a separate folder so originals stay intact.",
    category: "ml",
    featured: false,
    image: "/projects/thesis-ddh-preprocessing.png",
    links: { github: "https://github.com/anagnole/ThesisProject" },
    stack: ["Python", "OpenCV", "Jupyter", "NumPy", "Matplotlib"],
    status: "shipped",
    progress:
      "Notebook is complete and was used to clean the dataset for downstream classification work.",
  },
  {
    slug: "pattern-recognition",
    name: "HMM Activity Recognition",
    tagline: "Classifying standing, walking, and running with HMMs",
    description:
      "NTUA Pattern Recognition assignment 3. Hidden Markov Models implemented from scratch (PattRecClasses/) to classify three activities from accelerometer recordings, with a feature-engineered vs raw-signal comparison toggle. Two datasets in JSON format: a richer first recording with clear transitions and a shorter, noisier second one for harder evaluation.",
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
      "KTH project for automatic sleep staging from polysomnography. Three phases: EEG-only, EEG+EOG, EEG+EMG+EOG. Modular preprocessing (notch, high-pass, low-pass) with toggles, 30-second epoch segmentation, and time, frequency, and wavelet feature extraction including spectral entropy and eye-movement features. Grid-searched k-NN, RF, MLP, and SVM classifiers across single-modality and multimodal pipelines, with caching for filtered signals and features. Confusion matrices and PCA visualizations exported to Excel and LaTeX.",
    category: "ml",
    featured: false,
    image: "/projects/biosignal-sleep-analysis.png",
    links: { github: "https://github.com/anagnole/BiosignalSleepAnalysis" },
    stack: ["MATLAB", "EDF", "Wavelets", "SVM", "Signal Processing"],
    status: "coursework",
    progress: "Submitted for the KTH biosignal processing course.",
  },
  {
    slug: "claude-cli-wrapper",
    name: "claude-cli-wrapper",
    tagline: "Unified Anthropic Messages API across Claude CLI, Ollama, OpenRouter",
    description:
      "Monorepo with a TypeScript provider abstraction and an Anthropic-compatible HTTP server. Routes any Claude SDK call through the Claude CLI (with full MCP, permissions, and worktree support), local Ollama models, or free OpenRouter models, behind one consistent Messages API. ProviderRegistry auto-routes by model ID; SessionMap persists conversations across requests. Custom providers slot in by extending the Provider interface.",
    category: "infrastructure",
    featured: false,
    image: "/projects/claude-cli-wrapper.png",
    links: {
      github: "https://github.com/anagnole/claude-cli-wrapper",
      npm: "https://www.npmjs.com/package/@anagnole/claude-cli-wrapper",
    },
    stack: ["TypeScript", "Node.js", "Fastify", "MCP", "Claude CLI", "Ollama", "OpenRouter"],
    status: "shipped",
    progress:
      "Published on npm. Used to back several internal tools that need a uniform Messages API across providers.",
  },
  {
    slug: "office-sim",
    name: "Office Sim",
    tagline: "Tycoon game where AI managers delegate real coding tasks",
    description:
      "A pnpm workspace with seven packages (shared, runtime, orchestrator, server, mcp, game, client) that turn an isometric office tycoon game into a real coding shop. Managers use MCP tools to spawn tasks; employees execute them as Claude CLI subprocesses (--print --resume) in isolated git worktrees, each with persistent session history and a custom personality. Approval flows (ask/allow/deny) gate execution. Fastify + WebSocket backend, PixiJS isometric renderer, React + Zustand UI, fal.ai sprite generation, 319 unit tests across packages.",
    category: "agents",
    featured: false,
    image: "/projects/office-sim.png",
    links: { github: "https://github.com/anagnole/Office-Sim" },
    stack: ["TypeScript", "pnpm", "Fastify", "React", "PixiJS", "Zustand", "Claude CLI", "MCP", "fal.ai"],
    status: "experimental",
    progress:
      "Core loop runs: managers spawn tasks via MCP, employee agents execute against worktrees. Visuals and economy still rough.",
    nextSteps: [
      "Tune the manager prompt so tasks land at a useful granularity",
      "Persist office state across sessions",
      "Polish sprite animation and the office UI",
    ],
  },
  {
    slug: "vec3-comparison",
    name: "Vec3 Comparison",
    tagline: "Chroma vs pgvector benchmark suite",
    description:
      "End-to-end benchmarking pipeline comparing Chroma and pgvector across 10 datasets ranging from 10K to 2M vectors and dimensions from 32 to 1536. Measures throughput, latency percentiles (mean, P50, P99), recall@k, and resource usage; supports HNSW and IVFFlat indexes and multiple batch sizes. Containers are resource-capped (4 GB memory, 6 CPU cores) for fair comparison. React dashboard visualizes results, with JSON, CSV, plot, and LaTeX-table export. Built as an NTUA university project; the accompanying paper found pgvector roughly 2-5x faster on ingestion and lower-latency on queries, while Chroma kept consistently higher recall@k.",
    category: "infrastructure",
    featured: false,
    image: "/projects/vec3-comparison.png",
    links: { github: "https://github.com/anagnole/vec3-comparison" },
    stack: ["Python", "Chroma", "pgvector", "PostgreSQL", "Docker", "React", "Express"],
    status: "shipped",
    progress:
      "Benchmarks ran across the full dataset range. Paper is published as part of the NTUA submission.",
  },
  {
    slug: "ticketing",
    name: "Microservices Ticketing",
    tagline: "Multi-service Node platform with Kubernetes orchestration",
    description:
      "Ticket marketplace built as a set of TypeScript microservices (auth, tickets, orders, payments, expiration) coordinated through NATS streaming, deployed to a local Kubernetes cluster via Skaffold. Shared error and event packages keep contracts consistent across services.",
    category: "infrastructure",
    featured: false,
    image: "/projects/ticketing.png",
    links: { github: "https://github.com/anagnole/ticketing" },
    stack: ["TypeScript", "Kubernetes", "NATS", "Skaffold", "Docker"],
    status: "shipped",
    progress:
      "All services implemented, end-to-end flow works on a local Kubernetes cluster via Skaffold.",
  },
  {
    slug: "brainstorm",
    name: "Brainstorm",
    tagline: "CLI that expands ideas via cognitively diverse agent networks",
    description:
      "A command-line tool that feeds an idea through a small-world Mycelium graph of 27 cognitively diverse personas (Devil's Advocate, First Principles, Wildcard, Alien Observer, Systems Thinker, Economist, Pre-Mortem Writer, Bayesian Updater, Metaphor Maker, and more). Selects a maximally diverse subset via a graph walk and streams each agent's response with colored output. Configurable agent count, walk length, model, and budget cap in USD. Includes a visualization dashboard, JSON export, and ships as a Claude Code skill.",
    category: "agents",
    featured: false,
    image: "/projects/brainstorm.png",
    links: {
      github: "https://github.com/anagnole/Brainstorm",
      npm: "https://www.npmjs.com/package/@anagnole/brainstorm",
    },
    stack: ["TypeScript", "Mycelium", "Claude CLI", "Commander", "Chalk"],
    status: "shipped",
    progress:
      "Published on npm and exposed as a Claude Code skill on this machine.",
  },
  {
    slug: "mosaic-journal",
    name: "Mosaic Journal",
    tagline: "Cross-platform journaling and photo memory app",
    description:
      "Multi-platform journaling and photo management product. React Native + Expo mobile app, Next.js dashboard and landing site, and AWS Lambda microservices coordinated as an Nx monorepo with yarn. EAS handles builds and store submissions; OTA updates ship on staging and production branches. Built and shipped with the Mosaic Journal team.",
    category: "apps",
    featured: false,
    image: "/projects/mosaic-journal.png",
    carouselImage: "/projects/mosaic-journal-wide.png",
    links: {},
    stack: ["React Native", "Expo", "Next.js", "AWS Lambda", "Serverless", "Nx", "EAS"],
    status: "active",
    progress:
      "In active product development across iOS, Android, dashboard, and backend services. OTA updates and EAS submissions running on the regular cadence.",
  },
  {
    slug: "aballos",
    name: "Aballos",
    tagline: "Live map of public basketball courts and who's playing",
    description:
      "An Expo + React Native app that turns public basketball courts into a live network. Real-time check-ins from Firestore show who is on each court, with 90-minute auto-expiry and one active check-in per user enforced client-side. Google Sign-In with first-time username picker, dark mode, and a liquid glass native tab bar on iOS. Court detail view lists active players by username and profile photo. Find a game, start a game, never pull up to an empty court.",
    category: "apps",
    featured: false,
    image: "/projects/aballos.png",
    links: {},
    stack: ["Expo SDK 55", "React Native", "Expo Router", "Firebase", "Google Sign-In", "TypeScript"],
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
      "SwiftUI iOS app for browsing news headlines via horizontal swipe gestures. MVVM architecture cleanly separates Models, Views, ViewModels, and Services, with on-device asset catalogs and native SwiftUI components throughout.",
    category: "apps",
    featured: false,
    image: "/projects/swipe-news.png",
    carouselImage: "/projects/swipe-news-wide.png",
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
      "NTUA UI/UX course final project. A Flutter prototype exploring goal tracking with photo-based progress capture. Built collaboratively with two teammates, with the course's UI/UX focus over production readiness.",
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
      "Team of four built a Netflix-style movie, TV, and people browser on top of the TMDb API. Next.js + Redux frontend with a custom multi-carousel and search-result views. Express backend with OpenAPI 3.0 documentation, Postman API tests, and a Python-driven CLI test harness for functional testing of every endpoint.",
    category: "apps",
    featured: false,
    image: "/projects/ntuaflix.png",
    links: { github: "https://github.com/anagnole/NTUAflix" },
    stack: ["Next.js", "React", "Redux", "Express", "TMDb API", "OpenAPI 3.0", "Postman", "Python"],
    status: "coursework",
    progress:
      "Final submission for the 2023-2024 NTUA Software Engineering course. Four-person team. Recently moved from the team org to my personal account.",
  },
  {
    slug: "lib-ece-dbms",
    name: "ECE Library DBMS",
    tagline: "Flask + MySQL university library system",
    description:
      "NTUA Database Systems coursework. A library management web app built on Flask using the Blueprints pattern, with MySQL as the backing store, WTForms for field validation and CSRF protection, and Faker-generated demo data. Modular per-entity routes and forms, Jinja2 templates in a shared folder, and full ER plus relational schema diagrams documented alongside the code.",
    category: "apps",
    featured: false,
    image: "/projects/lib-ece-dbms.png",
    links: { github: "https://github.com/anagnole/LIB_ECE_DBMS" },
    stack: ["Python", "Flask", "MySQL", "WTForms", "Jinja2", "Faker"],
    status: "coursework",
    progress: "Final submission for NTUA Database Systems.",
  },
  {
    slug: "altify",
    name: "Altify Components",
    tagline: "React Native and web component library prototype",
    description:
      "Cross-platform component library prototype built with Expo, React Native Web, and Storybook. Shared design primitives that render natively on iOS and Android, and as accessible components on the web.",
    category: "apps",
    featured: false,
    image: "/projects/altify.png",
    links: { github: "https://github.com/anagnole/react-native-web-altify" },
    stack: ["React Native", "Expo", "React Native Web", "Storybook"],
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

export function getActiveProjects() {
  return projects.filter((p) => p.status === "active");
}
