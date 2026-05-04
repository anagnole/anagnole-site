import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

function formatDate(date: string) {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block border-b border-neutral-200 py-5 last:border-b-0 dark:border-neutral-800"
    >
      <div className="mb-1 flex items-baseline justify-between gap-4">
        <h3 className="text-base font-semibold tracking-tight group-hover:opacity-70">
          {post.title}
        </h3>
        <time className="shrink-0 font-mono text-xs text-neutral-500">
          {formatDate(post.date)}
        </time>
      </div>
      {post.description && (
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {post.description}
        </p>
      )}
    </Link>
  );
}
