import { clients } from "../../data/content";
import useScrollReveal from "../../hooks/useScrollReveal";

export default function Clients() {
  const ref = useScrollReveal();
  const loop = [...clients, ...clients];

  return (
    <section id="clientes" ref={ref} className="relative py-24 border-y border-white/[.08]">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 mb-10" data-reveal="up">
        <p className="eyebrow mb-2">CLIENTES</p>
        <h2 className="text-3xl md:text-4xl">Marcas que Confiam</h2>
      </div>

      <div className="relative overflow-hidden no-scrollbar">
        <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#060606] to-transparent z-10" />
        <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#060606] to-transparent z-10" />

        <div className="flex w-max animate-[marquee_28s_linear_infinite] hover:[animation-play-state:paused]">
          {loop.map((c, i) => (
            <div
              key={c + i}
              className="flex items-center justify-center px-12 shrink-0"
            >
              <span className="text-2xl md:text-3xl font-medium tracking-wide text-white/35 hover:text-white transition-colors duration-300 whitespace-nowrap">
                {c}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
