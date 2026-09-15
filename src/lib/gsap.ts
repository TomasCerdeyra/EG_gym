import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollTrigger measures start/end positions at creation time. This page grows
 * after mount (web fonts, a 100dvh section, lazily decoded photos), which left
 * triggers pointing at stale offsets that never fired — sections stayed at
 * opacity 0 forever. Refresh once the layout has settled, and keep a failsafe
 * so a trigger that still misfires can never hide content from a visitor.
 */
export function installScrollTriggerRefresh() {
  const refresh = () => ScrollTrigger.refresh();

  if (document.readyState === "complete") {
    requestAnimationFrame(refresh);
  } else {
    window.addEventListener("load", () => requestAnimationFrame(refresh), {
      once: true,
    });
  }

  document.fonts?.ready.then(refresh).catch(() => {});

  // Last resort: reveal anything still hidden after the page has settled.
  window.setTimeout(() => {
    ScrollTrigger.refresh();
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      if (Number(getComputedStyle(el).opacity) === 0) {
        gsap.set(el, { opacity: 1, y: 0, clearProps: "transform" });
      }
    });
  }, 2500);
}

export { gsap, ScrollTrigger };
