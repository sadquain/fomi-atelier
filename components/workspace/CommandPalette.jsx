"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  GitBranch,
  SplitSquareVertical,
  Star,
  Sparkles,
  Sliders,
  Layers,
  ArrowRight,
  Database,
  ExternalLink,
  Ratio,
  Shuffle,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function CommandPalette({
  isOpen,
  onClose,
  onForkNode,
  onToggleCompare,
  onToggleHero,
  onOpenProjectMemory,
  onSetViewMode,
  onChangeModel,
  onChangeRatio,
  onRandomizeSeed,
  onSuggestNextShot,
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const commands = [
    // Branching & Node
    {
      id: "fork",
      category: "Branching & Workflow",
      title: "Fork Child Node from Active",
      shortcut: "F",
      icon: GitBranch,
      action: onForkNode,
    },
    {
      id: "compare",
      category: "Branching & Workflow",
      title: "Compare Active with Parent Node",
      shortcut: "C",
      icon: SplitSquareVertical,
      action: onToggleCompare,
    },
    {
      id: "hero",
      category: "Branching & Workflow",
      title: "Toggle Hero / Keep Status",
      shortcut: "S",
      icon: Star,
      action: onToggleHero,
    },
    {
      id: "suggest-next",
      category: "Branching & Workflow",
      title: "Suggest Next Shot (Project DNA)",
      shortcut: "N",
      icon: Sparkles,
      action: onSuggestNextShot,
    },
    // Views
    {
      id: "view-graph",
      category: "Workspace View",
      title: "Switch to Lineage Graph View",
      shortcut: "1",
      icon: GitBranch,
      action: () => onSetViewMode("graph"),
    },
    {
      id: "view-canvas",
      category: "Workspace View",
      title: "Switch to Focused Canvas View",
      shortcut: "2",
      icon: Eye,
      action: () => onSetViewMode("canvas"),
    },
    {
      id: "view-compare",
      category: "Workspace View",
      title: "Switch to Split Diff Inspector",
      shortcut: "3",
      icon: SplitSquareVertical,
      action: () => onSetViewMode("compare"),
    },
    {
      id: "project-memory",
      category: "Workspace View",
      title: "Open Project Memory DNA Drawer",
      shortcut: "M",
      icon: Database,
      action: onOpenProjectMemory,
    },
    // Engine & Parameters
    {
      id: "model-flux",
      category: "Engine & Parameters",
      title: "Set Model: Fomi Flux Ultra (4K Diffusion)",
      shortcut: "⌥1",
      icon: Layers,
      action: () => onChangeModel("Fomi Flux Ultra"),
    },
    {
      id: "model-wan",
      category: "Engine & Parameters",
      title: "Set Model: Wan 2.1 Video (Fluid Motion)",
      shortcut: "⌥2",
      icon: Layers,
      action: () => onChangeModel("Wan 2.1 Video"),
    },
    {
      id: "ratio-16-9",
      category: "Engine & Parameters",
      title: "Set Aspect Ratio: 16:9 Anamorphic Cinema",
      shortcut: "⌥R",
      icon: Ratio,
      action: () => onChangeRatio("16:9"),
    },
    {
      id: "roll-seed",
      category: "Engine & Parameters",
      title: "Roll New Latent Seed",
      shortcut: "⌥S",
      icon: Shuffle,
      action: onRandomizeSeed,
    },
  ];

  const filtered = query.trim()
    ? commands.filter(
        (c) =>
          c.title.toLowerCase().includes(query.toLowerCase()) ||
          c.category.toLowerCase().includes(query.toLowerCase()) ||
          c.shortcut.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
        onClose();
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4"
    >
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity animate-in fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        onKeyDown={handleKeyDown}
        className="relative z-10 w-full max-w-2xl rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95"
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--border-subtle)] bg-[var(--bg-panel-peach)]/50">
          <Search className="w-5 h-5 text-[var(--text-muted)] shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command, model, parameter, or view shortcut..."
            className="flex-1 bg-transparent border-none text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-0"
          />
          <kbd className="px-2 py-0.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)] font-mono">
            Esc
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 no-scrollbar">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs text-[var(--text-muted)]">
              No matching commands found.
            </div>
          ) : (
            filtered.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              const Icon = cmd.icon;

              return (
                <button
                  key={cmd.id}
                  type="button"
                  onClick={() => {
                    cmd.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={cn(
                    "w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-2xl text-left transition-colors cursor-pointer select-none",
                    isSelected
                      ? "bg-[var(--accent-coral)] text-white shadow-xs"
                      : "text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={cn(
                        "w-7 h-7 rounded-xl flex items-center justify-center shrink-0",
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-[var(--bg-subtle)] text-[var(--text-secondary)]"
                      )}
                    >
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-semibold truncate leading-tight">
                        {cmd.title}
                      </span>
                      <span
                        className={cn(
                          "text-[10px] truncate leading-none mt-0.5",
                          isSelected ? "text-white/80" : "text-[var(--text-muted)]"
                        )}
                      >
                        {cmd.category}
                      </span>
                    </div>
                  </div>

                  {cmd.shortcut && (
                    <kbd
                      className={cn(
                        "px-2 py-0.5 rounded-lg text-[10px] font-mono shrink-0",
                        isSelected
                          ? "bg-white/25 text-white border border-white/30"
                          : "bg-[var(--bg-subtle)] text-[var(--text-secondary)] border border-[var(--border-subtle)]"
                      )}
                    >
                      {cmd.shortcut}
                    </kbd>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2 bg-[var(--bg-subtle)]/70 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-[var(--text-muted)]">
          <span>Use ↑ ↓ to navigate</span>
          <span>↵ to execute</span>
        </div>
      </div>
    </div>
  );
}
