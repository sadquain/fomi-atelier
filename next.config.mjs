/** @type {import('next').NextConfig} */
const nextConfig = {
  // Retaining @tailwindcss/turbopack loader as native Next.js 16 Turbopack pipeline for Tailwind CSS v4
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
