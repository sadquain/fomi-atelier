"use client";

import React, { useState, useEffect, useCallback } from "react";
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";
import { CommandPalette } from "@/components/workspace/CommandPalette";
import { LineageGraph } from "@/components/workspace/LineageGraph";
import { CanvasView } from "@/components/workspace/CanvasView";
import { CompareDiffView } from "@/components/workspace/CompareDiffView";
import { ProjectMemoryDrawer } from "@/components/workspace/ProjectMemoryDrawer";
import { FloatingPromptDock } from "@/components/workspace/FloatingPromptDock";
import { PRO_PROJECT_METADATA, INITIAL_NODES } from "@/data/proProjectData";

export default function ProfessionalWorkspacePage() {
  const [nodes, setNodes] = useState(INITIAL_NODES);
  const [activeNodeId, setActiveNodeId] = useState(INITIAL_NODES[1].id); // Shot 2
  const [compareParentId, setCompareParentId] = useState(INITIAL_NODES[0].id); // Shot 1
  const [viewMode, setViewMode] = useState("graph"); // "graph" | "canvas" | "compare"
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isProjectMemoryOpen, setIsProjectMemoryOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeModel, setActiveModel] = useState("Fomi Flux Ultra");
  const [activeRatio, setActiveRatio] = useState("16:9");

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

  const handleForkNode = useCallback(
    (id) => {
      const parent = nodes.find((n) => n.id === id) || activeNode;
      const newId = `node-fork-${Date.now().toString().slice(-4)}`;
      const newNode = {
        id: newId,
        parentId: parent.id,
        branch: parent.branch.includes("Branch") ? parent.branch : "Branch C: Lighting Exploration",
        title: `Shot ${nodes.length + 1}: Variant Fork`,
        prompt: `${parent.prompt}, warm peach volumetric bloom, shallow focus`,
        diffFromParent: "+ warm peach volumetric bloom, shallow focus",
        model: activeModel,
        aspectRatio: activeRatio,
        seed: Math.floor(Math.random() * 900000) + 100000,
        guidance: 7.5,
        steps: 32,
        timestamp: "Just now",
        isHero: false,
        imageUrl: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=1200&q=80",
        thumbUrl: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=320&q=80",
      };

      setNodes((prev) => [...prev, newNode]);
      setActiveNodeId(newNode.id);
      setCompareParentId(parent.id);
    },
    [nodes, activeNode, activeModel, activeRatio]
  );

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

  // Keyboard hotkey listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't capture when typing in inputs
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      } else if (e.key === "1") {
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

  const handleGenerateFork = async (payload) => {
    setIsGenerating(true);
    // Simulate generation latency
    await new Promise((resolve) => setTimeout(resolve, 1400));

    const parent = nodes.find((n) => n.id === payload.parentId) || activeNode;
    const newId = `node-${Date.now().toString().slice(-4)}`;
    const newNode = {
      id: newId,
      parentId: parent.id,
      branch: payload.branch || parent.branch,
      title: `Shot ${nodes.length + 1}: Synthesized Leaf`,
      prompt: payload.prompt,
      diffFromParent: `Fork from ${parent.title} with updated prompt parameters`,
      model: activeModel,
      aspectRatio: activeRatio,
      seed: Math.floor(Math.random() * 900000) + 100000,
      guidance: 7.5,
      steps: 35,
      timestamp: "Just now",
      isHero: true,
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      thumbUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=320&q=80",
    };

    setNodes((prev) => [...prev, newNode]);
    setActiveNodeId(newNode.id);
    setCompareParentId(parent.id);
    setIsGenerating(false);
  };

  const handleApplySuggestion = (sug) => {
    handleGenerateFork({
      prompt: sug.prompt,
      parentId: activeNodeId,
      branch: "Main Sequence",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-page)] text-[var(--text-primary)] transition-colors duration-200">
      {/* 1. Pro Header with Project Context & Mode Switcher */}
      <WorkspaceHeader
        projectMetadata={PRO_PROJECT_METADATA}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenProjectMemory={() => setIsProjectMemoryOpen(true)}
      />

      {/* 2. Main Hero Stage */}
      <main className="flex-1 flex flex-col relative w-full overflow-hidden">
        {viewMode === "graph" && (
          <LineageGraph
            nodes={nodes}
            activeNodeId={activeNodeId}
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
