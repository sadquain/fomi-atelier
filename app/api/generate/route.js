import { NextResponse } from "next/server";
import { MODELS } from "@/data/modelsData";

// Local image pool (20 portrait images in public/media/images)
const LOCAL_IMAGE_POOLS = [
  { url: "/media/images/portrait-01.jpg", alt: "Ceramic portrait sculpture with soft craquelure finish and warm rose peony blossoms" },
  { url: "/media/images/portrait-02.jpg", alt: "Studio portrait with glazed porcelain texture and subtle golden fissures" },
  { url: "/media/images/portrait-03.jpg", alt: "Artistic portrait with soft peach lighting and delicate botanical framing" },
  { url: "/media/images/portrait-04.jpg", alt: "Warm toned studio sculpture portrait with pastel floral petals" },
  { url: "/media/images/portrait-05.jpg", alt: "Minimalist architectural arch overlooking warm sand dunes during golden hour" },
  { url: "/media/images/portrait-06.jpg", alt: "Sunlit curved concrete sanctuary pavilion with soft terracotta shadows" },
  { url: "/media/images/portrait-07.jpg", alt: "Abstract warm dune waves reflecting twilight magenta and amber sky" },
  { url: "/media/images/portrait-08.jpg", alt: "Sculptural glass dome interior capturing dramatic desert horizon light" },
  { url: "/media/images/portrait-09.jpg", alt: "Editorial portrait of a woman looking forward with natural skin texture and soft rim lighting" },
  { url: "/media/images/portrait-10.jpg", alt: "High fashion studio portrait with elegant styling and soft diffused lighting" },
  { url: "/media/images/portrait-11.jpg", alt: "Refined portrait with subtle specular highlights and studio backdrop" },
  { url: "/media/images/portrait-12.jpg", alt: "Artistic portrait with delicate facial contouring and warm peach radiance" },
  { url: "/media/images/portrait-13.jpg", alt: "Rain slicked street with vibrant neon reflections and holographic signs" },
  { url: "/media/images/portrait-14.jpg", alt: "Narrow neon alley illuminated by vibrant teal and fuchsia lanterns" },
  { url: "/media/images/portrait-15.jpg", alt: "Moody wet street corridor with glowing cyberpunk shopfront displays" },
  { url: "/media/images/portrait-16.jpg", alt: "Atmospheric cityscape at night with misty cyan reflections in water puddles" },
  { url: "/media/images/portrait-17.jpg", alt: "Lush botanical greenhouse interior with warm afternoon sunlight filtering through glass" },
  { url: "/media/images/portrait-18.jpg", alt: "Curated potted plants and botanical conservatory with delicate dew reflections" },
  { url: "/media/images/portrait-19.jpg", alt: "Sunlit conservatory with hanging ferns and vintage ceramic pots" },
  { url: "/media/images/portrait-20.jpg", alt: "Peaceful greenhouse scene with warm amber glow on wooden study benches" },
];

const LOCAL_VIDEO_POOLS = [
  {
    videoUrl: "/media/videos/video-01.mp4",
    posterUrl: "/media/videos/video-poster-01.jpg",
    alt: "Fluid bioluminescent tendrils and swirling water currents in crystal blue canyon",
  },
  {
    videoUrl: "/media/videos/video-02.mp4",
    posterUrl: "/media/videos/video-poster-02.jpg",
    alt: "Macro suspension of terracotta droplets forming intricate tendrils",
  },
  {
    videoUrl: "/media/videos/video-03.mp4",
    posterUrl: "/media/videos/video-poster-03.jpg",
    alt: "Volumetric ink swirls with ambient luminous highlights in water",
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

    // Simulate AI neural network latency (1600ms)
    await new Promise((resolve) => setTimeout(resolve, 1600));

    const modelObj = MODELS.find((m) => m.id === modelId) || MODELS[0];
    const genId = `gen-${Date.now()}`;
    const count = type === "video" ? 1 : Math.max(1, Math.min(8, Number(numOutputs) || 4));

    let outputs = [];

    if (type === "video") {
      const vidMeta = LOCAL_VIDEO_POOLS[Math.abs(seed) % LOCAL_VIDEO_POOLS.length];
      outputs.push({
        id: `out-${genId}-1`,
        url: vidMeta.posterUrl,
        thumbUrl: vidMeta.posterUrl,
        videoUrl: vidMeta.videoUrl,
        posterUrl: vidMeta.posterUrl,
        alt: vidMeta.alt,
        duration,
        resolution,
        motionStrength,
        width: 1024,
        height: 576,
        aspectRatio: aspectRatio || "16:9",
        isFavorite: false,
      });
    } else {
      const startIndex = Math.abs(seed) % LOCAL_IMAGE_POOLS.length;
      for (let i = 0; i < count; i++) {
        const poolIndex = (startIndex + i * 3) % LOCAL_IMAGE_POOLS.length;
        const baseItem = LOCAL_IMAGE_POOLS[poolIndex];
        outputs.push({
          id: `out-${genId}-${i + 1}`,
          url: baseItem.url,
          thumbUrl: baseItem.url,
          alt: baseItem.alt,
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
