import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import gsap from "gsap";
import {
  HiArrowLeft,
  HiOutlineArrowUpRight,
  HiPlay,
  HiStar,
} from "react-icons/hi2";
import { getProjectBySlug, getRelatedProjects } from "../data/projects";
import useScrollReveal from "../hooks/useScrollReveal";

const gradients = [
  "from-[#3a2f22] via-[#171310] to-[#0a0a0a]",
  "from-[#2b2b2b] via-[#151515] to-[#0a0a0a]",
  "from-[#233028] via-[#131a17] to-[#0a0a0a]",
  "from-[#302020] via-[#181212] to-[#0a0a0a]",
  "from-[#28221a] via-[#151210] to-[#0a0a0a]",
  "from-[#1f2530] via-[#12151a] to-[#0a0a0a]",
];

export default function ProjectPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  const ref = useScrollReveal([slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.lenis) window.lenis.scrollTo(0, { immediate: true });
    gsap.fromTo(
      ".project-hero-cover",
      { scale: 1.12, autoAlpha: 0 },
      { scale: 1, autoAlpha: 1, duration: 1.3, ease: "power3.out" }
    );
  }, [slug]);

  if (!project) return <Navigate to="/" replace />;

  const related = getRelatedProjects(slug, 3);

  return (
    <div ref={ref} className="pt-28">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[480px] w-full overflow-hidden">
        <div className="project-hero-cover absolute inset-0 invisible">
          <img
            src={project.cover}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-[#060606]/50 to-[#060606]/10" />

        <div className="relative z-10 h-full max-w-[1600px] mx-auto px-6 lg:px-10 flex flex-col justify-end pb-14">
          <Link
            to="/#portfolio"
            className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-[var(--color-text-secondary)] hover:text-[var(--color-gold)] transition-colors mb-8 w-fit"
            data-cursor-hover
          >
            <HiArrowLeft /> Voltar ao portfólio
          </Link>
          <span className="eyebrow mb-4">{project.tag}</span>
          <h1 className="text-5xl md:text-7xl leading-[0.95] max-w-3xl">
            {project.title}
          </h1>
        </div>
      </section>

      {/* Meta bar */}
      <section className="border-y border-white/[.08]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[.08]">
          {[
            { label: "Cliente", value: project.client },
            { label: "Ano", value: project.year },
            { label: "Categoria", value: project.category },
            { label: "Serviços", value: project.services?.join(", ") },
          ].map((m) => (
            <div key={m.label} className="py-8 px-4 md:px-8">
              <p className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-text-secondary)] mb-2">
                {m.label}
              </p>
              <p className="text-sm md:text-base">{m.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Problema / Solução / Resultado */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 grid md:grid-cols-3 gap-12">
          {[
            { n: "01", title: "Problema", text: project.problem },
            { n: "02", title: "Solução", text: project.solution },
            { n: "03", title: "Resultado", text: project.result },
          ].map((b) => (
            <div key={b.n} data-reveal="up" data-reveal-delay={b.n * 0.05}>
              <span className="font-nums text-sm text-[var(--color-gold)] block mb-4">
                {b.n}
              </span>
              <h3 className="text-2xl mb-3">{b.title}</h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                {b.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Vídeo principal do projeto */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
          <div
            className="relative aspect-video rounded-2xl overflow-hidden border border-white/[.08] group"
            data-reveal="scale"
            data-cursor="PLAY"
          >
            <img
              src={project.cover}
              alt={`Vídeo do projeto ${project.title}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition-colors duration-500" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-16 h-16 rounded-full bg-[var(--color-gold)]/95 flex items-center justify-center text-[#060606] group-hover:scale-110 transition-transform">
                <HiPlay size={22} />
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* Galeria */}
      <section className="pb-24 lg:pb-32 bg-[#080808]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 pt-24">
          <div className="mb-12" data-reveal="up">
            <p className="eyebrow mb-4">GALERIA</p>
            <h2 className="text-4xl md:text-5xl">Fotos do Projeto</h2>
          </div>
          <div
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
            data-reveal="up"
            data-reveal-delay="0.1"
          >
            {Array.from({ length: project.galleryCount || 6 }).map((_, i) => (
              <div
                key={i}
                className={`relative rounded-xl overflow-hidden border border-white/[.08] aspect-square bg-gradient-to-br ${
                  gradients[i % gradients.length]
                } hover:scale-[1.03] transition-transform duration-500`}
                data-cursor="VIEW"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Making Of */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-14 items-center">
          <div data-reveal="left">
            <p className="eyebrow mb-4">MAKING OF</p>
            <h2 className="text-4xl md:text-5xl leading-[0.95] mb-6">
              Bastidores da
              <br />
              Produção
            </h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed max-w-md">
              Cada projeto nasce de um planejamento detalhado — do moodboard à
              logística de equipe e equipamento. Estes registros mostram o
              processo por trás do resultado final.
            </p>
          </div>
          <div
            className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/[.08]"
            data-reveal="right"
            data-cursor="PLAY"
          >
            <img
              src={
                project.cover.includes("photographer-1")
                  ? "/images/hero/photographer-2.png"
                  : "/images/hero/photographer-1.png"
              }
              alt="Bastidores da produção"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-14 h-14 rounded-full bg-[var(--color-gold)]/95 flex items-center justify-center text-[#060606]">
                <HiPlay size={18} />
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* Depoimento */}
      {project.testimonial && (
        <section className="py-24 lg:py-32 border-y border-white/[.08]">
          <div
            className="max-w-3xl mx-auto px-6 text-center"
            data-reveal="scale"
          >
            <div className="flex justify-center gap-1 text-[var(--color-gold)] mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <HiStar key={i} size={16} />
              ))}
            </div>
            <p className="text-2xl md:text-3xl leading-snug mb-8">
              “{project.testimonial.quote}”
            </p>
            <p className="text-sm font-medium">{project.testimonial.name}</p>
            <p className="text-xs text-[var(--color-text-secondary)]">
              {project.testimonial.role}
            </p>
          </div>
        </section>
      )}

      {/* Projetos relacionados */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-12" data-reveal="up">
            <div>
              <p className="eyebrow mb-4">CONTINUE EXPLORANDO</p>
              <h2 className="text-4xl md:text-5xl">Projetos Relacionados</h2>
            </div>
            <Link
              to="/#portfolio"
              className="hidden sm:flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-[var(--color-text-secondary)] hover:text-[var(--color-gold)] transition-colors"
              data-cursor-hover
            >
              Ver todos <HiOutlineArrowUpRight />
            </Link>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            data-reveal="up"
            data-reveal-delay="0.1"
          >
            {related.map((item, i) => (
              <Link
                to={`/projeto/${item.slug}`}
                key={item.id}
                className="group relative aspect-video rounded-xl overflow-hidden border border-white/[.08] block"
                data-cursor="OPEN"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${
                    gradients[i % gradients.length]
                  } transition-transform duration-700 group-hover:scale-110`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-lg leading-tight">{item.title}</h3>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-text-secondary)] mt-1">
                    {item.category}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
