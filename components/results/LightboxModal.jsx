"use client";

import React, { useEffect, useCallback, useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Heart,
  Copy,
  Repeat,
  Check,
  Sparkles,
} from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/utils";

export default function LightboxModal({
  isOpen,
  onClose,
  activeOutput,
  generation,
  onToggleFavorite,
  onReusePrompt,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  const outputs = React.useMemo(() => generation?.outputs || [], [generation?.outputs]);

  // Sync index when activeOutput changes
  useEffect(() => {
    if (activeOutput && outputs.length > 0) {
      const idx = outputs.findIndex((o) => o.id === activeOutput.id);
      if (idx !== -1) setCurrentIndex(idx);
    }
  }, [activeOutput, outputs]);

  const handleNext = useCallback(() => {
    if (outputs.length > 1) {
      setCurrentIndex((prev) => (prev + 1) % outputs.length);
    }
  }, [outputs.length]);

  const handlePrev = useCallback(() => {
    if (outputs.length > 1) {
      setCurrentIndex((prev) => (prev - 1 + outputs.length) % outputs.length);
    }
  }, [outputs.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, handleNext, handlePrev]);

  if (!isOpen || !generation || outputs.length === 0) return null;

  const currentItem = outputs[currentIndex] || outputs[0];
  const isVideo = generation.type === "video" || Boolean(currentItem.videoUrl);
  const isFav = currentItem.isFavorite;

  const handleCopyPrompt = () => {
    try {
      navigator.clipboard.writeText(generation.prompt);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleDownload = () => {
    const url = isVideo ? currentItem.videoUrl : currentItem.url;
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.download = `fomi-${generation.id}-${currentItem.id}.${isVideo ? "mp4" : "jpg"}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Fullscreen media preview"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/90 backdrop-blur-xl transition-opacity animate-in fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main Lightbox Card */}
      <div className="relative z-10 w-full max-w-6xl max-h-[94vh] flex flex-col lg:flex-row rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
        {/* Media Preview Stage (Left / Center) */}
        <div className="relative flex-1 bg-black/40 flex items-center justify-center min-h-[360px] max-h-[68vh] lg:max-h-[85vh] p-4 overflow-hidden">
          {isVideo ? (
            <video
              src={currentItem.videoUrl}
              poster={currentItem.posterUrl || currentItem.url}
              controls
              autoPlay
              loop
              playsInline
              className="max-w-full max-h-full rounded-2xl object-contain shadow-2xl"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={currentItem.url}
              alt={generation.prompt}
              className="max-w-full max-h-full rounded-2xl object-contain shadow-2xl transition-all duration-200"
            />
          )}

          {/* Navigation Arrows if batch > 1 */}
          {outputs.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous image in batch"
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all cursor-pointer shadow-lg active:scale-90"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next image in batch"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all cursor-pointer shadow-lg active:scale-90"
              >
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </>
          )}

          {/* Close button inside media on mobile */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close fullscreen lightbox"
            className="lg:hidden absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white backdrop-blur-md cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Details & Actions Sidebar (Right) */}
        <div className="w-full lg:w-88 p-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[var(--border-subtle)] bg-[var(--bg-card)] overflow-y-auto">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-coral)]">
                <Sparkles className="w-4 h-4" />
                <span>
                  Asset {currentIndex + 1} of {outputs.length}
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="hidden lg:flex p-1.5 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Prompt details */}
            <div>
              <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">
                Generation Prompt
              </h4>
              <p className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed bg-[var(--bg-subtle)] p-3 rounded-2xl border border-[var(--border-subtle)] max-h-36 overflow-y-auto">
                &ldquo;{generation.prompt}&rdquo;
              </p>
            </div>

            {/* Metadata specs */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
                <span className="text-[10px] text-[var(--text-muted)] block">Engine / Model</span>
                <span className="font-semibold text-[var(--text-primary)] truncate block">
                  {generation.model}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
                <span className="text-[10px] text-[var(--text-muted)] block">Ratio / Size</span>
                <span className="font-semibold text-[var(--text-primary)] block">
                  {generation.aspectRatio || "3:4"}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
                <span className="text-[10px] text-[var(--text-muted)] block">Seed</span>
                <span className="font-semibold text-[var(--text-primary)] block">
                  {generation.seed || "Auto"}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
                <span className="text-[10px] text-[var(--text-muted)] block">Preset Style</span>
                <span className="font-semibold text-[var(--text-primary)] capitalize block">
                  {generation.style || "Natural"}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Actions Bar */}
          <div className="pt-4 border-t border-[var(--border-subtle)] space-y-2.5">
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => onToggleFavorite(generation.id, currentItem.id)}
                className={cn(
                  "flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-medium border transition-colors cursor-pointer",
                  isFav
                    ? "bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/40 dark:border-rose-800"
                    : "border-[var(--border-subtle)] hover:bg-[var(--bg-hover)] text-[var(--text-secondary)]"
                )}
              >
                <Heart className={cn("w-4 h-4", isFav && "fill-rose-500 text-rose-500")} />
                <span>{isFav ? "Saved" : "Like"}</span>
              </button>

              <button
                type="button"
                onClick={handleCopyPrompt}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-medium border border-[var(--border-subtle)] hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] transition-colors cursor-pointer"
              >
                {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                <span>{isCopied ? "Copied" : "Copy"}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onReusePrompt(generation.prompt);
                  onClose();
                }}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-medium border border-[var(--border-subtle)] hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] transition-colors cursor-pointer"
              >
                <Repeat className="w-4 h-4" />
                <span>Reuse</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-[var(--accent-coral)] hover:bg-[var(--accent-coral-hover)] text-white text-xs font-semibold shadow-warm-sm transition-all cursor-pointer active:scale-98"
            >
              <Download className="w-4 h-4" />
              <span>Download High-Res Asset</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
