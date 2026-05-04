import type { Metadata } from "next";
import {
  CATEGORY_META,
  getProjectsByCategory,
  type ProjectCategory,
} from "@/content/projects";
import { ProjectCard } from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Projects",
  description: "Everything I've built — knowledge graphs, agents, ML, and apps.",
};

const CATEGORY_ORDER: ProjectCategory[] = [
  "knowledge-graphs",
  "agents",
  "infrastructure",
  "ml",
  "apps",
];

export default function ProjectsPage() {
  const grouped = getProjectsByCategory();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="anim-fade-up">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Projects</h1>
        <p className="mb-12 text-neutral-600 dark:text-neutral-400">
          Things I've built. Click any project for status and next steps.
        </p>
      </div>
      {CATEGORY_ORDER.filter((c) => grouped[c]?.length).map((category, idx) => {
        const meta = CATEGORY_META[category];
        return (
          <section
            key={category}
            className={`anim-fade-up anim-delay-${Math.min(idx + 1, 5)} mb-12`}
          >
            <h2 className="mb-4 flex items-center gap-2 font-mono text-sm uppercase tracking-wide text-neutral-500">
              <span
                className={`inline-block h-2 w-2 rounded-full ${meta.dot}`}
              />
              {meta.label}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {grouped[category].map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
