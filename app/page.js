"use client";

import React, { useState, useCallback, useRef } from "react";
import { Header } from "@/components/layout/Header";
import { MobileTabBar } from "@/components/layout/MobileTabBar";
import { HistoryStrip } from "@/components/history/HistoryStrip";
import { GeneratorPanel } from "@/components/generator/GeneratorPanel";
import { ResultsThread } from "@/components/results/ResultsThread";
import { useGenerations } from "@/hooks/useGenerations";
import { useGenerate } from "@/hooks/useGenerate";
import { X, Sliders } from "lucide-react";
import { cn } from "@/lib/utils";

export default function WorkspacePage() {
  const [activeTab, setActiveTab] = useState("image");
  const [isMobilePanelOpen, setIsMobilePanelOpen] = useState(false);
  const [isTabletDrawerOpen, setIsTabletDrawerOpen] = useState(false);
  const [draftPrompt, setDraftPrompt] = useState("");

  const {
    generations,
    activeGenerationId,
    setActiveGenerationId,
    addGeneration,
    toggleFavoriteTurn,
    toggleFavoriteOutput,
    deleteGeneration,
  } = useGenerations();

  const handleGenerateSuccess = useCallback(
    (newGen) => {
      addGeneration(newGen);
      // On mobile, close dock after generation begins
      setIsMobilePanelOpen(false);
      // Smoothly scroll to results thread top
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [addGeneration]
  );

  const {
    isGenerating,
    generatingTurn,
    error: generateError,
    generate,
    retry,
    clearError,
  } = useGenerate({
    onGenerateSuccess: handleGenerateSuccess,
  });

  const handleSelectGeneration = (genId) => {
    setActiveGenerationId(genId);
    const element = document.getElementById(`generation-${genId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleReusePrompt = (promptText) => {
    setDraftPrompt(promptText);
    // If on mobile/tablet, open controls panel so user sees it populated
    setIsMobilePanelOpen(true);
    const textarea = document.getElementById("prompt-textarea");
    if (textarea) {
      textarea.focus();
      textarea.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleViewAllHistory = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-page)] text-[var(--text-primary)] transition-colors duration-200 pb-16 md:pb-6">
      {/* 1. Top Bar */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onToggleMobilePanel={() => setIsMobilePanelOpen(!isMobilePanelOpen)}
      />

      {/* Main Container */}
      <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-6 pt-3 sm:pt-4 flex flex-col gap-4">
        {/* 2. History Strip: Floating rounded bar under top bar */}
        <HistoryStrip
          generations={generations}
          activeGenerationId={activeGenerationId}
          onSelectGeneration={handleSelectGeneration}
          onViewAll={handleViewAllHistory}
        />

        {/* 3. Workspace Layout: Generator Panel + Results Stream */}
        <div className="flex items-start gap-5 lg:gap-6 relative">
          {/* Desktop Left Control Panel */}
          <div className="hidden lg:block w-[360px] xl:w-[410px] 2xl:w-[440px] shrink-0 sticky top-18 self-start">
            <GeneratorPanel
              onGenerate={generate}
              isGenerating={isGenerating}
              initialPrompt={draftPrompt}
            />
          </div>

          {/* Tablet Drawer Button (visible only between 640px and 1024px) */}
          <div className="hidden sm:block lg:hidden fixed bottom-6 left-6 z-30">
            <button
              type="button"
              onClick={() => setIsTabletDrawerOpen(true)}
              aria-label="Open generation controls drawer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[var(--accent-coral)] text-white shadow-warm-lg font-semibold text-xs hover:bg-[var(--accent-coral-hover)] transition-all cursor-pointer active:scale-95"
            >
              <Sliders className="w-4 h-4" />
              <span>Generation Controls</span>
            </button>
          </div>

          {/* Tablet Drawer Overlay and Slide-out Panel */}
          {isTabletDrawerOpen && (
            <div className="hidden sm:block lg:hidden fixed inset-0 z-50">
              <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setIsTabletDrawerOpen(false)}
                aria-hidden="true"
              />
              <div className="fixed inset-y-0 left-0 w-[400px] max-w-[90vw] bg-[var(--bg-card)] shadow-2xl p-4 overflow-y-auto z-10 flex flex-col">
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-[var(--border-subtle)]">
                  <h3 className="font-bold text-sm text-[var(--text-primary)]">
                    Control Panel
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsTabletDrawerOpen(false)}
                    aria-label="Close drawer"
                    className="p-1 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <GeneratorPanel
                  onGenerate={(payload) => {
                    generate(payload);
                    setIsTabletDrawerOpen(false);
                  }}
                  isGenerating={isGenerating}
                  initialPrompt={draftPrompt}
                />
              </div>
            </div>
          )}

          {/* Mobile Bottom Sheet / Modal for Controls (<640px) */}
          {isMobilePanelOpen && (
            <div className="sm:hidden fixed inset-0 z-50 flex flex-col justify-end">
              <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in"
                onClick={() => setIsMobilePanelOpen(false)}
                aria-hidden="true"
              />
              <div className="relative z-10 w-full max-h-[85vh] rounded-t-3xl bg-[var(--bg-card)] border-t border-[var(--border-subtle)] shadow-2xl p-4 overflow-y-auto animate-in slide-in-from-bottom duration-200">
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-[var(--border-subtle)]">
                  <div className="w-10 h-1 bg-[var(--border-subtle)] rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-2" />
                  <h3 className="font-bold text-sm text-[var(--text-primary)] mt-1">
                    AI Generation Studio
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsMobilePanelOpen(false)}
                    aria-label="Close controls dock"
                    className="p-1.5 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <GeneratorPanel
                  onGenerate={generate}
                  isGenerating={isGenerating}
                  initialPrompt={draftPrompt}
                />
              </div>
            </div>
          )}

          {/* 4. Center / Right Results Thread */}
          <ResultsThread
            generations={generations}
            activeGenerationId={activeGenerationId}
            isGenerating={isGenerating}
            generatingTurn={generatingTurn}
            error={generateError}
            onRetry={retry}
            onClearError={clearError}
            onToggleFavorite={toggleFavoriteOutput}
            onReusePrompt={handleReusePrompt}
            onDeleteTurn={deleteGeneration}
            onSelectPrompt={(text) => setDraftPrompt(text)}
          />
        </div>
      </div>

      {/* Mobile Bottom Tab Bar */}
      <MobileTabBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onTogglePanel={() => setIsMobilePanelOpen(!isMobilePanelOpen)}
        isPanelOpen={isMobilePanelOpen}
      />
    </div>
  );
}
