import Link from "next/link";
import { site } from "@/content/site";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/70 backdrop-blur dark:border-neutral-800/80 dark:bg-neutral-950/70">
      <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-tight transition hover:opacity-70"
        >
          {site.handle}
        </Link>
        <ul className="flex items-center gap-6 text-sm">
          <li>
            <Link href="/projects" className="nav-link">
              Projects
            </Link>
          </li>
          <li>
            <a
              href={site.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              GitHub
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
