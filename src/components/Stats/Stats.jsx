import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiSparkles, HiOutlineFilm, HiOutlineUserGroup, HiOutlineGlobeAlt } from "react-icons/hi2";
import { stats } from "../../data/content";

gsap.registerPlugin(ScrollTrigger);

const icons = [HiSparkles, HiOutlineFilm, HiOutlineUserGroup];

export default function Stats() {
  const rootRef = useRef(null);
  const numberRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      numberRefs.current.forEach((el, i) => {
        const counter = { val: 0 };
        gsap.to(counter, {
          val: stats[i].value,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true,
          },
          onUpdate: () => {
            if (el) el.textContent = Math.floor(counter.val);
          },
        });
      });

      gsap.from(".stat-card", {
        opacity: 0,
        y: 30,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 85%",
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative z-20 -mt-px border-y border-white/[.08] bg-[#060606]"
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[.08]">
        {stats.map((s, i) => {
          const Icon = icons[i];
          return (
            <div
              key={s.label}
              className="stat-card flex items-center gap-4 py-10 px-4 md:px-8"
            >
              <Icon className="text-[var(--color-gold)] shrink-0" size={28} />
              <div>
                <div className="font-nums text-3xl md:text-4xl font-medium">
                  <span ref={(el) => (numberRefs.current[i] = el)}>0</span>
                  {s.suffix}
                </div>
                <div className="text-[11px] uppercase tracking-[0.1em] text-[var(--color-text-secondary)] whitespace-pre-line leading-tight mt-1">
                  {s.label}
                </div>
              </div>
            </div>
          );
        })}
        <div className="stat-card flex items-center gap-4 py-10 px-4 md:px-8">
          <HiOutlineGlobeAlt className="text-[var(--color-gold)] shrink-0" size={28} />
          <div>
            <div className="font-nums text-lg md:text-xl font-medium uppercase">
              Rio de Janeiro
            </div>
            <div className="text-[11px] uppercase tracking-[0.1em] text-[var(--color-text-secondary)] leading-tight mt-1">
              Atendimento em todo
              <br />o Brasil e exterior
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
