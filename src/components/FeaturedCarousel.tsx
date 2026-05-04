"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "@/components/Arrow";
import {
  CATEGORY_META,
  STATUS_META,
  type Project,
} from "@/content/projects";

export function FeaturedCarousel({ projects }: { projects: Project[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      setCanPrev(track.scrollLeft > 4);
      setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 4);
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [projects.length]);

  const step = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project) => (
          <div
            key={project.slug}
            className="w-full shrink-0 snap-start"
          >
            <CarouselTile project={project} />
          </div>
        ))}
      </div>

      <CarouselArrow
        direction="left"
        onClick={() => step(-1)}
        disabled={!canPrev}
      />
      <CarouselArrow
        direction="right"
        onClick={() => step(1)}
        disabled={!canNext}
      />
    </div>
  );
}

function CarouselTile({ project }: { project: Project }) {
  const meta = CATEGORY_META[project.category];
  const status = STATUS_META[project.status];

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group relative block aspect-[2/1] overflow-hidden rounded-xl ${
        project.image ? "bg-neutral-900" : meta.gradient
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
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
            {meta.label}
          </span>
        </div>
      )}

      <div className={`absolute left-0 right-0 top-0 h-[3px] ${meta.bar}`} />

      <span
        className={`absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/85 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide ring-1 ring-inset backdrop-blur ${status.ring} ${status.text} dark:bg-neutral-950/80`}
      >
        <span className="relative inline-flex h-1.5 w-1.5">
          {project.status === "active" && (
            <span
              className={`absolute inline-flex h-full w-full animate-ping rounded-full ${status.dot} opacity-60`}
            />
          )}
          <span
            className={`relative inline-flex h-1.5 w-1.5 rounded-full ${status.dot}`}
          />
        </span>
        {status.label}
      </span>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
        <h3 className="text-base font-semibold text-white drop-shadow-sm sm:text-lg">
          {project.name}
        </h3>
      </div>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-black/70 p-6 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <h3 className="mb-2 text-lg font-semibold text-white">
          {project.name}
        </h3>
        <p className="mb-3 text-sm text-white/80">{project.tagline}</p>
        <div className="flex flex-wrap justify-center gap-1.5">
          {project.stack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="rounded bg-white/15 px-2 py-0.5 font-mono text-[11px] text-white"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

function CarouselArrow({
  direction,
  onClick,
  disabled,
}: {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}) {
  const positionClass = direction === "left" ? "left-2 sm:left-3" : "right-2 sm:right-3";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Previous" : "Next"}
      className={`absolute top-1/2 z-10 -translate-y-1/2 ${positionClass} flex h-16 w-10 cursor-pointer items-center justify-center rounded-xl bg-neutral-900/85 text-white shadow-lg backdrop-blur transition duration-200 hover:scale-110 hover:bg-neutral-900 hover:shadow-xl active:scale-95 disabled:pointer-events-none disabled:opacity-0 dark:bg-neutral-100/85 dark:text-neutral-900 dark:hover:bg-neutral-100`}
    >
      <Arrow direction={direction} size={18} />
    </button>
  );
}
