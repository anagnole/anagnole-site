import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 px-6 py-8 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <div className="flex gap-4">
          <a href={site.links.github} target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 dark:hover:text-neutral-100">
            GitHub
          </a>
          <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 dark:hover:text-neutral-100">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
