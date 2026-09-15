import Logo from "./Logo";
import { GYM } from "../data/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <Logo />
        <p className="text-xs uppercase tracking-widest text-white/40">
          {GYM.city} &middot; {new Date().getFullYear()}
        </p>
        <a
          href={GYM.instagram}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-semibold uppercase tracking-widest text-white/60 hover:text-white"
        >
          {GYM.instagramHandle}
        </a>
      </div>
    </footer>
  );
}
