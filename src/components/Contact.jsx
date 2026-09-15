import { GYM } from "../data/site";
import { CONTACT_IMAGE } from "../data/gallery";

export default function Contact() {
  // min-h gives the backdrop room to read as a scene. Without it the band is
  // short enough that the photograph becomes a thin, heavily magnified slice.
  return (
    <section
      id="contacto"
      className="relative flex min-h-[70vh] items-center overflow-hidden py-20 sm:py-28"
    >
      <img
        src={CONTACT_IMAGE.src}
        srcSet={CONTACT_IMAGE.srcSet}
        sizes="100vw"
        decoding="async"
        alt={CONTACT_IMAGE.alt}
        className="absolute inset-0 size-full object-cover object-center"
      />
      {/*
        One veil, not a stack. Darkening the photograph itself and then layering
        two more washes over it left roughly 8% of the image visible; here the
        photograph runs at full strength and a single gradient does the work,
        fading to solid black at the edges so the section still joins the ones
        around it.
      */}
      <div className="absolute inset-0 bg-gradient-to-b from-eg-black via-eg-black/60 to-eg-black" />
      <div className="absolute -left-32 top-0 size-96 rounded-full bg-eg-red/20 blur-[60px] sm:blur-[120px]" />

      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-eg-red">
          No lo pienses más
        </p>
        <h2 className="font-display text-[clamp(2.25rem,8vw,5rem)] uppercase leading-[0.9]">
          Tu primer día <span className="text-eg-red">empieza hoy</span>
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-white/60">
          Escribinos y coordinamos tu clase de prueba. Te mostramos el lugar, te
          armamos el plan y arrancás.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={`https://wa.me/${GYM.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="w-full rounded-full bg-eg-red px-8 py-4 text-sm font-bold uppercase tracking-widest transition-transform hover:scale-105 sm:w-auto"
          >
            Escribinos por WhatsApp
          </a>
          <a
            href={GYM.instagram}
            target="_blank"
            rel="noreferrer"
            className="w-full rounded-full border border-white/25 px-8 py-4 text-sm font-bold uppercase tracking-widest transition-colors hover:bg-white hover:text-eg-black sm:w-auto"
          >
            {GYM.instagramHandle}
          </a>
        </div>
      </div>
    </section>
  );
}
