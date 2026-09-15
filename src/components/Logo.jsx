export default function Logo({ className = "" }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="grid size-9 place-items-center rounded-full bg-eg-red font-display text-sm leading-none text-white">
        EG
      </span>
      <span className="font-display text-sm tracking-[0.3em] uppercase">
        Gimnasio
      </span>
    </span>
  );
}
