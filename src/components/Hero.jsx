import { useRef } from "react";
import ReactPlayer from "react-player";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { GYM } from "../data/site";
import { HERO_IMAGE } from "../data/gallery";

// Drop a looping clip at /public/hero.mp4 (or paste any video URL) and the
// hero swaps the gradient backdrop for footage automatically.
const HERO_VIDEO = "";

export default function Hero() {
  const root = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".hero-line span",
        { yPercent: 120 },
        { yPercent: 0, duration: 1.1, stagger: 0.12 },
      )
        .fromTo(
          ".hero-kicker",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.7",
        )
        .fromTo(
          ".hero-copy",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.45",
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
          "-=0.4",
        )
        .fromTo(
          ".hero-scroll",
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.2",
        );

      gsap.to(".hero-glow", {
        scale: 1.15,
        opacity: 0.55,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: root },
  );

  return (
    <section
      id="inicio"
      ref={root}
      className="relative flex h-[100dvh] w-full flex-col justify-center overflow-hidden sm:justify-end"
    >
      {HERO_VIDEO ? (
        <div className="absolute inset-0">
          <ReactPlayer
            src={HERO_VIDEO}
            playing
            loop
            muted
            playsInline
            width="100%"
            height="100%"
            style={{ objectFit: "cover" }}
          />
        </div>
      ) : (
        <img
          src={HERO_IMAGE.src}
          alt={HERO_IMAGE.alt}
          className="absolute inset-0 size-full object-cover object-[65%_center]"
        />
      )}

      <div className="hero-glow absolute -right-24 top-1/4 size-[28rem] rounded-full bg-eg-red/40 blur-[120px]" />

      {/*
        Scrim. Three stacked layers rather than one flat veil: an even wash so
        no part of the photo competes with white type, a bottom-up ramp under
        the headline and buttons, and a left-side ramp so the first words never
        land on a bright subject. Tuned to keep the headline above the 4.5:1
        contrast ratio wherever it sits.
      */}
      <div className="absolute inset-0 bg-eg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-eg-black via-eg-black/80 to-eg-black/35" />
      <div className="absolute inset-0 bg-gradient-to-r from-eg-black/85 via-eg-black/40 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:pb-24 sm:pt-0">
        <p className="hero-kicker mb-4 text-xs font-bold uppercase tracking-[0.4em] text-eg-red">
          {GYM.city} &middot; {GYM.tagline}
        </p>

        <h1 className="font-display text-[clamp(2.75rem,11vw,9rem)] uppercase leading-[0.86]">
          <span className="hero-line block overflow-hidden">
            <span className="block">Entrena</span>
          </span>
          <span className="hero-line block overflow-hidden">
            <span className="block text-eg-red">en serio.</span>
          </span>
          <span className="hero-line block overflow-hidden">
            <span className="text-stroke block">Sin excusas.</span>
          </span>
        </h1>

        <p className="hero-copy mt-6 max-w-md text-base leading-relaxed text-white/70 sm:text-lg">
          Entrenamiento personalizado y seguimiento real en el corazón de{" "}
          {GYM.city}. Vos ponés la constancia, nosotros el plan.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={`https://wa.me/${GYM.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="hero-cta rounded-full bg-eg-red px-8 py-4 text-center text-sm font-bold uppercase tracking-widest transition-transform hover:scale-105"
          >
            Reservá tu clase de prueba
          </a>
          <a
            href="#horarios"
            className="hero-cta rounded-full border border-white/25 px-8 py-4 text-center text-sm font-bold uppercase tracking-widest transition-colors hover:bg-white hover:text-eg-black"
          >
            Ver horarios
          </a>
        </div>
      </div>

      <span className="hero-scroll absolute bottom-5 right-5 hidden text-[10px] font-bold uppercase tracking-[0.35em] text-white/40 sm:block">
        Scroll
      </span>
    </section>
  );
}
