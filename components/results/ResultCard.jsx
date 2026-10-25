"use client";

import React, { useState, useRef } from "react";
import { Download, Heart, Copy, Repeat, Maximize2, Play, Check } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/utils";

export const ResultCard = React.memo(function ResultCard({
  output,
  generation,
  onOpenLightbox,
  onToggleFavorite,
  onReusePrompt,
  index = 0,
}) {
  const [isCopied, setIsCopied] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const videoRef = useRef(null);

  const isVideo = generation.type === "video" || Boolean(output.videoUrl);
  const isFav = output.isFavorite;

  const handleCopy = (e) => {
    e.stopPropagation();
    try {
      navigator.clipboard.writeText(generation.prompt);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleDownload = (e) => {
    e.stopPropagation();
    const mediaUrl = isVideo ? output.videoUrl : output.url;
    // Create temporary anchor to initiate download
    const a = document.createElement("a");
    a.href = mediaUrl;
    a.target = "_blank";
    a.download = `fomi-${generation.id}-${output.id}.${isVideo ? "mp4" : "jpg"}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleMouseEnterVideo = () => {
    if (isVideo && videoRef.current) {
      videoRef.current
        .play()
        .then(() => setIsPlayingVideo(true))
        .catch(() => {});
    }
  };

  const handleMouseLeaveVideo = () => {
    if (isVideo && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlayingVideo(false);
    }
  };

  const aspectClass =
    generation.aspectRatio === "1:1"
      ? "aspect-square"
      : generation.aspectRatio === "16:9"
      ? "aspect-video"
      : "aspect-[3/4]";

  return (
    <div
      role="group"
      aria-label={`Generation item ${index + 1}`}
      onMouseEnter={handleMouseEnterVideo}
      onMouseLeave={handleMouseLeaveVideo}
      className={cn(
        "group relative rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-warm-sm overflow-hidden transition-all duration-300 hover:shadow-warm-lg hover:border-[var(--border-hover)] flex flex-col justify-center",
        aspectClass
      )}
      style={{
        animation: `fadeInUp 0.35s ease-out forwards ${index * 60}ms`,
      }}
    >
      {/* Media: Image or Video */}
      {isVideo ? (
        <div className="relative w-full h-full bg-black/10">
          <video
            ref={videoRef}
            src={output.videoUrl}
            poster={output.posterUrl || output.url}
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {!isPlayingVideo && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/20 group-hover:bg-transparent transition-colors">
              <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white shadow-md">
                <Play className="w-4 h-4 fill-white ml-0.5" aria-hidden="true" />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="relative w-full h-full bg-[var(--bg-subtle)] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={output.url}
            alt={generation.prompt}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>
      )}

      {/* Floating Action Bar on Hover & Focus */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 p-2.5 flex flex-col justify-between pointer-events-none">
        {/* Top bar: Favorite & Maximize / Lightbox */}
        <div className="flex items-center justify-between pointer-events-auto">
          <IconButton
            icon={Heart}
            label={isFav ? "Favorited" : "Favorite"}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(generation.id, output.id);
            }}
            variant="card"
            size="sm"
            className={cn(
              "w-8 h-8 rounded-xl",
              isFav && "text-rose-500 fill-rose-500 bg-white"
            )}
          />

          <IconButton
            icon={Maximize2}
            label="Open fullscreen lightbox"
            onClick={() => onOpenLightbox(output, generation)}
            variant="card"
            size="sm"
            className="w-8 h-8 rounded-xl"
          />
        </div>

        {/* Bottom bar: Download, Copy Prompt, Reuse Prompt */}
        <div className="flex items-center justify-end gap-1.5 pointer-events-auto">
          {/* Reuse Prompt */}
          <IconButton
            icon={Repeat}
            label="Reuse this prompt"
            onClick={(e) => {
              e.stopPropagation();
              onReusePrompt(generation.prompt);
            }}
            variant="card"
            size="sm"
            className="w-8 h-8 rounded-xl"
          />

          {/* Copy Prompt */}
          <IconButton
            icon={isCopied ? Check : Copy}
            label={isCopied ? "Prompt copied!" : "Copy prompt"}
            onClick={handleCopy}
            variant="card"
            size="sm"
            className={cn("w-8 h-8 rounded-xl", isCopied && "text-emerald-500")}
          />

          {/* Download Media */}
          <IconButton
            icon={Download}
            label="Download asset"
            onClick={handleDownload}
            variant="card"
            size="sm"
            className="w-8 h-8 rounded-xl"
          />
        </div>
      </div>
    </div>
  );
});
