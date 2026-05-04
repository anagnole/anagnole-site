import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

export const metadata: Metadata = {
  title: "Blog",
  description: "Posts on knowledge graphs, agents, MCP, and building AI systems.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="anim-fade-up">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Blog</h1>
        <p className="mb-10 text-neutral-600 dark:text-neutral-400">
          Notes on knowledge graphs, agents, and what I'm building.
        </p>
      </div>
      {posts.length === 0 ? (
        <p className="text-neutral-500">No posts yet.</p>
      ) : (
        <div className="anim-fade-up anim-delay-1">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
