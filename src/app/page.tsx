import Link from "next/link";
import { site } from "@/content/site";
import { projects, getFeaturedProjects } from "@/content/projects";
import { getRecentPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { Arrow } from "@/components/Arrow";
import { FeaturedCarousel } from "@/components/FeaturedCarousel";

export default function HomePage() {
  const featuredSlugs = new Set(getFeaturedProjects().map((p) => p.slug));
  const carouselProjects = [
    ...projects.filter((p) => featuredSlugs.has(p.slug)),
    ...projects.filter((p) => !featuredSlugs.has(p.slug)),
  ];
  const recentPosts = getRecentPosts(3);

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

      {recentPosts.length > 0 && (
        <section className="anim-fade-up anim-delay-3">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="text-xl font-semibold tracking-tight">Writing</h2>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-1.5 text-sm text-neutral-500 transition hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              All posts
              <Arrow
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
          <div>
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
