export const MODELS = [
  {
    id: "fomi-flux-ultra",
    name: "Fomi Flux Ultra",
    category: "image",
    badge: "Fast & Crisp",
    description: "Next-gen photorealism with flawless anatomy and lighting",
    resolution: "Up to 2048px",
    speed: "~1.8s",
  },
  {
    id: "fomi-vivid-3",
    name: "Fomi Vivid v3",
    category: "image",
    badge: "Aesthetic",
    description: "Lush digital illustration and editorial portraiture",
    resolution: "Up to 1536px",
    speed: "~2.1s",
  },
  {
    id: "sdxl-turbo",
    name: "SDXL Turbo",
    category: "image",
    badge: "Ultra Fast",
    description: "Lightning-fast iteration for rapid concept sketching",
    resolution: "1024px",
    speed: "~0.9s",
  },
  {
    id: "midjourney-v6",
    name: "Midjourney v6.1",
    category: "image",
    badge: "Artistic",
    description: "Iconic cinematic coherence and color grading",
    resolution: "Up to 2048px",
    speed: "~2.4s",
  },
  {
    id: "wan-2.1-video",
    name: "Wan 2.1 Video",
    category: "video",
    badge: "Cinematic Motion",
    description: "Fluid text-to-video diffusion with natural camera moves",
    resolution: "1080p / 60fps",
    speed: "~3.2s",
  },
  {
    id: "higgs-motion-pro",
    name: "Higgsfield Motion Pro",
    category: "video",
    badge: "Physics Sim",
    description: "Dynamic fluid and cloth motion with cinematic lighting",
    resolution: "1080p / 30fps",
    speed: "~2.9s",
  },
];

export const ASPECT_RATIOS = [
  { id: "3:4", label: "Portrait", ratio: "3:4", width: 768, height: 1024, icon: "portrait" },
  { id: "1:1", label: "Square", ratio: "1:1", width: 1024, height: 1024, icon: "square" },
  { id: "4:3", label: "Landscape", ratio: "4:3", width: 1024, height: 768, icon: "landscape" },
  { id: "9:16", label: "Story", ratio: "9:16", width: 576, height: 1024, icon: "story" },
  { id: "16:9", label: "Cinema", ratio: "16:9", width: 1024, height: 576, icon: "cinema" },
];

export const BATCH_SIZES = [1, 2, 4, 8];
