"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, History } from "lucide-react";
import { HistoryThumbnail } from "./HistoryThumbnail";
import { cn } from "@/lib/utils";

export function HistoryStrip({
  generations = [],
  activeGenerationId,
  onSelectGeneration,
  onViewAll,
  className,
}) {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section
      aria-label="Generation History Strip"
      className={cn(
        "w-full rounded-2xl sm:rounded-3xl bg-[var(--bg-card)]/90 backdrop-blur-md border border-[var(--border-subtle)] shadow-warm-sm px-3 sm:px-4 py-2 sm:py-2.5 transition-colors duration-200",
        className
      )}
    >
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Label and View All button */}
        <div className="flex items-center gap-2 shrink-0 pr-2 border-r border-[var(--border-subtle)]">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-primary)]">
            <History className="w-3.5 h-3.5 text-[var(--accent-coral)]" aria-hidden="true" />
            <span className="hidden xs:inline">History</span>
            <span className="px-1.5 py-0.5 rounded-full bg-[var(--bg-subtle)] text-[10px] text-[var(--text-secondary)] font-medium">
              {generations.length}
            </span>
          </div>

          <button
            type="button"
            onClick={onViewAll}
            className="text-[11px] text-[var(--text-secondary)] hover:text-[var(--accent-coral)] font-medium transition-colors cursor-pointer select-none"
          >
            / View All
          </button>
        </div>

        {/* Scroll Left Button (hidden on touch/mobile) */}
        <button
          type="button"
          onClick={() => scroll("left")}
          aria-label="Scroll history strip left"
          className="hidden sm:flex w-7 h-7 rounded-xl items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors shrink-0 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
        </button>

        {/* Scrollable Thumbnails row */}
        <div
          ref={scrollContainerRef}
          className="flex-1 flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 scroll-smooth"
        >
          {generations.map((gen) => (
            <HistoryThumbnail
              key={gen.id}
              generation={gen}
              isActive={gen.id === activeGenerationId}
              onClick={onSelectGeneration}
            />
          ))}
        </div>

        {/* Scroll Right Button */}
        <button
          type="button"
          onClick={() => scroll("right")}
          aria-label="Scroll history strip right"
          className="hidden sm:flex w-7 h-7 rounded-xl items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors shrink-0 cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
