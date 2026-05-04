import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CATEGORY_META,
  STATUS_META,
  getAllProjectSlugs,
  getProjectBySlug,
  projects,
} from "@/content/projects";
import { Arrow } from "@/components/Arrow";

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Not found" };
  return {
    title: project.name,
    description: project.tagline,
  };
}

const LINK_LABELS: Record<string, string> = {
  github: "GitHub",
  npm: "npm",
  demo: "Demo",
  paper: "Paper",
};

export default async function ProjectDetailPage(
  props: PageProps<"/projects/[slug]">
) {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const meta = CATEGORY_META[project.category];
  const status = STATUS_META[project.status];
  const linkEntries = Object.entries(project.links).filter(
    ([, href]) => Boolean(href)
  ) as [keyof typeof LINK_LABELS, string][];

  const related = projects
    .filter((p) => p.category === project.category && p.slug !== project.slug)
    .slice(0, 3);

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/projects"
        className="group mb-8 inline-flex items-center gap-2 text-sm text-neutral-500 transition hover:text-neutral-900 dark:hover:text-neutral-100"
      >
        <Arrow direction="left" className="transition-transform group-hover:-translate-x-0.5" />
        All projects
      </Link>

      <header className="anim-fade-up mb-10">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-2.5 py-1 font-mono text-xs text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400">
            <span className={`inline-block h-1.5 w-1.5 rounded-full ${meta.dot}`} />
            {meta.label}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-2.5 py-1 font-mono text-xs ring-1 ring-inset ${status.ring} ${status.text} dark:bg-neutral-900`}
          >
            <span className={`relative inline-flex h-1.5 w-1.5`}>
              {project.status === "active" && (
                <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${status.dot} opacity-60`} />
              )}
              <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${status.dot}`} />
            </span>
            {status.label}
          </span>
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
          {project.name}
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          {project.tagline}
        </p>
      </header>

      <div
        className={`anim-fade-up anim-delay-1 relative mb-10 aspect-[2/1] w-full overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 ${
          project.image ? "" : meta.gradient
        }`}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover transition-transform duration-700 hover:scale-105"
            priority
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
              {meta.label}
            </span>
          </div>
        )}
      </div>

      <section className="anim-fade-up anim-delay-2 mb-10">
        <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-neutral-500">
          About
        </h2>
        <p className="text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
          {project.description}
        </p>
      </section>

      {project.progress && (
        <section className="anim-fade-up anim-delay-3 mb-10">
          <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-neutral-500">
            Status
          </h2>
          <p className="text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
            {project.progress}
          </p>
        </section>
      )}

      {project.nextSteps && project.nextSteps.length > 0 && (
        <section className="anim-fade-up anim-delay-3 mb-10">
          <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-neutral-500">
            Next steps
          </h2>
          <ul className="space-y-2">
            {project.nextSteps.map((step, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-base leading-relaxed text-neutral-700 dark:text-neutral-300"
              >
                <span className={`mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full ${meta.bar}`} />
                {step}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="anim-fade-up anim-delay-3 mb-10">
        <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-neutral-500">
          Stack
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-neutral-100 px-2 py-1 font-mono text-xs text-neutral-700 transition hover:bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {linkEntries.length > 0 && (
        <section className="anim-fade-up anim-delay-3 mb-12">
          <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-neutral-500">
            Links
          </h2>
          <div className="flex flex-wrap gap-3">
            {linkEntries.map(([key, href]) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5 hover:border-neutral-400 hover:shadow-sm dark:border-neutral-800 dark:hover:border-neutral-600"
              >
                {LINK_LABELS[key] ?? key}
                <Arrow
                  direction="up-right"
                  size={12}
                  className="text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-neutral-700 dark:group-hover:text-neutral-200"
                />
              </a>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-16 border-t border-neutral-200 pt-10 dark:border-neutral-800">
          <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-neutral-500">
            More in {meta.label}
          </h2>
          <ul className="space-y-1">
            {related.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="group flex items-center justify-between gap-4 rounded-lg px-3 py-3 transition hover:bg-neutral-50 dark:hover:bg-neutral-900"
                >
                  <div className="min-w-0">
                    <div className="font-medium">{p.name}</div>
                    <div className="truncate text-sm text-neutral-500">
                      {p.tagline}
                    </div>
                  </div>
                  <Arrow
                    size={14}
                    className="shrink-0 text-neutral-400 transition-transform group-hover:translate-x-1 group-hover:text-neutral-700 dark:group-hover:text-neutral-200"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
