---
title: I built this blog's admin in an afternoon (and it only runs on my laptop)
date: '2026-04-09'
description: >-
  The case for a local-only admin on a statically-deployed personal site — and
  the ~500 lines of Next.js it took.
tags:
  - meta
  - nextjs
  - blogging
image: /blog/building-this-blog/header.png?t=1775747279828
---

This is the first post on this site. It felt wrong to write *about* anything before writing about the site itself, so here we are — a short piece on how this thing was built, and one opinion I keep running into when people ask about their own blogs.

The opinion first:

**Your personal blog's admin interface should only work on your laptop.**

Not behind a login. Not on `yourdomain.com/admin` with a password. Literally unreachable from the public internet. This site you're reading was built with that rule in mind, and I think more personal blogs should follow it.

## The setup

The public side of this site is a boring static Next.js app. Markdown files in `src/content/blog/`, parsed at build time with `gray-matter`, rendered with `marked`, deployed to Vercel on every `git push`. Nothing novel. The moment you add a database or a CMS, you've turned a three-file project into a four-service project, and for what — to avoid opening a text editor?

The admin side is where it gets interesting. I wanted a proper editor: split-pane markdown with live preview, a drafts folder, one-click publish, and an image generator so I wouldn't have to manually create header art every time. The instinct most people have is to build this as a deployed app with auth. I think that's wrong, and here's why.

## The argument against a deployed admin

**Security surface.** A deployed admin is a login form on the internet. Attackers will find it. Even if it's "just" a personal blog, leaving an auth endpoint exposed is inviting a class of problems I don't need. Password resets, brute-force attempts, token leaks, the works. None of that exists if the admin simply isn't accessible from anywhere but my machine.

**Platform complexity.** On Vercel or any serverless host, writing files from a request handler is awkward. No persistent disk. You end up committing via the GitHub API, which means token management, API rate limits, and a whole second code path. All that complexity for a feature you use to solve the problem a text editor already solves.

**The phone argument, debunked.** The usual counter is "but what if I want to write a post from my phone?" Here's the honest answer: you don't. Long-form technical writing happens at a keyboard. The rare draft-on-mobile urge is solved by Apple Notes + copy-paste. Building a whole deployed admin for a workflow you'll use three times a year is a bad trade.

**You already run the dev server.** When you're writing, you're already running `npm run dev` to preview your site. The admin is just a different URL on the same server. No extra process, no extra deploy, no extra anything.

## The implementation

The whole admin is maybe 500 lines. The interesting parts:

**Production guard.** The admin lives at `src/app/admin/layout.tsx`, and the first thing it does is check `process.env.NODE_ENV === "production"` and call `notFound()`. When the site builds on Vercel, that constant is set, and every `/admin/*` route becomes a 404. No middleware, no auth, no env flags — just a single conditional that Next.js evaluates at build time.

**Server actions do the writing.** The editor is a client component; the save, publish, and delete buttons call server actions that read and write files directly with `node:fs`. No API routes, no fetch calls, no state management library. Server actions are what Next.js should have shipped with five years ago.

**Publish is just a git commit.** "Publishing" a draft means moving the file from `src/content/blog/_drafts/` to `src/content/blog/` and running `git add && git commit && git push`. Vercel picks up the push and rebuilds. Total round-trip from "click publish" to "post is live" is under a minute, and the whole thing is auditable in git history.

**The draft editor is a textarea.** Not a rich-text editor. Not a Notion-clone. A textarea on the left, a rendered preview on the right, both using the same CSS classes as the live site so what I see matches what gets published. Rich editors are bad at markdown, and they introduce bugs that don't exist in the simplest possible solution.

## Image generation

I also wired in AI image generation, because most posts benefit from a header image and I'm not going to manually make one every time. The implementation is one function in `src/lib/images.ts`: call `fal.ai`'s FLUX model with a prompt, download the result, save it to `public/blog/<slug>/header.png`, and return the path. Two cents per generation, and the prompt auto-fills from the post title so I usually just click Generate and move on.

This is the part where, if I were less disciplined, I'd let an agent do the writing too. I'm specifically not doing that. Images are a visual grace note; the writing is the point of the blog. Automating the writing would be automating the signal away.

## What's next

The next iteration is going to plug this admin into [Brainifai](/projects) — my personal knowledge graph — so that the system can *suggest* topics based on recent activity and draft posts with context pulled from the graph. But the keyword there is *suggest*. The writing stays on my keyboard. The AI gets to do the part that's tedious (gather context, attach citations, generate the header image) and leaves the part that's actually me (the narrative, the opinions, the tone) alone.

More on that when it's built.

---

*This post was written in this site's own admin at `localhost:3000/admin`, with a header image generated from fal.ai in about 30 seconds. The whole system is open source in [the site's repo](#).*
