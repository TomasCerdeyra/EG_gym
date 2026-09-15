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
      // Transform only, never opacity: a lazily loaded <img> inside an
      // opacity:0 ancestor is treated as non-visible by Chrome and is never
      // fetched, and it does not re-evaluate once the element becomes visible.
      gsap.fromTo(
        ".gallery-item",
        { y: isMobile ? 24 : 48, scale: isMobile ? 1 : 0.97 },
        {
          scrollTrigger: { trigger: root.current, start: "top 80%" },
          y: 0,
          scale: 1,
          duration: isMobile ? 0.5 : 0.8,
          stagger: isMobile ? 0.04 : 0.08,
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
            className={`gallery-item group relative overflow-hidden rounded-xl bg-eg-coal ${
              index % 5 === 0 ? "col-span-2 row-span-2" : ""
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              // NOTE: eager on purpose. loading="lazy" did not fetch in the
              // target browser (a dark-mode extension interferes with the
              // visibility heuristic), which left the grid blank. Revisit
              // together with converting these JPGs to WebP.
              loading="eager"
              decoding="async"
              className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ aspectRatio: index % 5 === 0 ? "1 / 1" : "3 / 4" }}
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-eg-black/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </figure>
        ))}
      </div>
    </section>
  );
}
