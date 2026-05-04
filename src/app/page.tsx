import Link from "next/link";
import { site } from "@/content/site";
import { projects, getFeaturedProjects, getActiveProjects } from "@/content/projects";
import { Arrow } from "@/components/Arrow";
import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import { NowWorkingOn } from "@/components/NowWorkingOn";

export default function HomePage() {
  const featuredSlugs = new Set(getFeaturedProjects().map((p) => p.slug));
  const carouselProjects = [
    ...projects.filter((p) => featuredSlugs.has(p.slug)),
    ...projects.filter((p) => !featuredSlugs.has(p.slug)),
  ];
  const activeProjects = getActiveProjects();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <section className="anim-fade-up mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
          {site.name}
        </h1>
        {site.bio.map((paragraph, i) => (
          <p
            key={i}
            className="mb-3 text-base leading-relaxed text-neutral-700 dark:text-neutral-300"
          >
            {paragraph}
          </p>
        ))}
      </section>

      <section className="anim-fade-up anim-delay-1 mb-16">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Projects</h2>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-1.5 text-sm text-neutral-500 transition hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            Browse all
            <Arrow
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
        <FeaturedCarousel projects={carouselProjects} />
      </section>

      {activeProjects.length > 0 && (
        <section className="anim-fade-up anim-delay-2 mb-16">
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="text-xl font-semibold tracking-tight">
              Currently working on
            </h2>
            <span className="font-mono text-xs text-neutral-500">
              {String(activeProjects.length).padStart(2, "0")}
            </span>
          </div>
          <NowWorkingOn projects={activeProjects} />
        </section>
      )}
    </div>
  );
}
