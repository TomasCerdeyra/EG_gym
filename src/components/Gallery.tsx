import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";
import { useBreakpoint } from "../hooks/useBreakpoint";
import { GALLERY } from "../data/gallery";

export default function Gallery() {
  const root = useRef<HTMLElement>(null);
  const isMobile = useBreakpoint() === "mobile";

  useGSAP(
    () => {
      // Phones get no scroll-driven reveal. Running transforms against the
      // scroll position competes with the browser's own scrolling and reads as
      // stutter; the marquee is the only motion left there.
      if (isMobile) return;

      // Transform only, never opacity: a lazily loaded <img> inside an
      // opacity:0 ancestor is treated as non-visible by Chrome and is never
      // fetched, and it does not re-evaluate once the element becomes visible.
      gsap.fromTo(
        ".gallery-item",
        { y: 48, scale: 0.97 },
        {
          scrollTrigger: { trigger: root.current, start: "top 80%" },
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
        },
      );
    },
    { scope: root, dependencies: [isMobile] },
  );

  return (
    <section
      id="galeria"
      ref={root}
      className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28"
    >
      <header className="mb-12 max-w-2xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-eg-red">
          El lugar
        </p>
        <h2 className="font-display text-[clamp(2rem,6vw,4rem)] uppercase leading-[0.95]">
          Así se entrena en EG
        </h2>
      </header>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {GALLERY.map((image, index) => (
          <figure
            key={image.src}
            data-reveal
            // Only the first tile is promoted, and only from lg up. The old
            // test was index % 5 === 0, which also matched the sixth photo, so
            // the last tile went double-size and tore a hole in the grid.
            // Below lg every tile is equal, which fills two columns exactly.
            className={`gallery-item group relative overflow-hidden rounded-xl bg-eg-coal ${
              index === 0 ? "lg:col-span-2 lg:row-span-2" : ""
            }`}
          >
            <img
              src={image.src}
              srcSet={image.srcSet}
              sizes="(max-width: 639px) 50vw, (max-width: 1023px) 50vw, 33vw"
              alt={image.alt}
              // NOTE: eager on purpose. loading="lazy" did not fetch in the
              // target browser (a dark-mode extension interferes with the
              // visibility heuristic), which left the grid blank. Revisit
              // together with converting these JPGs to WebP.
              loading="eager"
              decoding="async"
              className={`size-full object-cover aspect-[3/4] transition-transform duration-700 group-hover:scale-105 ${
                index === 0 ? "lg:aspect-square" : ""
              }`}
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-eg-black/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </figure>
        ))}
      </div>
    </section>
  );
}
