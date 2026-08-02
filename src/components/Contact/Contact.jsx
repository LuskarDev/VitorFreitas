import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlineClipboardDocument,
  HiOutlineBuildingOffice2,
  HiOutlineNewspaper,
  HiOutlineSparkles,
  HiOutlineChevronDown,
  HiCheckCircle,
} from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";
import { PiCoatHangerLight } from "react-icons/pi";
import { LuCamera } from "react-icons/lu";
import useScrollReveal from "../../hooks/useScrollReveal";

const fields = [
  { name: "nome", label: "Nome", type: "text", half: true },
  { name: "email", label: "E-mail", type: "email", half: true },
  { name: "whatsapp", label: "WhatsApp", type: "text", half: true },
  {
    name: "tipo",
    label: "Tipo de Projeto",
    type: "iconselect",
    half: true,
    options: [
      { label: "Moda", icon: PiCoatHangerLight },
      { label: "Institucional", icon: HiOutlineBuildingOffice2 },
      { label: "Evento", icon: LuCamera },
      { label: "Editorial", icon: HiOutlineNewspaper },
      { label: "Outro", icon: HiOutlineSparkles },
    ],
  },
  {
    name: "endereco",
    label: "Endereço do Local do Trabalho",
    type: "text",
    half: false,
  },
];

export default function Contact() {
  const ref = useScrollReveal();
  const [status, setStatus] = useState("idle");
  const [focused, setFocused] = useState(null);
  const [copied, setCopied] = useState(false);
  const [tipoProjeto, setTipoProjeto] = useState(null);
  const [tipoOpen, setTipoOpen] = useState(false);
  const tipoRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (tipoRef.current && !tipoRef.current.contains(e.target)) {
        setTipoOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleCopy = () => {
    navigator.clipboard?.writeText("contato@vitorfreitas.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3500);
    }, 1400);
  };

  return (
    <section id="contato" ref={ref} className="relative py-28 lg:py-36">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16">
        <div data-reveal="left">
          <p className="eyebrow mb-4">CONTATO</p>
          <h2 className="text-4xl md:text-6xl leading-[0.95] mb-6">
            Vamos Criar Algo
            <br />Extraordinário?
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-md leading-relaxed mb-12">
            Fale sobre seu projeto e vamos transformar sua ideia em algo
            inesquecível.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-[var(--color-gold)]">
                <FaWhatsapp size={18} />
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-text-secondary)]">WhatsApp</p>
                <p className="text-sm">(21) 97027-XXXX</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-[var(--color-gold)]">
                <HiOutlineEnvelope size={18} />
              </span>
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-text-secondary)]">E-mail</p>
                <p className="text-sm">contato@vitorfreitas.com</p>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-gold)] hover:border-[var(--color-gold)] transition-colors"
                aria-label="Copiar e-mail"
                data-cursor-hover
              >
                {copied ? (
                  <HiCheckCircle size={16} className="text-[var(--color-gold)]" />
                ) : (
                  <HiOutlineClipboardDocument size={16} />
                )}
              </button>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-[var(--color-gold)]">
                <HiOutlineMapPin size={18} />
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-text-secondary)]">Localização</p>
                <p className="text-sm">Rio de Janeiro - RJ</p>
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          data-reveal="right"
          className="relative bg-white/[.02] border border-white/[.08] rounded-2xl p-8 lg:p-10"
        >
          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            {fields.map((f) => (
              <div
                key={f.name}
                className={`relative ${f.half ? "" : "sm:col-span-2"}`}
              >
                <label
                  className={`absolute left-0 transition-all duration-300 pointer-events-none z-10 ${
                    focused === f.name || (f.name === "tipo" && tipoProjeto)
                      ? "-top-3 text-[10px] tracking-[0.15em] uppercase text-[var(--color-gold)]"
                      : "top-2.5 text-sm text-[var(--color-text-secondary)]"
                  }`}
                >
                  {f.label}
                </label>
                {f.type === "iconselect" ? (
                  <div ref={tipoRef} className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        setFocused(f.name);
                        setTipoOpen((o) => !o);
                      }}
                      className="w-full flex items-center justify-between gap-2 bg-transparent border-b border-white/15 focus:border-[var(--color-gold)] outline-none py-2.5 text-sm transition-colors text-left"
                      data-cursor-hover
                    >
                      <span className="flex items-center gap-2.5">
                        {tipoProjeto && (
                          <tipoProjeto.icon
                            className="text-[var(--color-gold)] shrink-0"
                            size={16}
                          />
                        )}
                        <span className={tipoProjeto ? "" : "text-transparent"}>
                          {tipoProjeto ? tipoProjeto.label : "."}
                        </span>
                      </span>
                      <HiOutlineChevronDown
                        size={14}
                        className={`shrink-0 text-[var(--color-text-secondary)] transition-transform duration-300 ${
                          tipoOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* input escondido garante validação required no submit do form */}
                    <input
                      type="text"
                      required
                      value={tipoProjeto?.label ?? ""}
                      onChange={() => {}}
                      tabIndex={-1}
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 opacity-0 pointer-events-none"
                    />

                    <AnimatePresence>
                      {tipoOpen && (
                        <motion.ul
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute z-30 top-full left-0 mt-2 w-full min-w-[200px] bg-[#101010] border border-white/[.1] rounded-xl py-2 shadow-xl"
                        >
                          {f.options.map((o) => (
                            <li key={o.label}>
                              <button
                                type="button"
                                onClick={() => {
                                  setTipoProjeto(o);
                                  setTipoOpen(false);
                                  setFocused(null);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left hover:bg-white/[.05] transition-colors"
                                data-cursor-hover
                              >
                                <o.icon
                                  className="text-[var(--color-gold)] shrink-0"
                                  size={17}
                                  strokeWidth={1.5}
                                />
                                {o.label}
                              </button>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <input
                    required
                    type={f.type}
                    onFocus={() => setFocused(f.name)}
                    onBlur={() => setFocused(null)}
                    className="w-full bg-transparent border-b border-white/15 focus:border-[var(--color-gold)] outline-none py-2.5 text-sm transition-colors"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="relative mb-8">
            <label
              className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                focused === "mensagem"
                  ? "-top-3 text-[10px] tracking-[0.15em] uppercase text-[var(--color-gold)]"
                  : "top-2.5 text-sm text-[var(--color-text-secondary)]"
              }`}
            >
              Mensagem
            </label>
            <textarea
              required
              rows={3}
              onFocus={() => setFocused("mensagem")}
              onBlur={() => setFocused(null)}
              className="w-full bg-transparent border-b border-white/15 focus:border-[var(--color-gold)] outline-none py-2.5 text-sm transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-gold-outline rounded-full px-8 py-3.5 text-xs tracking-[0.15em] uppercase font-medium w-full sm:w-auto disabled:opacity-60"
            data-cursor-hover
          >
            {status === "loading" ? "Enviando..." : "Enviar Mensagem"}
          </button>

          <AnimatePresence>
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute -bottom-16 left-0 right-0 mx-auto w-fit flex items-center gap-2 bg-[#101010] border border-[var(--color-gold)]/40 rounded-full px-5 py-3 text-sm"
              >
                <HiCheckCircle className="text-[var(--color-gold)]" />
                Mensagem enviada com sucesso!
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </section>
  );
}
