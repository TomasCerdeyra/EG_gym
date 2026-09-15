import { useEffect, useState } from "react";
import Logo from "./Logo";
import { GYM } from "../data/site";

const LINKS = [
  { href: "#servicios", label: "Servicios" },
  { href: "#galeria", label: "El lugar" },
  { href: "#horarios", label: "Horarios" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the panel covers the screen the page behind it must not scroll,
  // otherwise the menu floats over content sliding underneath it.
  useEffect(() => {
    if (!open) return;

    const { body } = document;
    const scrollY = window.scrollY;
    const previous = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
    };

    // position:fixed rather than overflow:hidden, because iOS Safari keeps
    // scrolling the document with overflow alone.
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.width = previous.width;
      body.style.overflow = previous.overflow;
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "bg-eg-black/95 backdrop-blur" : "bg-transparent"
      }`}
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <nav className="relative z-50 mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#inicio" aria-label={`${GYM.name} inicio`} onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-semibold uppercase tracking-widest text-white/70 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={`https://wa.me/${GYM.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-eg-red px-5 py-2 text-sm font-bold uppercase tracking-widest transition-transform hover:scale-105"
            >
              Sumate
            </a>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Cerrar menu" : "Abrir menu"}
          className="flex size-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-white transition-transform duration-300 ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-white transition-opacity duration-300 ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-white transition-transform duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </nav>
      </header>

      {/*
        Sibling of <header>, never a child: the header carries backdrop-blur,
        and a backdrop-filter makes an element the containing block for its
        fixed descendants. Nested here, inset-0 resolved against the 112px-tall
        header instead of the viewport and the panel covered almost nothing.
      */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 z-40 flex flex-col justify-center bg-eg-black px-6 md:hidden"
        style={{
          paddingTop: "calc(5rem + env(safe-area-inset-top, 0px))",
          paddingBottom: "calc(2rem + env(safe-area-inset-bottom, 0px))",
        }}
      >
        <ul className="flex flex-col gap-2">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 font-display text-3xl uppercase leading-none"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={`https://wa.me/${GYM.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          onClick={() => setOpen(false)}
          className="mt-10 block rounded-full bg-eg-red py-4 text-center text-sm font-bold uppercase tracking-widest"
        >
          Sumate hoy
        </a>

        <p className="mt-6 text-xs uppercase tracking-[0.3em] text-white/40">
          {GYM.city} &middot; {GYM.instagramHandle}
        </p>
      </div>
    </>
  );
}
