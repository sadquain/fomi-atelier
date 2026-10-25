"use client";

import React, { useState, useRef, useEffect } from "react";
import { Sparkles, GitBranch, X, Plus, Layers, ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function FloatingPromptDock({
  activeNode,
  onGenerateFork,
  isGenerating,
  modelName,
  onChangeModel,
  onInjectToken,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [promptText, setPromptText] = useState("");
  const inputRef = useRef(null);

  // Initialize prompt with active node prompt when active node changes
  useEffect(() => {
    if (activeNode) {
      setPromptText(activeNode.prompt);
    }
  }, [activeNode]);

  // Global '/' keyboard shortcut to focus prompt
  useEffect(() => {
    const handleGlobalKey = (e) => {
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        setIsExpanded(true);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
    };
    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, []);

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === "Escape") {
      setIsExpanded(false);
    }
  };

  const handleSubmit = () => {
    if (!promptText.trim() || isGenerating) return;
    onGenerateFork({
      prompt: promptText.trim(),
      parentId: activeNode?.id || null,
      branch: activeNode?.branch || "Main Sequence",
    });
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-3xl px-4 pointer-events-none">
      <div
        className={cn(
          "w-full rounded-3xl bg-[var(--bg-card)]/95 backdrop-blur-xl border border-[var(--border-subtle)] shadow-2xl pointer-events-auto transition-all duration-300 overflow-hidden flex flex-col",
          isExpanded ? "p-4 ring-2 ring-[var(--accent-coral)]/30" : "p-2.5 hover:border-[var(--accent-coral)]"
        )}
      >
        {/* Active Node context tag */}
        {activeNode && (
          <div className="flex items-center justify-between px-2 pb-1 text-[11px] text-[var(--text-muted)] border-b border-[var(--border-subtle)]/50 mb-1.5">
            <span className="flex items-center gap-1.5 truncate">
              <GitBranch className="w-3.5 h-3.5 text-[var(--accent-coral)] shrink-0" />
              <span>Forking from:</span>
              <strong className="text-[var(--text-primary)] truncate font-semibold">
                {activeNode.title}
              </strong>
            </span>
            <span className="font-mono text-[10px] shrink-0">
              {modelName} • Press <kbd className="px-1 bg-[var(--bg-subtle)] rounded">/</kbd>
            </span>
          </div>
        )}

        {/* Input Area */}
        <div className="flex items-center gap-2">
          {isExpanded ? (
            <textarea
              ref={inputRef}
              rows={3}
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe delta or prompt change to fork from active node..."
              className="flex-1 bg-transparent border-none text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] resize-none focus:outline-none focus:ring-0 leading-relaxed"
            />
          ) : (
            <input
              type="text"
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              placeholder="Type prompt modification or press / to fork... (⌘Enter to synthesize)"
              className="flex-1 bg-transparent border-none text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-0 px-2"
            />
          )}

          {/* Collapsed/Expanded Controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-label={isExpanded ? "Collapse dock" : "Expand dock"}
              className="p-2 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>

            {/* Synthesize Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isGenerating || !promptText.trim()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-[var(--accent-coral)] hover:bg-[var(--accent-coral-hover)] text-white text-xs font-semibold shadow-warm-sm transition-all cursor-pointer active:scale-95 disabled:opacity-50"
            >
              {isGenerating ? (
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Sparkles className="w-3.5 h-3.5" />
              )}
              <span>Fork Branch</span>
            </button>
          </div>
        </div>

        {/* Expanded Quick Injection Tokens */}
        {isExpanded && (
          <div className="flex flex-wrap items-center gap-1.5 pt-2.5 mt-2 border-t border-[var(--border-subtle)]/60 text-[11px]">
            <span className="text-[var(--text-muted)] text-[10px] uppercase font-mono mr-1">
              Inject:
            </span>
            <button
              type="button"
              onClick={() => setPromptText((prev) => `${prev}, Akira-01 cybernetic Ronin anchor`)}
              className="px-2 py-0.5 rounded-lg bg-[var(--bg-subtle)] hover:bg-[var(--accent-coral-light)] hover:text-[var(--accent-coral)] text-[var(--text-secondary)] transition-colors cursor-pointer"
            >
              + Character Anchor
            </button>
            <button
              type="button"
              onClick={() => setPromptText((prev) => `${prev}, Neon coral and cyan mist volumetric lighting`)}
              className="px-2 py-0.5 rounded-lg bg-[var(--bg-subtle)] hover:bg-[var(--accent-coral-light)] hover:text-[var(--accent-coral)] text-[var(--text-secondary)] transition-colors cursor-pointer"
            >
              + Palette Glow
            </button>
            <button
              type="button"
              onClick={() => setPromptText((prev) => `${prev}, Panavision 40mm anamorphic T2.0 lens streak`)}
              className="px-2 py-0.5 rounded-lg bg-[var(--bg-subtle)] hover:bg-[var(--accent-coral-light)] hover:text-[var(--accent-coral)] text-[var(--text-secondary)] transition-colors cursor-pointer"
            >
              + Anamorphic Streak
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
