"use client";

import React from "react";
import { Home, Image as ImageIcon, Video, Paintbrush, Folder } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: Home },
  { id: "image", label: "Image Studio", icon: ImageIcon },
  { id: "video", label: "Video Studio", icon: Video },
  { id: "canvas", label: "Edit / Canvas", icon: Paintbrush },
  { id: "projects", label: "Projects", icon: Folder },
];

export function IconNav({ activeTab = "image", onTabChange, className }) {
  return (
    <nav
      aria-label="Primary Navigation"
      className={cn(
        "relative flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-warm-sm",
        className
      )}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = activeTab === item.id;
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={item.label}
            onClick={() => onTabChange && onTabChange(item.id)}
            className={cn(
              "relative px-3.5 py-2 rounded-xl flex items-center justify-center transition-all duration-200 group cursor-pointer active:scale-95",
              isActive
                ? "text-[var(--accent-coral)] bg-[var(--accent-coral-light)]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"
            )}
          >
            {/* Coral active indicator bar above the icon */}
            {isActive && (
              <span
                className="absolute -top-[7px] left-1/2 -translate-x-1/2 w-7 h-[3px] rounded-full bg-[var(--accent-coral)] shadow-xs"
                aria-hidden="true"
              />
            )}
            <Icon className="w-4 h-4 shrink-0 transition-transform duration-150 group-hover:scale-110" aria-hidden="true" />
            <span className="sr-only">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
