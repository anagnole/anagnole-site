import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import matter from "gray-matter";
import { marked } from "marked";

export type DraftFrontmatter = {
  title: string;
  date: string;
  description: string;
  tags: string[];
  image?: string;
};

export type Draft = DraftFrontmatter & {
  slug: string;
  content: string;
};

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");
const DRAFTS_DIR = path.join(BLOG_DIR, "_drafts");

function ensureDraftsDir() {
  if (!fs.existsSync(DRAFTS_DIR)) {
    fs.mkdirSync(DRAFTS_DIR, { recursive: true });
  }
}

export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(slug);
}

export function listDrafts(): Draft[] {
  ensureDraftsDir();
  const files = fs
    .readdirSync(DRAFTS_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
  return files
    .map((file) => readDraft(file.replace(/\.(md|mdx)$/, "")))
    .filter((d): d is Draft => d !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function readDraft(slug: string): Draft | null {
  ensureDraftsDir();
  const filePath = path.join(DRAFTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? new Date().toISOString().slice(0, 10),
    description: data.description ?? "",
    tags: Array.isArray(data.tags) ? data.tags : [],
    image: typeof data.image === "string" ? data.image : undefined,
    content,
  };
}

export function createDraft(slug: string): Draft {
  ensureDraftsDir();
  if (!isValidSlug(slug)) {
    throw new Error("Invalid slug. Use lowercase letters, numbers, and hyphens.");
  }
  const filePath = path.join(DRAFTS_DIR, `${slug}.md`);
  if (fs.existsSync(filePath)) {
    throw new Error(`Draft "${slug}" already exists.`);
  }

  const frontmatter: DraftFrontmatter = {
    title: "",
    date: new Date().toISOString().slice(0, 10),
    description: "",
    tags: [],
  };
  const body = "";
  writeDraftFile(slug, frontmatter, body);
  return { slug, ...frontmatter, content: body };
}

export function saveDraft(
  slug: string,
  frontmatter: DraftFrontmatter,
  content: string
): Draft {
  ensureDraftsDir();
  if (!isValidSlug(slug)) {
    throw new Error("Invalid slug.");
  }
  writeDraftFile(slug, frontmatter, content);
  return { slug, ...frontmatter, content };
}

export function deleteDraft(slug: string): void {
  const filePath = path.join(DRAFTS_DIR, `${slug}.md`);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}

export function publishDraft(slug: string): { published: string } {
  const draftPath = path.join(DRAFTS_DIR, `${slug}.md`);
  const publishedPath = path.join(BLOG_DIR, `${slug}.md`);

  if (!fs.existsSync(draftPath)) {
    throw new Error(`Draft "${slug}" not found.`);
  }
  if (fs.existsSync(publishedPath)) {
    throw new Error(`A published post with slug "${slug}" already exists.`);
  }

  const draft = readDraft(slug);
  if (!draft) throw new Error("Failed to read draft.");
  if (!draft.title.trim()) {
    throw new Error("Cannot publish: title is empty.");
  }

  fs.renameSync(draftPath, publishedPath);

  try {
    execSync(
      `git add "${publishedPath}" "${draftPath}" && git commit -m "publish: ${slug}" && git push`,
      {
        cwd: process.cwd(),
        stdio: "pipe",
      }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(
      `Published to filesystem but git operation failed: ${message}`
    );
  }

  return { published: publishedPath };
}

export function renderMarkdown(content: string): string {
  return marked.parse(content, { async: false }) as string;
}

function writeDraftFile(
  slug: string,
  frontmatter: DraftFrontmatter,
  content: string
) {
  const filePath = path.join(DRAFTS_DIR, `${slug}.md`);
  const yaml = matter.stringify(content, frontmatter);
  fs.writeFileSync(filePath, yaml, "utf8");
}
