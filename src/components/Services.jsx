import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";
import { SERVICES } from "../data/site";

export default function Services() {
  const root = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".service-card",
        { y: 40, opacity: 0 },
        {
          scrollTrigger: { trigger: root.current, start: "top 75%" },
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
        },
      );
    },
    { scope: root },
  );

  return (
    <section id="servicios" ref={root} className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <header className="mb-12 max-w-2xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-eg-red">
          Lo que hacemos
        </p>
        <h2 className="font-display text-[clamp(2rem,6vw,4rem)] uppercase leading-[0.95]">
          Un plan para cada objetivo
        </h2>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {SERVICES.map((service, index) => (
          <article
            key={service.id}
            data-reveal
            className="service-card group rounded-2xl border border-white/10 bg-eg-coal p-7 transition-colors hover:border-eg-red"
          >
            <span className="font-display text-sm text-eg-red">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 font-display text-2xl uppercase">{service.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              {service.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
