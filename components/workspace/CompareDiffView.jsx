"use client";

import React, { useState } from "react";
import {
  SplitSquareVertical,
  Sliders,
  Check,
  ArrowRight,
  GitMerge,
  Star,
  Columns,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function CompareDiffView({
  nodeA,
  nodeB,
  allNodes = [],
  onSelectNodeB,
  onPickWinner,
}) {
  const [compareMode, setCompareMode] = useState("swipe"); // "swipe" | "split"
  const [sliderPos, setSliderPos] = useState(50); // percentage 0-100

  if (!nodeA || !nodeB) {
    return (
      <div className="w-full flex-1 flex flex-col items-center justify-center p-8 text-center bg-[var(--bg-card)]">
        <SplitSquareVertical className="w-12 h-12 text-[var(--accent-coral)] mb-3 opacity-60" />
        <h3 className="text-base font-bold text-[var(--text-primary)]">Select Two Nodes to Compare</h3>
        <p className="text-xs text-[var(--text-secondary)] max-w-sm mt-1">
          Pick a parent and a forked variant to inspect optical changes, prompt additions, and parameter drift.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex-1 flex flex-col p-4 sm:p-6 overflow-y-auto no-scrollbar gap-5">
      {/* Compare Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-warm-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span className="text-xs font-bold text-[var(--text-primary)]">
              {nodeA.title} (Parent)
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-[var(--text-muted)]" />
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-coral)]" />
            <span className="text-xs font-bold text-[var(--text-primary)]">
              {nodeB.title} (Fork Variant)
            </span>
          </div>
        </div>

        {/* View Mode Toggle: Swipe Curtain vs Split Screen */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
            <button
              type="button"
              onClick={() => setCompareMode("swipe")}
              className={cn(
                "flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer",
                compareMode === "swipe"
                  ? "bg-[var(--bg-card)] text-[var(--accent-coral)] shadow-xs"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              )}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Swipe Curtain</span>
            </button>
            <button
              type="button"
              onClick={() => setCompareMode("split")}
              className={cn(
                "flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer",
                compareMode === "split"
                  ? "bg-[var(--bg-card)] text-[var(--accent-coral)] shadow-xs"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              )}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Side-by-Side</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => onPickWinner(nodeB.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--accent-coral)] hover:bg-[var(--accent-coral-hover)] text-white text-xs font-semibold cursor-pointer shadow-warm-sm"
          >
            <Star className="w-3.5 h-3.5 fill-white" />
            <span>Select Fork as Hero</span>
          </button>
        </div>
      </div>

      {/* Visual Comparison Stage */}
      {compareMode === "swipe" ? (
        <div className="relative w-full max-w-5xl mx-auto aspect-video rounded-3xl overflow-hidden bg-black shadow-2xl border border-[var(--border-subtle)] select-none">
          {/* Base Image (Node B - Variant) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={nodeB.imageUrl}
            alt={nodeB.title}
            className="absolute inset-0 w-full h-full object-contain"
          />

          {/* Overlaid Image (Node A - Parent) with Clip Path based on slider position */}
          <div
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={nodeA.imageUrl}
              alt={nodeA.title}
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>

          {/* Divider line and handle */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-2xl cursor-ew-resize z-20 pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-stone-900 shadow-xl flex items-center justify-center text-xs font-bold">
              ⇄
            </div>
          </div>

          {/* Hidden range input to control slider cleanly */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPos}
            onChange={(e) => setSliderPos(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
            aria-label="Before/after comparison wipe position"
          />

          {/* Labels on each side */}
          <span className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-semibold pointer-events-none">
            Before: {nodeA.title}
          </span>
          <span className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-full bg-[var(--accent-coral)]/90 backdrop-blur-md text-white text-xs font-semibold pointer-events-none">
            After: {nodeB.title}
          </span>
        </div>
      ) : (
        /* Side by Side Split Mode */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto w-full">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-primary)]">
              <span>Parent: {nodeA.title}</span>
              <span className="text-[10px] text-[var(--text-muted)] font-mono">{nodeA.model}</span>
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden bg-black border border-[var(--border-subtle)] shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={nodeA.imageUrl} alt={nodeA.title} className="w-full h-full object-contain" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-semibold text-[var(--accent-coral)]">
              <span>Variant: {nodeB.title}</span>
              <span className="text-[10px] text-[var(--text-muted)] font-mono">{nodeB.model}</span>
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden bg-black border border-[var(--border-subtle)] shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={nodeB.imageUrl} alt={nodeB.title} className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      )}

      {/* Parameter & Prompt Delta Table */}
      <div className="max-w-5xl mx-auto w-full rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] p-5 shadow-warm-sm space-y-4">
        <h4 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[var(--accent-coral)]" />
          <span>Synthesis Parameter Delta</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
            <span className="text-[10px] text-[var(--text-muted)] block">Seed Drift</span>
            <span className="font-mono text-[var(--text-primary)] block mt-0.5">
              {nodeA.seed} → <strong className="text-[var(--accent-coral)]">{nodeB.seed}</strong>
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
            <span className="text-[10px] text-[var(--text-muted)] block">Guidance Scale</span>
            <span className="font-mono text-[var(--text-primary)] block mt-0.5">
              {nodeA.guidance} → <strong className="text-[var(--accent-coral)]">{nodeB.guidance}</strong>
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
            <span className="text-[10px] text-[var(--text-muted)] block">Sampling Steps</span>
            <span className="font-mono text-[var(--text-primary)] block mt-0.5">
              {nodeA.steps} → <strong className="text-[var(--accent-coral)]">{nodeB.steps}</strong>
            </span>
          </div>
        </div>

        {/* Prompt Diff Box */}
        <div>
          <span className="text-[11px] font-semibold text-[var(--text-secondary)] block mb-1">
            Prompt Token Modification:
          </span>
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-900 dark:text-amber-200">
            {nodeB.diffFromParent}
          </div>
        </div>
      </div>
    </div>
  );
}
