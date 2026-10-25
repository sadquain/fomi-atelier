"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";
import { CommandPalette } from "@/components/workspace/CommandPalette";
import { LineageGraph } from "@/components/workspace/LineageGraph";
import { CanvasView } from "@/components/workspace/CanvasView";
import { CompareDiffView } from "@/components/workspace/CompareDiffView";
import { ProjectMemoryDrawer } from "@/components/workspace/ProjectMemoryDrawer";
import { FloatingPromptDock } from "@/components/workspace/FloatingPromptDock";
import { PRO_PROJECT_METADATA, INITIAL_NODES } from "@/data/proProjectData";
import { isTypingTarget } from "@/lib/isTypingTarget";
import { AlertCircle, RefreshCw, X } from "lucide-react";

export default function ProfessionalWorkspacePage() {
  const [nodes, setNodes] = useState(INITIAL_NODES);
  const [activeNodeId, setActiveNodeId] = useState(INITIAL_NODES[1].id); // Shot 2
  const [compareParentId, setCompareParentId] = useState(INITIAL_NODES[0].id); // Shot 1
  const [viewMode, setViewMode] = useState("graph"); // "graph" | "canvas" | "compare"
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isProjectMemoryOpen, setIsProjectMemoryOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateError, setGenerateError] = useState(null);
  const [liveAnnouncement, setLiveAnnouncement] = useState("");
  const [activeModel, setActiveModel] = useState("Fomi Flux Ultra");
  const [activeRatio, setActiveRatio] = useState("16:9");

  const lastForkPayloadRef = useRef(null);

  const activeNode = nodes.find((n) => n.id === activeNodeId) || nodes[0];
  const compareNodeA = nodes.find((n) => n.id === compareParentId) || nodes[0];

  const handleSelectNode = useCallback(
    (id) => {
      setActiveNodeId(id);
      const selected = nodes.find((n) => n.id === id);
      if (selected?.parentId) {
        setCompareParentId(selected.parentId);
      }
    },
    [nodes]
  );

  const handleToggleHero = useCallback((id) => {
    setNodes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isHero: !n.isHero } : n))
    );
  }, []);

  const handleCompareWithParent = useCallback(
    (id) => {
      const child = nodes.find((n) => n.id === id) || activeNode;
      if (child.parentId) {
        setCompareParentId(child.parentId);
        setActiveNodeId(child.id);
        setViewMode("compare");
      }
    },
    [nodes, activeNode]
  );

  const handleGenerateFork = useCallback(
    async (payload) => {
      setIsGenerating(true);
      setGenerateError(null);
      lastForkPayloadRef.current = payload;
      const parent = nodes.find((n) => n.id === payload.parentId) || activeNode;
      const seed = Math.floor(Math.random() * 900000) + 100000;

      try {
        const isVideoModel = activeModel.toLowerCase().includes("video");
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: payload.prompt,
            type: isVideoModel ? "video" : "image",
            modelId: isVideoModel ? "wan-2.1-video" : "fomi-flux-ultra",
            aspectRatio: activeRatio,
            numOutputs: 1,
            seed,
          }),
        });

        const json = await res.json();
        if (!res.ok || !json.success) {
          throw new Error(json.error || "Generation request failed");
        }

        const generated = json.data;
        const firstOut = generated.outputs?.[0] || {};
        const newId = `node-${Date.now().toString().slice(-4)}`;

        const newNode = {
          id: newId,
          parentId: parent.id,
          branch: payload.branch || (parent.branch.includes("Branch") ? parent.branch : "Branch C: Dynamic Variant"),
          title: `Shot ${nodes.length + 1}: Synthesized Leaf`,
          type: generated.type,
          prompt: payload.prompt,
          diffFromParent: `Fork from ${parent.title} with updated prompt parameters`,
          model: generated.model || activeModel,
          aspectRatio: generated.aspectRatio || activeRatio,
          seed: generated.seed || seed,
          guidance: 7.5,
          steps: 35,
          timestamp: "Just now",
          isHero: true,
          imageUrl: firstOut.url || "/media/images/portrait-01.jpg",
          thumbUrl: firstOut.thumbUrl || firstOut.url || "/media/images/portrait-01.jpg",
          videoUrl: firstOut.videoUrl,
          posterUrl: firstOut.posterUrl,
          alt: firstOut.alt || `Forked generation for ${payload.prompt}`,
        };

        setNodes((prev) => [...prev, newNode]);
        setActiveNodeId(newNode.id);
        setCompareParentId(parent.id);
        setLiveAnnouncement(`Successfully synthesized ${newNode.title}.`);
      } catch (err) {
        setGenerateError(err.message || "Failed to synthesize branch.");
        setLiveAnnouncement(`Generation failed: ${err.message || "Error"}`);
      } finally {
        setIsGenerating(false);
      }
    },
    [nodes, activeNode, activeModel, activeRatio]
  );

  const handleForkNode = useCallback(
    (id) => {
      const parent = nodes.find((n) => n.id === id) || activeNode;
      handleGenerateFork({
        prompt: `${parent.prompt}, warm peach volumetric bloom, shallow focus`,
        parentId: parent.id,
        branch: parent.branch.includes("Branch") ? parent.branch : "Branch C: Lighting Exploration",
      });
    },
    [nodes, activeNode, handleGenerateFork]
  );

  const handleRetryFork = () => {
    if (lastForkPayloadRef.current) {
      handleGenerateFork(lastForkPayloadRef.current);
    }
  };

  // Keyboard hotkey listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Command Palette hotkey: Cmd/Ctrl+K must always work
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
        return;
      }

      // Early-return when any modifier is pressed so browser shortcuts (Cmd+C, Cmd+F, Cmd+S, Alt) work naturally
      if (e.metaKey || e.ctrlKey || e.altKey) {
        return;
      }

      // Ignore single-key shortcuts when typing in inputs, textareas, selects, contenteditable, or inside a dialog
      if (isTypingTarget(e.target) || isTypingTarget(document.activeElement)) {
        return;
      }

      if (e.key === "1") {
        e.preventDefault();
        setViewMode("graph");
      } else if (e.key === "2") {
        e.preventDefault();
        setViewMode("canvas");
      } else if (e.key === "3") {
        e.preventDefault();
        setViewMode("compare");
      } else if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        setIsProjectMemoryOpen((prev) => !prev);
      } else if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        handleForkNode(activeNodeId);
      } else if (e.key === "c" || e.key === "C") {
        e.preventDefault();
        handleCompareWithParent(activeNodeId);
      } else if (e.key === "s" || e.key === "S") {
        e.preventDefault();
        handleToggleHero(activeNodeId);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeNodeId, handleForkNode, handleCompareWithParent, handleToggleHero]);

  const handleApplySuggestion = (sug) => {
    handleGenerateFork({
      prompt: sug.prompt,
      parentId: activeNodeId,
      branch: "Main Sequence",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-page)] text-[var(--text-primary)] transition-colors duration-200">
      {/* Accessible skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--accent-coral)] focus:text-white focus:rounded-xl focus:shadow-lg focus:outline-none"
      >
        Skip to workspace canvas
      </a>

      {/* Screen reader live region */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {liveAnnouncement}
      </div>

      {/* 1. Pro Header with Project Context & Mode Switcher */}
      <WorkspaceHeader
        projectMetadata={PRO_PROJECT_METADATA}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenProjectMemory={() => setIsProjectMemoryOpen(true)}
      />

      {/* Error state banner with retry */}
      {generateError && (
        <div
          role="alert"
          className="mx-4 sm:mx-6 mt-3 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 flex items-center justify-between gap-3 shadow-warm-sm animate-in fade-in"
        >
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" aria-hidden="true" />
            <div className="text-xs">
              <span className="font-semibold block text-rose-600 dark:text-rose-400">Synthesis Error</span>
              <span>{generateError}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleRetryFork}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold cursor-pointer shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
            <button
              type="button"
              onClick={() => setGenerateError(null)}
              aria-label="Dismiss error"
              className="p-1 rounded-lg hover:bg-rose-500/20 text-rose-500 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 2. Main Hero Stage */}
      <main id="main-content" className="flex-1 flex flex-col relative w-full overflow-hidden">
        {viewMode === "graph" && (
          <LineageGraph
            nodes={nodes}
            activeNodeId={activeNodeId}
            isGenerating={isGenerating}
            activeNode={activeNode}
            onSelectNode={handleSelectNode}
            onForkNode={handleForkNode}
            onCompareWithParent={handleCompareWithParent}
            onToggleHero={handleToggleHero}
            onOpenCanvas={(n) => {
              setActiveNodeId(n.id);
              setViewMode("canvas");
            }}
          />
        )}

        {viewMode === "canvas" && (
          <CanvasView
            node={activeNode}
            allNodes={nodes}
            onSelectNode={handleSelectNode}
            onForkNode={handleForkNode}
            onCompareWithParent={handleCompareWithParent}
            onToggleHero={handleToggleHero}
          />
        )}

        {viewMode === "compare" && (
          <CompareDiffView
            nodeA={compareNodeA}
            nodeB={activeNode}
            allNodes={nodes}
            onPickWinner={handleToggleHero}
          />
        )}
      </main>

      {/* 3. Non-Intrusive Floating Prompt Dock */}
      <FloatingPromptDock
        activeNode={activeNode}
        onGenerateFork={handleGenerateFork}
        isGenerating={isGenerating}
        modelName={activeModel}
        onChangeModel={setActiveModel}
      />

      {/* 4. Command Palette (⌘K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onForkNode={() => handleForkNode(activeNodeId)}
        onToggleCompare={() => handleCompareWithParent(activeNodeId)}
        onToggleHero={() => handleToggleHero(activeNodeId)}
        onOpenProjectMemory={() => setIsProjectMemoryOpen(true)}
        onSetViewMode={setViewMode}
        onChangeModel={setActiveModel}
        onChangeRatio={setActiveRatio}
        onRandomizeSeed={() => {
          setNodes((prev) =>
            prev.map((n) =>
              n.id === activeNodeId
                ? { ...n, seed: Math.floor(Math.random() * 900000) + 100000 }
                : n
            )
          );
        }}
        onSuggestNextShot={() => setIsProjectMemoryOpen(true)}
      />

      {/* 5. Project Memory DNA Drawer (M) */}
      <ProjectMemoryDrawer
        isOpen={isProjectMemoryOpen}
        onClose={() => setIsProjectMemoryOpen(false)}
        dna={PRO_PROJECT_METADATA.dna}
        onApplySuggestion={handleApplySuggestion}
        onInjectToken={(token) => {
          handleGenerateFork({
            prompt: `${activeNode.prompt}, ${token}`,
            parentId: activeNodeId,
          });
        }}
      />
    </div>
  );
}
