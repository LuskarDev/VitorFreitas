import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { HiPlay, HiOutlineChevronDown } from "react-icons/hi2";
import { FiInstagram, FiLinkedin, FiYoutube } from "react-icons/fi";

const slides = [
  { src: "/images/hero/photographer-2.png", alt: "Vítor Freitas filmando com estabilizador" },
  { src: "/images/hero/photographer-1.png", alt: "Vítor Freitas em produção fotográfica" },
];

const SLIDE_DURATION = 6000;

export default function Hero() {
  const rootRef = useRef(null);
  const imgRef = useRef(null);
  const frameRef = useRef(null);
  const linesRef = useRef([]);
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);

  const goToSlide = useCallback((index) => {
    setActive(((index % slides.length) + slides.length) % slides.length);
  }, []);

  const restartAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
  }, []);

  useEffect(() => {
    restartAutoplay();
    return () => clearInterval(timerRef.current);
  }, [restartAutoplay]);

  const handleSelectSlide = (index) => {
    goToSlide(index);
    restartAutoplay();
  };

  const scrollToNext = () => {
    const el = document.querySelector("#servicos");
    if (el && window.lenis) {
      window.lenis.scrollTo(el, { offset: -80 });
    } else if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.set(frameRef.current, { autoAlpha: 1 })
        .from(frameRef.current, {
          scale: 1.15,
          filter: "blur(20px)",
          autoAlpha: 0,
          duration: 1.6,
          ease: "power3.out",
        })
        .from(
          linesRef.current,
          {
            yPercent: 110,
            duration: 1,
            stagger: 0.12,
            ease: "power4.out",
          },
          "-=1.1"
        )
        .from(
          ".hero-fade",
          { opacity: 0, y: 20, duration: 0.9, stagger: 0.1, ease: "power2.out" },
          "-=0.5"
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const el = imgRef.current;
    const handleMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 24;
      const y = (e.clientY / innerHeight - 0.5) * 24;
      gsap.to(el, { x, y, duration: 0.9, ease: "power2.out" });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const setLineRef = (el, i) => {
    linesRef.current[i] = el;
  };

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#060606] pt-32 pb-8"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#060606] via-[#060606]/70 to-[#060606]/20 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-transparent to-[#060606]/40 z-10" />
        <div
          ref={frameRef}
          className="absolute right-0 top-0 h-full w-full lg:w-[62%] invisible"
        >
          <div ref={imgRef} className="relative w-full h-full">
            {slides.map((slide, i) => (
              <img
                key={slide.src}
                src={slide.src}
                alt={slide.alt}
                className={`absolute inset-0 w-full h-full object-cover scale-110 transition-opacity duration-[1400ms] ease-in-out ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-20 max-w-[1600px] w-full mx-auto px-6 lg:px-10 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl">
          <p className="hero-fade eyebrow mb-5">FILMAGEM · FOTOGRAFIA · EDIÇÃO</p>

          <h1 className="text-[15vw] sm:text-[9vw] lg:text-[6.2vw] leading-[0.92] mb-6">
            {["HISTÓRIAS", "QUE MARCAM.", "IMAGENS QUE", "CONECTAM."].map(
              (line, i) => (
                <span key={line} className="reveal-mask">
                  <span
                    ref={(el) => setLineRef(el, i)}
                    className="inline-block"
                  >
                    {line}
                  </span>
                </span>
              )
            )}
          </h1>

          <p className="hero-fade text-[var(--color-text-secondary)] max-w-md mb-10 text-base leading-relaxed">
            Transformo ideias em filmes e imagens que geram conexão, desejo e
            resultados reais.
          </p>

          <div className="hero-fade flex flex-wrap items-center gap-5">
            <button
              className="group flex items-center gap-3 border border-white/20 rounded-full pl-6 pr-2 py-2 hover:border-[var(--color-gold)] transition-colors"
              data-cursor="PLAY"
            >
              <span className="text-xs tracking-[0.15em] uppercase">
                Ver Showreel
              </span>
              <span className="w-9 h-9 rounded-full bg-[var(--color-gold)] flex items-center justify-center text-[#060606] group-hover:scale-110 transition-transform">
                <HiPlay size={14} />
              </span>
            </button>

            <a
              href="#contato"
              className="btn-gold-outline rounded-full px-7 py-3.5 text-xs tracking-[0.15em] uppercase font-medium"
              data-cursor-hover
            >
              Vamos Conversar
            </a>
          </div>
        </div>
      </div>

      <div className="hero-fade relative z-20 max-w-[1600px] w-full mx-auto px-6 lg:px-10 flex items-center gap-5">
        <span className="text-xs tracking-[0.2em] text-[var(--color-text-secondary)] uppercase">
          Siga
        </span>
        <div className="flex gap-4 text-white/70">
          <a href="#" className="hover:text-[var(--color-gold)] transition-colors" data-cursor-hover><FiInstagram /></a>
          <a href="#" className="hover:text-[var(--color-gold)] transition-colors" data-cursor-hover><FiLinkedin /></a>
          <a href="#" className="hover:text-[var(--color-gold)] transition-colors" data-cursor-hover><FiYoutube /></a>
        </div>
      </div>

      <div className="hidden lg:flex flex-col items-center gap-4 absolute right-8 top-1/2 -translate-y-1/2 z-30">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            onClick={() => handleSelectSlide(i)}
            aria-label={`Ir para slide ${i + 1}`}
            className={`font-mono text-[11px] transition-colors ${
              i === active ? "text-[var(--color-gold)]" : "text-white/30 hover:text-white/60"
            }`}
            data-cursor-hover
          >
            {String(i + 1).padStart(2, "0")}
          </button>
        ))}
        <span className="w-px h-16 bg-white/15 mt-1" />
      </div>

      <button
        onClick={scrollToNext}
        aria-label="Rolar para a próxima seção"
        className="hero-fade hidden md:flex flex-col items-center gap-3 absolute left-1/2 bottom-8 -translate-x-1/2 z-20"
        data-cursor-hover
      >
        <span className="w-px h-10 bg-white/20" />
        <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[var(--color-text-secondary)] animate-bounce">
          <HiOutlineChevronDown size={14} />
        </span>
      </button>
    </section>
  );
}
