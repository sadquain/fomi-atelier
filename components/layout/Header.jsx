"use client";

import React, { useState } from "react";
import { Sparkles, HelpCircle, LayoutGrid, Menu, X } from "lucide-react";
import { IconNav } from "./IconNav";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

export function Header({ activeTab, onTabChange, onToggleMobilePanel }) {
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);

  return (
    <>
      {/* Accessible skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--accent-coral)] focus:text-white focus:rounded-xl focus:shadow-lg focus:outline-none"
      >
        Skip to main workspace
      </a>

      <header className="sticky top-0 z-40 w-full bg-[var(--bg-page)]/85 backdrop-blur-xl border-b border-[var(--border-subtle)]/70 px-4 sm:px-6 py-2.5 transition-colors duration-200">
        <div className="max-w-[1720px] mx-auto flex items-center justify-between gap-4">
          {/* Left: Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onTabChange && onTabChange("home")}
              className="flex items-center gap-2.5 group cursor-pointer"
              aria-label="Fomi Atelier Home"
            >
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#F5A591] via-[var(--accent-coral)] to-[#D9785D] flex items-center justify-center text-white font-bold text-lg shadow-warm-sm group-hover:scale-105 group-hover:shadow-md transition-all duration-200 select-none">
                F
              </div>
              <div className="flex flex-col text-left">
                <span className="font-bold text-base tracking-tight text-[var(--text-primary)] leading-tight flex items-center gap-1.5">
                  fomi
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded-full bg-[var(--accent-coral-light)] text-[var(--accent-coral)]">
                    Atelier
                  </span>
                </span>
                <span className="text-[11px] text-[var(--text-muted)] font-medium hidden sm:inline">
                  AI Creative Studio
                </span>
              </div>
            </button>
          </div>

          {/* Center: Nav (Desktop & Tablet) */}
          <div className="hidden md:flex items-center justify-center">
            <IconNav activeTab={activeTab} onTabChange={onTabChange} />
          </div>

          {/* Right: Actions, Gallery & Support Pills, Theme Toggle, User Avatar */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Gallery pill */}
            <Button
              variant="secondary"
              size="pill"
              icon={LayoutGrid}
              onClick={() => setShowGalleryModal(true)}
              className="hidden sm:inline-flex border-[var(--border-subtle)] hover:border-[var(--accent-coral)]"
            >
              Gallery
            </Button>

            {/* Support pill */}
            <Button
              variant="secondary"
              size="pill"
              icon={HelpCircle}
              onClick={() => setShowSupportModal(true)}
              className="hidden lg:inline-flex border-[var(--border-subtle)]"
            >
              Support
            </Button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Avatar */}
            <div className="relative">
              <button
                type="button"
                aria-label="User Account"
                className="w-9 h-9 rounded-2xl bg-gradient-to-br from-amber-200 via-rose-300 to-coral-300 p-0.5 shadow-warm-sm hover:scale-105 transition-transform duration-150 cursor-pointer focus-visible:ring-2 focus-visible:ring-[var(--accent-coral)]"
              >
                <div className="w-full h-full rounded-[14px] bg-[var(--bg-card)] flex items-center justify-center overflow-hidden">
                  <span className="text-xs font-bold text-[var(--text-primary)]">FA</span>
                </div>
                <span
                  className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[var(--bg-card)]"
                  title="Online"
                />
              </button>
            </div>

            {/* Mobile drawer toggle */}
            {onToggleMobilePanel && (
              <button
                type="button"
                onClick={onToggleMobilePanel}
                aria-label="Toggle generation controls"
                className="md:hidden p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] cursor-pointer"
              >
                <Menu className="w-5 h-5" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Gallery Modal */}
      <Modal
        isOpen={showGalleryModal}
        onClose={() => setShowGalleryModal(false)}
        title="Curated Community Showcase"
        size="lg"
      >
        <div className="space-y-4">
          <p className="text-xs text-[var(--text-secondary)]">
            Explore state-of-the-art visuals synthesized by creators worldwide using Fomi Flux and Wan 2.1 engines.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { title: "Neo Porcelain", style: "Claymation", author: "@celeste", img: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80" },
              { title: "Solar Dune Arch", style: "Cinematic", author: "@aether", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80" },
              { title: "Fluid Deep", style: "Simulation", author: "@marina", img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80" },
            ].map((item, idx) => (
              <div key={idx} className="rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-warm-sm group">
                <div className="aspect-[3/4] overflow-hidden bg-[var(--bg-subtle)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-2.5">
                  <p className="text-xs font-semibold text-[var(--text-primary)] truncate">{item.title}</p>
                  <p className="text-[10px] text-[var(--text-muted)] flex justify-between mt-0.5">
                    <span>{item.style}</span>
                    <span>{item.author}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* Support Modal */}
      <Modal
        isOpen={showSupportModal}
        onClose={() => setShowSupportModal(false)}
        title="Fomi Atelier Support & Documentation"
        size="md"
      >
        <div className="space-y-4 text-xs text-[var(--text-secondary)]">
          <div className="p-3.5 rounded-2xl bg-[var(--accent-coral-light)] text-[var(--text-primary)] border border-[var(--accent-coral-border)]">
            <h3 className="font-bold flex items-center gap-1.5 text-sm mb-1 text-[var(--accent-coral)]">
              <Sparkles className="w-4 h-4" /> Keyboard Shortcuts
            </h3>
            <ul className="space-y-1 text-xs">
              <li><strong className="font-semibold">Ctrl + Enter / ⌘ + Enter:</strong> Trigger generation</li>
              <li><strong className="font-semibold">Esc:</strong> Close lightbox & dialogs</li>
              <li><strong className="font-semibold">Left / Right Arrows:</strong> Navigate images in lightbox</li>
            </ul>
          </div>
          <p>
            Have feedback, bug reports, or feature requests? Contact our research and engineering lab at <a href="mailto:support@fomi.art" className="text-[var(--accent-coral)] underline">support@fomi.art</a>.
          </p>
        </div>
      </Modal>
    </>
  );
}
