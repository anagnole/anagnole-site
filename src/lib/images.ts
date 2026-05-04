import fs from "node:fs";
import path from "node:path";
import { fal } from "@fal-ai/client";

const DEFAULT_MODEL = "fal-ai/flux/dev";

export type GeneratedImage = {
  publicPath: string;
  prompt: string;
  model: string;
};

let configured = false;
function configureFal() {
  if (configured) return;
  const key = process.env.FAL_KEY;
  if (!key) {
    throw new Error(
      "FAL_KEY is not set. Add it to .env.local to enable image generation."
    );
  }
  fal.config({ credentials: key });
  configured = true;
}

export async function generateHeaderImage(
  slug: string,
  prompt: string,
  model: string = DEFAULT_MODEL
): Promise<GeneratedImage> {
  configureFal();

  const result = await fal.subscribe(model, {
    input: {
      prompt,
      image_size: "landscape_16_9",
      num_inference_steps: 28,
      num_images: 1,
      enable_safety_checker: false,
    },
  });

  const data = result.data as {
    images?: Array<{ url: string }>;
  };
  const imageUrl = data.images?.[0]?.url;
  if (!imageUrl) {
    throw new Error("fal returned no image URL.");
  }

  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch generated image: ${response.status}`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());

  const dir = path.join(process.cwd(), "public/blog", slug);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const fileName = "header.png";
  const filePath = path.join(dir, fileName);
  fs.writeFileSync(filePath, buffer);

  return {
    publicPath: `/blog/${slug}/${fileName}`,
    prompt,
    model,
  };
}
