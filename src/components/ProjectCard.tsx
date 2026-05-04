import Image from "next/image";
import Link from "next/link";
import { CATEGORY_META, STATUS_META, type Project } from "@/content/projects";
import { Arrow } from "@/components/Arrow";

export function ProjectCard({ project }: { project: Project }) {
  const meta = CATEGORY_META[project.category];
  const status = STATUS_META[project.status];

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="card-lift group flex h-full flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950"
    >
      <div className={`h-[3px] w-full ${meta.bar}`} />

      <div
        className={`relative aspect-[2/1] w-full overflow-hidden ${
          project.image ? "" : meta.gradient
        }`}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width: 640px) 100vw, 400px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              {meta.label}
            </span>
          </div>
        )}
        <span
          className={`absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/85 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide ring-1 ring-inset backdrop-blur ${status.ring} ${status.text} dark:bg-neutral-950/80`}
        >
          <span className="relative inline-flex h-1.5 w-1.5">
            {project.status === "active" && (
              <span
                className={`absolute inline-flex h-full w-full animate-ping rounded-full ${status.dot} opacity-60`}
              />
            )}
            <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${status.dot}`} />
          </span>
          {status.label}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold tracking-tight">
            {project.name}
          </h3>
          <Arrow
            size={14}
            className="mt-1 shrink-0 text-neutral-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-neutral-700 dark:group-hover:text-neutral-200"
          />
        </div>
        <p className="mb-3 text-sm text-neutral-600 dark:text-neutral-400">
          {project.tagline}
        </p>
        <p className="mb-4 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          {project.description}
        </p>
        <div className="mt-auto flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-neutral-100 px-2 py-0.5 font-mono text-xs text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
