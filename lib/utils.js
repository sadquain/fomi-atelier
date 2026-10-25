export function cn(...inputs) {
  return inputs
    .flatMap((x) => {
      if (!x) return [];
      if (typeof x === "string") return x.split(/\s+/).filter(Boolean);
      if (Array.isArray(x)) return x.filter(Boolean);
      if (typeof x === "object") {
        return Object.entries(x)
          .filter(([, v]) => Boolean(v))
          .map(([k]) => k);
      }
      return [];
    })
    .join(" ");
}

export function formatTimestamp(isoString) {
  if (!isoString) return "Recently";
  try {
    // Deterministic parsing without calling new Date() at prerender
    const parts = String(isoString).split("T");
    if (parts.length > 1) {
      const timePart = parts[1].slice(0, 5); // "11:45"
      return `${timePart} UTC`;
    }
    return "Recently";
  } catch {
    return "Recently";
  }
}

export function generateRandomSeed() {
  return Math.floor(Math.random() * 900000) + 100000;
}
