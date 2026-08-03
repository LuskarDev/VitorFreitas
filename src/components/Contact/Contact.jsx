import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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
import FieldError from "../common/FieldError";
import DateTimeField from "../common/DateTimeField";
import { whatsappNumber, whatsappNumberDisplay } from "../../data/content";

const tipoOptions = [
  { label: "Moda", icon: PiCoatHangerLight },
  { label: "Institucional", icon: HiOutlineBuildingOffice2 },
  { label: "Evento", icon: LuCamera },
  { label: "Editorial", icon: HiOutlineNewspaper },
  { label: "Outro", icon: HiOutlineSparkles },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Aceita formatos comuns de celular/fixo BR: (21) 97027-0000, 21970270000,
// 21 9702-7000, +55 21 97027-0000 etc. Exige DDD + 8 ou 9 dígitos.
const PHONE_RE = /^(?:\+?55\s?)?\(?\d{2}\)?[\s-]?9?\d{4}[\s-]?\d{4}$/;
// Tempo mínimo (ms) entre o formulário aparecer e ser enviado. Envios mais
// rápidos que isso quase sempre são bots preenchendo o form automaticamente.
const MIN_SUBMIT_TIME_MS = 3000;

const initialValues = {
  nome: "",
  email: "",
  whatsapp: "",
  endereco: "",
  mensagem: "",
  // honeypot: campo invisível para humanos; se vier preenchido, é bot.
  site: "",
};

export default function Contact() {
  const ref = useScrollReveal();
  const [status, setStatus] = useState("idle");
  const [focused, setFocused] = useState(null);
  const [copied, setCopied] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [tipoProjeto, setTipoProjeto] = useState(null);
  const [tipoOpen, setTipoOpen] = useState(false);
  const [agendamento, setAgendamento] = useState({ date: null, time: null });
  const [aceiteTermos, setAceiteTermos] = useState(false);
  const [errors, setErrors] = useState({});
  const [shakeFields, setShakeFields] = useState({});
  const tipoRef = useRef(null);
  const tipoButtonRef = useRef(null);
  const fieldRefs = useRef({});
  const mountedAtRef = useRef(Date.now());

  useEffect(() => {
    const onClickOutside = (e) => {
      if (tipoRef.current && !tipoRef.current.contains(e.target)) {
        setTipoOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    if (!tipoOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setTipoOpen(false);
        tipoButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [tipoOpen]);

  const handleCopy = () => {
    navigator.clipboard?.writeText("contato@vitorfreitas.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const setValue = (name, val) => {
    setValues((v) => ({ ...v, [name]: val }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const validate = () => {
    const errs = {};
    if (!values.nome.trim()) errs.nome = "Preencha seu nome";
    if (!values.email.trim()) errs.email = "Preencha seu e-mail";
    else if (!EMAIL_RE.test(values.email)) errs.email = "E-mail inválido";
    if (!values.whatsapp.trim()) errs.whatsapp = "Informe seu WhatsApp";
    else if (!PHONE_RE.test(values.whatsapp.trim())) errs.whatsapp = "WhatsApp inválido. Ex: (21) 97027-0000";
    if (!tipoProjeto) errs.tipo = "Selecione o tipo de projeto";
    if (!agendamento.date || !agendamento.time) errs.agendamento = "Escolha data e horário";
    if (!values.endereco.trim()) errs.endereco = "Informe o endereço do local";
    if (!values.mensagem.trim()) errs.mensagem = "Conte um pouco sobre o projeto";
    if (!aceiteTermos)
      errs.aceiteTermos = "É necessário aceitar os Termos de Agendamento e Compromisso";
    return errs;
  };

  const triggerShake = (keys) => {
    setShakeFields(Object.fromEntries(keys.map((k) => [k, true])));
    setTimeout(() => setShakeFields({}), 500);
  };

  const buildWhatsappMessage = () => {
    const dataHora =
      agendamento.date && agendamento.time
        ? `${agendamento.date.toLocaleDateString("pt-BR")} as ${agendamento.time}`
        : "-";
    const linhas = [
      "Novo pedido de orcamento pelo site:",
      "",
      `Nome: ${values.nome}`,
      `E-mail: ${values.email}`,
      `WhatsApp: ${values.whatsapp}`,
      `Tipo de projeto: ${tipoProjeto?.label || "-"}`,
      `Data/horario desejado: ${dataHora}`,
      `Endereco do local: ${values.endereco}`,
      "",
      "Mensagem:",
      values.mensagem,
    ];
    return linhas.join("\n");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Honeypot: campo invisivel a humanos. Se veio preenchido, e bot.
    // Time-trap: envios ultra-rapidos tambem sao tipicamente bots.
    // Em ambos os casos fingimos sucesso, sem abrir o WhatsApp de verdade.
    const elapsed = Date.now() - mountedAtRef.current;
    const looksLikeBot = values.site.trim().length > 0 || elapsed < MIN_SUBMIT_TIME_MS;

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
      if (!looksLikeBot) {
        const text = encodeURIComponent(buildWhatsappMessage());
        window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank", "noopener,noreferrer");
      }
      setStatus("success");
      setValues(initialValues);
      setTipoProjeto(null);
      setAgendamento({ date: null, time: null });
      setAceiteTermos(false);
      mountedAtRef.current = Date.now();
      setTimeout(() => setStatus("idle"), 4500);
    }, 900);
  };

  const inputBase =
    "w-full bg-transparent border-b outline-none py-2.5 text-sm transition-colors";
  const borderFor = (name) =>
    errors[name] ? "border-[#e2695f]" : "border-white/15 focus:border-[var(--color-gold)]";

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
                <p className="text-sm">{whatsappNumberDisplay}</p>
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
          noValidate
          data-reveal="right"
          className="relative bg-white/[.02] border border-white/[.08] rounded-2xl p-8 lg:p-10"
        >
          {/* Honeypot anti-spam: invisível para humanos, tentador para bots */}
          <div className="absolute -left-[9999px] top-0 w-px h-px overflow-hidden" aria-hidden="true">
            <label htmlFor="site">Não preencha este campo</label>
            <input
              type="text"
              id="site"
              name="site"
              tabIndex={-1}
              autoComplete="off"
              value={values.site}
              onChange={(e) => setValue("site", e.target.value)}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-8 mb-8">
            {/* Nome */}
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

            {/* E-mail */}
            <div
              ref={(el) => (fieldRefs.current.email = el)}
              className={`relative ${shakeFields.email ? "animate-field-shake" : ""}`}
            >
              <label
                className={`absolute left-0 transition-all duration-300 pointer-events-none z-10 ${
                  focused === "email" || values.email
                    ? "-top-3 text-[10px] tracking-[0.15em] uppercase text-[var(--color-gold)]"
                    : "top-2.5 text-sm text-[var(--color-text-secondary)]"
                }`}
              >
                E-mail
              </label>
              <input
                type="email"
                value={values.email}
                onChange={(e) => setValue("email", e.target.value)}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                className={`${inputBase} ${borderFor("email")}`}
              />
              <FieldError message={errors.email} />
            </div>

            {/* WhatsApp */}
            <div
              ref={(el) => (fieldRefs.current.whatsapp = el)}
              className={`relative ${shakeFields.whatsapp ? "animate-field-shake" : ""}`}
            >
              <label
                className={`absolute left-0 transition-all duration-300 pointer-events-none z-10 ${
                  focused === "whatsapp" || values.whatsapp
                    ? "-top-3 text-[10px] tracking-[0.15em] uppercase text-[var(--color-gold)]"
                    : "top-2.5 text-sm text-[var(--color-text-secondary)]"
                }`}
              >
                WhatsApp
              </label>
              <input
                type="text"
                value={values.whatsapp}
                onChange={(e) => setValue("whatsapp", e.target.value)}
                onFocus={() => setFocused("whatsapp")}
                onBlur={() => setFocused(null)}
                className={`${inputBase} ${borderFor("whatsapp")}`}
              />
              <FieldError message={errors.whatsapp} />
            </div>

            {/* Tipo de Projeto */}
            <div
              ref={(el) => (fieldRefs.current.tipo = el)}
              className={`relative ${shakeFields.tipo ? "animate-field-shake" : ""}`}
            >
              <label
                id="tipo-projeto-label"
                htmlFor="tipo-projeto-button"
                className={`absolute left-0 transition-all duration-300 pointer-events-none z-10 ${
                  focused === "tipo" || tipoProjeto
                    ? "-top-3 text-[10px] tracking-[0.15em] uppercase text-[var(--color-gold)]"
                    : "top-2.5 text-sm text-[var(--color-text-secondary)]"
                }`}
              >
                Tipo de Projeto
              </label>
              <div ref={tipoRef} className="relative">
                <button
                  type="button"
                  id="tipo-projeto-button"
                  ref={tipoButtonRef}
                  onClick={() => {
                    setFocused("tipo");
                    setTipoOpen((o) => !o);
                  }}
                  className={`w-full flex items-center justify-between gap-2 bg-transparent border-b outline-none py-2.5 text-sm transition-colors text-left ${borderFor("tipo")}`}
                  data-cursor-hover
                  aria-haspopup="listbox"
                  aria-expanded={tipoOpen}
                  aria-labelledby="tipo-projeto-label tipo-projeto-button"
                  aria-activedescendant={tipoProjeto ? `tipo-option-${tipoProjeto.label}` : undefined}
                >
                  <span className="flex items-center gap-2.5">
                    {tipoProjeto && (
                      <tipoProjeto.icon
                        className="text-[var(--color-gold)] shrink-0"
                        size={16}
                        aria-hidden="true"
                      />
                    )}
                    <span className={tipoProjeto ? "" : "text-transparent"}>
                      {tipoProjeto ? tipoProjeto.label : "."}
                    </span>
                  </span>
                  <HiOutlineChevronDown
                    size={14}
                    aria-hidden="true"
                    className={`shrink-0 text-[var(--color-text-secondary)] transition-transform duration-300 ${
                      tipoOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <FieldError message={errors.tipo} />

                <AnimatePresence>
                  {tipoOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute z-30 top-full left-0 mt-2 w-full min-w-[200px] bg-[#101010] border border-white/[.1] rounded-xl py-2 shadow-xl"
                      role="listbox"
                      aria-labelledby="tipo-projeto-label"
                      id="tipo-projeto-listbox"
                    >
                      {tipoOptions.map((o) => (
                        <li key={o.label} role="presentation">
                          <button
                            type="button"
                            id={`tipo-option-${o.label}`}
                            role="option"
                            aria-selected={tipoProjeto?.label === o.label}
                            onClick={() => {
                              setTipoProjeto(o);
                              setTipoOpen(false);
                              setFocused(null);
                              tipoButtonRef.current?.focus();
                              if (errors.tipo) setErrors((e) => ({ ...e, tipo: undefined }));
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left hover:bg-white/[.05] transition-colors"
                            data-cursor-hover
                          >
                            <o.icon
                              className="text-[var(--color-gold)] shrink-0"
                              size={17}
                              strokeWidth={1.5}
                              aria-hidden="true"
                            />
                            {o.label}
                          </button>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Agendamento (data + horário) */}
            <div
              ref={(el) => (fieldRefs.current.agendamento = el)}
              className="relative sm:col-span-2"
            >
              <DateTimeField
                label="Data e Horário Desejado"
                value={agendamento}
                onChange={(next) => {
                  setAgendamento(next);
                  if (errors.agendamento) setErrors((e) => ({ ...e, agendamento: undefined }));
                }}
                error={errors.agendamento}
                shake={shakeFields.agendamento}
              />
            </div>

            {/* Endereço */}
            <div
              ref={(el) => (fieldRefs.current.endereco = el)}
              className={`relative sm:col-span-2 ${shakeFields.endereco ? "animate-field-shake" : ""}`}
            >
              <label
                className={`absolute left-0 transition-all duration-300 pointer-events-none z-10 ${
                  focused === "endereco" || values.endereco
                    ? "-top-3 text-[10px] tracking-[0.15em] uppercase text-[var(--color-gold)]"
                    : "top-2.5 text-sm text-[var(--color-text-secondary)]"
                }`}
              >
                Endereço do Local do Trabalho
              </label>
              <input
                type="text"
                value={values.endereco}
                onChange={(e) => setValue("endereco", e.target.value)}
                onFocus={() => setFocused("endereco")}
                onBlur={() => setFocused(null)}
                className={`${inputBase} ${borderFor("endereco")}`}
              />
              <FieldError message={errors.endereco} />
            </div>
          </div>

          <div
            ref={(el) => (fieldRefs.current.mensagem = el)}
            className={`relative mb-8 ${shakeFields.mensagem ? "animate-field-shake" : ""}`}
          >
            <label
              className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                focused === "mensagem" || values.mensagem
                  ? "-top-3 text-[10px] tracking-[0.15em] uppercase text-[var(--color-gold)]"
                  : "top-2.5 text-sm text-[var(--color-text-secondary)]"
              }`}
            >
              Mensagem
            </label>
            <textarea
              rows={3}
              value={values.mensagem}
              onChange={(e) => setValue("mensagem", e.target.value)}
              onFocus={() => setFocused("mensagem")}
              onBlur={() => setFocused(null)}
              className={`w-full bg-transparent border-b outline-none py-2.5 text-sm transition-colors resize-none ${borderFor("mensagem")}`}
            />
            <FieldError message={errors.mensagem} />
          </div>

          {/* Aceite dos Termos de Agendamento e Compromisso */}
          <div
            ref={(el) => (fieldRefs.current.aceiteTermos = el)}
            className={`relative mb-8 ${shakeFields.aceiteTermos ? "animate-field-shake" : ""}`}
          >
            <label className="flex items-start gap-3 cursor-pointer select-none" data-cursor-hover>
              <input
                type="checkbox"
                checked={aceiteTermos}
                onChange={(e) => {
                  setAceiteTermos(e.target.checked);
                  if (errors.aceiteTermos)
                    setErrors((err) => ({ ...err, aceiteTermos: undefined }));
                }}
                className="peer sr-only"
              />
              <span
                className={`mt-0.5 shrink-0 w-5 h-5 rounded-[5px] border flex items-center justify-center transition-colors ${
                  errors.aceiteTermos
                    ? "border-[#e2695f]"
                    : "border-white/25 peer-checked:border-[var(--color-gold)]"
                } ${aceiteTermos ? "bg-[var(--color-gold)] border-[var(--color-gold)]" : ""}`}
              >
                {aceiteTermos && (
                  <HiCheckCircle size={13} className="text-[#060606]" />
                )}
              </span>
              <span className="text-xs leading-relaxed text-[var(--color-text-secondary)]">
                Li e aceito os{" "}
                <Link
                  to="/termos-de-agendamento"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-gold)] hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  Termos de Agendamento e Compromisso
                </Link>{" "}
                e a{" "}
                <Link
                  to="/politica-de-privacidade"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-gold)] hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  Política de Privacidade
                </Link>
                .
              </span>
            </label>
            <FieldError message={errors.aceiteTermos} />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-gold-outline rounded-full px-8 py-3.5 text-xs tracking-[0.15em] uppercase font-medium w-full sm:w-auto disabled:opacity-60"
            data-cursor-hover
          >
            {status === "loading" ? "Abrindo WhatsApp..." : "Enviar via WhatsApp"}
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
                Mensagem pronta! Confirme o envio no WhatsApp.
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </section>
  );
}
