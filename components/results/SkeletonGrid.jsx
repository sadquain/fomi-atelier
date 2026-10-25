"use client";

import React from "react";
import { GenerationSkeletonCard } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";

export function SkeletonGrid({
  numOutputs = 4,
  aspectRatio = "3:4",
  type = "image",
  prompt,
  model,
  className,
}) {
  const count = type === "video" ? 1 : numOutputs;

  return (
    <section
      aria-live="polite"
      aria-busy="true"
      aria-label="Synthesizing generation in progress"
      className={cn("space-y-3 animate-in fade-in duration-300", className)}
    >
      {/* Turn prompt bubble with status chip */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 sm:p-3.5 rounded-2xl bg-[var(--bubble-bg)] border border-[var(--bubble-border)] shadow-warm-sm">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent-coral)] animate-ping" />
          <p className="text-xs sm:text-sm font-medium text-[var(--text-primary)] line-clamp-1 italic">
            &ldquo;{prompt}&rdquo;
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-2 py-0.5 rounded-full bg-[var(--accent-coral-light)] text-[var(--accent-coral)] font-semibold text-[11px]">
            {model}
          </span>
          <span className="text-[11px] text-[var(--text-secondary)] font-medium">
            Generating {type === "video" ? "cinematic video" : `${count} images`}...
          </span>
        </div>
      </div>

      {/* Grid of Skeleton Cards with Shimmer */}
      <div
        className={cn(
          "grid gap-3 sm:gap-4",
          count === 1
            ? "grid-cols-1 max-w-xl"
            : count === 2
            ? "grid-cols-2"
            : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4"
        )}
      >
        {Array.from({ length: count }).map((_, idx) => (
          <GenerationSkeletonCard key={idx} index={idx} aspectRatio={aspectRatio} />
        ))}
      </div>
    </section>
  );
}
