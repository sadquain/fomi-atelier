"use client";

import React from "react";
import { Home, Image as ImageIcon, Video, Paintbrush, Sliders } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileTabBar({ activeTab, onTabChange, onTogglePanel, isPanelOpen }) {
  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "image", label: "Image", icon: ImageIcon },
    { id: "video", label: "Video", icon: Video },
    { id: "canvas", label: "Canvas", icon: Paintbrush },
  ];

  return (
    <nav
      role="tablist"
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--bg-card)]/95 backdrop-blur-xl border-t border-[var(--border-subtle)] px-4 py-2 flex items-center justify-around shadow-warm-lg"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={tab.label}
            onClick={() => onTabChange && onTabChange(tab.id)}
            className={cn(
              "flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer",
              isActive
                ? "text-[var(--accent-coral)]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            )}
          >
            <Icon className="w-5 h-5" aria-hidden="true" />
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        );
      })}

      {/* Quick toggle for prompt / control bottom sheet */}
      <button
        type="button"
        aria-label="Toggle generation controls dock"
        onClick={onTogglePanel}
        className={cn(
          "flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer",
          isPanelOpen
            ? "text-[var(--accent-coral)]"
            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        )}
      >
        <Sliders className="w-5 h-5" aria-hidden="true" />
        <span className="text-[10px] font-medium">Controls</span>
      </button>
    </nav>
  );
}
