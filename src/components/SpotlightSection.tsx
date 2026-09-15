import { useState } from "react";
import SpotlightReveal from "./SpotlightReveal";
import { useBreakpoint, usePrefersReducedMotion } from "../hooks/useBreakpoint";
import { GYM } from "../data/site";
import { SPOTLIGHT_IMAGE } from "../data/gallery";

// Swap REVEAL_VIDEO for a real clip once the gym provides footage; until then
// the spotlight reveals a second photograph.
const REVEAL_VIDEO = "";

const RED = "#e10600";

function PulseChart() {
  return (
    <svg
      style={{ width: 160, height: 80 }}
      viewBox="0 0 289 138"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g filter="url(#eg-chart-glow)">
        <path
          d="m22.5 48.7306c17.2833 0 26.84 6.2094 40.6667 20.5659 13.8266 14.3565 23.3833 41.2035 40.6663 41.2035 17.284 0 26.84-26.2124 40.667-51.2144 13.827-25.0019 23.383-39.7283 40.667-39.7283 17.283 0 23.383 38.11 40.666 38.11 17.284 0 23.384-38.1673 40.667-38.1673"
          stroke={RED}
          strokeWidth="2"
        />
      </g>
      <defs>
        <filter
          id="eg-chart-glow"
          x="0"
          y="0"
          width="289"
          height="138"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="11.25" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.882353 0 0 0 0 0.023529 0 0 0 0 0 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default function SpotlightSection() {
  const tier = useBreakpoint();
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = tier === "mobile";
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Availability of a pointer decides whether the effect exists at all: a
  // phone has none, so it would burn an animation frame loop and a full-screen
  // SVG filter to show a circle the visitor can never move.
  //
  // Reduced motion is a separate question. The spotlight follows the visitor's
  // own pointer, which is not autonomous movement, so it stays — only the
  // eased trail behind it goes.
  const interactive = !isMobile;

  // A radius near the viewport width reveals everything at once and the
  // darkened layer stops reading. Keep the lit area clearly smaller.
  const radius = tier === "tablet" ? 280 : 360;

  return (
    <section
      className="relative z-10 flex h-[100dvh] w-full flex-col justify-center overflow-hidden bg-black px-5 text-white lg:block lg:px-0"
      style={{ boxShadow: "0 -20px 50px rgba(0,0,0,0.5)" }}
    >
      <SpotlightReveal
        imageSrc={SPOTLIGHT_IMAGE.src}
        videoSrc={REVEAL_VIDEO}
        interactive={interactive}
        smooth={!reducedMotion}
        isPlaying={isVideoPlaying}
        baseRadius={radius}
      />

      {/* Hover zones exist only where there is something to hover. */}
      {!interactive ? null : (
        <>
          <div
            className="absolute right-[calc(8%+100px)] bottom-[12%] w-[calc(50%-50px)] h-[calc(50%+230px)] z-30"
            onMouseEnter={() => setIsVideoPlaying(true)}
            onMouseLeave={() => setIsVideoPlaying(false)}
          />
          <div
            className="absolute left-[calc(8%+200px)] top-[calc(20%+190px)] w-[calc(15%+250px)] h-[calc(22.5%+130px)] -translate-y-full z-30"
            onMouseEnter={() => setIsVideoPlaying(true)}
            onMouseLeave={() => setIsVideoPlaying(false)}
          />
        </>
      )}

      {/* Stats card */}
      <div
        className="z-20 w-full max-w-[320px] px-6 py-5 rounded-sm sm:px-8 sm:py-6 lg:absolute lg:left-[calc(8%+200px)] lg:top-[20%] lg:w-[320px]"
        style={{
          // backdrop-filter forces the compositor to re-sample everything
          // behind the card. On a phone that is a full-screen photograph, so
          // fall back to a plain translucent panel there.
          background: isMobile ? "rgba(10, 10, 10, 0.72)" : "rgba(0, 0, 0, 0.16)",
          backdropFilter: isMobile ? undefined : "blur(80px)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="font-serif italic tracking-tight text-[48px] leading-[56px] sm:text-[72px] sm:leading-[80px]"
            style={{ color: RED }}
          >
            15h
          </span>
          <span className="w-[11px]">
            <PulseChart />
          </span>
        </div>
        <h3 className="font-serif uppercase text-white text-[15px] tracking-[0.02em] leading-tight mb-2">
          Entrenamiento personalizado
        </h3>
        <p className="font-serif text-white/60 text-[13px]">
          Plan, técnica y seguimiento uno a uno
        </p>
      </div>

      {/* Headline */}
      <h2 className="z-20 mt-8 max-w-full text-[26px] sm:text-[32px] md:text-[40px] lg:absolute lg:left-[8%] lg:bottom-[12%] lg:max-w-[500px] lg:text-[44px] leading-[1.05] tracking-tight flex flex-col">
        <span className="font-sans font-medium">Un entrenamiento</span>
        <span className="font-sans font-medium">que se adapta a vos</span>
        <span className="font-serif font-normal pt-1">
          <span className="not-italic">No a una rutina </span>
          <span className="italic">genérica</span>
        </span>
        <span className="font-serif italic font-normal">bajada de internet</span>
      </h2>

      {/* CTA block */}
      <a
        href={`https://wa.me/${GYM.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        className="z-20 mt-8 flex flex-col items-center self-start lg:absolute lg:right-[calc(8%+100px)] lg:bottom-[12%] lg:mt-0"
      >
        <span className="w-[140px] lg:w-[180px] bg-white py-[6px] text-center text-black font-serif text-[10px] uppercase font-bold tracking-[0.08em] leading-[16px]">
          El gimnasio de {GYM.city}
        </span>
        <span
          className="grid w-[140px] h-[80px] lg:w-[180px] lg:h-[100px] place-items-center"
          style={{ background: RED }}
        >
          <span className="font-display text-3xl lg:text-4xl leading-none text-white">
            EG
          </span>
        </span>
      </a>
    </section>
  );
}
