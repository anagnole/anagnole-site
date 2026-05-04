<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# anagnole-site — content update guide

This is a personal site and blog. Its structure is intentionally simple so that any AI assistant can update the content without touching the build system. Read this before making changes.

## Project layout

```
src/
  app/
    page.tsx                  Homepage
    blog/
      page.tsx                Blog index
      [slug]/page.tsx         Single post
    projects/page.tsx         All projects
    layout.tsx                Root layout (nav + footer)
    globals.css               Global styles + .post-content markdown styles
  components/
    Nav.tsx
    Footer.tsx
    ProjectCard.tsx
    PostCard.tsx
  content/
    site.ts                   Bio, links, site metadata
    projects.ts               Project data (source of truth)
    blog/
      hello-world.md          Posts as markdown files
      ...
  lib/
    posts.ts                  Markdown reader (gray-matter + marked)
```

## Code conventions

- No code comments. If it isn't self-evident from the name, rename the thing.
- Use the `@/*` import alias for anything inside `src/`.
- Pages are React Server Components unless they specifically need interactivity.
- No unused code, no speculative abstractions. Keep it boring.

## How to add a new blog post

1. Create `src/content/blog/<slug>.md`.
2. Add frontmatter:
   ```
   ---
   title: "Your title"
   date: "YYYY-MM-DD"
   description: "One-line hook for the blog index."
   tags: ["tag1", "tag2"]
   ---
   ```
3. Write the body in plain markdown.
4. The post appears automatically at `/blog/<slug>` and on the homepage/blog index. Sorting is by `date` descending.
5. Images go in `public/blog/<slug>/image.png` and are referenced as `/blog/<slug>/image.png`.

## How to update the bio or links

Edit `src/content/site.ts`. The `bio` array is one paragraph per entry.

## How to add or edit a project

Edit `src/content/projects.ts`.

- Every project has: `slug`, `name`, `tagline`, `description`, `category`, `featured`, `links`, `stack`.
- Optional: `image` — path like `/projects/<slug>.png`. File goes in `public/projects/`. If omitted, the card shows a colored gradient fallback based on category.
- `category` must be one of: `knowledge-graphs`, `agents`, `ml`, `infrastructure`, `apps`. Each category has an accent color defined in `CATEGORY_META` in `src/content/projects.ts`.
- `featured: true` shows the project on the homepage (aim for 4 featured).
- Project order on the projects page is the array order, grouped by category.
- `links.github` is the primary link. If present, the whole card becomes a link to it.

## How to feature a different set of projects

Flip `featured: true`/`false` in `src/content/projects.ts`. The homepage reads `getFeaturedProjects()`.

## Styling

- Tailwind v4 via `@tailwindcss/postcss`.
- Typography for rendered markdown lives in `.post-content` inside `src/app/globals.css`. Edit that file if you want to change how posts look.
- Dark mode is automatic via `prefers-color-scheme`.

## Deployment

Deployed on Vercel from GitHub. A `git push` to `main` deploys.

## What not to do

- Don't add a CMS, database, or fetch content at runtime. Everything is static at build time.
- Don't import from `node:fs` outside `src/lib/posts.ts`.
- Don't edit `.next/` or anything generated.
- Don't add comments that just restate the code.
