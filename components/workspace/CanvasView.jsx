"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ZoomIn,
  ZoomOut,
  Star,
  GitBranch,
  SplitSquareVertical,
  Download,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Info,
  Play,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function CanvasView({
  node,
  allNodes = [],
  onSelectNode,
  onForkNode,
  onCompareWithParent,
  onToggleHero,
}) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showPromptOverlay, setShowPromptOverlay] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  if (!node) return null;

  const currentIndex = allNodes.findIndex((n) => n.id === node.id);
  const prevNode = allNodes[currentIndex - 1];
  const nextNode = allNodes[currentIndex + 1];
  const isVideo = node.type === "video" || Boolean(node.videoUrl);

  const handleCopyPrompt = () => {
    try {
      navigator.clipboard.writeText(node.prompt);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = isVideo ? node.videoUrl : node.imageUrl;
    a.target = "_blank";
    a.download = `fomi-pro-${node.id}.${isVideo ? "mp4" : "jpg"}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="relative w-full flex-1 flex flex-col items-center justify-between bg-black/90 p-4 sm:p-6 overflow-hidden select-none">
      {/* Top Floating Control Bar */}
      <div className="z-20 w-full max-w-5xl flex items-center justify-between gap-3 bg-[var(--bg-card)]/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[var(--border-subtle)] shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
              {node.title}
              {node.isHero && (
                <span className="px-1.5 py-0.2 rounded-full bg-amber-400/20 text-amber-500 text-[10px]">
                  Hero
                </span>
              )}
            </span>
            <span className="text-[10px] text-[var(--text-muted)] font-mono">
              {node.branch} • {node.model} • Seed: {node.seed}
            </span>
          </div>
        </div>

        {/* Quick Canvas Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Zoom controls */}
          <div className="flex items-center rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] p-0.5">
            <button
              type="button"
              onClick={() => setZoomLevel((prev) => Math.max(0.5, prev - 0.25))}
              className="p-1 rounded-lg hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] cursor-pointer"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 text-[10px] font-mono font-medium text-[var(--text-primary)]">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoomLevel((prev) => Math.min(2.5, prev + 0.25))}
              className="p-1 rounded-lg hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] cursor-pointer"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Toggle Prompt Overlay */}
          <button
            type="button"
            onClick={() => setShowPromptOverlay(!showPromptOverlay)}
            aria-pressed={showPromptOverlay}
            className={cn(
              "p-2 rounded-xl border text-xs font-medium transition-colors cursor-pointer",
              showPromptOverlay
                ? "bg-[var(--accent-coral-light)] text-[var(--accent-coral)] border-[var(--accent-coral-border)]"
                : "border-[var(--border-subtle)] hover:bg-[var(--bg-hover)] text-[var(--text-secondary)]"
            )}
            title="Toggle prompt HUD"
          >
            <Info className="w-3.5 h-3.5" />
          </button>

          {/* Star as Hero */}
          <button
            type="button"
            onClick={() => onToggleHero(node.id)}
            className="p-2 rounded-xl border border-[var(--border-subtle)] hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] cursor-pointer"
            title="Star as Hero Shot (Key: S)"
          >
            <Star
              className={cn(
                "w-3.5 h-3.5",
                node.isHero ? "fill-amber-400 text-amber-400" : "text-[var(--text-muted)]"
              )}
            />
          </button>

          {/* Fork Branch */}
          <button
            type="button"
            onClick={() => onForkNode(node.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--accent-coral)] hover:bg-[var(--accent-coral-hover)] text-white text-xs font-semibold cursor-pointer shadow-warm-sm"
            title="Fork Child Branch (Key: F)"
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Fork</span>
          </button>

          {/* Compare with Parent */}
          {node.parentId && (
            <button
              type="button"
              onClick={() => onCompareWithParent(node.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--border-subtle)] hover:bg-[var(--bg-hover)] text-xs font-semibold text-[var(--text-primary)] cursor-pointer"
              title="Compare side-by-side with parent (Key: C)"
            >
              <SplitSquareVertical className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Compare</span>
            </button>
          )}

          {/* Download */}
          <button
            type="button"
            onClick={handleDownload}
            className="p-2 rounded-xl border border-[var(--border-subtle)] hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] cursor-pointer"
            title="Download Master Asset"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Cinema Viewport */}
      <div className="relative flex-1 w-full flex items-center justify-center p-4 overflow-hidden">
        {/* Navigation chevrons to move between timeline nodes */}
        {prevNode && (
          <button
            type="button"
            onClick={() => onSelectNode(prevNode.id)}
            aria-label="Previous timeline shot"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all cursor-pointer shadow-xl"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {nextNode && (
          <button
            type="button"
            onClick={() => onSelectNode(nextNode.id)}
            aria-label="Next timeline shot"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all cursor-pointer shadow-xl"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Scaled Master Canvas Image / Video */}
        <div
          className="transition-transform duration-200 ease-out flex items-center justify-center max-w-full max-h-full"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {isVideo ? (
            <video
              src={node.videoUrl}
              poster={node.posterUrl || node.imageUrl}
              controls
              autoPlay
              loop
              playsInline
              className="max-w-[85vw] max-h-[68vh] rounded-2xl object-contain shadow-2xl border border-white/10"
            />
          ) : (
            <div className="relative w-[85vw] max-w-5xl h-[65vh]">
              <Image
                src={node.imageUrl}
                alt={node.alt || node.title}
                fill
                sizes="(max-width: 1024px) 90vw, 1200px"
                priority
                className="rounded-2xl object-contain shadow-2xl"
              />
            </div>
          )}
        </div>

        {/* Minimal Bottom Prompt HUD */}
        {showPromptOverlay && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-full max-w-2xl px-4 pointer-events-none">
            <div className="p-3.5 rounded-2xl bg-black/75 backdrop-blur-xl border border-white/15 text-white shadow-2xl pointer-events-auto flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[var(--accent-coral)] block mb-0.5">
                  Prompt Specification
                </span>
                <p className="text-xs text-stone-200 leading-relaxed font-sans line-clamp-2">
                  &ldquo;{node.prompt}&rdquo;
                </p>
                {node.diffFromParent && (
                  <span className="text-[10px] text-amber-300 font-mono mt-1 block">
                    Δ {node.diffFromParent}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={handleCopyPrompt}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0 mt-1"
                title="Copy prompt"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Filmstrip Timeline of Project Nodes */}
      <div className="z-20 w-full max-w-5xl flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {allNodes.map((n, idx) => {
          const isSelected = n.id === node.id;
          return (
            <button
              key={n.id}
              type="button"
              onClick={() => onSelectNode(n.id)}
              className={cn(
                "relative shrink-0 w-16 h-10 rounded-xl overflow-hidden border transition-all cursor-pointer group",
                isSelected
                  ? "border-[var(--accent-coral)] ring-2 ring-[var(--accent-coral)]/40 scale-105"
                  : "border-white/20 hover:border-white/50 opacity-60 hover:opacity-100"
              )}
            >
              <Image
                src={n.thumbUrl}
                alt={n.alt || n.title}
                fill
                sizes="64px"
                className="object-cover"
              />
              <span className="absolute bottom-0.5 left-0.5 text-[8px] font-mono text-white bg-black/60 px-1 rounded z-10">
                #{idx + 1}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
