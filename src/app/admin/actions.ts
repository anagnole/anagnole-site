"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createDraft,
  deleteDraft,
  publishDraft,
  saveDraft,
  type DraftFrontmatter,
} from "@/lib/drafts";
import { generateHeaderImage } from "@/lib/images";

function assertDev() {
  if (process.env.NODE_ENV === "production") {
    throw new Error("Admin actions disabled in production.");
  }
}

export async function createDraftAction(formData: FormData) {
  assertDev();
  const slug = String(formData.get("slug") ?? "").trim();
  if (!slug) return;
  createDraft(slug);
  revalidatePath("/admin");
  redirect(`/admin/${slug}`);
}

export async function saveDraftAction(
  slug: string,
  frontmatter: DraftFrontmatter,
  content: string
) {
  assertDev();
  saveDraft(slug, frontmatter, content);
  revalidatePath("/admin");
  revalidatePath(`/admin/${slug}`);
}

export async function deleteDraftAction(slug: string) {
  assertDev();
  deleteDraft(slug);
  revalidatePath("/admin");
  redirect("/admin");
}

export async function publishDraftAction(slug: string) {
  assertDev();
  publishDraft(slug);
  revalidatePath("/admin");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/");
  redirect("/admin");
}

export async function generateImageAction(
  slug: string,
  prompt: string
): Promise<{ publicPath: string }> {
  assertDev();
  if (!prompt.trim()) {
    throw new Error("Prompt is empty.");
  }
  const result = await generateHeaderImage(slug, prompt);
  revalidatePath(`/admin/${slug}`);
  return { publicPath: result.publicPath };
}
