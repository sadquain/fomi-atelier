"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  Database,
  User,
  Palette,
  Film,
  Sparkles,
  Plus,
  Copy,
  Check,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function ProjectMemoryDrawer({
  isOpen,
  onClose,
  dna,
  onApplySuggestion,
  onInjectToken,
}) {
  const [copiedHex, setCopiedHex] = useState(null);

  if (!isOpen) return null;

  const handleCopyHex = (hex) => {
    try {
      navigator.clipboard.writeText(hex);
      setCopiedHex(hex);
      setTimeout(() => setCopiedHex(null), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-label="Project Memory DNA"
        className="relative z-10 w-full max-w-md h-full bg-[var(--bg-card)] border-l border-[var(--border-subtle)] shadow-2xl p-5 sm:p-6 overflow-y-auto flex flex-col justify-between animate-in slide-in-from-right duration-250"
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[var(--accent-coral-light)] flex items-center justify-center text-[var(--accent-coral)]">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[var(--text-primary)]">
                  Project Memory DNA
                </h3>
                <p className="text-[11px] text-[var(--text-muted)]">
                  Persistent character, style & palette context
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close drawer"
              className="p-1.5 rounded-xl hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 1. Locked Character Consistency */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[var(--accent-coral)]" />
              <span>Character Consistency Anchor</span>
            </h4>

            <div className="p-3.5 rounded-2xl bg-[var(--bg-panel-peach)] border border-[var(--border-subtle)] space-y-3">
              <div className="flex items-center gap-3">
                <Image
                  src={dna.character.avatarUrl}
                  alt={dna.character.alt || dna.character.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-2xl object-cover ring-2 ring-[var(--accent-coral)]"
                />
                <div>
                  <h5 className="font-bold text-sm text-[var(--text-primary)]">
                    {dna.character.name}
                  </h5>
                  <span className="text-[11px] text-[var(--accent-coral)] font-medium">
                    {dna.character.role} • Locked Identity
                  </span>
                </div>
              </div>

              <div className="text-xs text-[var(--text-secondary)] bg-[var(--bg-card)] p-2.5 rounded-xl border border-[var(--border-subtle)] leading-relaxed">
                &ldquo;{dna.character.anchorPrompt}&rdquo;
              </div>

              <button
                type="button"
                onClick={() => onInjectToken(dna.character.anchorPrompt)}
                className="w-full py-1.5 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-hover)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--accent-coral)] transition-colors cursor-pointer"
              >
                + Inject Character Anchor to Prompt
              </button>
            </div>
          </div>

          {/* 2. Project Color Palette Swatches */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-[var(--accent-coral)]" />
              <span>Cohesive Color Palette</span>
            </h4>

            <div className="grid grid-cols-2 gap-2">
              {dna.palette.map((p, idx) => (
                <div
                  key={idx}
                  onClick={() => handleCopyHex(p.hex)}
                  className="p-2.5 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] flex items-center gap-2.5 cursor-pointer hover:border-[var(--accent-coral)] transition-colors group"
                >
                  <span
                    className="w-6 h-6 rounded-xl shrink-0 ring-1 ring-black/10 shadow-xs"
                    style={{ backgroundColor: p.hex }}
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-semibold text-[var(--text-primary)] block truncate">
                      {p.name}
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)] font-mono flex items-center gap-1">
                      {copiedHex === p.hex ? (
                        <Check className="w-3 h-3 text-emerald-500" />
                      ) : (
                        p.hex
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Style & Lens Anchor */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5 text-[var(--accent-coral)]" />
              <span>Cinematographic Style Anchor</span>
            </h4>

            <div className="p-3.5 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Lens Package:</span>
                <span className="font-semibold text-[var(--text-primary)] text-right">
                  {dna.styleAnchor.lens}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Color Grading:</span>
                <span className="font-semibold text-[var(--text-primary)] text-right">
                  {dna.styleAnchor.colorGrading}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Aspect Ratio:</span>
                <span className="font-mono text-[var(--accent-coral)] font-bold">
                  {dna.styleAnchor.aspectRatio}
                </span>
              </div>
            </div>
          </div>

          {/* 4. AI Next-Shot Continuity Suggestions */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent-coral)]" />
              <span>AI Next-Shot Continuity</span>
            </h4>

            <div className="space-y-2.5">
              {dna.nextShotSuggestions.map((sug) => (
                <div
                  key={sug.id}
                  className="p-3.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--accent-coral)] transition-all shadow-warm-sm group"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-primary)] mb-1">
                    <span>{sug.title}</span>
                    <span className="text-[10px] text-[var(--accent-coral)] font-mono">
                      Next in sequence
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed mb-2 line-clamp-2">
                    {sug.prompt}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      onApplySuggestion(sug);
                      onClose();
                    }}
                    className="flex items-center gap-1 text-[11px] font-semibold text-[var(--accent-coral)] hover:underline cursor-pointer"
                  >
                    <span>Fork this shot into timeline</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-4 mt-6 border-t border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)] flex items-center justify-between">
          <span>Synced across project team</span>
          <span className="font-mono">v2.4 Auto-saved</span>
        </div>
      </aside>
    </div>
  );
}
