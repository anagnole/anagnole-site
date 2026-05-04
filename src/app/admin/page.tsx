import Link from "next/link";
import { listDrafts } from "@/lib/drafts";
import { getAllPosts } from "@/lib/posts";
import { createDraftAction } from "./actions";

export default function AdminHomePage() {
  const drafts = listDrafts();
  const published = getAllPosts();

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Admin</h1>

      <section className="mb-12">
        <h2 className="mb-4 text-lg font-semibold tracking-tight">New draft</h2>
        <form action={createDraftAction} className="flex gap-2">
          <input
            name="slug"
            required
            pattern="^[a-z0-9][a-z0-9-]*[a-z0-9]$"
            placeholder="post-slug"
            className="flex-1 rounded-lg border border-neutral-300 bg-white px-3 py-2 font-mono text-sm dark:border-neutral-700 dark:bg-neutral-900"
          />
          <button
            type="submit"
            className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
          >
            Create
          </button>
        </form>
        <p className="mt-2 font-mono text-xs text-neutral-500">
          slug: lowercase letters, numbers, hyphens only.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-lg font-semibold tracking-tight">
          Drafts{" "}
          <span className="ml-1 font-mono text-xs text-neutral-500">
            ({drafts.length})
          </span>
        </h2>
        {drafts.length === 0 ? (
          <p className="text-sm text-neutral-500">No drafts yet.</p>
        ) : (
          <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {drafts.map((draft) => (
              <li key={draft.slug}>
                <Link
                  href={`/admin/${draft.slug}`}
                  className="group flex items-baseline justify-between gap-4 py-3 hover:opacity-80"
                >
                  <div className="min-w-0">
                    <div className="truncate font-medium">
                      {draft.title || (
                        <span className="text-neutral-400">(untitled)</span>
                      )}
                    </div>
                    <div className="truncate font-mono text-xs text-neutral-500">
                      {draft.slug}
                    </div>
                  </div>
                  <div className="shrink-0 text-xs text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300">
                    Edit →
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold tracking-tight">
          Published{" "}
          <span className="ml-1 font-mono text-xs text-neutral-500">
            ({published.length})
          </span>
        </h2>
        {published.length === 0 ? (
          <p className="text-sm text-neutral-500">No published posts yet.</p>
        ) : (
          <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {published.map((post) => (
              <li key={post.slug} className="py-3">
                <div className="flex items-baseline justify-between gap-4">
                  <div className="min-w-0">
                    <div className="truncate font-medium">{post.title}</div>
                    <div className="truncate font-mono text-xs text-neutral-500">
                      {post.slug} · {post.date}
                    </div>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="shrink-0 text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
                  >
                    View →
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
