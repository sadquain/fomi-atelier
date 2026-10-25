export function isTypingTarget(target) {
  if (typeof document === "undefined") return false;
  const el = target || document.activeElement;
  if (!el || !(el instanceof HTMLElement)) return false;

  const tagName = el.tagName?.toUpperCase();
  if (tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT") {
    return true;
  }

  if (el.isContentEditable || el.getAttribute("contenteditable") === "true") {
    return true;
  }

  // Inside modal dialog
  if (el.closest && el.closest('[role="dialog"]')) {
    return true;
  }

  return false;
}
