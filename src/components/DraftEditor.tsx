"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { marked } from "marked";
import {
  deleteDraftAction,
  generateImageAction,
  publishDraftAction,
  saveDraftAction,
} from "@/app/admin/actions";
import type { Draft } from "@/lib/drafts";

type Status = "idle" | "saving" | "saved" | "error";

export function DraftEditor({ draft }: { draft: Draft }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [title, setTitle] = useState(draft.title);
  const [date, setDate] = useState(draft.date);
  const [description, setDescription] = useState(draft.description);
  const [tags, setTags] = useState(draft.tags.join(", "));
  const [image, setImage] = useState<string | undefined>(draft.image);
  const [content, setContent] = useState(draft.content);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imagePrompt, setImagePrompt] = useState("");
  const [imageGenerating, setImageGenerating] = useState(false);

  const preview = marked.parse(content || "*Nothing to preview yet.*", {
    async: false,
  }) as string;

  const currentFrontmatter = () => ({
    title,
    date,
    description,
    tags: tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    image,
  });

  const handleSave = () => {
    setStatus("saving");
    setError(null);
    startTransition(async () => {
      try {
        await saveDraftAction(draft.slug, currentFrontmatter(), content);
        setStatus("saved");
        setTimeout(() => setStatus("idle"), 1500);
      } catch (e) {
        setStatus("error");
        setError(e instanceof Error ? e.message : String(e));
      }
    });
  };

  const handlePublish = () => {
    if (!title.trim()) {
      setError("Cannot publish: title is empty.");
      setStatus("error");
      return;
    }
    const ok = window.confirm(
      `Publish "${title}"?\n\nThis will move the file to src/content/blog/ and commit + push to git.`
    );
    if (!ok) return;

    setError(null);
    startTransition(async () => {
      try {
        await saveDraftAction(draft.slug, currentFrontmatter(), content);
        await publishDraftAction(draft.slug);
      } catch (e) {
        setStatus("error");
        setError(e instanceof Error ? e.message : String(e));
      }
    });
  };

  const handleDelete = () => {
    const ok = window.confirm(
      `Delete draft "${draft.slug}"? This cannot be undone.`
    );
    if (!ok) return;
    startTransition(async () => {
      try {
        await deleteDraftAction(draft.slug);
      } catch (e) {
        setStatus("error");
        setError(e instanceof Error ? e.message : String(e));
      }
    });
  };

  const openImageModal = () => {
    const defaultPrompt = title
      ? `Abstract technical blog header illustration for a post titled "${title}". Minimal, clean, editorial, slight gradient, muted palette.`
      : "Abstract technical blog header illustration. Minimal, clean, editorial, slight gradient, muted palette.";
    setImagePrompt(defaultPrompt);
    setImageModalOpen(true);
  };

  const handleGenerateImage = async () => {
    setImageGenerating(true);
    setError(null);
    try {
      const result = await generateImageAction(draft.slug, imagePrompt);
      const displayPath = `${result.publicPath}?t=${Date.now()}`;
      setImage(displayPath);
      await saveDraftAction(
        draft.slug,
        { ...currentFrontmatter(), image: result.publicPath },
        content
      );
      setImageModalOpen(false);
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 1500);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setStatus("error");
    } finally {
      setImageGenerating(false);
    }
  };

  const handleRemoveImage = () => {
    setImage(undefined);
    startTransition(async () => {
      try {
        await saveDraftAction(
          draft.slug,
          { ...currentFrontmatter(), image: undefined },
          content
        );
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      }
    });
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
        >
          ← Admin
        </button>
        <div className="flex items-center gap-2">
          {status === "saved" && (
            <span className="text-xs text-emerald-600 dark:text-emerald-400">
              Saved
            </span>
          )}
          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm text-neutral-600 transition hover:border-red-400 hover:text-red-600 disabled:opacity-50 dark:border-neutral-700 dark:text-neutral-400"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isPending}
            className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm font-medium transition hover:border-neutral-900 disabled:opacity-50 dark:border-neutral-700 dark:hover:border-neutral-100"
          >
            {status === "saving" ? "Saving…" : "Save"}
          </button>
          <button
            type="button"
            onClick={handlePublish}
            disabled={isPending}
            className="rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:opacity-50"
          >
            Publish
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          {error}
        </div>
      )}

      <section className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-wide text-neutral-500">
            Header image
          </span>
          <div className="flex gap-2">
            {image && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="text-xs text-neutral-500 hover:text-red-600"
              >
                Remove
              </button>
            )}
            <button
              type="button"
              onClick={openImageModal}
              className="rounded-md border border-neutral-300 px-2 py-1 text-xs hover:border-neutral-900 dark:border-neutral-700 dark:hover:border-neutral-100"
            >
              {image ? "Regenerate" : "Generate with AI"}
            </button>
          </div>
        </div>
        {image ? (
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
            <Image
              src={image}
              alt="Header preview"
              fill
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-cover"
              unoptimized
            />
          </div>
        ) : (
          <div className="flex aspect-[16/9] w-full items-center justify-center rounded-lg border border-dashed border-neutral-300 bg-neutral-50 text-xs text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900">
            No image yet
          </div>
        )}
      </section>

      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs uppercase tracking-wide text-neutral-500">
            Title
          </span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-xs uppercase tracking-wide text-neutral-500">
            Date
          </span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-lg border border-neutral-300 bg-white px-3 py-2 font-mono text-sm dark:border-neutral-700 dark:bg-neutral-900"
          />
        </label>
        <label className="flex flex-col gap-1 sm:col-span-2">
          <span className="font-mono text-xs uppercase tracking-wide text-neutral-500">
            Description
          </span>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
          />
        </label>
        <label className="flex flex-col gap-1 sm:col-span-2">
          <span className="font-mono text-xs uppercase tracking-wide text-neutral-500">
            Tags (comma-separated)
          </span>
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="rounded-lg border border-neutral-300 bg-white px-3 py-2 font-mono text-sm dark:border-neutral-700 dark:bg-neutral-900"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <div className="mb-2 font-mono text-xs uppercase tracking-wide text-neutral-500">
            Markdown
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            spellCheck={false}
            className="h-[60vh] w-full resize-none rounded-lg border border-neutral-300 bg-white p-4 font-mono text-sm leading-relaxed dark:border-neutral-700 dark:bg-neutral-900"
          />
        </div>
        <div>
          <div className="mb-2 font-mono text-xs uppercase tracking-wide text-neutral-500">
            Preview
          </div>
          <div
            className="post-content h-[60vh] overflow-y-auto rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950"
            dangerouslySetInnerHTML={{ __html: preview }}
          />
        </div>
      </div>

      {imageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-xl rounded-xl border border-neutral-200 bg-white p-6 shadow-xl dark:border-neutral-800 dark:bg-neutral-950">
            <h3 className="mb-1 text-lg font-semibold tracking-tight">
              Generate header image
            </h3>
            <p className="mb-4 text-sm text-neutral-500">
              fal.ai · flux/dev · ~$0.025 per generation
            </p>
            <textarea
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
              rows={5}
              className="mb-4 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setImageModalOpen(false)}
                disabled={imageGenerating}
                className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm disabled:opacity-50 dark:border-neutral-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleGenerateImage}
                disabled={imageGenerating || !imagePrompt.trim()}
                className="rounded-lg bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white disabled:opacity-50 dark:bg-neutral-100 dark:text-neutral-900"
              >
                {imageGenerating ? "Generating…" : "Generate"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
