import { HiPlay } from "react-icons/hi2";
import useScrollReveal from "../../hooks/useScrollReveal";

const items = [
  { span: "row-span-2", type: "image", src: "/images/hero/photographer-1.png" },
  { span: "", type: "video", gradient: "from-[#2a2620] to-[#0a0a0a]" },
  { span: "", type: "video", gradient: "from-[#1f2530] to-[#0a0a0a]" },
  { span: "row-span-2", type: "image", src: "/images/hero/photographer-2.png" },
  { span: "", type: "video", gradient: "from-[#302020] to-[#0a0a0a]" },
  { span: "", type: "video", gradient: "from-[#233028] to-[#0a0a0a]" },
];

export default function Bastidores() {
  const ref = useScrollReveal();

  return (
    <section id="bastidores" ref={ref} className="relative py-28 lg:py-36">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
        <div className="mb-14" data-reveal="up">
          <p className="eyebrow mb-4">BASTIDORES</p>
          <h2 className="text-4xl md:text-6xl">Por Trás das Câmeras</h2>
        </div>

        <div
          className="grid grid-cols-2 md:grid-cols-3 auto-rows-[180px] md:auto-rows-[220px] gap-4"
          data-reveal="up"
          data-reveal-delay="0.1"
        >
          {items.map((item, i) => (
            <div
              key={i}
              className={`group relative rounded-xl overflow-hidden border border-white/[.08] ${item.span}`}
              data-cursor="PLAY"
            >
              {item.type === "image" ? (
                <img
                  src={item.src}
                  alt="Bastidores de produção"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div
                  className={`w-full h-full bg-gradient-to-br ${item.gradient} transition-transform duration-700 group-hover:scale-110`}
                />
              )}
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/45 transition-colors duration-500" />
              <span className="absolute inset-0 flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-400">
                <span className="w-11 h-11 rounded-full bg-[var(--color-gold)]/95 flex items-center justify-center text-[#060606]">
                  <HiPlay size={16} />
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
