import { HiOutlineArrowUpRight } from "react-icons/hi2";
import useScrollReveal from "../../hooks/useScrollReveal";

export default function CTA() {
  const ref = useScrollReveal();

  return (
    <section
      ref={ref}
      className="relative py-36 lg:py-48 overflow-hidden border-y border-white/[.08]"
    >
      <div className="absolute inset-0">
        <img
          src="/images/hero/photographer-2.png"
          alt=""
          className="w-full h-full object-cover opacity-25 scale-105"
        />
        <div className="absolute inset-0 bg-[#060606]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-transparent to-[#060606]" />
      </div>

      <div
        className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-10 text-center"
        data-reveal="scale"
      >
        <h2 className="text-[13vw] sm:text-7xl lg:text-8xl leading-[0.95] mb-10">
          VAMOS CRIAR
          <br />
          <span className="text-[var(--color-gold)]">ALGO</span> EXTRAORDINÁRIO
        </h2>
        <a
          href="#contato"
          className="inline-flex items-center gap-3 bg-[var(--color-gold)] text-[#060606] rounded-full px-9 py-4 text-xs tracking-[0.15em] uppercase font-medium hover:bg-[var(--color-gold-hover)] transition-colors"
          data-cursor-hover
        >
          Iniciar Projeto <HiOutlineArrowUpRight />
        </a>
      </div>
    </section>
  );
}
