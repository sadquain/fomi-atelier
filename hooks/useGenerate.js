"use client";

import { useState, useCallback, useRef } from "react";

export function useGenerate({ onGenerateSuccess }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingTurn, setGeneratingTurn] = useState(null);
  const [error, setError] = useState(null);
  const lastPayloadRef = useRef(null);

  const generate = useCallback(
    async (payload) => {
      if (!payload.prompt || !payload.prompt.trim()) {
        setError("Please enter a prompt describing your imagination.");
        return false;
      }

      setError(null);
      setIsGenerating(true);
      lastPayloadRef.current = payload;

      // Optimistic skeleton placeholder metadata for immediate visual feedback
      setGeneratingTurn({
        id: "temp-generating",
        prompt: payload.prompt.trim(),
        negativePrompt: payload.negativePrompt || "",
        type: payload.type || "image",
        model: payload.modelName || "Fomi Flux Ultra",
        aspectRatio: payload.aspectRatio || "3:4",
        numOutputs: payload.type === "video" ? 1 : Number(payload.numOutputs) || 4,
        createdAt: new Date().toISOString(),
      });

      try {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.error || "Generation request failed.");
        }

        if (onGenerateSuccess) {
          onGenerateSuccess(data.data);
        }
        setGeneratingTurn(null);
        return true;
      } catch (err) {
        setError(err.message || "An unexpected error occurred while generating.");
        return false;
      } finally {
        setIsGenerating(false);
      }
    },
    [onGenerateSuccess]
  );

  const retry = useCallback(() => {
    if (lastPayloadRef.current) {
      generate(lastPayloadRef.current);
    }
  }, [generate]);

  const clearError = useCallback(() => {
    setError(null);
    setGeneratingTurn(null);
  }, []);

  return {
    isGenerating,
    generatingTurn,
    error,
    generate,
    retry,
    clearError,
  };
}
