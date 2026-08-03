import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { AnimatePresence, motion } from "framer-motion";
import { HiStar, HiOutlineChatBubbleLeftRight, HiOutlineXMark, HiCheckCircle } from "react-icons/hi2";
import { testimonials } from "../../data/content";
import useScrollReveal from "../../hooks/useScrollReveal";
import FieldError from "../common/FieldError";
import StarRating from "../common/StarRating";

const initialReview = { nome: "", sobrenome: "", local: "", comentario: "" };

export default function Testimonials() {
  const ref = useScrollReveal();
  const [userReviews, setUserReviews] = useState([]);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("idle");
  const [values, setValues] = useState(initialReview);
  const [rating, setRating] = useState(0);
  const [focused, setFocused] = useState(null);
  const [errors, setErrors] = useState({});
  const [shakeFields, setShakeFields] = useState({});
  const fieldRefs = useRef({});

  const allTestimonials = [...userReviews, ...testimonials];

  const setValue = (name, val) => {
    setValues((v) => ({ ...v, [name]: val }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const validate = () => {
    const errs = {};
    if (!values.nome.trim()) errs.nome = "Preencha seu nome";
    if (!values.sobrenome.trim()) errs.sobrenome = "Preencha seu sobrenome";
    if (!values.local.trim()) errs.local = "Diga onde foi o trabalho";
    if (!rating) errs.rating = "Dê uma nota em estrelas";
    if (!values.comentario.trim()) errs.comentario = "Escreva seu comentário";
    return errs;
  };

  const triggerShake = (keys) => {
    setShakeFields(Object.fromEntries(keys.map((k) => [k, true])));
    setTimeout(() => setShakeFields({}), 500);
  };

  const closeModal = () => {
    setOpen(false);
    setStatus("idle");
    setValues(initialReview);
    setRating(0);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      triggerShake(Object.keys(errs));
      const firstKey = Object.keys(errs)[0];
      fieldRefs.current[firstKey]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    setErrors({});
    setStatus("loading");
    setTimeout(() => {
      setUserReviews((prev) => [
        {
          id: Date.now(),
          name: `${values.nome.trim()} ${values.sobrenome.trim()}`,
          role: values.local.trim(),
          quote: values.comentario.trim(),
          stars: rating,
        },
        ...prev,
      ]);
      setStatus("success");
      setTimeout(() => closeModal(), 1600);
    }, 900);
  };

  const inputBase =
    "w-full bg-transparent border-b outline-none py-2.5 text-sm transition-colors";
  const borderFor = (name) =>
    errors[name] ? "border-[#e2695f]" : "border-white/15 focus:border-[var(--color-gold)]";

  return (
    <section ref={ref} className="relative py-28 lg:py-36 bg-[#080808]">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
        <div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14"
          data-reveal="up"
        >
          <div>
            <p className="eyebrow mb-4">DEPOIMENTOS</p>
            <h2 className="text-4xl md:text-6xl">O Que Dizem</h2>
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="btn-gold-outline rounded-full px-6 py-3 text-xs tracking-[0.15em] uppercase font-medium flex items-center gap-2 w-fit"
            data-cursor-hover
          >
            <HiOutlineChatBubbleLeftRight size={16} />
            Deixe seu Comentário
          </button>
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
            {allTestimonials.map((t) => (
              <SwiperSlide key={t.id ?? t.name}>
                <div className="h-full rounded-2xl border border-white/[.08] bg-white/[.03] backdrop-blur-md p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 text-[var(--color-gold)] mb-5">
                      {Array.from({ length: t.stars }).map((_, i) => (
                        <HiStar key={i} size={14} />
                      ))}
                    </div>
                    <p className="text-lg leading-relaxed text-white/90">
                      "{t.quote}"
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

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
              className="relative w-full max-w-lg bg-[#101010] border border-white/[.1] rounded-2xl p-8 lg:p-10 max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              <button
                type="button"
                onClick={closeModal}
                className="absolute top-6 right-6 w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-gold)] hover:border-[var(--color-gold)] transition-colors"
                aria-label="Fechar"
                data-cursor-hover
              >
                <HiOutlineXMark size={16} />
              </button>

              <p className="eyebrow mb-3">AVALIAÇÃO</p>
              <h3 className="text-3xl md:text-4xl leading-[0.95] mb-8">
                Deixe seu
                <br />Comentário
              </h3>

              <form onSubmit={handleSubmit} noValidate className="space-y-7">
                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-7">
                  <div
                    ref={(el) => (fieldRefs.current.nome = el)}
                    className={`relative ${shakeFields.nome ? "animate-field-shake" : ""}`}
                  >
                    <label
                      className={`absolute left-0 transition-all duration-300 pointer-events-none z-10 ${
                        focused === "nome" || values.nome
                          ? "-top-3 text-[10px] tracking-[0.15em] uppercase text-[var(--color-gold)]"
                          : "top-2.5 text-sm text-[var(--color-text-secondary)]"
                      }`}
                    >
                      Nome
                    </label>
                    <input
                      type="text"
                      value={values.nome}
                      onChange={(e) => setValue("nome", e.target.value)}
                      onFocus={() => setFocused("nome")}
                      onBlur={() => setFocused(null)}
                      className={`${inputBase} ${borderFor("nome")}`}
                    />
                    <FieldError message={errors.nome} />
                  </div>

                  <div
                    ref={(el) => (fieldRefs.current.sobrenome = el)}
                    className={`relative ${shakeFields.sobrenome ? "animate-field-shake" : ""}`}
                  >
                    <label
                      className={`absolute left-0 transition-all duration-300 pointer-events-none z-10 ${
                        focused === "sobrenome" || values.sobrenome
                          ? "-top-3 text-[10px] tracking-[0.15em] uppercase text-[var(--color-gold)]"
                          : "top-2.5 text-sm text-[var(--color-text-secondary)]"
                      }`}
                    >
                      Sobrenome
                    </label>
                    <input
                      type="text"
                      value={values.sobrenome}
                      onChange={(e) => setValue("sobrenome", e.target.value)}
                      onFocus={() => setFocused("sobrenome")}
                      onBlur={() => setFocused(null)}
                      className={`${inputBase} ${borderFor("sobrenome")}`}
                    />
                    <FieldError message={errors.sobrenome} />
                  </div>
                </div>

                <div
                  ref={(el) => (fieldRefs.current.local = el)}
                  className={`relative ${shakeFields.local ? "animate-field-shake" : ""}`}
                >
                  <label
                    className={`absolute left-0 transition-all duration-300 pointer-events-none z-10 ${
                      focused === "local" || values.local
                        ? "-top-3 text-[10px] tracking-[0.15em] uppercase text-[var(--color-gold)]"
                        : "top-2.5 text-sm text-[var(--color-text-secondary)]"
                    }`}
                  >
                    Local do Trabalho
                  </label>
                  <input
                    type="text"
                    value={values.local}
                    onChange={(e) => setValue("local", e.target.value)}
                    onFocus={() => setFocused("local")}
                    onBlur={() => setFocused(null)}
                    placeholder=""
                    className={`${inputBase} ${borderFor("local")}`}
                  />
                  <FieldError message={errors.local} />
                </div>

                <div
                  ref={(el) => (fieldRefs.current.rating = el)}
                  className={`relative ${shakeFields.rating ? "animate-field-shake" : ""}`}
                >
                  <p className="text-[10px] tracking-[0.15em] uppercase text-[var(--color-text-secondary)] mb-3">
                    Sua Nota
                  </p>
                  <StarRating
                    value={rating}
                    onChange={(n) => {
                      setRating(n);
                      if (errors.rating) setErrors((e) => ({ ...e, rating: undefined }));
                    }}
                  />
                  <FieldError message={errors.rating} />
                </div>

                <div
                  ref={(el) => (fieldRefs.current.comentario = el)}
                  className={`relative ${shakeFields.comentario ? "animate-field-shake" : ""}`}
                >
                  <label
                    className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                      focused === "comentario" || values.comentario
                        ? "-top-3 text-[10px] tracking-[0.15em] uppercase text-[var(--color-gold)]"
                        : "top-2.5 text-sm text-[var(--color-text-secondary)]"
                    }`}
                  >
                    Comentário
                  </label>
                  <textarea
                    rows={3}
                    value={values.comentario}
                    onChange={(e) => setValue("comentario", e.target.value)}
                    onFocus={() => setFocused("comentario")}
                    onBlur={() => setFocused(null)}
                    className={`w-full bg-transparent border-b outline-none py-2.5 text-sm transition-colors resize-none ${borderFor("comentario")}`}
                  />
                  <FieldError message={errors.comentario} />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-gold-outline rounded-full px-8 py-3.5 text-xs tracking-[0.15em] uppercase font-medium w-full disabled:opacity-60"
                  data-cursor-hover
                >
                  {status === "loading" ? "Enviando..." : "Publicar Comentário"}
                </button>

                <AnimatePresence>
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="flex items-center justify-center gap-2 text-sm text-[var(--color-gold)]"
                    >
                      <HiCheckCircle />
                      Obrigado pela sua avaliação!
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
