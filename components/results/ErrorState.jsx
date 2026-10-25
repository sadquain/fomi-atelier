"use client";

import React from "react";
import { AlertCircle, RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ErrorState({ error, onRetry, onClear }) {
  if (!error) return null;

  return (
    <div
      role="alert"
      className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 flex items-center justify-between gap-3 shadow-warm-sm animate-in fade-in"
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" aria-hidden="true" />
        <div className="text-xs sm:text-sm">
          <p className="font-semibold text-rose-600 dark:text-rose-400">Generation Failed</p>
          <p className="truncate text-xs opacity-90">{error}</p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        {onRetry && (
          <Button
            variant="primary"
            size="sm"
            icon={RefreshCw}
            onClick={onRetry}
            className="bg-rose-500 hover:bg-rose-600 text-white"
          >
            Retry
          </Button>
        )}
        {onClear && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Dismiss error"
            className="p-1.5 rounded-lg hover:bg-rose-500/20 text-rose-500 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}
