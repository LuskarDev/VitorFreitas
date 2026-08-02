import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { services } from "../../data/content";
import useScrollReveal from "../../hooks/useScrollReveal";

const gradients = [
  "from-[#3a2f22] to-[#0a0a0a]",
  "from-[#2a2a2a] to-[#0a0a0a]",
  "from-[#3d3428] to-[#0a0a0a]",
  "from-[#26241f] to-[#0a0a0a]",
  "from-[#302a20] to-[#0a0a0a]",
];

export default function Services() {
  const ref = useScrollReveal();

  return (
    <section id="servicos" ref={ref} className="relative py-28 lg:py-36">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
        <div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
          data-reveal="up"
        >
          <div>
            <p className="eyebrow mb-4">O QUE EU FAÇO</p>
            <h2 className="text-4xl md:text-6xl">Soluções Visuais</h2>
          </div>
          <a
            href="#portfolio"
            className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-[var(--color-text-secondary)] hover:text-[var(--color-gold)] transition-colors"
            data-cursor-hover
          >
            Ver todos os serviços <HiOutlineArrowUpRight />
          </a>
        </div>
      </div>

      <div className="pl-6 lg:pl-10" data-reveal="up" data-reveal-delay="0.1">
        <Swiper
          modules={[FreeMode]}
          freeMode
          slidesPerView={1.15}
          spaceBetween={20}
          breakpoints={{
            640: { slidesPerView: 2.2, spaceBetween: 24 },
            1024: { slidesPerView: 3.3, spaceBetween: 28 },
            1440: { slidesPerView: 4.3, spaceBetween: 28 },
          }}
          className="!pr-6 lg:!pr-10"
        >
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <SwiperSlide key={s.id}>
                <div
                  className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/[.08] hover:border-[var(--color-gold)]/60 transition-colors duration-500"
                  data-cursor="VIEW"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${gradients[i % gradients.length]} transition-transform duration-700 group-hover:scale-110`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/10 opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

                  <div className="relative z-10 h-full flex flex-col justify-between p-7">
                    <Icon className="text-[var(--color-gold)]" size={34} strokeWidth={1} />
                    <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                      <h3 className="text-2xl mb-2 leading-tight">{s.title}</h3>
                      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-[85%] opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-20 transition-all duration-500 overflow-hidden">
                        {s.desc}
                      </p>
                      <div className="flex items-center gap-2 mt-4 text-xs tracking-[0.15em] uppercase text-[var(--color-gold)]">
                        Saiba mais <HiOutlineArrowUpRight />
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
