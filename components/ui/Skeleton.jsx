"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-[var(--bg-subtle)] animate-shimmer relative overflow-hidden",
        className
      )}
      aria-hidden="true"
      {...props}
    />
  );
}

export function GenerationSkeletonCard({ aspectRatio = "3:4", index = 0 }) {
  const aspectClass =
    aspectRatio === "1:1"
      ? "aspect-square"
      : aspectRatio === "16:9"
      ? "aspect-video"
      : "aspect-[3/4]";

  return (
    <div
      className={cn(
        "relative rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] p-2 shadow-warm-sm overflow-hidden flex flex-col justify-between",
        aspectClass
      )}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="w-full h-full rounded-xl bg-[var(--bg-subtle)] animate-shimmer flex flex-col items-center justify-center p-4">
        <div className="w-8 h-8 rounded-full border-2 border-[var(--accent-coral)]/30 border-t-[var(--accent-coral)] animate-spin mb-3" />
        <div className="h-2.5 w-24 bg-[var(--border-subtle)] rounded-full mb-1.5" />
        <div className="h-2 w-16 bg-[var(--border-subtle)]/70 rounded-full" />
      </div>
      <div className="absolute top-3.5 right-3.5 px-2 py-0.5 rounded-full bg-[var(--bg-card)]/80 text-[10px] font-medium text-[var(--accent-coral)] shadow-xs">
        Synthesizing...
      </div>
    </div>
  );
}
