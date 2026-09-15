import { STATS, SCHEDULE } from "../data/site";

export default function Schedule() {
  return (
    <section id="horarios" className="bg-eg-coal py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-eg-red">
            Horarios
          </p>
          <h2 className="font-display text-[clamp(2rem,6vw,4rem)] uppercase leading-[0.95]">
            Abierto cuando podés entrenar
          </h2>

          <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-2">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-3xl text-eg-red">{stat.value}</dt>
                <dd className="mt-1 text-xs uppercase tracking-widest text-white/50">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <ul className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-eg-black/60">
          {SCHEDULE.map((slot) => (
            <li
              key={slot.day}
              className="flex items-center justify-between gap-4 px-6 py-4"
            >
              <span className="font-display text-base uppercase tracking-wide">
                {slot.day}
              </span>
              <span
                className={`text-sm font-semibold ${
                  slot.closed ? "text-white/35" : "text-eg-red"
                }`}
              >
                {slot.hours}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
