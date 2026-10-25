"use client";

import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { SUGGESTED_PROMPTS } from "@/data/defaultPrompts";

export function EmptyState({ onSelectPrompt }) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-warm-sm">
      <div className="w-14 h-14 rounded-3xl bg-[var(--accent-coral-light)] flex items-center justify-center text-[var(--accent-coral)] mb-4 shadow-warm-sm">
        <Sparkles className="w-7 h-7" aria-hidden="true" />
      </div>

      <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-1.5">
        Your Creative Canvas is Ready
      </h3>
      <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md mb-6">
        Describe any scene or imagination in the panel on the left, or pick one of these curated prompt inspirations to begin synthesizing:
      </p>

      {/* Suggested Prompts Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl text-left">
        {SUGGESTED_PROMPTS.map((item, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectPrompt(item.prompt)}
            className="p-3.5 rounded-2xl bg-[var(--bg-panel-peach)] hover:bg-[var(--bg-hover)] border border-[var(--border-subtle)] hover:border-[var(--accent-coral)] transition-all duration-200 cursor-pointer group active:scale-[0.99] flex flex-col justify-between"
          >
            <div>
              <p className="text-xs font-semibold text-[var(--text-primary)] mb-1 flex items-center justify-between">
                <span>{item.title}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[var(--accent-coral)] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </p>
              <p className="text-[11px] text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                {item.prompt}
              </p>
            </div>
            <div className="flex items-center gap-1.5 mt-2.5">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--accent-coral)] font-medium">
                {item.style}
              </span>
              <span className="text-[10px] text-[var(--text-muted)]">{item.aspectRatio}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
