import Image from "next/image";
import Link from "next/link";
import { CATEGORY_META, STATUS_META, type Project } from "@/content/projects";
import { Arrow } from "@/components/Arrow";

export function NowWorkingOn({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  return (
    <ul className="flex flex-col gap-4 sm:gap-5">
      {projects.map((project, index) => {
        const reverse = index % 2 === 1;
        const meta = CATEGORY_META[project.category];
        const status = STATUS_META[project.status];

        return (
          <li key={project.slug}>
            <Link
              href={`/projects/${project.slug}`}
              className={`group grid grid-cols-[5rem_1fr] items-center gap-4 sm:gap-6 ${
                reverse
                  ? "sm:grid-cols-[1fr_8rem]"
                  : "sm:grid-cols-[8rem_1fr]"
              }`}
            >
              <div
                className={`relative aspect-square w-full overflow-hidden rounded-lg ${
                  reverse ? "sm:order-2" : ""
                } ${project.image ? "bg-neutral-100 dark:bg-neutral-900" : meta.gradient}`}
              >
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="(max-width: 640px) 80px, 128px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                      {meta.label}
                    </span>
                  </div>
                )}
              </div>

              <div
                className={`flex min-w-0 flex-col justify-center ${
                  reverse ? "sm:order-1" : ""
                }`}
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="relative inline-flex h-1.5 w-1.5">
                    <span
                      className={`absolute inline-flex h-full w-full animate-ping rounded-full ${status.dot} opacity-60`}
                    />
                    <span
                      className={`relative inline-flex h-1.5 w-1.5 rounded-full ${status.dot}`}
                    />
                  </span>
                  <span
                    className={`font-mono text-[11px] uppercase tracking-wide ${status.text}`}
                  >
                    {status.label}
                  </span>
                  <span className="text-neutral-300 dark:text-neutral-700">·</span>
                  <span className="font-mono text-[11px] uppercase tracking-wide text-neutral-500">
                    {meta.label}
                  </span>
                </div>
                <h3 className="mb-1 text-lg font-semibold tracking-tight transition group-hover:text-neutral-700 dark:group-hover:text-neutral-300 sm:text-xl">
                  {project.name}
                </h3>
                <p className="mb-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {project.tagline}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300">
                  Read more
                  <Arrow
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
