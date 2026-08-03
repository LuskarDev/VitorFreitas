import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiChevronLeft, HiChevronRight, HiOutlineCalendarDays } from "react-icons/hi2";
import FieldError from "./FieldError";

const WEEKDAYS = ["D", "S", "T", "Q", "Q", "S", "S"];
const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];
const TIME_SLOTS = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00", "18:30"];

function buildMonthGrid(year, month) {
  const startWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array(startWeekday).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

function isSameDay(a, b) {
  return (
    a instanceof Date &&
    b instanceof Date &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatDate(d) {
  if (!d) return "";
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

/**
 * Scheduling field: pill trigger + calendar/time popover in the site's
 * characteristic dark-gold dropdown style (same language as the
 * "Tipo de Projeto" selector in the contact form).
 */
export default function DateTimeField({ label, value, onChange, error, shake }) {
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => value?.date || new Date());
  const wrapRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const cells = buildMonthGrid(viewDate.getFullYear(), viewDate.getMonth());

  const selectDay = (day) => {
    onChange({ ...value, date: new Date(viewDate.getFullYear(), viewDate.getMonth(), day) });
  };
  const selectTime = (t) => onChange({ ...value, time: t });

  const summary =
    value?.date && value?.time
      ? `${formatDate(value.date)} às ${value.time}`
      : value?.date
        ? `${formatDate(value.date)} · escolha o horário`
        : "";

  return (
    <div ref={wrapRef} className={`relative ${shake ? "animate-field-shake" : ""}`}>
      <label
        className={`absolute left-0 transition-all duration-300 pointer-events-none z-10 ${
          open || summary
            ? "-top-3 text-[10px] tracking-[0.15em] uppercase text-[var(--color-gold)]"
            : "top-2.5 text-sm text-[var(--color-text-secondary)]"
        }`}
      >
        {label}
      </label>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between gap-2 bg-transparent border-b outline-none py-2.5 text-sm transition-colors text-left ${
          error ? "border-[#e2695f]" : "border-white/15 focus:border-[var(--color-gold)]"
        }`}
        data-cursor-hover
      >
        <span className="flex items-center gap-2.5">
          <HiOutlineCalendarDays className="text-[var(--color-gold)] shrink-0" size={16} />
          <span className={summary ? "" : "text-transparent"}>{summary || "."}</span>
        </span>
      </button>

      <FieldError message={error} />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute z-30 top-full left-0 mt-2 w-[300px] max-w-[90vw] bg-[#101010] border border-white/[.1] rounded-xl p-5 shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={() =>
                  setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))
                }
                className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center hover:border-[var(--color-gold)] transition-colors"
                data-cursor-hover
              >
                <HiChevronLeft size={13} />
              </button>
              <p className="text-xs tracking-[0.1em] uppercase font-medium">
                {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
              </p>
              <button
                type="button"
                onClick={() =>
                  setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))
                }
                className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center hover:border-[var(--color-gold)] transition-colors"
                data-cursor-hover
              >
                <HiChevronRight size={13} />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-1">
              {WEEKDAYS.map((w, i) => (
                <span
                  key={i}
                  className="text-center text-[10px] text-[var(--color-text-secondary)] py-1"
                >
                  {w}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 mb-5">
              {cells.map((day, i) => {
                if (!day) return <span key={i} />;
                const cellDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
                const isPast = cellDate < today;
                const isSelected = isSameDay(cellDate, value?.date);
                return (
                  <button
                    type="button"
                    key={i}
                    disabled={isPast}
                    onClick={() => selectDay(day)}
                    data-cursor-hover
                    className={`aspect-square rounded-full text-xs flex items-center justify-center transition-colors ${
                      isSelected
                        ? "bg-[var(--color-gold)] text-[#060606] font-medium"
                        : isPast
                          ? "text-white/15 cursor-not-allowed"
                          : "text-white/80 hover:bg-white/[.08]"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            <p className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-text-secondary)] mb-2.5">
              Horário
            </p>
            <div className="flex flex-wrap gap-2">
              {TIME_SLOTS.map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => selectTime(t)}
                  data-cursor-hover
                  className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                    value?.time === t
                      ? "bg-[var(--color-gold)] text-[#060606] border-[var(--color-gold)] font-medium"
                      : "border-white/15 text-white/70 hover:border-[var(--color-gold)]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {value?.date && value?.time && (
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="btn-gold-outline rounded-full w-full mt-5 py-2 text-[11px] tracking-[0.15em] uppercase font-medium"
                data-cursor-hover
              >
                Confirmar
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
