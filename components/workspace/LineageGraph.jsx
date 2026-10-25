"use client";

import React from "react";
import { GitBranch, Star, SplitSquareVertical, ArrowDown, Plus, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function LineageGraph({
  nodes = [],
  activeNodeId,
  onSelectNode,
  onForkNode,
  onCompareWithParent,
  onToggleHero,
  onOpenCanvas,
}) {
  // Group nodes by branches
  const branches = Array.from(new Set(nodes.map((n) => n.branch)));

  return (
    <div className="w-full flex-1 overflow-x-auto p-4 sm:p-8 no-scrollbar relative min-h-[600px] flex flex-col justify-start">
      {/* Background blueprint grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(#E8967F 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Graph Header instructions */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 relative z-10">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-[var(--accent-coral)]" />
            <span>Branching Creative Timeline (DAG)</span>
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Every generation is an immutable node in your project graph. Click to inspect, press{" "}
            <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-subtle)] font-mono text-[10px] border border-[var(--border-subtle)]">
              F
            </kbd>{" "}
            to fork,{" "}
            <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-subtle)] font-mono text-[10px] border border-[var(--border-subtle)]">
              C
            </kbd>{" "}
            to compare.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] font-medium text-[var(--text-secondary)]">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> {nodes.length} Nodes Recorded
          </span>
        </div>
      </div>

      {/* Visual Branch Columns */}
      <div className="flex items-start gap-8 sm:gap-12 relative z-10 pb-12">
        {branches.map((branchName, bIdx) => {
          const branchNodes = nodes.filter((n) => n.branch === branchName);

          return (
            <div
              key={branchName}
              className="flex flex-col gap-4 min-w-[280px] sm:min-w-[320px] max-w-[340px]"
            >
              {/* Branch Column Header */}
              <div className="flex items-center justify-between px-3 py-2 rounded-2xl bg-[var(--bg-card)]/80 backdrop-blur-md border border-[var(--border-subtle)] shadow-warm-sm">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "w-2.5 h-2.5 rounded-full",
                      bIdx === 0
                        ? "bg-[var(--accent-coral)]"
                        : bIdx === 1
                        ? "bg-cyan-500"
                        : "bg-amber-500"
                    )}
                  />
                  <span className="font-bold text-xs text-[var(--text-primary)]">
                    {branchName}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[var(--text-muted)]">
                  {branchNodes.length} steps
                </span>
              </div>

              {/* Stack of Nodes with Visual Connectors */}
              <div className="flex flex-col gap-5 relative">
                {branchNodes.map((node, nIdx) => {
                  const isActive = node.id === activeNodeId;

                  return (
                    <div key={node.id} className="relative flex flex-col items-center">
                      {/* Node Card */}
                      <div
                        onClick={() => onSelectNode(node.id)}
                        onDoubleClick={() => onOpenCanvas(node)}
                        className={cn(
                          "w-full rounded-2xl p-3 bg-[var(--bg-card)] border transition-all duration-200 cursor-pointer shadow-warm-sm relative group active:scale-[0.99]",
                          isActive
                            ? "border-[var(--accent-coral)] ring-2 ring-[var(--accent-coral)]/30 shadow-warm-md scale-[1.02]"
                            : "border-[var(--border-subtle)] hover:border-[var(--border-hover)] hover:shadow-md"
                        )}
                      >
                        {/* Hero Star Badge & Branch tag */}
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--border-subtle)]/50">
                          <span className="text-xs font-bold text-[var(--text-primary)] truncate">
                            {node.title}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleHero(node.id);
                            }}
                            title={node.isHero ? "Hero Shot (Starred)" : "Mark as Hero"}
                            className="p-1 rounded-lg hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
                          >
                            <Star
                              className={cn(
                                "w-3.5 h-3.5",
                                node.isHero
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-[var(--text-muted)] hover:text-amber-400"
                              )}
                            />
                          </button>
                        </div>

                        {/* Image Preview with Aspect Ratio */}
                        <div className="aspect-video w-full rounded-xl overflow-hidden bg-[var(--bg-subtle)] relative mb-2.5">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={node.imageUrl}
                            alt={node.title}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[10px] font-mono text-white">
                            {node.aspectRatio}
                          </span>
                          <span className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[10px] text-white">
                            {node.timestamp}
                          </span>
                        </div>

                        {/* Prompt Difference from parent */}
                        <div className="p-2 rounded-xl bg-[var(--bg-subtle)] text-[11px] text-[var(--text-secondary)] font-medium leading-relaxed mb-2.5">
                          <span className="text-[var(--accent-coral)] font-semibold block text-[10px] uppercase tracking-wider mb-0.5">
                            Delta from parent:
                          </span>
                          <p className="line-clamp-2">{node.diffFromParent}</p>
                        </div>

                        {/* Model & Seed parameters */}
                        <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] font-mono border-t border-[var(--border-subtle)]/60 pt-2">
                          <span>{node.model}</span>
                          <span>Seed: {node.seed}</span>
                        </div>

                        {/* Quick hover action bar */}
                        <div className="absolute -top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center gap-1 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl shadow-warm-md p-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onForkNode(node.id);
                            }}
                            title="Fork child branch from this node (F)"
                            className="p-1 rounded-lg hover:bg-[var(--accent-coral-light)] hover:text-[var(--accent-coral)] text-[var(--text-secondary)] transition-colors cursor-pointer"
                          >
                            <GitBranch className="w-3.5 h-3.5" />
                          </button>
                          {node.parentId && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onCompareWithParent(node.id);
                              }}
                              title="Compare side-by-side with parent (C)"
                              className="p-1 rounded-lg hover:bg-[var(--accent-coral-light)] hover:text-[var(--accent-coral)] text-[var(--text-secondary)] transition-colors cursor-pointer"
                            >
                              <SplitSquareVertical className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Line connector to next node in branch */}
                      {nIdx < branchNodes.length - 1 && (
                        <div className="w-0.5 h-5 bg-gradient-to-b from-[var(--border-accent)] to-[var(--border-subtle)] my-0.5 relative">
                          <ArrowDown className="w-3 h-3 text-[var(--border-accent)] absolute -bottom-1.5 -left-[5px]" />
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Fork New Leaf Button */}
                <button
                  type="button"
                  onClick={() => onForkNode(branchNodes[branchNodes.length - 1]?.id)}
                  className="w-full py-2.5 px-3 rounded-2xl border border-dashed border-[var(--border-subtle)] hover:border-[var(--accent-coral)] hover:bg-[var(--bg-panel-peach)]/50 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-coral)] flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-98"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Fork New Child Node</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
