import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fal } from "@fal-ai/client";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public/projects");

function loadEnv() {
  const envPath = path.join(ROOT, ".env.local");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^"(.*)"$/, "$1");
    }
  }
}

const REPO_SCREENSHOTS = {
  "ehr-clinical-assistant": {
    repo: "EHR-Clinical-Assistant",
    branch: "HEAD",
    file: "docs/demo-screenshot.png",
  },
  "image-cleaner-ai": {
    repo: "ImageCleanerAI",
    branch: "HEAD",
    file: "screenshots/ui.png",
  },
};

const PROMPTS = {
  brainifai:
    "Abstract knowledge graph visualization with hundreds of glowing interconnected nodes radiating from a central hub, deep navy blue and electric cyan color palette, clean minimalist tech aesthetic, dark gradient background, sharp focus, 16:9 hero composition",
  "ehr-clinical-assistant":
    "Stylized medical knowledge graph overlay on a soft hospital data dashboard, glowing nodes representing patients and conditions linked by translucent edges, blue and teal palette, clean clinical tech aesthetic, abstract not literal, 16:9",
  mycelium:
    "A small-world network graph of glowing agent nodes shaped like fungal mycelium threads spreading organically, warm amber and orange highlights on a dark background, science art aesthetic, intricate detail, 16:9",
  crucible:
    "A molten crucible of light at the center of a network of agent nodes, sparks and tension lines radiating outward, deep amber gold and ember palette, dramatic lighting, abstract conceptual art, 16:9",
  alfred:
    "A floating macOS menu bar AI assistant orb with subtle audio waveform rings, dark space gray background with cool blue accents, minimal Apple design language, 16:9",
  "wake-word-ml":
    "An audio waveform passing through a small neural network of glowing nodes, MFCC spectrogram overlay, emerald green and teal palette, scientific visualization style, dark background, 16:9",
  "image-cleaner-ai":
    "A medical x-ray image with overlaid measurement lines and labels being magically dissolved by AI, before and after split, soft clinical greens and whites, 16:9",
  "thesis-ddh-preprocessing":
    "A pediatric hip x-ray side by side with a cleaned version, faint geometric measurement lines fading away, monochrome with subtle teal tint, scientific medical imaging aesthetic, 16:9",
  "pattern-recognition":
    "A 3D accelerometer signal trace transitioning through three states (standing, walking, running), with a hidden Markov model state diagram overlay, emerald and teal palette on dark background, scientific plot aesthetic, 16:9",
  "biosignal-sleep-analysis":
    "Layered EEG, EOG, and EMG waveforms transitioning through sleep stages with subtle wavelet decomposition overlay, deep purple and emerald palette, scientific visualization, dark background, 16:9",
  "agent-manager":
    "A retro terminal UI with multiple tabs running side by side, neon green and amber CRT text on dark slate background, vintage tech aesthetic, 16:9",
  "claude-cli-wrapper":
    "Three abstract provider icons (cloud, terminal, server) connected to a single unified API endpoint, slate gray with subtle blue and orange accents, clean infographic style, dark background, 16:9",
  "office-sim":
    "Isometric pixel art of a small office with workers at desks and small AI manager characters, warm sunny palette, charming game art style, 16:9",
  "vec3-comparison":
    "Two abstract vector database clusters compared side by side with performance bar charts overlaid, slate and teal palette, scientific benchmark plot aesthetic, dark background, 16:9",
  ticketing:
    "Kubernetes pods arranged like microservice tickets flowing through a streaming pipeline, slate blue and white palette, infrastructure diagram aesthetic, 16:9",
  brainstorm:
    "A central lightbulb idea exploding into 27 distinct cognitive perspectives radiating outward as colored thought bubbles, warm amber and rainbow accents on dark background, 16:9",
  aballos:
    "An overhead view of an outdoor city basketball court with glowing pins indicating live check-ins, warm sunset rose and amber palette, mobile app aesthetic with subtle map overlay, 16:9",
  "swipe-news":
    "An iPhone screen with a stack of news cards mid-swipe transition, vibrant rose and pink palette, clean iOS design language, 16:9",
  "snap-goals":
    "A Flutter mobile app mockup showing a goal-tracking timeline with photo snapshots, soft pastel pink and cream palette, friendly UI design, 16:9",
  "lib-ece-dbms":
    "An abstract library shelf merging into an entity-relationship diagram with tables and connecting lines, warm rose and parchment palette, academic infographic, 16:9",
  altify:
    "A grid of cross-platform UI components (button, input, card) rendering identically on iOS, Android, and web silhouettes, soft rose and pink palette, design system aesthetic, 16:9",
};

async function downloadFromRepo(slug) {
  const cfg = REPO_SCREENSHOTS[slug];
  if (!cfg) return false;
  const url = `https://raw.githubusercontent.com/anagnole/${cfg.repo}/${cfg.branch}/${cfg.file}`;
  console.log(`  fetching ${url}`);
  const r = await fetch(url);
  if (!r.ok) {
    console.warn(`  failed (${r.status}), will fall back to fal`);
    return false;
  }
  const buf = Buffer.from(await r.arrayBuffer());
  fs.writeFileSync(path.join(OUT_DIR, `${slug}.png`), buf);
  return true;
}

async function generateFal(slug, prompt) {
  const result = await fal.subscribe("fal-ai/flux/dev", {
    input: {
      prompt,
      image_size: "landscape_16_9",
      num_inference_steps: 28,
      num_images: 1,
      enable_safety_checker: false,
    },
  });
  const imageUrl = result.data?.images?.[0]?.url;
  if (!imageUrl) throw new Error(`fal returned no image for ${slug}`);
  const r = await fetch(imageUrl);
  if (!r.ok) throw new Error(`download failed for ${slug}: ${r.status}`);
  const buf = Buffer.from(await r.arrayBuffer());
  fs.writeFileSync(path.join(OUT_DIR, `${slug}.png`), buf);
}

async function main() {
  loadEnv();
  if (!process.env.FAL_KEY) {
    throw new Error("FAL_KEY missing from .env.local");
  }
  fal.config({ credentials: process.env.FAL_KEY });
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const slugs = Object.keys(PROMPTS);
  const force = process.argv.includes("--force");
  for (const slug of slugs) {
    const out = path.join(OUT_DIR, `${slug}.png`);
    if (fs.existsSync(out) && !force) {
      console.log(`skip ${slug} (exists)`);
      continue;
    }
    console.log(`> ${slug}`);
    if (REPO_SCREENSHOTS[slug]) {
      const ok = await downloadFromRepo(slug);
      if (ok) {
        console.log(`  saved real screenshot`);
        continue;
      }
    }
    console.log(`  generating via fal...`);
    await generateFal(slug, PROMPTS[slug]);
    console.log(`  generated`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
