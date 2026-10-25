"use client";

import React from "react";
import Link from "next/link";
import {
  GitBranch,
  SplitSquareVertical,
  Eye,
  Command,
  Database,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { cn } from "@/lib/utils";

export function WorkspaceHeader({
  projectMetadata,
  viewMode,
  onViewModeChange,
  onOpenCommandPalette,
  onOpenProjectMemory,
}) {
  const { name, version, dna, heroCount, totalNodes } = projectMetadata;

  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--bg-card)]/90 backdrop-blur-xl border-b border-[var(--border-subtle)] px-4 sm:px-6 py-2.5 transition-colors duration-200 shadow-warm-sm">
      <div className="max-w-[1920px] mx-auto flex items-center justify-between gap-4">
        {/* Left: Project identity & Memory DNA quick chips */}
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/"
            title="Switch back to Classic Stream Mode"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-[var(--border-subtle)] hover:bg-[var(--bg-hover)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Classic Stream</span>
          </Link>

          <div className="h-5 w-px bg-[var(--border-subtle)] shrink-0 hidden sm:block" />

          {/* Project Title and Version Badge */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-bold text-sm text-[var(--text-primary)] truncate">
              {name}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[var(--accent-coral-light)] text-[var(--accent-coral)] text-[10px] font-semibold shrink-0">
              {version}
            </span>
            <span className="hidden xl:inline text-[11px] text-[var(--text-muted)]">
              • {totalNodes} nodes ({heroCount} heroes)
            </span>
          </div>

          {/* Project Memory DNA Quick Pill */}
          <button
            type="button"
            onClick={onOpenProjectMemory}
            title="Open Project Memory DNA (Key: M)"
            className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-2xl bg-[var(--bg-panel-peach)] border border-[var(--border-subtle)] hover:border-[var(--accent-coral)] transition-colors text-xs text-[var(--text-primary)] cursor-pointer"
          >
            <Database className="w-3.5 h-3.5 text-[var(--accent-coral)]" />
            <span className="font-medium text-[11px]">DNA:</span>
            {/* Character thumb */}
            <div className="flex items-center gap-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={dna.character.avatarUrl}
                alt={dna.character.name}
                className="w-4 h-4 rounded-full object-cover"
              />
              <span className="text-[11px] text-[var(--text-secondary)] font-medium">
                {dna.character.name}
              </span>
            </div>
            {/* Palette dots */}
            <div className="flex items-center -space-x-1 pl-1">
              {dna.palette.map((p, idx) => (
                <span
                  key={idx}
                  className="w-2.5 h-2.5 rounded-full ring-1 ring-white dark:ring-black"
                  style={{ backgroundColor: p.hex }}
                  title={`${p.name} (${p.hex})`}
                />
              ))}
            </div>
          </button>
        </div>

        {/* Center: View Switcher (Lineage Graph | Focused Canvas | Split Diff) */}
        <div className="flex items-center p-1 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] select-none">
          <button
            type="button"
            onClick={() => onViewModeChange("graph")}
            aria-pressed={viewMode === "graph"}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer",
              viewMode === "graph"
                ? "bg-[var(--bg-card)] text-[var(--accent-coral)] shadow-warm-sm border border-[var(--border-subtle)]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            )}
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Lineage Graph</span>
            <kbd className="hidden lg:inline text-[9px] px-1 py-0.2 bg-[var(--bg-subtle)] rounded font-mono text-[var(--text-muted)]">
              1
            </kbd>
          </button>

          <button
            type="button"
            onClick={() => onViewModeChange("canvas")}
            aria-pressed={viewMode === "canvas"}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer",
              viewMode === "canvas"
                ? "bg-[var(--bg-card)] text-[var(--accent-coral)] shadow-warm-sm border border-[var(--border-subtle)]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            )}
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Hero Canvas</span>
            <kbd className="hidden lg:inline text-[9px] px-1 py-0.2 bg-[var(--bg-subtle)] rounded font-mono text-[var(--text-muted)]">
              2
            </kbd>
          </button>

          <button
            type="button"
            onClick={() => onViewModeChange("compare")}
            aria-pressed={viewMode === "compare"}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer",
              viewMode === "compare"
                ? "bg-[var(--bg-card)] text-[var(--accent-coral)] shadow-warm-sm border border-[var(--border-subtle)]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            )}
          >
            <SplitSquareVertical className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Diff Compare</span>
            <kbd className="hidden lg:inline text-[9px] px-1 py-0.2 bg-[var(--bg-subtle)] rounded font-mono text-[var(--text-muted)]">
              3
            </kbd>
          </button>
        </div>

        {/* Right: Command Palette trigger, Theme Toggle, User Status */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Command Palette Button (⌘K) */}
          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-hover)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer shadow-warm-sm active:scale-95"
            title="Open Command Palette (Cmd+K)"
          >
            <Command className="w-3.5 h-3.5 text-[var(--accent-coral)]" />
            <span className="hidden md:inline font-medium">Palette</span>
            <kbd className="px-1.5 py-0.5 rounded-md bg-[var(--bg-subtle)] text-[10px] font-mono border border-[var(--border-subtle)]">
              ⌘K
            </kbd>
          </button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* User status */}
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-200 via-rose-300 to-coral-300 p-0.5 shadow-warm-sm">
            <div className="w-full h-full rounded-[10px] bg-[var(--bg-card)] flex items-center justify-center font-bold text-xs text-[var(--text-primary)]">
              PRO
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
