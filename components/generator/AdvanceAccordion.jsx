"use client";

import React from "react";
import { Sliders, Shuffle } from "lucide-react";
import { AccordionPill } from "@/components/ui/Accordion";
import { Slider } from "@/components/ui/Slider";
import { generateRandomSeed } from "@/lib/utils";

export default function AdvanceAccordion({
  negativePrompt,
  onNegativePromptChange,
  seed,
  onSeedChange,
  guidanceScale,
  onGuidanceScaleChange,
  steps,
  onStepsChange,
  sampler,
  onSamplerChange,
}) {
  return (
    <AccordionPill title="Advance" icon={Sliders} defaultOpen={false}>
      <div className="space-y-3.5 pt-1 text-xs">
        {/* Negative Prompt */}
        <div>
          <label
            htmlFor="negative-prompt"
            className="block font-medium text-[var(--text-secondary)] mb-1"
          >
            Negative Prompt
          </label>
          <textarea
            id="negative-prompt"
            value={negativePrompt}
            onChange={(e) => onNegativePromptChange(e.target.value)}
            placeholder="blurry, distorted anatomy, extra limbs, low resolution, watermark..."
            rows={2}
            className="w-full rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] p-2 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-coral)] resize-none"
          />
        </div>

        {/* Seed with randomizer */}
        <div>
          <label htmlFor="seed-input" className="block font-medium text-[var(--text-secondary)] mb-1">
            Seed
          </label>
          <div className="flex items-center gap-1.5">
            <input
              id="seed-input"
              type="number"
              value={seed}
              onChange={(e) => onSeedChange(Number(e.target.value))}
              placeholder="Random"
              className="flex-1 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] px-2.5 py-1.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-coral)]"
            />
            <button
              type="button"
              onClick={() => onSeedChange(generateRandomSeed())}
              aria-label="Randomize seed number"
              className="p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              <Shuffle className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Guidance Scale (CFG) Slider */}
        <Slider
          label="Guidance Scale (CFG)"
          min={1}
          max={20}
          step={0.5}
          value={guidanceScale}
          onChange={onGuidanceScaleChange}
          valueDisplay={guidanceScale.toFixed(1)}
        />

        {/* Generation Steps Slider */}
        <Slider
          label="Sampling Steps"
          min={10}
          max={50}
          step={1}
          value={steps}
          onChange={onStepsChange}
          valueDisplay={`${steps} steps`}
        />

        {/* Sampler Selector */}
        <div>
          <label htmlFor="sampler-select" className="block font-medium text-[var(--text-secondary)] mb-1">
            Sampler
          </label>
          <select
            id="sampler-select"
            value={sampler}
            onChange={(e) => onSamplerChange(e.target.value)}
            className="w-full rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] px-2.5 py-1.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-coral)] cursor-pointer"
          >
            <option value="Euler a">Euler a (Smooth & Stable)</option>
            <option value="DPM++ 2M Karras">DPM++ 2M Karras (High Detail)</option>
            <option value="DDIM">DDIM (Consistent)</option>
            <option value="UniPC">UniPC (Fast)</option>
          </select>
        </div>
      </div>
    </AccordionPill>
  );
}
