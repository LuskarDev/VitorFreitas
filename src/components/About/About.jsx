import { useEffect, useRef } from "react";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { process } from "../../data/content";
import useScrollReveal from "../../hooks/useScrollReveal";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const ref = useScrollReveal();
  const imgWrapRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgWrapRef.current,
        { scale: 1.1 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: imgWrapRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          transformOrigin: "left",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 75%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="sobre" ref={ref} className="relative py-28 lg:py-36">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-14 items-center mb-28">
        <div
          ref={imgWrapRef}
          className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/[.08]"
          data-reveal="left"
        >
          <img
            src="/images/hero/photographer-1.png"
            alt="Vítor Freitas em produção"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>

        <div data-reveal="right">
          <p className="eyebrow mb-4">SOBRE</p>
          <h2 className="text-4xl md:text-6xl leading-[0.95] mb-6">
            Mais que Filmar,
            <br />é Sobre Conexão.
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-lg leading-relaxed mb-8">
            Acredito que cada história merece ser contada com verdade,
            sensibilidade e propósito. Há mais de seis anos transformo
            briefings em narrativas visuais que criam vínculo real entre
            marcas e pessoas — do conceito à entrega final.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-[var(--color-gold)] border-b border-[var(--color-gold)]/40 pb-1 hover:border-[var(--color-gold)] transition-colors"
            data-cursor-hover
          >
            Conheça minha história <HiOutlineArrowUpRight />
          </a>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
        <div className="mb-14" data-reveal="up">
          <p className="eyebrow mb-4">PROCESSO</p>
          <h2 className="text-4xl md:text-6xl">Como Trabalho</h2>
        </div>

        <div className="relative grid md:grid-cols-4 gap-10">
          <div
            ref={lineRef}
            className="hidden md:block absolute top-3 left-0 w-full h-px bg-[var(--color-gold)]/60 origin-left"
            style={{ transform: "scaleX(0)" }}
          />
          {process.map((step, i) => (
            <div
              key={step.n}
              data-reveal="up"
              data-reveal-delay={i * 0.1}
              className="relative"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="w-6 h-6 rounded-full bg-[var(--color-gold)] shrink-0" />
                <span className="font-nums text-sm text-[var(--color-gold)]">
                  {step.n}
                </span>
              </div>
              <h3 className="text-2xl mb-2">{step.title}</h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
