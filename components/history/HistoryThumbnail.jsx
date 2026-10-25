"use client";

import React, { useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

export const HistoryThumbnail = React.memo(function HistoryThumbnail({
  generation,
  isActive,
  onClick,
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const firstOutput = generation.outputs?.[0];
  const thumbUrl = firstOutput?.thumbUrl || firstOutput?.url;
  const isVideo = generation.type === "video";

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        role="button"
        aria-pressed={isActive}
        aria-label={`Load generation: ${generation.prompt}`}
        onClick={() => onClick(generation.id)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        className={cn(
          "relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border transition-all duration-200 cursor-pointer active:scale-95 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-coral)]",
          isActive
            ? "border-[var(--accent-coral)] ring-2 ring-[var(--accent-coral)]/40 shadow-warm-sm scale-[1.03]"
            : "border-[var(--border-subtle)] hover:border-[var(--border-hover)] hover:scale-[1.03]"
        )}
      >
        {thumbUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumbUrl}
            alt={generation.prompt}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-[var(--bg-subtle)] flex items-center justify-center text-[10px] text-[var(--text-muted)]">
            Art
          </div>
        )}

        {/* Video indicator badge */}
        {isVideo && (
          <div className="absolute bottom-1 right-1 p-0.5 rounded-full bg-black/60 text-white backdrop-blur-xs">
            <Play className="w-2.5 h-2.5 fill-white" aria-hidden="true" />
          </div>
        )}

        {/* Active subtle tint */}
        {isActive && (
          <div className="absolute inset-0 bg-[var(--accent-coral)]/10 pointer-events-none" />
        )}
      </button>

      {/* Floating prompt tooltip */}
      {showTooltip && (
        <div
          role="tooltip"
          className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 w-52 p-2 rounded-xl bg-[var(--text-primary)] text-white text-[11px] leading-tight shadow-warm-lg animate-in fade-in"
        >
          <p className="line-clamp-2">{generation.prompt}</p>
          <p className="text-[10px] text-[var(--accent-coral-border)] mt-1 font-medium">
            {generation.model} • {generation.type === "video" ? "Video" : `${generation.outputs?.length || 4} imgs`}
          </p>
        </div>
      )}
    </div>
  );
});
