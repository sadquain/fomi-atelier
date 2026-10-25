"use client";

import React from "react";
import { Clock, Monitor, Activity, Compass } from "lucide-react";
import { Slider } from "@/components/ui/Slider";
import { cn } from "@/lib/utils";

export function VideoControls({
  duration,
  onDurationChange,
  resolution,
  onResolutionChange,
  motionStrength,
  onMotionStrengthChange,
  cameraMove,
  onCameraMoveChange,
}) {
  const durations = [
    { label: "3s", value: "3s" },
    { label: "5s", value: "5s" },
    { label: "10s", value: "10s" },
  ];

  const resolutions = [
    { label: "720p", value: "720p" },
    { label: "1080p HD", value: "1080p" },
    { label: "4K Cinema", value: "4K" },
  ];

  const cameraMoves = [
    { label: "Static Cam", value: "static" },
    { label: "Slow Pan Right", value: "pan-right" },
    { label: "Cinematic Zoom", value: "zoom-in" },
    { label: "Orbit Around", value: "orbit" },
  ];

  return (
    <div className="space-y-3.5 p-3 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-warm-sm animate-in fade-in">
      {/* Duration selector */}
      <div>
        <label className="text-[11px] font-medium text-[var(--text-secondary)] flex items-center gap-1.5 mb-1.5">
          <Clock className="w-3.5 h-3.5 text-[var(--accent-coral)]" /> Video Duration
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {durations.map((d) => (
            <button
              key={d.value}
              type="button"
              onClick={() => onDurationChange(d.value)}
              className={cn(
                "py-1.5 px-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer",
                duration === d.value
                  ? "bg-[var(--accent-coral-light)] text-[var(--accent-coral)] border-[var(--accent-coral-border)] font-semibold"
                  : "bg-[var(--bg-subtle)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:bg-[var(--bg-hover)]"
              )}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Resolution selector */}
      <div>
        <label className="text-[11px] font-medium text-[var(--text-secondary)] flex items-center gap-1.5 mb-1.5">
          <Monitor className="w-3.5 h-3.5 text-[var(--accent-coral)]" /> Target Quality
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {resolutions.map((r) => (
            <button
              key={r.value}
              type="button"
              onClick={() => onResolutionChange(r.value)}
              className={cn(
                "py-1.5 px-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer",
                resolution === r.value
                  ? "bg-[var(--accent-coral-light)] text-[var(--accent-coral)] border-[var(--accent-coral-border)] font-semibold"
                  : "bg-[var(--bg-subtle)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:bg-[var(--bg-hover)]"
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Motion Strength Slider */}
      <div>
        <Slider
          label="Motion Dynamics"
          min={1}
          max={10}
          step={1}
          value={motionStrength}
          onChange={onMotionStrengthChange}
          valueDisplay={`${motionStrength}/10`}
        />
      </div>

      {/* Camera motion */}
      <div>
        <label htmlFor="camera-motion" className="text-[11px] font-medium text-[var(--text-secondary)] flex items-center gap-1.5 mb-1.5">
          <Compass className="w-3.5 h-3.5 text-[var(--accent-coral)]" /> Camera Move
        </label>
        <select
          id="camera-motion"
          value={cameraMove}
          onChange={(e) => onCameraMoveChange(e.target.value)}
          className="w-full rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] px-2.5 py-1.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-coral)] cursor-pointer"
        >
          {cameraMoves.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
