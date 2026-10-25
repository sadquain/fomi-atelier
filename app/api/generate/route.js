import { NextResponse } from "next/server";
import { MODELS } from "@/data/modelsData";

// Curated image pools for realistic AI visual generations
const CURATED_IMAGE_POOLS = [
  "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
];

const CURATED_VIDEO_POOLS = [
  {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-fluid-colors-in-water-in-slow-motion-42658-large.mp4",
    posterUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
  },
  {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-43306-large.mp4",
    posterUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80",
  },
  {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4",
    posterUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  },
];

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      prompt,
      negativePrompt = "",
      type = "image",
      modelId = "fomi-flux-ultra",
      aspectRatio = "3:4",
      numOutputs = 4,
      seed = Math.floor(Math.random() * 900000) + 100000,
      style = "none",
      duration = "5s",
      resolution = "1080p",
      motionStrength = 6,
    } = body;

    // Validate prompt
    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return NextResponse.json(
        { success: false, error: "Prompt is required to synthesize generation." },
        { status: 400 }
      );
    }

    // Simulate AI neural network latency (1800ms)
    await new Promise((resolve) => setTimeout(resolve, 1800));

    const modelObj = MODELS.find((m) => m.id === modelId) || MODELS[0];
    const genId = `gen-${Date.now()}`;
    const count = type === "video" ? 1 : Math.max(1, Math.min(8, Number(numOutputs) || 4));

    let outputs = [];

    if (type === "video") {
      const vidMeta = CURATED_VIDEO_POOLS[Math.abs(seed) % CURATED_VIDEO_POOLS.length];
      outputs.push({
        id: `out-${genId}-1`,
        url: vidMeta.posterUrl,
        thumbUrl: vidMeta.posterUrl,
        videoUrl: vidMeta.videoUrl,
        posterUrl: vidMeta.posterUrl,
        duration,
        resolution,
        motionStrength,
        width: 1024,
        height: 576,
        aspectRatio: aspectRatio || "16:9",
        isFavorite: false,
      });
    } else {
      const startIndex = Math.abs(seed) % CURATED_IMAGE_POOLS.length;
      for (let i = 0; i < count; i++) {
        const poolIndex = (startIndex + i * 3) % CURATED_IMAGE_POOLS.length;
        const baseImg = CURATED_IMAGE_POOLS[poolIndex];
        outputs.push({
          id: `out-${genId}-${i + 1}`,
          url: baseImg,
          thumbUrl: baseImg.replace("w=800", "w=240"),
          width: 768,
          height: 1024,
          aspectRatio,
          isFavorite: false,
        });
      }
    }

    const generation = {
      id: genId,
      prompt: prompt.trim(),
      negativePrompt,
      type,
      model: modelObj.name,
      modelId: modelObj.id,
      aspectRatio,
      numOutputs: count,
      createdAt: new Date().toISOString(),
      seed,
      style,
      isFavorite: false,
      outputs,
    };

    return NextResponse.json({
      success: true,
      data: generation,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to generate assets. Please try again." },
      { status: 500 }
    );
  }
}
