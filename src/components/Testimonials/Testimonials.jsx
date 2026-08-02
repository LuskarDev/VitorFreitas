import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { HiStar } from "react-icons/hi2";
import { testimonials } from "../../data/content";
import useScrollReveal from "../../hooks/useScrollReveal";

export default function Testimonials() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="relative py-28 lg:py-36 bg-[#080808]">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
        <div className="mb-14" data-reveal="up">
          <p className="eyebrow mb-4">DEPOIMENTOS</p>
          <h2 className="text-4xl md:text-6xl">O Que Dizem</h2>
        </div>

        <div data-reveal="up" data-reveal-delay="0.1">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 5500, disableOnInteraction: false }}
            pagination={{ clickable: true, el: ".testi-pagination" }}
            slidesPerView={1}
            spaceBetween={28}
            breakpoints={{
              768: { slidesPerView: 2 },
              1200: { slidesPerView: 3 },
            }}
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.name}>
                <div className="h-full rounded-2xl border border-white/[.08] bg-white/[.03] backdrop-blur-md p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 text-[var(--color-gold)] mb-5">
                      {Array.from({ length: t.stars }).map((_, i) => (
                        <HiStar key={i} size={14} />
                      ))}
                    </div>
                    <p className="text-lg leading-relaxed text-white/90">
                      “{t.quote}”
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-8">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[var(--color-gold)]/60 to-transparent border border-[var(--color-gold)]/40 flex items-center justify-center font-display text-sm">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{t.name}</p>
                      <p className="text-xs text-[var(--color-text-secondary)]">
                        {t.role}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="testi-pagination flex justify-center gap-2 mt-10" />
        </div>
      </div>
    </section>
  );
}
