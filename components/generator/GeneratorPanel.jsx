"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Image as ImageIcon, Video as VideoIcon, Sparkles } from "lucide-react";
import { SegmentedToggle } from "@/components/ui/Toggle";
import { Select } from "@/components/ui/Select";
import { PromptInput } from "./PromptInput";
import { StylesAccordion } from "./StylesAccordion";
import { VideoControls } from "./VideoControls";
import { MODELS, ASPECT_RATIOS, BATCH_SIZES } from "@/data/modelsData";
import { cn } from "@/lib/utils";

// Dynamic import of Advance panel as requested in architecture specs
const DynamicAdvanceAccordion = dynamic(() => import("./AdvanceAccordion"), {
  ssr: false,
  loading: () => (
    <div className="h-10 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] animate-pulse" />
  ),
});

export function GeneratorPanel({
  onGenerate,
  isGenerating,
  initialPrompt = "",
  className,
}) {
  // Mode: "image" | "video"
  const [mode, setMode] = useState("image");

  // Draft prompt with localStorage persistence
  const [prompt, setPrompt] = useState(initialPrompt);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("fomi-draft-prompt");
      if (saved && !initialPrompt) {
        setPrompt(saved);
      }
    } catch {
      // ignore
    }
  }, [initialPrompt]);

  const handlePromptChange = (newPrompt) => {
    setPrompt(newPrompt);
    try {
      localStorage.setItem("fomi-draft-prompt", newPrompt);
    } catch {
      // ignore
    }
  };

  // Generation settings
  const [modelId, setModelId] = useState("fomi-flux-ultra");
  const [numOutputs, setNumOutputs] = useState(4);
  const [aspectRatio, setAspectRatio] = useState("3:4");
  const [selectedStyle, setSelectedStyle] = useState("none");

  // Advance settings
  const [negativePrompt, setNegativePrompt] = useState("");
  const [seed, setSeed] = useState(489218);
  const [guidanceScale, setGuidanceScale] = useState(7.5);
  const [steps, setSteps] = useState(28);
  const [sampler, setSampler] = useState("Euler a");

  // Video settings
  const [duration, setDuration] = useState("5s");
  const [resolution, setResolution] = useState("1080p");
  const [motionStrength, setMotionStrength] = useState(6);
  const [cameraMove, setCameraMove] = useState("zoom-in");

  // Sync model with mode (if mode is video, auto select video model if needed)
  useEffect(() => {
    if (mode === "video") {
      setModelId("wan-2.1-video");
    } else if (modelId === "wan-2.1-video" || modelId === "higgs-motion-pro") {
      setModelId("fomi-flux-ultra");
    }
  }, [mode, modelId]);

  const activeModel = MODELS.find((m) => m.id === modelId) || MODELS[0];

  const handleGenerateSubmit = () => {
    if (!prompt.trim() || isGenerating) return;

    onGenerate({
      prompt: prompt.trim(),
      negativePrompt,
      type: mode,
      modelId,
      modelName: activeModel.name,
      aspectRatio,
      numOutputs: mode === "video" ? 1 : numOutputs,
      seed,
      style: selectedStyle,
      duration,
      resolution,
      motionStrength,
      cameraMove,
    });
  };

  const modeOptions = [
    { value: "image", label: "Image", icon: ImageIcon },
    { value: "video", label: "Video", icon: VideoIcon },
  ];

  const batchOptions = BATCH_SIZES.map((n) => ({
    id: n,
    name: `${n} ${n === 1 ? "Image" : "Images"}`,
  }));

  const ratioOptions = ASPECT_RATIOS.map((r) => ({
    id: r.id,
    name: `${r.ratio} (${r.label})`,
  }));

  const modelOptions = MODELS.filter((m) =>
    mode === "video" ? m.category === "video" : m.category === "image"
  ).map((m) => ({
    id: m.id,
    name: m.name,
    description: m.description,
  }));

  return (
    <aside
      aria-label="Generation Control Panel"
      className={cn(
        "w-full rounded-3xl bg-[var(--bg-panel-peach)] border border-[var(--border-subtle)] p-4 sm:p-5 shadow-warm-md flex flex-col gap-3.5 transition-colors duration-200",
        className
      )}
    >
      {/* 1. Segmented Toggle: Image | Video */}
      <SegmentedToggle
        options={modeOptions}
        value={mode}
        onChange={setMode}
        ariaLabel="Generation mode selection"
      />

      {/* 2. Prompt Textarea with anchored Coral Generate button */}
      <PromptInput
        value={prompt}
        onChange={handlePromptChange}
        onGenerate={handleGenerateSubmit}
        isGenerating={isGenerating}
        placeholder={
          mode === "video"
            ? "Describe dynamic scenes, camera trajectory, motion, and cinematic lighting..."
            : "Describe your imagination to be converted to a piece of art..."
        }
      />

      {/* 3. Row of compact selects: number of images, aspect ratio/size, Model */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Model Selector showing "Model: Name" */}
        <Select
          options={modelOptions}
          value={modelId}
          onChange={setModelId}
          labelPrefix="Model: "
          dropdownWidth="w-56"
          ariaLabel="Diffusion Model Selection"
        />

        {/* Aspect Ratio / Size */}
        <Select
          options={ratioOptions}
          value={aspectRatio}
          onChange={setAspectRatio}
          labelPrefix="Ratio: "
          dropdownWidth="w-44"
          ariaLabel="Aspect Ratio Selection"
        />

        {/* Number of outputs (Image mode only) */}
        {mode === "image" && (
          <Select
            options={batchOptions}
            value={numOutputs}
            onChange={setNumOutputs}
            labelPrefix="Batch: "
            dropdownWidth="w-36"
            ariaLabel="Number of Images to Generate"
          />
        )}
      </div>

      {/* 4. Video-specific controls if video mode is active */}
      {mode === "video" && (
        <VideoControls
          duration={duration}
          onDurationChange={setDuration}
          resolution={resolution}
          onResolutionChange={setResolution}
          motionStrength={motionStrength}
          onMotionStrengthChange={setMotionStrength}
          cameraMove={cameraMove}
          onCameraMoveChange={setCameraMove}
        />
      )}

      {/* 5. Two collapsible pill accordions: "Advance" and "Styles" */}
      <div className="space-y-2 pt-1">
        <StylesAccordion
          selectedStyle={selectedStyle}
          onSelectStyle={setSelectedStyle}
        />

        <DynamicAdvanceAccordion
          negativePrompt={negativePrompt}
          onNegativePromptChange={setNegativePrompt}
          seed={seed}
          onSeedChange={setSeed}
          guidanceScale={guidanceScale}
          onGuidanceScaleChange={setGuidanceScale}
          steps={steps}
          onStepsChange={setSteps}
          sampler={sampler}
          onSamplerChange={setSampler}
        />
      </div>
    </aside>
  );
}
