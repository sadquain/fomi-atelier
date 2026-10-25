"use client";

import React, { useState } from "react";
import { Sparkles, Trash2, Copy, Repeat, Check, ChevronDown, ChevronUp } from "lucide-react";
import { ResultCard } from "./ResultCard";
import { formatTimestamp, cn } from "@/lib/utils";

export const GenerationTurn = React.memo(function GenerationTurn({
  generation,
  isActive,
  onOpenLightbox,
  onToggleFavorite,
  onReusePrompt,
  onDeleteTurn,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const outputs = generation.outputs || [];
  const isVideo = generation.type === "video";
  const numOutputs = outputs.length;

  const handleCopyPrompt = () => {
    try {
      navigator.clipboard.writeText(generation.prompt);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const isLongPrompt = generation.prompt.length > 180;
  const displayPrompt = isExpanded || !isLongPrompt
    ? generation.prompt
    : `${generation.prompt.slice(0, 180)}...`;

  return (
    <article
      id={`generation-${generation.id}`}
      aria-label={`Generation from ${formatTimestamp(generation.createdAt)}`}
      className={cn(
        "rounded-3xl p-3 sm:p-5 transition-all duration-300",
        isActive
          ? "bg-[var(--bg-panel-secondary)] border border-[var(--border-accent)]/50 shadow-warm-sm"
          : "bg-transparent hover:bg-[var(--bg-subtle)]/40"
      )}
    >
      {/* 1. Chat-style User Prompt Bubble */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3.5 p-3.5 rounded-2xl bg-[var(--bubble-bg)] border border-[var(--bubble-border)] shadow-warm-sm">
        <div className="flex items-start gap-2.5 flex-1 min-w-0">
          <div className="w-7 h-7 rounded-xl bg-[var(--accent-coral-light)] flex items-center justify-center text-[var(--accent-coral)] shrink-0 mt-0.5">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-xs sm:text-sm font-medium text-[var(--text-primary)] leading-relaxed">
              &ldquo;{displayPrompt}&rdquo;
              {isLongPrompt && (
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="inline-flex items-center text-[11px] text-[var(--accent-coral)] font-semibold ml-1.5 cursor-pointer hover:underline"
                >
                  {isExpanded ? (
                    <>Show less <ChevronUp className="w-3 h-3 ml-0.5" /></>
                  ) : (
                    <>Read more <ChevronDown className="w-3 h-3 ml-0.5" /></>
                  )}
                </button>
              )}
            </div>

            {/* Model Chip and metadata */}
            <div className="flex flex-wrap items-center gap-1.5 mt-2 text-[11px]">
              {/* "Model" tag chip */}
              <span className="px-2.5 py-0.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] font-semibold text-[var(--text-primary)] shadow-xs">
                Model: {generation.model}
              </span>

              {/* Ratio chip */}
              <span className="px-2 py-0.5 rounded-full bg-[var(--bg-subtle)] text-[var(--text-secondary)]">
                {generation.aspectRatio || "3:4"}
              </span>

              {/* Type chip */}
              <span className="px-2 py-0.5 rounded-full bg-[var(--bg-subtle)] text-[var(--text-secondary)] capitalize">
                {isVideo ? "Video" : `${numOutputs} images`}
              </span>

              {/* Timestamp */}
              <span className="text-[10px] text-[var(--text-muted)] ml-1">
                {formatTimestamp(generation.createdAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Turn Level Actions: Reuse, Copy, Delete */}
        <div className="flex items-center gap-1 shrink-0 self-end sm:self-center">
          <button
            type="button"
            onClick={() => onReusePrompt(generation.prompt)}
            aria-label="Reuse this prompt in editor"
            title="Reuse prompt"
            className="p-1.5 rounded-xl text-[var(--text-secondary)] hover:text-[var(--accent-coral)] hover:bg-[var(--bg-card)] transition-colors cursor-pointer"
          >
            <Repeat className="w-4 h-4" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={handleCopyPrompt}
            aria-label="Copy prompt text"
            title="Copy prompt"
            className="p-1.5 rounded-xl text-[var(--text-secondary)] hover:text-[var(--accent-coral)] hover:bg-[var(--bg-card)] transition-colors cursor-pointer"
          >
            {isCopied ? (
              <Check className="w-4 h-4 text-emerald-500" aria-hidden="true" />
            ) : (
              <Copy className="w-4 h-4" aria-hidden="true" />
            )}
          </button>

          {onDeleteTurn && (
            <button
              type="button"
              onClick={() => onDeleteTurn(generation.id)}
              aria-label="Delete generation turn"
              title="Delete turn"
              className="p-1.5 rounded-xl text-[var(--text-secondary)] hover:text-rose-500 hover:bg-[var(--bg-card)] transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Grid of Result Images / Video (4 columns on desktop, 3 on tablet, 2 on mobile) */}
      <div
        className={cn(
          "grid gap-3 sm:gap-4 max-h-[680px] overflow-y-auto pr-1 no-scrollbar sm:no-scrollbar",
          isVideo
            ? "grid-cols-1 max-w-2xl"
            : numOutputs === 1
            ? "grid-cols-1 max-w-md"
            : numOutputs === 2
            ? "grid-cols-2"
            : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4"
        )}
      >
        {outputs.map((output, idx) => (
          <ResultCard
            key={output.id || idx}
            output={output}
            generation={generation}
            index={idx}
            onOpenLightbox={onOpenLightbox}
            onToggleFavorite={onToggleFavorite}
            onReusePrompt={onReusePrompt}
          />
        ))}
      </div>
    </article>
  );
});
