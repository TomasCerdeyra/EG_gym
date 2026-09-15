import { useEffect, useState } from "react";

export type Tier = "mobile" | "tablet" | "desktop";

const MOBILE = "(max-width: 639px)";
const TABLET = "(max-width: 1023px)";
const REDUCED = "(prefers-reduced-motion: reduce)";

function readTier(): Tier {
  if (typeof window === "undefined") return "desktop";
  if (window.matchMedia(MOBILE).matches) return "mobile";
  if (window.matchMedia(TABLET).matches) return "tablet";
  return "desktop";
}

/**
 * Active layout tier, for the decisions Tailwind breakpoints cannot make —
 * whether to mount an expensive component at all.
 *
 * Backed by matchMedia rather than a resize listener. A resize listener fires
 * continuously on phones as the browser chrome hides and reveals during a
 * scroll, re-rendering everything below it; these media queries only notify
 * when a threshold is actually crossed. The initial value is read during the
 * first render, so a phone never mounts the desktop branch and then swaps.
 */
export function useBreakpoint(): Tier {
  const [tier, setTier] = useState<Tier>(readTier);

  useEffect(() => {
    const queries = [window.matchMedia(MOBILE), window.matchMedia(TABLET)];
    const update = () => setTier(readTier());
    queries.forEach((q) => q.addEventListener("change", update));
    update();
    return () => queries.forEach((q) => q.removeEventListener("change", update));
  }, []);

  return tier;
}

/** Whether the visitor asked the system to minimise animation. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia(REDUCED).matches,
  );

  useEffect(() => {
    const query = window.matchMedia(REDUCED);
    const update = () => setReduced(query.matches);
    query.addEventListener("change", update);
    update();
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}
