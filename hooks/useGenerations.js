"use client";

import { useState, useEffect, useCallback } from "react";

export function useGenerations() {
  const [generations, setGenerations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeGenerationId, setActiveGenerationId] = useState(null);

  const fetchGenerations = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/generations");
      if (!res.ok) throw new Error("Failed to fetch generations from server.");
      const json = await res.json();
      if (json.data && Array.isArray(json.data)) {
        setGenerations(json.data);
        if (json.data[0]) {
          setActiveGenerationId(json.data[0].id);
        }
      } else {
        setGenerations([]);
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred while loading generations.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGenerations();
  }, [fetchGenerations]);

  const addGeneration = useCallback((newGen) => {
    setGenerations((prev) => [newGen, ...prev]);
    setActiveGenerationId(newGen.id);
  }, []);

  const toggleFavoriteTurn = useCallback((turnId) => {
    setGenerations((prev) =>
      prev.map((gen) => (gen.id === turnId ? { ...gen, isFavorite: !gen.isFavorite } : gen))
    );
  }, []);

  const toggleFavoriteOutput = useCallback((turnId, outputId) => {
    setGenerations((prev) =>
      prev.map((gen) => {
        if (gen.id !== turnId) return gen;
        return {
          ...gen,
          outputs: gen.outputs.map((out) =>
            out.id === outputId ? { ...out, isFavorite: !out.isFavorite } : out
          ),
        };
      })
    );
  }, []);

  const deleteGeneration = useCallback((turnId) => {
    setGenerations((prev) => prev.filter((gen) => gen.id !== turnId));
  }, []);

  return {
    generations,
    isLoading,
    error,
    activeGenerationId,
    setActiveGenerationId,
    addGeneration,
    toggleFavoriteTurn,
    toggleFavoriteOutput,
    deleteGeneration,
    reloadGenerations: fetchGenerations,
  };
}
