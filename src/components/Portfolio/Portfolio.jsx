import { useMemo, useState } from "react";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import { Link } from "react-router-dom";
import { HiPlay, HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { portfolioCategories, portfolioItems } from "../../data/content";
import useScrollReveal from "../../hooks/useScrollReveal";

const MotionLink = motion.create(Link);

const gradients = [
  "from-[#3a2f22] via-[#171310] to-[#0a0a0a]",
  "from-[#2b2b2b] via-[#151515] to-[#0a0a0a]",
  "from-[#233028] via-[#131a17] to-[#0a0a0a]",
  "from-[#302020] via-[#181212] to-[#0a0a0a]",
  "from-[#28221a] via-[#151210] to-[#0a0a0a]",
  "from-[#1f2530] via-[#12151a] to-[#0a0a0a]",
];

export default function Portfolio() {
  const [active, setActive] = useState("Todos");
  const ref = useScrollReveal([active]);

  const filtered = useMemo(
    () =>
      active === "Todos"
        ? portfolioItems
        : portfolioItems.filter((p) => p.category === active),
    [active]
  );

  return (
    <section id="portfolio" ref={ref} className="relative py-28 lg:py-36 bg-[#080808]">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
        <div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14"
          data-reveal="up"
        >
          <div>
            <p className="eyebrow mb-4">PORTFÓLIO</p>
            <h2 className="text-4xl md:text-6xl">Projetos em Destaque</h2>
          </div>

          <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
            {portfolioCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`relative text-xs tracking-[0.15em] uppercase pb-1 transition-colors ${
                  active === cat
                    ? "text-[var(--color-gold)]"
                    : "text-[var(--color-text-secondary)] hover:text-white"
                }`}
                data-cursor-hover
              >
                {cat}
                {active === cat && (
                  <motion.span
                    layoutId="portfolio-underline"
                    className="absolute left-0 -bottom-0.5 w-full h-px bg-[var(--color-gold)]"
                  />
                )}
              </button>
            ))}
            <div className="flex gap-2 ml-2">
              <button className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center hover:border-[var(--color-gold)] transition-colors" data-cursor-hover>
                <HiChevronLeft size={16} />
              </button>
              <button className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center hover:border-[var(--color-gold)] transition-colors" data-cursor-hover>
                <HiChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        <LayoutGroup>
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
                >
                <MotionLink
                  to={`/projeto/${item.slug}`}
                  className="group relative aspect-video rounded-xl overflow-hidden border border-white/[.08] block cursor-none"
                  data-cursor="OPEN"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${gradients[i % gradients.length]} transition-transform duration-700 group-hover:scale-110`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent backdrop-blur-0 group-hover:backdrop-blur-[1px] transition-all duration-500" />

                  <span className="absolute top-4 right-4 text-[10px] tracking-[0.2em] font-mono text-[var(--color-gold)] border border-[var(--color-gold)]/40 rounded-full px-2.5 py-1 bg-black/40">
                    {item.tag}
                  </span>

                  <span className="absolute inset-0 flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-400">
                    <span className="w-14 h-14 rounded-full bg-[var(--color-gold)]/95 flex items-center justify-center text-[#060606]">
                      <HiPlay size={20} />
                    </span>
                  </span>

                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-lg leading-tight">{item.title}</h3>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-text-secondary)] mt-1">
                      {item.category}
                    </p>
                  </div>
                </MotionLink>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
}
