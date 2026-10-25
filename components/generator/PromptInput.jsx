"use client";

import React, { useRef, useEffect } from "react";
import { Sparkles, X, Dices } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SUGGESTED_PROMPTS } from "@/data/defaultPrompts";
import { cn } from "@/lib/utils";

export function PromptInput({
  value,
  onChange,
  onGenerate,
  isGenerating,
  disabled,
  placeholder = "Describe your imagination to be converted to a piece of art...",
  className,
}) {
  const textareaRef = useRef(null);

  // Auto-resize textarea to fit content up to max-height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  }, [value]);

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      if (!isGenerating && value.trim()) {
        onGenerate();
      }
    }
  };

  const handleInspire = () => {
    const randomPrompt =
      SUGGESTED_PROMPTS[Math.floor(Math.random() * SUGGESTED_PROMPTS.length)].prompt;
    onChange(randomPrompt);
  };

  return (
    <div
      className={cn(
        "relative rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] focus-within:border-[var(--accent-coral)] focus-within:ring-2 focus-within:ring-[var(--accent-coral)]/20 transition-all duration-200 shadow-warm-sm",
        className
      )}
    >
      <div className="p-3 pb-12 sm:pb-14">
        <label htmlFor="prompt-textarea" className="sr-only">
          Image or Video Prompt
        </label>
        <textarea
          id="prompt-textarea"
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled || isGenerating}
          placeholder={placeholder}
          rows={3}
          className="w-full bg-transparent resize-none border-none p-0 text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-0 leading-relaxed max-h-44 min-h-[72px]"
        />
      </div>

      {/* Floating Toolbar and Anchored Generate Button at Bottom-Right */}
      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-1.5 pointer-events-auto">
          {/* Quick random prompt inspiration */}
          <button
            type="button"
            onClick={handleInspire}
            aria-label="Surprise me with a prompt inspiration"
            title="Random prompt inspiration"
            className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--accent-coral)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
          >
            <Dices className="w-4 h-4" aria-hidden="true" />
          </button>

          {/* Clear prompt button */}
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              aria-label="Clear prompt"
              className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          )}

          <span className="text-[10px] text-[var(--text-muted)] ml-1 hidden xs:inline">
            {value.length}/1000
          </span>
        </div>

        {/* Coral "✦ Generate" button anchored at bottom-right */}
        <div className="pointer-events-auto">
          <Button
            type="button"
            variant="primary"
            size="sm"
            loading={isGenerating}
            disabled={!value.trim() || isGenerating}
            onClick={onGenerate}
            icon={Sparkles}
            className="rounded-xl font-semibold shadow-warm-sm px-3.5 py-1.5 text-xs bg-[var(--accent-coral)] hover:bg-[var(--accent-coral-hover)] text-white cursor-pointer"
            title="Shortcut: Ctrl+Enter / ⌘+Enter"
          >
            ✦ Generate
          </Button>
        </div>
      </div>
    </div>
  );
}
