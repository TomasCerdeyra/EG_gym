const WORDS = ["Fuerza", "Disciplina", "Constancia", "Energía", "Resultados"];

export default function Marquee() {
  return (
    <div className="border-y border-white/10 bg-eg-red py-4 overflow-hidden [contain:content]">
      <div className="flex w-max gap-10 pr-10 animate-[marquee_40s_linear_infinite] sm:animate-[marquee_28s_linear_infinite] motion-reduce:animate-none">
        {Array.from({ length: 4 }).map((_, group) => (
          <ul key={group} className="flex shrink-0 gap-10" aria-hidden={group > 0}>
            {WORDS.map((word) => (
              <li
                key={word}
                className="font-display text-xl uppercase tracking-widest sm:text-2xl"
              >
                {word} <span className="text-eg-black">/</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
