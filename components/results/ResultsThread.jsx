"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { GenerationTurn } from "./GenerationTurn";
import { SkeletonGrid } from "./SkeletonGrid";
import { EmptyState } from "./EmptyState";
import { ErrorState } from "./ErrorState";
import { cn } from "@/lib/utils";

// Dynamic import of LightboxModal as requested in architecture specs
const DynamicLightboxModal = dynamic(() => import("./LightboxModal"), {
  ssr: false,
});

export function ResultsThread({
  generations = [],
  isLoading = false,
  activeGenerationId,
  isGenerating,
  generatingTurn,
  error,
  onRetry,
  onClearError,
  onToggleFavorite,
  onReusePrompt,
  onDeleteTurn,
  onSelectPrompt,
  className,
}) {
  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    activeOutput: null,
    generation: null,
  });

  const handleOpenLightbox = (output, generation) => {
    setLightboxState({
      isOpen: true,
      activeOutput: output,
      generation,
    });
  };

  const handleCloseLightbox = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <main
      id="main-content"
      aria-label="Generations Results Stream"
      className={cn("flex-1 flex flex-col gap-6", className)}
    >
      {/* Error State Banner with Retry */}
      <ErrorState error={error} onRetry={onRetry} onClear={onClearError} />

      {/* Initial load skeleton state */}
      {isLoading && (
        <div className="space-y-6">
          <SkeletonGrid
            prompt="Retrieving latest generation timeline from neural pipeline..."
            model="Fomi Flux Ultra"
            type="image"
            aspectRatio="3:4"
            numOutputs={4}
          />
        </div>
      )}

      {/* In-progress optimistic generation skeleton turn */}
      {isGenerating && generatingTurn && (
        <SkeletonGrid
          prompt={generatingTurn.prompt}
          model={generatingTurn.model}
          type={generatingTurn.type}
          aspectRatio={generatingTurn.aspectRatio}
          numOutputs={generatingTurn.numOutputs}
        />
      )}

      {/* Empty State when no generations exist and not loading */}
      {!isLoading && generations.length === 0 && !isGenerating && !error && (
        <EmptyState onSelectPrompt={onSelectPrompt} />
      )}

      {/* Chat-style generations thread */}
      {!isLoading && generations.length > 0 && (
        <div className="space-y-6">
          {generations.map((gen) => (
            <GenerationTurn
              key={gen.id}
              generation={gen}
              isActive={gen.id === activeGenerationId}
              onOpenLightbox={handleOpenLightbox}
              onToggleFavorite={onToggleFavorite}
              onReusePrompt={onReusePrompt}
              onDeleteTurn={onDeleteTurn}
            />
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {lightboxState.isOpen && (
        <DynamicLightboxModal
          isOpen={lightboxState.isOpen}
          onClose={handleCloseLightbox}
          activeOutput={lightboxState.activeOutput}
          generation={lightboxState.generation}
          onToggleFavorite={onToggleFavorite}
          onReusePrompt={onReusePrompt}
        />
      )}
    </main>
  );
}
